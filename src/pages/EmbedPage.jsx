import React, { useState } from "react";
import { TOOLS } from "../tools";
import { SITE } from "../seo";
import { useSEO } from "../utils/useSEO";
import TIcon from "../components/TIcon";

export default function EmbedPage({ onSelectTool }) {
  const [sel,    setSel]    = useState("compress");
  const [copied, setCopied] = useState(false);
  const tool = TOOLS.find(t => t.id === sel);

  useSEO({
    title:       "Embed Free Image Tools on Your Website — Pixalyse Widget",
    description: "Add free image compression, resize, and conversion tools to your website. Copy-paste embed code. Free forever. No API key needed.",
    keywords:    "embed image compressor website, free image tool widget, add image compressor blog, embed image resize tool",
    canonical:   `${SITE.url}/embed`,
    schemaId:    "embed",
    schema: [{ "@context":"https://schema.org","@type":"WebPage","name":"Embed Pixalyse Tools","url":`${SITE.url}/embed` }],
  });

  const code = `<!-- Pixalyse ${tool?.name} — Free Widget -->
<iframe
  src="${SITE.url}/tool/${sel}?embed=1"
  width="100%"
  height="600"
  frameborder="0"
  style="border-radius:16px;border:1px solid #eee">
</iframe>
<p style="font-size:11px;color:#999;text-align:center;margin-top:8px">
  Powered by <a href="${SITE.url}" target="_blank" rel="noopener">Pixalyse</a>
  — Free Online Image Tools
</p>`;

  const copy = () => { try { navigator.clipboard.writeText(code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 2200); };

  return (
    <div style={{ background:"#fff", fontFamily:"inherit" }}>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#f0f8ff,#f5f0ff)", padding:"52px 24px 44px", borderBottom:"1px solid #eee", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #dde", borderRadius:50, padding:"6px 18px", marginBottom:20 }}>
          <span style={{ fontSize:"0.82rem", color:"#2980b9", fontWeight:700 }}>👩‍💻 For Developers & Bloggers</span>
        </div>
        <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:900, letterSpacing:"-0.03em", marginBottom:14, color:"#1a1a2e" }}>
          Add Free Image Tools to Your Website
        </h1>
        <p style={{ color:"#666", fontSize:"0.97rem", lineHeight:1.75, maxWidth:540, margin:"0 auto 22px" }}>
          Embed any of Pixalyse's 20 free image tools on your blog, documentation site, or web app. One line of code. Always free. Every embed = a backlink.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10 }}>
          {["✅ Free forever","✅ No API key","✅ Mobile responsive","✅ Privacy-first (local processing)"].map(b => (
            <span key={b} style={{ background:"#fff", border:"1px solid #eee", borderRadius:50, padding:"5px 14px", fontSize:"0.78rem", color:"#555" }}>{b}</span>
          ))}
        </div>
      </section>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"40px 24px" }}>
        {/* Step 1: Choose tool */}
        <div style={{ marginBottom:28 }}>
          <h2 style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:14, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.06em" }}>1. Select Tool to Embed</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {TOOLS.filter(t => !["gif-to-mp4","remove-bg"].includes(t.id)).map(t => (
              <button key={t.id} onClick={() => setSel(t.id)}
                style={{ background: sel===t.id ? t.color : "#fff", border:`1.5px solid ${sel===t.id ? t.color : "#eee"}`, borderRadius:50, padding:"6px 15px", fontSize:"0.8rem", color: sel===t.id ? "#fff" : "#666", cursor:"pointer", fontFamily:"inherit", fontWeight: sel===t.id ? 700 : 400, display:"flex", alignItems:"center", gap:6, transition:"all 0.14s" }}>
                <TIcon type={t.icon} color={sel===t.id?"#fff":t.color} size={15}/>{t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Copy code */}
        <div style={{ marginBottom:28 }}>
          <h2 style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:14, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.06em" }}>2. Copy Embed Code</h2>
          <div style={{ background:"#1a1a2e", borderRadius:16, padding:"20px", position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", gap:6 }}>
                {["#ff5f57","#ffbd2e","#28ca41"].map(c => <div key={c} style={{ width:11, height:11, borderRadius:"50%", background:c }}/>)}
              </div>
              <button onClick={copy} style={{ background: copied ? "#27ae60" : "#333", border:"none", color:"#fff", padding:"5px 14px", borderRadius:8, fontSize:"0.78rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                {copied ? "✅ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <pre style={{ color:"#a8d8a8", fontSize:"0.77rem", lineHeight:1.8, overflow:"auto", margin:0, whiteSpace:"pre-wrap", wordBreak:"break-all" }}>{code}</pre>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background:"#f8f9fc", borderRadius:16, padding:"22px", marginBottom:40 }}>
          <h2 style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:14, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.06em" }}>3. Preview</h2>
          <div style={{ background:"#fff", borderRadius:12, padding:"18px 16px", border:"1px solid #eee", display:"flex", gap:12, alignItems:"center" }}>
            {tool && <TIcon type={tool.icon} color={tool.color} size={40}/>}
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:"0.93rem" }}>{tool?.name} — Free Tool</div>
              <div style={{ fontSize:"0.8rem", color:"#888" }}>{tool?.desc} · Powered by Pixalyse</div>
            </div>
            <button onClick={() => onSelectTool(tool)} style={{ background:tool?.color, border:"none", color:"#fff", padding:"8px 16px", borderRadius:50, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.82rem", flexShrink:0 }}>
              Open Tool →
            </button>
          </div>
          <p style={{ fontSize:"0.73rem", color:"#bbb", textAlign:"center", margin:"10px 0 0" }}>
            Powered by <a href={SITE.url} style={{ color:"#bbb" }}>Pixalyse</a> — Free Online Image Tools
          </p>
        </div>

        {/* Use cases */}
        <h2 style={{ fontWeight:800, fontSize:"1.2rem", marginBottom:20 }}>Why embed Pixalyse on your site?</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
          {[
            { icon:"📝", title:"Bloggers & Content Creators",  desc:"Add a compressor to your blog. Readers get a useful tool without leaving your site — increasing time-on-page." },
            { icon:"💻", title:"Web Developers",              desc:"Embed image tools in client projects. No backend needed — all processing happens in the browser." },
            { icon:"📚", title:"Documentation Sites",         desc:"Add resize/compress tools next to image guidelines. Users can immediately apply recommendations." },
            { icon:"🛒", title:"E-commerce Platforms",        desc:"Help your sellers optimize product images to meet your marketplace requirements." },
            { icon:"🎓", title:"Education & Training",        desc:"Embed tools in your LMS for students to optimize images for assignments and projects." },
            { icon:"🏢", title:"Internal Tools",              desc:"Add image processing to company intranets without any development work." },
          ].map((item, i) => (
            <div key={i} style={{ background:"#f8f9fc", borderRadius:14, padding:"18px 16px", border:"1px solid #eee" }}>
              <div style={{ fontSize:"1.4rem", marginBottom:10 }}>{item.icon}</div>
              <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:7 }}>{item.title}</div>
              <div style={{ fontSize:"0.81rem", color:"#888", lineHeight:1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
