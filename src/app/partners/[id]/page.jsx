"use client";
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock, Check, ArrowUpRight } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { C } from "../../../lib/constants";
import { PARTNERS } from "../../../lib/data";

export default function PartnerDetailPage({ params }) {
  const partner = PARTNERS.find(p => p.id === params.id) || PARTNERS[0];
  const related = PARTNERS.filter(p => p.id !== partner.id && p.category === partner.category).slice(0, 3);
  const show    = related.length >= 2 ? related : PARTNERS.filter(p => p.id !== partner.id && p.country === partner.country).slice(0, 3);

  return (
    <div style={{ backgroundColor: C.cream }}>
      <Header />

      {/* HERO */}
      <section style={{ paddingTop: 72 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 0" }}>
          <a href="/partners" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: C.inkSoft, textDecoration: "none", marginBottom: 24 }}>
            <ArrowLeft size={15} /> All partners
          </a>
          <div style={{ position: "relative", borderRadius: 28, overflow: "hidden" }}>
            <img src={partner.cover} alt={partner.name} style={{ width: "100%", height: 480, objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(15,30,46,.75) 0%,rgba(15,30,46,.1) 60%,transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: 36, left: 36, right: 36 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                <span style={{ padding: "6px 16px", borderRadius: 100, backgroundColor: C.coral, color: "white", fontSize: 12, fontWeight: 800 }}>{partner.discount}% OFF</span>
                <span style={{ padding: "6px 16px", borderRadius: 100, backgroundColor: "white", color: C.ink, fontSize: 12, fontWeight: 700 }}>{partner.category}</span>
                <span style={{ padding: "6px 16px", borderRadius: 100, backgroundColor: "rgba(255,255,255,.2)", color: "white", fontSize: 12, fontWeight: 700, backdropFilter: "blur(8px)" }}>{partner.countryName}</span>
              </div>
              <h1 className="display" style={{ fontSize: "clamp(36px,5vw,60px)", color: "white", lineHeight: 1.05 }}>{partner.name}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, color: "rgba(255,255,255,.85)", fontSize: 15 }}>
                <MapPin size={16} />{partner.city}, {partner.countryName}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 0", display: "grid", gridTemplateColumns: "1fr 380px", gap: 64 }}>
        {/* Left */}
        <div>
          <p className="display" style={{ fontSize: 26, lineHeight: 1.45, marginBottom: 40, color: C.ink }}>{partner.description}</p>

          <div style={{ marginBottom: 40 }}>
            <p className="eyebrow" style={{ color: C.coral, marginBottom: 12 }}>About</p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: C.inkSoft }}>{partner.about}</p>
          </div>

          {/* HNI Offer callout */}
          <div style={{ padding: "32px 36px", borderRadius: 24, background: `linear-gradient(135deg,${C.teal} 0%,${C.tealDark} 100%)`, color: "white", marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <p className="eyebrow" style={{ opacity: 0.9 }}>What HNI members get</p>
              <span className="display" style={{ fontSize: 56, fontWeight: 700 }}>{partner.discount}%</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.95 }}>{partner.offer}</p>
          </div>

          {/* How to redeem */}
          <div style={{ marginBottom: 48 }}>
            <p className="eyebrow" style={{ color: C.coral, marginBottom: 20 }}>How to redeem</p>
            {[`Visit ${partner.name} during opening hours.`, "Show your HNI digital card (from the member app or website) before payment.", "Your discount is applied instantly. No coupon, no code, no app required."].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: C.ink, color: C.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: C.ink, paddingTop: 4 }}>{step}</p>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div>
            <p className="eyebrow" style={{ color: C.coral, marginBottom: 16 }}>Gallery</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {partner.gallery.map((img, i) => (
                <img key={i} src={img} alt={`${partner.name} ${i + 1}`} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 18 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div style={{ position: "sticky", top: 100 }}>
            <div style={{ backgroundColor: "white", borderRadius: 24, padding: "28px 28px", border: `1px solid ${C.creamDark}`, marginBottom: 16 }}>
              <p className="eyebrow" style={{ color: C.coral, marginBottom: 20 }}>Visit</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: MapPin, text: partner.address,  href: null },
                  { icon: Phone,  text: partner.phone,    href: `tel:${partner.phone}` },
                  { icon: Mail,   text: partner.email,    href: `mailto:${partner.email}` },
                  { icon: Globe,  text: partner.website,  href: `https://${partner.website}` },
                ].map(({ icon: Icon, text, href }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Icon size={17} style={{ color: C.teal, flexShrink: 0, marginTop: 1 }} />
                    {href ? <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: C.ink, textDecoration: "none" }}>{text}</a> : <span style={{ fontSize: 14, color: C.ink }}>{text}</span>}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${C.creamDark}`, marginTop: 20, paddingTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 13, fontWeight: 700 }}>
                  <Clock size={15} style={{ color: C.teal }} /> Hours
                </div>
                {partner.hours.map((h, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                    <span style={{ color: C.inkSoft }}>{h.day}</span>
                    <span style={{ fontWeight: 600 }}>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{ marginTop: 20, height: 160, borderRadius: 16, backgroundColor: C.creamDark, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <MapPin size={28} style={{ color: C.teal }} />
                <p style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600 }}>
                  {/* Replace with Google Maps embed using partner.lat and partner.lng */}
                  Map embed goes here
                </p>
              </div>
            </div>

            {/* Buy card CTA */}
            <div style={{ backgroundColor: C.ink, borderRadius: 24, padding: "24px 28px" }}>
              <p className="display" style={{ fontSize: 20, color: "white", marginBottom: 8 }}>Don't have your card yet?</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 20, lineHeight: 1.6 }}>Get instant savings here and at {PARTNERS.length - 1}+ other partners.</p>
              <a href="/buy" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", borderRadius: 100, backgroundColor: C.teal, color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                Get your card <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Related partners */}
      {show.length > 0 && (
        <section style={{ padding: "80px 24px", backgroundColor: C.creamDark, marginTop: 64 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
              <span className="eyebrow" style={{ color: C.coral }}>Also worth a visit</span>
            </div>
            <h3 className="display" style={{ fontSize: 36, marginBottom: 40 }}>More partners to explore</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {show.map(p => (
                <a key={p.id} href={`/partners/${p.id}`} style={{ textDecoration: "none" }} className="card-hover">
                  <div className="img-zoom" style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", marginBottom: 14 }}>
                    <img src={p.cover} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <p className="eyebrow" style={{ color: C.teal, marginBottom: 6 }}>{p.category}</p>
                  <h4 className="display" style={{ fontSize: 18, color: C.ink }}>{p.name}</h4>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
