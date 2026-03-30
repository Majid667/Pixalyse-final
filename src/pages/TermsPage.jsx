import React from "react";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";

const Section = ({ title, children }) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{
      fontSize: "1.15rem", fontWeight: 800, color: "#1a1a2e",
      paddingLeft: 16, borderLeft: "3px solid #e67e22",
      marginBottom: 16, lineHeight: 1.3
    }}>{title}</h2>
    <div style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.9 }}>
      {children}
    </div>
  </section>
);

const P = ({ children }) => <p style={{ marginBottom: 14 }}>{children}</p>;
const Li = ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>;

export default function TermsPage({ onHome }) {
  useSEO({
    title: "Terms of Use | Pixalyse — Free Online Image Tools",
    description: "Terms of Use for Pixalyse. Free image tools for personal and commercial use. Read our full terms and conditions.",
    canonical: `${SITE.url}/terms`,
    schemaId: "terms-schema",
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
          background: "rgba(230,126,34,0.15)", border: "1px solid rgba(230,126,34,0.3)",
          borderRadius: 50, padding: "5px 16px", marginBottom: 20
        }}>
          <span style={{ fontSize: "0.78rem", color: "#e67e22", fontWeight: 700 }}>📋 Last updated: March 2026</span>
        </div>
        <h1 style={{
          fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900,
          letterSpacing: "-0.03em", color: "#fff", marginBottom: 14
        }}>Terms of Use</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: 540, margin: "0 auto" }}>
          By using Pixalyse, you agree to these terms. They're written to be <strong style={{ color: "#fff" }}>fair and readable</strong> — not buried in legalese.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "52px 24px" }}>

        {/* Quick summary */}
        <div style={{
          background: "linear-gradient(135deg,#fff9f0,#fff5e8)",
          border: "2px solid #e67e22", borderRadius: 18,
          padding: "24px 28px", marginBottom: 48
        }}>
          <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", marginBottom: 14 }}>
            📋 The Key Points
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {[
              ["✅", "Free for everyone",         "Personal and commercial use, no cost"],
              ["✅", "No account needed",          "Use the tools without signing up"],
              ["✅", "Your content is yours",      "We make no claim on your images"],
              ["⚠️", "Provided as-is",            "No warranties on output accuracy"],
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

        <Section title="1. Acceptance of Terms">
          <P>By accessing or using Pixalyse at pixalyse.com ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service.</P>
          <P>We reserve the right to update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms. The "Last updated" date will reflect any changes.</P>
        </Section>

        <Section title="2. Description of Service">
          <P>Pixalyse provides free, browser-based image processing tools including but not limited to: image compression, resizing, cropping, format conversion, watermarking, background removal, and PDF conversion. All processing occurs locally in your browser — no images are uploaded to our servers.</P>
          <P>The Service is provided free of charge for both personal and commercial use. We reserve the right to add premium features, modify the free tier, or change the business model in the future, with reasonable advance notice.</P>
        </Section>

        <Section title="3. Permitted Use">
          <P>You may use Pixalyse to:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li>Process images for personal, educational, or commercial purposes</Li>
            <Li>Use the processed images in any legal project, product, or publication</Li>
            <Li>Access the Service from any location and on any device</Li>
            <Li>Share links to Pixalyse with others</Li>
          </ul>
        </Section>

        <Section title="4. Prohibited Use">
          <P>You may not use Pixalyse to:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li>Process images that violate any applicable law, including child protection laws</Li>
            <Li>Process images that infringe the intellectual property rights of others</Li>
            <Li>Attempt to reverse-engineer, scrape, or systematically copy the Service</Li>
            <Li>Use automated systems (bots, crawlers) to access the Service at scale without permission</Li>
            <Li>Interfere with or disrupt the infrastructure or security of the Service</Li>
            <Li>Misrepresent the origin or ownership of images processed through the Service</Li>
          </ul>
          <P>We reserve the right to terminate access for users who violate these restrictions.</P>
        </Section>

        <Section title="5. Intellectual Property — Your Content">
          <P><strong>You retain all intellectual property rights in the images you process through Pixalyse.</strong> We make no claim of ownership over any images you upload or process. Because all processing occurs in your browser, your images never reach our servers and we have no access to them.</P>
          <P>You represent and warrant that you have the right to process any image you use with Pixalyse, and that doing so does not violate the intellectual property rights of any third party.</P>
        </Section>

        <Section title="6. Intellectual Property — Pixalyse">
          <P>Pixalyse, its name, logo, design, source code, and content are the intellectual property of Pixalyse and are protected by copyright and other applicable laws. You may not copy, reproduce, or redistribute any part of the Service without our written permission.</P>
          <P>You are permitted to embed Pixalyse tools on your website using our official embed code with attribution to Pixalyse.</P>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <P>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</P>
          <P>We do not warrant that:</P>
          <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
            <Li>The Service will be uninterrupted, error-free, or available at all times</Li>
            <Li>The output of any tool will meet your specific requirements or quality standards</Li>
            <Li>Passport photos created with Pixalyse will meet official government requirements (always verify with the relevant authority)</Li>
            <Li>The Service will be free from bugs, viruses, or other harmful components</Li>
          </ul>
        </Section>

        <Section title="8. Limitation of Liability">
          <P>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PIXALYSE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.</P>
          <P>Our total liability to you for any claim arising from these Terms or the Service shall not exceed £100 (one hundred British pounds sterling), regardless of the cause of action.</P>
        </Section>

        <Section title="9. Third-Party Links and Services">
          <P>Pixalyse may contain links to third-party websites, services, or advertisements. We are not responsible for the content, privacy practices, or terms of any third-party service. Visiting a third-party link is at your own risk.</P>
          <P>Google AdSense advertisements displayed on Pixalyse are governed by Google's own terms and policies.</P>
        </Section>

        <Section title="10. Passport Photos and Compliance">
          <P>Pixalyse's Passport Photo tool is designed to assist users in creating photos that meet common government standards. However, <strong>we cannot guarantee that photos created with this tool will be accepted by any specific government authority.</strong> Requirements vary by country, change over time, and may be interpreted differently by individual processing agents.</P>
          <P>Always verify current photo requirements with the relevant official authority before using any photo for a visa, passport, or identity document application. Pixalyse accepts no liability for passport or visa application rejections.</P>
        </Section>

        <Section title="11. Governing Law">
          <P>These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>
        </Section>

        <Section title="12. Contact">
          <P>For questions about these Terms, please contact us:</P>
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
