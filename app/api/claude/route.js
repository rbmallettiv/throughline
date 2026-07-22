import { config } from "../../../lib/config";

export const runtime = "nodejs";

const MODEL = process.env.CLAUDE_MODEL || config.model;

async function callClaude(prompt, maxTokens) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Anthropic ${res.status}: ${detail}`);
  }
  const data = await res.json();
  return (data.content || [])
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
}

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Server is missing ANTHROPIC_API_KEY. Add it to .env.local and restart." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    if (body.task === "generate") {
      const goal = String(body.goal || "").slice(0, 600);
      const background = String(body.background || "").slice(0, 800);
      const prompt =
        `Curate a personalized reading program of exactly 6 books for someone with this ` +
        `goal and background. Order them as a deliberate progression and group them into ` +
        `exactly 3 named phases, two books per phase. Choose real, well-regarded books. ` +
        `Return ONLY a JSON array of 6 objects, no markdown, no prose. Each object: ` +
        `{"phase":"NN · ShortName","title":"","author":"","why":"under 16 words, why THIS reader",` +
        `"questions":["","" ]}. The two questions are book-SPECIFIC: what makes this book ` +
        `different from the others and what this particular reader should extract from it. ` +
        `Keep each question under 18 words. Phases numbered 01-03, in order.\n\n` +
        `GOAL: ${goal}\nBACKGROUND: ${background}`;
      const text = await callClaude(prompt, 1300);
      return Response.json({ text });
    }

    if (body.task === "synthesize") {
      const goal = String(body.goal || "").slice(0, 600);
      const question = String(body.runningQuestion || "").slice(0, 300);
      const notes = String(body.notes || "").slice(0, 4000);
      if (!notes.trim()) {
        return Response.json({ error: "No notes yet to synthesize from." }, { status: 400 });
      }
      const prompt =
        `Someone is keeping a reading program toward this goal: "${goal}". Below are their ` +
        `notes across several books. Draft a sharp, first-person point of view (3-4 sentences) ` +
        `answering: "${question}" Write it as their emerging position: specific, confident, no ` +
        `hedging, no preamble. Return only the paragraph.\n\nNOTES:\n${notes}`;
      const text = await callClaude(prompt, 500);
      return Response.json({ text });
    }

    return Response.json({ error: "Unknown task." }, { status: 400 });
  } catch (e) {
    return Response.json({ error: String(e.message || e) }, { status: 502 });
  }
}
