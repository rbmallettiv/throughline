import "./globals.css";
import { config } from "../lib/config";

export const metadata = {
  title: `${config.brand} — ${config.tagline}`,
  description:
    "A reading program that turns any goal into a curated book list and compiles your notes into a point of view.",
  appleWebApp: {
    capable: true,
    title: config.brand,
    statusBarStyle: "default",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#1e5b54",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
