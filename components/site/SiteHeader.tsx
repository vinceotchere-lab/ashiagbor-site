"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/map", label: "Research Atlas" },
  { href: "/publications", label: "Publications" },
  { href: "/timeline", label: "Timeline" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce5e9] bg-[#f3f6f8]/90 backdrop-blur-sm">
      <div className="site-shell flex items-center justify-between py-3.5">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-semibold tracking-[-0.05em] text-ink sm:text-lg">
            George Ashiagbor
          </span>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#59656d]">
            GIS &amp; Remote Sensing
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-ink" : "text-[#59656d] hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/connect" className="button-primary">
            Connect
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dce5e9] bg-white text-ink md:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-4 rounded-full bg-ink" />
            <span className="block h-0.5 w-4 rounded-full bg-ink" />
            <span className="block h-0.5 w-4 rounded-full bg-ink" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#dce5e9] bg-[#f3f6f8] md:hidden">
          <nav className="site-shell flex flex-col gap-1 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-2 py-2 text-sm font-medium ${
                    isActive ? "bg-white text-ink" : "text-[#59656d] hover:bg-white hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/connect"
              onClick={() => setIsOpen(false)}
              className="button-primary mt-2 w-fit"
            >
              Connect
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
