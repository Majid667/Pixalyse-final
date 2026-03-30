import React from "react";

export default function TIcon({ type, color, size = 40 }) {
  const bg = color + "22";
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const W = ({ children }) => (
    <svg style={s} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={bg}/>
      {children}
    </svg>
  );

  // Image tools
  if (type==="compress")   return <W><path d="M20 9v8M20 17l-4-4M20 17l4-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 31v-8M20 23l-4 4M20 23l4 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="9" y1="20" x2="31" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/></W>;
  if (type==="resize")     return <W><rect x="8" y="8" width="13" height="13" rx="2" stroke={color} strokeWidth="2"/><rect x="19" y="19" width="13" height="13" rx="2" stroke={color} strokeWidth="2"/><path d="M21 8h11v11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></W>;
  if (type==="crop")       return <W><path d="M12 8v15h15" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><path d="M28 32V17H13" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></W>;
  if (type==="rotate")     return <W><path d="M28 13a11 11 0 1 0 2.5 7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><path d="M30 8v5h-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></W>;
  if (type==="watermark")  return <W><path d="M9 27l6-13 4 8 4-6 6 11" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="14" cy="14" r="2.5" fill={color}/></W>;
  if (type==="upscale")    return <W><path d="M20 29V11M20 11l-6 6M20 11l6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="11" y1="33" x2="29" y2="33" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></W>;
  if (type==="blur")       return <W><circle cx="20" cy="20" r="9" fill={color} opacity="0.12"/><circle cx="20" cy="20" r="5" fill={color} opacity="0.3"/><circle cx="20" cy="20" r="2" fill={color}/></W>;
  if (type==="rembg")      return <W><circle cx="20" cy="16" r="5" stroke={color} strokeWidth="2"/><path d="M10 31c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="convert")    return <W><path d="M12 15h16M28 15l-3-3M28 15l-3 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 25H12M12 25l3-3M12 25l3 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></W>;
  if (type==="phone")      return <W><rect x="13" y="6" width="14" height="24" rx="3" stroke={color} strokeWidth="2"/><circle cx="20" cy="27" r="1.5" fill={color}/></W>;
  if (type==="svgicon")    return <W><path d="M10 25c5-10 15-10 20 0" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><circle cx="20" cy="13" r="4" stroke={color} strokeWidth="2"/></W>;
  if (type==="pdf")        return <W><rect x="11" y="6" width="18" height="24" rx="2" stroke={color} strokeWidth="2"/><path d="M15 14h10M15 19h8M15 24h5" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="gif")        return <W><path d="M9 15h8v5H13v4h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 15v10M26 15h6v10M26 20h5" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="bulk")       return <W><rect x="7" y="14" width="14" height="14" rx="2" stroke={color} strokeWidth="2"/><rect x="19" y="12" width="14" height="14" rx="2" fill="white" stroke={color} strokeWidth="2"/><path d="M26 17v4M24 19h4" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="code")       return <W><path d="M14 14l-6 6 6 6M26 14l6 6-6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="22" y1="11" x2="18" y2="29" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="passport")   return <W><rect x="9" y="7" width="22" height="28" rx="2" stroke={color} strokeWidth="2"/><circle cx="20" cy="18" r="4.5" stroke={color} strokeWidth="1.8"/><path d="M13 29c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></W>;

  // Business tools
  if (type==="invoice")    return <W><rect x="8" y="5" width="24" height="30" rx="3" stroke={color} strokeWidth="2"/><path d="M13 13h14M13 18h14M13 23h9" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M22 28l3 2 4-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></W>;
  if (type==="profit")     return <W><path d="M8 28l7-8 5 4 7-10 5 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="30" cy="12" r="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/><path d="M8 32h24" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="salary")     return <W><rect x="9" y="10" width="22" height="16" rx="3" stroke={color} strokeWidth="2"/><circle cx="20" cy="18" r="4" stroke={color} strokeWidth="2"/><path d="M20 14v2M20 20v2M17 18h-2M23 18h2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></W>;

  // Finance tools
  if (type==="emi")        return <W><rect x="7" y="8" width="26" height="18" rx="3" stroke={color} strokeWidth="2"/><path d="M7 14h26" stroke={color} strokeWidth="1.5"/><path d="M13 20h4M20 20h7" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M11 30h18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2"/></W>;
  if (type==="loan")       return <W><rect x="6" y="16" width="28" height="18" rx="3" stroke={color} strokeWidth="2"/><path d="M14 16v-4a6 6 0 0 1 12 0v4" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="24" r="3" stroke={color} strokeWidth="2"/><path d="M20 27v3" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="interest")   return <W><circle cx="14" cy="14" r="5" stroke={color} strokeWidth="2"/><circle cx="26" cy="26" r="5" stroke={color} strokeWidth="2"/><path d="M10 30L30 10" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="roi")        return <W><path d="M8 30V20l6-4 5 5 7-9 6 4v14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 30h24" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M27 14l2-3 2 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></W>;
  if (type==="gst")        return <W><path d="M20 7l11 6v14l-11 6L9 27V13z" stroke={color} strokeWidth="2"/><path d="M17 19h3v3M20 16v3M17 16h4" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="sip")        return <W><path d="M8 30c4-12 8-12 12-6s8 6 12-6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><circle cx="20" cy="11" r="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/><path d="M8 32h24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></W>;
  if (type==="fd")         return <W><rect x="8" y="10" width="24" height="20" rx="3" stroke={color} strokeWidth="2"/><path d="M14 20h12M20 14v12" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M8 15h24" stroke={color} strokeWidth="1.5" strokeDasharray="3 2"/></W>;
  if (type==="ppf")        return <W><path d="M10 30V12a10 10 0 0 1 20 0v18" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M10 30h20" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="19" r="4" stroke={color} strokeWidth="2"/></W>;

  // Tools / Utility
  if (type==="unit")       return <W><path d="M9 12h22M9 20h22M9 28h22" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M13 8v4M20 8v4M27 8v4M13 28v4M20 28v4M27 28v4" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="word")       return <W><rect x="7" y="8" width="26" height="24" rx="3" stroke={color} strokeWidth="2"/><path d="M12 15h16M12 20h12M12 25h8" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="qr")         return <W><rect x="8" y="8" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/><rect x="22" y="8" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/><rect x="8" y="22" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/><rect x="11" y="11" width="4" height="4" fill={color}/><rect x="25" y="11" width="4" height="4" fill={color}/><rect x="11" y="25" width="4" height="4" fill={color}/><path d="M22 22h3M28 22v3M22 25v3h3M28 28h3" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="bmi")        return <W><circle cx="20" cy="12" r="5" stroke={color} strokeWidth="2"/><path d="M11 32c0-4.4 4-8 9-8s9 3.6 9 8" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M20 20v6M17 23h6" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;
  if (type==="age")        return <W><circle cx="20" cy="20" r="13" stroke={color} strokeWidth="2"/><path d="M20 11v9l5 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="11" r="1.5" fill={color}/></W>;
  if (type==="percent")    return <W><circle cx="13" cy="13" r="4" stroke={color} strokeWidth="2"/><circle cx="27" cy="27" r="4" stroke={color} strokeWidth="2"/><path d="M10 30L30 10" stroke={color} strokeWidth="2" strokeLinecap="round"/></W>;

  return <W><rect x="10" y="10" width="20" height="20" rx="4" stroke={color} strokeWidth="2"/></W>;
}
