export const site = "https://toyboxes.app";
export const developer =
  "https://play.google.com/store/apps/developer?id=Toyboxes";
export const games = [
  {
    slug: "jokers-run",
    name: "Joker’s Run",
    package: "app.toyboxes.jokersrun",
    genre: "Arcade air combat",
    title: "Joker’s Run: Offline Arcade Air Combat for Android | Toyboxes",
    description:
      "Launch from a carrier, chase scouts through a canyon and take on an enemy ace. Joker’s Run is offline arcade air combat for Android. No ads or in-app purchases.",
    hook: "One mission. Make it your best run.",
    summary:
      "Launch from a carrier. Chase enemy scouts through a canyon. Take on an ace in one replayable, score-driven flight mission.",
    intro:
      "Joker’s Run is a single-player arcade air combat game for Android, built around one replayable mission. Fly offline with touch controls, line up your guns and missiles, and keep the enemy from revealing your fleet’s position.",
    icon: "icon-512.png",
    cover: "canyon-chase",
    coverAlt:
      "A red-tailed jet locks onto the lead scout at the entrance to a sea-cliff canyon in Joker’s Run.",
    browser: "https://jokers-run-arcade.vercel.app/",
    privacy: "https://jokers-run-arcade.vercel.app/privacy.html",
    controls:
      "Landscape touch controls, optional tilt steering, keyboard and controller support.",
    facts: ["Single player", "One replayable mission", "Offline play"],
    features: [
      [
        "Fly into the fight",
        "Start with a flight check and training drones, then take on enemy escorts with guns, missile locks, boost and barrel rolls. Give your wingmen orders as the battle changes.",
      ],
      [
        "Stay on their tail",
        "Follow scouts into a low-altitude canyon chase, fight a two-stage enemy ace and race to stop the final transmission. Radio dialogue and captions keep you on the mission.",
      ],
      [
        "Chase a better score",
        "Chain takedowns, build your Hot Start multiplier and improve your debrief rank. Checkpoint retries let you work on a tough section, and your best score stays on your device.",
      ],
    ],
    shots: [
      [
        "canyon-chase",
        "Chase the lead scout",
        "Close the distance before the scout escapes through the canyon.",
        "A jet approaches a canyon with a missile lock on the lead scout and landscape touch controls.",
      ],
      [
        "ace-dogfight",
        "Take on the ace",
        "Stay on the ace’s tail and build pressure through a two-stage encounter.",
        "The enemy ace’s first-stage health bar and targeting indicators above Joker’s jet over the ocean.",
      ],
      [
        "final-intercept",
        "Beat the transmission",
        "Evade incoming missiles and catch the last scout before time runs out.",
        "The final transmission timer counts down while a missile warning and evade control appear.",
      ],
    ],
    faqs: [
      [
        "Is Joker’s Run a full campaign?",
        "It is built around one replayable mission, with training, dogfights, a canyon chase, an ace encounter and a final timed intercept. Replay to improve your score and rank.",
      ],
      [
        "Can I play Joker’s Run offline?",
        "Yes. The Android game bundles its gameplay and audio for offline play after installation. No account is required.",
      ],
      [
        "Are there ads or in-app purchases?",
        "No. Joker’s Run is a paid download with no ads or in-app purchases. Google Play shows the current price for your region.",
      ],
    ],
  },
  {
    slug: "perspective-opus",
    name: "Perspective Opus",
    package: "app.toyboxes.perspectiveopus",
    genre: "2D/3D puzzle platformer",
    title: "Perspective Opus: 2D/3D Puzzle Platformer for Android | Toyboxes",
    description:
      "Switch between a hand-inked 2D world and a 3D stage to solve musical puzzles. Explore six movements in Perspective Opus for Android. No ads or in-app purchases.",
    hook: "Change your view. Find your way.",
    summary:
      "Turn a hand-inked page into a 3D stage. Find a new path through musical puzzles and bring a scattered symphony back to life.",
    intro:
      "Perspective Opus is a musical puzzle platformer for Android. Switch between 2D and 3D at any moment, even mid-jump, to find paths that only exist from another perspective. Guide Quaver, a little lost note, through six movements and restore a symphony.",
    icon: "icon-512.webp",
    cover: "phone-01-overture-stage",
    coverAlt:
      "Quaver, a little musical note, beside a metronome on the grassy 3D Stage in Perspective Opus.",
    browser: "https://perspective-opus.vercel.app/",
    privacy: "https://perspective-opus.vercel.app/privacy.html",
    controls:
      "Touch, keyboard and controller support. Switch perspective at any moment, including in mid-air.",
    facts: ["Six musical movements", "42 lost notes", "Offline play"],
    features: [
      [
        "A puzzle with two answers",
        "On the 2D Score, depth disappears and separated ledges line up into a path. On the 3D Stage, walk around obstacles that block the page. Use both views to keep moving.",
      ],
      [
        "Play through a symphony",
        "Travel from a sunrise meadow to a misty lake, an autumn village, moonlit gardens, a clocktower organ and a concert hall. Bounce on timpani, ride music stands and raise platforms with piano keys.",
      ],
      [
        "Bring the music back",
        "Find 42 lost notes to restore instruments to the score. Each movement has two musical arrangements, and changing perspective blends between them without breaking the rhythm.",
      ],
    ],
    shots: [
      [
        "phone-02-overture-score",
        "Find a path on the page",
        "The 2D Score collapses depth, bringing separated platforms together.",
        "Quaver beside a metronome in the hand-inked 2D Overture, with parchment scenery and a line of platforms.",
      ],
      [
        "phone-03-nocturne-score",
        "Explore the Nocturne",
        "Follow the lost notes into a different musical movement.",
        "The Nocturne in 2D, with moonlit silver ink, crystal columns and musical notes.",
      ],
      [
        "phone-04-finale-stage",
        "Reach the concert hall",
        "Take the restored symphony to the Finale’s 3D Stage.",
        "Quaver on marble platforms in the Finale concert hall, framed by velvet curtains.",
      ],
    ],
    faqs: [
      [
        "How does switching between 2D and 3D work?",
        "The 2D Score flattens depth so distant platforms can line up. The 3D Stage brings depth back so you can go around walls. You can switch at any moment, even in mid-air.",
      ],
      [
        "What is included in Perspective Opus?",
        "Six musical movements, 42 lost notes and an original score with a 2D and 3D arrangement for each movement. Touch, keyboard and controller support are included.",
      ],
      [
        "Does Perspective Opus need an internet connection?",
        "The Android game works offline after installation and saves progress on your device. It has no ads, in-app purchases or account requirement.",
      ],
    ],
  },
];

export function playUrl(game, placement) {
  const url = new URL("https://play.google.com/store/apps/details");
  url.searchParams.set("id", game.package);
  url.searchParams.set(
    "referrer",
    new URLSearchParams({
      utm_source: "toyboxes.app",
      utm_medium: "website",
      utm_campaign: "mobile_storefront",
      utm_content: `${game.slug}_${placement}`,
    }).toString(),
  );
  return url.href;
}
