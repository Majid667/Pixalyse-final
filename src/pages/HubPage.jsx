import React from "react";
import { TOOLS } from "../tools";
import { BLOGS } from "../blogs-index";
import { SITE } from "../seo";
import { useSEO } from "../utils/useSEO";
import TIcon from "../components/TIcon";

export const HUBS = [
  {
    slug: "image-compression-guide",
    title: "The Complete Guide to Image Compression — Everything You Need to Know",
    seoTitle: "Image Compression Guide 2026 — Complete Tutorial | Pixalyse",
    seoDesc: "Everything about image compression: lossy vs lossless, best quality settings, when to compress, format comparison, and free tools. The definitive guide.",
    seoKeywords: "image compression guide, how to compress images, lossy vs lossless compression, image compression tutorial, best settings",
    relatedToolIds: ["compress","bulk-compress","png-to-jpg","webp-to-jpg"],
    relatedBlogIds: ["compress-images-website-speed","png-vs-jpg-which-format","batch-compress-images-guide"],
    intro: "Image compression is the single most impactful optimization you can make to a website, email campaign, or digital workflow. This guide covers everything: what compression does technically, how to choose the right settings, which formats work best, and how to build compression into your workflow permanently.",
    sections: [
      { h: "What is image compression?", b: "Image compression reduces the amount of data used to represent a digital image. There are two types: lossless compression, which removes redundant data without changing pixel values (PNG uses this), and lossy compression, which discards data below the threshold of human visual perception (JPEG uses this). For web use, lossy compression at 75–85% quality achieves 60–90% file size reduction with no visible quality difference." },
      { h: "Lossy vs lossless: which should you use?", b: "Use lossless (PNG, WebP lossless) for: logos, icons, screenshots, images with text, anything needing exact pixel reproduction. Use lossy (JPEG, WebP lossy) for: photographs, product images, any complex image without transparency. Rule: if the image has transparency or sharp text, use lossless. For everything else, lossy at 80% is optimal." },
      { h: "The right quality settings for every situation", b: "Web thumbnails: 70–75%. Blog and product images: 75–80%. Hero images: 80–85%. Images with text: 85–90%. The threshold where quality loss becomes visible is around 70%. Above 85%, size reduction becomes marginal. 80% is the optimal general-purpose setting." },
      { h: "Building compression into your workflow", b: "Before uploading anything to a website: compress. Before attaching to email: compress. Before sharing on social media: compress. The only exception is archiving originals, which should always be kept at full quality. For teams: establish a naming convention so everyone knows which files have been processed." },
    ],
    faqs: [
      { q: "Does compressing a JPG reduce quality?", a: "At 80% quality, the visual difference is invisible to the human eye under normal viewing conditions. At 70%, some artefacts appear on close inspection. Below 60%, degradation becomes clearly visible. 75–80% is the optimal setting for web use." },
      { q: "What is the best image compression for websites?", a: "JPEG at 75–80% for photographs. PNG lossless for graphics, logos, screenshots. WebP at 80% for maximum performance. Targets: under 100KB for thumbnails, under 200KB for body images, under 500KB for hero images." },
      { q: "How do I compress 100 images at once?", a: "Use Pixalyse's Bulk Compress tool — upload up to 50 images at a time, set quality to 80%, click Process. Run two sessions to handle 100 images. Entire process takes under 5 minutes." },
    ]
  },
  {
    slug: "image-format-guide",
    title: "JPG vs PNG vs WebP vs HEIC — Which Image Format Should You Use?",
    seoTitle: "JPG vs PNG vs WebP vs HEIC — Image Format Guide | Pixalyse",
    seoDesc: "Complete comparison of all image formats for 2026. When to use JPG, PNG, WebP, HEIC, SVG, GIF. File size comparison and use cases.",
    seoKeywords: "jpg vs png, webp format, heic format explained, best image format website, image format comparison 2026",
    relatedToolIds: ["png-to-jpg","jpg-to-png","webp-to-jpg","heic-to-jpg","svg-to-png"],
    relatedBlogIds: ["png-vs-jpg-which-format","heic-to-jpg-iphone-problem-explained","webp-format-explained"],
    intro: "Choosing the right image format is a foundational decision that affects file size, quality, compatibility, and loading speed. The wrong format can make a file 10× larger than necessary or introduce compatibility problems that cost you users.",
    sections: [
      { h: "JPEG/JPG — The universal standard for photographs", b: "JPEG uses lossy compression that works by discarding image data below the threshold of human visual perception. At 80% quality, a typical 8MB camera photo becomes 800KB with no visible difference. Best for: photographs, product images, social media. Not for: images needing transparency, graphics with text." },
      { h: "PNG — Lossless quality with transparency", b: "PNG uses lossless compression — every pixel is preserved exactly. This makes PNG larger than JPEG for photographs but essential for: logos, icons, screenshots, any image requiring a transparent background. A logo as PNG may be 10× larger than JPEG but the quality justification is clear." },
      { h: "WebP — The modern replacement", b: "WebP achieves 25–35% smaller files than JPEG at equivalent quality and supports transparency. Browser support is now universal. For new websites, WebP should be the default image format. Limitation: older software and applications may not open WebP files." },
      { h: "HEIC — Apple's efficient format", b: "HEIC achieves 40–50% smaller files than JPEG at equivalent quality. All iPhones since iOS 11 use HEIC by default. The problem: Windows, Android, and most non-Apple software cannot open HEIC files without additional software. Convert to JPG using Pixalyse for universal compatibility." },
    ],
    faqs: [
      { q: "Should I use JPG or PNG for my website?", a: "Use JPG for photographs — 60–90% smaller than PNG with no visible quality difference. Use PNG for logos, icons, screenshots, and any image requiring transparency. For maximum performance, convert both to WebP for modern browsers." },
      { q: "What is HEIC and why can't I open it?", a: "HEIC is Apple's photo format used by all iPhones since iOS 11. It's 40–50% smaller than JPG but not natively supported by Windows or Android. Convert HEIC to JPG using Pixalyse for universal compatibility." },
    ]
  },
  {
    slug: "how-to-optimize-images-for-web",
    title: "How to Optimize Images for Web — Complete 2026 Guide",
    seoTitle: "How to Optimize Images for Web 2026 — Complete Guide | Pixalyse",
    seoDesc: "Complete image optimization guide for websites. File formats, compression settings, dimensions, lazy loading, WebP, Core Web Vitals. Updated 2026.",
    seoKeywords: "optimize images for web, image optimization seo, core web vitals images, compress images website, web image optimization guide",
    relatedToolIds: ["compress","bulk-compress","resize","png-to-jpg"],
    relatedBlogIds: ["compress-images-website-speed","resize-images-every-platform","batch-compress-images-guide"],
    intro: "Image optimization is the single most impactful technical action for website performance. Images account for an average of 64% of webpage weight. This guide gives you a complete, actionable framework for getting every image to optimal size without compromising visual quality.",
    sections: [
      { h: "Why image optimization matters for Google rankings", b: "Google uses Core Web Vitals as ranking signals. The Largest Contentful Paint (LCP) — which measures how quickly the main content loads — is directly affected by image file size. Sites with images loading in under 2 seconds rank better than slow competitors. PageSpeed Insights explicitly shows image optimization opportunities with ranking impact estimates." },
      { h: "The correct dimensions for every web image type", b: "Hero images: 1920px wide, under 500KB. Blog featured images: 1200×630px, under 150KB. Body content images: 800–1200px wide, under 200KB. Thumbnails: 400×300px, under 80KB. Product images: 800×800px minimum, under 300KB. Exceeding these dimensions wastes bandwidth without adding visible quality." },
      { h: "Serving WebP with JPEG fallback", b: "The optimal setup serves WebP to modern browsers and JPEG to older ones. In HTML, use the picture element with a WebP source and JPEG fallback. WordPress 5.8+ supports WebP natively. Shopify handles this automatically. Cloudflare Polish converts and serves optimized formats automatically." },
      { h: "Building an image optimization workflow", b: "The complete workflow: capture at full resolution → crop to required dimensions → export as WebP where possible → compress at 80% quality → upload with descriptive filename and alt text → test with PageSpeed Insights. Applied consistently, this is the difference between a slow website and a fast one." },
    ],
    faqs: [
      { q: "How do I check if my website images are slowing it down?", a: "Run your URL through Google PageSpeed Insights (pagespeed.web.dev). The Opportunities section lists every oversized image with exact savings. The Diagnostics section shows images that are oversized for their display dimensions." },
      { q: "What image format is best for website speed?", a: "WebP — 25–35% smaller than JPEG at equivalent quality, supported by all modern browsers. For new websites, serve WebP as primary with JPEG fallback. Converting existing images to WebP can improve PageSpeed scores significantly." },
      { q: "How small should website images be?", a: "Hero images: under 500KB. Blog images: under 200KB. Thumbnails: under 80KB. Product images: under 300KB. These targets balance quality and speed for most connections." },
    ]
  }
];

