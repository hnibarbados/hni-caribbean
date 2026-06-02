import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Users, Building2, MapPin, BarChart3,
  Settings, LogOut, Search, Bell, Plus, Download, Upload,
  ChevronRight, ChevronDown, TrendingUp, TrendingDown,
  Check, X, MoreHorizontal, Filter, RefreshCw, Eye,
  CreditCard, Zap, Shield, AlertCircle, CheckCircle2,
  ArrowUpRight, ArrowUp, ArrowDown, Menu, Pencil, Trash2,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  teal: "#16B7CC", tealDark: "#0F8FA1", tealLight: "#E8F8FB",
  coral: "#F25C54", coralLight: "#FEF2F2",
  green: "#22C55E", greenLight: "#F0FDF4",
  amber: "#F59E0B", amberLight: "#FFFBEB",
  cream: "#FBF7F1", creamDark: "#F0EADF",
  ink: "#0F1E2E", inkSoft: "#3A4A5C", inkLight: "#6B7B8E",
  sidebar: "#0B1622",
  sidebarHover: "rgba(22,183,204,.1)",
  border: "#EDF0F2",
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const ORGS = [
  { id: "SAGICOR",  name: "Sagicor",             members: 84,  active: 79, country: "BB", contact: "benefits@sagicor.com" },
  { id: "BIMAS",    name: "BIM Insurance",        members: 42,  active: 40, country: "BB", contact: "hr@bimas.bb" },
  { id: "GUARDIAN", name: "Guardian Life",        members: 61,  active: 58, country: "GD", contact: "wellness@guardian.gd" },
  { id: "BHL",      name: "Barbados Health Ltd",  members: 28,  active: 26, country: "BB", contact: "admin@bhl.bb" },
  { id: "NALICO",   name: "NALICO",               members: 47,  active: 44, country: "AG", contact: "hr@nalico.ag" },
];

const MEMBERS = [
  { id: "HNI-2026-4471", name: "Alex Brathwaite",  email: "alex@email.com",  source: "Direct",   country: "BB", joined: "Jan 2026", expires: "Jan 2027", status: "active" },
  { id: "SAGICOR-042",   name: "Sarah Williams",   email: "sarah@email.com", source: "Sagicor",  country: "BB", joined: "Feb 2026", expires: "Dec 2026", status: "active" },
  { id: "GUARDIAN-015",  name: "Marcus Thompson",  email: "mt@email.com",    source: "Guardian Life", country: "GD", joined: "Jan 2026", expires: "Mar 2027", status: "active" },
  { id: "HNI-2025-1124", name: "Diane Holder",     email: "dh@email.com",    source: "Direct",   country: "BB", joined: "Jan 2025", expires: "Jan 2026", status: "expired" },
  { id: "BIMAS-008",     name: "Kezia Holder",     email: "kh@email.com",    source: "BIM Insurance", country: "BB", joined: "Mar 2026", expires: "Sep 2026", status: "active" },
  { id: "NALICO-034",    name: "Jerome Charles",   email: "jc@email.com",    source: "NALICO",   country: "AG", joined: "Apr 2026", expires: "Apr 2027", status: "active" },
  { id: "HNI-2026-5512", name: "Tamara Hunte",     email: "th@email.com",    source: "Direct",   country: "GD", joined: "Feb 2026", expires: "Feb 2027", status: "active" },
  { id: "BHL-019",       name: "Ricardo Springer", email: "rs@email.com",    source: "Barbados Health Ltd", country: "BB", joined: "Mar 2026", expires: "Mar 2027", status: "active" },
  { id: "HNI-2026-6001", name: "Natasha Clarke",   email: "nc@email.com",    source: "Direct",   country: "BB", joined: "May 2026", expires: "May 2027", status: "active" },
  { id: "SAGICOR-091",   name: "Damon Alleyne",    email: "da@email.com",    source: "Sagicor",  country: "BB", joined: "Jan 2026", expires: "Dec 2026", status: "active" },
  { id: "HNI-2026-4900", name: "Lisa Parris",      email: "lp@email.com",    source: "Direct",   country: "AG", joined: "Mar 2026", expires: "Mar 2027", status: "active" },
  { id: "GUARDIAN-044",  name: "Carl Baptiste",    email: "cb@email.com",    source: "Guardian Life", country: "GD", joined: "Feb 2026", expires: "Mar 2027", status: "pending" },
];

