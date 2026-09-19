import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ing. Dr. George Ashiagbor — GIS & Remote Sensing Scientist",
    template: "%s — Ing. Dr. George Ashiagbor",
  },
  description:
    "Head of Department and Senior Lecturer at KNUST mapping Ghana's changing landscapes from space: deforestation, cocoa-forest mosaics, forest monitoring, and EUDR map validation.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <div className="min-h-screen">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
