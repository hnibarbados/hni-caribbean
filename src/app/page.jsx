"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { C, COUNTRIES } from "../lib/constants";
import { PARTNERS } from "../lib/data";

const slides = [
  { img: "https://hnicaribbean.com/wp-content/uploads/2021/03/stretch_slider-02.png",      headline: "Save More Every Day",          sub: "Instant discounts at over 100 health and wellness partners." },
  { img: "https://hnicaribbean.com/wp-content/uploads/2021/03/stretch_slider-03-1-1.png",  headline: "Healthier Living, Lighter Spending", sub: "Your HNI card keeps more cash in your pocket." },
  { img: "https://hnicaribbean.com/wp-content/uploads/2021/03/stretch_slider-01-alt.jpg",  headline: "Wellness Across the Caribbean", sub: "Benefits wherever you live or travel next." },
];

export default function HomePage() {
  const [slide, setSlide]     = useState(0);
  const [country, setCountry] = useState("BB");
  const total = PARTNERS.length;
  const activeCountry = COUNTRIES.find(c => c.code === country) || COUNTRIES[1];

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = PARTNERS.slice(0, 6);

  return (
    <div style={{ backgroundColor: C.cream }}>
      <Header />

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === slide ? 1 : 0, transition: "opacity .8s ease" }}>
            <img src={s.img} alt={s.headline} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,30,46,.55) 0%,rgba(15,30,46,.15) 60%,transparent 100%)" }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 600, color: "white" }}>
            <div style={{ opacity: 0, animation: "fadeUp .9s .1s forwards" }}>
              <p className="eyebrow" style={{ color: C.teal, marginBottom: 16 }}>Caribbean Wellness Membership</p>
              <h1 className="display" style={{ fontSize: "clamp(48px,7vw,88px)", lineHeight: 1.02, marginBottom: 24 }}>
                Live well.<br /><em style={{ color: C.teal }}>Spend less.</em>
              </h1>
              <p style={{ fontSize: 20, lineHeight: 1.6, opacity: 0.92, marginBottom: 36, maxWidth: 480 }}>
                One card. {total}+ trusted partners across the Caribbean. Instant savings every time you show up for yourself.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a href="/buy" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 100, backgroundColor: C.teal, color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                  Get your card <ArrowUpRight size={18} />
                </a>
                <a href="/partners" style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 100, border: "2px solid rgba(255,255,255,.6)", color: "white", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  Explore partners
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ height: 8, width: i === slide ? 28 : 8, borderRadius: 100, backgroundColor: i === slide ? C.teal : "rgba(255,255,255,.5)", border: "none", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ borderTop: `1px solid ${C.creamDark}`, borderBottom: `1px solid ${C.creamDark}`, backgroundColor: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[{ n: `${total}+`, l: "Partners" }, { n: "3", l: "Islands" }, { n: "10%", l: "Avg savings" }, { n: "100%", l: "Card-activated" }].map((s, i) => (
            <div key={s.l} style={{ padding: "32px 24px", borderRight: i < 3 ? `1px solid ${C.creamDark}` : "none" }}>
              <div className="display" style={{ fontSize: 44, fontWeight: 700, color: C.ink }}>{s.n}</div>
              <p className="eyebrow" style={{ color: C.inkSoft, marginTop: 6 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VALUE SECTION */}
      <section style={{ padding: "96px 24px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=85" alt="Wellness" style={{ width: "100%", height: 560, objectFit: "cover", borderRadius: 28 }} />
          <div style={{ position: "absolute", bottom: -20, right: -20, padding: "20px 24px", borderRadius: 20, backgroundColor: C.coral, color: "white", boxShadow: "0 16px 40px rgba(242,92,84,.3)" }}>
            <p className="display" style={{ fontSize: 22 }}>Saving feels good.</p>
            <p style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>So does showing up for yourself.</p>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
            <span className="eyebrow" style={{ color: C.coral }}>Why HNI</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.05, marginBottom: 24 }}>
            Wellness shouldn't be<br /><em style={{ color: C.teal }}>a luxury.</em>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: C.inkSoft, marginBottom: 32 }}>
            We built HNI because eating well, moving well, and feeling well shouldn't cost more than it has to. Your card is your key to instant savings at the partners who already share the mission.
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["No coupons, no apps, no waiting for rebates", "Average 10% off, the moment you show your card", "Trusted partners vetted across three islands", "One annual fee, savings all year long"].map(b => (
              <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Check size={13} color="white" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 15 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARTNERS PREVIEW */}
      <section style={{ backgroundColor: C.ink, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
                <span className="eyebrow" style={{ color: C.coral }}>Featured Partners</span>
              </div>
              <h2 className="display" style={{ fontSize: "clamp(36px,4vw,56px)", color: "white", lineHeight: 1.05 }}>
                {total}+ places to live well<br /><em style={{ color: C.teal }}>for less.</em>
              </h2>
            </div>
            {/* Island pills */}
            <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 100, backgroundColor: "rgba(255,255,255,.08)" }}>
              {COUNTRIES.filter(c => c.code !== "ALL").map(c => (
                <button key={c.code} onClick={() => setCountry(c.code)} style={{ padding: "8px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, backgroundColor: country === c.code ? C.cream : "transparent", color: country === c.code ? C.ink : "rgba(255,255,255,.6)", transition: "all .2s" }}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {featured.map(p => (
              <a key={p.id} href={`/partners/${p.id}`} style={{ textDecoration: "none", display: "block" }} className="card-hover">
                <div className="img-zoom" style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", marginBottom: 18 }}>
                  <img src={p.cover} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 14, right: 14, padding: "6px 14px", borderRadius: 100, backgroundColor: C.coral, color: "white", fontSize: 12, fontWeight: 800 }}>{p.discount}% OFF</div>
                  <div style={{ position: "absolute", bottom: 14, left: 14, padding: "4px 12px", borderRadius: 100, backgroundColor: "rgba(15,30,46,.65)", color: "white", fontSize: 11, fontWeight: 700, backdropFilter: "blur(8px)" }}>{p.countryName}</div>
                </div>
                <div className="eyebrow" style={{ color: C.teal, marginBottom: 6 }}>{p.category}</div>
                <div className="display" style={{ fontSize: 20, color: "white", marginBottom: 4 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                  <MapPin size={13} />{p.city}
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a href="/partners" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 100, backgroundColor: C.cream, color: C.ink, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              View all {total}+ partners <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "96px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
            <span className="eyebrow" style={{ color: C.coral }}>How It Works</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.05 }}>
            Three steps.<br /><em style={{ color: C.teal }}>One healthier you.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
          {[
            { n: "01", t: "Become a member",     d: "Order online. Your digital card activates instantly." },
            { n: "02", t: "Find a partner",      d: "Browse 100+ vetted health and wellness partners near you." },
            { n: "03", t: "Show and save",       d: "Show your card. Walk out lighter. Repeat all year." },
          ].map(s => (
            <div key={s.n} style={{ borderTop: `2px solid ${C.ink}`, paddingTop: 28 }}>
              <div className="display" style={{ fontSize: 52, fontWeight: 400, color: C.teal, marginBottom: 20 }}>{s.n}</div>
              <h3 className="display" style={{ fontSize: 26, marginBottom: 10 }}>{s.t}</h3>
              <p style={{ color: C.inkSoft, lineHeight: 1.65 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", borderRadius: 32, padding: "80px 48px", background: `linear-gradient(135deg,${C.teal} 0%,${C.tealDark} 100%)`, color: "white", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", backgroundColor: C.coral, opacity: 0.18 }} />
          <div style={{ position: "relative" }}>
            <h2 className="display" style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.05, marginBottom: 20 }}>
              Your healthier year<br /><em>starts today.</em>
            </h2>
            <p style={{ fontSize: 18, opacity: 0.95, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
              Join members saving on the wellness they love across Barbados, Grenada, and Antigua.
            </p>
            <a href="/buy" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", borderRadius: 100, backgroundColor: "white", color: C.ink, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
              Get your card <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
