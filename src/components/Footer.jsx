import { Instagram, Facebook } from "lucide-react";
import { C } from "../lib/constants";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: C.ink, color: C.cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 44, width: "auto", filter: "brightness(0) invert(1)", marginBottom: 16 }} />
            <p style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.65, maxWidth: 280 }}>Live well, spend less. The Caribbean's health and wellness membership card.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[Instagram, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(251,247,241,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ opacity: 0.5, marginBottom: 16 }}>Navigate</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Partners", "/partners"], ["Buy a Card", "/buy"], ["Member Login", "/member"], ["About", "#"], ["Contact", "#"]].map(([l, h]) => (
                <a key={l} href={h} style={{ fontSize: 13, color: C.cream, textDecoration: "none", opacity: 0.75 }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ opacity: 0.5, marginBottom: 16 }}>Get in touch</div>
            <p style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.7 }}>Charnocks #1, Christ Church, Barbados</p>
            <a href="mailto:hnibarbados@gmail.com" style={{ fontSize: 13, color: C.cream, opacity: 0.75, textDecoration: "none", display: "block", marginTop: 8 }}>hnibarbados@gmail.com</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(251,247,241,.12)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, opacity: 0.5 }}>
          <span>© 2026 Healthier Nation Initiative. All rights reserved.</span>
          <span>Made with care in the Caribbean.</span>
        </div>
      </div>
    </footer>
  );
}
