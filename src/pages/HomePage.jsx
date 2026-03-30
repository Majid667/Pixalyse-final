import React, { useState } from "react";
import { TOOLS, CATS, JOURNEYS } from "../tools";
import { BLOGS } from "../blogs-index";
import { HOME_SEO, SITE } from "../seo";
import TIcon from "../components/TIcon";
import { useSEO, buildHomeSchema } from "../utils/useSEO";

const TESTIMONIALS = [
  { name:"Sarah K.",  role:"Graphic Designer 🇺🇸", stars:5, text:"Replaced 4 paid tools. The batch compress alone saves me an hour every day." },
  { name:"Marcus T.", role:"E-commerce Owner 🇬🇧",  stars:5, text:"Page load from 8s to 1.2s after compressing product photos. Sales up 34% that month." },
  { name:"Rajan P.",  role:"Freelancer 🇮🇳",        stars:5, text:"Invoice generator + profit margin calculator — my entire billing workflow in one free site." },
  { name:"David L.",  role:"Web Developer 🇦🇺",     stars:5, text:"EMI calculator and ROI calculator side by side. No other tool gives me this combination." },
  { name:"Amina R.",  role:"Photographer 🇨🇦",      stars:5, text:"Remove background, compress, watermark — entire workflow in 2 minutes. Outstanding." },
  { name:"Chen W.",   role:"UX Designer 🇸🇬",       stars:5, text:"Salary calculator gave me the exact figures I needed before negotiating my offer." },
];
const COLORS = ["#e74c3c","#e67e22","#27ae60","#2980b9","#8e44ad","#16a085"];
const Stars = ({ n=5 }) => <span style={{ color:"#f39c12", letterSpacing:2 }}>{"★".repeat(n)}{"☆".repeat(5-n)}</span>;

