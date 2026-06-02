"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowLeft, ArrowUpRight, Home, CreditCard, MapPin, User,
  Building2, Shield, Check, X, ChevronRight, TrendingUp, Navigation,
  Zap, LogOut, Eye, EyeOff, AlertCircle, CheckCircle2, XCircle, Loader2,
  Bell, Settings, Heart, Clock, Award, Gift, Share2,
} from "lucide-react";
import { C, ORGS, COUNTRIES, isValidOrgNumber } from "../../lib/constants";
import { PARTNERS, MOCK_MEMBERS } from "../../lib/data";

// PWA Install prompt component
function InstallBanner({ onDismiss }) {
  return (
    <div style={{ position: "fixed", bottom: 80, left: 16, right: 16, zIndex: 100, backgroundColor: C.ink, borderRadius: 20, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 16px 40px rgba(15,30,46,.3)" }}>
      <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 36, filter: "brightness(0) invert(1)", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Add to Home Screen</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)", marginTop: 2 }}>Access your card anytime, even offline</div>
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", padding: 4 }}><X size={16} /></button>
    </div>
  );
}

// ── LOGIN SCREENS ────────────────────────────────────────────────────────────
function Splash({ onContinue }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center", backgroundColor: C.cream }}>
      <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 48, marginBottom: 40 }} />
      <div style={{ position: "relative", marginBottom: 44 }}>
        <div style={{ width: 180, height: 110, margin: "0 auto", borderRadius: 18, background: `linear-gradient(135deg,${C.teal} 0%,${C.tealDark} 60%,${C.ink} 100%)`, transform: "rotate(-5deg)", boxShadow: "0 20px 40px rgba(22,183,204,.3)", padding: "16px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%)" }} />
          <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: C.teal }}>Member Card</div>
            <div className="display" style={{ fontSize: 24, color: "white", fontWeight: 700 }}>HNI</div>
            <div style={{ height: 12, width: 32, borderRadius: 3, background: "linear-gradient(135deg,#f0d28a,#b8901a)" }} />
          </div>
        </div>
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-10px) rotate(5deg)", width: 180, height: 110, borderRadius: 18, background: `${C.coral}25`, border: `1px solid ${C.coral}30` }} />
      </div>
      <h1 className="display" style={{ fontSize: 40, lineHeight: 1.1, color: C.ink, marginBottom: 14 }}>
        Live well.<br /><em style={{ color: C.teal }}>Spend less.</em>
      </h1>
      <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.65, maxWidth: 300, marginBottom: 44 }}>
        Your digital HNI card, partner map, and savings tracker — always in your pocket.
      </p>
      <button onClick={onContinue} style={{ width: "100%", maxWidth: 360, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
        Get started <ArrowRight size={17} />
      </button>
      <p style={{ marginTop: 16, fontSize: 13, color: C.inkSoft }}>
        Already a member? <button onClick={onContinue} style={{ color: C.teal, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Sign in</button>
      </p>
    </div>
  );
}

function ChoosePath({ onDirect, onOrg, onBack }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.cream, padding: "24px 24px 40px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: C.inkSoft, fontSize: 13, background: "none", border: "none", cursor: "pointer", marginBottom: 36 }}>
        <ArrowLeft size={15} /> Back
      </button>
      <p className="eyebrow" style={{ color: C.coral, marginBottom: 10 }}>Access Type</p>
      <h2 className="display" style={{ fontSize: 34, lineHeight: 1.1, color: C.ink, marginBottom: 10 }}>
        How do you<br /><em style={{ color: C.teal }}>access HNI?</em>
      </h2>
      <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.65, marginBottom: 36 }}>
        Choose how your membership is managed. Both paths give you the same full experience.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
        <button onClick={onDirect} style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 20px", borderRadius: 20, backgroundColor: "white", border: `1.5px solid ${C.creamDark}`, cursor: "pointer", textAlign: "left" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: C.creamDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <User size={22} style={{ color: C.teal }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.ink }}>I pay directly</div>
            <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 3 }}>I signed up and pay for HNI myself</div>
          </div>
          <ChevronRight size={16} style={{ color: C.inkLight }} />
        </button>
        <button onClick={onOrg} style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 20px", borderRadius: 20, background: `linear-gradient(135deg,${C.ink} 0%,#1a3147 100%)`, border: "none", cursor: "pointer", textAlign: "left", boxShadow: "0 10px 28px rgba(15,30,46,.2)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(22,183,204,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Building2 size={22} style={{ color: C.teal }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "white" }}>My organisation covers me</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", marginTop: 3 }}>Employer, insurer, or partner org</div>
          </div>
          <ChevronRight size={16} style={{ color: "rgba(255,255,255,.5)" }} />
        </button>
      </div>
      <div style={{ marginTop: 28, padding: "14px 16px", borderRadius: 14, backgroundColor: C.creamDark, display: "flex", gap: 10, maxWidth: 480 }}>
        <Shield size={16} style={{ color: C.teal, flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.55 }}>We never share which organisation you belong to with our partners. Your data stays between you and HNI.</p>
      </div>
    </div>
  );
}

