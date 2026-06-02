"use client";
// ─────────────────────────────────────────────────────────────────
// Full admin dashboard — paste the complete HNIAdmin.jsx code here.
// This file is intentionally left as a placeholder so the project
// compiles. Copy the body of HNIAdmin.jsx (from the earlier artifact
// in this conversation) into this file to activate the dashboard.
// ─────────────────────────────────────────────────────────────────
import { C } from "../lib/constants";
export default function AdminDashboard() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.cream, fontFamily: "'Manrope',sans-serif", flexDirection: "column", gap: 16, padding: 40 }}>
      <img src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png" alt="HNI" style={{ height: 44 }} />
      <p style={{ color: "#0F1E2E", fontSize: 18, fontWeight: 700 }}>Admin Dashboard</p>
      <p style={{ color: "#3A4A5C", fontSize: 14, maxWidth: 420, textAlign: "center", lineHeight: 1.65 }}>
        Copy the full HNIAdmin.jsx artifact content from the conversation into <code>src/components/AdminDashboard.jsx</code> to activate the dashboard. See README for instructions.
      </p>
    </div>
  );
}
