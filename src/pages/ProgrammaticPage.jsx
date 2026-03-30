import React, { useState, useRef } from "react";
import { TOOLS } from "../tools";
import { getPagesByTool } from "../programmatic-index";
import TIcon from "../components/TIcon";
import { processImg, fmtBytes, outName } from "../processors";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";

function FAQItem({ faq, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border:`1.5px solid ${open?color:"#eee"}`, borderRadius:12, overflow:"hidden", transition:"border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width:"100%", background: open?color+"06":"#fff", border:"none", padding:"14px 18px", textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, fontFamily:"inherit" }}>
        <span style={{ fontWeight:700, fontSize:"0.9rem", color:"#1a1a2e", lineHeight:1.4 }}>{faq.q}</span>
        <span style={{ color, fontSize:"1.2rem", flexShrink:0, transition:"transform 0.2s", transform: open?"rotate(45deg)":"none" }}>+</span>
      </button>
      {open && (
        <div style={{ padding:"0 18px 16px", borderTop:"1px solid #f0f0f0", background:"#fafafa" }}>
          <p style={{ fontSize:"0.87rem", color:"#555", lineHeight:1.8, marginTop:13, marginBottom:0 }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

function MiniWidget({ tool }) {
  const [file,   setFile]    = useState(null);
  const [prev,   setPrev]    = useState(null);
  const [result, setResult]  = useState(null);
  const [busy,   setBusy]    = useState(false);
  const [err,    setErr]     = useState(null);
  const [quality,setQuality] = useState(75);
  const ref = useRef();
  const tc  = tool?.color || "#e74c3c";
  const soon = ["gif-to-mp4","remove-bg"].includes(tool?.id);

  const load = (f) => {
    if (!f) return;
    setFile(f); setResult(null); setErr(null);
    if (f.type.startsWith("image/")) setPrev(URL.createObjectURL(f));
    else setPrev(null);
  };

  const run = async () => {
    if (soon) { setErr("Coming soon!"); return; }
    setBusy(true); setErr(null);
    try {
      const r = await processImg(tool.id, file, { quality });
      setResult({ blob:r.blob, url:URL.createObjectURL(r.blob), filename:outName(file.name,r.ext), origSize:file.size, newSize:r.blob.size });
    } catch (e) { setErr("Processing failed: " + e.message); }
    setBusy(false);
  };

  if (!tool) return null;

  return (
    <div style={{ background:"#fff", border:`2px solid ${tc}30`, borderRadius:18, overflow:"hidden" }}>
      <div style={{ background:`linear-gradient(135deg,${tc}12,${tc}06)`, padding:"14px 18px", borderBottom:`1px solid ${tc}20`, display:"flex", alignItems:"center", gap:12 }}>
        <TIcon type={tool.icon} color={tc} size={34}/>
        <div>
          <div style={{ fontWeight:800, fontSize:"0.97rem" }}>{tool.name}</div>
          <div style={{ fontSize:"0.75rem", color:"#888" }}>Free · No login · Local processing</div>
        </div>
      </div>
      <div style={{ padding:"18px" }}>
        {!file && !soon && (
          <div>
            <input ref={ref} type="file" accept="image/*,.heic,.heif" style={{ display:"none" }} onChange={e => load(e.target.files[0])}/>
            <button onClick={() => ref.current.click()} style={{ width:"100%", background:tc, border:"none", color:"#fff", padding:"13px", borderRadius:10, fontWeight:700, fontSize:"0.92rem", cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 14px ${tc}40`, marginBottom:8 }}>
              📁 Select Image to {tool.name}
            </button>
            <p style={{ textAlign:"center", color:"#bbb", fontSize:"0.74rem", margin:0 }}>🔒 File never leaves your device</p>
          </div>
        )}
        {soon && <div style={{ textAlign:"center", padding:"16px 0", color:"#aaa", fontSize:"0.87rem" }}>🚧 Coming soon — 19 other tools work now!</div>}
        {file && !result && (
          <div>
            {prev && <div style={{ textAlign:"center", marginBottom:12 }}><img src={prev} alt="preview" style={{ maxHeight:140, maxWidth:"100%", borderRadius:10, border:"1px solid #eee" }}/></div>}
            {["compress","bulk-compress"].includes(tool.id) && (
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:"0.8rem", color:"#888", display:"block", marginBottom:5 }}>Quality: <strong style={{ color:tc }}>{quality}%</strong></label>
                <input type="range" min={30} max={100} value={quality} onChange={e => setQuality(+e.target.value)} style={{ width:"100%", accentColor:tc }}/>
              </div>
            )}
            {busy && <div style={{ height:4, background:"#eee", borderRadius:3, marginBottom:10 }}><div style={{ height:"100%", background:tc, width:"60%", borderRadius:3, animation:"none" }}/></div>}
            {!busy && <button onClick={run} style={{ width:"100%", background:tc, border:"none", color:"#fff", padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.9rem" }}>⚡ Process Free</button>}
            {err && <p style={{ color:"#e74c3c", fontSize:"0.81rem", marginTop:10, textAlign:"center" }}>{err}</p>}
          </div>
        )}
        {result && (
          <div style={{ textAlign:"center" }}>
            {result.url && <img src={result.url} alt="result" style={{ maxHeight:120, maxWidth:"100%", borderRadius:10, border:"1px solid #d4edda", marginBottom:12 }}/>}
            <div style={{ display:"flex", justifyContent:"center", gap:18, marginBottom:14, fontSize:"0.81rem" }}>
              <div><div style={{ color:"#bbb", fontSize:"0.66rem", textTransform:"uppercase" }}>Before</div><div style={{ fontWeight:700 }}>{fmtBytes(result.origSize)}</div></div>
              {result.origSize > result.newSize && <div><div style={{ color:"#bbb", fontSize:"0.66rem", textTransform:"uppercase" }}>Saved</div><div style={{ fontWeight:800, color:"#27ae60" }}>-{Math.round((1-result.newSize/result.origSize)*100)}%</div></div>}
              <div><div style={{ color:"#bbb", fontSize:"0.66rem", textTransform:"uppercase" }}>After</div><div style={{ fontWeight:700, color:"#27ae60" }}>{fmtBytes(result.newSize)}</div></div>
            </div>
            <button onClick={() => { const a=document.createElement("a"); a.href=URL.createObjectURL(result.blob); a.download=result.filename; a.click(); }} style={{ width:"100%", background:"#27ae60", border:"none", color:"#fff", padding:"12px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.9rem", marginBottom:8 }}>⬇ Download {result.filename}</button>
            <button onClick={() => { setFile(null); setResult(null); setPrev(null); setErr(null); }} style={{ width:"100%", background:"#f8f9fc", border:"1px solid #eee", color:"#888", padding:"9px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.84rem" }}>Process Another</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProgrammaticPage({ page, onBack, onSelectTool, onPost }) {
  const tool    = TOOLS.find(t => t.id === page.toolId);
  const tc      = tool?.color || "#e74c3c";
  const url     = `${SITE.url}/${page.slug}`;
  const related = getPagesByTool(page.toolId).filter(p => p.slug !== page.slug).slice(0, 6);

  useSEO({
    title:       page.title,
    description: page.description,
    keywords:    page.keywords,
    canonical:   url,
    schema: [
      { "@context":"https://schema.org", "@type":"WebPage", "name":page.title, "description":page.description, "url":url },
      page.faqs?.length ? { "@context":"https://schema.org", "@type":"FAQPage", "mainEntity": page.faqs.map(f => ({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} })) } : null
    ].filter(Boolean),
    schemaId: `prog-${page.slug}`,
  });

  return (
    <div style={{ background:"#fff", minHeight:"100vh", fontFamily:"inherit" }}>
      {/* Breadcrumb */}
      <nav style={{ background:"#f8f9fc", borderBottom:"1px solid #eee", padding:"10px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", gap:8, fontSize:"0.8rem", color:"#aaa", flexWrap:"wrap" }}>
          <a href="/" onClick={e=>{e.preventDefault();onBack();}} style={{ color:"#aaa", textDecoration:"none" }}>Home</a>
          <span>›</span>
          <a href={`/tool/${tool?.id}`} onClick={e=>{e.preventDefault();onSelectTool(tool);}} style={{ color:"#aaa", textDecoration:"none" }}>{tool?.name}</a>
          <span>›</span>
          <span style={{ color:"#555" }}>{page.h1}</span>
        </div>
      </nav>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"40px 24px" }}>
        {/* Header */}
        <header style={{ marginBottom:30 }}>
          {tool && (
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <TIcon type={tool.icon} color={tc} size={28}/>
              <span style={{ fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:tc, background:tc+"15", padding:"3px 12px", borderRadius:50 }}>{tool.cat}</span>
              <span style={{ fontSize:"0.7rem", color:"#bbb" }}>· Free · No Login · No Watermark</span>
            </div>
          )}
          <h1 style={{ fontSize:"clamp(1.6rem,3.5vw,2.3rem)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.2, marginBottom:14, color:"#1a1a2e" }}>{page.h1}</h1>
          <p style={{ fontSize:"0.98rem", color:"#555", lineHeight:1.78, marginBottom:18, maxWidth:700 }}>{page.intro}</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["🔒 Files stay on your device","⚡ Instant results","📵 No watermarks","🆓 100% free"].map(b => (
              <span key={b} style={{ background:"#f8f9fc", border:"1px solid #eee", borderRadius:50, padding:"4px 12px", fontSize:"0.75rem", color:"#666" }}>{b}</span>
            ))}
          </div>
        </header>

        {/* Inline tool widget */}
        <div style={{ marginBottom:34 }}>
          <MiniWidget tool={tool}/>
        </div>

        {/* Why section */}
        {page.whySection && (
          <div style={{ background:tc+"08", border:`1.5px solid ${tc}20`, borderRadius:16, padding:"20px 22px", marginBottom:30 }}>
            <h2 style={{ fontWeight:800, fontSize:"0.97rem", marginBottom:9 }}>Why this matters</h2>
            <p style={{ fontSize:"0.91rem", color:"#555", lineHeight:1.8, margin:0 }}>{page.whySection}</p>
          </div>
        )}

        {/* FAQs */}
        {page.faqs?.length > 0 && (
          <section style={{ marginBottom:34 }}>
            <h2 style={{ fontWeight:800, fontSize:"1.1rem", marginBottom:16 }}>Frequently Asked Questions</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {page.faqs.map((faq, i) => <FAQItem key={i} faq={faq} color={tc}/>)}
            </div>
          </section>
        )}

        {/* CTA to main tool */}
        <div style={{ background:`linear-gradient(135deg,${tc}10,${tc}05)`, border:`2px solid ${tc}25`, borderRadius:18, padding:"26px 22px", textAlign:"center", marginBottom:34 }}>
          <TIcon type={tool?.icon} color={tc} size={42}/>
          <h3 style={{ fontWeight:800, fontSize:"1.05rem", margin:"12px 0 8px" }}>More {tool?.name} Options</h3>
          <p style={{ color:"#777", fontSize:"0.87rem", marginBottom:18, lineHeight:1.6 }}>See all settings and formats on the full tool page.</p>
          <a href={`/tool/${tool?.id}`} onClick={e=>{e.preventDefault();onSelectTool(tool);}}
            style={{ display:"inline-block", background:tc, color:"#fff", padding:"11px 26px", borderRadius:12, fontWeight:700, fontSize:"0.93rem", cursor:"pointer", textDecoration:"none", boxShadow:`0 4px 14px ${tc}40` }}>
            Open Full {tool?.name} →
          </a>
        </div>

        {/* Related pages */}
        {related.length > 0 && (
          <section>
            <h2 style={{ fontWeight:700, fontSize:"0.88rem", marginBottom:14, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.08em" }}>Related Guides</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10 }}>
              {related.map(p => (
                <a key={p.slug} href={`/${p.slug}`}
                  onClick={e => { e.preventDefault(); window.history.pushState({},"",`/${p.slug}`); window.dispatchEvent(new PopStateEvent("popstate")); }}
                  style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:12, padding:"13px 16px", textDecoration:"none", color:"inherit", display:"block", transition:"all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=tc; e.currentTarget.style.background="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.background="#f8f9fc"; }}>
                  <div style={{ fontWeight:600, fontSize:"0.87rem", color:"#1a1a2e", lineHeight:1.4 }}>{p.h1}</div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
