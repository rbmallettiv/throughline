// Tiny localStorage wrapper. Safe to import from client components; guards
// against server-side rendering where window is undefined.

const PREFIX = "throughline:";

export function load(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* quota or private-mode errors are non-fatal */
  }
}