const PARTNERS = [
  { id: 1, name: "Coral Reef Wellness",      category: "Yoga & Movement",  country: "BB", city: "Holetown",     discount: 15, scans: 284, status: "active" },
  { id: 2, name: "Island Greens Market",     category: "Organic Grocery",  country: "BB", city: "Bridgetown",   discount: 10, scans: 412, status: "active" },
  { id: 3, name: "Atlantic Physio",          category: "Physiotherapy",    country: "BB", city: "Christ Church", discount: 12, scans: 198, status: "active" },
  { id: 4, name: "Sunrise Optical",          category: "Eye Care",         country: "BB", city: "Bridgetown",   discount: 15, scans: 133, status: "active" },
  { id: 5, name: "The Mindful Sea",          category: "Mental Health",    country: "BB", city: "Holetown",     discount: 20, scans: 89,  status: "active" },
  { id: 6, name: "Sea Salt Kitchen",         category: "Restaurants",      country: "BB", city: "Oistins",      discount: 10, scans: 524, status: "active" },
  { id: 7, name: "Coastal Fitness Club",     category: "Fitness",          country: "BB", city: "Christ Church", discount: 15, scans: 341, status: "active" },
  { id: 8, name: "Saltwater Spa",            category: "Spa & Wellness",   country: "GD", city: "St. George's", discount: 20, scans: 176, status: "active" },
  { id: 9, name: "Spice Isle Organics",      category: "Organic Grocery",  country: "GD", city: "St. George's", discount: 10, scans: 98,  status: "active" },
  { id: 10,name: "Mountain View Yoga",       category: "Yoga & Movement",  country: "GD", city: "St. George's", discount: 15, scans: 114, status: "active" },
  { id: 11,name: "Nutmeg Café",              category: "Restaurants",      country: "GD", city: "St. George's", discount: 10, scans: 203, status: "active" },
  { id: 12,name: "Banyan Tree Kitchen",      category: "Restaurants",      country: "AG", city: "St. John's",   discount: 10, scans: 167, status: "active" },
  { id: 13,name: "Antigua Wellness Centre",  category: "Medical",          country: "AG", city: "St. John's",   discount: 12, scans: 122, status: "active" },
  { id: 14,name: "Sun & Sand Spa",           category: "Spa & Wellness",   country: "AG", city: "Jolly Harbour",discount: 18, scans: 145, status: "active" },
  { id: 15,name: "English Harbour Physio",   category: "Physiotherapy",    country: "AG", city: "Eng. Harbour", discount: 15, scans: 77,  status: "active" },
  { id: 16,name: "St. John's Dental",        category: "Dental",           country: "AG", city: "St. John's",   discount: 10, scans: 61,  status: "inactive" },
];

const REDEMPTION_TREND = [
  { month: "Jan", redemptions: 142, savings: 1840 },
  { month: "Feb", redemptions: 188, savings: 2340 },
  { month: "Mar", redemptions: 224, savings: 2890 },
  { month: "Apr", redemptions: 261, savings: 3210 },
  { month: "May", redemptions: 304, savings: 3870 },
  { month: "Jun", redemptions: 278, savings: 3540 },
  { month: "Jul", redemptions: 332, savings: 4120 },
  { month: "Aug", redemptions: 398, savings: 4780 },
  { month: "Sep", redemptions: 441, savings: 5340 },
  { month: "Oct", redemptions: 387, savings: 4690 },
  { month: "Nov", redemptions: 502, savings: 6020 },
  { month: "Dec", redemptions: 468, savings: 5680 },
];

const BY_CATEGORY = [
  { name: "Restaurants",     value: 894 },
  { name: "Fitness",         value: 341 },
  { name: "Organic Grocery", value: 510 },
  { name: "Spa & Wellness",  value: 321 },
  { name: "Yoga",            value: 398 },
  { name: "Physiotherapy",   value: 275 },
  { name: "Medical",         value: 122 },
  { name: "Other",           value: 266 },
];

