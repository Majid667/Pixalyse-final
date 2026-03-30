import React, { useState, useRef } from "react";

// ─── Shared UI helpers ────────────────────────────────────────────────────────
const fmt  = (n, d=2) => isNaN(n) ? "—" : Number(n).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtC = (n, sym="₹") => isNaN(n) ? "—" : sym + " " + fmt(n);

function Row({ label, value, bold, big, color }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f0f0f0" }}>
      <span style={{ fontSize: big?"1rem":"0.88rem", color:"#666" }}>{label}</span>
      <span style={{ fontSize: big?"1.15rem":"0.95rem", fontWeight: bold?800:600, color: color||"#1a1a2e" }}>{value}</span>
    </div>
  );
}

function Inp({ label, value, set, prefix, suffix, type="number", placeholder="0" }) {
  return (
    <div>
      <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>{label}</label>
      <div style={{ display:"flex", alignItems:"center", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:12, overflow:"hidden" }}>
        {prefix && <span style={{ padding:"0 12px", color:"#aaa", fontSize:"0.9rem", borderRight:"1.5px solid #eee", background:"#f0f1f3" }}>{prefix}</span>}
        <input type={type} value={value} onChange={e=>set(e.target.value)} placeholder={placeholder}
          style={{ flex:1, background:"transparent", border:"none", outline:"none", padding:"12px 14px", fontSize:"0.95rem", fontFamily:"inherit", color:"#1a1a2e" }}
          onFocus={e=>e.target.parentElement.style.borderColor="#e74c3c"}
          onBlur={e=>e.target.parentElement.style.borderColor="#eee"}/>
        {suffix && <span style={{ padding:"0 12px", color:"#aaa", fontSize:"0.88rem", borderLeft:"1.5px solid #eee", background:"#f0f1f3" }}>{suffix}</span>}
      </div>
    </div>
  );
}

function ResultBox({ color, children }) {
  return (
    <div style={{ background:`linear-gradient(135deg,${color}08,${color}04)`, border:`2px solid ${color}25`, borderRadius:18, padding:"22px 24px", marginTop:20 }}>
      {children}
    </div>
  );
}

// ─── 1. INVOICE GENERATOR ────────────────────────────────────────────────────
export function InvoiceGenerator() {
  const [biz,  setBiz]  = useState("My Business");
  const [bizEmail,setBE]= useState("hello@mybusiness.com");
  const [client,setClient]=useState("");
  const [invNo, setInvNo]= useState("INV-001");
  const [date,  setDate] = useState(new Date().toISOString().slice(0,10));
  const [due,   setDue]  = useState("");
  const [items, setItems]= useState([
    { desc:"Service / Product", qty:1, rate:0 }
  ]);
  const [tax, setTax]   = useState(18);
  const [notes,setNotes]= useState("Thank you for your business!");
  const [curr, setCurr] = useState("₹");

  const addItem  = () => setItems([...items, { desc:"", qty:1, rate:0 }]);
  const updItem  = (i, k, v) => setItems(items.map((it,idx) => idx===i ? {...it,[k]:v} : it));
  const delItem  = (i) => setItems(items.filter((_,idx)=>idx!==i));

  const subtotal = items.reduce((s,it) => s + (Number(it.qty)||0)*(Number(it.rate)||0), 0);
  const taxAmt   = subtotal * (Number(tax)/100);
  const total    = subtotal + taxAmt;

  const print = () => {
    const html = `<!DOCTYPE html><html><head><title>Invoice ${invNo}</title>
<style>body{font-family:sans-serif;padding:40px;color:#222;max-width:700px;margin:0 auto}
h1{font-size:2rem;color:#e74c3c;margin:0}
.header{display:flex;justify-content:space-between;margin-bottom:32px}
.meta{font-size:0.85rem;color:#888}
table{width:100%;border-collapse:collapse;margin:24px 0}
th{background:#f5f5f5;padding:10px 14px;text-align:left;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em}
td{padding:10px 14px;border-bottom:1px solid #eee}
.totals{margin-left:auto;width:280px}
.totals .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:0.9rem}
.totals .total{font-size:1.1rem;font-weight:800;color:#e74c3c}
.notes{margin-top:32px;font-size:0.85rem;color:#888;border-top:1px solid #eee;padding-top:16px}
@media print{body{padding:20px}}</style></head><body>
<div class="header"><div><h1>INVOICE</h1><p class="meta">${biz}<br/>${bizEmail}</p></div>
<div style="text-align:right"><p class="meta"><strong>Invoice #</strong> ${invNo}<br/><strong>Date:</strong> ${date}<br/>${due?`<strong>Due:</strong> ${due}`:""}
<br/><strong>Bill to:</strong> ${client||"—"}</p></div></div>
<table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>
${items.map(it=>`<tr><td>${it.desc}</td><td>${it.qty}</td><td>${curr}${Number(it.rate).toFixed(2)}</td><td>${curr}${(Number(it.qty)*Number(it.rate)).toFixed(2)}</td></tr>`).join("")}
</tbody></table>
<div class="totals">
<div class="row"><span>Subtotal</span><span>${curr}${subtotal.toFixed(2)}</span></div>
<div class="row"><span>Tax (${tax}%)</span><span>${curr}${taxAmt.toFixed(2)}</span></div>
<div class="row total"><span>TOTAL</span><span>${curr}${total.toFixed(2)}</span></div></div>
<div class="notes">${notes}</div>
</body></html>`;
    const w = window.open("","_blank");
    w.document.write(html);
    w.document.close();
    setTimeout(()=>w.print(), 400);
  };

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <Inp label="Your Business Name" value={biz} set={setBiz} type="text" placeholder="Acme Ltd"/>
        <Inp label="Your Email" value={bizEmail} set={setBE} type="text" placeholder="hello@business.com"/>
        <Inp label="Client Name" value={client} set={setClient} type="text" placeholder="Client Ltd"/>
        <Inp label="Invoice Number" value={invNo} set={setInvNo} type="text" placeholder="INV-001"/>
        <Inp label="Invoice Date" value={date} set={setDate} type="date"/>
        <Inp label="Due Date (optional)" value={due} set={setDue} type="date"/>
      </div>

      {/* Currency selector */}
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Currency</label>
        <div style={{ display:"flex", gap:8 }}>
          {["₹","$","€","£","¥"].map(c=>(
            <button key={c} onClick={()=>setCurr(c)} style={{ background:curr===c?"#e74c3c":"#f8f9fc", border:`1.5px solid ${curr===c?"#e74c3c":"#eee"}`, color:curr===c?"#fff":"#666", padding:"7px 16px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.9rem", fontWeight:700 }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Line items */}
      <div style={{ marginBottom:14 }}>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Items / Services</label>
        {items.map((item, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 80px 100px 32px", gap:8, marginBottom:8, alignItems:"center" }}>
            <input value={item.desc} onChange={e=>updItem(i,"desc",e.target.value)} placeholder="Description" style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:10, padding:"10px 12px", fontFamily:"inherit", fontSize:"0.87rem", outline:"none" }}/>
            <input type="number" value={item.qty} onChange={e=>updItem(i,"qty",e.target.value)} placeholder="Qty" style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:10, padding:"10px 12px", fontFamily:"inherit", fontSize:"0.87rem", outline:"none", textAlign:"center" }}/>
            <input type="number" value={item.rate} onChange={e=>updItem(i,"rate",e.target.value)} placeholder="Rate" style={{ background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:10, padding:"10px 12px", fontFamily:"inherit", fontSize:"0.87rem", outline:"none" }}/>
            <button onClick={()=>delItem(i)} disabled={items.length===1} style={{ background:"#fdecea", border:"none", color:"#e74c3c", borderRadius:8, cursor:items.length===1?"not-allowed":"pointer", fontSize:"1rem", padding:"8px", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
        ))}
        <button onClick={addItem} style={{ background:"#f0faf4", border:"1.5px dashed #27ae60", color:"#27ae60", borderRadius:10, padding:"9px 18px", cursor:"pointer", fontFamily:"inherit", fontSize:"0.84rem", fontWeight:600, width:"100%", marginTop:4 }}>+ Add Item</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <Inp label="Tax Rate (%)" value={tax} set={setTax} suffix="%"/>
        <div/>
      </div>

      <div style={{ marginBottom:16 }}>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Notes / Payment Terms</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={2} style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:12, padding:"12px 14px", fontFamily:"inherit", fontSize:"0.88rem", outline:"none", resize:"vertical", boxSizing:"border-box" }}/>
      </div>

      {/* Summary */}
      <div style={{ background:"#f8f9fc", borderRadius:14, padding:"16px 20px", marginBottom:16 }}>
        <Row label="Subtotal" value={fmtC(subtotal, curr)}/>
        <Row label={`Tax (${tax}%)`} value={fmtC(taxAmt, curr)}/>
        <Row label="TOTAL" value={fmtC(total, curr)} bold big color="#e74c3c"/>
      </div>

      <button onClick={print} style={{ width:"100%", background:"linear-gradient(135deg,#27ae60,#2ecc71)", border:"none", color:"#fff", padding:"15px", borderRadius:14, fontWeight:800, fontSize:"1rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 18px rgba(39,174,96,0.4)" }}>
        🖨️ Print / Save as PDF
      </button>
    </div>
  );
}

