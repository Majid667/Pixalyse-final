import React, { useState, useCallback } from "react";

const QR_TYPES = [
  { id:"url",     label:"Website URL",   icon:"🌐", placeholder:"https://pixalyse.com" },
  { id:"text",    label:"Plain Text",    icon:"📝", placeholder:"Your message here" },
  { id:"email",   label:"Email",         icon:"📧", placeholder:"hello@example.com" },
  { id:"phone",   label:"Phone Number",  icon:"📱", placeholder:"+91 98765 43210" },
  { id:"sms",     label:"SMS",           icon:"💬", placeholder:"+91 98765 43210" },
  { id:"wifi",    label:"WiFi",          icon:"📶", placeholder:"NetworkName" },
  { id:"vcard",   label:"Contact (vCard)",icon:"👤",placeholder:"John Doe" },
  { id:"whatsapp",label:"WhatsApp",      icon:"💚", placeholder:"+91 98765 43210" },
];

function buildQRData(type, fields) {
  switch (type) {
    case "url":      return fields.url || "";
    case "text":     return fields.text || "";
    case "email":    return `mailto:${fields.email || ""}${fields.subject ? `?subject=${encodeURIComponent(fields.subject)}` : ""}${fields.body ? `&body=${encodeURIComponent(fields.body)}` : ""}`;
    case "phone":    return `tel:${fields.phone || ""}`;
    case "sms":      return `sms:${fields.phone || ""}${fields.smstext ? `:${fields.smstext}` : ""}`;
    case "wifi":     return `WIFI:T:${fields.security||"WPA"};S:${fields.ssid||""};P:${fields.password||""};H:${fields.hidden?"true":"false"};;`;
    case "vcard":    return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.name||""}\nTEL:${fields.phone||""}\nEMAIL:${fields.email||""}\nORG:${fields.org||""}\nURL:${fields.url||""}\nEND:VCARD`;
    case "whatsapp": return `https://wa.me/${(fields.phone||"").replace(/\D/g,"")}${fields.message?`?text=${encodeURIComponent(fields.message)}`:""}`;
    default:         return "";
  }
}

