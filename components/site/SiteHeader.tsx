"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SiteLogo from "./SiteLogo";
import ArrowUpRight from "../shared/ArrowUpRight";

const navItems = [
  { href: "/about", label: "Profile", code: "01" },
  { href: "/map", label: "Field Atlas", code: "02" },
  { href: "/publications", label: "Research", code: "03" },
  { href: "/timeline", label: "Journey", code: "04" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link href="/" aria-label="George Ashiagbor — home"><SiteLogo size={48} showText /></Link>
        <nav className={`primary-nav ${isOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""} onClick={() => setIsOpen(false)}>
              <span>{item.code}</span>{item.label}
            </Link>
          ))}
          <Link href="/connect" className="nav-contact" onClick={() => setIsOpen(false)}>Open a dialogue <span><ArrowUpRight className="w-3 h-3" /></span></Link>
        </nav>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}><span /><span /></button>
      </div>
    </header>
  );
}
