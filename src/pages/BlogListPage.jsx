import React, { useState, useMemo } from "react";
import { BLOGS, TOTAL_BLOGS } from "../blogs-index";
import { TOOLS } from "../tools";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";
import TIcon from "../components/TIcon";

const ALL_CATS = ["All", ...Array.from(new Set(BLOGS.map(b => b.cat)))];

export default function BlogListPage({ onPost }) {
  const [cat,    setCat]    = useState("All");
  const [search, setSearch] = useState("");
  const [toolId, setToolId] = useState("All");
  const [page,   setPage]   = useState(1);
  const PER_PAGE = 12;

  const toolCounts = useMemo(() => {
    const c = {};
    BLOGS.forEach(b => { c[b.toolId] = (c[b.toolId] || 0) + 1; });
    return c;
  }, []);

  useSEO({
    title:       `Image Tools Blog — ${TOTAL_BLOGS} Free Guides on Compression, Conversion & Optimization | Pixalyse`,
    description: `${TOTAL_BLOGS} expert guides on image compression, format conversion, SEO optimization, and photo editing. Updated for 2026.`,
    keywords:    "image compression guide, png vs jpg, heic to jpg guide, webp format, image optimization seo",
    canonical:   `${SITE.url}/blog`,
    schemaId:    "blog-list",
    schema: [{ "@context":"https://schema.org", "@type":"Blog", "name":"Pixalyse Blog", "url":`${SITE.url}/blog` }]
  });

  const filtered = useMemo(() => {
    let r = BLOGS;
    if (cat    !== "All") r = r.filter(b => b.cat === cat);
    if (toolId !== "All") r = r.filter(b => b.toolId === toolId);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(b =>
        b.title.toLowerCase().includes(q) ||
        (b.excerpt || "").toLowerCase().includes(q) ||
        b.cat.toLowerCase().includes(q)
      );
    }
    return r;
  }, [cat, toolId, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const isFiltered = cat !== "All" || toolId !== "All" || !!search.trim();
  const reset      = () => { setCat("All"); setToolId("All"); setSearch(""); setPage(1); };

  const showFeatured = !isFiltered && safePage === 1 && paged.length > 0;
  const featured     = showFeatured ? paged[0] : null;
  const gridItems    = showFeatured ? paged.slice(1) : paged;

  return (
    <div style={{ background:"#fff", minHeight:"100vh", fontFamily:"inherit" }}>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#fff5f5,#fff9f0,#f0f8ff)", padding:"52px 24px 44px", borderBottom:"1px solid #eee", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #fcc", borderRadius:50, padding:"6px 18px", marginBottom:22 }}>
          <span style={{ fontSize:"0.8rem", color:"#e74c3c", fontWeight:700 }}>📝 {TOTAL_BLOGS} Guides · 3 Per Tool · Updated 2026</span>
        </div>
        <h1 style={{ fontSize:"clamp(1.8rem,4.5vw,2.8rem)", fontWeight:900, letterSpacing:"-0.03em", marginBottom:14, color:"#1a1a2e" }}>
          The Pixalyse Image Tools Blog
        </h1>
        <p style={{ color:"#666", fontSize:"1rem", lineHeight:1.75, maxWidth:540, margin:"0 auto 28px" }}>
          Practical guides on image compression, conversion, optimization and editing — covering every tool in depth for designers, developers, and content creators.
        </p>
        <div style={{ position:"relative", maxWidth:520, margin:"0 auto 22px" }}>
          <span style={{ position:"absolute", left:18, top:"50%", transform:"translateY(-50%)", color:"#ccc", pointerEvents:"none" }}>🔍</span>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search: Core Web Vitals, HEIC, passport photo, Base64…"
            style={{ width:"100%", background:"#fff", border:"2px solid #eee", borderRadius:60, padding:"13px 44px 13px 48px", fontSize:"0.9rem", outline:"none", fontFamily:"inherit", boxSizing:"border-box", boxShadow:"0 4px 16px rgba(0,0,0,0.07)" }}
            onFocus={e => e.target.style.borderColor="#e74c3c"}
            onBlur={e  => e.target.style.borderColor="#eee"}/>
          {search && <button onClick={() => { setSearch(""); setPage(1); }} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#bbb", cursor:"pointer", fontSize:"1rem" }}>✕</button>}
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:28, flexWrap:"wrap" }}>
          {[["60","Articles"],["20","Tools"],["3","Per Tool"],["2026","Updated"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontWeight:900, fontSize:"1.2rem", color:"#e74c3c" }}>{n}</div>
              <div style={{ fontSize:"0.64rem", color:"#bbb", textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth:1120, margin:"0 auto", padding:"36px 20px" }}>
        {/* Filters */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22, flexWrap:"wrap" }}>
          <span style={{ fontSize:"0.74rem", color:"#bbb", flexShrink:0 }}>Category:</span>
          {ALL_CATS.map(c => (
            <button key={c} onClick={() => { setCat(c); setPage(1); }}
              style={{ background: cat===c ? "#e74c3c" : "#fff", border:`1.5px solid ${cat===c ? "#e74c3c" : "#eee"}`, borderRadius:50, padding:"4px 13px", fontSize:"0.76rem", color: cat===c ? "#fff" : "#777", cursor:"pointer", fontFamily:"inherit", fontWeight: cat===c ? 700 : 400, whiteSpace:"nowrap" }}>
              {c}
            </button>
          ))}
          {isFiltered && (
            <button onClick={reset} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#aaa", padding:"4px 13px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.76rem", marginLeft:4 }}>
              ✕ Clear
            </button>
          )}
        </div>

        <div style={{ fontSize:"0.82rem", color:"#aaa", marginBottom:20 }}>
          {isFiltered ? `${filtered.length} article${filtered.length !== 1 ? "s" : ""} found`
                      : `All ${TOTAL_BLOGS} articles`}
          {totalPages > 1 && <span style={{ marginLeft:12 }}>· Page {safePage} of {totalPages}</span>}
        </div>

        {/* Featured */}
        {featured && (() => {
          const ft = TOOLS.find(t => t.id === featured.toolId);
          const fc = ft?.color || "#e74c3c";
          return (
            <div onClick={() => onPost(featured)}
              style={{ background:`linear-gradient(135deg,${fc}08,${fc}03)`, border:`2px solid ${fc}25`, borderRadius:20, padding:"28px", marginBottom:24, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=fc; e.currentTarget.style.boxShadow=`0 8px 28px ${fc}18`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=`${fc}25`; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ background:fc, color:"#fff", fontSize:"0.64rem", fontWeight:700, padding:"3px 12px", borderRadius:50, textTransform:"uppercase" }}>⭐ Featured</span>
                {ft && <TIcon type={ft.icon} color={fc} size={22}/>}
                <span style={{ fontSize:"0.68rem", fontWeight:700, color:fc, textTransform:"uppercase", letterSpacing:"0.1em" }}>{featured.cat}</span>
                <span style={{ fontSize:"0.71rem", color:"#bbb", marginLeft:"auto" }}>{featured.date} · {featured.readTime}</span>
              </div>
              <h2 style={{ fontWeight:900, fontSize:"clamp(1.2rem,2.5vw,1.7rem)", letterSpacing:"-0.02em", marginBottom:10, color:"#1a1a2e", lineHeight:1.3 }}>{featured.title}</h2>
              <p style={{ color:"#555", lineHeight:1.75, marginBottom:16, fontSize:"0.91rem" }}>{featured.excerpt}</p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:fc, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"0.88rem" }}>{featured.author[0]}</div>
                <span style={{ fontWeight:600, fontSize:"0.84rem" }}>{featured.author}</span>
                <span style={{ color:fc, fontWeight:700, fontSize:"0.84rem", marginLeft:"auto" }}>Read article →</span>
              </div>
            </div>
          );
        })()}

        {/* Grid */}
        {gridItems.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
            {gridItems.map(blog => {
              const t  = TOOLS.find(x => x.id === blog.toolId);
              const tc = t?.color || "#e74c3c";
              return (
                <article key={blog.id} onClick={() => onPost(blog)}
                  style={{ background:"#fff", border:"1.5px solid #eee", borderRadius:18, padding:"20px", cursor:"pointer", transition:"all 0.2s", display:"flex", flexDirection:"column" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=tc; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 20px ${tc}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    {t && <TIcon type={t.icon} color={tc} size={26}/>}
                    <span style={{ fontSize:"0.61rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:tc }}>{blog.cat}</span>
                    <span style={{ fontSize:"0.69rem", color:"#bbb", marginLeft:"auto", flexShrink:0 }}>{blog.readTime}</span>
                  </div>
                  <h2 style={{ fontWeight:700, fontSize:"0.91rem", lineHeight:1.45, marginBottom:9, color:"#1a1a2e", flex:1 }}>{blog.title}</h2>
                  <p style={{ fontSize:"0.78rem", color:"#888", lineHeight:1.65, marginBottom:12, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{blog.excerpt}</p>
                  {blog.keywords && (
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
                      {blog.keywords.split(",").slice(0,2).map(kw => (
                        <span key={kw} style={{ background:tc+"12", color:tc, fontSize:"0.59rem", fontWeight:600, padding:"2px 8px", borderRadius:50, border:`1px solid ${tc}20` }}>{kw.trim()}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display:"flex", alignItems:"center", gap:8, paddingTop:11, borderTop:"1px solid #f0f0f0" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:tc, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"0.69rem", flexShrink:0 }}>{blog.author[0]}</div>
                    <span style={{ fontSize:"0.75rem", color:"#888", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{blog.author}</span>
                    <span style={{ fontSize:"0.69rem", color:"#ccc", marginLeft:"auto", flexShrink:0 }}>{(blog.date||"").split(",")[0]}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"60px 20px", color:"#aaa" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:12 }}>🔍</div>
            <h3 style={{ fontWeight:700, marginBottom:8, color:"#888" }}>No articles match "{search}"</h3>
            <p style={{ marginBottom:20, fontSize:"0.9rem" }}>Try a tool name, format, or topic</p>
            <button onClick={reset} style={{ background:"#f8f9fc", border:"1.5px solid #eee", color:"#888", padding:"9px 22px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Clear filters</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:40, flexWrap:"wrap" }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={safePage===1}
              style={{ background:"#fff", border:"1.5px solid #eee", color: safePage===1 ? "#ddd" : "#666", padding:"8px 18px", borderRadius:50, cursor: safePage===1 ? "default" : "pointer", fontFamily:"inherit", fontSize:"0.83rem" }}>← Prev</button>
            {Array.from({ length:totalPages },(_,i)=>i+1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{ background: n===safePage ? "#e74c3c" : "#fff", border:`1.5px solid ${n===safePage ? "#e74c3c" : "#eee"}`, color: n===safePage ? "#fff" : "#666", padding:"8px 14px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.83rem", fontWeight: n===safePage ? 700 : 400, minWidth:38 }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={safePage===totalPages}
              style={{ background:"#fff", border:"1.5px solid #eee", color: safePage===totalPages ? "#ddd" : "#666", padding:"8px 18px", borderRadius:50, cursor: safePage===totalPages ? "default" : "pointer", fontFamily:"inherit", fontSize:"0.83rem" }}>Next →</button>
          </div>
        )}

        {/* Browse by tool */}
        <section style={{ marginTop:56 }}>
          <h2 style={{ fontWeight:800, fontSize:"1.15rem", marginBottom:6 }}>Browse Articles by Tool</h2>
          <p style={{ color:"#aaa", fontSize:"0.83rem", marginBottom:20 }}>Every tool has 3 in-depth guides — click any tool to filter</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:10 }}>
            {TOOLS.map(t => {
              const count  = toolCounts[t.id] || 0;
              const active = toolId === t.id;
              if (!count) return null;
              return (
                <button key={t.id}
                  onClick={() => { setToolId(active ? "All" : t.id); setCat("All"); setSearch(""); setPage(1); window.scrollTo({top:300,behavior:"smooth"}); }}
                  style={{ background: active ? t.color+"12" : "#f8f9fc", border:`1.5px solid ${active ? t.color : "#eee"}`, borderRadius:12, padding:"12px 14px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10, fontFamily:"inherit", transition:"all 0.15s" }}
                  onMouseEnter={e => { if(!active){e.currentTarget.style.borderColor=t.color;e.currentTarget.style.background=t.color+"06";} }}
                  onMouseLeave={e => { if(!active){e.currentTarget.style.borderColor="#eee";e.currentTarget.style.background="#f8f9fc";} }}>
                  <TIcon type={t.icon} color={t.color} size={30}/>
                  <div>
                    <div style={{ fontWeight:600, fontSize:"0.83rem" }}>{t.name}</div>
                    <div style={{ fontSize:"0.67rem", color:"#aaa" }}>{count} article{count!==1?"s":""}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Newsletter */}
        <div style={{ background:"linear-gradient(135deg,#1a1a2e,#2a2a40)", borderRadius:20, padding:"34px 28px", marginTop:52, textAlign:"center" }}>
          <div style={{ fontSize:"1.8rem", marginBottom:12 }}>📬</div>
          <h3 style={{ color:"#fff", fontWeight:800, fontSize:"1.1rem", marginBottom:10 }}>Get New Guides in Your Inbox</h3>
          <p style={{ color:"#888", fontSize:"0.85rem", marginBottom:22, maxWidth:380, margin:"0 auto 22px" }}>New image tool guides every week. Free Social Media Size Cheat Sheet on signup.</p>
          <div style={{ display:"flex", gap:10, maxWidth:400, margin:"0 auto", flexWrap:"wrap", justifyContent:"center" }}>
            <input type="email" placeholder="your@email.com" style={{ flex:1, minWidth:200, background:"#2a2a40", border:"1px solid #444", borderRadius:10, padding:"11px 16px", color:"#fff", fontFamily:"inherit", fontSize:"0.87rem", outline:"none" }}/>
            <button style={{ background:"linear-gradient(135deg,#e74c3c,#e67e22)", border:"none", color:"#fff", padding:"11px 22px", borderRadius:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.87rem", whiteSpace:"nowrap" }}>Subscribe →</button>
          </div>
          <p style={{ color:"#555", fontSize:"0.71rem", marginTop:10 }}>No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </div>
  );
}