// ─── 2. PROFIT MARGIN CALCULATOR ────────────────────────────────────────────
export function ProfitMarginCalc() {
  const [cost,   setCost]   = useState("");
  const [sell,   setSell]   = useState("");
  const [mode,   setMode]   = useState("cost-sell");
  const [margin, setMargin] = useState("");
  const [markup, setMarkup] = useState("");

  let revenue=0, profit=0, marg=0, mu=0;
  if (mode==="cost-sell" && cost && sell) {
    revenue = Number(sell); profit = revenue - Number(cost);
    marg = (profit/revenue)*100; mu = (profit/Number(cost))*100;
  } else if (mode==="cost-margin" && cost && margin) {
    marg = Number(margin); revenue = Number(cost)/(1-marg/100);
    profit = revenue - Number(cost); mu = (profit/Number(cost))*100;
  } else if (mode==="sell-margin" && sell && margin) {
    revenue = Number(sell); marg = Number(margin);
    profit = revenue*(marg/100); const c = revenue-profit;
    mu = (profit/c)*100;
  }

  const color = "#e74c3c";
  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {[["cost-sell","Cost + Sell Price"],["cost-margin","Cost + Margin %"],["sell-margin","Sell + Margin %"]].map(([v,l])=>(
          <button key={v} onClick={()=>setMode(v)} style={{ background:mode===v?color:"#f8f9fc", border:`1.5px solid ${mode===v?color:"#eee"}`, color:mode===v?"#fff":"#777", padding:"7px 14px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:mode===v?700:400 }}>{l}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {(mode==="cost-sell"||mode==="cost-margin") && <Inp label="Cost Price" value={cost} set={setCost} prefix="₹" placeholder="e.g. 500"/>}
        {(mode==="cost-sell"||mode==="sell-margin") && <Inp label="Selling Price" value={sell} set={setSell} prefix="₹" placeholder="e.g. 800"/>}
        {(mode==="cost-margin"||mode==="sell-margin") && <Inp label="Desired Margin" value={margin} set={setMargin} suffix="%" placeholder="e.g. 30"/>}
      </div>
      {profit!==0 && (
        <ResultBox color={color}>
          <Row label="Revenue"        value={fmtC(revenue)}/>
          <Row label="Cost"           value={fmtC(Number(cost)||revenue-profit)}/>
          <Row label="Gross Profit"   value={fmtC(profit)}  color={profit>0?"#27ae60":"#e74c3c"}/>
          <Row label="Profit Margin"  value={fmt(marg)+" %"} bold big color={marg>0?"#27ae60":"#e74c3c"}/>
          <Row label="Markup"         value={fmt(mu)+" %"}/>
        </ResultBox>
      )}
    </div>
  );
}

// ─── 3. SALARY / TAX CALCULATOR ─────────────────────────────────────────────
export function SalaryCalculator() {
  const [gross, setGross] = useState("");
  const [regime,setRegime]= useState("new");
  const [pf,    setPf]    = useState(true);

  const g = Number(gross) || 0;
  // Indian tax slabs — New regime FY 2024-25
  const pfAmt = pf ? Math.min(g*0.12, 21600) : 0;
  const taxable = g - pfAmt;
  let tax=0;
  if (regime==="new") {
    // New regime slabs
    if (taxable<=300000) tax=0;
    else if (taxable<=700000) tax=(taxable-300000)*0.05;
    else if (taxable<=1000000) tax=20000+(taxable-700000)*0.10;
    else if (taxable<=1200000) tax=50000+(taxable-1000000)*0.15;
    else if (taxable<=1500000) tax=80000+(taxable-1200000)*0.20;
    else tax=140000+(taxable-1500000)*0.30;
  } else {
    // Old regime
    if (taxable<=250000) tax=0;
    else if (taxable<=500000) tax=(taxable-250000)*0.05;
    else if (taxable<=1000000) tax=12500+(taxable-500000)*0.20;
    else tax=112500+(taxable-1000000)*0.30;
  }
  const cess    = tax*0.04;
  const totalTax= tax+cess;
  const netAnnual = g-pfAmt-totalTax;
  const netMonthly = netAnnual/12;
  const effRate = g>0 ? (totalTax/g)*100 : 0;
  const color   = "#8e44ad";

  return (
    <div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:16 }}>
        <Inp label="Annual Gross Salary" value={gross} set={setGross} prefix="₹" placeholder="e.g. 1200000"/>
        <div>
          <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Tax Regime</label>
          <div style={{ display:"flex", gap:8 }}>
            {[["new","New Regime (FY 2025)"],["old","Old Regime"]].map(([v,l])=>(
              <button key={v} onClick={()=>setRegime(v)} style={{ flex:1, background:regime===v?color:"#f8f9fc", border:`1.5px solid ${regime===v?color:"#eee"}`, color:regime===v?"#fff":"#777", padding:"9px 14px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.84rem", fontWeight:regime===v?700:400 }}>{l}</button>
            ))}
          </div>
        </div>
        <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:"0.88rem", color:"#555" }}>
          <input type="checkbox" checked={pf} onChange={e=>setPf(e.target.checked)} style={{ accentColor:color, width:16, height:16 }}/>
          Include Employee PF (12% up to ₹21,600/yr)
        </label>
      </div>
      {g>0 && (
        <ResultBox color={color}>
          <Row label="Gross Annual"    value={fmtC(g)}/>
          <Row label="PF Deduction"    value={fmtC(pfAmt)}/>
          <Row label="Taxable Income"  value={fmtC(taxable)}/>
          <Row label="Income Tax"      value={fmtC(tax)}/>
          <Row label="Health & Edu Cess (4%)" value={fmtC(cess)}/>
          <Row label="Total Tax"       value={fmtC(totalTax)} color="#e74c3c" bold/>
          <Row label="Net Annual"      value={fmtC(netAnnual)} bold/>
          <Row label="Net Monthly 🏠"  value={fmtC(netMonthly)} bold big color="#27ae60"/>
          <Row label="Effective Tax Rate" value={fmt(effRate)+" %"}/>
        </ResultBox>
      )}
    </div>
  );
}

