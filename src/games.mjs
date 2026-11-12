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

/**
 * Keepsies is coming soon. It has its own page and a waitlist, and no link to
 * the game itself until it opens to everyone. Facts come from the game's own
 * design docs and the current alpha build. No em or en dashes in this copy.
 */
export const keepsies = {
  slug: "keepsies",
  name: "Keepsies",
  fullName: "Keepsies: Collect & Battle",
  genre: "Collectible card game",
  title: "Keepsies: A Card Game Played for Keeps, Coming Soon | Toyboxes",
  description:
    "Rip open packs of numbered animal cards, put three on the line against a friend and take one of theirs for keeps. Keepsies is coming soon. Join the waitlist.",
  hook: "Play for keeps.",
  icon: "icon-512.png",
  // Real card faces from the game, fanned out of the sealed pack. [file, alt]
  fan: [
    ["card-red-panda-cub", "Red Panda Cub, a red rare card with power 58."],
    ["card-axolotl-scene", "Axolotl scene rare, a red secret rare card with power 76."],
    ["card-lion-cub-full-art", "Lion Cub full art, a yellow secret rare card with power 84."],
    ["card-snow-leopard-cub", "Snow Leopard Cub, a blue ultra rare card with power 85."],
    ["card-panda-cub", "Panda Cub, a blue ultra rare card with power 79."],
  ],
  facts: ["Free in alpha", "100 animals plus 20 secret rares", "Made for your phone"],
  // Trailer beats for the game page: [id, heading, lines, shots [file, caption, alt]]
  beats: [
    [
      "rip",
      "Rip it open.",
      [
        "Ten cards a pack. Rarest last.",
        "Swipe the seal and turn them over one by one. The last card waits face down until you flip it.",
      ],
      [
        ["sealed-pack", "A sealed pack, ready to open.", "A sealed purple and gold Keepsies pack with the hint: swipe across the top to open, or tap the pack."],
        ["last-card", "The last card: a Peacock, rare.", "A Peacock card, a blue rare with power 66, turned over as the last card of the pack."],
      ],
    ],
    [
      "copy",
      "No two cards are the same.",
      [
        "Every pack comes from a limited, numbered print run. Exactly as many copies of each card exist as were printed.",
        "So every card you pull is a real copy, with its own serial number and its own story. Who pulled it. Every match it fought. Every hand it passed through.",
      ],
      [
        ["card-close-up", "Serial No. 5 of 21, first print.", "A close-up of the Peacock card, labeled number 093 of 100, serial number 5 of 21, with a strength meter reading Fresh."],
        ["card-story", "This copy and its story.", "The card's details: serial number 5 of 21, first print, the owner, who pulled it and its story so far."],
      ],
    ],
    [
      "binder",
      "Fill the binder.",
      [
        "100 animals in set 1, plus 20 secret rares.",
        "A hoglet, a barn owlet, a kangaroo joey: cards use the real word for a young animal wherever there is one, and every card carries a real fact. Drawn in Arcade-Cel style, part 1990s action cartoon, part 16-bit arcade.",
        "Every slot starts as a silhouette. Flip the pages and watch it fill.",
      ],
      [["binder", "Your binder, page by page.", "The catalog binder: 34 of 100 collected, with collected cards in their pockets and the rest as numbered silhouettes."]],
    ],
    [
      "battle",
      "Three cards. Three rounds. Your order.",
      [
        "Pick three cards and the round each one fights in, under a power cap.",
        "Red beats Yellow. Yellow beats Blue. Blue beats Red. Get beaten on color and your card loses some of its strength.",
        "Win a round and your card gets a little weaker. Lose one and it comes back a little stronger. No card stays on top for long.",
      ],
      [
        ["lineup", "Set your lineup.", "The lineup screen against the practice bot, with Pygmy Hippo Calf, Cheetah Cub and Pallas's Cat placed in rounds 1, 2 and 3."],
        ["color-defense", "Color defense: Red beats Yellow.", "A round in progress: Red beats Yellow, so the bot's card loses a share of its strength and drops to 60 against Pygmy Hippo Calf's 61."],
      ],
    ],
    [
      "keeps",
      "Winner picks one. For keeps.",
      [
        "Challenge a friend. Lineups stay hidden until the replay.",
        "Whoever loses shuffles their three cards face down, and the winner takes one, blind. That card is theirs now, and its story goes with it.",
      ],
      [["pick-one", "The face-down pick, from the practice bot.", "Pick your prize: the practice bot's three cards shuffled face down, waiting for a tap."]],
    ],
  ],
  faqs: [
    [
      "When does Keepsies open?",
      "There is no date yet. Keepsies is in alpha and changing fast. Join the waitlist and we will email you when it opens.",
    ],
    [
      "Is it free?",
      "Yes. Keepsies is free to play in alpha, with a free pack every 12 hours.",
    ],
    [
      "What do I need to play?",
      "A phone and its web browser. Players must be 13 or older. To challenge friends, you verify your phone number once.",
    ],
    [
      "Can I trade cards?",
      "Not at launch. Matches are the only way cards change hands, so every card you win is one you earned.",
    ],
  ],
};
