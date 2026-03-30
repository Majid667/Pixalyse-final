import React, { useState, useRef } from "react";
import { TOOLS } from "../tools";
import { BLOGS } from "../blogs-index";
import { TOOL_SEO, SITE } from "../seo";
import TIcon from "../components/TIcon";
import { NextToolSuggestions, JourneyBanner } from "./CalcPage";
import { processImg, fmtBytes, outName } from "../processors";
import { useSEO, buildToolSchema } from "../utils/useSEO";
import { saveHistory } from "../utils/history";

// ─── Before / After Comparison Slider ────────────────────────────────────────
function CompareResult({ result, prev, tc, onDl, onReset }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging,  setDragging]  = useState(false);
  const [showSlider, setShowSlider] = useState(!!prev);
  const containerRef = useRef();

  const handleMove = (e) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div style={{ background:"#f0faf4", border:"1px solid #b7e4c7", borderRadius:18, padding:24, textAlign:"center" }}>
      <h3 style={{ fontWeight:800, color:"#27ae60", fontSize:"1.15rem", marginBottom:16 }}>✅ Done! Your file is ready.</h3>

      {/* Comparison slider (only for image tools with a preview) */}
      {prev && result.url && showSlider ? (
        <div style={{ marginBottom:18 }}>
          <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:8 }}>
            <button onClick={() => setShowSlider(false)} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#888", padding:"4px 12px", borderRadius:50, cursor:"pointer", fontSize:"0.76rem", fontFamily:"inherit" }}>Single view</button>
            <span style={{ fontSize:"0.76rem", color:"#aaa", alignSelf:"center" }}>← Drag slider to compare →</span>
          </div>
          <div ref={containerRef}
            style={{ position:"relative", borderRadius:14, overflow:"hidden", cursor:"ew-resize", userSelect:"none", maxWidth:"100%", height:240, background:"#f0f0f0" }}
            onMouseMove={handleMove} onMouseUp={()=>setDragging(false)} onMouseLeave={()=>setDragging(false)}
            onTouchMove={handleMove} onTouchEnd={()=>setDragging(false)}>

            {/* After (processed) — full width */}
            <img src={result.url} alt="After" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", background:"#fff" }}/>

            {/* Before (original) — clipped */}
            <div style={{ position:"absolute", inset:0, clipPath:`inset(0 ${100-sliderPos}% 0 0)`, borderRight:`2px solid #fff` }}>
              <img src={prev} alt="Before" style={{ width:"100%", height:"100%", objectFit:"contain", background:"#f8f8f8", position:"absolute", inset:0 }}/>
            </div>

            {/* Labels */}
            <div style={{ position:"absolute", top:8, left:8, background:"rgba(0,0,0,0.6)", color:"#fff", fontSize:"0.68rem", fontWeight:700, padding:"3px 10px", borderRadius:50, letterSpacing:"0.06em" }}>BEFORE</div>
            <div style={{ position:"absolute", top:8, right:8, background:"rgba(39,174,96,0.85)", color:"#fff", fontSize:"0.68rem", fontWeight:700, padding:"3px 10px", borderRadius:50, letterSpacing:"0.06em" }}>AFTER</div>

            {/* Drag handle */}
            <div style={{ position:"absolute", top:0, bottom:0, left:`${sliderPos}%`, transform:"translateX(-50%)", width:4, background:"#fff", boxShadow:"0 0 12px rgba(0,0,0,0.4)", cursor:"ew-resize" }}
              onMouseDown={()=>setDragging(true)} onTouchStart={()=>setDragging(true)}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:32, height:32, borderRadius:"50%", background:"#fff", boxShadow:"0 2px 12px rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem" }}>⇄</div>
            </div>
          </div>
        </div>
      ) : (
        result.url && (
          <div style={{ marginBottom:16 }}>
            <img src={result.url} alt="Result" style={{ maxHeight:200, maxWidth:"100%", borderRadius:14, border:"1px solid #d4edda", objectFit:"contain", background:"#fff", padding:4 }}/>
            {prev && <button onClick={()=>setShowSlider(true)} style={{ display:"block", margin:"8px auto 0", background:"#f0faf4", border:"1px solid #27ae60", color:"#27ae60", padding:"5px 16px", borderRadius:50, cursor:"pointer", fontSize:"0.78rem", fontFamily:"inherit", fontWeight:600 }}>⇄ Compare with original</button>}
          </div>
        )
      )}

      {/* Stats row */}
      <div style={{ display:"flex", justifyContent:"center", gap:20, marginBottom:18, flexWrap:"wrap" }}>
        {[
          ["Original", fmtBytes(result.origSize), "#888"],
          result.origSize > result.newSize ? ["Compressed", fmtBytes(result.newSize), "#27ae60"] : ["Output", fmtBytes(result.newSize), "#2980b9"],
          result.origSize > result.newSize ? ["Saved", "-"+Math.round((1-result.newSize/result.origSize)*100)+"%", "#27ae60"] : null
        ].filter(Boolean).map((s, i) => (
          <div key={i} style={{ textAlign:"center" }}>
            <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.08em", color:"#aaa", marginBottom:3 }}>{s[0]}</div>
            <div style={{ fontWeight:800, fontSize:"1.05rem", color:s[2] }}>{s[1]}</div>
          </div>
        ))}
      </div>

      <button onClick={onDl} style={{ background:tc, border:"none", color:"#fff", padding:"13px 28px", borderRadius:14, fontWeight:800, fontSize:"0.97rem", cursor:"pointer", fontFamily:"inherit", display:"block", width:"100%", marginBottom:10, boxShadow:`0 4px 18px ${tc}50` }}>
        ⬇ Download {result.filename}
      </button>
      <button onClick={onReset} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#aaa", padding:11, borderRadius:12, cursor:"pointer", fontFamily:"inherit", width:"100%", fontSize:"0.87rem" }}>
        Process Another File
      </button>
    </div>
  );
}

