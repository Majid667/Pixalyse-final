import React from "react";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";

const Section = ({ title, children }) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{
      fontSize: "1.15rem", fontWeight: 800, color: "#1a1a2e",
      paddingLeft: 16, borderLeft: "3px solid #e74c3c",
      marginBottom: 16, lineHeight: 1.3
    }}>{title}</h2>
    <div style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.9 }}>
      {children}
    </div>
  </section>
);

const P = ({ children }) => <p style={{ marginBottom: 14 }}>{children}</p>;
const Li = ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>;

export default function PrivacyPage({ onHome }) {
  useSEO({
    title: "Privacy Policy | Pixalyse — Free Online Image Tools",
    description: "Pixalyse Privacy Policy. We process all images locally in your browser — no files are ever uploaded to our servers. Read our full privacy policy.",
    canonical: `${SITE.url}/privacy`,
    schemaId: "privacy-schema",
  });

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
          <span style={{ fontSize: "0.78rem", color: "#e74c3c", fontWeight: 700 }}>🔒 Last updated: March 2026</span>
        </div>
        <h1 style={{
          fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900,
          letterSpacing: "-0.03em", color: "#fff", marginBottom: 14
        }}>Privacy Policy</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>
          The short version: <strong style={{ color: "#fff" }}>your files never leave your device.</strong> All image processing happens locally in your browser. We don't see your images. Ever.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "52px 24px" }}>

        {/* Key facts banner */}
        <div style={{
          background: "linear-gradient(135deg,#f0faf4,#e8f8ef)",
          border: "2px solid #27ae60", borderRadius: 18,
          padding: "24px 28px", marginBottom: 48
        }}>
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", marginBottom: 16 }}>
            🔒 The Privacy Highlights
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {[
              ["✅", "Browser-only processing", "Images never touch our servers"],
              ["✅", "Zero data collection",    "We don't store any personal data"],
              ["✅", "No tracking cookies",     "We don't use advertising trackers"],
              ["✅", "No account required",     "We don't know who you are"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e" }}>{title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Section title="1. Who We Are">
          <P>Pixalyse ("we", "our", "us") operates the website pixalyse.com and provides free online image processing tools. Our contact email is <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c" }}>pixalyse@gmail.com</a>.</P>
        </Section>

        <Section title="2. How Our Image Processing Works">
          <P><strong>All image processing on Pixalyse occurs entirely within your web browser using JavaScript and the HTML5 Canvas API.</strong> When you upload an image to any Pixalyse tool:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li>The image is loaded into your browser's memory only</Li>
            <Li>All processing (compression, resizing, conversion, etc.) happens on your device</Li>
            <Li>The processed image is returned to you as a download from your browser</Li>
            <Li>No image data is transmitted to Pixalyse servers at any point</Li>
            <Li>We cannot see, access, or store your images — technically or legally</Li>
          </ul>
          <P>This is a fundamental architectural decision, not just a policy. There is no server endpoint that receives your images because we have not built one.</P>
        </Section>

        <Section title="3. Information We Do Not Collect">
          <P>We do not collect, store, or process:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li>Your images or any file you upload to our tools</Li>
            <Li>Your name, email address, or any personal identifier</Li>
            <Li>Your IP address (beyond what is standard in web server logs)</Li>
            <Li>Browsing history or cross-site tracking data</Li>
            <Li>Payment information (all tools are free)</Li>
            <Li>Location data beyond approximate country (from analytics, if enabled)</Li>
          </ul>
        </Section>

        <Section title="4. Cookies and Analytics">
          <P>Pixalyse may use minimal, privacy-respecting analytics to understand how many people use the service and which tools are most popular. This data is aggregated and anonymised — it cannot be used to identify individual users.</P>
          <P>We do not use advertising cookies, Facebook Pixel, Google Ads remarketing, or any cross-site tracking technology. If we use Google Analytics, it is configured with IP anonymisation enabled.</P>
          <P>You can block all cookies and analytics using your browser's built-in settings or a browser extension — Pixalyse will continue to function normally.</P>
        </Section>

        <Section title="5. Google AdSense">
          <P>Pixalyse displays advertisements through Google AdSense to fund the free service. Google AdSense may set cookies and use your browsing data to show relevant advertisements. This is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c" }}>Google's Privacy Policy</a>.</P>
          <P>You can opt out of personalised Google advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c" }}>adssettings.google.com</a>.</P>
        </Section>

        <Section title="6. Email Communications">
          <P>If you voluntarily provide your email address (for example, to subscribe to our newsletter), we will use it only to send the communications you requested. We will never sell, rent, or share your email address with third parties.</P>
          <P>You can unsubscribe from any email communication at any time by clicking the unsubscribe link in the email or by contacting us at <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c" }}>pixalyse@gmail.com</a>.</P>
        </Section>

        <Section title="7. Third-Party Services">
          <P>Pixalyse uses the following third-party services:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li><strong>Google Fonts</strong> — to load web fonts. Google may log font requests. See Google's Privacy Policy.</Li>
            <Li><strong>jsPDF (CDN)</strong> — a JavaScript library loaded from cdnjs.cloudflare.com for PDF generation. Cloudflare logs standard CDN requests.</Li>
            <Li><strong>Google AdSense</strong> — for advertising. See Section 5.</Li>
            <Li><strong>Vercel</strong> — our hosting provider. Vercel processes standard web server logs including IP addresses, as described in Vercel's Privacy Policy.</Li>
          </ul>
        </Section>

        <Section title="8. Children's Privacy">
          <P>Pixalyse is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c" }}>pixalyse@gmail.com</a> and we will delete it.</P>
        </Section>

        <Section title="9. Your Rights (GDPR / UK GDPR)">
          <P>If you are located in the European Economic Area or the United Kingdom, you have the right to:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li>Access any personal data we hold about you</Li>
            <Li>Request correction or deletion of your personal data</Li>
            <Li>Object to or restrict processing of your personal data</Li>
            <Li>Data portability</Li>
            <Li>Lodge a complaint with your local data protection authority</Li>
          </ul>
          <P>Because we collect virtually no personal data, these rights are largely moot in practice. If you have any concern, contact us at <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c" }}>pixalyse@gmail.com</a>.</P>
        </Section>

        <Section title="10. Changes to This Policy">
          <P>We may update this Privacy Policy occasionally. The "Last updated" date at the top of this page will reflect any changes. We encourage you to review this policy periodically. Continued use of Pixalyse after changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section title="11. Contact">
          <P>If you have any questions about this Privacy Policy, please contact us:</P>
          <div style={{
            background: "#f8f9fc", border: "1px solid #eee", borderRadius: 14,
            padding: "20px 22px", marginTop: 16
          }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8 }}>Pixalyse</div>
            <div style={{ fontSize: "0.9rem", color: "#555" }}>
              Email: <a href="mailto:pixalyse@gmail.com" style={{ color: "#e74c3c", fontWeight: 600 }}>pixalyse@gmail.com</a><br/>
              Website: <a href="https://pixalyse.com" style={{ color: "#e74c3c" }}>pixalyse.com</a>
            </div>
          </div>
        </Section>

        {/* Back button */}
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid #f0f0f0" }}>
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