function DirectLogin({ onSuccess, onBack }) {
  const [email, setEmail]   = useState("");
  const [pw, setPw]         = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const submit = () => {
    if (!email || pw.length < 6) { setError("Enter a valid email and password (min 6 characters)."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(MOCK_MEMBERS[0]); }, 1600);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.cream, padding: "24px 24px 40px", maxWidth: 480, margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: C.inkSoft, fontSize: 13, background: "none", border: "none", cursor: "pointer", marginBottom: 36 }}>
        <ArrowLeft size={15} /> Back
      </button>
      <p className="eyebrow" style={{ color: C.coral, marginBottom: 10 }}>Sign In</p>
      <h2 className="display" style={{ fontSize: 34, lineHeight: 1.1, color: C.ink, marginBottom: 32 }}>
        Welcome<br /><em style={{ color: C.teal }}>back.</em>
      </h2>
      <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft }}>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, backgroundColor: "white", fontSize: 15, color: C.ink, outline: "none", marginBottom: 16, boxSizing: "border-box" }} />
      <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft }}>Password</label>
      <div style={{ position: "relative", marginBottom: 8 }}>
        <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "14px 48px 14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, backgroundColor: "white", fontSize: 15, color: C.ink, outline: "none", boxSizing: "border-box" }} />
        <button onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.inkSoft }}>
          {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <div style={{ textAlign: "right", marginBottom: 24 }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.teal, fontWeight: 600 }}>Forgot password?</button>
      </div>
      {error && <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderRadius: 12, backgroundColor: "#fef2f2", marginBottom: 16 }}><AlertCircle size={15} style={{ color: C.coral, flexShrink: 0, marginTop: 1 }} /><span style={{ fontSize: 13, color: "#b91c1c" }}>{error}</span></div>}
      <button onClick={submit} disabled={loading} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 100, backgroundColor: loading ? C.inkSoft : C.ink, color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
        {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in…</> : "Sign in"}
      </button>
    </div>
  );
}