const BY_ISLAND = [
  { island: "Barbados", members: 114, partners: 7, redemptions: 1981 },
  { island: "Grenada",  members: 41,  partners: 5, redemptions: 591  },
  { island: "Antigua",  members: 24,  partners: 4, redemptions: 555  },
];

const PIE_COLORS = [C.teal, C.coral, C.amber, "#8B5CF6", "#06B6D4", "#84CC16", "#F97316", "#EC4899"];

const RECENT_ACTIVITY = [
  { type: "new_member",  text: "Natasha Clarke joined as a direct member",   time: "2m ago",  icon: Users,      color: C.teal  },
  { type: "new_partner", text: "Zen Garden Spa onboarded in Barbados",       time: "1h ago",  icon: MapPin,     color: C.green },
  { type: "org_upload",  text: "Sagicor uploaded 12 new member numbers",     time: "3h ago",  icon: Upload,     color: C.amber },
  { type: "expiry",      text: "4 memberships expiring in the next 7 days",  time: "Today",   icon: AlertCircle,color: C.coral },
  { type: "new_member",  text: "Damon Alleyne verified via Sagicor",         time: "Yesterday",icon: Shield,    color: C.teal  },
];

// ─── HELPER COMPONENTS ──────────────────────────────────────────────────────

const CountryBadge = ({ code }) => {
  const map = { BB: { label: "Barbados", bg: "#EBF8FF", color: "#0369A1" }, GD: { label: "Grenada", bg: "#F0FDF4", color: "#166534" }, AG: { label: "Antigua", bg: "#FEF3C7", color: "#92400E" } };
  const s = map[code] || { label: code, bg: C.creamDark, color: C.inkSoft };
  return <span style={{ padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color }}>{s.label}</span>;
};

const StatusBadge = ({ status }) => {
  const map = {
    active:   { label: "Active",   bg: C.greenLight,  color: C.green  },
    expired:  { label: "Expired",  bg: C.coralLight,  color: C.coral  },
    inactive: { label: "Inactive", bg: C.coralLight,  color: C.coral  },
    pending:  { label: "Pending",  bg: C.amberLight,  color: C.amber  },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />{s.label}
    </span>
  );
};

const SourceBadge = ({ source }) => {
  const isDirect = source === "Direct";
  return (
    <span style={{ padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: isDirect ? C.tealLight : C.creamDark, color: isDirect ? C.tealDark : C.inkSoft }}>
      {isDirect ? "Direct" : source}
    </span>
  );
};

const Stat = ({ label, value, delta, deltaLabel, color = C.teal, icon: Icon }) => {
  const up = delta >= 0;
  return (
    <div style={{ background: "white", borderRadius: 18, padding: "20px 22px", border: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.inkSoft, letterSpacing: "0.02em" }}>{label}</div>
        {Icon && <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} style={{ color }} /></div>}
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      {delta !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 12 }}>
          {up ? <ArrowUp size={13} style={{ color: C.green }} /> : <ArrowDown size={13} style={{ color: C.coral }} />}
          <span style={{ fontWeight: 700, color: up ? C.green : C.coral }}>{Math.abs(delta)}%</span>
          <span style={{ color: C.inkLight }}>{deltaLabel || "vs last month"}</span>
        </div>
      )}
    </div>
  );
};

