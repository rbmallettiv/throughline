// ─────────────────────────────────────────────────────────────────────────────
// Throughline — personalization lives here. This instance: defense-tech PM
// transition (USMC aviation → industry, MBA in parallel).
//
// Each book has:
//   why       — the one-line reason it's on the list
//   questions — TWO book-specific questions (what makes THIS book different and
//               what you should pull from it), asked in addition to the four
//               shared questions in lib/anchors.js.
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
    { phase: "01 · Fluency", title: "The Kill Chain", author: "Christian Brose", why: "The strategic thesis every new defense prime is built on.",
      questions: [
        "Which legacy assumption does Brose target, and where do you still see it operating today?",
        "How would you pitch this thesis to a skeptical senior officer in two minutes?",
      ] },
    { phase: "01 · Fluency", title: "Unit X", author: "Shah & Kirchhoff", why: "A field manual for the Pentagon-to-Valley bridge role you want.",
      questions: [
        "Which DIU tactic for beating procurement could you actually reuse in a PM role?",
        "Where did they hit walls, and what does that failure teach you?",
      ] },
    { phase: "01 · Fluency", title: "Army of None", author: "Paul Scharre", why: "Vocabulary to discuss autonomy credibly, grounded in your flying background.",
      questions: [
        "Where do you personally draw the line on autonomy and human control, and why?",
        "How does your cockpit experience change how you read the human-machine argument?",
      ] },
    { phase: "02 · Business", title: "The Personal MBA", author: "Josh Kaufman", why: "Fast scaffolding across finance, ops, and marketing before school.",
      questions: [
        "Which single concept here closes your biggest gap before b-school?",
        "What did this reframe that you assumed you already understood?",
      ] },
    { phase: "02 · Business", title: "Financial Intelligence", author: "Berman & Knight", why: "Read statements like an operator; evaluate equity offers.",
      questions: [
        "Read a real defense-tech company's statements: what does it reveal about their health?",
        "How would you use this to compare an RSU vs RSA offer?",
      ] },
    { phase: "02 · Business", title: "Inspired", author: "Marty Cagan", why: "The PM framework interviewers assume you already know.",
      questions: [
        "Which Cagan principle maps onto how you already planned air operations?",
        "How would you define good product management in an interview, in one line?",
      ] },
    { phase: "03 · Leadership", title: "Skunk Works", author: "Ben Rich", why: "The small-team culture the new primes explicitly invoke.",
      questions: [
        "Which of Johnson's 14 rules survives at a modern defense startup, and which doesn't?",
        "What does Rich's insider account reveal that an outside history couldn't?",
      ] },
    { phase: "03 · Leadership", title: "The Impossible Factory", author: "Josh Dean", why: "The definitive Skunk Works history: how one shop built the impossible, fast.",
      questions: [
        "What does the outside history reveal that Rich's memoir leaves out?",
        "What made this shop ship fast, and which of those conditions are reproducible today?",
      ] },
    { phase: "03 · Leadership", title: "Turn the Ship Around!", author: "L. David Marquet", why: "Military command translated into civilian org design.",
      questions: [
        "Which 'leader-leader' move translates directly from your own command experience?",
        "Where would intent-based leadership break in a civilian tech org?",
      ] },
    { phase: "03 · Leadership", title: "The Making of a Manager", author: "Julie Zhuo", why: "What the first civilian leadership transition actually feels like.",
      questions: [
        "What civilian management assumption surprised you versus military leadership?",
        "Which weakness of your own does this book put a name to?",
      ] },
    { phase: "04 · Frontier", title: "Four Battlegrounds", author: "Paul Scharre", why: "The US-China AI contest, where funding and mission are heading.",
      questions: [
        "Which of the four battlegrounds is your target company actually fighting on?",
        "What's your contrarian take on where the US-China AI race is going?",
      ] },
    { phase: "04 · Frontier", title: "Co-Intelligence", author: "Ethan Mollick", why: "Practical fluency working alongside AI; now table stakes.",
      questions: [
        "Which Mollick principle will you actually use in a PM workflow this week?",
        "Where do you disagree with his optimism about working alongside AI?",
      ] },
    { phase: "04 · Frontier", title: "The Arms of the Future", author: "Jack Watling", why: "How emerging systems reshape force design and spending.",
      questions: [
        "How does Watling's force-design argument connect to your aviation and logistics background?",
        "Which procurement shift here would you bet real money on?",
      ] },
  ],

  model: "claude-sonnet-4-5",
};
