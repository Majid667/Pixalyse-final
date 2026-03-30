// ─── Pixalyse History — localStorage, zero backend ───────────────────────────
const KEY   = "px_history_v2";
const LIMIT = 10;

export function saveHistory(entry) {
  try {
    const list = getHistory();
    const updated = [entry, ...list.filter(e => e.toolId !== entry.toolId || e.fileName !== entry.fileName)].slice(0, LIMIT);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {}
}

export function getHistory() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function clearHistory() {
  try { localStorage.removeItem(KEY); } catch {}
}
