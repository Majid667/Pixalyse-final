import React, { useState } from "react";
import { TOOLS, TOOL_LINKS, JOURNEYS } from "../tools";
import { useSEO } from "../utils/useSEO";
import { SITE } from "../seo";
import TIcon from "../components/TIcon";
import {
  InvoiceGenerator, ProfitMarginCalc, SalaryCalculator,
  EMICalculator, LoanCalculator, InterestCalculator, ROICalculator,
  GSTCalculator, SIPCalculator, FDCalculator, PPFCalculator,
  BMICalculator, AgeCalculator, PercentageCalculator
} from "./CalcTools";
import UnitConverter from "./UnitConverter";
import WordCounter   from "./WordCounter";
import QRGenerator  from "./QRGenerator";

// ─── Metadata for every calc/utility tool ────────────────────────────────────
const CALC_META = {
  "invoice-generator":    { h1:"Free Invoice Generator — Create & Print Professional Invoices", sub:"Generate invoices in seconds. Line items, tax, multi-currency, print to PDF — free, no signup.", keywords:"free invoice generator online, create invoice pdf free, professional invoice maker india", Component:InvoiceGenerator },
  "profit-margin":        { h1:"Profit Margin Calculator — Margin, Markup & Profit", sub:"Calculate gross profit margin, markup percentage, and revenue from any combination of cost and selling price.", keywords:"profit margin calculator, markup calculator, gross profit calculator free india", Component:ProfitMarginCalc },
  "salary-calculator":    { h1:"Salary Calculator India — Gross to Net, Tax & Take-Home Pay 2025", sub:"Calculate take-home salary after income tax (new & old regime), PF, and cess. Updated for FY 2025.", keywords:"salary calculator india, take home salary calculator, income tax calculator india 2025, gross net salary", Component:SalaryCalculator },
  "emi-calculator":       { h1:"EMI Calculator — Monthly Loan Instalment Calculator Free", sub:"Calculate your exact monthly EMI, total interest payable, and see principal vs interest breakdown.", keywords:"emi calculator, home loan emi calculator, loan emi calculator india free", Component:EMICalculator },
  "loan-calculator":      { h1:"Loan Calculator — Total Cost, Interest & Early Repayment Savings", sub:"See total loan cost and how extra monthly payments can save you lakhs in interest.", keywords:"loan calculator india, home loan calculator, prepayment savings calculator free", Component:LoanCalculator },
  "interest-calculator":  { h1:"Interest Calculator — Simple & Compound Interest Free", sub:"Calculate simple and compound interest with all compounding frequencies. Compare both instantly.", keywords:"compound interest calculator, simple interest calculator, fd interest calculator india free", Component:InterestCalculator },
  "roi-calculator":       { h1:"ROI Calculator — Return on Investment & Payback Period", sub:"Calculate ROI, annualised return, net gain, and payback period for any investment.", keywords:"roi calculator, return on investment calculator free, investment returns calculator india", Component:ROICalculator },
  "gst-calculator":       { h1:"GST Calculator India — Add or Extract GST Free", sub:"Calculate GST on any amount. Both exclusive (add to base) and inclusive (extract from total) modes.", keywords:"gst calculator india, gst inclusive exclusive calculator, gst percentage calculator free", Component:GSTCalculator },
  "sip-calculator":       { h1:"SIP Calculator — Monthly SIP Returns & Wealth Creation", sub:"Calculate maturity value, wealth gained, and year-by-year growth for any SIP investment.", keywords:"sip calculator india, mutual fund sip calculator, monthly sip return calculator free", Component:SIPCalculator },
  "fd-calculator":        { h1:"FD Calculator — Fixed Deposit Maturity Amount Free", sub:"Calculate maturity value and interest earned on any fixed deposit with all compounding options.", keywords:"fd calculator india, fixed deposit calculator, bank fd maturity calculator free", Component:FDCalculator },
  "ppf-calculator":       { h1:"PPF Calculator — Public Provident Fund Maturity & Returns", sub:"Calculate PPF maturity at 7.1% p.a. with year-wise balance and total tax savings.", keywords:"ppf calculator india, public provident fund calculator, ppf returns calculator 2025", Component:PPFCalculator },
  "unit-converter":       { h1:"Unit Converter — Length, Weight, Temperature, Area, Speed & Data", sub:"Convert between any units instantly — metric, imperial, SI. Full reference table for every conversion.", keywords:"unit converter free online, length converter, weight converter, temperature converter, cm to inches", Component:UnitConverter },
  "word-counter":         { h1:"Word Counter — Words, Characters, Readability & Keyword Density", sub:"Paste any text for instant word count, character count, readability score, platform limits, and top keywords.", keywords:"word counter online free, character counter, readability score calculator, word count tool", Component:WordCounter },
  "qr-generator":         { h1:"QR Code Generator — Create Free QR Codes for Any Content", sub:"Generate QR codes for URLs, WiFi, emails, phones, contacts, SMS, and WhatsApp — customise colour and size.", keywords:"qr code generator free online, qr code creator, wifi qr code generator, url qr code free", Component:QRGenerator },
  "bmi-calculator":       { h1:"BMI Calculator — Body Mass Index & Healthy Weight Range", sub:"Calculate your BMI, see which category you're in, and find your ideal healthy weight range.", keywords:"bmi calculator, body mass index calculator free, bmi calculator india kg cm", Component:BMICalculator },
  "age-calculator":       { h1:"Age Calculator — Exact Age in Years, Months & Days", sub:"Calculate exact age, total days/weeks/months lived, next birthday countdown, and any date difference.", keywords:"age calculator, date of birth age calculator, exact age calculator free india", Component:AgeCalculator },
  "percentage-calculator":{ h1:"Percentage Calculator — % Of, % Change, % Difference Free", sub:"Five calculation modes: percentage of a value, what percentage, percentage change, add percentage, and difference.", keywords:"percentage calculator, what is 20 percent of 500, percentage change calculator free", Component:PercentageCalculator },
};

