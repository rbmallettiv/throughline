# Throughline

**Reading that builds a point of view.**

Type a goal, get a curated reading program, and answer the same four questions of
every book. Your answers compile into a single evolving point of view.

It works for anyone out of the box. To make it *yours*, edit one file.

---

## Run it locally

Requires Node 18.17+ (Node 20 recommended).

```bash
npm install
cp .env.example .env.local     # then paste your Anthropic API key
npm run dev                     # open http://localhost:3000
```

Get an API key at https://console.anthropic.com/settings/keys. The key stays on
the server (it is used only inside `app/api/claude/route.js`) and is never sent to
the browser.

---

## Make it yours

Almost everything lives in **`lib/config.js`**:

- `brand` and `tagline` — what it's called.
- `runningQuestion` — the one question your whole program answers. Make it
  specific to get sharper syntheses.
- `defaults.goal` / `defaults.background` — prefill the setup panel to turn this
  into a personal instance.
- `seedProgram` — the books shown on first load. Set to `[]` to force generation.
- `model` — any current Claude model id (or set `CLAUDE_MODEL` in `.env.local`).

The four reflection questions are in **`lib/anchors.js`**. Change the labels and
hints to fit a different audience (students, new managers, founders).

---

## How it works

- **Generate** (`POST /api/claude` with `task: "generate"`) asks Claude for a
  6-book program grouped into 3 phases, tailored to the goal and background.
- **Reflect** — each book expands into the four anchor questions. A book turns
  complete once all four are answered.
- **Synthesize** (`task: "synthesize"`) drafts your point of view from every note
  you've logged, and re-drafts as you add more.
- **Persistence** is `localStorage` (see `lib/store.js`), so notes stay on the
  device. There are no accounts yet.

---

## Deploy

Easiest path is Vercel:

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add `ANTHROPIC_API_KEY` as an environment variable.
4. Deploy.

---

## Honest scope

This is a focused tool, not a mass-market app. Its strength is a specific person
with a concrete goal (a career transition, a grad-school application, a new
domain) who needs reusable material and a defensible view, fast. Keep it sharp
rather than generic. If you extend it, the highest-value additions are: accounts
so notes sync across devices, a shareable read-only program link, and a gentle
cadence reminder. Skip anything that turns it into another generic reading
tracker.

---

## Stack

Next.js (App Router), React, no database. Styling is plain CSS in
`app/globals.css`. Fonts load from Google Fonts at runtime; swap to `next/font`
for production if you want to remove the external request.
