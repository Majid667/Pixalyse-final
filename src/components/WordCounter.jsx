import React, { useState, useMemo } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    if (!text) return null;

    const words        = text.trim() ? text.trim().split(/\s+/) : [];
    const chars        = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences    = (text.match(/[.!?]+/g) || []).length || (text.trim() ? 1 : 0);
    const paragraphs   = text.trim() ? text.trim().split(/\n{2,}|\n/).filter(p => p.trim()).length : 0;
    const readingTime  = Math.ceil(words.length / 200);
    const speakingTime = Math.ceil(words.length / 130);
    const uniqueWords  = new Set(words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g,""))).size;

    // Simple Flesch Reading Ease approximation
    const syllableCount = words.reduce((acc, word) => {
      const w = word.toLowerCase().replace(/[^a-z]/g,"");
      if (!w) return acc;
      let s = w.replace(/[^aeiou]/g,"").length || 1;
      if (w.endsWith("e") && s > 1) s--;
      return acc + Math.max(1, s);
    }, 0);
    const avgWordsPerSentence = sentences > 0 ? words.length / sentences : words.length;
    const avgSyllablesPerWord = words.length > 0 ? syllableCount / words.length : 0;
    const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
    const clampedFlesch = Math.max(0, Math.min(100, fleschScore));

    const getReadability = (score) => {
      if (score >= 90) return { label:"Very Easy", color:"#27ae60" };
      if (score >= 80) return { label:"Easy", color:"#2ecc71" };
      if (score >= 70) return { label:"Fairly Easy", color:"#3498db" };
      if (score >= 60) return { label:"Standard", color:"#2980b9" };
      if (score >= 50) return { label:"Fairly Difficult", color:"#f39c12" };
      if (score >= 30) return { label:"Difficult", color:"#e67e22" };
      return { label:"Very Difficult", color:"#e74c3c" };
    };

    // Top 5 most frequent words (excluding stopwords)
    const stopWords = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","is","are","was","were","be","been","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","this","that","these","those","it","its","i","you","he","she","we","they","my","your","his","her","our","their","as","by","from","not","no","so","if","then","than","when","where","who","what","how","about","after","before","during","over","under","between","through","there"]);
    const wordFreq = {};
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g,"");
      if (clean.length > 2 && !stopWords.has(clean)) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });
    const topWords = Object.entries(wordFreq).sort((a,b)=>b[1]-a[1]).slice(0,5);

    const read = getReadability(clampedFlesch);

    return {
      words: words.length, chars, charsNoSpace, sentences, paragraphs,
      readingTime, speakingTime, uniqueWords,
      fleschScore: clampedFlesch, readability: read, topWords,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    };
  }, [text]);

  const LIMITS = { twitter:280, instagram:2200, linkedin:3000, meta:500 };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div>
        <label style={{ fontSize:"0.81rem", fontWeight:600, color:"#555", display:"block", marginBottom:5 }}>Paste or type your text here</label>
        <textarea value={text} onChange={e=>setText(e.target.value)}
          placeholder="Start typing or paste your text… Your stats update instantly."
          rows={8}
          style={{ width:"100%", background:"#f8f9fc", border:"1.5px solid #eee", borderRadius:14, padding:"14px 16px", fontFamily:"inherit", fontSize:"0.9rem", outline:"none", resize:"vertical", lineHeight:1.7, boxSizing:"border-box", color:"#1a1a2e" }}
          onFocus={e=>e.target.style.borderColor="#2980b9"} onBlur={e=>e.target.style.borderColor="#eee"}/>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:5, fontSize:"0.74rem", color:"#bbb" }}>
          <span>{stats?.chars || 0} characters</span>
          {text && <button onClick={()=>setText("")} style={{ background:"none", border:"none", color:"#e74c3c", cursor:"pointer", fontFamily:"inherit", fontSize:"0.74rem" }}>✕ Clear</button>}
        </div>
      </div>

      {stats && (
        <>
          {/* Primary stats grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10 }}>
            {[
              { label:"Words",             val:stats.words.toLocaleString("en-IN"), color:"#2980b9" },
              { label:"Characters",        val:stats.chars.toLocaleString("en-IN"), color:"#e74c3c" },
              { label:"Chars (no spaces)", val:stats.charsNoSpace.toLocaleString("en-IN"), color:"#d35400" },
              { label:"Sentences",         val:stats.sentences,                     color:"#27ae60" },
              { label:"Paragraphs",        val:stats.paragraphs,                    color:"#8e44ad" },
              { label:"Unique Words",      val:stats.uniqueWords.toLocaleString("en-IN"), color:"#16a085" },
            ].map(s=>(
              <div key={s.label} style={{ background:`${s.color}08`, border:`1.5px solid ${s.color}22`, borderRadius:14, padding:"14px 14px", textAlign:"center" }}>
                <div style={{ fontSize:"1.4rem", fontWeight:900, color:s.color, letterSpacing:"-0.02em" }}>{s.val}</div>
                <div style={{ fontSize:"0.72rem", color:"#888", marginTop:4, lineHeight:1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Reading time + readability */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div style={{ background:"#f8f9fc", borderRadius:14, padding:"16px", border:"1px solid #eee" }}>
              <div style={{ fontSize:"0.74rem", fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Time Estimate</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.87rem" }}>
                  <span style={{ color:"#666" }}>📖 Reading time</span>
                  <span style={{ fontWeight:700 }}>{stats.readingTime} min</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.87rem" }}>
                  <span style={{ color:"#666" }}>🎤 Speaking time</span>
                  <span style={{ fontWeight:700 }}>{stats.speakingTime} min</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.87rem" }}>
                  <span style={{ color:"#666" }}>📝 Avg words/sentence</span>
                  <span style={{ fontWeight:700 }}>{stats.avgWordsPerSentence}</span>
                </div>
              </div>
            </div>
            <div style={{ background:"#f8f9fc", borderRadius:14, padding:"16px", border:"1px solid #eee" }}>
              <div style={{ fontSize:"0.74rem", fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Readability Score</div>
              <div style={{ fontSize:"1.6rem", fontWeight:900, color:stats.readability.color }}>{Math.round(stats.fleschScore)}</div>
              <div style={{ fontWeight:700, fontSize:"0.88rem", color:stats.readability.color, marginTop:2 }}>{stats.readability.label}</div>
              <div style={{ fontSize:"0.72rem", color:"#aaa", marginTop:4 }}>Flesch Reading Ease</div>
            </div>
          </div>

          {/* Platform limits */}
          <div style={{ background:"#f8f9fc", borderRadius:14, padding:"14px 16px", border:"1px solid #eee" }}>
            <div style={{ fontSize:"0.74rem", fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Character Limits</div>
            {Object.entries(LIMITS).map(([platform, limit]) => {
              const pct = Math.min(100, (stats.chars / limit) * 100);
              const over = stats.chars > limit;
              return (
                <div key={platform} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.82rem", marginBottom:4 }}>
                    <span style={{ color:"#666", textTransform:"capitalize" }}>{platform}</span>
                    <span style={{ fontWeight:700, color:over?"#e74c3c":"#27ae60" }}>
                      {stats.chars} / {limit} {over?"⚠️ over":"✓"}
                    </span>
                  </div>
                  <div style={{ height:6, background:"#eee", borderRadius:50, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:over?"#e74c3c":"#27ae60", borderRadius:50, transition:"width 0.3s" }}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top keywords */}
          {stats.topWords.length > 0 && (
            <div style={{ background:"#f8f9fc", borderRadius:14, padding:"14px 16px", border:"1px solid #eee" }}>
              <div style={{ fontSize:"0.74rem", fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Top Keywords</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {stats.topWords.map(([word, count]) => (
                  <div key={word} style={{ background:"#fff", border:"1.5px solid #eee", borderRadius:50, padding:"5px 14px", fontSize:"0.82rem", display:"flex", gap:7, alignItems:"center" }}>
                    <span style={{ fontWeight:700, color:"#1a1a2e" }}>{word}</span>
                    <span style={{ background:"#2980b9", color:"#fff", borderRadius:50, padding:"1px 7px", fontSize:"0.7rem", fontWeight:700 }}>{count}x</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