export default function HomePage({ onSelectTool, onBlog, onPost, onEmbed, onCheat, onPrivacy, onTerms, onContact }) {
  const [cat,    setCat]    = useState("All");
  const [search, setSearch] = useState("");
  const [hov,    setHov]    = useState(null);

  useSEO({
    title:       HOME_SEO.title || "Pixalyse — 27 Free Online Tools: Image, Invoice, EMI, ROI Calculator",
    description: HOME_SEO.description || "27 free online tools: compress images, generate invoices, calculate EMI, profit margin, ROI, salary and more. No login, no watermarks, everything stays in your browser.",
    keywords:    "free online tools, image compressor, invoice generator, emi calculator, roi calculator, profit margin calculator",
    canonical:   SITE.url + "/",
    schema:      buildHomeSchema(),
    schemaId:    "home-schema",
  });

  const filtered = TOOLS.filter(t =>
    (cat === "All" || t.cat === cat) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) ||
     t.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background:"#fff", fontFamily:"inherit" }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ background:"linear-gradient(135deg,#fff5f5 0%,#fff9f0 50%,#f0f8ff 100%)", padding:"60px 24px 52px", textAlign:"center", borderBottom:"1px solid #eee" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #fcc", borderRadius:50, padding:"6px 18px", marginBottom:22, boxShadow:"0 2px 12px rgba(231,76,60,0.1)" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#27ae60", display:"inline-block" }}/>
          <span style={{ fontSize:"0.8rem", color:"#e74c3c", fontWeight:700 }}>27 Free Tools · Images + Business + Finance · No Login · Files Stay Local</span>
        </div>
        <h1 style={{ fontSize:"clamp(2rem,5vw,3.4rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:1.08, marginBottom:16, color:"#1a1a2e" }}>
          Free Online Tools —{" "}
          <span style={{ background:"linear-gradient(135deg,#e74c3c,#e67e22)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Image, Business & Finance
          </span>
        </h1>
        <p style={{ color:"#666", fontSize:"1.05rem", lineHeight:1.75, maxWidth:560, margin:"0 auto 28px" }}>
          Compress images, generate invoices, calculate EMI, track ROI — 27 professional tools, completely free, no login, all in your browser.
        </p>

        {/* Search */}
        <div style={{ position:"relative", maxWidth:540, margin:"0 auto 22px" }}>
          <span style={{ position:"absolute", left:18, top:"50%", transform:"translateY(-50%)", color:"#ccc", pointerEvents:"none" }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search: compress, EMI, invoice, margin, salary…"
            style={{ width:"100%", background:"#fff", border:"2px solid #eee", borderRadius:60, padding:"14px 44px 14px 50px", fontSize:"0.92rem", outline:"none", fontFamily:"inherit", boxSizing:"border-box", boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}
            onFocus={e=>e.target.style.borderColor="#e74c3c"} onBlur={e=>e.target.style.borderColor="#eee"}/>
          {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#bbb", cursor:"pointer", fontSize:"1rem" }}>✕</button>}
        </div>

        {/* Quick-access chips */}
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8 }}>
          {["Compress Image","Invoice Generator","EMI Calculator","ROI Calculator","Salary Calculator","Remove Background","Profit Margin"].map(q=>(
            <button key={q} onClick={()=>setSearch(q)} style={{ background:"rgba(255,255,255,0.9)", border:"1.5px solid #eee", borderRadius:50, padding:"5px 14px", fontSize:"0.77rem", color:"#555", cursor:"pointer", fontFamily:"inherit" }}>{q}</button>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <div style={{ background:"#fff", borderBottom:"1px solid #eee", padding:"14px 24px" }}>
        <div style={{ maxWidth:820, margin:"0 auto", display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:12 }}>
          {[["27","Free Tools"],["50M+","Calculations Done"],["190+","Countries"],["4.9★","Rating"],["0","Data Stored"]].map(([n,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontWeight:900, fontSize:"1.25rem", color:"#e74c3c" }}>{n}</div>
              <div style={{ fontSize:"0.64rem", color:"#bbb", textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── JOURNEY FLOWS ──────────────────────────────────────────── */}
      <section style={{ background:"linear-gradient(135deg,#1a1a2e,#2a2a40)", padding:"48px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <h2 style={{ color:"#fff", fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:8 }}>
              Suggested Workflows
            </h2>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.9rem" }}>Multi-step tool flows for common tasks — follow the journey for maximum impact</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
            {JOURNEYS.map(j => {
              const tools = j.steps.map(id=>TOOLS.find(t=>t.id===id)).filter(Boolean);
              return (
                <div key={j.id} style={{ background:"rgba(255,255,255,0.06)", border:`1px solid ${j.color}40`, borderRadius:18, padding:"20px", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${j.color}15`;e.currentTarget.style.borderColor=j.color;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor=`${j.color}40`;}}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <span style={{ fontSize:"1.5rem" }}>{j.icon}</span>
                    <div>
                      <div style={{ fontWeight:800, fontSize:"0.9rem", color:"#fff" }}>{j.label}</div>
                      <div style={{ fontSize:"0.74rem", color:"rgba(255,255,255,0.5)" }}>{j.desc}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {tools.map((tool, i) => (
                      <button key={tool.id} onClick={()=>onSelectTool(tool)}
                        style={{ background:"rgba(255,255,255,0.06)", border:"none", borderRadius:10, padding:"8px 12px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10, fontFamily:"inherit", transition:"all 0.15s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background=`${j.color}25`;}}
                        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";}}>
                        <span style={{ fontSize:"0.72rem", fontWeight:700, background:j.color, color:"#fff", width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</span>
                        <TIcon type={tool.icon} color={j.color} size={22}/>
                        <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.85)", fontWeight:600 }}>{tool.name}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={()=>onSelectTool(tools[0])} style={{ marginTop:12, background:j.color, border:"none", color:"#fff", padding:"8px 18px", borderRadius:50, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", width:"100%", boxShadow:`0 3px 12px ${j.color}50` }}>
                    Start Workflow →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AD SLOT ────────────────────────────────────────────────── */}
      <div style={{ background:"#fafafa", borderTop:"1px solid #f0f0f0", borderBottom:"1px solid #f0f0f0", minHeight:80, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:"#ddd", fontSize:"0.66rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>Advertisement</span>
      </div>

      {/* ── TOOLS GRID ─────────────────────────────────────────────── */}
      <section id="tools" style={{ maxWidth:1140, margin:"0 auto", padding:"44px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:26, flexWrap:"wrap", gap:12 }}>
          <div>
            <h2 style={{ fontWeight:800, fontSize:"1.5rem", margin:0 }}>
              {search ? `Results for "${search}"` : cat==="All" ? "All 27 Free Tools" : `${cat} Tools`}
            </h2>
            <p style={{ color:"#aaa", fontSize:"0.82rem", marginTop:4, marginBottom:0 }}>Click any tool — no login, no watermark, instant results</p>
          </div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{
                background: cat===c ? (c==="Business"?"#27ae60":c==="Finance"?"#2980b9":"#e74c3c") : "#fff",
                border:`1.5px solid ${cat===c?(c==="Business"?"#27ae60":c==="Finance"?"#2980b9":"#e74c3c"):"#eee"}`,
                borderRadius:50, padding:"5px 14px", fontSize:"0.79rem",
                color: cat===c?"#fff":"#777",
                cursor:"pointer", fontFamily:"inherit", fontWeight: cat===c?700:400
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Category banners */}
        {cat === "All" && !search && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:12, marginBottom:24 }}>
            {[
              { cat:"Image", icon:"🖼️", color:"#e74c3c", desc:"20 tools — compress, convert, edit", count:20 },
              { cat:"Business", icon:"💼", color:"#27ae60", desc:"Invoice, profit margin, salary", count:3 },
              { cat:"Finance", icon:"📊", color:"#2980b9", desc:"EMI, loan, interest, ROI", count:4 },
            ].map(b=>(
              <button key={b.cat} onClick={()=>setCat(b.cat)} style={{ background:`linear-gradient(135deg,${b.color}08,${b.color}03)`, border:`2px solid ${b.color}20`, borderRadius:16, padding:"16px 18px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color;e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${b.color}20`;e.currentTarget.style.transform="none";}}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:"1.8rem" }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight:800, fontSize:"0.95rem", color:"#1a1a2e" }}>{b.cat} Tools</div>
                    <div style={{ fontSize:"0.75rem", color:"#888" }}>{b.desc}</div>
                  </div>
                  <span style={{ marginLeft:"auto", background:b.color, color:"#fff", fontSize:"0.7rem", fontWeight:700, padding:"3px 10px", borderRadius:50 }}>{b.count}</span>
                </div>
                <div style={{ fontSize:"0.75rem", color:b.color, fontWeight:700 }}>Browse {b.cat} tools →</div>
              </button>
            ))}
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(225px,1fr))", gap:13 }}>
          {filtered.map(tool=>(
            <a key={tool.id} href={`/tool/${tool.id}`}
              onClick={e=>{e.preventDefault();onSelectTool(tool);}}
              onMouseEnter={()=>setHov(tool.id)} onMouseLeave={()=>setHov(null)}
              style={{ background:"#fff", border:`2px solid ${hov===tool.id?tool.color:"#eee"}`, borderRadius:18, padding:"20px 17px", cursor:"pointer", textAlign:"left", display:"flex", gap:14, alignItems:"flex-start", fontFamily:"inherit", textDecoration:"none", color:"inherit", boxShadow: hov===tool.id?`0 8px 24px ${tool.color}28`:"0 2px 8px rgba(0,0,0,0.04)", transform: hov===tool.id?"translateY(-3px)":"none", transition:"all 0.18s" }}>
              <TIcon type={tool.icon} color={tool.color} size={42}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:tool.color, marginBottom:5 }}>{tool.cat}</div>
                <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:4, lineHeight:1.3 }}>{tool.name}</div>
                <div style={{ fontSize:"0.76rem", color:"#aaa", lineHeight:1.45 }}>{tool.desc}</div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px", color:"#aaa" }}>
            <div style={{ fontSize:"3rem", marginBottom:14 }}>🔍</div>
            <h3 style={{ fontWeight:700, marginBottom:8, color:"#888" }}>No tools match "{search}"</h3>
            <p style={{ marginBottom:20 }}>Try "compress", "invoice", "EMI", "salary", "ROI" or "background"</p>
            <button onClick={()=>{setSearch("");setCat("All");}} style={{ background:"#f8f9fc", border:"1.5px solid #eee", color:"#888", padding:"9px 22px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Show All Tools</button>
          </div>
        )}
      </section>

      {/* ── MID AD ─────────────────────────────────────────────────── */}
      <div style={{ background:"#fafafa", borderTop:"1px solid #f0f0f0", borderBottom:"1px solid #f0f0f0", minHeight:80, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:"#ddd", fontSize:"0.66rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>Advertisement</span>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section style={{ background:"#f8f9fc", padding:"64px 24px", borderTop:"1px solid #eee" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <h2 style={{ fontSize:"2rem", fontWeight:800, letterSpacing:"-0.02em", marginBottom:10 }}>How Pixalyse Works</h2>
            <p style={{ color:"#aaa", fontSize:"0.95rem", maxWidth:440, margin:"0 auto" }}>No software. No account. Done in under 10 seconds.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:18 }}>
            {[
              { n:"1", icon:"📁", title:"Pick your tool",       desc:"Image, business, or finance — 27 tools, all free.",  color:"#e74c3c" },
              { n:"2", icon:"⚙️", title:"Enter your data",     desc:"Images, numbers, or form fields — set your inputs.",   color:"#e67e22" },
              { n:"3", icon:"⚡", title:"Get instant results", desc:"Processed locally in milliseconds. Zero data leaves you.", color:"#27ae60" },
              { n:"4", icon:"🔗", title:"Discover next tool",  desc:"Follow the workflow suggestions to stay productive.",   color:"#2980b9" },
            ].map((s,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:20, padding:"28px 22px", textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #eee" }}>
                <div style={{ width:52, height:52, borderRadius:16, background:s.color, color:"#fff", fontWeight:900, fontSize:"1.4rem", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow:`0 4px 14px ${s.color}50` }}>{s.n}</div>
                <div style={{ fontSize:"1.3rem", marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontWeight:700, fontSize:"0.95rem", marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:"0.82rem", color:"#aaa", lineHeight:1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ───────────────────────────────────────────── */}
      <section style={{ background:"#fff", padding:"64px 24px", borderTop:"1px solid #eee" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:16 }}>
            <div>
              <h2 style={{ fontSize:"2rem", fontWeight:800, letterSpacing:"-0.02em", marginBottom:8 }}>Image Tools Blog</h2>
              <p style={{ color:"#aaa", fontSize:"0.9rem", maxWidth:440 }}>60 practical guides on compression, conversion, and optimisation.</p>
            </div>
            <button onClick={onBlog} style={{ background:"#fff", border:"2px solid #e74c3c", color:"#e74c3c", padding:"9px 20px", borderRadius:50, fontWeight:700, fontSize:"0.87rem", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>View all 60 articles →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:18 }}>
            {BLOGS.slice(0, 6).map(blog=>{
              const tool=TOOLS.find(t=>t.id===blog.toolId), tc=tool?.color||"#e74c3c";
              return (
                <a key={blog.id} href={`/blog/${blog.id}`}
                  onClick={e=>{e.preventDefault();onPost(blog);}}
                  style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:18, padding:"22px", cursor:"pointer", transition:"all 0.2s", textDecoration:"none", color:"inherit", display:"block" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=tc;e.currentTarget.style.background="#fff";e.currentTarget.style.boxShadow=`0 8px 24px ${tc}18`;e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#eee";e.currentTarget.style.background="#f8f9fc";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    {tool && <TIcon type={tool.icon} color={tc} size={26}/>}
                    <span style={{ fontSize:"0.63rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:tc }}>{blog.cat}</span>
                    <span style={{ fontSize:"0.71rem", color:"#bbb", marginLeft:"auto" }}>{blog.readTime}</span>
                  </div>
                  <h3 style={{ fontWeight:700, fontSize:"0.93rem", lineHeight:1.45, marginBottom:9 }}>{blog.title}</h3>
                  <p style={{ fontSize:"0.8rem", color:"#888", lineHeight:1.65, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{blog.excerpt}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section style={{ background:"#f8f9fc", padding:"64px 24px", borderTop:"1px solid #eee" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <h2 style={{ fontSize:"2rem", fontWeight:800, letterSpacing:"-0.02em", marginBottom:10 }}>Loved by Millions Worldwide</h2>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
              <Stars/><span style={{ color:"#888", fontSize:"0.9rem" }}>4.9 / 5 · 12,000+ reviews</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:18 }}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:18, padding:"24px 22px", border:"1px solid #eee", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ marginBottom:12 }}><Stars n={t.stars}/></div>
                <p style={{ color:"#444", fontSize:"0.88rem", lineHeight:1.75, marginBottom:18, fontStyle:"italic" }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:14, borderTop:"1px solid #f0f0f0" }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:COLORS[i%COLORS.length], display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"1rem", color:"#fff" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:"0.88rem" }}>{t.name}</div>
                    <div style={{ fontSize:"0.76rem", color:"#aaa" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section style={{ background:"linear-gradient(135deg,#e74c3c,#e67e22)", padding:"60px 24px", textAlign:"center" }}>
        <h2 style={{ color:"#fff", fontSize:"clamp(1.6rem,3.5vw,2.2rem)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:12 }}>
          27 free tools. One website. Zero compromises.
        </h2>
        <p style={{ color:"rgba(255,255,255,0.85)", marginBottom:28, fontSize:"1rem", maxWidth:460, margin:"0 auto 28px" }}>
          No software · No account · No files uploaded · No catches
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{ background:"#fff", border:"none", color:"#e74c3c", padding:"15px 40px", borderRadius:14, fontWeight:800, fontSize:"1rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 20px rgba(0,0,0,0.2)" }}>⚡ Start for Free</button>
          <button onClick={onBlog} style={{ background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.5)", color:"#fff", padding:"15px 30px", borderRadius:14, fontWeight:700, fontSize:"1rem", cursor:"pointer", fontFamily:"inherit" }}>Read Our Guides</button>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{ background:"#1a1a2e", padding:"44px 24px 28px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
            <div style={{ width:32, height:32, background:"linear-gradient(135deg,#e74c3c,#e67e22)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>⚡</div>
            <span style={{ fontWeight:800, fontSize:"1.2rem", color:"#fff" }}>Pixalyse</span>
            <span style={{ color:"#444", fontSize:"0.8rem", marginLeft:8 }}>— 27 free tools. Images, business & finance.</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:24, marginBottom:28, paddingTop:22, borderTop:"1px solid #2a2a3e" }}>
            <div>
              <div style={{ color:"#555", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Image Tools</div>
              {["Compress Image","HEIC to JPG","Remove Background","Passport Photo","Bulk Compress"].map(n=><div key={n} style={{ color:"#555", fontSize:"0.82rem", marginBottom:7 }}>{n}</div>)}
            </div>
            <div>
              <div style={{ color:"#555", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Business Tools</div>
              {[["Invoice Generator","invoice-generator"],["Profit Margin Calc","profit-margin"],["Salary Calculator","salary-calculator"]].map(([l,id])=>(
                <button key={id} onClick={()=>onSelectTool(TOOLS.find(t=>t.id===id))} style={{ display:"block", background:"none", border:"none", color:"#555", fontSize:"0.82rem", marginBottom:7, cursor:"pointer", fontFamily:"inherit", padding:0, textAlign:"left" }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</button>
              ))}
            </div>
            <div>
              <div style={{ color:"#555", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Finance Tools</div>
              {[["EMI Calculator","emi-calculator"],["Loan Calculator","loan-calculator"],["Interest Calculator","interest-calculator"],["ROI Calculator","roi-calculator"]].map(([l,id])=>(
                <button key={id} onClick={()=>onSelectTool(TOOLS.find(t=>t.id===id))} style={{ display:"block", background:"none", border:"none", color:"#555", fontSize:"0.82rem", marginBottom:7, cursor:"pointer", fontFamily:"inherit", padding:0, textAlign:"left" }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</button>
              ))}
            </div>
            <div>
              <div style={{ color:"#555", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Resources</div>
              {[["Blog →",onBlog],["Sizes 2026 →",onCheat],["Embed Tools →",onEmbed]].map(([l,fn])=>(
                <button key={l} onClick={fn} style={{ display:"block", background:"none", border:"none", color:"#555", fontSize:"0.82rem", marginBottom:7, cursor:"pointer", fontFamily:"inherit", padding:0 }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</button>
              ))}
            </div>
            <div>
              <div style={{ color:"#555", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Legal & Contact</div>
              {[["Privacy Policy",onPrivacy],["Terms of Use",onTerms],["Contact Us",onContact]].map(([l,fn])=>(
                <button key={l} onClick={fn} style={{ display:"block", background:"none", border:"none", color:"#555", fontSize:"0.82rem", marginBottom:7, cursor:"pointer", fontFamily:"inherit", padding:0, textAlign:"left" }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</button>
              ))}
              <a href="mailto:pixalyse@gmail.com" style={{ display:"block", color:"#e74c3c", fontSize:"0.82rem", marginTop:8, textDecoration:"none", fontWeight:600 }}>📧 pixalyse@gmail.com</a>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, paddingTop:18, borderTop:"1px solid #2a2a3e" }}>
            <p style={{ color:"#444", fontSize:"0.77rem", margin:0 }}>© 2026 Pixalyse · All 27 tools free forever · No login required · pixalyse.com</p>
            <div style={{ display:"flex", gap:16 }}>
              {[["Privacy Policy",onPrivacy],["Terms of Use",onTerms],["Contact",onContact]].map(([l,fn])=>(
                <button key={l} onClick={fn} style={{ background:"none", border:"none", color:"#444", fontSize:"0.77rem", cursor:"pointer", fontFamily:"inherit", padding:0 }}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#444"}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