export default function QRGenerator() {
  const [type,   setType]   = useState("url");
  const [fields, setFields] = useState({});
  const [size,   setSize]   = useState(300);
  const [fgColor,setFgColor]= useState("#000000");
  const [bgColor,setBgColor]= useState("#ffffff");
  const [generated, setGenerated] = useState(false);

  const set = useCallback((k, v) => setFields(f => ({ ...f, [k]: v })), []);

  const qrData = buildQRData(type, fields);
  const qrURL  = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&color=${fgColor.slice(1)}&bgcolor=${bgColor.slice(1)}&format=png&qzone=2`
    : null;

  const download = async () => {
    try {
      const res  = await fetch(qrURL);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url; a.download = `qr-code-${type}.png`; a.click();
      URL.revokeObjectURL(url);
    } catch { window.open(qrURL, "_blank"); }
  };

  const renderFields = () => {
    const inp = (label, key, placeholder, type2="text") => (
      <div key={key}>
        <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>{label}</label>
        <input type={type2} value={fields[key]||""} onChange={e=>set(key,e.target.value)} placeholder={placeholder}
          style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"11px 14px", fontFamily:"inherit", fontSize:"0.9rem", outline:"none", boxSizing:"border-box" }}
          onFocus={e=>e.target.style.borderColor="#1a1a2e"} onBlur={e=>e.target.style.borderColor="#eee"}/>
      </div>
    );
    const ta = (label, key, placeholder) => (
      <div key={key}>
        <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>{label}</label>
        <textarea value={fields[key]||""} onChange={e=>set(key,e.target.value)} placeholder={placeholder} rows={3}
          style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"11px 14px", fontFamily:"inherit", fontSize:"0.9rem", outline:"none", resize:"vertical", boxSizing:"border-box" }}
          onFocus={e=>e.target.style.borderColor="#1a1a2e"} onBlur={e=>e.target.style.borderColor="#eee"}/>
      </div>
    );

    switch (type) {
      case "url":      return [inp("Website URL", "url", "https://pixalyse.com", "url")];
      case "text":     return [ta("Text", "text", "Your message…")];
      case "email":    return [inp("Email Address","email","hello@example.com","email"), inp("Subject (optional)","subject",""), ta("Message (optional)","body","")];
      case "phone":    return [inp("Phone Number","phone","+91 98765 43210","tel")];
      case "sms":      return [inp("Phone Number","phone","+91 98765 43210","tel"), ta("Message (optional)","smstext","")];
      case "wifi":     return [inp("Network Name (SSID)","ssid","MyWiFi"), inp("Password","password",""), ...[
        <div key="sec"><label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Security Type</label>
          <div style={{ display:"flex", gap:8 }}>{["WPA","WEP","None"].map(s=><button key={s} onClick={()=>set("security",s)} style={{ flex:1, background:(fields.security||"WPA")===s?"#1a1a2e":"#f8f9fc", border:`1.5px solid ${(fields.security||"WPA")===s?"#1a1a2e":"#eee"}`, color:(fields.security||"WPA")===s?"#fff":"#777", padding:"8px", borderRadius:9, cursor:"pointer", fontFamily:"inherit", fontSize:"0.84rem", fontWeight:(fields.security||"WPA")===s?700:400 }}>{s}</button>)}</div>
        </div>]];
      case "vcard":    return [inp("Full Name","name","John Doe"), inp("Phone","phone","+91 98765 43210","tel"), inp("Email","email","john@example.com","email"), inp("Organisation","org","Acme Ltd"), inp("Website","url","https://johndoe.com","url")];
      case "whatsapp": return [inp("WhatsApp Number","phone","+91 98765 43210","tel"), ta("Pre-filled Message (optional)","message","Hello!")];
      default: return [];
    }
  };

  const hasData = qrData && qrData.length > 3;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Type selector */}
      <div>
        <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>QR Code Type</label>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:8 }}>
          {QR_TYPES.map(t => (
            <button key={t.id} onClick={() => { setType(t.id); setFields({}); }}
              style={{ background:type===t.id?"#1a1a2e":"#f8f9fc", border:`1.5px solid ${type===t.id?"#1a1a2e":"#eee"}`, color:type===t.id?"#fff":"#666", padding:"10px 8px", borderRadius:12, cursor:"pointer", fontFamily:"inherit", fontSize:"0.79rem", fontWeight:type===t.id?700:400, textAlign:"center" }}>
              <div style={{ fontSize:"1.1rem", marginBottom:4 }}>{t.icon}</div>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic fields */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {renderFields()}
      </div>

      {/* Customisation */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        <div>
          <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Size (px)</label>
          <select value={size} onChange={e=>setSize(Number(e.target.value))}
            style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"10px 12px", fontFamily:"inherit", fontSize:"0.88rem", outline:"none" }}>
            {[150,200,300,400,500,600].map(s=><option key={s} value={s}>{s}×{s}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>QR Colour</label>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"8px 12px" }}>
            <input type="color" value={fgColor} onChange={e=>setFgColor(e.target.value)} style={{ width:28, height:28, cursor:"pointer", border:"none", borderRadius:5 }}/>
            <span style={{ fontSize:"0.82rem", color:"#666" }}>{fgColor}</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Background</label>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"8px 12px" }}>
            <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} style={{ width:28, height:28, cursor:"pointer", border:"none", borderRadius:5 }}/>
            <span style={{ fontSize:"0.82rem", color:"#666" }}>{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button onClick={()=>setGenerated(true)} disabled={!hasData}
        style={{ background:hasData?"linear-gradient(135deg,#1a1a2e,#2a2a40)":"#ddd", border:"none", color:hasData?"#fff":"#aaa", padding:"14px", borderRadius:13, fontWeight:800, fontSize:"0.97rem", cursor:hasData?"pointer":"not-allowed", fontFamily:"inherit", boxShadow:hasData?"0 4px 18px rgba(26,26,46,0.4)":"none" }}>
        ⬛ Generate QR Code
      </button>

      {/* QR Output */}
      {generated && hasData && qrURL && (
        <div style={{ background:"#f8f9fc", borderRadius:18, padding:"24px", textAlign:"center", border:"1px solid #eee" }}>
          <img src={qrURL} alt="QR Code" width={Math.min(size, 280)} height={Math.min(size, 280)}
            style={{ borderRadius:14, border:"1px solid #eee", background:bgColor, display:"block", margin:"0 auto 18px" }}
            onError={e => { e.target.src = ""; e.target.alt = "Failed to load QR — check your input"; }}/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <button onClick={download} style={{ background:"linear-gradient(135deg,#1a1a2e,#2a2a40)", border:"none", color:"#fff", padding:"12px", borderRadius:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.9rem" }}>
              ⬇ Download PNG
            </button>
            <button onClick={()=>{try{navigator.clipboard.writeText(qrURL);}catch{}}} style={{ background:"#fff", border:"1.5px solid #1a1a2e", color:"#1a1a2e", padding:"12px", borderRadius:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit", fontSize:"0.9rem" }}>
              📋 Copy Image URL
            </button>
          </div>
          <p style={{ fontSize:"0.74rem", color:"#bbb", marginTop:12, lineHeight:1.5 }}>
            🔒 Generated via api.qrserver.com — free, no API key, no tracking. QR data is encoded in the URL parameter.
          </p>
        </div>
      )}

      {generated && !hasData && (
        <div style={{ background:"#fdecea", borderRadius:12, padding:"14px", textAlign:"center", fontSize:"0.87rem", color:"#c0392b" }}>
          Please fill in the required fields above to generate your QR code.
        </div>
      )}
    </div>
  );
}
