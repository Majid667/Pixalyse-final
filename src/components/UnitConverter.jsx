import React, { useState } from "react";

const CATEGORIES = {
  Length: {
    units: ["Millimetre","Centimetre","Metre","Kilometre","Inch","Foot","Yard","Mile"],
    // base: metre
    toBase:   [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344],
    fromBase: [1000,  100,  1, 0.001, 39.3701, 3.28084, 1.09361, 0.000621371],
  },
  Weight: {
    units: ["Milligram","Gram","Kilogram","Metric Ton","Ounce","Pound","Stone"],
    // base: kilogram
    toBase:   [0.000001, 0.001, 1, 1000, 0.0283495, 0.453592, 6.35029],
    fromBase: [1e6, 1000, 1, 0.001, 35.274, 2.20462, 0.157473],
  },
  Temperature: {
    units: ["Celsius","Fahrenheit","Kelvin"],
    // special handling below
    toBase: null,
    fromBase: null,
  },
  Area: {
    units: ["mm²","cm²","m²","km²","in²","ft²","Acre","Hectare"],
    // base: m²
    toBase:   [1e-6, 1e-4, 1, 1e6, 0.00064516, 0.092903, 4046.86, 10000],
    fromBase: [1e6, 1e4, 1, 1e-6, 1550, 10.7639, 0.000247105, 0.0001],
  },
  Speed: {
    units: ["m/s","km/h","mph","Knot","ft/s"],
    // base: m/s
    toBase:   [1, 0.277778, 0.44704, 0.514444, 0.3048],
    fromBase: [1, 3.6, 2.23694, 1.94384, 3.28084],
  },
  Data: {
    units: ["Bit","Byte","Kilobyte","Megabyte","Gigabyte","Terabyte","Petabyte"],
    // base: byte
    toBase:   [0.125, 1, 1024, 1048576, 1073741824, 1099511627776, 1.126e15],
    fromBase: [8, 1, 1/1024, 1/1048576, 1/1073741824, 1/1099511627776, 1/1.126e15],
  },
};

function convertTemp(val, from, to) {
  const v = Number(val);
  if (isNaN(v)) return "";
  let celsius;
  if (from === "Celsius")     celsius = v;
  if (from === "Fahrenheit")  celsius = (v - 32) * 5/9;
  if (from === "Kelvin")      celsius = v - 273.15;
  if (to === "Celsius")     return celsius;
  if (to === "Fahrenheit")  return celsius * 9/5 + 32;
  if (to === "Kelvin")      return celsius + 273.15;
}

function convert(val, fromIdx, toIdx, cat) {
  const v = Number(val);
  if (isNaN(v) || !val) return "";
  if (cat === "Temperature") {
    const units = CATEGORIES.Temperature.units;
    return convertTemp(v, units[fromIdx], units[toIdx]);
  }
  const { toBase, fromBase } = CATEGORIES[cat];
  const baseValue = v * toBase[fromIdx];
  return baseValue * fromBase[toIdx];
}

function fmtResult(v) {
  if (v === "" || v === undefined || v === null) return "";
  const n = Number(v);
  if (isNaN(n)) return "";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(6);
  if (n === Math.floor(n)) return n.toLocaleString("en-IN");
  return parseFloat(n.toPrecision(10)).toLocaleString("en-IN", { maximumFractionDigits: 8 });
}

export default function UnitConverter() {
  const [cat,      setCat]      = useState("Length");
  const [fromIdx,  setFromIdx]  = useState(0);
  const [toIdx,    setToIdx]    = useState(1);
  const [fromVal,  setFromVal]  = useState("");

  const catData = CATEGORIES[cat];
  const result  = convert(fromVal, fromIdx, toIdx, cat);
  const CATS    = Object.keys(CATEGORIES);

  const swap = () => {
    setFromIdx(toIdx);
    setToIdx(fromIdx);
    if (fromVal) {
      const swapped = convert(fromVal, toIdx, fromIdx, cat);
      setFromVal(fmtResult(swapped));
    }
  };

  const handleCatChange = (c) => { setCat(c); setFromIdx(0); setToIdx(1); setFromVal(""); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Category picker */}
      <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
        {CATS.map(c => (
          <button key={c} onClick={() => handleCatChange(c)}
            style={{ background:cat===c?"#16a085":"#f8f9fc", border:`1.5px solid ${cat===c?"#16a085":"#eee"}`, color:cat===c?"#fff":"#777", padding:"6px 13px", borderRadius:50, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", fontWeight:cat===c?700:400 }}>{c}</button>
        ))}
      </div>

      {/* Conversion row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:10, alignItems:"center" }}>
        <div>
          <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>From</label>
          <select value={fromIdx} onChange={e=>setFromIdx(Number(e.target.value))}
            style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"10px 14px", fontFamily:"inherit", fontSize:"0.9rem", outline:"none", marginBottom:8 }}>
            {catData.units.map((u,i) => <option key={u} value={i}>{u}</option>)}
          </select>
          <input type="number" value={fromVal} onChange={e=>setFromVal(e.target.value)}
            placeholder="Enter value…"
            style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"12px 14px", fontFamily:"inherit", fontSize:"0.97rem", outline:"none", boxSizing:"border-box" }}
            onFocus={e=>e.target.style.borderColor="#16a085"} onBlur={e=>e.target.style.borderColor="#eee"}/>
        </div>

        <button onClick={swap} style={{ background:"#f0faf8", border:"2px solid #16a085", borderRadius:50, width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"1rem", flexShrink:0, marginTop:22 }}>⇄</button>

        <div>
          <label style={{ fontSize:"0.8rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>To</label>
          <select value={toIdx} onChange={e=>setToIdx(Number(e.target.value))}
            style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:11, padding:"10px 14px", fontFamily:"inherit", fontSize:"0.9rem", outline:"none", marginBottom:8 }}>
            {catData.units.map((u,i) => <option key={u} value={i}>{u}</option>)}
          </select>
          <div style={{ background:fromVal?"linear-gradient(135deg,#e8f8f5,#d4efea)":"#f8f9fc", border:`2px solid ${fromVal?"#16a085":"#eee"}`, borderRadius:11, padding:"12px 14px", minHeight:46, display:"flex", alignItems:"center", fontSize:"0.97rem", fontWeight:700, color: fromVal?"#16a085":"#aaa" }}>
            {fromVal ? fmtResult(result) : "Result"}
          </div>
        </div>
      </div>

      {fromVal && result !== "" && (
        <div style={{ background:"#f0faf8", border:"1px solid #c3e8e0", borderRadius:12, padding:"13px 16px", fontSize:"0.88rem", color:"#555", lineHeight:1.6 }}>
          <strong>{fromVal} {catData.units[fromIdx]}</strong> = <strong style={{ color:"#16a085" }}>{fmtResult(result)} {catData.units[toIdx]}</strong>
        </div>
      )}

      {/* Quick reference table */}
      {fromVal && (
        <div style={{ background:"#f8f9fc", borderRadius:12, padding:"14px 16px" }}>
          <div style={{ fontSize:"0.74rem", color:"#aaa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>All {cat} Conversions for {fromVal} {catData.units[fromIdx]}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
            {catData.units.map((u, i) => {
              if (i === fromIdx) return null;
              const r = convert(fromVal, fromIdx, i, cat);
              if (r === "") return null;
              return (
                <div key={u} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem", padding:"4px 8px", background:"#fff", borderRadius:8, border:"1px solid #eee" }}>
                  <span style={{ color:"#888" }}>{u}</span>
                  <span style={{ fontWeight:600, color:"#1a1a2e" }}>{fmtResult(r)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
