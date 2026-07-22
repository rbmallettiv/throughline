// ─────────────────────────────────────────────────────────────────────────────
// Throughline — personalization lives here. This instance: defense-tech PM
// transition (USMC aviation → industry, MBA in parallel).
// ─────────────────────────────────────────────────────────────────────────────

export const config = {
  brand: "Throughline",
  tagline: "Reading that builds a point of view.",

  runningQuestion:
    "What is my point of view on the future of defense, and what kind of operator am I becoming?",

  defaults: {
    goal: "Move from Marine Corps aviation into a defense-tech Program/Product Management role",
    background:
      "9 years commissioned USMC officer, rotary-wing aircraft commander, Air Operations Officer, active TS/SCI. Targeting Anduril, Shield AI, Firestorm Labs. Pursuing a full-time MBA in parallel.",
  },

  seedProgram: [
    { phase: "01 · Fluency", title: "The Kill Chain", author: "Christian Brose", why: "The strategic thesis every new defense prime is built on." },
    { phase: "01 · Fluency", title: "Unit X", author: "Shah & Kirchhoff", why: "A field manual for the Pentagon-to-Valley bridge role you want." },
    { phase: "01 · Fluency", title: "Army of None", author: "Paul Scharre", why: "Vocabulary to discuss autonomy credibly, grounded in your flying background." },
    { phase: "02 · Business", title: "The Personal MBA", author: "Josh Kaufman", why: "Fast scaffolding across finance, ops, and marketing before school." },
    { phase: "02 · Business", title: "Financial Intelligence", author: "Berman & Knight", why: "Read statements like an operator; evaluate equity offers." },
    { phase: "02 · Business", title: "Inspired", author: "Marty Cagan", why: "The PM framework interviewers assume you already know." },
    { phase: "03 · Leadership", title: "Skunk Works", author: "Ben Rich", why: "The small-team culture the new primes explicitly invoke." },
    { phase: "03 · Leadership", title: "Turn the Ship Around!", author: "L. David Marquet", why: "Military command translated into civilian org design." },
    { phase: "03 · Leadership", title: "The Making of a Manager", author: "Julie Zhuo", why: "What the first civilian leadership transition actually feels like." },
    { phase: "04 · Frontier", title: "Four Battlegrounds", author: "Paul Scharre", why: "The US-China AI contest, where funding and mission are heading." },
    { phase: "04 · Frontier", title: "Co-Intelligence", author: "Ethan Mollick", why: "Practical fluency working alongside AI; now table stakes." },
    { phase: "04 · Frontier", title: "The Arms of the Future", author: "Jack Watling", why: "How emerging systems reshape force design and spending." },
  ],

  model: "claude-sonnet-4-5",
};
