// The game waitlist. One private JSON blob per address and game, keyed by a
// hash of the address, so signing up twice just replaces the first entry.
// Works for a plain HTML form post (303 to a static page) and for fetch with
// Accept: application/json (a JSON answer). Never log an address.
import { createHash } from "node:crypto";
import { put } from "@vercel/blob";

const GAMES = new Set(["keepsies"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const pages = {
  joined: (game) => `/games/${game}/joined/`,
  retry: (game) => `/games/${game}/try-again/`,
};

function readBody(req) {
  // Vercel parses JSON and urlencoded bodies into req.body. Reading it throws
  // on malformed JSON, which is treated like an empty form.
  try {
    const body = req.body;
    if (body && typeof body === "object") return body;
    if (typeof body === "string") return Object.fromEntries(new URLSearchParams(body));
  } catch {}
  return {};
}

const field = (body, name) => (typeof body[name] === "string" ? body[name] : "");

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const wantsJson = String(req.headers.accept || "").includes("application/json");
  const body = readBody(req);
  const game = GAMES.has(field(body, "game")) ? field(body, "game") : "keepsies";
  const reply = (status, result) => {
    if (wantsJson) return res.status(status).json(result);
    res.setHeader("Location", result.ok ? pages.joined(game) : pages.retry(game));
    return res.status(303).end();
  };

  if (!GAMES.has(field(body, "game"))) {
    return reply(400, { ok: false, error: "unknown_game", message: "That waitlist does not exist." });
  }

  // The honeypot is hidden from people. Anything in it is a bot: say yes, keep nothing.
  if (field(body, "website").trim()) return reply(200, { ok: true });

  const email = field(body, "email").trim();
  if (!email || email.length > MAX_EMAIL || !EMAIL.test(email)) {
    return reply(400, {
      ok: false,
      error: "invalid_email",
      message: "That email address does not look right. Check it and try again.",
    });
  }

  const key = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const env = process.env.VERCEL_ENV || "development";
  try {
    await put(
      `waitlist/${env}/${game}/${key}.json`,
      JSON.stringify({ email, game, joinedAt: new Date().toISOString() }),
      {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
      },
    );
  } catch (error) {
    console.error("waitlist: could not store a signup", error?.name, error?.message);
    return reply(500, {
      ok: false,
      error: "storage_failed",
      message: "Something went wrong on our side. Please try again in a minute.",
    });
  }
  return reply(200, { ok: true });
}
