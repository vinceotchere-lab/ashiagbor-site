"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const signals = [["37+", "published works"], ["13", "field landscapes"], ["18+", "years of practice"]];

export default function HomeHeroLight() {
  return (
    <section className="hero-field">
      <Image src="/images/ghana-field-atlas.png" alt="An illustrated field atlas of Ghana's forests, farms and wetlands" fill sizes="100vw" className="hero-field-image" preload />
      <div className="hero-veil" />
      <div className="hero-contours" aria-hidden="true" />
      <div className="site-shell hero-content">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="hero-copy">
          <p className="hero-kicker"><span>GHA · EO/01</span> Senior Lecturer &amp; Geospatial Scientist</p>
          <h1>Seeing what the<br /><em>land remembers.</em></h1>
          <p className="hero-intro">Ing. Dr. George Ashiagbor reads Ghana’s changing landscapes from orbit—turning satellite signals into evidence for forests, cocoa farms, wetlands, and policy.</p>
          <div className="hero-actions"><Link href="/map" className="button-primary">Enter the field atlas <span>↗</span></Link><Link href="/about" className="hero-text-link">Meet the researcher <span>→</span></Link></div>
        </motion.div>
        <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .25 }} className="hero-readout">
          <span className="readout-label">Current signal</span><strong>EUDR forest / non-forest map validation</strong><small>European Forest Institute · 2024—present</small>
          <div className="signal-line"><i /><i /><i /><i /><i /></div>
        </motion.aside>
        <div className="hero-metrics">{signals.map(([value, label], index) => <div key={label}><span>0{index + 1}</span><strong>{value}</strong><small>{label}</small></div>)}</div>
        <div className="hero-coordinate">06°40′N / 01°34′W <span>↓</span></div>
      </div>
    </section>
  );
}