const RELATED = {
  "compress":["bulk-compress","resize","webp-to-jpg","image-to-pdf"],
  "bulk-compress":["compress","resize","image-to-pdf","screenshot-to-pdf"],
  "resize":["compress","crop","watermark","image-to-pdf"],
  "crop":["resize","rotate","watermark","compress"],
  "rotate":["crop","resize","watermark","compress"],
  "watermark":["compress","resize","upscale","crop"],
  "upscale":["compress","blur-bg","remove-bg","watermark"],
  "blur-bg":["remove-bg","upscale","watermark","crop"],
  "remove-bg":["blur-bg","upscale","png-to-jpg","watermark"],
  "png-to-jpg":["jpg-to-png","webp-to-jpg","heic-to-jpg","compress"],
  "jpg-to-png":["png-to-jpg","svg-to-png","remove-bg","watermark"],
  "webp-to-jpg":["png-to-jpg","heic-to-jpg","jpg-to-png","compress"],
  "heic-to-jpg":["webp-to-jpg","png-to-jpg","compress","resize"],
  "svg-to-png":["jpg-to-png","resize","compress","watermark"],
  "image-to-pdf":["screenshot-to-pdf","compress","resize","bulk-compress"],
  "pdf-to-image":["image-to-pdf","compress","resize","screenshot-to-pdf"],
  "gif-to-mp4":["compress","resize","bulk-compress","image-to-pdf"],
  "base64":["compress","resize","png-to-jpg","svg-to-png"],
  "passport":["crop","resize","compress","watermark"],
  "screenshot-to-pdf":["image-to-pdf","compress","bulk-compress","pdf-to-image"],
};

