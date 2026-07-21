"use client";

import { config } from "../lib/config";

export default function Throughline({ value, onChange, stamp, onSynthesize, synthState }) {
  return (
    <section className="panel through">
      <div className="head">
        <span className="eyebrow label">{"\u25c6"} Your throughline</span>
        <span className="stamp">{stamp ? `AS OF ${stamp.toUpperCase()}` : "NOT YET WRITTEN"}</span>
      </div>
      <p className="q">{config.runningQuestion}</p>
      <textarea
        className={value ? "pov" : ""}
        rows={value ? 5 : 3}
        value={value}
        placeholder="Your point of view compiles here. Write it yourself, or synthesize it from your notes below."
        onChange={(e) => onChange(e.target.value)}
      />
      <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn" onClick={onSynthesize} disabled={synthState === "loading"}>
          {synthState === "loading" ? "Synthesizing\u2026" : "\u27f3 Synthesize from notes"}
        </button>
        {synthState === "error" ? <span className="err">Synthesis failed. Try again.</span> : null}
        <span className="note">Sharpens as you log more reflections.</span>
      </div>
    </section>
  );
}