function OrgLogin({ onSuccess, onBack }) {
  const [step, setStep]       = useState("form");
  const [orgId, setOrgId]     = useState("");
  const [num, setNum]         = useState("");
  const [error, setError]     = useState("");

  const verify = () => {
    if (!orgId) { setError("Please select your organisation."); return; }
    if (!num.trim()) { setError("Please enter your membership number."); return; }
    setError(""); setStep("verifying");
    setTimeout(() => {
      if (isValidOrgNumber(orgId, num.trim())) {
        const org = ORGS.find(o => o.id === orgId);
        setStep("success");
        setTimeout(() => onSuccess({ name: "Sarah Williams", id: `${orgId}-${num.trim().padStart(3,"0")}`, source: org.label, org: orgId, valid: true, expires: "Dec 2026", saved: 0, visits: 0 }), 1200);
      } else { setStep("error"); }
    }, 2200);
  };

  if (step === "verifying") return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", backgroundColor: C.cream }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: C.creamDark, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, position: "relative" }}>
        <Shield size={34} style={{ color: C.teal }} />
        <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `3px solid ${C.teal}`, borderTopColor: "transparent", animation: "spin 1s linear infinite" }} />
      </div>
      <h3 className="display" style={{ fontSize: 26, color: C.ink, marginBottom: 8 }}>Verifying your membership</h3>
      <p style={{ fontSize: 14, color: C.inkSoft }}>Checking with {ORGS.find(o => o.id === orgId)?.label}…</p>
    </div>
  );

  if (step === "success") return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", backgroundColor: C.cream }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <CheckCircle2 size={42} style={{ color: C.green }} />
      </div>
      <h3 className="display" style={{ fontSize: 26, color: C.ink, marginBottom: 8 }}>You're verified</h3>
      <p style={{ fontSize: 14, color: C.inkSoft }}>Taking you to your card…</p>
    </div>
  );

  if (step === "error") return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center", backgroundColor: C.cream }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <XCircle size={42} style={{ color: C.coral }} />
      </div>
      <h3 className="display" style={{ fontSize: 26, color: C.ink, marginBottom: 8 }}>Number not found</h3>
      <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.65, marginBottom: 32, maxWidth: 300 }}>We couldn't find that number in your organisation's registry. Double-check it or contact your benefits team.</p>
      <button onClick={() => setStep("form")} style={{ width: "100%", maxWidth: 320, padding: "15px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>Try again</button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.cream, padding: "24px 24px 40px", maxWidth: 480, margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: C.inkSoft, fontSize: 13, background: "none", border: "none", cursor: "pointer", marginBottom: 36 }}>
        <ArrowLeft size={15} /> Back
      </button>
      <p className="eyebrow" style={{ color: C.coral, marginBottom: 10 }}>Organisation Access</p>
      <h2 className="display" style={{ fontSize: 34, lineHeight: 1.1, color: C.ink, marginBottom: 10 }}>
        Verify your<br /><em style={{ color: C.teal }}>membership.</em>
      </h2>
      <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.65, marginBottom: 32 }}>Select your organisation and enter the member number they provided.</p>

      <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft }}>Organisation</label>
      <select value={orgId} onChange={e => setOrgId(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, backgroundColor: "white", fontSize: 15, color: orgId ? C.ink : C.inkLight, outline: "none", marginBottom: 16, appearance: "none", boxSizing: "border-box" }}>
        <option value="">Select your organisation…</option>
        {ORGS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>

      <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.inkSoft }}>Membership Number</label>
      <input value={num} onChange={e => setNum(e.target.value)} placeholder="e.g. 042" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, backgroundColor: "white", fontSize: 15, color: C.ink, outline: "none", marginBottom: 8, boxSizing: "border-box" }} />
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: error ? 0 : 24, lineHeight: 1.55 }}>This is the number your employer or insurer gave you when they enrolled you.</p>

      {error && <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderRadius: 12, backgroundColor: "#fef2f2", margin: "12px 0 16px" }}><AlertCircle size={15} style={{ color: C.coral, flexShrink: 0, marginTop: 1 }} /><span style={{ fontSize: 13, color: "#b91c1c" }}>{error}</span></div>}

      <button onClick={verify} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", marginTop: 8 }}>
        <Shield size={16} /> Verify my membership
      </button>
    </div>
  );
}

