import React from "react";
import { BLOGS } from "../blogs-index";
import { TOOLS } from "../tools";
import { SITE } from "../seo";
import TIcon from "../components/TIcon";
import { useSEO, buildBlogSchema } from "../utils/useSEO";

export default function BlogPostPage({ blog, onBack, onSelectTool, onBlogList, onPost }) {
  const tool    = TOOLS.find(t => t.id === blog.toolId);
  const tc      = tool?.color || "#e74c3c";
  const url     = `${SITE.url}/blog/${blog.id}`;
  const related = BLOGS.filter(b => b.id !== blog.id && (b.cat === blog.cat || b.toolId === blog.toolId)).slice(0, 3);

  useSEO({
    title:       `${blog.title} | Pixalyse Blog`,
    description: blog.excerpt,
    keywords:    blog.keywords || `${blog.cat.toLowerCase()}, image tools`,
    canonical:   url,
    schema:      buildBlogSchema(blog, url),
    schemaId:    `blog-${blog.id}`,
  });

  return (
    <div style={{ background:"#fff", minHeight:"100vh", fontFamily:"inherit" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background:"#f8f9fc", borderBottom:"1px solid #eee", padding:"11px 24px" }}>
        <div style={{ maxWidth:800, margin:"0 auto", display:"flex", alignItems:"center", gap:8, fontSize:"0.81rem", color:"#aaa", flexWrap:"wrap" }}>
          <a href="/" onClick={e=>{e.preventDefault();onBack();}} style={{ color:"#aaa", textDecoration:"none" }}
            onMouseEnter={e=>e.target.style.color="#e74c3c"} onMouseLeave={e=>e.target.style.color="#aaa"}>Home</a>
          <span>›</span>
          <a href="/blog" onClick={e=>{e.preventDefault();onBlogList();}} style={{ color:"#aaa", textDecoration:"none" }}
            onMouseEnter={e=>e.target.style.color="#e74c3c"} onMouseLeave={e=>e.target.style.color="#aaa"}>Blog</a>
          <span>›</span>
          <span style={{ color:"#666", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:320 }}>{blog.title}</span>
        </div>
      </nav>

      <article style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px" }}>
        {/* Header */}
        <header style={{ marginBottom:36 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            {tool && <TIcon type={tool.icon} color={tc} size={28}/>}
            <span style={{ fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:tc, background:tc+"15", padding:"3px 12px", borderRadius:50 }}>{blog.cat}</span>
          </div>
          <h1 style={{ fontSize:"clamp(1.6rem,3.5vw,2.3rem)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.2, marginBottom:16, color:"#1a1a2e" }}>{blog.title}</h1>
          <p style={{ fontSize:"1.05rem", color:"#555", lineHeight:1.8, marginBottom:20 }}>{blog.excerpt}</p>
          <div style={{ display:"flex", alignItems:"center", gap:14, paddingBottom:22, borderBottom:"2px solid #f0f0f0", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:tc, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:"0.95rem" }}>{blog.author[0]}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:"0.88rem" }}>{blog.author}</div>
                <div style={{ fontSize:"0.76rem", color:"#aaa" }}>Image Tools Expert</div>
              </div>
            </div>
            <div style={{ fontSize:"0.77rem", color:"#aaa", display:"flex", gap:14 }}>
              <span>📅 {blog.date}</span>
              <span>⏱ {blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Sections */}
        <div>
          {(blog.sections || []).map((section, i) => (
            <section key={i} style={{ marginBottom:38 }}>
              <h2 style={{ fontSize:"1.2rem", fontWeight:800, marginBottom:14, letterSpacing:"-0.02em", paddingLeft:16, borderLeft:`3px solid ${tc}`, color:"#1a1a2e", lineHeight:1.35 }}>{section.h}</h2>
              {(section.b || "").split("\n\n").map((para, j) => (
                <p key={j} style={{ fontSize:"0.97rem", color:"#444", lineHeight:1.9, marginBottom:15 }}>{para}</p>
              ))}
            </section>
          ))}
        </div>

        {/* FAQs if present */}
        {(blog.faqs?.length > 0) && (
          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontWeight:800, fontSize:"1.1rem", marginBottom:18 }}>Frequently Asked Questions</h2>
            {blog.faqs.map((faq, i) => (
              <div key={i} style={{ background:"#f8f9fc", borderRadius:12, padding:"16px 18px", marginBottom:10, border:"1px solid #eee" }}>
                <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:9 }}>Q: {faq.q}</div>
                <div style={{ fontSize:"0.87rem", color:"#555", lineHeight:1.8 }}>A: {faq.a}</div>
              </div>
            ))}
          </section>
        )}

        {/* Tool CTA */}
        {tool && (
          <div style={{ background:`linear-gradient(135deg,${tc}10,${tc}05)`, border:`2px solid ${tc}25`, borderRadius:20, padding:"30px 28px", textAlign:"center", margin:"44px 0" }}>
            <TIcon type={tool.icon} color={tc} size={52}/>
            <h3 style={{ fontWeight:800, fontSize:"1.15rem", margin:"14px 0 8px" }}>Try {tool.name} — Free</h3>
            <p style={{ color:"#777", fontSize:"0.9rem", marginBottom:22, lineHeight:1.6, maxWidth:400, margin:"0 auto 22px" }}>
              No login required. No watermarks. Runs entirely in your browser — files never leave your device.
            </p>
            <a href={`/tool/${tool.id}`} onClick={e => { e.preventDefault(); onSelectTool(tool); }}
              style={{ display:"inline-block", background:tc, color:"#fff", padding:"13px 34px", borderRadius:12, fontWeight:700, fontSize:"0.97rem", cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 18px ${tc}48`, textDecoration:"none" }}>
              Open {tool.name} Free →
            </a>
            <p style={{ color:"#ccc", fontSize:"0.73rem", marginTop:12 }}>🔒 Local processing · ⚡ Instant · 📵 No watermarks</p>
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section style={{ marginTop:44 }}>
            <h2 style={{ fontWeight:800, fontSize:"1.1rem", marginBottom:20 }}>Related Articles</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {related.map(r => {
                const rt = TOOLS.find(t => t.id === r.toolId);
                const rc = rt?.color || "#e74c3c";
                return (
                  <a key={r.id} href={`/blog/${r.id}`}
                    onClick={e => { e.preventDefault(); onPost(r); }}
                    style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:14, padding:"16px", textDecoration:"none", color:"inherit", display:"block", transition:"all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=rc; e.currentTarget.style.background="#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.background="#f8f9fc"; }}>
                    <span style={{ fontSize:"0.63rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:rc, display:"block", marginBottom:9 }}>{r.cat}</span>
                    <div style={{ fontWeight:700, fontSize:"0.87rem", lineHeight:1.4, marginBottom:6 }}>{r.title}</div>
                    <div style={{ fontSize:"0.74rem", color:"#aaa" }}>{r.readTime}</div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Back links */}
        <div style={{ marginTop:44, paddingTop:30, borderTop:"1px solid #f0f0f0", display:"flex", gap:12, flexWrap:"wrap" }}>
          <a href="/blog" onClick={e=>{e.preventDefault();onBlogList();}}
            style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#f8f9fc", border:"1.5px solid #eee", color:"#666", padding:"9px 18px", borderRadius:50, fontWeight:600, fontSize:"0.84rem", cursor:"pointer", fontFamily:"inherit", textDecoration:"none" }}>
            ← Back to Blog
          </a>
          {tool && (
            <a href={`/tool/${tool.id}`} onClick={e=>{e.preventDefault();onSelectTool(tool);}}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:tc, border:"none", color:"#fff", padding:"9px 18px", borderRadius:50, fontWeight:700, fontSize:"0.84rem", cursor:"pointer", fontFamily:"inherit", textDecoration:"none" }}>
              <TIcon type={tool.icon} color="#fff" size={15}/> Open {tool.name} →
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
