import React, { useState } from "react";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";

export default function ContactPage({ onHome }) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("General Question");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  useSEO({
    title: "Contact Us | Pixalyse — Free Online Image Tools",
    description: "Get in touch with Pixalyse. Email us at pixalyse@gmail.com for support, feedback, bug reports, or partnership enquiries.",
    canonical: `${SITE.url}/contact`,
    schemaId: "contact-schema",
  });

  const SUBJECTS = [
    "General Question",
    "Bug Report",
    "Feature Request",
    "Business / Partnership",
    "Press Enquiry",
    "Other",
  ];

  const handleSubmit = () => {
    if (!email || !message) return;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:pixalyse@gmail.com?subject=${encodeURIComponent(`[Pixalyse] ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inp = {
    width: "100%", background: "#f8f9fc", border: "1.5px solid #eee",
    borderRadius: 12, padding: "12px 16px", fontFamily: "inherit",
    fontSize: "0.93rem", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s", color: "#1a1a2e"
  };

  const focus = e => e.target.style.borderColor = "#e74c3c";
  const blur  = e => e.target.style.borderColor = "#eee";

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "inherit" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#1a1a2e 0%,#2d2d44 100%)",
        padding: "52px 24px 44px", textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.3)",
          borderRadius: 50, padding: "5px 16px", marginBottom: 20
        }}>
          <span style={{ fontSize: "0.78rem", color: "#e74c3c", fontWeight: 700 }}>💬 We reply within 48 hours</span>
        </div>
        <h1 style={{
          fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900,
          letterSpacing: "-0.03em", color: "#fff", marginBottom: 14
        }}>Get in Touch</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
          Have a question, found a bug, or want to work with us? Drop us a message — we'd love to hear from you.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40, alignItems: "start" }}>

          {/* Left — contact info */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 24, color: "#1a1a2e" }}>Contact Information</h2>

            {/* Email card */}
            <a href="mailto:pixalyse@gmail.com"
              style={{ display: "block", background: "linear-gradient(135deg,#fdecea,#fff5f5)", border: "2px solid #fcc", borderRadius: 18, padding: "22px 20px", textDecoration: "none", marginBottom: 16, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#e74c3c"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(231,76,60,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#fcc"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>📧</div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Email</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#e74c3c" }}>pixalyse@gmail.com</div>
              <div style={{ fontSize: "0.78rem", color: "#888", marginTop: 6 }}>We reply within 48 hours</div>
            </a>

            {/* FAQ links */}
            <div style={{ background: "#f8f9fc", border: "1px solid #eee", borderRadius: 18, padding: "20px", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e", marginBottom: 14 }}>Before you email, check:</div>
              {[
                ["🔒", "Privacy Policy",    "/privacy"],
                ["📋", "Terms of Use",      "/terms"],
                ["❓", "Tool FAQs",         "#tools"],
              ].map(([icon, label, href]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span>{icon}</span>
                  <span style={{ fontSize: "0.87rem", color: "#555", fontWeight: 500 }}>{label}</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#bbb" }}>→</span>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div style={{ background: "#f0faf4", border: "1px solid #b7e4c7", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#27ae60", marginBottom: 8 }}>⚡ Response Times</div>
              {[["Bug reports", "24–48 hours"],["General questions","24–72 hours"],["Partnership enquiries","3–5 business days"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#555", padding: "4px 0" }}>
                  <span>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 24, color: "#1a1a2e" }}>Send a Message</h2>

            {sent ? (
              <div style={{ background: "#f0faf4", border: "2px solid #27ae60", borderRadius: 18, padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 10, color: "#1a1a2e" }}>Your email app should have opened!</h3>
                <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 20 }}>
                  If it didn't open automatically, please email us directly at{" "}
                  <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c", fontWeight: 600 }}>pixalyse@gmail.com</a>
                </p>
                <button onClick={() => setSent(false)} style={{ background: "#f8f9fc", border: "1.5px solid #eee", color: "#888", padding: "9px 22px", borderRadius: 50, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: "0.87rem" }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Name */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Your Name <span style={{ color: "#bbb", fontWeight: 400 }}>(optional)</span></label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah Smith"
                    style={inp} onFocus={focus} onBlur={blur}/>
                </div>

                {/* Email */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Your Email <span style={{ color: "#e74c3c" }}>*</span></label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                    style={inp} onFocus={focus} onBlur={blur}/>
                </div>

                {/* Subject */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Subject</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)}
                    style={{ ...inp, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 }}>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Message <span style={{ color: "#e74c3c" }}>*</span></label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind…" rows={6}
                    style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
                    onFocus={focus} onBlur={blur}/>
                </div>

                <button onClick={handleSubmit} disabled={!email || !message} style={{
                  background: (!email || !message) ? "#ddd" : "linear-gradient(135deg,#e74c3c,#e67e22)",
                  border: "none", color: (!email || !message) ? "#999" : "#fff",
                  padding: "14px", borderRadius: 12, fontWeight: 800,
                  fontSize: "0.97rem", cursor: (!email || !message) ? "not-allowed" : "pointer",
                  fontFamily: "inherit", transition: "all 0.2s",
                  boxShadow: (!email || !message) ? "none" : "0 4px 18px rgba(231,76,60,0.38)"
                }}>
                  📧 Open Email App to Send
                </button>

                <p style={{ fontSize: "0.77rem", color: "#bbb", textAlign: "center", margin: 0 }}>
                  This opens your default email app with the message pre-filled. Or email us directly at{" "}
                  <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c" }}>pixalyse@gmail.com</a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 52, paddingTop: 28, borderTop: "1px solid #f0f0f0" }}>
          <button onClick={onHome} style={{
            background: "linear-gradient(135deg,#e74c3c,#e67e22)", border: "none",
            color: "#fff", padding: "12px 28px", borderRadius: 50,
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem"
          }}>
            ← Back to Pixalyse Tools
          </button>
        </div>
      </div>
    </div>
  );
}
