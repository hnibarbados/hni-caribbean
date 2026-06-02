"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { C } from "../lib/constants";

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { name: "Partners", href: "/partners" },
    { name: "Blog",     href: "#" },
    { name: "About",    href: "#" },
    { name: "Contact",  href: "#" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: scrolled ? "rgba(251,247,241,.93)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: `1px solid ${scrolled ? C.creamDark : "transparent"}`,
      transition: "all .3s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 40, width: "auto" }} />
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {navLinks.map(l => (
            <a key={l.name} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: C.ink, textDecoration: "none", opacity: 1, transition: "opacity .2s" }}
               onMouseEnter={e => e.target.style.opacity = ".55"}
               onMouseLeave={e => e.target.style.opacity = "1"}>
              {l.name}
            </a>
          ))}
          <a href="/member" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Member Login <ArrowUpRight size={15} />
          </a>
          <a href="/buy" style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 100, backgroundColor: C.teal, color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Buy a Card <ArrowUpRight size={15} />
          </a>
        </nav>

        <button onClick={() => setMobile(m => !m)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="mobile-menu-btn" aria-label="Menu">
          {mobileOpen ? <X size={26} color={C.ink} /> : <Menu size={26} color={C.ink} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ backgroundColor: C.cream, borderTop: `1px solid ${C.creamDark}`, padding: "16px 24px 24px" }}>
          {navLinks.map(l => (
            <a key={l.name} href={l.href} style={{ display: "block", padding: "12px 0", fontSize: 17, fontWeight: 500, color: C.ink, textDecoration: "none", borderBottom: `1px solid ${C.creamDark}` }}>{l.name}</a>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            <a href="/member" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "13px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Member Login
            </a>
            <a href="/buy" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "13px", borderRadius: 100, backgroundColor: C.teal, color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Buy a Card
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
