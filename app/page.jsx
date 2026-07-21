"use client";

import { useState, useEffect, useCallback } from "react";
import { config } from "../lib/config";
import { anchors } from "../lib/anchors";
import { load, save } from "../lib/store";
import BookCard from "../components/BookCard";
import Throughline from "../components/Throughline";

function stripFences(s) {
  return s.replace(/```json/gi, "").replace(/```/g, "").trim();
}

export default function Page() {
  const [goal, setGoal] = useState(config.defaults.goal);
  const [background, setBackground] = useState(config.defaults.background);
  const [books, setBooks] = useState(config.seedProgram);
  const [notes, setNotes] = useState({});
  const [pov, setPov] = useState("");
  const [stamp, setStamp] = useState("");
  const [openIdx, setOpenIdx] = useState(null);
  const [setupOpen, setSetupOpen] = useState(false);
  const [genState, setGenState] = useState("idle");
  const [synthState, setSynthState] = useState("idle");
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage on mount
  useEffect(() => {
    const saved = load("state");
    if (saved) {
      if (saved.goal != null) setGoal(saved.goal);
      if (saved.background != null) setBackground(saved.background);
      if (Array.isArray(saved.books)) setBooks(saved.books);
      if (saved.notes) setNotes(saved.notes);
      if (saved.pov) setPov(saved.pov);
      if (saved.stamp) setStamp(saved.stamp);
    }
    setHydrated(true);
  }, []);

  // persist whenever meaningful state changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    save("state", { goal, background, books, notes, pov, stamp });
  }, [hydrated, goal, background, books, notes, pov, stamp]);

  const bookDone = useCallback(
    (i) => anchors.every((a) => (notes[i]?.[a.key] || "").trim().length > 0),
    [notes]
  );

  const doneCount = books.reduce((n, _, i) => n + (bookDone(i) ? 1 : 0), 0);
  const logged = books.reduce(
    (n, _, i) => n + anchors.filter((a) => (notes[i]?.[a.key] || "").trim()).length,
    0
  );

  const setNote = (i, key, val) =>
    setNotes((prev) => ({ ...prev, [i]: { ...(prev[i] || {}), [key]: val } }));

  async function generate() {
    setGenState("loading");
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ task: "generate", goal, background }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      const arr = JSON.parse(stripFences(data.text));
      if (!Array.isArray(arr) || arr.length < 2) throw new Error("Unexpected shape");
      const clean = arr.map((x) => ({
        phase: String(x.phase || "01 · Reading"),
        title: String(x.title || "Untitled"),
        author: String(x.author || ""),
        why: String(x.why || ""),
      }));
      setBooks(clean);
      setNotes({});
      setOpenIdx(null);
      setSetupOpen(false);
      setGenState("idle");
    } catch (e) {
      setGenState("error");
    }
  }

  async function synthesize() {
    const text = books
      .map((b, i) => {
        const n = notes[i] || {};
        const body = anchors
          .map((a) => (n[a.key] ? `${a.label}: ${n[a.key]}` : ""))
          .filter(Boolean)
          .join(" | ");
        return body ? `- ${b.title}: ${body}` : "";
      })
      .filter(Boolean)
      .join("\n");
    if (!text) {
      setSynthState("error");
      return;
    }
    setSynthState("loading");
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          task: "synthesize",
          goal,
          runningQuestion: config.runningQuestion,
          notes: text,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setPov(data.text);
      setStamp(
        new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
      );
      setSynthState("idle");
    } catch (e) {
      setSynthState("error");
    }
  }

  const phases = [...new Set(books.map((b) => b.phase))];

  return (
    <main className="wrap">
      <header className="masthead">
        <div>
          <div className="eyebrow" style={{ color: "var(--accent)" }}>Personal reading program</div>
          <h1 className="brand">{config.brand}</h1>
          <p className="tagline">{config.tagline}</p>
        </div>
        <div className="eyebrow counter">
          <div className="done">{doneCount}/{books.length} complete</div>
          <div>{logged} notes logged</div>
        </div>
      </header>

      <Throughline
        value={pov}
        onChange={setPov}
        stamp={stamp}
        onSynthesize={synthesize}
        synthState={synthState}
      />

      <section className="panel" style={{ marginBottom: 26 }}>
        <button className="setup-toggle" onClick={() => setSetupOpen((v) => !v)} aria-expanded={setupOpen}>
          <span className="eyebrow">Your goal</span>
          <span className="chev" style={{ transform: setupOpen ? "rotate(180deg)" : "none" }}>{"\u25be"}</span>
        </button>
        {setupOpen ? (
          <div className="setup-body">
            <div style={{ marginTop: 16 }}>
              <label className="eyebrow flabel">What are you working toward?</label>
              <input
                className="field"
                value={goal}
                placeholder="e.g. Move into product management in a new industry"
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <label className="eyebrow flabel">Background (optional)</label>
              <textarea
                rows={3}
                value={background}
                placeholder="A sentence or two about where you're coming from."
                onChange={(e) => setBackground(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button className="btn primary" onClick={generate} disabled={genState === "loading" || !goal.trim()}>
                {genState === "loading" ? "Curating\u2026" : "Generate my program"}
              </button>
              <span className="note">Rebuilds the list and clears notes.</span>
              {genState === "error" ? <span className="err">Couldn't generate. Check your API key and try again.</span> : null}
            </div>
          </div>
        ) : null}
      </section>

      {phases.map((ph) => (
        <div key={ph}>
          <div className="eyebrow phase">{ph}</div>
          {books.map((b, i) =>
            b.phase !== ph ? null : (
              <BookCard
                key={i}
                index={i}
                book={b}
                open={openIdx === i}
                done={bookDone(i)}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                notes={notes[i] || {}}
                onNote={setNote}
              />
            )
          )}
        </div>
      ))}

      <footer className="eyebrow foot">
        The same four questions, every book, so your answers compile into a view.
        <br />
        Notes are saved in this browser.
      </footer>
    </main>
  );
}
