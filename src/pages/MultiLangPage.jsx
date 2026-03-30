import React, { useState } from "react";
import { TOOLS } from "../tools";
import { LANGUAGES } from "../languages";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";
import TIcon from "../components/TIcon";

const TOOL_IDS = ["compress","heic-to-jpg","png-to-jpg","passport","resize","remove-bg"];

export default function MultiLangPage({ lang, onSelectTool, onHome }) {
  const [selected, setSelected] = useState(lang || null);

  // Language picker
  if (!selected) {
    return (
      <div style={{ fontFamily:"inherit", background:"#fff", minHeight:"100vh" }}>
        <section style={{ background:"linear-gradient(135deg,#fff5f5,#fff9f0,#f0f8ff)", padding:"52px 24px 44px", borderBottom:"1px solid #eee", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #fcc", borderRadius:50, padding:"6px 18px", marginBottom:22 }}>
            <span style={{ fontSize:"0.8rem", color:"#e74c3c", fontWeight:700 }}>🌍 5 Languages · 1.5 Billion+ Users</span>
          </div>
          <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, letterSpacing:"-0.03em", marginBottom:12, color:"#1a1a2e" }}>
            Pixalyse — Available in 5 Languages
          </h1>
          <p style={{ color:"#666", fontSize:"0.95rem", maxWidth:520, margin:"0 auto" }}>
            Dedicated landing pages in the highest-volume image-tool keywords for each region — reaching 1.5 billion+ users in their native language.
          </p>
        </section>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"44px 20px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:16 }}>
            {Object.values(LANGUAGES).map(l => (
              <button key={l.slug} onClick={() => setSelected(l)}
                style={{ background:"#fff", border:"1.5px solid #eee", borderRadius:18, padding:"24px 22px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#e74c3c"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(231,76,60,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <span style={{ fontSize:"2.2rem" }}>{l.flag}</span>
                  <div>
                    <div style={{ fontWeight:800, fontSize:"1rem", color:"#1a1a2e" }}>{l.name || l.slug.toUpperCase()}</div>
                    <div style={{ fontSize:"0.75rem", color:"#aaa" }}>{l.country}</div>
                  </div>
                </div>
                <div dir={l.dir} style={{ fontWeight:600, fontSize:"0.9rem", color:"#333", marginBottom:4 }}>{l.headline}</div>
                <div dir={l.dir} style={{ fontSize:"0.78rem", color:"#aaa" }}>{l.subheadline || l.tagline}</div>
                <div style={{ marginTop:12, fontSize:"0.72rem", color:"#e74c3c", fontWeight:700 }}>View page →</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Full language landing page
  const l    = selected;
  const isRTL = l.dir === "rtl";

  useSEO({
    title:       l.seoTitle,
    description: l.seoDesc,
    keywords:    l.seoKeywords,
    canonical:   `${SITE.url}/${l.slug}`,
    schema: [{ "@context":"https://schema.org", "@type":"WebPage", "name":l.seoTitle, "url":`${SITE.url}/${l.slug}`, "inLanguage":l.htmlLang }],
    schemaId: `lang-${l.slug}`,
  });

  const [hov, setHov] = useState(null);
  const featuredTools = (l.tools || []).map((lt, i) => ({ lt, tool: TOOLS.find(t => t.id === TOOL_IDS[i]) })).filter(x => x.tool);

  return (
    <div dir={l.dir} lang={l.htmlLang} style={{ fontFamily:"inherit", color:"#1a1a2e", background:"#fff", minHeight:"100vh" }}>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#fff5f5,#fff9f0,#f0f8ff)", padding:"60px 24px 52px", textAlign:"center", borderBottom:"1px solid #eee" }}>
        <div style={{ fontSize:"2.8rem", marginBottom:16 }}>{l.flag}</div>
        <h1 style={{ fontSize:"clamp(1.8rem,5vw,3rem)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:16, color:"#1a1a2e" }}>{l.headline}</h1>
        <p style={{ color:"#666", fontSize:"1rem", lineHeight:1.7, marginBottom:26, maxWidth:500, margin:"0 auto 26px" }}>{l.subheadline || l.tagline}</p>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10, marginBottom:28 }}>
          {(l.trustBadges || ["🔒 Private","⚡ Instant","🆓 Free","📵 No Watermark"]).map(b => (
            <span key={b} style={{ background:"#fff", border:"1px solid #eee", borderRadius:50, padding:"6px 16px", fontSize:"0.78rem", color:"#666" }}>{b}</span>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => window.scrollTo({ top:500, behavior:"smooth" })}
            style={{ background:"linear-gradient(135deg,#e74c3c,#e67e22)", border:"none", color:"#fff", padding:"14px 36px", borderRadius:14, fontWeight:800, fontSize:"0.97rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 5px 20px rgba(231,76,60,0.38)" }}>
            ⚡ {l.cta}
          </button>
          <button onClick={() => setSelected(null)}
            style={{ background:"#fff", border:"1.5px solid #eee", color:"#888", padding:"14px 22px", borderRadius:14, fontWeight:600, fontSize:"0.9rem", cursor:"pointer", fontFamily:"inherit" }}>
            🌍 Change Language
          </button>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background:"#fff", borderBottom:"1px solid #eee", padding:"14px 24px" }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:12 }}>
          {(l.stats || [["50M+","Files Processed"],["190+","Countries"],["4.9★","Rating"]]).map(([n,lb]) => (
            <div key={lb} style={{ textAlign:"center" }}>
              <div style={{ fontWeight:900, fontSize:"1.2rem", color:"#e74c3c" }}>{n}</div>
              <div style={{ fontSize:"0.66rem", color:"#bbb", textTransform:"uppercase", letterSpacing:"0.08em" }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured tools */}
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"44px 20px 24px" }}>
        <h2 style={{ fontWeight:800, fontSize:"1.3rem", marginBottom:22, textAlign:"center" }}>{l.headline}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14, marginBottom:28 }}>
          {featuredTools.map(({ lt, tool }, i) => (
            <button key={i} onClick={() => onSelectTool(tool)}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background:"#fff", border:`2px solid ${hov===i ? tool.color : "#eee"}`, borderRadius:16, padding:"18px 16px", cursor:"pointer", textAlign:isRTL?"right":"left", display:"flex", gap:14, alignItems:"flex-start", fontFamily:"inherit", boxShadow: hov===i ? `0 6px 20px ${tool.color}28` : "0 1px 6px rgba(0,0,0,0.04)", transform: hov===i ? "translateY(-2px)" : "none", transition:"all 0.18s" }}>
              <TIcon type={tool.icon} color={tool.color} size={40}/>
              <div>
                <div style={{ fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:tool.color, marginBottom:4 }}>{lt.keyword}</div>
                <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:4, color:"#1a1a2e" }}>{lt.name}</div>
                <div style={{ fontSize:"0.77rem", color:"#aaa" }}>{lt.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* All tools */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:9 }}>
          {TOOLS.map(tool => (
            <button key={tool.id} onClick={() => onSelectTool(tool)}
              style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:12, padding:"11px 13px", cursor:"pointer", textAlign:isRTL?"right":"left", display:"flex", gap:9, alignItems:"center", fontFamily:"inherit", transition:"all 0.14s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=tool.color; e.currentTarget.style.background=tool.color+"08"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.background="#f8f9fc"; }}>
              <TIcon type={tool.icon} color={tool.color} size={26}/>
              <span style={{ fontWeight:600, fontSize:"0.83rem" }}>{tool.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section style={{ background:"#f8f9fc", padding:"52px 24px", borderTop:"1px solid #eee" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h2 style={{ fontWeight:800, fontSize:"1.7rem", textAlign:"center", marginBottom:32 }}>{l.whyTitle}</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18 }}>
            {(l.whyPoints || []).map((w, i) => (
              <div key={i} style={{ background:"#fff", borderRadius:18, padding:"22px 20px", border:"1px solid #eee", display:"flex", gap:14 }}>
                <span style={{ fontSize:"1.6rem", flexShrink:0 }}>{w.icon}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:"0.93rem", marginBottom:7 }}>{w.title}</div>
                  <div style={{ fontSize:"0.83rem", color:"#888", lineHeight:1.7 }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"linear-gradient(135deg,#e74c3c,#e67e22)", padding:"50px 24px", textAlign:"center" }}>
        <h2 style={{ color:"#fff", fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, marginBottom:10 }}>{l.cta}</h2>
        <p style={{ color:"rgba(255,255,255,0.8)", marginBottom:24 }}>{l.tagline}</p>
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={{ background:"#fff", border:"none", color:"#e74c3c", padding:"13px 34px", borderRadius:12, fontWeight:800, fontSize:"0.97rem", cursor:"pointer", fontFamily:"inherit" }}>
          ⚡ {l.cta}
        </button>
      </section>

      {/* Language switcher footer */}
      <footer style={{ background:"#1a1a2e", padding:"24px", textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:10 }}>
          {Object.values(LANGUAGES).map(lg => (
            <button key={lg.slug} onClick={() => setSelected(lg)}
              style={{ background:"none", border:"none", color: l.slug===lg.slug ? "#fff" : "#555", fontSize:"0.8rem", cursor:"pointer", fontFamily:"inherit", fontWeight: l.slug===lg.slug ? 700 : 400 }}>
              {lg.flag} {lg.name || lg.slug}
            </button>
          ))}
          <button onClick={onHome} style={{ background:"none", border:"none", color:"#555", fontSize:"0.8rem", cursor:"pointer", fontFamily:"inherit" }}>
            🇬🇧 English
          </button>
        </div>
        <p style={{ color:"#444", fontSize:"0.76rem", margin:0 }}>{l.footerText}</p>
      </footer>
    </div>
  );
}
