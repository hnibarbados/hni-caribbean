export default function AdminPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      flexDirection: "column",
      gap: 16,
      padding: 40,
      backgroundColor: "#FBF7F1"
    }}>
      <img
        src="https://hnicaribbean.com/wp-content/uploads/2021/02/HNI-LOGO-full-png.png"
        alt="HNI"
        style={{ height: 44 }}
      />
      <p style={{ fontSize: 20, fontWeight: 700, color: "#0F1E2E" }}>
        Admin Dashboard
      </p>
      <p style={{ color: "#3A4A5C", fontSize: 14, maxWidth: 400, textAlign: "center", lineHeight: 1.7 }}>
        Coming soon. The full dashboard will be connected here.
      </p>
    </div>
  );
}