"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Search, History, ArrowLeft, LogOut, Check, X, RefreshCw, Eye, EyeOff, AlertCircle } from "lucide-react";
import { C } from "../../lib/constants";
import { MOCK_MEMBERS, PARTNER_ACCOUNTS } from "../../lib/data";

export default function ScannerPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [partner, setPartner]   = useState(null);
  const [view, setView]         = useState("scan");   // scan|scanning|result|history|manual
  const [result, setResult]     = useState(null);
  const [log, setLog]           = useState([
    { name: "Alex Brathwaite", id: "HNI-2026-4471", time: "09:14", ok: true },
    { name: "Sarah Williams",  id: "SAGICOR-042",   time: "10:02", ok: true },
    { name: "Unknown",         id: "HNI-2025-9999", time: "11:30", ok: false },
  ]);

  // Login
  const [id, setId]     = useState("");
  const [pin, setPin]   = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [logging, setLogging] = useState(false);

  const [manualId, setManualId] = useState("");

  const handleLogin = () => {
    if (!id || !pin) { setLoginErr("Enter your Partner ID and PIN."); return; }
    setLoginErr(""); setLogging(true);
    setTimeout(() => {
      const acc = PARTNER_ACCOUNTS.find(a => a.id === id.trim() && a.pin === pin.trim());
      if (acc) { setPartner(acc); setLoggedIn(true); }
      else { setLoginErr("Partner ID or PIN not recognised. Try CRW-2026 / 1234."); }
      setLogging(false);
    }, 1400);
  };

  const simulate = (member) => {
    setView("scanning");
    setTimeout(() => { setResult(member); setView("result"); }, 1800);
  };

  const tryManual = () => {
    const m = MOCK_MEMBERS.find(m => m.id.toLowerCase() === manualId.toLowerCase().trim());
    simulate(m || { name: "Unknown", id: manualId, valid: false });
  };

  const logRedemption = () => {
    if (!result) return;
    setLog(l => [{ name: result.name, id: result.id, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), ok: !!result.valid }, ...l]);
    setResult(null); setView("history");
  };

  const s = { minHeight: "100vh", backgroundColor: C.cream, fontFamily: "'Manrope',sans-serif", maxWidth: 480, margin: "0 auto" };

  if (!loggedIn) return (
    <div style={{ ...s, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px" }}>
      <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 36, marginBottom: 36 }} />
      <p className="eyebrow" style={{ color: C.coral, marginBottom: 10 }}>Partner Portal</p>
      <h2 className="display" style={{ fontSize: 32, color: C.ink, marginBottom: 10 }}>Scanner<br /><em style={{ color: C.teal }}>sign in.</em></h2>
      <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.65, marginBottom: 32 }}>Use your HNI Partner ID and PIN to access the member verification scanner.</p>

      <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft, display: "block", marginBottom: 6 }}>Partner ID</label>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="e.g. CRW-2026" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, fontSize: 15, color: C.ink, outline: "none", marginBottom: 16, boxSizing: "border-box" }} />

      <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft, display: "block", marginBottom: 6 }}>PIN</label>
      <div style={{ position: "relative", marginBottom: 8 }}>
        <input type={showPin ? "text" : "password"} value={pin} onChange={e => setPin(e.target.value)} placeholder="••••" style={{ width: "100%", padding: "14px 48px 14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, fontSize: 15, color: C.ink, outline: "none", boxSizing: "border-box" }} />
        <button onClick={() => setShowPin(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.inkSoft }}>
          {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {loginErr && <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderRadius: 12, backgroundColor: "#fef2f2", marginBottom: 16 }}><AlertCircle size={14} style={{ color: C.coral, flexShrink: 0, marginTop: 1 }} /><span style={{ fontSize: 13, color: "#b91c1c" }}>{loginErr}</span></div>}

      <button onClick={handleLogin} style={{ width: "100%", padding: "16px", borderRadius: 100, backgroundColor: logging ? C.inkSoft : C.ink, color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", marginTop: 8 }}>
        {logging ? "Signing in…" : "Sign in to scanner"}
      </button>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: C.inkSoft }}>Demo: ID CRW-2026 · PIN 1234</p>
    </div>
  );

  if (view === "scanning") return (
    <div style={{ ...s, backgroundColor: C.ink, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ width: 180, height: 180, position: "relative", marginBottom: 32 }}>
        <div style={{ position: "absolute", inset: 0, border: `2px solid ${C.teal}`, borderRadius: 16, opacity: 0.4 }} />
        {[[0,0,"left","top"],[0,"auto","left","bottom"],["auto",0,"right","top"],["auto","auto","right","bottom"]].map(([t,b,lr,tb], i) => (
          <div key={i} style={{ position: "absolute", width: 28, height: 28, top: t !== "auto" ? 0 : undefined, bottom: b !== "auto" ? 0 : undefined, [lr]: 0, borderTop: tb === "top" ? `3px solid ${C.teal}` : undefined, borderBottom: tb === "bottom" ? `3px solid ${C.teal}` : undefined, borderLeft: lr === "left" ? `3px solid ${C.teal}` : undefined, borderRight: lr === "right" ? `3px solid ${C.teal}` : undefined }} />
        ))}
        <div style={{ position: "absolute", left: 4, right: 4, height: 2, background: `linear-gradient(90deg,transparent,${C.teal},transparent)`, top: "50%", animation: "scanLine 2s ease-in-out infinite" }} />
      </div>
      <h3 className="display" style={{ fontSize: 22, color: C.cream, marginBottom: 8 }}>Reading card…</h3>
      <p style={{ fontSize: 13, color: "rgba(251,247,241,.55)" }}>Hold still</p>
    </div>
  );

  if (view === "result" && result) {
    const valid = result.valid !== false;
    return (
      <div style={{ ...s, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "40px 28px 28px", background: valid ? `linear-gradient(135deg,${C.green},#16a34a)` : `linear-gradient(135deg,${C.coral},#d63a33)`, color: "white", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            {valid ? <CheckCircle2 size={40} color="white" /> : <XCircle size={40} color="white" />}
          </div>
          <h2 className="display" style={{ fontSize: 30, marginBottom: 6 }}>{valid ? "Valid Member" : "Card Invalid"}</h2>
          <p style={{ opacity: 0.9 }}>{valid ? `Apply ${partner.discount}% discount` : "Do not apply discount"}</p>
        </div>
        <div style={{ flex: 1, padding: "24px 24px 40px" }}>
          <div style={{ backgroundColor: "white", borderRadius: 18, padding: "16px 18px", marginBottom: 14, border: `1px solid ${valid ? "#bbf7d0" : "#fecaca"}`, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: valid ? C.tealLight : "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontFamily: "'Fraunces',serif", fontWeight: 700, color: valid ? C.teal : C.coral, flexShrink: 0 }}>
              {result.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.ink }}>{result.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: C.inkSoft }}>{result.id}</div>
              {result.source && <div style={{ fontSize: 12, color: C.inkSoft }}>via {result.source} · expires {result.expires}</div>}
            </div>
          </div>
          {valid && (
            <div style={{ padding: "16px 18px", borderRadius: 14, backgroundColor: C.tealLight, border: `1px solid ${C.teal}30`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Discount to apply</span>
              <span className="display" style={{ fontSize: 32, fontWeight: 700, color: C.teal }}>{partner.discount}%</span>
            </div>
          )}
          <button onClick={logRedemption} style={{ width: "100%", padding: "16px", borderRadius: 100, backgroundColor: valid ? C.green : C.coral, color: "white", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Check size={17} /> {valid ? "Log this redemption" : "Dismiss"}
          </button>
          <button onClick={() => setView("scan")} style={{ width: "100%", padding: "14px", borderRadius: 100, backgroundColor: "white", color: C.ink, fontWeight: 700, fontSize: 15, border: `1.5px solid ${C.creamDark}`, cursor: "pointer" }}>
            Scan another card
          </button>
        </div>
      </div>
    );
  }

  if (view === "history") return (
    <div style={{ ...s, padding: "24px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 className="display" style={{ fontSize: 24, color: C.ink }}>Today's log</h2>
        <button onClick={() => setView("scan")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: C.teal, background: "none", border: "none", cursor: "pointer" }}>
          ← Back
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[{ n: log.filter(r => r.ok).length, l: "Valid scans" }, { n: log.filter(r => !r.ok).length, l: "Rejected" }].map(s => (
          <div key={s.l} style={{ backgroundColor: "white", borderRadius: 16, padding: "16px", border: `1px solid ${C.creamDark}` }}>
            <div className="display" style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>{s.n}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: C.inkSoft, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {log.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 16, backgroundColor: "white", border: `1px solid ${C.creamDark}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: r.ok ? "#dcfce7" : "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {r.ok ? <Check size={16} style={{ color: C.green }} /> : <X size={16} style={{ color: C.coral }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.inkSoft }}>{r.id}</div>
            </div>
            <div style={{ fontSize: 11, color: C.inkSoft, flexShrink: 0 }}>{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (view === "manual") return (
    <div style={{ ...s, padding: "24px 24px 40px" }}>
      <button onClick={() => setView("scan")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.inkSoft, fontSize: 13, background: "none", border: "none", cursor: "pointer", marginBottom: 32 }}>
        <ArrowLeft size={15} /> Back
      </button>
      <h2 className="display" style={{ fontSize: 28, color: C.ink, marginBottom: 8 }}>Enter ID<br /><em style={{ color: C.teal }}>manually.</em></h2>
      <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.65, marginBottom: 24 }}>Type the member's ID exactly as shown on their card or app screen.</p>
      <input value={manualId} onChange={e => setManualId(e.target.value)} placeholder="e.g. SAGICOR-042" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, fontSize: 15, color: C.ink, outline: "none", marginBottom: 24, boxSizing: "border-box" }} />
      <button onClick={tryManual} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>
        <Search size={16} /> Look up member
      </button>
    </div>
  );

  // Main scan screen
  return (
    <div style={{ ...s, padding: "24px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 28 }} />
        <button onClick={() => { setLoggedIn(false); setPartner(null); }} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: C.inkSoft, fontSize: 12 }}>
          <LogOut size={13} /> Sign out
        </button>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 20 }}>{partner.name} · {partner.discount}% member discount</p>

      {/* Scanner viewfinder */}
      <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "1/1", backgroundColor: C.ink, position: "relative", marginBottom: 16 }}>
        {[[0,0,"left","top"],[0,"auto","left","bottom"],["auto",0,"right","top"],["auto","auto","right","bottom"]].map(([t,b,lr,tb], i) => (
          <div key={i} style={{ position: "absolute", width: 30, height: 30, zIndex: 2, top: t !== "auto" ? 20 : undefined, bottom: b !== "auto" ? 20 : undefined, [lr]: 20, borderTop: tb === "top" ? `3px solid ${C.teal}` : undefined, borderBottom: tb === "bottom" ? `3px solid ${C.teal}` : undefined, borderLeft: lr === "left" ? `3px solid ${C.teal}` : undefined, borderRight: lr === "right" ? `3px solid ${C.teal}` : undefined }} />
        ))}
        <div style={{ position: "absolute", left: 20, right: 20, height: 2, background: `linear-gradient(90deg,transparent,${C.teal}88,transparent)`, top: "35%", zIndex: 2, animation: "scanLine 3s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, color: "rgba(251,247,241,.4)" }}>Tap a card below to simulate a scan</div>
        </div>
      </div>

      <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft, marginBottom: 8 }}>Simulate a scan</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {MOCK_MEMBERS.slice(0, 3).map((m, i) => (
          <button key={i} onClick={() => simulate(m)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 14, backgroundColor: "white", border: `1px solid ${C.creamDark}`, cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: m.valid ? C.green : C.coral, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.inkSoft }}>{m.id}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 800, color: m.valid ? C.green : C.coral }}>{m.valid ? "VALID" : "EXPIRED"}</span>
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <button onClick={() => setView("manual")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 14, backgroundColor: "white", border: `1px solid ${C.creamDark}`, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
          <Search size={14} /> Manual entry
        </button>
        <button onClick={() => setView("history")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 14, backgroundColor: "white", border: `1px solid ${C.creamDark}`, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
          <History size={14} /> Today's log
        </button>
      </div>
    </div>
  );
}
