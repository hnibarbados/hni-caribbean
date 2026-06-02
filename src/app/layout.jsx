import "./globals.css";

export const metadata = {
  title: "HNI Caribbean – Live well. Spend less.",
  description: "Your digital health and wellness membership card across Barbados, Grenada, and Antigua.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HNI Caribbean",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "HNI Caribbean",
    title: "HNI Caribbean – Live well. Spend less.",
    description: "Instant savings at 100+ health and wellness partners across the Caribbean.",
  },
};

export const viewport = {
  themeColor: "#16B7CC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
