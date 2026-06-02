"use client";
import { useState, useMemo } from "react";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { C, COUNTRIES, CATEGORIES } from "../../lib/constants";
import { PARTNERS } from "../../lib/data";

export default function PartnersPage() {
  const [search, setSearch]   = useState("");
  const [country, setCountry] = useState("ALL");
  const [category, setCat]    = useState("All Categories");

  const filtered = useMemo(() => PARTNERS.filter(p => {
    if (country !== "ALL" && p.country !== country) return false;
    if (category !== "All Categories" && p.category !== category) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.city.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s)) return false;
    }
    return true;
  }), [search, country, category]);

  const reset = () => { setSearch(""); setCountry("ALL"); setCat("All Categories"); };

  return (
    <div style={{ backgroundColor: C.cream }}>
      <Header />

      {/* Hero */}
      <section style={{ padding: "120px 24px 64px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.coral }} />
          <span className="eyebrow" style={{ color: C.coral }}>Partner Directory</span>
        </div>
        <h1 className="display" style={{ fontSize: "clamp(40px,6vw,72px)", lineHeight: 1.02, marginBottom: 20 }}>
          Find your wellness,<br /><em style={{ color: C.teal }}>on every island.</em>
        </h1>
        <p style={{ fontSize: 18, color: C.inkSoft, maxWidth: 600, lineHeight: 1.65 }}>
          Browse {PARTNERS.length}+ trusted partners across Barbados, Grenada, and Antigua. Filter by island, category, or search by name.
        </p>
      </section>

      {/* Sticky filter bar */}
      <div style={{ position: "sticky", top: 72, zIndex: 30, backgroundColor: C.cream, borderTop: `1px solid ${C.creamDark}`, borderBottom: `1px solid ${C.creamDark}`, padding: "14px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.inkLight }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search partners, cities, categories…"
                style={{ width: "100%", padding: "11px 14px 11px 40px", borderRadius: 100, border: `1.5px solid ${C.creamDark}`, backgroundColor: "white", fontSize: 14, color: C.ink, outline: "none", boxSizing: "border-box" }} />
            </div>
            {/* Country pills */}
            <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 100, backgroundColor: C.creamDark }}>
              {COUNTRIES.map(c => (
                <button key={c.code} onClick={() => setCountry(c.code)} style={{ padding: "8px 16px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, backgroundColor: country === c.code ? C.ink : "transparent", color: country === c.code ? C.cream : C.inkSoft, transition: "all .2s" }}>
                  {c.code === "ALL" ? "All" : c.name}
                </button>
              ))}
            </div>
          </div>
          {/* Category chips */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCat(cat)} style={{ flexShrink: 0, padding: "6px 16px", borderRadius: 100, border: `1.5px solid ${category === cat ? C.teal : C.creamDark}`, backgroundColor: category === cat ? C.teal : "white", color: category === cat ? "white" : C.inkSoft, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <section style={{ padding: "48px 24px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: C.inkSoft }}>
            Showing <strong style={{ color: C.ink }}>{filtered.length}</strong> of {PARTNERS.length} partners
          </p>
          {(country !== "ALL" || category !== "All Categories" || search) && (
            <button onClick={reset} style={{ fontSize: 13, fontWeight: 700, color: C.coral, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Reset filters</button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", backgroundColor: "white", borderRadius: 24, border: `1px solid ${C.creamDark}` }}>
            <p className="display" style={{ fontSize: 28, marginBottom: 12 }}>No partners match.</p>
            <p style={{ color: C.inkSoft, marginBottom: 24 }}>Try widening your filters or searching for something else.</p>
            <button onClick={reset} style={{ padding: "12px 28px", borderRadius: 100, backgroundColor: C.ink, color: "white", fontWeight: 700, border: "none", cursor: "pointer" }}>Reset filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
            {filtered.map(p => (
              <a key={p.id} href={`/partners/${p.id}`} style={{ textDecoration: "none", display: "block" }} className="card-hover">
                <div className="img-zoom" style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", marginBottom: 16 }}>
                  <img src={p.cover} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 14, right: 14, padding: "6px 14px", borderRadius: 100, backgroundColor: C.coral, color: "white", fontSize: 12, fontWeight: 800 }}>{p.discount}% OFF</div>
                  <div style={{ position: "absolute", bottom: 14, left: 14, padding: "4px 12px", borderRadius: 100, backgroundColor: "rgba(15,30,46,.65)", color: "white", fontSize: 11, fontWeight: 700, backdropFilter: "blur(8px)" }}>{p.countryName}</div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <p className="eyebrow" style={{ color: C.teal, marginBottom: 6 }}>{p.category}</p>
                    <h3 className="display" style={{ fontSize: 20, color: C.ink, marginBottom: 4 }}>{p.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.inkSoft }}>
                      <MapPin size={13} />{p.city}
                    </div>
                  </div>
                  <ArrowUpRight size={20} style={{ color: C.teal, marginTop: 4, flexShrink: 0 }} />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
