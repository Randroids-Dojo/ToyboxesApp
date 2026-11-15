// Move the Keepsies waitlist out of Vercel Blob, where api/waitlist.js used to
// keep it, into Keepsies. Each signup is posted to the Keepsies waitlist with
// its joinedAt, and its blob is deleted only after Keepsies answers ok. A blob
// that cannot be read, or that Keepsies refuses (a 400, like an address it
// does not take), is kept and counted, and the run goes on. Anything else
// (Keepsies unreachable, a 401, a 404, a 500) stops the run. Prints counts,
// never addresses. Safe to run again: Keepsies keeps the earliest joinedAt,
// and blobs already moved are gone.
//
//   vercel env pull .env.migrate --environment=development
//   node --env-file=.env.migrate scripts/waitlist-migrate.mjs production --dry-run
//   node --env-file=.env.migrate scripts/waitlist-migrate.mjs production
//   rm .env.migrate
//
// The first argument is whose blobs to move, waitlist/<environment>/keepsies/:
// production goes to Keepsies prod, preview and development go to Keepsies QA
// (KEEPSIES_WAITLIST_URL overrides the target). --dry-run only counts. Needs
// BLOB_READ_WRITE_TOKEN and WAITLIST_SECRET.
import { del, get, list } from "@vercel/blob";

const usage = () => {
  console.error("Usage: node scripts/waitlist-migrate.mjs [production|preview|development] [--dry-run]");
  process.exit(2);
};
const ENVS = ["production", "preview", "development"];
let env;
let dryRun = false;
// Anything else, a misspelled --dry-run included, stops here before a blob is read.
for (const arg of process.argv.slice(2)) {
  if (arg === "--dry-run" && !dryRun) dryRun = true;
  else if (ENVS.includes(arg) && !env) env = arg;
  else usage();
}
env ??= "production";
for (const name of ["BLOB_READ_WRITE_TOKEN", "WAITLIST_SECRET"]) {
  if (!process.env[name]) {
    console.error(`${name} is not set. Pull the development environment and pass --env-file (see the top of this file).`);
    process.exit(2);
  }
}

const url = process.env.KEEPSIES_WAITLIST_URL
  || (env === "production" ? "https://keepsies.toyboxes.app/api/waitlist" : "https://keepsies-qa.vercel.app/api/waitlist");
const prefix = `waitlist/${env}/keepsies/`;
const counts = { found: 0, moved: 0, refused: 0, failed: 0, unreadable: 0 };

async function post(entry) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WAITLIST_SECRET}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(entry),
    redirect: "error",
    signal: AbortSignal.timeout(15000),
  });
  const json = String(response.headers.get("content-type") || "").includes("application/json")
    ? await response.json().catch(() => null)
    : null;
  return { status: response.status, ok: response.status === 200 && json?.ok === true, error: json?.error };
}

console.log(`${dryRun ? "Counting" : "Moving"} ${prefix} to ${new URL(url).host}`);
let cursor;
do {
  const page = await list({ prefix, cursor });
  for (const blob of page.blobs) {
    counts.found++;
    if (dryRun) continue;
    let entry;
    try {
      const result = await get(blob.pathname, { access: "private", useCache: false });
      entry = JSON.parse(await new Response(result.stream).text());
    } catch {
      counts.unreadable++;
      continue;
    }
    if (typeof entry?.email !== "string" || typeof entry?.joinedAt !== "string") {
      counts.unreadable++;
      continue;
    }
    let answer;
    try {
      answer = await post({ email: entry.email, game: "keepsies", joinedAt: entry.joinedAt });
    } catch (error) {
      console.error(`Could not reach Keepsies (${error?.name}). Stopping; nothing more was deleted.`);
      counts.failed++;
      break;
    }
    if (answer.ok) {
      await del(blob.url);
      counts.moved++;
    } else if (answer.status === 400) {
      counts.refused++;
      console.error(`Keepsies refused one signup (${answer.error ?? "no code"}); its blob is kept.`);
    } else {
      counts.failed++;
      console.error(`Keepsies answered ${answer.status} ${answer.error ?? ""}; stopping, nothing more was deleted.`);
      break;
    }
  }
  cursor = page.hasMore && !counts.failed ? page.cursor : undefined;
} while (cursor);

console.log(Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(", "));
if (counts.failed || counts.refused || counts.unreadable) process.exitCode = 1;
