"use client";

import { anchors } from "../lib/anchors";

export default function BookCard({ index, book, open, done, onToggle, notes, onNote }) {
  return (
    <div className="panel book">
      <button className="book-hd" onClick={onToggle} aria-expanded={open}>
        <span className={"book-num" + (done ? " done" : "")}>
          {done ? "\u2713" : String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ flex: 1 }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
            <span className="book-title">{book.title}</span>
            <span className="chev" style={{ transform: open ? "rotate(180deg)" : "none" }}>{"\u25be"}</span>
          </span>
          <span className="book-author" style={{ display: "block" }}>{book.author}</span>
          {book.why ? <span className="book-why" style={{ display: "block" }}>{book.why}</span> : null}
        </span>
      </button>

      {open ? (
        <div className="book-body">
          <div className="eyebrow" style={{ color: "var(--accent-ink)", margin: "16px 0 14px" }}>Reflection</div>
          {anchors.map((a) => (
            <div className="anchor" key={a.key}>
              <div className="anchor-hd">
                <span className="anchor-label">{a.label}</span>
                <span className="anchor-hint">{a.hint}</span>
              </div>
              <textarea
                rows={2}
                value={notes[a.key] || ""}
                placeholder={"\u2026"}
                onChange={(e) => onNote(index, a.key, e.target.value)}
              />
            </div>
          ))}

          {Array.isArray(book.questions) && book.questions.length ? (
            <>
              <div className="eyebrow" style={{ color: "var(--accent-ink)", margin: "22px 0 14px" }}>Why this book</div>
              {book.questions.map((q, j) => (
                <div className="anchor" key={"s" + j}>
                  <div className="anchor-hd">
                    <span className="anchor-label">{q}</span>
                  </div>
                  <textarea
                    rows={2}
                    value={notes["s" + j] || ""}
                    placeholder={"\u2026"}
                    onChange={(e) => onNote(index, "s" + j, e.target.value)}
                  />
                </div>
              ))}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
