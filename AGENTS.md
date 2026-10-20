# Toyboxes App

The public mobile games storefront at https://toyboxes.app. The interactive town stays at https://toyboxes.games in the separate Toyboxes repository.

- Start user-facing answers with 🤖️.
- Keep commits and PR descriptions free of assistant attribution.
- Use real gameplay captures. Keep image provenance in docs/ASSETS.md.
- Keep game descriptions accurate, including Joker's Run's one replayable mission.
- Generate ordinary HTML and links; essential content must work without JavaScript.
- Keep the canonical domain toyboxes.app. Keep www as a permanent redirect.
- Use src/games.mjs as the game catalog and scripts/build.mjs for shared page templates.
- Run npm run build and npm run check. Inspect desktop and mobile in the collaborative browser before publishing.
- Check the linked Vercel project is toyboxes-app in randroid88s-projects before deploying. Do not deploy this site to the toyboxes town project.
- Never commit secrets or .env files. No extra tracking without documenting it accurately.
