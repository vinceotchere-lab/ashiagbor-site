import Link from "next/link";
import SiteLogo from "./SiteLogo";
import ArrowUpRight from "../shared/ArrowUpRight";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <SiteLogo size={58} showText inverse />
            <p>Spatial evidence for forests, farms, wetlands, and the people whose futures depend on them.</p>
          </div>
          <div className="footer-index">
            <span>Site index</span>
            <Link href="/about">Profile</Link>
            <Link href="/map">Field Atlas</Link>
            <Link href="/publications">Research</Link>
            <Link href="/timeline">Journey</Link>
          </div>
          <div className="footer-contact">
            <span>Based at</span>
            <p>KNUST · Kumasi, Ghana<br />06°40′N · 01°34′W</p>
            <a href="mailto:gashiagbor.canr@knust.edu.gh" className="inline-flex items-center gap-1">
              <span>gashiagbor.canr@knust.edu.gh</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="footer-base">
          <div className="footer-meta">
            <span>© {new Date().getFullYear()} Ing. Dr. George Ashiagbor</span>
            <span className="footer-sep">·</span>
            <span>Observe · Understand · Steward</span>
          </div>

          <a
            href="https://bitshiftdevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-creator"
            aria-label="Engineered by BitShift (bitshiftdevs.com)"
          >
            <span className="creator-label">Crafted with precision by</span>
            <span className="creator-badge">
              <img
                src="/images/bitshift.jpg"
                alt="BitShift Logo"
                className="creator-logo"
              />
              <span className="creator-brand">BitShift</span>
              <span className="creator-arrow"><ArrowUpRight className="w-2.5 h-2.5" /></span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
