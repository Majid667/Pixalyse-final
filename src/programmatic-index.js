// ─── UNIFIED PROGRAMMATIC SEO INDEX ──────────────────────────────────────────
// All 155 programmatic pages in one importable collection
// ─────────────────────────────────────────────────────────────────────────────
import { PROGRAMMATIC_PAGES } from "./programmatic.js";
import { PROGRAMMATIC_PAGES_EXPANDED } from "./programmatic-expanded.js";

export const ALL_PROGRAMMATIC_PAGES = [
  ...PROGRAMMATIC_PAGES,
  ...PROGRAMMATIC_PAGES_EXPANDED,
];

export const getPageBySlug  = (slug) => ALL_PROGRAMMATIC_PAGES.find(p => p.slug === slug);
export const getPagesByTool = (toolId) => ALL_PROGRAMMATIC_PAGES.filter(p => p.toolId === toolId);
export const TOTAL_PAGES    = ALL_PROGRAMMATIC_PAGES.length;
