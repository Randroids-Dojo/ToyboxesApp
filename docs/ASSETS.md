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

Keepsies is coming soon, so these images show the game without linking to it. Everything comes from the `Randroids-Dojo/Keepsies` repository or from real captures of its alpha build. No phone frame is drawn and no game UI is edited.

The app icon is `web/public/icons/icon-512.png`.

### Card faces and the sealed pack

The fanned cards on the home page and the Keepsies page are the game's own rendered card faces from `web/public/pack3d/faces/` (the images its pack opening uses, built from each card's design), resized from 600x840 to 360x504 WebP at quality 78. The sealed pack is `web/public/pack/sealed-49019165-960.webp`, resized to 400 pixels wide at quality 80.

| Local filename | Source face | Card |
| --- | --- | --- |
| card-red-panda-cub.webp | 024-81720c48.webp | Red Panda Cub, red rare |
| card-axolotl-scene.webp | 117-55d0c6ff.webp | Axolotl scene rare (secret rare) |
| card-lion-cub-full-art.webp | 110-eadaeaad.webp | Lion Cub full art (secret rare) |
| card-snow-leopard-cub.webp | 099-3bb30f62.webp | Snow Leopard Cub, blue ultra rare |
| card-panda-cub.webp | 097-f7a58bf8.webp | Panda Cub, blue ultra rare |
| sealed-pack-art.webp | sealed-49019165-960.webp | The sealed pack |

`keepsies-share.jpg` (1200x630, the social preview) arranges the same five card faces and the pack on a plain violet background. It adds no text or invented art.

### Gameplay captures

Captured on November 11, 2026 (America/Chicago) from the Keepsies QA build, main `5f6f9d2`, with Playwright Chromium at a 390x844 phone viewport, device scale 2, using a fresh debug test account. Packs were opened with the game's lightweight reveal (the 3D opening was not used). Each capture is a whole, unedited phone screen, resized to 600x1298 and 300x649 WebP at quality 78. The test account's name ("Tester 3719") appears where the game shows who pulled a card.

| Local filename | What it shows |
| --- | --- |
| sealed-pack.webp | A sealed pack before opening, with the swipe hint |
| last-card.webp | The tenth card of the pack turned over: Peacock, a blue rare |
| card-close-up.webp | The Peacock copy up close: number 093 of 100, serial No. 5 of 21, strength meter at Fresh |
| card-story.webp | The same copy's details: serial, first print, owner, who pulled it and its story so far |
| binder.webp | The catalog binder: 34 of 100 collected, 0 of 20 secret rares, first page |
| lineup.webp | The practice bot lineup with Pygmy Hippo Calf, Cheetah Cub and Pallas's Cat in rounds 1 to 3 |
| color-defense.webp | Round 1 against the practice bot: Red beats Yellow, the coached color defense explainer |
| pick-one.webp | Pick your prize: the practice bot's three cards face down after the tutorial win |
