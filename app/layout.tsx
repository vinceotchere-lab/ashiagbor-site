import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: {
    default: "Ing. Dr. George Ashiagbor — GIS & Remote Sensing Scientist",
    template: "%s — Ing. Dr. George Ashiagbor",
  },
  description:
    "Senior Lecturer at KNUST mapping Ghana's changing landscapes from space: deforestation, cocoa-forest mosaics, forest monitoring, and EUDR map validation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-[#f3f6f8] text-ink antialiased">
        <SiteHeader />
        <div className="min-h-screen">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
