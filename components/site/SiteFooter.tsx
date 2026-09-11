import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/map", label: "Research Atlas" },
  { href: "/publications", label: "Publications" },
  { href: "/timeline", label: "Timeline" },
  { href: "/connect", label: "Connect" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#dce5e9] bg-[#f3f6f8]">
      <div className="site-shell grid gap-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="font-display text-xl font-semibold tracking-[-0.05em] text-ink">
            Ing. Dr. George Ashiagbor
          </p>
          <p className="mt-2 text-sm text-[#59656d]">KNUST · GIS &amp; Remote Sensing</p>
          <a
            href="mailto:gashiagbor.canr@knust.edu.gh"
            className="mt-3 inline-block text-sm font-medium text-ink hover:text-[#d96b28]"
          >
            gashiagbor.canr@knust.edu.gh
          </a>
        </div>

        <div className="md:text-right">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-[#59656d] md:justify-end">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
