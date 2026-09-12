import Link from "next/link";
import SiteLogo from "./SiteLogo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div><SiteLogo size={58} showText inverse /><p>Spatial evidence for forests, farms, wetlands, and the people whose futures depend on them.</p></div>
          <div className="footer-index"><span>Site index</span><Link href="/about">Profile</Link><Link href="/map">Field Atlas</Link><Link href="/publications">Research</Link><Link href="/timeline">Journey</Link></div>
          <div className="footer-contact"><span>Based at</span><p>KNUST · Kumasi, Ghana<br />06°40′N · 01°34′W</p><a href="mailto:gashiagbor.canr@knust.edu.gh">gashiagbor.canr@knust.edu.gh ↗</a></div>
        </div>
        <div className="footer-base"><span>© {new Date().getFullYear()} Ing. Dr. George Ashiagbor</span><span>Observe · Understand · Steward</span></div>
      </div>
    </footer>
  );
}