function FAQItem({ faq, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border:`1.5px solid ${open ? color : "#eee"}`, borderRadius:14, overflow:"hidden", transition:"border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width:"100%", background: open ? color+"06" : "#fff", border:"none", padding:"16px 20px", textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, fontFamily:"inherit" }}>
        <span style={{ fontWeight:700, fontSize:"0.91rem", color:"#1a1a2e", lineHeight:1.4 }}>{faq.q}</span>
        <span style={{ color, fontSize:"1.2rem", flexShrink:0, transition:"transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ padding:"0 20px 18px", borderTop:"1px solid #f0f0f0", background:"#fafafa" }}>
          <p style={{ fontSize:"0.88rem", color:"#555", lineHeight:1.8, marginTop:14, marginBottom:0 }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function ToolPage({ tool, onBack, onPost, onSelectTool }) {
  const seo = TOOL_SEO[tool.id] || {};
  const url = `${SITE.url}/tool/${tool.id}`;

  useSEO({
    title:       seo.title || `${tool.name} Online Free | Pixalyse`,
    description: seo.description || tool.desc,
    keywords:    seo.keywords || "",
    canonical:   url,
    schema:      buildToolSchema(tool, seo, url),
    schemaId:    `tool-${tool.id}`,
  });

  const [file,   setFile]   = useState(null);
  const [files,  setFiles]  = useState([]);
  const [drag,   setDrag]   = useState(false);
  const [result, setResult] = useState(null);
  const [busy,   setBusy]   = useState(false);
  const [prog,   setProg]   = useState(0);
  const [err,    setErr]    = useState(null);
  const [prev,   setPrev]   = useState(null);
  const ref = useRef();

  // Settings state
  const [quality,  setQuality]  = useState(75);
  const [W,        setW]        = useState("");
  const [H,        setH]        = useState("");
  const [deg,      setDeg]      = useState(90);
  const [fh,       setFh]       = useState(false);
  const [fv,       setFv]       = useState(false);
  const [cx,       setCx]       = useState("0");
  const [cy,       setCy]       = useState("0");
  const [cw,       setCw]       = useState("400");
  const [ch,       setCh]       = useState("300");
  const [wmTxt,    setWmTxt]    = useState("Pixalyse");
  const [wmOp,     setWmOp]     = useState(40);
  const [wmPos,    setWmPos]    = useState("center");
  const [wmCol,    setWmCol]    = useState("#ffffff");
  const [passSize, setPassSize] = useState("35x45");
  const [blurAmt,  setBlurAmt]  = useState(10);
  const [scale,    setScale]    = useState(2);

  const tc = tool.color;
  const soon = ["gif-to-mp4","remove-bg"].includes(tool.id);
  const multi = ["bulk-compress","image-to-pdf","screenshot-to-pdf"].includes(tool.id);

  const relatedTools = (RELATED[tool.id] || []).map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
  const relatedBlog  = BLOGS.find(b => b.toolId === tool.id);

  const loadFiles = (fs) => {
    const arr = Array.from(fs);
    if (!arr.length) return;
    setFiles(arr); setFile(arr[0]); setResult(null); setErr(null);
    if (arr[0].type.startsWith("image/")) setPrev(URL.createObjectURL(arr[0]));
    else setPrev(null);
  };

  const loadDemo = async () => {
    setErr(null); setResult(null);
    try {
      const r = await fetch("https://picsum.photos/seed/pixalyse/800/600");
      const b = await r.blob();
      const f = new File([b], "demo.jpg", { type:"image/jpeg" });
      setFile(f); setFiles([f]); setCw("600"); setCh("400");
      setPrev(URL.createObjectURL(b));
    } catch {
      setErr("Demo image blocked. Please upload any image file to test.");
    }
  };

  const reset = () => { setFile(null); setFiles([]); setPrev(null); setResult(null); setErr(null); setProg(0); };
  const dl    = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(result.blob); a.download = result.filename; a.click(); };

  const run = async () => {
    if (soon) { setErr("⏳ Coming soon — all other 19 tools work right now!"); return; }
    setBusy(true); setErr(null); setProg(15);
    try {
      // Base64
      if (tool.id === "base64") {
        const rd = new FileReader();
        rd.onload = e => { setProg(100); setResult({ type:"b64", val:e.target.result }); setBusy(false); };
        rd.readAsDataURL(file);
        return;
      }
      // Bulk compress
      if (tool.id === "bulk-compress") {
        const out = [];
        for (let i = 0; i < files.length; i++) {
          setProg(15 + Math.round((i / files.length) * 80));
          const r = await processImg("compress", files[i], { quality });
          out.push({ blob:r.blob, name:outName(files[i].name,"jpg"), orig:files[i].size, size:r.blob.size });
        }
        setProg(100); setResult({ type:"bulk", items:out }); setBusy(false); return;
      }
      // PDF tools
      if (["image-to-pdf","screenshot-to-pdf"].includes(tool.id)) {
        if (!window.jspdf) { setErr("PDF library loading — please try again in a moment."); setBusy(false); return; }
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation:"portrait", unit:"px" });
        let first = true;
        for (const f of files) {
          await new Promise(ok => {
            const img = new Image(), u = URL.createObjectURL(f);
            img.onload = () => {
              const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
              const ratio = Math.min(pw / img.width, ph / img.height);
              if (!first) pdf.addPage(); first = false;
              const cv = document.createElement("canvas");
              cv.width = img.width; cv.height = img.height;
              cv.getContext("2d").drawImage(img, 0, 0);
              pdf.addImage(cv.toDataURL("image/jpeg", 0.85), "JPEG",
                (pw - img.width * ratio) / 2, (ph - img.height * ratio) / 2,
                img.width * ratio, img.height * ratio);
              URL.revokeObjectURL(u); ok();
            };
            img.src = u;
          });
        }
        setProg(100);
        const blob = pdf.output("blob");
        setResult({ type:"file", blob, filename:"pixalyse_doc.pdf", origSize:files.reduce((a,f)=>a+f.size,0), newSize:blob.size });
        setBusy(false); return;
      }
      // All other tools
      setProg(55);
      const r = await processImg(tool.id, file, {
        quality, w:W, h:H, deg, fh, fv, cx, cy, cw, ch,
        text:wmTxt, opacity:wmOp/100, pos:wmPos, color:wmCol,
        size:passSize, blur:blurAmt, scale
      });
      setProg(100);
      const imgResult = { type:"img", blob:r.blob, url:URL.createObjectURL(r.blob), filename:outName(file.name, r.ext), origSize:file.size, newSize:r.blob.size };
      setResult(imgResult);
      try { saveHistory({ toolId:tool.id, toolName:tool.name, fileName:file.name, origSize:file.size, newSize:r.blob.size, date:new Date().toISOString() }); } catch {}
    } catch (e) { setErr("Processing failed: " + e.message); }
    setBusy(false);
  };

  const Seg = ({ opts, val, set }) => (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      {opts.map(o => (
        <button key={String(o)} onClick={() => set(o)} style={{
          background: val === o ? tc : "#f8f9fc",
          border:`1.5px solid ${val === o ? tc : "#eee"}`,
          color: val === o ? "#fff" : "#888",
          padding:"7px 16px", borderRadius:50, cursor:"pointer",
          fontSize:"0.84rem", fontFamily:"inherit", fontWeight: val === o ? 700 : 400
        }}>{o}</button>
      ))}
    </div>
  );

  const NIn = ({ label, val, set, ph="" }) => (
    <div>
      <label style={{ fontSize:"0.81rem", color:"#888", display:"block", marginBottom:5 }}>{label}</label>
      <input type="number" placeholder={ph} value={val} onChange={e => set(e.target.value)} style={{
        width:"100%", background:"#f8f9fc", border:"1.5px solid #eee",
        borderRadius:10, padding:"10px 14px", fontFamily:"inherit",
        fontSize:"0.9rem", outline:"none", boxSizing:"border-box"
      }}/>
    </div>
  );

  const renderSettings = () => {
    if (soon) return null;
    switch (tool.id) {
      case "compress": case "bulk-compress":
        return (
          <div>
            <label style={{ fontSize:"0.84rem", color:"#888", marginBottom:8, display:"block" }}>
              Quality: <strong style={{ color:tc }}>{quality}%</strong>
            </label>
            <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(+e.target.value)} style={{ width:"100%", accentColor:tc }}/>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.71rem", color:"#bbb", marginTop:4 }}>
              <span>Smallest file</span><span>Balanced</span><span>Best quality</span>
            </div>
          </div>
        );
      case "resize":
        return (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <NIn label="Width (px)" val={W} set={setW} ph="e.g. 1920"/>
              <NIn label="Height (px)" val={H} set={setH} ph="e.g. 1080"/>
            </div>
            <p style={{ fontSize:"0.77rem", color:"#bbb", fontStyle:"italic", margin:0 }}>Leave one blank to maintain aspect ratio</p>
          </div>
        );
      case "crop":
        return (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <NIn label="X offset (px)" val={cx} set={setCx}/>
            <NIn label="Y offset (px)" val={cy} set={setCy}/>
            <NIn label="Width (px)"    val={cw} set={setCw}/>
            <NIn label="Height (px)"   val={ch} set={setCh}/>
          </div>
        );
      case "rotate":
        return (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={{ fontSize:"0.82rem", color:"#888", display:"block", marginBottom:8 }}>Rotation</label>
              <Seg opts={[90,180,270]} val={deg} set={setDeg}/>
            </div>
            <div style={{ display:"flex", gap:22 }}>
              {[["↔ Flip Horizontal",fh,setFh],["↕ Flip Vertical",fv,setFv]].map(([l,v,sv]) => (
                <label key={l} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", color:"#888", fontSize:"0.87rem" }}>
                  <input type="checkbox" checked={v} onChange={e => sv(e.target.checked)} style={{ accentColor:tc, width:16, height:16 }}/>{l}
                </label>
              ))}
            </div>
          </div>
        );
      case "watermark":
        return (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={{ fontSize:"0.81rem", color:"#888", display:"block", marginBottom:5 }}>Watermark text</label>
              <input type="text" value={wmTxt} onChange={e => setWmTxt(e.target.value)} placeholder="Your name or website URL" style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:10, padding:"10px 14px", fontFamily:"inherit", fontSize:"0.9rem", outline:"none", boxSizing:"border-box" }}/>
            </div>
            <div>
              <label style={{ fontSize:"0.82rem", color:"#888", display:"block", marginBottom:8 }}>Opacity: <strong style={{ color:tc }}>{wmOp}%</strong></label>
              <input type="range" min={10} max={100} value={wmOp} onChange={e => setWmOp(+e.target.value)} style={{ width:"100%", accentColor:tc }}/>
            </div>
            <div>
              <label style={{ fontSize:"0.82rem", color:"#888", display:"block", marginBottom:8 }}>Position</label>
              <Seg opts={["center","topleft","bottomright"]} val={wmPos} set={setWmPos}/>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <label style={{ fontSize:"0.82rem", color:"#888" }}>Text colour</label>
              <input type="color" value={wmCol} onChange={e => setWmCol(e.target.value)} style={{ height:36, width:64, cursor:"pointer", border:"1.5px solid #eee", borderRadius:8 }}/>
            </div>
          </div>
        );
      case "passport":
        return (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <label style={{ fontSize:"0.82rem", color:"#888", display:"block", marginBottom:8 }}>Country standard</label>
              <Seg opts={["35x45","2x2","40x60"]} val={passSize} set={setPassSize}/>
            </div>
            <p style={{ fontSize:"0.77rem", color:"#bbb", fontStyle:"italic", margin:0 }}>35×45mm = UK/EU/India/Australia · 2×2in = USA · 40×60mm = China</p>
          </div>
        );
      case "blur-bg":
        return (
          <div>
            <label style={{ fontSize:"0.82rem", color:"#888", display:"block", marginBottom:8 }}>Blur strength: <strong style={{ color:tc }}>{blurAmt}px</strong></label>
            <input type="range" min={2} max={30} value={blurAmt} onChange={e => setBlurAmt(+e.target.value)} style={{ width:"100%", accentColor:tc }}/>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.71rem", color:"#bbb", marginTop:4 }}><span>Subtle</span><span>Natural</span><span>Strong</span></div>
          </div>
        );
      case "upscale":
        return (
          <div>
            <label style={{ fontSize:"0.82rem", color:"#888", display:"block", marginBottom:8 }}>Scale factor</label>
            <Seg opts={[2,3,4]} val={scale} set={setScale}/>
            <p style={{ fontSize:"0.77rem", color:"#bbb", fontStyle:"italic", marginTop:8 }}>2× for most images · 4× for very small originals</p>
          </div>
        );
      default:
        return <p style={{ color:"#bbb", fontSize:"0.87rem", margin:0 }}>No extra settings needed — click Process below.</p>;
    }
  };

  return (
    <div style={{ background:"#f8f9fc", minHeight:"100vh", fontFamily:"inherit" }}>
      {/* Tool nav bar */}
      <nav style={{ background:"#fff", borderBottom:"1px solid #eee", padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:62, zIndex:90, boxShadow:"0 1px 5px rgba(0,0,0,0.04)" }}>
        <button onClick={onBack} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#888", padding:"6px 14px", borderRadius:50, cursor:"pointer", fontSize:"0.83rem", fontFamily:"inherit" }}>← All Tools</button>
        <span style={{ fontSize:"0.76rem", color:"#bbb" }}>Free · Private · No Watermark</span>
        <div/>
      </nav>

      {/* Ad slot */}
      <div style={{ background:"#fff", borderBottom:"1px solid #eee", minHeight:70, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:"#ddd", fontSize:"0.66rem", letterSpacing:"0.12em", textTransform:"uppercase" }}>Advertisement</span>
      </div>

      <div style={{ display:"flex", maxWidth:1140, margin:"0 auto", padding:"28px 16px", gap:20 }}>
        {/* Left ad */}
        <aside style={{ width:140, flexShrink:0 }}>
          <div style={{ background:"#fff", border:"1px dashed #e8e8e8", borderRadius:14, height:600, display:"flex", alignItems:"center", justifyContent:"center", position:"sticky", top:130 }}>
            <span style={{ writingMode:"vertical-rl", color:"#ddd", fontSize:"0.64rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>Advertisement</span>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex:1, minWidth:0 }}>
          {/* Header with SEO H1 */}
          <header style={{ background:"#fff", borderRadius:20, padding:"24px 28px", marginBottom:18, border:"1px solid #eee", borderTop:`4px solid ${tc}`, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex", gap:18, alignItems:"flex-start", flexWrap:"wrap" }}>
              <TIcon type={tool.icon} color={tc} size={52}/>
              <div style={{ flex:1, minWidth:200 }}>
                <h1 style={{ fontWeight:800, fontSize:"clamp(1.2rem,3vw,1.7rem)", letterSpacing:"-0.02em", marginBottom:7, lineHeight:1.25 }}>
                  {seo.h1 || tool.name}
                </h1>
                <p style={{ color:"#666", fontSize:"0.91rem", marginBottom:14, lineHeight:1.6 }}>
                  {seo.subheading || tool.desc}
                </p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["🔒 100% Private","⚡ Instant","📵 No Watermark","🆓 Free"].map(b => (
                    <span key={b} style={{ background:"#f8f9fc", border:"1px solid #eee", borderRadius:50, padding:"4px 12px", fontSize:"0.72rem", color:"#666" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Coming soon */}
          {soon && (
            <div style={{ background:"#fff", borderRadius:20, padding:"48px 32px", textAlign:"center", border:"1px solid #eee", marginBottom:18 }}>
              <div style={{ fontSize:"3rem", marginBottom:14 }}>🚧</div>
              <h2 style={{ fontWeight:800, fontSize:"1.25rem", marginBottom:10 }}>Coming Soon!</h2>
              <p style={{ color:"#aaa", maxWidth:360, margin:"0 auto 22px", lineHeight:1.7, fontSize:"0.9rem" }}>
                This tool requires server-side processing and will be available very soon.
                All other 19 tools work perfectly right now.
              </p>
              <button onClick={onBack} style={{ background:tc, border:"none", color:"#fff", padding:"13px 30px", borderRadius:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.95rem" }}>
                ← Explore All 19 Working Tools
              </button>
            </div>
          )}

          {/* Drop zone */}
          {!soon && !file && (
            <div
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); loadFiles(e.dataTransfer.files); }}
            >
              <input ref={ref} type="file" multiple={multi} style={{ display:"none" }} onChange={e => loadFiles(e.target.files)} accept="image/*,.heic,.heif,.svg,.pdf"/>
              <div style={{ background: drag ? tc+"08" : "#fff", border:`2.5px dashed ${drag ? tc : "#ddd"}`, borderRadius:20, padding:"52px 24px", textAlign:"center", cursor:"pointer", marginBottom:18, transition:"all 0.2s", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                <TIcon type={tool.icon} color={tc} size={58}/>
                <p style={{ fontWeight:800, fontSize:"1.2rem", marginTop:14, marginBottom:6 }}>Drop your {multi ? "images" : "image"} here</p>
                <p style={{ color:"#bbb", fontSize:"0.86rem", marginBottom:26 }}>JPG, PNG, WebP, HEIC, SVG, GIF · {multi ? "Multiple files supported" : "Single file"}</p>
                <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                  <button onClick={() => ref.current.click()} style={{ background:tc, border:"none", color:"#fff", padding:"13px 28px", borderRadius:50, fontWeight:700, fontSize:"0.94rem", cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 16px ${tc}48` }}>
                    📁 Select File{multi ? "s" : ""}
                  </button>
                  <button onClick={loadDemo} style={{ background:"#f8f9fc", border:`1.5px solid ${tc}`, color:tc, padding:"13px 28px", borderRadius:50, fontWeight:600, fontSize:"0.94rem", cursor:"pointer", fontFamily:"inherit" }}>
                    🖼 Try Demo
                  </button>
                </div>
                <p style={{ color:"#ccc", fontSize:"0.74rem", marginTop:14 }}>🔒 Processed locally — nothing uploaded to any server</p>
              </div>
            </div>
          )}

          {/* Processing area */}
          {!soon && file && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, background:"#fff", border:"1px solid #eee", borderRadius:12, padding:"11px 16px", marginBottom:14, fontSize:"0.82rem" }}>
                <span style={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:"#555", fontWeight:500 }}>
                  📁 {multi && files.length > 1 ? `${files.length} files selected` : file.name}
                </span>
                <span style={{ color:"#bbb", flexShrink:0, fontSize:"0.79rem" }}>{fmtBytes(files.reduce((a,f)=>a+f.size,0))}</span>
                <button onClick={reset} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#aaa", padding:"4px 12px", borderRadius:50, cursor:"pointer", fontSize:"0.77rem", fontFamily:"inherit" }}>Change</button>
              </div>

              {prev && !result && (
                <div style={{ textAlign:"center", marginBottom:14, borderRadius:16, overflow:"hidden", border:"1px solid #eee" }}>
                  <img src={prev} alt="Preview" style={{ maxHeight:220, maxWidth:"100%", objectFit:"contain", display:"block", margin:"0 auto", background:"#f8f9fc", padding:8 }}/>
                </div>
              )}

              {!result && (
                <div style={{ background:"#fff", border:"1px solid #eee", borderRadius:16, padding:"22px 24px", marginBottom:14 }}>
                  <h3 style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:16 }}>⚙️ Settings</h3>
                  {renderSettings()}
                </div>
              )}

              {!result && (
                <button onClick={run} disabled={busy} style={{
                  width:"100%", background: busy ? "#ccc" : tc,
                  border:"none", color:"#fff", padding:"16px",
                  borderRadius:14, fontWeight:800, fontSize:"1rem",
                  cursor: busy ? "not-allowed" : "pointer",
                  fontFamily:"inherit",
                  boxShadow: busy ? "none" : `0 4px 20px ${tc}48`,
                  marginBottom:10, transition:"all 0.2s"
                }}>
                  {busy ? `⚡ Processing… ${prog}%` : `⚡ Process ${multi && files.length > 1 ? files.length+" Files" : "Image"} — Free`}
                </button>
              )}

              {busy && (
                <div style={{ height:5, background:"#eee", borderRadius:4, overflow:"hidden", marginBottom:12 }}>
                  <div style={{ height:"100%", background:`linear-gradient(90deg,${tc},${tc}cc)`, width:`${prog}%`, borderRadius:4, transition:"width 0.4s ease" }}/>
                </div>
              )}

              {err && (
                <div style={{ background:"#fdecea", border:"1px solid #fcc", borderRadius:14, padding:"16px 20px", textAlign:"center", marginBottom:14 }}>
                  <p style={{ color:"#c0392b", marginBottom:10, fontSize:"0.9rem" }}>{err}</p>
                  <button onClick={reset} style={{ background:"#fff", border:"1px solid #fcc", color:"#888", padding:"6px 16px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.83rem" }}>Try Again</button>
                </div>
              )}

              {/* Base64 result */}
              {result?.type === "b64" && (
                <div style={{ background:"#f0faf4", border:"1px solid #b7e4c7", borderRadius:18, padding:26, textAlign:"center" }}>
                  <h3 style={{ fontWeight:800, color:"#27ae60", marginBottom:12, fontSize:"1.1rem" }}>✅ Base64 Ready!</h3>
                  <textarea readOnly value={result.val} rows={5} style={{ width:"100%", background:"#fff", border:"1px solid #eee", borderRadius:10, color:"#666", fontFamily:"monospace", fontSize:"0.71rem", padding:12, resize:"vertical", outline:"none", boxSizing:"border-box", marginBottom:12 }}/>
                  <button onClick={() => { try { navigator.clipboard.writeText(result.val); } catch{} }} style={{ background:"#27ae60", border:"none", color:"#fff", padding:"12px 26px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"block", width:"100%", marginBottom:10 }}>📋 Copy Base64 String</button>
                  <button onClick={reset} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#888", padding:11, borderRadius:10, cursor:"pointer", fontFamily:"inherit", width:"100%", fontSize:"0.87rem" }}>Encode Another</button>
                </div>
              )}

              {/* Bulk result */}
              {result?.type === "bulk" && (
                <div style={{ background:"#f0faf4", border:"1px solid #b7e4c7", borderRadius:18, padding:26 }}>
                  <h3 style={{ fontWeight:800, color:"#27ae60", marginBottom:6, textAlign:"center", fontSize:"1.1rem" }}>✅ {result.items.length} Images Compressed!</h3>
                  <div style={{ maxHeight:260, overflowY:"auto", marginBottom:14 }}>
                    {result.items.map((r, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:"1px solid #e8f5e9", fontSize:"0.81rem", flexWrap:"wrap" }}>
                        <span style={{ flex:1, color:"#555", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontWeight:500 }}>{r.name}</span>
                        <span style={{ color:"#bbb", flexShrink:0, fontSize:"0.77rem" }}>{fmtBytes(r.orig)} → {fmtBytes(r.size)} <strong style={{ color:"#27ae60" }}>−{Math.round((1-r.size/r.orig)*100)}%</strong></span>
                        <button onClick={() => { const a=document.createElement("a"); a.href=URL.createObjectURL(r.blob); a.download=r.name; a.click(); }} style={{ background:"#27ae60", border:"none", color:"#fff", padding:"4px 12px", borderRadius:50, cursor:"pointer", fontSize:"0.77rem", fontFamily:"inherit", fontWeight:600 }}>⬇</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={reset} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#888", padding:11, borderRadius:12, cursor:"pointer", fontFamily:"inherit", width:"100%", fontSize:"0.87rem" }}>Compress More</button>
                </div>
              )}

              {/* Image/File result */}
              {(result?.type === "img" || result?.type === "file") && (
                <CompareResult result={result} prev={prev} tc={tc} onDl={dl} onReset={reset}/>
              )}
            </div>
          )}

          {/* Related blog */}
          {relatedBlog && (
            <div style={{ background:"#fffbf0", border:"1.5px solid #fde8cc", borderRadius:16, padding:"16px 20px", marginTop:18, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:"1.2rem" }}>📖</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#e67e22", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>Related Guide</div>
                <div style={{ fontWeight:700, fontSize:"0.88rem", lineHeight:1.4 }}>{relatedBlog.title}</div>
              </div>
              <button onClick={() => onPost(relatedBlog)} style={{ background:"#e67e22", border:"none", color:"#fff", padding:"8px 16px", borderRadius:50, fontWeight:700, fontSize:"0.79rem", cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>Read →</button>
            </div>
          )}

          {/* How to use */}
          <section style={{ background:"#fff", border:"1px solid #eee", borderRadius:16, padding:"22px 26px", marginTop:18 }}>
            <h2 style={{ fontWeight:800, fontSize:"1rem", marginBottom:14 }}>How to use {seo.h1 || tool.name}</h2>
            <ol style={{ paddingLeft:22, color:"#666", fontSize:"0.87rem", lineHeight:2.4, margin:0 }}>
              <li>Click <strong>Select File</strong> or drag and drop your image above.</li>
              <li>Adjust settings — sensible defaults are pre-filled.</li>
              <li>Click <strong>Process</strong> — transforms instantly in your browser.</li>
              <li>Click <strong>Download</strong> — no watermark, completely free.</li>
            </ol>
          </section>

          {/* FAQ */}
          {seo.faqs?.length > 0 && (
            <section style={{ marginTop:28 }}>
              <h2 style={{ fontWeight:800, fontSize:"1.1rem", marginBottom:20 }}>Frequently Asked Questions</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                {seo.faqs.map((faq, i) => <FAQItem key={i} faq={faq} color={tc}/>)}
              </div>
            </section>
          )}

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <section style={{ marginTop:28 }}>
              <h2 style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:14, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.05em" }}>Related Tools</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {relatedTools.map(t => (
                  <a key={t.id} href={`/tool/${t.id}`}
                    onClick={e => { e.preventDefault(); onBack(); setTimeout(() => { window.dispatchEvent(new PopStateEvent("popstate")); }, 50); }}
                    style={{ background:"#fff", border:"1.5px solid #eee", borderRadius:50, padding:"8px 18px", textDecoration:"none", fontFamily:"inherit", fontSize:"0.83rem", color:"#666", display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=t.color; e.currentTarget.style.color=t.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.color="#666"; }}>
                    <TIcon type={t.icon} color={t.color} size={17}/>{t.name}
                  </a>
                ))}
              </div>
            </section>
          )}
          {/* Journey Banner */}
          <JourneyBanner currentToolId={tool.id} onSelectTool={onSelectTool || (() => {})} />

          {/* Next tool suggestions */}
          {onSelectTool && (
            <div style={{ background:"#fff", border:"1px solid #eee", borderRadius:16, padding:"18px 20px", marginTop:18 }}>
              <NextToolSuggestions toolId={tool.id} onSelectTool={onSelectTool} label="Complete your workflow — try these next" />
            </div>
          )}
        </main>

        {/* Right ad */}
        <aside style={{ width:140, flexShrink:0 }}>
          <div style={{ background:"#fff", border:"1px dashed #e8e8e8", borderRadius:14, height:600, display:"flex", alignItems:"center", justifyContent:"center", position:"sticky", top:130 }}>
            <span style={{ writingMode:"vertical-rl", color:"#ddd", fontSize:"0.64rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>Advertisement</span>
          </div>
        </aside>
      </div>

      {/* Bottom ad */}
      <div style={{ background:"#f8f9fc", borderTop:"1px solid #eee", minHeight:80, display:"flex", alignItems:"center", justifyContent:"center", marginTop:20 }}>
        <span style={{ color:"#ddd", fontSize:"0.66rem", letterSpacing:"0.12em", textTransform:"uppercase" }}>Advertisement</span>
      </div>
    </div>
  );
}
