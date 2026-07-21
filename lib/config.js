// ─────────────────────────────────────────────────────────────────────────────
// Throughline — personalization lives here.
//
// This is the ONE file to edit to make the app yours. Everything below is a
// default. The app works for anyone out of the box (type a goal, generate a
// program). To ship your own version, change the brand, the running question,
// and the seed program.
// ─────────────────────────────────────────────────────────────────────────────

export const config = {
  brand: "Throughline",
  tagline: "Reading that builds a point of view.",

  // The single question your whole program answers, one book at a time.
  // Everything compiles toward this. Make it specific if you want.
  runningQuestion:
    "What is my point of view on this subject, and how is it changing?",

  // Prefilled into the setup panel. Leave blank to start empty, or hardcode
  // your own goal + background here to make this a personal instance.
  defaults: {
    goal: "",
    background: "",
  },

  // A starting program so the app is not empty on first load. Set to [] to
  // force the user to generate their own. Books are grouped by `phase`.
  seedProgram: [
    { phase: "01 · Foundations", title: "Make It Stick", author: "Brown, Roediger & McDaniel", why: "How learning actually sticks, so the rest of the program compounds." },
    { phase: "01 · Foundations", title: "How to Read a Book", author: "Adler & Van Doren", why: "A method for reading for understanding, not just getting through it." },
    { phase: "02 · Judgment", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", why: "The biases quietly shaping every judgment you make." },
    { phase: "02 · Judgment", title: "Superforecasting", author: "Tetlock & Gardner", why: "How to hold opinions you can actually defend." },
    { phase: "03 · Direction", title: "Range", author: "David Epstein", why: "Why breadth often beats early specialization in a changing field." },
    { phase: "03 · Direction", title: "The Making of a Manager", author: "Julie Zhuo", why: "What stepping into leadership actually feels like." },
  ],

  // Any current Claude model id. Overridable via CLAUDE_MODEL env var.
  model: "claude-sonnet-4-5",
};
