import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ToolPage from "./pages/ToolPage";
import CalcPage from "./pages/CalcPage";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProgrammaticPage from "./pages/ProgrammaticPage";
import MultiLangPage from "./pages/MultiLangPage";
import CheatSheetPage from "./pages/CheatSheetPage";
import EmbedPage from "./pages/EmbedPage";
import HubPage, { HUBS } from "./pages/HubPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import { TOOLS } from "./tools";
import { BLOGS } from "./blogs-index";
import { getPageBySlug } from "./programmatic-index";
import { LANGUAGES } from "./languages";
import { EmailBanner } from "./components/EmailCapture";

// Tools that use CalcPage instead of ToolPage
const CALC_IDS = new Set([
  "invoice-generator","profit-margin","salary-calculator",
  "emi-calculator","loan-calculator","interest-calculator","roi-calculator",
  "gst-calculator","sip-calculator","fd-calculator","ppf-calculator",
  "unit-converter","word-counter","qr-generator",
  "bmi-calculator","age-calculator","percentage-calculator",
]);

// Parse query-string prefill params for calculators
// e.g. /tool/emi-calculator?p=5000000&r=8.5&t=20
function parsePrefill(search) {
  const p = {};
  try {
    new URLSearchParams(search).forEach((v, k) => { p[k] = v; });
  } catch {}
  return Object.keys(p).length ? p : null;
}

function resolveRoute(rawPath, search = "") {
  const path = (rawPath || "/").replace(/\/$/, "") || "/";

  if (path === "/")                         return { type:"home" };
  if (path === "/blog")                     return { type:"blog" };
  if (path === "/embed")                    return { type:"embed" };
  if (path === "/languages")                return { type:"lang", lang:null };
  if (path === "/social-media-image-sizes") return { type:"cheatsheet" };
  if (path === "/privacy")                  return { type:"privacy" };
  if (path === "/terms")                    return { type:"terms" };
  if (path === "/contact")                  return { type:"contact" };

  const langEntry = Object.values(LANGUAGES).find(l => path === `/${l.slug}`);
  if (langEntry) return { type:"lang", lang:langEntry };

  const hub = HUBS.find(h => path === `/${h.slug}`);
  if (hub) return { type:"hub", hub };

  if (path.startsWith("/tool/")) {
    const id   = path.slice(6);
    const tool = TOOLS.find(t => t.id === id);
    if (tool) {
      const prefill = parsePrefill(search);
      return { type: CALC_IDS.has(id) ? "calc" : "tool", tool, prefill };
    }
  }

  if (path.startsWith("/blog/")) {
    const id   = path.slice(6);
    const blog = BLOGS.find(b => b.id === id);
    if (blog) return { type:"post", blog };
  }

  const slug = path.slice(1);
  if (slug) {
    const progPage = getPageBySlug(slug);
    if (progPage) return { type:"programmatic", page:progPage };
  }

  return { type:"home" };
}

export default function App() {
  const [route, setRoute] = useState(() =>
    resolveRoute(window.location.pathname, window.location.search)
  );

  const go = (path, search = "") => {
    const full = search ? `${path}${search}` : path;
    window.history.pushState({}, "", full);
    setRoute(resolveRoute(path, search));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handler = () => setRoute(resolveRoute(window.location.pathname, window.location.search));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const goHome    = ()  => go("/");
  const goTool    = (t) => go(`/tool/${t.id}`);
  const goBlog    = ()  => go("/blog");
  const goPost    = (b) => go(`/blog/${b.id}`);
  const goEmbed   = ()  => go("/embed");
  const goCheat   = ()  => go("/social-media-image-sizes");
  const goLang    = ()  => go("/languages");
  const goPrivacy = ()  => go("/privacy");
  const goTerms   = ()  => go("/terms");
  const goContact = ()  => go("/contact");

  const navPage =
    route.type === "blog" || route.type === "post" ? "blog"
    : route.type === "cheatsheet" ? "cheat"
    : route.type === "lang"       ? "lang"
    : route.type === "embed"      ? "embed"
    : "home";

  return (
    <div style={{ fontFamily:"Inter,system-ui,-apple-system,sans-serif", color:"#1a1a2e" }}>
      <Nav onHome={goHome} onBlog={goBlog} onCheat={goCheat} onEmbed={goEmbed} onLang={goLang} page={navPage}/>

      {route.type==="home"         && <HomePage onSelectTool={goTool} onBlog={goBlog} onPost={goPost} onEmbed={goEmbed} onCheat={goCheat} onPrivacy={goPrivacy} onTerms={goTerms} onContact={goContact}/>}
      {route.type==="tool"  && route.tool && <ToolPage  tool={route.tool} onBack={goHome} onPost={goPost} onSelectTool={goTool}/>}
      {route.type==="calc"  && route.tool && <CalcPage  tool={route.tool} onBack={goHome} onSelectTool={goTool} prefill={route.prefill}/>}
      {route.type==="blog"         && <BlogListPage onPost={goPost}/>}
      {route.type==="post"  && route.blog && <BlogPostPage blog={route.blog} onBack={goHome} onSelectTool={goTool} onBlogList={goBlog} onPost={goPost}/>}
      {route.type==="programmatic" && route.page && <ProgrammaticPage page={route.page} onBack={goHome} onSelectTool={goTool} onPost={goPost}/>}
      {route.type==="lang"         && <MultiLangPage lang={route.lang} onSelectTool={goTool} onHome={goHome}/>}
      {route.type==="cheatsheet"   && <CheatSheetPage onSelectTool={goTool}/>}
      {route.type==="embed"        && <EmbedPage onSelectTool={goTool}/>}
      {route.type==="hub"   && route.hub  && <HubPage hub={route.hub} onSelectTool={goTool} onPost={goPost} onBlog={goBlog}/>}
      {route.type==="privacy"      && <PrivacyPage onHome={goHome}/>}
      {route.type==="terms"        && <TermsPage onHome={goHome}/>}
      {route.type==="contact"      && <ContactPage onHome={goHome}/>}

      <EmailBanner/>
      <Analytics />
    </div>
  );
}
