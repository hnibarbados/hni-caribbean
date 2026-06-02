"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Plus, Minus, Sparkles } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { C } from "../../lib/constants";
import { PARTNERS } from "../../lib/data";

// ── Replace this URL with your real WooCommerce / payment portal checkout URL ──
const CHECKOUT_URL = "https://hnicaribbean.com/product/hni-savings-card/";

const FAQS = [
  { q: "How long does my card take to arrive?",     a: "Your digital card activates instantly on signup. There is no wait." },
  { q: "Where can I use my membership?",            a: "At every HNI partner across Barbados, Grenada, and Antigua. Full list in the Partners directory." },
  { q: "Do discounts stack with sales or specials?",a: "HNI discounts do not apply on top of existing sales. You always get the better of the two." },
  { q: "Can my family use my card?",                a: "Each membership is registered to one member. Reach out to us about household plans." },
  { q: "What if a partner doesn't honour my discount?", a: "Email us and we'll sort it within 24 hours. Your savings are our promise." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.creamDark}` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", gap: 24, textAlign: "left" }}>
        <span className="display" style={{ fontSize: 18, color: C.ink }}>{q}</span>
        <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: open ? C.teal : C.creamDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {open ? <Minus size={14} color="white" /> : <Plus size={14} color={C.ink} />}
        </div>
      </button>
      {open && <p style={{ paddingBottom: 20, fontSize: 15, lineHeight: 1.7, color: C.inkSoft }}>{a}</p>}
    </div>
  );
}

export default function BuyPage() {
  const handleBuy = () => { window.location.href = CHECKOUT_URL; };

  return (
    <div style={{ backgroundColor: C.cream }}>
      <Header />

      {/* HERO */}
      <section style={{ paddingTop: 72, overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
              <span className="eyebrow" style={{ color: C.coral }}>The HNI Card</span>
            </div>
            <h1 className="display" style={{ fontSize: "clamp(44px,5vw,80px)", lineHeight: 1.02, marginBottom: 24 }}>
              One card.<br /><em style={{ color: C.teal }}>A year of yes.</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: C.inkSoft, marginBottom: 36, maxWidth: 480 }}>
              Yes to that yoga class. Yes to the spa. Yes to the cleaner groceries. Your HNI membership unlocks instant savings at {PARTNERS.length}+ health and wellness partners across the Caribbean.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 40, fontSize: 13, color: C.inkSoft }}>
              {["Instant digital card", "Secure checkout", "Cancel anytime"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Check size={14} style={{ color: C.teal }} />{t}
                </div>
              ))}
            </div>
            <a href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Get your card <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Card mockup */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingBottom: 40 }}>
            <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", backgroundColor: C.teal, opacity: 0.12, filter: "blur(60px)" }} />
            <div className="animate-floaty" style={{ position: "relative", width: "100%", maxWidth: 400 }}>
              {/* Shadow card */}
              <div style={{ position: "absolute", top: 20, left: 20, right: -20, bottom: -20, borderRadius: 24, background: `linear-gradient(135deg,${C.teal}44,${C.teal}22)` }} />
              {/* Main card */}
              <div style={{ position: "relative", aspectRatio: "1.586/1", borderRadius: 24, padding: "28px 32px", background: `linear-gradient(135deg,${C.teal} 0%,${C.tealDark} 60%,${C.ink} 100%)`, boxShadow: "0 24px 48px rgba(15,30,46,.3)", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%)" }} />
                <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.85 }}>Member Card</span>
                    <div style={{ height: 32, width: 42, borderRadius: 6, background: "linear-gradient(135deg,#f0d28a,#b8901a)" }} />
                  </div>
                  <div>
                    <div className="display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 2 }}>HNI</div>
                    <div className="display-italic" style={{ fontSize: 13, opacity: 0.8 }}>Healthier Nation Initiative</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.55, marginBottom: 2 }}>Valid until</div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>Jan 2027</div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, backgroundColor: `${C.coral}cc`, fontSize: 10, fontWeight: 800 }}>
                      <Sparkles size={10} /> New Member
                    </div>
                  </div>
                </div>
              </div>
              {/* Savings badge */}
              <div style={{ position: "absolute", bottom: -12, left: -12, backgroundColor: "white", borderRadius: 18, padding: "14px 20px", boxShadow: "0 12px 32px rgba(15,30,46,.12)" }}>
                <div className="display" style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>10%</div>
                <div style={{ fontSize: 11, color: C.inkSoft }}>Average instant savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "96px 24px", backgroundColor: C.creamDark }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
              <span className="eyebrow" style={{ color: C.coral }}>Membership</span>
              <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
            </div>
            <h2 className="display" style={{ fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.05 }}>
              One plan.<br /><em style={{ color: C.teal }}>All the savings.</em>
            </h2>
          </div>

          <div style={{ backgroundColor: C.ink, borderRadius: 28, padding: "48px 48px", color: "white", position: "relative", overflow: "hidden", boxShadow: "0 24px 48px rgba(15,30,46,.2)" }}>
            <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", backgroundColor: C.teal, opacity: 0.1 }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <div className="eyebrow" style={{ color: C.teal, marginBottom: 12 }}>Annual Membership</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                  <span className="display" style={{ fontSize: 64, fontWeight: 700 }}>$99</span>
                  <span style={{ fontSize: 15, opacity: 0.7 }}>/ year</span>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {["Unlimited use at all partner locations", "Valid across Barbados, Grenada, and Antigua", "Instant digital card — no waiting", "Renews annually, cancel anytime"].map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Check size={12} color="white" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 14, opacity: 0.9 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={handleBuy} style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 100, backgroundColor: C.teal, color: "white", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer" }}>
                  Get your card <ArrowUpRight size={18} />
                </button>
                <p style={{ marginTop: 12, fontSize: 12, opacity: 0.55 }}>All prices in USD. Need a family or corporate plan? <a href="#" style={{ color: C.teal, textDecoration: "underline" }}>Contact us</a>.</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="display" style={{ fontSize: 80, fontWeight: 700, color: C.teal, lineHeight: 1 }}>{PARTNERS.length}+</div>
                <p style={{ fontSize: 18, opacity: 0.8, marginTop: 8 }}>Partners waiting to save you money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 24px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
            <span className="eyebrow" style={{ color: C.coral }}>Frequently Asked</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(32px,3vw,48px)", lineHeight: 1.1, marginBottom: 20 }}>
            The questions<br /><em style={{ color: C.teal }}>everyone asks.</em>
          </h2>
          <p style={{ fontSize: 16, color: C.inkSoft, lineHeight: 1.65, marginBottom: 24 }}>Still curious? Reach out and we'll reply within a day.</p>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: C.coral, textDecoration: "none" }}>Contact us <ArrowUpRight size={15} /></a>
        </div>
        <div>
          {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