// Custom tooltip for charts
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.ink, color: "white", padding: "10px 14px", borderRadius: 12, fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: p.color }}>{p.name}:</span>
          <span style={{ fontWeight: 700 }}>{typeof p.value === "number" && p.name?.toLowerCase().includes("sav") ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

// ─── VIEWS ──────────────────────────────────────────────────────────────────

function DashboardView() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>Overview</div>
        <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>All islands · May 2026</div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <Stat label="Total Members"      value="179"    delta={12}  icon={Users}      color={C.teal}  />
        <Stat label="Active Members"     value="164"    delta={9}   icon={CreditCard} color={C.green} />
        <Stat label="Org Members"        value="65"     delta={18}  icon={Building2}  color={C.amber} />
        <Stat label="Partners"           value="16"     delta={6}   icon={MapPin}     color={C.coral} />
        <Stat label="Redemptions (May)"  value="468"    delta={14}  icon={Zap}        color={C.teal}  />
        <Stat label="Savings Issued YTD" value="$48.3k" delta={22}  icon={TrendingUp} color={C.green} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>
        {/* Redemption trend */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink }}>Redemptions & Savings</div>
              <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>12-month trend across all islands</div>
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.inkSoft }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 3, background: C.teal, borderRadius: 2, display: "inline-block" }} /> Redemptions</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 3, background: C.coral, borderRadius: 2, display: "inline-block" }} /> Savings ($)</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REDEMPTION_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.teal}  stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.teal}  stopOpacity={0} />
                </linearGradient>
                <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.coral} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={C.coral} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.border} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="redemptions" name="Redemptions" stroke={C.teal}  strokeWidth={2.5} fill="url(#tealGrad)"  dot={false} />
              <Area type="monotone" dataKey="savings"     name="Savings"     stroke={C.coral} strokeWidth={2.5} fill="url(#coralGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* By category pie */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 4 }}>By Category</div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 16 }}>Redemptions YTD</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={BY_CATEGORY} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2}>
                {BY_CATEGORY.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {BY_CATEGORY.slice(0, 4).map((c, i) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: PIE_COLORS[i], display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: C.inkSoft }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.ink }}>{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Island breakdown + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* By island */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 18 }}>Island Breakdown</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={BY_ISLAND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={C.border} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="island" tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="members"     name="Members"     fill={C.teal}  radius={[6,6,0,0]} />
              <Bar dataKey="redemptions" name="Redemptions" fill={C.coral} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 14 }}>
            {BY_ISLAND.map(r => (
              <div key={r.island} style={{ padding: "12px 14px", borderRadius: 12, background: C.cream, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.inkSoft, marginBottom: 4 }}>{r.island}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: C.ink }}>{r.members}</div>
                <div style={{ fontSize: 10, color: C.inkLight }}>members · {r.partners} partners</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {RECENT_ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ display: "flex", gap: 12, padding: "11px 0", borderBottom: i < RECENT_ACTIVITY.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Icon size={14} style={{ color: a.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: C.ink, lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: C.inkLight, marginTop: 3 }}>{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersView() {
  const [search, setSearch]     = useState("");
  const [filterCountry, setFc]  = useState("ALL");
  const [filterSource, setFs]   = useState("ALL");
  const [filterStatus, setFst]  = useState("ALL");
  const [selected, setSelected] = useState(new Set());

  const filtered = useMemo(() => MEMBERS.filter(m => {
    if (filterCountry !== "ALL" && m.country !== filterCountry) return false;
    if (filterStatus !== "ALL" && m.status !== filterStatus) return false;
    if (filterSource !== "ALL") {
      if (filterSource === "Direct" && m.source !== "Direct") return false;
      if (filterSource === "Org"    && m.source === "Direct") return false;
    }
    if (search) {
      const s = search.toLowerCase();
      if (!m.name.toLowerCase().includes(s) && !m.id.toLowerCase().includes(s) && !m.email.toLowerCase().includes(s)) return false;
    }
    return true;
  }), [search, filterCountry, filterSource, filterStatus]);

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(m => m.id)));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>Members</div>
          <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>{MEMBERS.length} total · {MEMBERS.filter(m => m.status === "active").length} active</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.ink }}>
            <Download size={15} /> Export CSV
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 12, border: "none", background: C.ink, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "white" }}>
            <Plus size={15} /> Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.inkLight }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…" style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 13, color: C.ink, outline: "none", background: "white", boxSizing: "border-box", fontFamily: "'Manrope', sans-serif" }} />
        </div>
        {[
          { label: "Island", value: filterCountry, set: setFc, opts: [["ALL","All Islands"],["BB","Barbados"],["GD","Grenada"],["AG","Antigua"]] },
          { label: "Source", value: filterSource,  set: setFs,  opts: [["ALL","All Sources"],["Direct","Direct"],["Org","Organisation"]] },
          { label: "Status", value: filterStatus,  set: setFst, opts: [["ALL","All Statuses"],["active","Active"],["expired","Expired"],["pending","Pending"]] },
        ].map(f => (
          <select key={f.label} value={f.value} onChange={e => f.set(e.target.value)} style={{ padding: "9px 14px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 13, color: C.ink, background: "white", outline: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
            {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th style={{ padding: "13px 16px", textAlign: "left" }}>
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ cursor: "pointer" }} />
                </th>
                {["Member", "ID", "Source", "Island", "Joined", "Expires", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.inkSoft, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", background: selected.has(m.id) ? C.tealLight : "white" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <input type="checkbox" checked={selected.has(m.id)} onChange={() => { const s = new Set(selected); s.has(m.id) ? s.delete(m.id) : s.add(m.id); setSelected(s); }} style={{ cursor: "pointer" }} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: C.inkSoft }}>{m.email}</div>
                  </td>
                  <td style={{ padding: "12px 16px" }}><code style={{ fontSize: 11, background: C.creamDark, padding: "2px 7px", borderRadius: 6, color: C.inkSoft }}>{m.id}</code></td>
                  <td style={{ padding: "12px 16px" }}><SourceBadge source={m.source} /></td>
                  <td style={{ padding: "12px 16px" }}><CountryBadge code={m.country} /></td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: C.inkSoft }}>{m.joined}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: C.inkSoft }}>{m.expires}</td>
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={m.status} /></td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button title="View" style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.inkSoft }}><Eye size={13} /></button>
                      <button title="Edit" style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.inkSoft }}><Pencil size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: C.inkSoft, fontSize: 14 }}>No members match your filters.</div>
        )}
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", fontSize: 12, color: C.inkSoft }}>
          <span>{selected.size > 0 ? `${selected.size} selected` : `${filtered.length} members`}</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

