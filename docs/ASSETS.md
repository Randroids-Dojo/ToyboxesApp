# Assets and provenance

All game screenshots depict actual gameplay. No generated gameplay art, altered game UI or simulated phone frame is used.

## Toyboxes brand

`public/favicon.svg` and `public/assets/toyboxes-icon.png` are copied from the existing `Randroids-Dojo/Toyboxes` project. Lilita One and Atkinson Hyperlegible Next are copied from that project's installed Fontsource packages, with their SIL Open Font License texts in `public/assets/fonts/`.

The official Google Play badge was downloaded from https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png on October 19, 2026. It is displayed unmodified and links directly to Google Play.

## Joker's Run

The app icon comes from `JokersRunArcade/public/icon-512.png`. Screenshots were downloaded from the live public listing for `app.toyboxes.jokersrun` on October 19, 2026, at 1920x1080. Each was visually inspected and named for its actual scene; listing order differs from capture order.

Source host: `https://play-lh.googleusercontent.com/`, with `=w1920-h1080-rw` appended to the following source IDs:

| Local filename | Source ID |
| --- | --- |
| flight-check.webp | 1ylcFZ6aDE2fIxhO0S_1rQ0QzWtxKlhjCGy45ZbED5gQhpc_VVU3kagvf3yD5LZ-nvPIAeu5psLHRzDbIV8V |
| canyon-chase.webp | U--inB3_x9J7Bu4RKWNMBfX0yaRj0TTv3-5CKBu6DJbmubJJo7TERBfoPtiqN0DEddEZw79taJuz84L0TSjd |
| ace-dogfight.webp | QDkjwm9-xsWu_oL3mJkHpMAv--32w39nNlrzHr7riaUKC3Ib-GcuQIMi5ssdOY8ejQMWTuAjAAyWau7rjlzd |
| final-intercept.webp | ovxFz9X_JqdHKWxEqSxjf24gks2-GzpPwM0j18vwTCGpQ1hL7WdSH731coVYX9q7lY1KNU9iMxV1ev9YDznvhg |

The release's `JokersRunArcade/docs/ANDROID-RELEASE.md` documents production game renders in Chrome touch emulation. These are not described as physical-device screenshots. The canyon screenshot shows the approach to the canyon, not a close-up canyon interior; its caption reflects this.

## Perspective Opus

Images come from `PerspectiveOpusAndroid/docs/store/`, matching the released native game. The source `screenshots.json` records native Godot Mobile renderer captures on macOS with touch UI, not physical phone captures, from commit `a10e18f71a71df50485538d02cf1461d376923db`.

| Source filename | Source PNG SHA-256 |
| --- | --- |
| phone-01-overture-stage.png | 579f965135e75e87bb331431c9c62db838973b25ceac7165aeaa7b726f93c174 |
| phone-02-overture-score.png | 45099ed1021014d06c873db566b9d34730ce24c0a17f519399c2a2f567a576f5 |
| phone-03-nocturne-score.png | 077cd249ecc55bcb60d3eec4157c1f6d2604cda637577c0cb2ecc209ced0a9d2 |
| phone-04-finale-stage.png | fb030a6a2b0d00306d1a3c149f329647808d06e9dd16bf9d33a7d2b18100e2da |

Full images are encoded as WebP at quality 86. The `-960.webp` images for both games are 960-pixel-wide derivatives at quality 82, produced with `cwebp`. Their composition and content are unchanged. Captions and alt text describe the displayed scene.

## Keepsies

The app icon is `web/public/icons/icon-512.png` from `Randroids-Dojo/Keepsies`. The three images are real captures of the Keepsies QA build (https://keepsies-qa.vercel.app, commit `8f4b064`) taken on November 10, 2026 with Playwright Chromium at a 390x844 phone viewport and device scale 2, as a new guest playing the tutorial. WebGL was turned off for the capture, so packs open with the game's lightweight reveal rather than the 3D one.

Keepsies is a portrait game, so each 1920x1080 image places three unaltered captures side by side, scaled to 960 pixels high with rounded corners and a soft shadow, on a plain dark background in the game's colors. No phone frame is drawn and the game UI is not edited.

| Local filename | Captures, left to right |
| --- | --- |
| open-packs.webp | the landing screen; the last card of a pack turned over (Cheetah Cub); the pack summary |
| beat-the-bot.webp | the lineup builder; a coached round where Blue beats Red; the win screen |
| keep-your-cards.webp | the catalog; a won round; the reward pack and the save your cards panel |

Full images are WebP at quality 86 and the `-960.webp` images are 960-pixel-wide derivatives at quality 82, made with Pillow.
