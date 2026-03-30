import React, { useState, useEffect } from "react";

// ─── EMAIL CAPTURE COMPONENT ─────────────────────────────────────────────────
// Shows after a user successfully processes an image
// Offers the Social Media Cheat Sheet as lead magnet
export function EmailCapture({ onClose, toolName }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    // In production: POST to your email service (Mailchimp, ConvertKit, etc.)
    // For now: store in localStorage as demo
    const subscribers = JSON.parse(localStorage.getItem("px_subscribers") || "[]");
    subscribers.push({ email, tool: toolName, date: new Date().toISOString() });
    localStorage.setItem("px_subscribers", JSON.stringify(subscribers));
    setSubmitted(true);
    setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 2500);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      opacity: visible ? 1 : 0, transition: "opacity 0.3s"
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "36px 32px", maxWidth: 460, width: "100%",
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: "transform 0.3s", position: "relative", textAlign: "center"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none", color: "#bbb", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>

        {!submitted ? (
          <>
            <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>🎁</div>
            <h2 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 10, color: "#1a1a2e" }}>
              Get the Free 2026 Social Media Image Size Cheat Sheet
            </h2>
            <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 22 }}>
              Every image size for Instagram, Facebook, YouTube, TikTok, LinkedIn, and 8 more platforms — updated for 2026. Used by 50,000+ creators.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="your@email.com"
                style={{ flex: 1, background: "#f8f9fc", border: "2px solid #eee", borderRadius: 10, padding: "12px 16px", fontSize: "0.9rem", outline: "none", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = "#e74c3c"}
                onBlur={e => e.target.style.borderColor = "#eee"}
              />
              <button onClick={handleSubmit}
                style={{ background: "linear-gradient(135deg,#e74c3c,#e67e22)", border: "none", color: "#fff", padding: "12px 20px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                Get It Free →
              </button>
            </div>
            <p style={{ color: "#ccc", fontSize: "0.73rem" }}>No spam. Unsubscribe anytime. We send maybe 1 email per month.</p>
          </>
        ) : (
          <div style={{ padding: "20px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 8 }}>Check your inbox!</h3>
            <p style={{ color: "#888", fontSize: "0.88rem" }}>The cheat sheet is on its way. You're also subscribed to monthly image tool updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EMAIL CAPTURE BANNER (less intrusive) ───────────────────────────────────
export function EmailBanner({ onDismiss }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if not dismissed before
    const dismissed = localStorage.getItem("px_banner_dismissed");
    if (!dismissed) setTimeout(() => setShow(true), 3000);
  }, []);

  const dismiss = () => {
    localStorage.setItem("px_banner_dismissed", "1");
    setShow(false);
    onDismiss?.();
  };

  const submit = () => {
    if (!email.includes("@")) return;
    setDone(true);
    localStorage.setItem("px_subscribed", "1");
    localStorage.setItem("px_banner_dismissed", "1");
    setTimeout(() => setShow(false), 2000);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
      background: "#1a1a2e", borderRadius: 16, padding: "16px 20px", maxWidth: 560, width: "calc(100% - 40px)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.4)", zIndex: 8888, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap"
    }}>
      {!done ? (
        <>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff", marginBottom: 2 }}>🎁 Free: Social Media Image Size Cheat Sheet 2026</div>
            <div style={{ fontSize: "0.76rem", color: "#888" }}>Every platform, every size, updated March 2026</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="your@email.com"
              style={{ background: "#2a2a3e", border: "1px solid #444", borderRadius: 8, padding: "9px 14px", color: "#fff", fontFamily: "inherit", fontSize: "0.85rem", outline: "none", width: 180 }} />
            <button onClick={submit}
              style={{ background: "linear-gradient(135deg,#e74c3c,#e67e22)", border: "none", color: "#fff", padding: "9px 16px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>
              Send →
            </button>
          </div>
          <button onClick={dismiss} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        </>
      ) : (
        <div style={{ width: "100%", textAlign: "center", color: "#27ae60", fontWeight: 700 }}>✅ Cheat sheet sent to your inbox!</div>
      )}
    </div>
  );
}