function OrgsView() {
  const [expandedOrg, setExpanded] = useState(null);
  const [showUpload, setShowUpload] = useState(null);
  const [uploading, setUploading]  = useState(false);
  const [uploaded, setUploaded]    = useState(false);

  const simulateUpload = (orgId) => {
    setUploading(true);
    setUploaded(false);
    setTimeout(() => { setUploading(false); setUploaded(true); }, 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>Organisations</div>
          <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>{ORGS.length} partner organisations · {ORGS.reduce((s, o) => s + o.members, 0)} total org members</div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 12, border: "none", background: C.ink, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "white" }}>
          <Plus size={15} /> Add Organisation
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ORGS.map(org => (
          <div key={org.id} style={{ background: "white", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {/* Org header */}
            <button onClick={() => setExpanded(expandedOrg === org.id ? null : org.id)} style={{
              width: "100%", padding: "18px 22px", display: "flex", alignItems: "center",
              gap: 16, background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Building2 size={20} style={{ color: C.teal }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.ink }}>{org.name}</div>
                <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{org.contact}</div>
              </div>
              <CountryBadge code={org.country} />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: C.ink }}>{org.members}</div>
                <div style={{ fontSize: 11, color: C.inkSoft }}>members</div>
              </div>
              <div style={{ padding: "4px 12px", borderRadius: 100, background: C.greenLight, fontSize: 11, fontWeight: 700, color: C.green }}>{org.active} active</div>
              <ChevronDown size={16} style={{ color: C.inkSoft, transform: expandedOrg === org.id ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
            </button>

            {/* Expanded detail */}
            {expandedOrg === org.id && (
              <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 22px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                  {[
                    { l: "Total Issued", v: org.members },
                    { l: "Active", v: org.active, color: C.green },
                    { l: "Inactive", v: org.members - org.active, color: C.coral },
                    { l: "Utilisation", v: `${Math.round(org.active / org.members * 100)}%`, color: C.teal },
                  ].map(s => (
                    <div key={s.l} style={{ padding: "14px 16px", borderRadius: 14, background: C.cream, border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, color: C.inkSoft, marginBottom: 4 }}>{s.l}</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: s.color || C.ink }}>{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* CSV upload */}
                <div style={{ padding: "16px 18px", borderRadius: 14, background: C.creamDark, border: `1px dashed ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>Upload Member Numbers</div>
                      <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>Upload a CSV with one member number per row. New numbers are added; removed ones are deactivated.</div>
                    </div>
                    <button onClick={() => simulateUpload(org.id)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 12, border: "none", background: uploading ? C.inkSoft : C.ink, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0, marginLeft: 16 }}>
                      {uploading ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Processing…</> : uploaded ? <><CheckCircle2 size={14} /> Uploaded</> : <><Upload size={14} /> Upload CSV</>}
                    </button>
                  </div>
                  {uploaded && (
                    <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, background: C.greenLight, border: `1px solid ${C.green}30`, fontSize: 12, color: C.green, fontWeight: 600 }}>
                      ✓ 12 new numbers added, 0 deactivated. Registry updated.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnersView() {
  const [search, setSearch]   = useState("");
  const [filterC, setFc]      = useState("ALL");
  const [filterCat, setFcat]  = useState("ALL");
  const [filterSt, setFst]    = useState("ALL");

  const cats = ["ALL", ...Array.from(new Set(PARTNERS.map(p => p.category))).sort()];

  const filtered = useMemo(() => PARTNERS.filter(p => {
    if (filterC !== "ALL" && p.country !== filterC) return false;
    if (filterCat !== "ALL" && p.category !== filterCat) return false;
    if (filterSt !== "ALL" && p.status !== filterSt) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s)) return false;
    }
    return true;
  }), [search, filterC, filterCat, filterSt]);

  const totalScans = filtered.reduce((s, p) => s + p.scans, 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>Partners</div>
          <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>{PARTNERS.length} partners · {PARTNERS.filter(p => p.status === "active").length} active · {totalScans.toLocaleString()} total scans</div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 12, border: "none", background: C.ink, fontSize: 13, fontWeight: 700, cursor: "pointer", color: "white" }}>
          <Plus size={15} /> Add Partner
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.inkLight }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search partners…" style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 13, color: C.ink, outline: "none", background: "white", boxSizing: "border-box", fontFamily: "'Manrope', sans-serif" }} />
        </div>
        {[
          { value: filterC,   set: setFc,   opts: [["ALL","All Islands"],["BB","Barbados"],["GD","Grenada"],["AG","Antigua"]] },
          { value: filterCat, set: setFcat, opts: [["ALL","All Categories"], ...cats.filter(c => c !== "ALL").map(c => [c, c])] },
          { value: filterSt,  set: setFst,  opts: [["ALL","All Statuses"],["active","Active"],["inactive","Inactive"]] },
        ].map((f, i) => (
          <select key={i} value={f.value} onChange={e => f.set(e.target.value)} style={{ padding: "9px 14px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 13, color: C.ink, background: "white", outline: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
            {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Partner", "Category", "Island", "City", "Discount", "Scans", "Status", ""].map(h => (
                <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.inkSoft, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: 13, color: C.ink }}>{p.name}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>{p.category}</span>
                </td>
                <td style={{ padding: "12px 16px" }}><CountryBadge code={p.country} /></td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: C.inkSoft }}>{p.city}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.coral }}>{p.discount}%</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>{p.scans.toLocaleString()}</div>
                  <div style={{ width: Math.min(p.scans / 5.5, 100), height: 4, borderRadius: 2, background: C.teal, marginTop: 4, opacity: 0.6 }} />
                </td>
                <td style={{ padding: "12px 16px" }}><StatusBadge status={p.status} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button title="View" style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.inkSoft }}><Eye size={13} /></button>
                    <button title="Edit" style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.inkSoft }}><Pencil size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: C.inkSoft }}>No partners match your filters.</div>
        )}
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.inkSoft }}>{filtered.length} partners shown</div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: "-0.02em" }}>Analytics</div>
        <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>All islands · January – May 2026</div>
      </div>

      {/* Top KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <Stat label="Redemptions YTD"   value="3,127" delta={31}  icon={Zap}        color={C.teal}  />
        <Stat label="Savings Issued"    value="$48.3k" delta={28}  icon={TrendingUp} color={C.green} />
        <Stat label="Avg Savings/Visit" value="$15.44" delta={5}   icon={BarChart3}  color={C.amber} />
        <Stat label="Avg Visits/Member" value="17.4"   delta={9}   icon={Users}      color={C.coral} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Monthly redemptions */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 4 }}>Monthly Redemptions</div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 18 }}>All islands combined</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={REDEMPTION_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={C.border} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="redemptions" name="Redemptions" fill={C.teal} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Savings trend */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 4 }}>Savings Issued ($)</div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 18 }}>Total value delivered to members</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REDEMPTION_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.coral} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.coral} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.border} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="savings" name="Savings" stroke={C.coral} strokeWidth={2.5} fill="url(#sg)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category breakdown + Top partners */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 4 }}>By Category</div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 18 }}>Redemptions YTD</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BY_CATEGORY} layout="vertical" margin={{ top: 0, right: 0, left: 50, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: C.inkLight }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: C.inkSoft }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" name="Redemptions" radius={[0,6,6,0]} fill={C.teal} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top partners table */}
        <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 4 }}>Top Partners</div>
          <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 18 }}>By total redemptions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[...PARTNERS].sort((a,b) => b.scans - a.scans).slice(0, 8).map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < 7 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: i < 3 ? `${C.teal}20` : C.creamDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: i < 3 ? C.teal : C.inkSoft, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: C.inkSoft }}>{p.category}</div>
                </div>
                <CountryBadge code={p.country} />
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: C.ink }}>{p.scans}</div>
                  <div style={{ fontSize: 10, color: C.inkSoft }}>scans</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const NAV = [
    { id: "dashboard", label: "Dashboard",     icon: LayoutDashboard },
    { id: "members",   label: "Members",        icon: Users,    badge: "179" },
    { id: "orgs",      label: "Organisations",  icon: Building2, badge: "5"  },
    { id: "partners",  label: "Partners",       icon: MapPin,   badge: "16"  },
    { id: "analytics", label: "Analytics",      icon: BarChart3 },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Manrope', sans-serif", background: C.cream }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        input, select { font-family: 'Manrope', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #d4d8dc; border-radius: 4px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover { opacity: .85; }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: sidebarOpen ? 220 : 68, background: C.sidebar, display: "flex", flexDirection: "column", transition: "width .25s ease", flexShrink: 0, overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ padding: "22px 18px 18px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 28, flexShrink: 0, filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          {sidebarOpen && <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>Admin</div>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(n => {
            const Icon = n.icon;
            const active = section === n.id;
            return (
              <button key={n.id} onClick={() => setSection(n.id)} title={!sidebarOpen ? n.label : undefined} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: sidebarOpen ? "10px 12px" : "10px",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                borderRadius: 12, border: "none", cursor: "pointer",
                background: active ? "rgba(22,183,204,.15)" : "transparent",
                transition: "background .15s",
              }}>
                <Icon size={18} style={{ color: active ? C.teal : "rgba(255,255,255,.45)", flexShrink: 0 }} />
                {sidebarOpen && (
                  <>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "white" : "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>{n.label}</span>
                    {n.badge && <span style={{ padding: "1px 7px", borderRadius: 100, background: "rgba(255,255,255,.1)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.5)" }}>{n.badge}</span>}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <button onClick={() => setSidebarOpen(s => !s)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "9px", borderRadius: 10, border: "none", background: "rgba(255,255,255,.05)", cursor: "pointer", color: "rgba(255,255,255,.4)" }}>
            <Menu size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.inkLight }} />
              <input placeholder="Quick search…" style={{ padding: "8px 12px 8px 32px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, color: C.ink, outline: "none", width: 240, fontFamily: "'Manrope', sans-serif" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={{ position: "relative", width: 36, height: 36, borderRadius: 10, border: `1px solid ${C.border}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.inkSoft }}>
              <Bell size={16} />
              <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: C.coral, border: "2px solid white" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white" }}>A</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>Admin</div>
                <div style={{ fontSize: 10, color: C.inkSoft }}>HNI Caribbean</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}>
          {section === "dashboard" && <DashboardView />}
          {section === "members"   && <MembersView />}
          {section === "orgs"      && <OrgsView />}
          {section === "partners"  && <PartnersView />}
          {section === "analytics" && <AnalyticsView />}
        </div>
      </main>
    </div>
  );
}