// ─────────────────────────────────────────────────────────────────────────────
// PIXALYSE UNIFIED BLOG INDEX — 60 Articles Total
// 20 original + 40 expanded (2 per tool × 20 tools)
// ─────────────────────────────────────────────────────────────────────────────
import { BLOGS as BLOGS_ORIGINAL } from "./blogs.js";
import { BLOGS_EXPANDED } from "./blogs-expanded.js";

export const BLOGS = [
  ...BLOGS_ORIGINAL,
  ...BLOGS_EXPANDED,
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const getBlogById    = (id)     => BLOGS.find(b => b.id === id);
export const getBlogsByTool = (toolId) => BLOGS.filter(b => b.toolId === toolId);
export const getBlogsByCat  = (cat)    => BLOGS.filter(b => b.cat === cat);
export const getFeatured    = ()       => BLOGS.slice(0, 1);
export const getRecent      = (n = 6)  => [...BLOGS].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, n);

export const BLOG_CATS = [...new Set(BLOGS.map(b => b.cat))];
export const TOTAL_BLOGS = BLOGS.length;
// 60 articles total:
//   compress(3), resize(3), crop(3), rotate(3), watermark(3), upscale(3),
//   blur-bg(3), remove-bg(3), png-to-jpg(3), jpg-to-png(3), webp-to-jpg(3),
//   heic-to-jpg(3), svg-to-png(3), image-to-pdf(3), pdf-to-image(3),
//   gif-to-mp4(3), bulk-compress(3), base64(3), passport(3), screenshot-to-pdf(3)
