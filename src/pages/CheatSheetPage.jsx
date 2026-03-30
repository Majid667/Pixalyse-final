import React, { useState } from "react";
import { SOCIAL_MEDIA_SIZES } from "../flywheel";
import { TOOLS } from "../tools";
import { SITE } from "../seo";
import { useSEO } from "../utils/useSEO";

export default function CheatSheetPage({ onSelectTool }) {
  const [active, setActive] = useState(null);
  const d = SOCIAL_MEDIA_SIZES;
  const resizeTool   = TOOLS.find(t => t.id === "resize");
  const compressTool = TOOLS.find(t => t.id === "compress");

  useSEO({
    title:       d.seoTitle,
    description: d.seoDesc,
    keywords:    d.seoKeywords,
    canonical:   `${SITE.url}/social-media-image-sizes`,
    schema: [{
      "@context":"https://schema.org","@type":"Article",
      "headline":d.title,"description":d.seoDesc,
      "url":`${SITE.url}/social-media-image-sizes`,
      "dateModified":"2026-03-24",
      "publisher":{"@type":"Organization","name":"Pixalyse","url":SITE.url}
    }],
    schemaId:"cheatsheet",
  });

  return (
    <div style={{ background:"#fff", fontFamily:"inherit" }}>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#fff5f5,#fff9f0,#f0f8ff)", padding:"52px 24px 44px", borderBottom:"1px solid #eee", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #fcc", borderRadius:50, padding:"6px 18px", marginBottom:20 }}>
          <span style={{ fontSize:"0.82rem", color:"#e74c3c", fontWeight:700 }}>📌 Updated March 2026 · Bookmark This Page</span>
        </div>
        <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, letterSpacing:"-0.03em", marginBottom:14, color:"#1a1a2e" }}>
          Social Media Image Sizes 2026
        </h1>
        <p style={{ color:"#666", fontSize:"0.97rem", lineHeight:1.7, maxWidth:580, margin:"0 auto 24px" }}>
          Every image dimension for every platform — Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, Pinterest, WhatsApp, Google Ads, and Email. The only cheat sheet you need.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8 }}>
          {(d.platforms || []).map(p => (
            <button key={p.name} onClick={() => { setActive(p.name); document.getElementById(`plat-${p.name}`)?.scrollIntoView({ behavior:"smooth", block:"start" }); }}
              style={{ background: active===p.name ? p.color : "#fff", border:`2px solid ${active===p.name ? p.color : "#eee"}`, borderRadius:50, padding:"6px 16px", fontSize:"0.79rem", color: active===p.name ? "#fff" : "#666", cursor:"pointer", fontFamily:"inherit", fontWeight:600, transition:"all 0.15s" }}>
              {p.icon} {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Quick-action bar */}
      <div style={{ background:"#fff8f0", borderBottom:"1px solid #fde8cc", padding:"12px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
          <span style={{ fontSize:"0.88rem", color:"#666", flex:1 }}>📐 Found the size you need? Resize instantly — free.</span>
          <button onClick={() => onSelectTool(resizeTool)} style={{ background:"#e67e22", border:"none", color:"#fff", padding:"8px 18px", borderRadius:50, fontWeight:700, fontSize:"0.83rem", cursor:"pointer", fontFamily:"inherit" }}>Resize Image →</button>
          <button onClick={() => onSelectTool(compressTool)} style={{ background:"#fff", border:"1.5px solid #e74c3c", color:"#e74c3c", padding:"8px 18px", borderRadius:50, fontWeight:600, fontSize:"0.83rem", cursor:"pointer", fontFamily:"inherit" }}>Compress Image →</button>
        </div>
      </div>

      {/* Platform tables */}
      <div style={{ maxWidth:1000, margin:"0 auto", padding:"40px 24px" }}>
        {(d.platforms || []).map(platform => (
          <section key={platform.name} id={`plat-${platform.name}`} style={{ marginBottom:50, scrollMarginTop:80 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, paddingBottom:14, borderBottom:`3px solid ${platform.color}` }}>
              <span style={{ fontSize:"1.8rem" }}>{platform.icon}</span>
              <div>
                <h2 style={{ fontWeight:800, fontSize:"1.3rem", color:"#1a1a2e", margin:0 }}>{platform.name} Image Sizes</h2>
                <p style={{ color:"#aaa", fontSize:"0.8rem", margin:0 }}>All {platform.name} formats for 2026</p>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:12 }}>
              {(platform.formats || []).map(fmt => (
                <div key={fmt.label} style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:14, padding:"16px 18px", position:"relative" }}>
                  <div style={{ fontSize:"0.67rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:platform.color, marginBottom:8 }}>{fmt.label}</div>
                  <div style={{ fontWeight:800, fontSize:"1.2rem", color:"#1a1a2e", marginBottom:6, fontVariantNumeric:"tabular-nums" }}>{fmt.size}</div>
                  {fmt.ratio && <span style={{ background:platform.color+"18", color:platform.color, fontSize:"0.69rem", fontWeight:700, padding:"2px 10px", borderRadius:50, display:"inline-block", marginBottom:8 }}>{fmt.ratio}</span>}
                  {fmt.note && <div style={{ fontSize:"0.78rem", color:"#888", lineHeight:1.5 }}>{fmt.note}</div>}
                  <button onClick={() => onSelectTool(resizeTool)}
                    style={{ position:"absolute", top:12, right:12, background:platform.color+"18", border:"none", color:platform.color, padding:"3px 10px", borderRadius:50, fontSize:"0.68rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    Resize →
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Tips */}
        <section style={{ background:"#f8f9fc", borderRadius:20, padding:"30px", marginBottom:40 }}>
          <h2 style={{ fontWeight:800, fontSize:"1.2rem", marginBottom:20 }}>💡 Pro Tips for Social Media Images</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:16 }}>
            {[
              { tip:"Design once, resize for each platform", detail:"Create at the largest size needed, then use Pixalyse to resize down. Quality is always better going down than up." },
              { tip:"Compress before uploading",             detail:"All platforms recompress on upload. Pre-compress at 80-85% quality in Pixalyse so platforms have nothing more to compress." },
              { tip:"Safe zone rule",                        detail:"Keep important content in the central 80% of the image. Platforms crop differently between desktop and mobile." },
              { tip:"Test on mobile first",                  detail:"Over 70% of social media is consumed on mobile. Preview at phone size before posting." },
              { tip:"Use JPEG for photos, PNG for graphics", detail:"Most platforms handle JPEG best for photos. PNG for logos, icons, graphics with text." },
              { tip:"Bookmark and share this page",          detail:"Platforms update dimensions regularly. This page is updated whenever anything changes." },
            ].map((item, i) => (
              <div key={i} style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #eee" }}>
                <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:7 }}>✅ {item.tip}</div>
                <div style={{ fontSize:"0.81rem", color:"#888", lineHeight:1.65 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Share CTA */}
        <div style={{ background:"linear-gradient(135deg,#f0f8ff,#fff5f5)", border:"2px solid #eee", borderRadius:20, padding:"28px", textAlign:"center" }}>
          <h3 style={{ fontWeight:800, fontSize:"1.05rem", marginBottom:10 }}>📎 Share This Cheat Sheet</h3>
          <p style={{ color:"#666", fontSize:"0.88rem", marginBottom:20, maxWidth:440, margin:"0 auto 20px" }}>
            Find this useful? Share it with your team or link to it from your blog. We keep it updated whenever platforms change dimensions.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => { try { navigator.clipboard.writeText(`${SITE.url}/social-media-image-sizes`); } catch{} }}
              style={{ background:"#1a1a2e", border:"none", color:"#fff", padding:"10px 22px", borderRadius:50, fontWeight:700, fontSize:"0.84rem", cursor:"pointer", fontFamily:"inherit" }}>
              📋 Copy Page Link
            </button>
            <a href={`https://twitter.com/intent/tweet?text=Social+Media+Image+Sizes+2026+%E2%80%94+Complete+Cheat+Sheet&url=${SITE.url}/social-media-image-sizes`}
              target="_blank" rel="noopener noreferrer"
              style={{ background:"#000", color:"#fff", padding:"10px 22px", borderRadius:50, fontWeight:700, fontSize:"0.84rem", textDecoration:"none", display:"inline-block" }}>
              Share on X →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
