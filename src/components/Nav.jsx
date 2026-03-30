import React from "react";

export default function Nav({ onHome, onBlog, onCheat, onEmbed, onLang, page }) {
  const links = [
    { label: "Tools",      key: "home",  fn: onHome  },
    { label: "Blog",       key: "blog",  fn: onBlog  },
    { label: "Sizes 2026", key: "cheat", fn: onCheat },
    { label: "🌍 Languages",key: "lang", fn: onLang  },
    { label: "Embed",      key: "embed", fn: onEmbed },
  ];

  return (
    <nav style={{
      background:"#fff", borderBottom:"1px solid #eee",
      padding:"0 24px", height:62,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      position:"sticky", top:0, zIndex:100,
      boxShadow:"0 1px 8px rgba(0,0,0,0.06)"
    }}>
      {/* Brand */}
      <button onClick={onHome} style={{
        display:"flex", alignItems:"center", gap:9,
        background:"none", border:"none", cursor:"pointer", padding:0, flexShrink:0
      }}>
        <div style={{
          width:36, height:36,
          background:"linear-gradient(135deg,#e74c3c,#e67e22)",
          borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.1rem", boxShadow:"0 2px 8px rgba(231,76,60,0.35)"
        }}>⚡</div>
        <span style={{ fontWeight:800, fontSize:"1.2rem", letterSpacing:"-0.02em", color:"#1a1a2e" }}>
          Pixalyse
        </span>
        <span style={{
          fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.1em",
          background:"#fdecea", color:"#e74c3c",
          padding:"2px 9px", borderRadius:50, border:"1px solid #fcc"
        }}>FREE</span>
      </button>

      {/* Links */}
      <div style={{ display:"flex", gap:4, alignItems:"center", flexWrap:"wrap" }}>
        {links.map(({ label, key, fn }) => (
          <button key={key} onClick={fn} style={{
            background: page === key ? "#fdecea" : "none",
            border:"none",
            color: page === key ? "#e74c3c" : "#777",
            padding:"6px 13px", borderRadius:50, cursor:"pointer",
            fontFamily:"inherit", fontSize:"0.82rem",
            fontWeight: page === key ? 700 : 400,
            whiteSpace:"nowrap", transition:"all 0.15s"
          }}>{label}</button>
        ))}
      </div>
    </nav>
  );
}
