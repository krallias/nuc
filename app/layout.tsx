import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Inter covers Greek; Space Grotesk does not -> Greek headings fall back to Inter (documented open item).
const inter = Inter({ subsets: ["latin", "greek"], variable: "--font-inter" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = { title: "NUC.", description: "Nuclear science & world platform" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