// ─── 4. EMI CALCULATOR ───────────────────────────────────────────────────────
export function EMICalculator() {
  const [principal,setP] = useState("");
  const [rate,     setR] = useState("");
  const [tenure,   setT] = useState("");
  const [tenureType,setTT]=useState("years");

  const P  = Number(principal)||0;
  const r  = (Number(rate)||0)/(12*100);
  const n  = tenureType==="years" ? (Number(tenure)||0)*12 : Number(tenure)||0;
  const emi = (P>0&&r>0&&n>0) ? P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1) : 0;
  const totalAmt  = emi*n;
  const totalInt  = totalAmt-P;
  const color = "#2980b9";

  // Amortisation for first 3 years
  const schedule = [];
  let bal = P;
  for (let i=1; i<=Math.min(n,3); i++) {
    const intPart  = bal*r;
    const prinPart = emi-intPart;
    bal -= prinPart;
    schedule.push({ m:i, emi, int:intPart, prin:prinPart, bal:Math.max(0,bal) });
  }

  return (
    <div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Inp label="Loan Amount" value={principal} set={setP} prefix="₹" placeholder="e.g. 1000000"/>
        <Inp label="Interest Rate (Annual)" value={rate} set={setR} suffix="% p.a." placeholder="e.g. 8.5"/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:8, alignItems:"end" }}>
          <Inp label="Loan Tenure" value={tenure} set={setT} placeholder={tenureType==="years"?"e.g. 20":"e.g. 240"}/>
          <div style={{ display:"flex", gap:6, marginBottom:0 }}>
            {["years","months"].map(t=>(
              <button key={t} onClick={()=>setTT(t)} style={{ background:tenureType===t?color:"#f8f9fc", border:`1.5px solid ${tenureType===t?color:"#eee"}`, color:tenureType===t?"#fff":"#777", padding:"12px 12px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:tenureType===t?700:400, whiteSpace:"nowrap" }}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      {emi>0 && (
        <>
          <ResultBox color={color}>
            <Row label="Monthly EMI"         value={fmtC(emi)} bold big color={color}/>
            <Row label="Total Amount Payable" value={fmtC(totalAmt)}/>
            <Row label="Principal"           value={fmtC(P)}/>
            <Row label="Total Interest"      value={fmtC(totalInt)} color="#e74c3c" bold/>
            <Row label="Interest to Principal" value={fmt((totalInt/P)*100)+" %"}/>
          </ResultBox>
          {/* Mini chart */}
          <div style={{ marginTop:16, background:"#f8f9fc", borderRadius:14, padding:"16px", overflow:"hidden" }}>
            <div style={{ fontSize:"0.8rem", fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Breakdown</div>
            <div style={{ height:14, borderRadius:50, overflow:"hidden", display:"flex" }}>
              <div style={{ width:`${(P/totalAmt)*100}%`, background:color, transition:"width 0.4s" }}/>
              <div style={{ flex:1, background:"#e74c3c44" }}/>
            </div>
            <div style={{ display:"flex", gap:16, marginTop:8, fontSize:"0.78rem" }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:color, display:"inline-block" }}/> Principal {fmt((P/totalAmt)*100)}%</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10, height:10, borderRadius:2, background:"#e74c3c", display:"inline-block" }}/> Interest {fmt((totalInt/totalAmt)*100)}%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── 5. LOAN CALCULATOR ──────────────────────────────────────────────────────
export function LoanCalculator() {
  const [loanAmt,setLA]  = useState("");
  const [rate,   setR]   = useState("");
  const [tenure, setT]   = useState("");
  const [extra,  setEx]  = useState("");

  const P  = Number(loanAmt)||0;
  const r  = (Number(rate)||0)/(12*100);
  const n  = (Number(tenure)||0)*12;
  const emi= (P>0&&r>0&&n>0) ? P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1) : 0;
  const extraPay = Number(extra)||0;
  const color = "#16a085";

  // With extra payment
  let newN=0, bal=P;
  if (emi>0) {
    while (bal>0 && newN<1200) {
      const intPart = bal*r;
      const prinPart = emi+extraPay-intPart;
      if (prinPart<=0) break;
      bal -= prinPart; newN++;
    }
  }
  const totalNormal = emi*n;
  const totalExtra  = (emi+extraPay)*newN;
  const savedInt    = totalNormal - totalExtra;
  const savedMonths = n - newN;

  return (
    <div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Inp label="Loan Amount" value={loanAmt} set={setLA} prefix="₹" placeholder="e.g. 5000000"/>
        <Inp label="Annual Interest Rate" value={rate} set={setR} suffix="% p.a." placeholder="e.g. 9"/>
        <Inp label="Loan Tenure" value={tenure} set={setT} suffix="years" placeholder="e.g. 25"/>
        <Inp label="Extra Monthly Payment (optional)" value={extra} set={setEx} prefix="₹" placeholder="e.g. 5000"/>
      </div>
      {emi>0 && (
        <ResultBox color={color}>
          <Row label="Standard EMI"       value={fmtC(emi)} bold/>
          <Row label="Standard Tenure"    value={`${Math.ceil(n/12)} years (${n} months)`}/>
          <Row label="Total Amount"       value={fmtC(totalNormal)}/>
          <Row label="Total Interest"     value={fmtC(totalNormal-P)} color="#e74c3c"/>
          {extraPay>0 && <>
            <div style={{ height:1, background:"#eee", margin:"8px 0" }}/>
            <Row label={`With ₹${fmt(extraPay,0)} extra/month`} value=""/>
            <Row label="New Tenure"       value={`${Math.ceil(newN/12)} yr (${newN} mo)`} bold color={color}/>
            <Row label="Interest Saved"   value={fmtC(savedInt)} bold big color="#27ae60"/>
            <Row label="Months Saved"     value={`${savedMonths} months`} color="#27ae60"/>
          </>}
        </ResultBox>
      )}
    </div>
  );
}

// ─── 6. INTEREST CALCULATOR ──────────────────────────────────────────────────
export function InterestCalculator() {
  const [principal, setP]  = useState("");
  const [rate,      setR]  = useState("");
  const [time,      setT]  = useState("");
  const [timeUnit,  setTU] = useState("years");
  const [compFreq,  setCF] = useState("annually");
  const [mode,      setMode]=useState("compound");

  const P  = Number(principal)||0;
  const r  = Number(rate)||0;
  const t  = Number(time)||0;
  const tY = timeUnit==="months" ? t/12 : t;

  const n  = { annually:1, quarterly:4, monthly:12 }[compFreq];
  const SI = P*(r/100)*tY;
  const CI = P*(Math.pow(1+(r/100/n), n*tY))-P;
  const color = "#e67e22";

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[["simple","Simple Interest"],["compound","Compound Interest"]].map(([v,l])=>(
          <button key={v} onClick={()=>setMode(v)} style={{ flex:1, background:mode===v?color:"#f8f9fc", border:`1.5px solid ${mode===v?color:"#eee"}`, color:mode===v?"#fff":"#777", padding:"9px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.84rem", fontWeight:mode===v?700:400 }}>{l}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Inp label="Principal Amount" value={principal} set={setP} prefix="₹" placeholder="e.g. 100000"/>
        <Inp label="Interest Rate" value={rate} set={setR} suffix="% p.a." placeholder="e.g. 8"/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:8, alignItems:"end" }}>
          <Inp label="Time Period" value={time} set={setT} placeholder="e.g. 5"/>
          <div style={{ display:"flex", gap:6 }}>
            {["years","months"].map(u=>(
              <button key={u} onClick={()=>setTU(u)} style={{ background:timeUnit===u?color:"#f8f9fc", border:`1.5px solid ${timeUnit===u?color:"#eee"}`, color:timeUnit===u?"#fff":"#777", padding:"12px 12px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:timeUnit===u?700:400 }}>{u}</button>
            ))}
          </div>
        </div>
        {mode==="compound" && (
          <div>
            <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Compounding Frequency</label>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {[["annually","Annual"],["quarterly","Quarterly"],["monthly","Monthly"]].map(([v,l])=>(
                <button key={v} onClick={()=>setCF(v)} style={{ background:compFreq===v?color:"#f8f9fc", border:`1.5px solid ${compFreq===v?color:"#eee"}`, color:compFreq===v?"#fff":"#777", padding:"6px 14px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:compFreq===v?700:400 }}>{l}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      {P>0 && r>0 && t>0 && (
        <ResultBox color={color}>
          {mode==="simple" ? <>
            <Row label="Principal"       value={fmtC(P)}/>
            <Row label="Simple Interest" value={fmtC(SI)} bold color={color}/>
            <Row label="Total Amount"    value={fmtC(P+SI)} bold big/>
          </> : <>
            <Row label="Principal"          value={fmtC(P)}/>
            <Row label="Compound Interest"  value={fmtC(CI)} bold color={color}/>
            <Row label="Total Amount"       value={fmtC(P+CI)} bold big/>
            <Row label="vs Simple Interest" value={fmtC(SI)} color="#aaa"/>
            <Row label="Extra via Compounding" value={fmtC(CI-SI)} color="#27ae60"/>
          </>}
        </ResultBox>
      )}
    </div>
  );
}

// ─── 7. ROI CALCULATOR ───────────────────────────────────────────────────────
export function ROICalculator() {
  const [invest,  setInv] = useState("");
  const [returns, setRet] = useState("");
  const [period,  setPer] = useState("");
  const [periodUnit,setPU]= useState("years");
  const [cost,    setCost]= useState("");

  const I  = Number(invest)||0;
  const R  = Number(returns)||0;
  const C  = Number(cost)||0;
  const netGain = R - I - C;
  const roi     = I>0 ? (netGain/I)*100 : 0;
  const p       = Number(period)||0;
  const pY      = periodUnit==="months" ? p/12 : p;
  const annROI  = pY>0 ? (Math.pow((R)/(I+C||1), 1/pY)-1)*100 : 0;
  const payback = roi>0 ? 100/roi : 0;
  const color   = "#d35400";

  return (
    <div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Inp label="Initial Investment" value={invest} set={setInv} prefix="₹" placeholder="e.g. 100000"/>
        <Inp label="Total Returns / Revenue" value={returns} set={setRet} prefix="₹" placeholder="e.g. 150000"/>
        <Inp label="Additional Costs (optional)" value={cost} set={setCost} prefix="₹" placeholder="e.g. 5000"/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:8, alignItems:"end" }}>
          <Inp label="Investment Period" value={period} set={setPer} placeholder="e.g. 2"/>
          <div style={{ display:"flex", gap:6 }}>
            {["years","months"].map(u=>(
              <button key={u} onClick={()=>setPU(u)} style={{ background:periodUnit===u?color:"#f8f9fc", border:`1.5px solid ${periodUnit===u?color:"#eee"}`, color:periodUnit===u?"#fff":"#777", padding:"12px 12px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:periodUnit===u?700:400 }}>{u}</button>
            ))}
          </div>
        </div>
      </div>
      {I>0 && R>0 && (
        <ResultBox color={color}>
          <Row label="Total Investment"   value={fmtC(I+C)}/>
          <Row label="Total Returns"      value={fmtC(R)}/>
          <Row label="Net Gain / Loss"    value={fmtC(netGain)} color={netGain>=0?"#27ae60":"#e74c3c"} bold/>
          <Row label="ROI"                value={fmt(roi)+" %"} bold big color={roi>=0?color:"#e74c3c"}/>
          {pY>0 && <Row label="Annualised ROI"   value={fmt(annROI)+" % p.a."} color={color}/>}
          {roi>0 && <Row label="Payback Period"  value={fmt(payback,1)+" years"} color="#555"/>}
        </ResultBox>
      )}
    </div>
  );
}

// ─── 8. GST CALCULATOR ───────────────────────────────────────────────────────
export function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate,   setRate]   = useState("18");
  const [mode,   setMode]   = useState("exclusive"); // exclusive = add GST, inclusive = extract GST
  const color = "#27ae60";

  const A = Number(amount) || 0;
  const R = Number(rate) || 0;

  let base=0, gstAmt=0, total=0;
  if (mode === "exclusive") {
    base   = A;
    gstAmt = A * R / 100;
    total  = A + gstAmt;
  } else {
    total  = A;
    base   = A / (1 + R / 100);
    gstAmt = A - base;
  }

  const CGST = gstAmt / 2, SGST = gstAmt / 2;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", gap:8 }}>
        {[["exclusive","Add GST to Amount"],["inclusive","Extract GST from Total"]].map(([v,l])=>(
          <button key={v} onClick={()=>setMode(v)} style={{ flex:1, background:mode===v?color:"#f8f9fc", border:`1.5px solid ${mode===v?color:"#eee"}`, color:mode===v?"#fff":"#777", padding:"9px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.83rem", fontWeight:mode===v?700:400 }}>{l}</button>
        ))}
      </div>
      <Inp label={mode==="exclusive"?"Base Amount (before GST)":"Total Amount (including GST)"} value={amount} set={setAmount} prefix="₹" placeholder="e.g. 10000"/>
      <div>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>GST Rate</label>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
          {["5","12","18","28"].map(r=>(
            <button key={r} onClick={()=>setRate(r)} style={{ flex:1, background:rate===r?color:"#f8f9fc", border:`1.5px solid ${rate===r?color:"#eee"}`, color:rate===r?"#fff":"#777", padding:"9px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.88rem", fontWeight:rate===r?700:400 }}>{r}%</button>
          ))}
        </div>
      </div>
      {A > 0 && (
        <ResultBox color={color}>
          <Row label="Base Amount (Taxable)"  value={fmtC(base)}/>
          <Row label={`GST @ ${rate}%`}        value={fmtC(gstAmt)} color={color} bold/>
          <Row label="CGST"                    value={fmtC(CGST)}/>
          <Row label="SGST"                    value={fmtC(SGST)}/>
          <Row label="Total Amount"            value={fmtC(total)} bold big/>
        </ResultBox>
      )}
    </div>
  );
}

// ─── 9. SIP CALCULATOR ───────────────────────────────────────────────────────
export function SIPCalculator() {
  const [monthly,  setMonthly]  = useState("");
  const [rate,     setRate]     = useState("");
  const [tenure,   setTenure]   = useState("");
  const color = "#2980b9";

  const P   = Number(monthly) || 0;
  const r   = (Number(rate) || 0) / (12 * 100);
  const n   = (Number(tenure) || 0) * 12;
  const M   = r > 0 && n > 0 ? P * (Math.pow(1 + r, n) - 1) / r * (1 + r) : P * n;
  const invested = P * n;
  const gains    = M - invested;
  const xirr     = Number(rate) || 0;

  const milestones = n > 0 ? [1,2,3,5,10].filter(y=>y*12<=n).map(y=>{
    const nn = y * 12;
    const mv = r > 0 ? P * (Math.pow(1+r,nn)-1)/r*(1+r) : P*nn;
    return { y, mv, inv: P*nn };
  }) : [];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <Inp label="Monthly SIP Amount" value={monthly} set={setMonthly} prefix="₹" placeholder="e.g. 5000"/>
      <Inp label="Expected Annual Return" value={rate} set={setRate} suffix="% p.a." placeholder="e.g. 12"/>
      <Inp label="Investment Tenure" value={tenure} set={setTenure} suffix="years" placeholder="e.g. 15"/>
      {P > 0 && n > 0 && (
        <>
          <ResultBox color={color}>
            <Row label="Total Invested"     value={fmtC(invested)}/>
            <Row label="Wealth Gained"      value={fmtC(gains)} color={color} bold/>
            <Row label="Maturity Value 🎯"  value={fmtC(M)} bold big color="#27ae60"/>
            <Row label="Expected XIRR"      value={fmt(xirr)+" % p.a."}/>
          </ResultBox>
          {milestones.length > 1 && (
            <div style={{ background:"#f8f9fc", borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:"0.75rem", color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Growth Timeline</div>
              {milestones.map(m=>(
                <div key={m.y} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.82rem", padding:"5px 0", borderBottom:"1px solid #f0f0f0" }}>
                  <span style={{ color:"#666" }}>Year {m.y}</span>
                  <span style={{ fontWeight:600 }}>{fmtC(m.mv)}</span>
                  <span style={{ color:"#27ae60", fontSize:"0.76rem" }}>+{fmt(((m.mv-m.inv)/m.inv)*100)}%</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── 10. FD CALCULATOR ───────────────────────────────────────────────────────
export function FDCalculator() {
  const [principal, setP]  = useState("");
  const [rate,      setR]  = useState("");
  const [tenure,    setT]  = useState("");
  const [tenureUnit,setTU] = useState("years");
  const [compFreq,  setCF] = useState("quarterly");
  const color = "#e67e22";

  const P = Number(principal) || 0;
  const r = Number(rate) || 0;
  const t = Number(tenure) || 0;
  const tY = tenureUnit === "months" ? t / 12 : t;
  const n  = { annually:1, quarterly:4, monthly:12 }[compFreq];

  const maturity = P * Math.pow(1 + (r/100/n), n * tY);
  const interest = maturity - P;
  const effRate  = (Math.pow(1 + r/100/n, n) - 1) * 100;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <Inp label="Principal Amount" value={principal} set={setP} prefix="₹" placeholder="e.g. 100000"/>
      <Inp label="Annual Interest Rate" value={rate} set={setR} suffix="% p.a." placeholder="e.g. 7.1"/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:8, alignItems:"end" }}>
        <Inp label="Tenure" value={tenure} set={setT} placeholder={tenureUnit==="years"?"e.g. 5":"e.g. 60"}/>
        <div style={{ display:"flex", gap:6 }}>
          {[["years","Yr"],["months","Mo"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTU(v)} style={{ background:tenureUnit===v?color:"#f8f9fc", border:`1.5px solid ${tenureUnit===v?color:"#eee"}`, color:tenureUnit===v?"#fff":"#777", padding:"12px 10px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:tenureUnit===v?700:400 }}>{l}</button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Compounding Frequency</label>
        <div style={{ display:"flex", gap:7 }}>
          {[["quarterly","Quarterly"],["annually","Annual"],["monthly","Monthly"]].map(([v,l])=>(
            <button key={v} onClick={()=>setCF(v)} style={{ flex:1, background:compFreq===v?color:"#f8f9fc", border:`1.5px solid ${compFreq===v?color:"#eee"}`, color:compFreq===v?"#fff":"#777", padding:"8px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:compFreq===v?700:400 }}>{l}</button>
          ))}
        </div>
      </div>
      {P > 0 && r > 0 && t > 0 && (
        <ResultBox color={color}>
          <Row label="Principal"          value={fmtC(P)}/>
          <Row label="Interest Earned"    value={fmtC(interest)} color={color} bold/>
          <Row label="Maturity Value 🏦"  value={fmtC(maturity)} bold big color="#27ae60"/>
          <Row label="Effective Rate"     value={fmt(effRate)+" % p.a."}/>
        </ResultBox>
      )}
    </div>
  );
}

// ─── 11. PPF CALCULATOR ──────────────────────────────────────────────────────
export function PPFCalculator() {
  const [annual,  setAnnual]  = useState("");
  const [tenure,  setTenure]  = useState("15");
  const color = "#27ae60";

  const A  = Number(annual) || 0;
  const Y  = Math.max(15, Math.min(50, Number(tenure) || 15));
  const r  = 7.1 / 100; // Current PPF rate

  let balance = 0, totalInvested = 0;
  const yearData = [];
  for (let y = 1; y <= Y; y++) {
    balance = (balance + A) * (1 + r);
    totalInvested += A;
    if (y <= 5 || y === 10 || y === 15 || y === Y) {
      yearData.push({ y, balance, inv: totalInvested });
    }
  }
  const interest = balance - totalInvested;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <Inp label="Annual Investment" value={annual} set={setAnnual} prefix="₹" placeholder="e.g. 150000 (max ₹1.5L/yr)"/>
      <div>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:8 }}>Tenure (minimum 15 years)</label>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
          {["15","20","25","30"].map(t=>(
            <button key={t} onClick={()=>setTenure(t)} style={{ flex:1, background:tenure===t?color:"#f8f9fc", border:`1.5px solid ${tenure===t?color:"#eee"}`, color:tenure===t?"#fff":"#777", padding:"9px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.88rem", fontWeight:tenure===t?700:400 }}>{t} yrs</button>
          ))}
        </div>
      </div>
      <div style={{ background:"#f0faf4", borderRadius:10, padding:"10px 14px", fontSize:"0.78rem", color:"#555", border:"1px solid #d4edda" }}>
        📌 Current PPF interest rate: <strong>7.1% p.a.</strong> (tax-free, government-backed, EEE status)
      </div>
      {A > 0 && (
        <>
          <ResultBox color={color}>
            <Row label="Total Invested"     value={fmtC(totalInvested)}/>
            <Row label="Interest Earned"    value={fmtC(interest)} color={color} bold/>
            <Row label="Maturity Value 🎯"  value={fmtC(balance)} bold big color="#27ae60"/>
            <Row label="Tax Saved (30% slab)" value={fmtC(totalInvested * 0.3)}/>
          </ResultBox>
          {yearData.length > 0 && (
            <div style={{ background:"#f8f9fc", borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:"0.75rem", color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Year-wise Balance</div>
              {yearData.map(d=>(
                <div key={d.y} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.82rem", padding:"5px 0", borderBottom:"1px solid #f0f0f0" }}>
                  <span style={{ color:"#666" }}>Year {d.y}</span>
                  <span style={{ fontWeight:600 }}>{fmtC(d.balance)}</span>
                  <span style={{ color:"#27ae60", fontSize:"0.76rem" }}>+{fmt(((d.balance-d.inv)/d.inv)*100)}%</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── 12. BMI CALCULATOR ──────────────────────────────────────────────────────
export function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit,   setUnit]   = useState("metric"); // metric or imperial
  const color = "#e74c3c";

  let bmi = 0, w = Number(weight) || 0, h = Number(height) || 0;
  if (unit === "metric" && w > 0 && h > 0) {
    bmi = w / Math.pow(h / 100, 2);
  } else if (unit === "imperial" && w > 0 && h > 0) {
    bmi = (w / Math.pow(h, 2)) * 703;
  }

  const cats = [
    { label:"Severely Underweight", min:0,     max:16,   color:"#3498db" },
    { label:"Underweight",          min:16,    max:18.5, color:"#2980b9" },
    { label:"Normal weight ✅",     min:18.5,  max:25,   color:"#27ae60" },
    { label:"Overweight",           min:25,    max:30,   color:"#f39c12" },
    { label:"Obese Class I",        min:30,    max:35,   color:"#e67e22" },
    { label:"Obese Class II",       min:35,    max:40,   color:"#e74c3c" },
    { label:"Obese Class III",      min:40,    max:999,  color:"#c0392b" },
  ];
  const currentCat = cats.find(c => bmi >= c.min && bmi < c.max);
  const idealWeight = h > 0 ? (unit==="metric" ? [18.5,25].map(b=>b*Math.pow(h/100,2)) : [18.5,25].map(b=>b*Math.pow(h,2)/703)) : null;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", gap:8 }}>
        {[["metric","Metric (kg / cm)"],["imperial","Imperial (lb / in)"]].map(([v,l])=>(
          <button key={v} onClick={()=>setUnit(v)} style={{ flex:1, background:unit===v?color:"#f8f9fc", border:`1.5px solid ${unit===v?color:"#eee"}`, color:unit===v?"#fff":"#777", padding:"9px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.82rem", fontWeight:unit===v?700:400 }}>{l}</button>
        ))}
      </div>
      <Inp label={`Weight (${unit==="metric"?"kg":"lbs"})`} value={weight} set={setWeight} suffix={unit==="metric"?"kg":"lb"} placeholder={unit==="metric"?"e.g. 70":"e.g. 154"}/>
      <Inp label={`Height (${unit==="metric"?"cm":"inches"})`} value={height} set={setHeight} suffix={unit==="metric"?"cm":"in"} placeholder={unit==="metric"?"e.g. 170":"e.g. 67"}/>
      {bmi > 0 && (
        <>
          <ResultBox color={currentCat?.color || color}>
            <Row label="BMI" value={fmt(bmi, 1)} bold big color={currentCat?.color}/>
            <Row label="Category" value={currentCat?.label || "—"} bold color={currentCat?.color}/>
            {idealWeight && <Row label="Ideal Weight Range" value={`${fmt(idealWeight[0],0)}–${fmt(idealWeight[1],0)} ${unit==="metric"?"kg":"lb"}`}/>}
          </ResultBox>
          {/* BMI Scale */}
          <div style={{ background:"#f8f9fc", borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:"0.75rem", color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>BMI Scale</div>
            {cats.slice(1,-2).map(c=>(
              <div key={c.label} style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 0" }}>
                <div style={{ width:12, height:12, borderRadius:3, background:c.color, flexShrink:0 }}/>
                <span style={{ fontSize:"0.8rem", color: bmi>=c.min&&bmi<c.max?"#1a1a2e":"#aaa", fontWeight:bmi>=c.min&&bmi<c.max?700:400 }}>{c.label}</span>
                <span style={{ marginLeft:"auto", fontSize:"0.76rem", color:"#bbb" }}>{c.min}–{c.max===999?"40+":c.max}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── 13. AGE CALCULATOR ──────────────────────────────────────────────────────
export function AgeCalculator() {
  const [dob,      setDob]     = useState("");
  const [toDate,   setToDate]  = useState(new Date().toISOString().slice(0,10));
  const color = "#8e44ad";

  let years=0, months=0, days=0, totalDays=0, nextBday="", daysToNextBday=0, nextAge=0;

  if (dob) {
    const birth = new Date(dob);
    const to    = new Date(toDate);
    if (birth <= to) {
      totalDays = Math.floor((to - birth) / 86400000);
      years     = to.getFullYear() - birth.getFullYear();
      const m   = to.getMonth() - birth.getMonth();
      months    = m < 0 ? 12 + m : m;
      const d   = to.getDate() - birth.getDate();
      if (d < 0) { months--; if (months < 0) { years--; months += 12; } }
      days = d < 0 ? new Date(to.getFullYear(), to.getMonth(), 0).getDate() + d : d;

      // Next birthday
      nextAge = years + 1;
      let nextBdayDate = new Date(to.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBdayDate <= to) nextBdayDate = new Date(to.getFullYear() + 1, birth.getMonth(), birth.getDate());
      daysToNextBday = Math.ceil((nextBdayDate - to) / 86400000);
      nextBday = nextBdayDate.toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" });
    }
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <Inp label="Date of Birth" value={dob} set={setDob} type="date"/>
      <Inp label="Age As Of (default: today)" value={toDate} set={setToDate} type="date"/>
      {years > 0 || (dob && days > 0) ? (
        <>
          <ResultBox color={color}>
            <Row label="Age" value={`${years} years, ${months} months, ${days} days`} bold big color={color}/>
            <Row label="Total Days Lived" value={totalDays.toLocaleString("en-IN")}/>
            <Row label="Total Weeks"      value={Math.floor(totalDays/7).toLocaleString("en-IN")}/>
            <Row label="Total Months"     value={(years*12+months).toString()}/>
            <Row label="Total Hours"      value={(totalDays*24).toLocaleString("en-IN")}/>
          </ResultBox>
          {daysToNextBday > 0 && (
            <div style={{ background:`${color}08`, border:`1.5px solid ${color}25`, borderRadius:14, padding:"14px 18px", textAlign:"center" }}>
              <div style={{ fontSize:"1.2rem", marginBottom:6 }}>🎂</div>
              <div style={{ fontWeight:700, fontSize:"0.9rem", marginBottom:4 }}>Next Birthday — {nextBday}</div>
              <div style={{ fontSize:"0.82rem", color:"#666" }}>
                Turning <strong>{nextAge}</strong> in <strong style={{ color }}>{daysToNextBday} days</strong>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

// ─── 14. PERCENTAGE CALCULATOR ───────────────────────────────────────────────
export function PercentageCalculator() {
  const [mode, setMode] = useState("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const color = "#d35400";

  const A = Number(a) || 0, B = Number(b) || 0;
  let result = 0, label = "";

  if (mode === "of")      { result = (A / 100) * B;       label = `${A}% of ${B}`; }
  if (mode === "what")    { result = B > 0 ? (A / B) * 100 : 0; label = `${A} is what % of ${B}`; }
  if (mode === "change")  { result = A > 0 ? ((B - A) / A) * 100 : 0; label = `% change from ${A} to ${B}`; }
  if (mode === "add")     { result = A + (A * B / 100); label = `${A} + ${B}% = `; }
  if (mode === "diff")    { result = B > 0 ? Math.abs((A - B) / B) * 100 : 0; label = `% difference`; }

  const MODES = [
    ["of",    "X% of Y"],
    ["what",  "X is what % of Y"],
    ["change","% change"],
    ["add",   "Add %"],
    ["diff",  "% difference"],
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
        {MODES.map(([v,l])=>(
          <button key={v} onClick={()=>setMode(v)} style={{ background:mode===v?color:"#f8f9fc", border:`1.5px solid ${mode===v?color:"#eee"}`, color:mode===v?"#fff":"#777", padding:"7px 12px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:mode===v?700:400 }}>{l}</button>
        ))}
      </div>
      {mode==="of"     && <><Inp label="Percentage (%)" value={a} set={setA} suffix="%" placeholder="e.g. 18"/><Inp label="Of Value" value={b} set={setB} prefix="₹" placeholder="e.g. 10000"/></>}
      {mode==="what"   && <><Inp label="Value" value={a} set={setA} placeholder="e.g. 400"/><Inp label="Of Total" value={b} set={setB} placeholder="e.g. 2000"/></>}
      {mode==="change" && <><Inp label="Original Value" value={a} set={setA} placeholder="e.g. 500"/><Inp label="New Value" value={b} set={setB} placeholder="e.g. 650"/></>}
      {mode==="add"    && <><Inp label="Base Value" value={a} set={setA} placeholder="e.g. 10000"/><Inp label="Add %" value={b} set={setB} suffix="%" placeholder="e.g. 18"/></>}
      {mode==="diff"   && <><Inp label="Value A" value={a} set={setA} placeholder="e.g. 500"/><Inp label="Value B" value={b} set={setB} placeholder="e.g. 650"/></>}
      {A > 0 && B > 0 && (
        <ResultBox color={color}>
          <Row label={label} value={
            mode==="what"||mode==="change"||mode==="diff"
              ? `${fmt(result, 2)} %`
              : fmtC(result)
          } bold big color={mode==="change"&&result>0?"#27ae60":mode==="change"&&result<0?"#e74c3c":color}/>
          {mode==="change" && <Row label={result >= 0 ? "Increase" : "Decrease"} value={`${fmt(Math.abs(result),2)} %`} color={result>=0?"#27ae60":"#e74c3c"}/>}
          {mode==="add"    && <><Row label="Added Amount" value={fmtC(A * B / 100)}/><Row label="Original" value={fmtC(A)}/></>}
        </ResultBox>
      )}
    </div>
  );
}
