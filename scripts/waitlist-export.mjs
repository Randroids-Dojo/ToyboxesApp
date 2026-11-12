// Print a game's waitlist as CSV: email,game,joinedAt.
//
//   vercel env pull .env.local
//   node --env-file=.env.local scripts/waitlist-export.mjs [environment] [game] > waitlist.csv
//
// environment is production (default), preview or development; game is
// keepsies (default). Needs BLOB_READ_WRITE_TOKEN. The output holds personal
// data: keep it out of the repository and delete it when you are done.
import { get, list } from "@vercel/blob";

const [env = "production", game = "keepsies"] = process.argv.slice(2);
if (!/^[a-z-]+$/.test(env) || !/^[a-z-]+$/.test(game)) {
  console.error("Usage: node scripts/waitlist-export.mjs [environment] [game]");
  process.exit(2);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is not set. Run vercel env pull .env.local and pass --env-file=.env.local.");
  process.exit(2);
}

const prefix = `waitlist/${env}/${game}/`;
// Quote every field, and keep spreadsheet apps from reading a value as a formula.
const csv = (value) => {
  const text = String(value ?? "");
  return `"${(/^[=+\-@]/.test(text) ? `'${text}` : text).replaceAll('"', '""')}"`;
};
const rows = [];
let cursor;
do {
  const page = await list({ prefix, cursor });
  for (const blob of page.blobs) {
    const result = await get(blob.pathname, { access: "private", useCache: false });
    if (!result?.stream) continue;
    const entry = JSON.parse(await new Response(result.stream).text());
    rows.push(entry);
  }
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

rows.sort((a, b) => String(a.joinedAt).localeCompare(String(b.joinedAt)));
console.log("email,game,joinedAt");
for (const row of rows) console.log([row.email, row.game, row.joinedAt].map(csv).join(","));
console.error(`${rows.length} signup${rows.length === 1 ? "" : "s"} under ${prefix}`);
