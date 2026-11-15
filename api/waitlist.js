// The game waitlist. Keepsies keeps its own waitlist: each signup is sent on to
// the Keepsies server (POST /api/waitlist there, with WAITLIST_SECRET) and
// nothing is stored here. Works for a plain HTML form post (303 to a static
// page) and for fetch with Accept: application/json (a JSON answer). Never log
// an address.

const GAMES = new Set(["keepsies"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const FORWARD_TIMEOUT_MS = 8000;
const pages = {
  joined: (game) => `/games/${game}/joined/`,
  retry: (game) => `/games/${game}/try-again/`,
};

/**
 * Where Keepsies takes signups: KEEPSIES_WAITLIST_URL when set, else Keepsies
 * prod for this site's production and Keepsies QA for previews and development.
 */
export function keepsiesWaitlistUrl(env = process.env) {
  if (env.KEEPSIES_WAITLIST_URL) return env.KEEPSIES_WAITLIST_URL;
  return env.VERCEL_ENV === "production"
    ? "https://keepsies.toyboxes.app/api/waitlist"
    : "https://keepsies-qa.vercel.app/api/waitlist";
}

/**
 * Sends one signup to Keepsies. Resolves "ok", "invalid_email" when Keepsies
 * refuses the address, or "failed" for anything else (unreachable, a refusal,
 * an answer that is not Keepsies' JSON).
 */
export async function sendToKeepsies(entry, { url = keepsiesWaitlistUrl(), secret = process.env.WAITLIST_SECRET } = {}) {
  if (!secret) {
    console.error("waitlist: WAITLIST_SECRET is not set");
    return "failed";
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(entry),
      redirect: "error",
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
    });
    const result = String(response.headers.get("content-type") || "").includes("application/json")
      ? await response.json().catch(() => null)
      : null;
    if (response.status === 200 && result?.ok === true) return "ok";
    if (response.status === 400 && result?.error === "invalid_email") return "invalid_email";
    console.error("waitlist: Keepsies did not take a signup", response.status, result?.error ?? "");
  } catch (error) {
    console.error("waitlist: could not reach Keepsies", error?.name);
  }
  return "failed";
}

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

const INVALID_EMAIL = {
  ok: false,
  error: "invalid_email",
  message: "That email address does not look right. Check it and try again.",
};

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
  if (!email || email.length > MAX_EMAIL || !EMAIL.test(email)) return reply(400, INVALID_EMAIL);

  const sent = await sendToKeepsies({ email, game });
  if (sent === "invalid_email") return reply(400, INVALID_EMAIL);
  if (sent !== "ok") {
    return reply(500, {
      ok: false,
      error: "storage_failed",
      message: "Something went wrong on our side. Please try again in a minute.",
    });
  }
  return reply(200, { ok: true });
}