export default function HubPage({ hub, onSelectTool, onPost, onBlog }) {
  const relatedTools = (hub.relatedToolIds || []).map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
  const relatedBlogs = (hub.relatedBlogIds || []).map(id => BLOGS.find(b => b.id === id)).filter(Boolean);

  useSEO({
    title:       hub.seoTitle,
    description: hub.seoDesc,
    keywords:    hub.seoKeywords,
    canonical:   `${SITE.url}/${hub.slug}`,
    schema: [
      { "@context":"https://schema.org","@type":"Article","headline":hub.title,"description":hub.seoDesc,"url":`${SITE.url}/${hub.slug}`,"dateModified":"2026-03-24","publisher":{"@type":"Organization","name":"Pixalyse","url":SITE.url} },
      hub.faqs?.length ? { "@context":"https://schema.org","@type":"FAQPage","mainEntity": hub.faqs.map(f => ({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} })) } : null
    ].filter(Boolean),
    schemaId: `hub-${hub.slug}`,
  });

  return (
    <div style={{ fontFamily:"inherit", color:"#1a1a2e", background:"#fff", minHeight:"100vh" }}>
      {/* Breadcrumb */}
      <nav style={{ background:"#f8f9fc", borderBottom:"1px solid #eee", padding:"10px 24px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex", gap:8, fontSize:"0.8rem", color:"#aaa" }}>
          <a href="/" style={{ color:"#aaa", textDecoration:"none" }}>Home</a>
          <span>›</span>
          <span style={{ color:"#555" }}>{hub.title}</span>
        </div>
      </nav>

      <article style={{ maxWidth:860, margin:"0 auto", padding:"48px 24px" }}>
        <header style={{ marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#f0f8ff", border:"1px solid #d0e8ff", borderRadius:50, padding:"4px 16px", marginBottom:18 }}>
            <span style={{ fontSize:"0.7rem", fontWeight:700, color:"#2980b9", textTransform:"uppercase", letterSpacing:"0.1em" }}>📖 Complete Guide · Updated 2026</span>
          </div>
          <h1 style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.2, marginBottom:18 }}>{hub.title}</h1>
          <p style={{ fontSize:"1.05rem", color:"#555", lineHeight:1.8, marginBottom:24 }}>{hub.intro}</p>

          {/* Quick Answer box — targets AI Overviews */}
          {hub.faqs?.[0] && (
            <div style={{ background:"#f0faf4", border:"2px solid #27ae60", borderRadius:16, padding:"20px 22px", marginBottom:28 }}>
              <div style={{ fontSize:"0.7rem", fontWeight:700, color:"#27ae60", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>⚡ Quick Answer</div>
              <div style={{ fontWeight:700, fontSize:"0.95rem", marginBottom:8 }}>{hub.faqs[0].q}</div>
              <div style={{ fontSize:"0.9rem", color:"#444", lineHeight:1.7 }}>{hub.faqs[0].a}</div>
            </div>
          )}
        </header>

        {/* Sections */}
        {hub.sections?.map((section, i) => (
          <section key={i} style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:"1.2rem", fontWeight:800, marginBottom:14, paddingLeft:16, borderLeft:"3px solid #2980b9", lineHeight:1.35 }}>{section.h}</h2>
            <p style={{ fontSize:"0.97rem", color:"#444", lineHeight:1.9 }}>{section.b}</p>
          </section>
        ))}

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontWeight:800, fontSize:"1.05rem", marginBottom:18 }}>Free Tools for This</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:14 }}>
              {relatedTools.map(tool => (
                <div key={tool.id} onClick={() => onSelectTool(tool)}
                  style={{ background:`linear-gradient(135deg,${tool.color}10,${tool.color}05)`, border:`1.5px solid ${tool.color}30`, borderRadius:16, padding:"18px 16px", cursor:"pointer", display:"flex", gap:12, alignItems:"flex-start", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=tool.color; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=`${tool.color}30`; e.currentTarget.style.transform="none"; }}>
                  <TIcon type={tool.icon} color={tool.color} size={36}/>
                  <div>
                    <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:4 }}>{tool.name}</div>
                    <div style={{ fontSize:"0.78rem", color:"#888" }}>{tool.desc}</div>
                    <div style={{ fontSize:"0.72rem", color:tool.color, fontWeight:700, marginTop:6 }}>Free · No login →</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {hub.faqs?.length > 0 && (
          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontWeight:800, fontSize:"1.05rem", marginBottom:18 }}>Frequently Asked Questions</h2>
            {hub.faqs.map((faq, i) => (
              <div key={i} style={{ background:"#f8f9fc", borderRadius:14, padding:"17px 20px", marginBottom:10, border:"1px solid #eee" }}>
                <div style={{ fontWeight:700, fontSize:"0.91rem", marginBottom:10 }}>Q: {faq.q}</div>
                <div style={{ fontSize:"0.88rem", color:"#555", lineHeight:1.8 }}>A: {faq.a}</div>
              </div>
            ))}
          </section>
        )}

        {/* Related articles */}
        {relatedBlogs.length > 0 && (
          <section>
            <h2 style={{ fontWeight:800, fontSize:"1.05rem", marginBottom:18 }}>Related Articles</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
              {relatedBlogs.map(blog => {
                const tool = TOOLS.find(t => t.id === blog.toolId);
                const tc   = tool?.color || "#2980b9";
                return (
                  <a key={blog.id} href={`/blog/${blog.id}`}
                    onClick={e => { e.preventDefault(); onPost(blog); }}
                    style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:14, padding:"16px", textDecoration:"none", color:"inherit", display:"block", transition:"all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=tc; e.currentTarget.style.background="#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.background="#f8f9fc"; }}>
                    <span style={{ fontSize:"0.63rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:tc, display:"block", marginBottom:9 }}>{blog.cat}</span>
                    <div style={{ fontWeight:700, fontSize:"0.88rem", lineHeight:1.4, marginBottom:6 }}>{blog.title}</div>
                    <div style={{ fontSize:"0.75rem", color:"#aaa" }}>{blog.readTime}</div>
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