// ── MEMBER APP SCREENS ───────────────────────────────────────────────────────
function HomeTab({ member, onCard, onMap }) {
  const [savings, setSavings] = useState(0);
  useEffect(() => {
    const target = member.saved;
    if (!target) return;
    let s = 0;
    const iv = setInterval(() => {
      s = Math.min(s + Math.ceil(target / 35), target);
      setSavings(s);
      if (s >= target) clearInterval(iv);
    }, 28);
    return () => clearInterval(iv);
  }, [member.saved]);

  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 14, color: C.inkSoft }}>Good morning,</p>
          <h2 className="display" style={{ fontSize: 30, color: C.ink }}>{member.name.split(" ")[0]} ☀️</h2>
        </div>
        <button style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: C.creamDark, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Bell size={19} style={{ color: C.ink }} />
          <span style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", backgroundColor: C.coral, border: "2px solid white" }} />
        </button>
      </div>

      {/* Savings card */}
      <div style={{ borderRadius: 24, padding: "22px", marginBottom: 14, background: `linear-gradient(135deg,${C.ink} 0%,#1a3147 100%)`, color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -24, top: -24, width: 100, height: 100, borderRadius: "50%", backgroundColor: C.teal, opacity: 0.15 }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: C.teal, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
            <TrendingUp size={12} /> Total saved this year
          </div>
          <div className="display" style={{ fontSize: 52, fontWeight: 700 }}>${savings}</div>
          {member.saved > 0 && <p style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>That's ${member.saved - 99} more than your membership cost.</p>}
          <div style={{ display: "flex", marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.12)" }}>
            {[{ v: member.visits, l: "Visits" }, { v: member.source === "Direct" ? "Direct" : member.source, l: "Access" }].map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 18, fontWeight: 700 }}>{s.v}</div>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card shortcut */}
      <button onClick={onCard} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 20, backgroundColor: "white", border: `1.5px solid ${C.creamDark}`, cursor: "pointer", textAlign: "left", marginBottom: 20 }}>
        <div style={{ width: 52, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${C.teal},${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CreditCard size={18} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>Show my card</div>
          <div style={{ fontSize: 12, color: C.inkSoft }}>Tap to open your QR code</div>
        </div>
        <ChevronRight size={16} style={{ color: C.inkSoft }} />
      </button>

      {/* Org badge */}
      {member.source !== "Direct" && (
        <div style={{ display: "flex", gap: 10, padding: "14px 16px", borderRadius: 16, background: `${C.teal}12`, border: `1px solid ${C.teal}25`, marginBottom: 20 }}>
          <Building2 size={16} style={{ color: C.teal, flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Covered by {member.source}</div>
            <div style={{ fontSize: 12, color: C.inkSoft }}>Organisation membership · Valid until {member.expires}</div>
          </div>
        </div>
      )}

      {/* Nearby */}
      <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="display" style={{ fontSize: 20, color: C.ink }}>Near you</h3>
        <button onClick={onMap} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: C.teal, background: "none", border: "none", cursor: "pointer" }}>
          View map <ArrowUpRight size={13} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PARTNERS.slice(0, 3).map(p => (
          <a key={p.id} href={`/partners/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 18, backgroundColor: "white", border: `1px solid ${C.creamDark}`, textDecoration: "none" }}>
            <img src={p.cover} alt={p.name} style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.teal }}>{p.category}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.inkSoft }}><Navigation size={10} />{p.city}</div>
            </div>
            <div style={{ padding: "5px 10px", borderRadius: 100, backgroundColor: C.coral, color: "white", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{p.discount}%</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function CardTab({ member }) {
  return (
    <div style={{ background: `linear-gradient(180deg,${C.ink} 0%,#0a1620 100%)`, minHeight: "100%", padding: "8px 20px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -60, top: 40, width: 220, height: 220, borderRadius: "50%", backgroundColor: C.teal, opacity: 0.1, filter: "blur(40px)" }} />
      <h2 className="display" style={{ fontSize: 22, color: C.cream, marginBottom: 24, position: "relative" }}>Your Card</h2>

      <div style={{ aspectRatio: "1.586/1", borderRadius: 24, padding: "22px 24px", background: `linear-gradient(135deg,${C.teal} 0%,${C.tealDark} 60%,${C.ink} 100%)`, position: "relative", overflow: "hidden", boxShadow: "0 24px 48px rgba(0,0,0,.4)", marginBottom: 16 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.85 }}>Member Card</span>
            <div style={{ height: 26, width: 34, borderRadius: 5, background: "linear-gradient(135deg,#f0d28a,#b8901a)" }} />
          </div>
          <div>
            <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>{member.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.7, marginTop: 2 }}>{member.id}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.55 }}>Valid until</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{member.expires}</div>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", opacity: 0.8 }}>{member.source}</span>
          </div>
        </div>
      </div>

      {/* QR code */}
      <div style={{ backgroundColor: "white", borderRadius: 20, padding: "22px", textAlign: "center" }}>
        <p className="display" style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>Show at checkout</p>
        <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 16 }}>The partner scans this to verify your membership</p>
        <div style={{ width: 128, height: 128, margin: "0 auto", borderRadius: 12, backgroundColor: C.ink, display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "1px", padding: 8 }}>
          {Array.from({ length: 144 }).map((_, i) => {
            const c = [0,1,2,11,10,9,12,23,13,22,132,133,134,143,142,141,120,121,130,131].includes(i);
            const r = (i * 17 + 11) % 3 === 0;
            return <div key={i} style={{ backgroundColor: c || r ? "white" : "transparent" }} />;
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 14, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.teal }}>
          <Zap size={11} /> Refreshes every 60 seconds
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
        {[{ icon: Share2, label: "Share card" }, { icon: Gift, label: "Refer a friend" }].map(({ icon: Icon, label }) => (
          <button key={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", borderRadius: 16, backgroundColor: "rgba(251,247,241,.1)", color: C.cream, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MapTab() {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <h2 className="display" style={{ fontSize: 24, color: C.ink, marginBottom: 16 }}>Partners near you</h2>
      {/* Map placeholder */}
      <div style={{ height: 240, borderRadius: 24, overflow: "hidden", marginBottom: 16, position: "relative", background: "linear-gradient(135deg,#e8f4f6 0%,#d4ebee 100%)" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }}>
          <defs><pattern id="g" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke={C.teal} strokeWidth=".5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, width: 20, height: 20, borderRadius: "50%", backgroundColor: C.coral, opacity: 0.3 }} className="animate-ping" />
            <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: C.coral, border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,.2)" }} />
          </div>
        </div>
        {PARTNERS.slice(0, 5).map((p, i) => (
          <div key={p.id} style={{ position: "absolute", left: `${20 + i * 15}%`, top: `${25 + (i % 3) * 22}%` }}>
            <div style={{ padding: "4px 10px", borderRadius: 100, backgroundColor: C.teal, color: "white", fontSize: 10, fontWeight: 800, boxShadow: "0 2px 8px rgba(0,0,0,.2)" }}>{p.discount}%</div>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 12, right: 12 }}>
          <button style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.12)" }}>
            <Navigation size={16} style={{ color: C.teal }} />
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PARTNERS.slice(0, 4).map(p => (
          <a key={p.id} href={`/partners/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 18, backgroundColor: "white", border: `1px solid ${C.creamDark}`, textDecoration: "none" }}>
            <img src={p.cover} alt={p.name} style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.teal }}>{p.category}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.inkSoft }}><MapPin size={10} />{p.city}</div>
            </div>
            <div style={{ padding: "5px 10px", borderRadius: 100, backgroundColor: C.coral, color: "white", fontSize: 11, fontWeight: 800 }}>{p.discount}%</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({ member, onLogout }) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 className="display" style={{ fontSize: 24, color: C.ink }}>Profile</h2>
        <button style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: C.creamDark, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Settings size={17} style={{ color: C.ink }} />
        </button>
      </div>
      <div style={{ backgroundColor: "white", borderRadius: 22, padding: "24px", textAlign: "center", border: `1px solid ${C.creamDark}`, marginBottom: 14 }}>
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(135deg,${C.teal},${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 26, fontFamily: "'Fraunces',serif", fontWeight: 700, color: "white" }}>
          {member.name[0]}
        </div>
        <div className="display" style={{ fontSize: 20, color: C.ink }}>{member.name}</div>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: C.inkSoft, marginTop: 4 }}>{member.id}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "5px 14px", borderRadius: 100, backgroundColor: C.tealLight, border: `1px solid ${C.teal}30` }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.green }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: C.tealDark }}>Active Member</span>
        </div>
      </div>
      {member.source !== "Direct" && (
        <div style={{ padding: "14px 16px", borderRadius: 16, background: `${C.teal}10`, border: `1px solid ${C.teal}22`, marginBottom: 14, display: "flex", gap: 10 }}>
          <Building2 size={16} style={{ color: C.teal, flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Organisation: {member.source}</div>
            <div style={{ fontSize: 12, color: C.inkSoft }}>Membership valid until {member.expires}</div>
          </div>
        </div>
      )}
      <div style={{ backgroundColor: "white", borderRadius: 22, border: `1px solid ${C.creamDark}`, overflow: "hidden", marginBottom: 14 }}>
        {[{ icon: Heart, label: "Favourites" }, { icon: Clock, label: "Visit history" }, { icon: Award, label: "Goals & intentions" }, { icon: Gift, label: "Refer a friend", sub: "Get $20 off renewal" }].map((item, i, arr) => {
          const Icon = item.icon;
          return (
            <button key={item.label} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", backgroundColor: "white", border: "none", borderBottom: i < arr.length - 1 ? `1px solid ${C.creamDark}` : "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: C.creamDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={17} style={{ color: C.teal }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{item.label}</div>
                {item.sub && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{item.sub}</div>}
              </div>
              <ChevronRight size={15} style={{ color: C.inkSoft }} />
            </button>
          );
        })}
      </div>
      <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 16, backgroundColor: "white", border: `1.5px solid ${C.creamDark}`, color: C.coral, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        <LogOut size={15} /> Sign out
      </button>
    </div>
  );
}

// ── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ tab, onChange }) {
  const tabs = [{ id: "home", icon: Home, label: "Home" }, { id: "map", icon: MapPin, label: "Partners" }, { id: "card", icon: CreditCard, label: "Card" }, { id: "profile", icon: User, label: "Profile" }];
  const dark = tab === "card";
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, padding: "8px 16px 24px", background: dark ? "linear-gradient(0deg,rgba(15,30,46,.96) 60%,transparent 100%)" : `linear-gradient(0deg,${C.cream} 60%,transparent 100%)` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", borderRadius: 100, backgroundColor: dark ? "rgba(15,30,46,.9)" : "white", padding: "6px 8px", boxShadow: "0 8px 28px rgba(15,30,46,.12)", border: `1px solid ${dark ? "rgba(251,247,241,.12)" : C.creamDark}` }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = t.id === tab;
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: active ? "8px 16px" : "8px 10px", borderRadius: 100, backgroundColor: active ? C.teal : "transparent", border: "none", cursor: "pointer", transition: "all .2s" }}>
              <Icon size={19} color={active ? "white" : dark ? "rgba(251,247,241,.55)" : C.inkSoft} />
              {active && <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{t.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function MemberPage() {
  const [screen, setScreen]   = useState("splash");   // splash|path|direct|org|app
  const [tab, setTab]         = useState("home");
  const [member, setMember]   = useState(null);
  const [showBanner, setBanner] = useState(false);

  useEffect(() => {
    // Show install banner after 5 seconds if not already installed
    const t = setTimeout(() => setBanner(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const login = (m) => { setMember(m); setScreen("app"); setBanner(true); };
  const logout = () => { setMember(null); setScreen("splash"); setTab("home"); };

  const dark = screen === "app" && tab === "card";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: dark ? C.ink : C.cream, fontFamily: FONT, maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <style>{`
        :root { --teal: ${C.teal}; }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {screen === "splash" && <Splash onContinue={() => setScreen("path")} />}
      {screen === "path"   && <ChoosePath onDirect={() => setScreen("direct")} onOrg={() => setScreen("org")} onBack={() => setScreen("splash")} />}
      {screen === "direct" && <DirectLogin onSuccess={login} onBack={() => setScreen("path")} />}
      {screen === "org"    && <OrgLogin onSuccess={login} onBack={() => setScreen("path")} />}

      {screen === "app" && member && (
        <div style={{ paddingBottom: 90 }}>
          {tab === "home"    && <HomeTab    member={member} onCard={() => setTab("card")} onMap={() => setTab("map")} />}
          {tab === "map"     && <MapTab />}
          {tab === "card"    && <CardTab    member={member} />}
          {tab === "profile" && <ProfileTab member={member} onLogout={logout} />}
          <BottomNav tab={tab} onChange={setTab} />
        </div>
      )}

      {showBanner && screen !== "splash" && <InstallBanner onDismiss={() => setBanner(false)} />}
    </div>
  );
}

const FONT = "'Manrope', ui-sans-serif, system-ui, sans-serif";
