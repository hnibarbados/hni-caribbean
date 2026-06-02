// ─── HNI Design Tokens ───────────────────────────────────────────────────────
export const C = {
  teal:      "#16B7CC",
  tealDark:  "#0F8FA1",
  tealLight: "#E8F8FB",
  coral:     "#F25C54",
  coralLight:"#FEF2F2",
  green:     "#22C55E",
  greenLight:"#F0FDF4",
  amber:     "#F59E0B",
  amberLight:"#FFFBEB",
  cream:     "#FBF7F1",
  creamDark: "#F0EADF",
  ink:       "#0F1E2E",
  inkSoft:   "#3A4A5C",
  inkLight:  "#6B7B8E",
  sidebar:   "#0B1622",
  border:    "#EDF0F2",
};

export const FONT = "'Manrope', ui-sans-serif, system-ui, sans-serif";
export const DISPLAY_FONT = "'Fraunces', Georgia, serif";

export const COUNTRIES = [
  { code: "ALL", name: "All Islands" },
  { code: "BB",  name: "Barbados"    },
  { code: "GD",  name: "Grenada"     },
  { code: "AG",  name: "Antigua"     },
];

export const CATEGORIES = [
  "All Categories",
  "Dental",
  "Eye Care",
  "Fitness",
  "Medical",
  "Mental Health",
  "Organic Grocery",
  "Physiotherapy",
  "Restaurants & Cafés",
  "Spa & Wellness",
  "Yoga & Movement",
];

export const ORGS = [
  { id: "SAGICOR",  label: "Sagicor",            max: 100 },
  { id: "BIMAS",    label: "BIM Insurance",       max: 50  },
  { id: "GUARDIAN", label: "Guardian Life",       max: 75  },
  { id: "BHL",      label: "Barbados Health Ltd", max: 30  },
  { id: "NALICO",   label: "NALICO",              max: 60  },
];

export function isValidOrgNumber(orgId, numStr) {
  const n = parseInt(numStr, 10);
  if (isNaN(n) || n < 1) return false;
  const org = ORGS.find((o) => o.id === orgId);
  return org ? n <= org.max : false;
}
