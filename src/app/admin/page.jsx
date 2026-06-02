"use client";
// Admin dashboard — full implementation in HNIAdmin.jsx artifact.
// Paste the HNIAdmin.jsx component body here, or import it below.
// For now this re-exports the full standalone version as a route.
import dynamic from "next/dynamic";
const AdminDashboard = dynamic(() => import("../../../components/AdminDashboard"), { ssr: false });
export default function AdminPage() { return <AdminDashboard />; }