// ─── Next Tool Suggestions ────────────────────────────────────────────────────
export function NextToolSuggestions({ toolId, onSelectTool, label="You might also need" }) {
  const links = (TOOL_LINKS[toolId] || []).slice(0, 4);
  const tools = links.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
  if (!tools.length) return null;
  return (
    <div style={{ marginTop:22 }}>
      <div style={{ fontSize:"0.77rem", fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>🔗 {label}</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:10 }}>
        {tools.map(tool => (
          <button key={tool.id} onClick={() => onSelectTool(tool)}
            style={{ background:"#fff", border:`1.5px solid ${tool.color}28`, borderRadius:14, padding:"13px 13px", cursor:"pointer", textAlign:"left", display:"flex", gap:10, alignItems:"center", fontFamily:"inherit", transition:"all 0.17s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=tool.color; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 5px 16px ${tool.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=`${tool.color}28`; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
            <TIcon type={tool.icon} color={tool.color} size={32}/>
            <div>
              <div style={{ fontWeight:700, fontSize:"0.81rem", color:"#1a1a2e", lineHeight:1.25 }}>{tool.name}</div>
              <div style={{ fontSize:"0.68rem", color:tool.color, fontWeight:600, marginTop:2 }}>{tool.cat}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Journey Banner ───────────────────────────────────────────────────────────
export function JourneyBanner({ currentToolId, onSelectTool }) {
  const relevant = JOURNEYS.filter(j => j.steps.includes(currentToolId));
  if (!relevant.length) return null;
  const journey  = relevant[0];
  const tools    = journey.steps.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
  const currIdx  = tools.findIndex(t => t.id === currentToolId);
  const nextTool = tools[currIdx + 1];

  return (
    <div style={{ background:`linear-gradient(135deg,${journey.color}10,${journey.color}04)`, border:`2px solid ${journey.color}28`, borderRadius:18, padding:"18px 20px", marginTop:22 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, flexWrap:"wrap" }}>
        <span style={{ fontSize:"1.2rem" }}>{journey.icon}</span>
        <div>
          <div style={{ fontWeight:800, fontSize:"0.9rem", color:"#1a1a2e" }}>{journey.label}</div>
          <div style={{ fontSize:"0.74rem", color:"#888" }}>{journey.desc}</div>
        </div>
        <span style={{ marginLeft:"auto", fontSize:"0.7rem", color:"#aaa" }}>{currIdx+1} of {tools.length}</span>
      </div>
      <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
        {tools.map((tool, i) => (
          <React.Fragment key={tool.id}>
            <div onClick={() => tool.id !== currentToolId && onSelectTool(tool)}
              style={{ display:"flex", alignItems:"center", gap:6, background:tool.id===currentToolId?journey.color:"#fff", border:`1.5px solid ${tool.id===currentToolId?journey.color:"#eee"}`, borderRadius:50, padding:"5px 12px", cursor:tool.id===currentToolId?"default":"pointer", transition:"all 0.15s" }}>
              <span style={{ fontSize:"0.74rem", fontWeight:700, color:tool.id===currentToolId?"#fff":"#666" }}>{tool.name}</span>
              {tool.id===currentToolId && <span style={{ fontSize:"0.64rem", color:"rgba(255,255,255,0.8)" }}>◀ here</span>}
            </div>
            {i < tools.length-1 && <span style={{ color:"#ccc", fontSize:"0.8rem" }}>→</span>}
          </React.Fragment>
        ))}
      </div>
      {nextTool && (
        <button onClick={() => onSelectTool(nextTool)}
          style={{ marginTop:12, background:journey.color, border:"none", color:"#fff", padding:"9px 20px", borderRadius:50, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:"0.84rem", boxShadow:`0 3px 12px ${journey.color}42` }}>
          Next: {nextTool.name} →
        </button>
      )}
    </div>
  );
}

// ─── Sidebar tool navigator ───────────────────────────────────────────────────
function SidebarNav({ currentToolId, onSelectTool }) {
  const categories = ["Finance","Business","Tools"];
  return (
    <>
      {categories.map(catName => {
        const catTools = TOOLS.filter(t => t.cat === catName && t.id !== currentToolId);
        if (!catTools.length) return null;
        return (
          <div key={catName} style={{ background:"#fff", borderRadius:16, padding:"16px", border:"1px solid #eee", marginBottom:14 }}>
            <div style={{ fontSize:"0.7rem", fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>{catName}</div>
            {catTools.map(t => (
              <button key={t.id} onClick={() => onSelectTool(t)}
                style={{ width:"100%", background:"none", border:"none", padding:"7px 4px", cursor:"pointer", textAlign:"left", display:"flex", gap:10, alignItems:"center", fontFamily:"inherit", borderRadius:10, transition:"all 0.14s" }}
                onMouseEnter={e => { e.currentTarget.style.background = t.color + "10"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
                <TIcon type={t.icon} color={t.color} size={26}/>
                <div>
                  <div style={{ fontWeight:600, fontSize:"0.81rem", color:"#1a1a2e" }}>{t.name}</div>
                  <div style={{ fontSize:"0.67rem", color:"#aaa" }}>{t.desc}</div>
                </div>
              </button>
            ))}
          </div>
        );
      })}
      <div style={{ background:"#fafafa", border:"1px dashed #e8e8e8", borderRadius:14, height:240, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ writingMode:"vertical-rl", color:"#ddd", fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>Advertisement</span>
      </div>
    </>
  );
}

// ─── Main CalcPage component ──────────────────────────────────────────────────
export default function CalcPage({ tool, onBack, onSelectTool, prefill }) {
  const meta = CALC_META[tool.id];
  if (!meta) return null;
  const { h1, sub, keywords, Component } = meta;
  const tc = tool.color;

  useSEO({
    title:       `${h1} | Pixalyse`,
    description: sub,
    keywords,
    canonical:   `${SITE.url}/tool/${tool.id}`,
    schema: [
      { "@context":"https://schema.org","@type":"WebApplication","name":h1,"description":sub,"url":`${SITE.url}/tool/${tool.id}`,"applicationCategory":"UtilitiesApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }
    ],
    schemaId: `calc-${tool.id}`,
  });

  const [faqOpen, setFaqOpen] = useState({});

  return (
    <div style={{ background:"#f8f9fc", minHeight:"100vh", fontFamily:"inherit" }}>
      <nav style={{ background:"#fff", borderBottom:"1px solid #eee", padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:62, zIndex:90, boxShadow:"0 1px 5px rgba(0,0,0,0.04)" }}>
        <button onClick={onBack} style={{ background:"#f8f9fc", border:"1px solid #eee", color:"#888", padding:"6px 14px", borderRadius:50, cursor:"pointer", fontSize:"0.83rem", fontFamily:"inherit" }}>← All Tools</button>
        <span style={{ fontSize:"0.75rem", color:"#bbb" }}>Free · Private · No Login</span>
        <div/>
      </nav>

      <div style={{ background:"#fff", borderBottom:"1px solid #f0f0f0", minHeight:68, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:"#ddd", fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase" }}>Advertisement</span>
      </div>

      <div style={{ maxWidth:1080, margin:"0 auto", padding:"26px 16px 40px", display:"grid", gridTemplateColumns:"1fr 280px", gap:22, alignItems:"start" }}>

        {/* Main column */}
        <div>
          {/* Header */}
          <div style={{ background:"#fff", borderRadius:20, padding:"22px 26px", marginBottom:16, border:"1px solid #eee", borderTop:`4px solid ${tc}`, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap" }}>
              <TIcon type={tool.icon} color={tc} size={50}/>
              <div style={{ flex:1, minWidth:200 }}>
                <h1 style={{ fontWeight:800, fontSize:"clamp(1.15rem,2.5vw,1.55rem)", letterSpacing:"-0.02em", marginBottom:7, lineHeight:1.25 }}>{h1}</h1>
                <p style={{ color:"#666", fontSize:"0.9rem", marginBottom:13, lineHeight:1.6 }}>{sub}</p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["🔒 100% Private","⚡ Instant","🆓 Free","📵 No Login"].map(b=>(
                    <span key={b} style={{ background:"#f8f9fc", border:"1px solid #eee", borderRadius:50, padding:"3px 11px", fontSize:"0.71rem", color:"#666" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div style={{ background:"#fff", borderRadius:18, padding:"22px 24px", border:"1px solid #eee", marginBottom:16, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <Component prefill={prefill}/>
          </div>

          <JourneyBanner currentToolId={tool.id} onSelectTool={onSelectTool}/>

          {/* Next suggestions */}
          <div style={{ background:"#fff", border:"1px solid #eee", borderRadius:18, padding:"20px 22px", marginTop:16 }}>
            <NextToolSuggestions toolId={tool.id} onSelectTool={onSelectTool} label="Complete your workflow"/>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position:"sticky", top:130 }}>
          <SidebarNav currentToolId={tool.id} onSelectTool={onSelectTool}/>
        </aside>
      </div>

      <div style={{ background:"#f8f9fc", borderTop:"1px solid #eee", minHeight:72, display:"flex", alignItems:"center", justifyContent:"center", marginTop:8 }}>
        <span style={{ color:"#ddd", fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase" }}>Advertisement</span>
      </div>
    </div>
  );
}
