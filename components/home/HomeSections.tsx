"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import rawPubs from "@/components/publications/publications.json";
import type { Publication } from "@/components/publications/types";
import DomainEmblem, { type DomainKey } from "../shared/DomainEmblem";

const publications = rawPubs as Publication[];
const domains: { code: string; domain: DomainKey; title: string; focus: string; proof: string }[] = [
  { code: "A", domain: "forest", title: "Forest intelligence", focus: "Detecting canopy loss and degradation through multi-temporal Landsat and Sentinel-2 evidence.", proof: "14 works" },
  { code: "B", domain: "cocoa", title: "Cocoa landscapes", focus: "Separating agroforestry from natural forest to support traceable, deforestation-free supply chains.", proof: "9 works" },
  { code: "C", domain: "wetland", title: "Wetland signals", focus: "Using radar to reveal mangroves, lagoon change, and hydrology beneath persistent coastal cloud.", proof: "8 works" },
  { code: "D", domain: "soil", title: "Land & terrain", focus: "Modelling erosion, urban expansion, and land-use transitions to guide local decisions.", proof: "6 works" },
];
const fieldNotes = [
  { quote: "The next generation will always surpass the previous one.", voice: "Minato Namikaze", idea: "Mentorship is not an academic side-note. It is how African geospatial capacity becomes sovereign and durable." },
  { quote: "Regardless of our limitations, we can always be of some use.", voice: "Shikamaru Nara", idea: "A modest field plot, carefully observed, can change the interpretation of an entire satellite scene." },
  { quote: "The things that are most important aren't written in books.", voice: "Sakura Haruno", idea: "Remote sensing becomes meaningful when orbital data meets field experience, local knowledge, and the realities of place." },
];

export default function HomeSections() {
  const [note, setNote] = useState(0);
  const latest = publications.slice().sort((a, b) => b.year - a.year).slice(0, 3);
  return (
    <div className="home-story">
      <section className="site-shell thesis-section reveal-section">
        <div className="vertical-label">THE RESEARCH THESIS</div>
        <div className="thesis-number">01</div>
        <div className="thesis-copy"><p className="section-label">From pixel to policy</p><h2>A landscape is never<br />just a picture.</h2></div>
        <div className="thesis-body"><p>Every pixel can hold a forest edge, a cocoa farm, a wetland under pressure, or a policy decision waiting to be made.</p><p>Dr. Ashiagbor’s practice joins <strong>orbital observation</strong> with <strong>ground truth</strong>: seeing change, testing what the sensor suggests, and translating evidence into action.</p><Link href="/about" className="ink-link">Read the full profile <span>↗</span></Link></div>
      </section>

      <section className="domain-section">
        <div className="site-shell"><div className="section-heading"><div><p className="section-label light">The four territories</p><h2>One practice.<br /><em>Four living systems.</em></h2></div><p>Each territory has its own signal, method, and consequence. Together they form a long-term record of environmental change across Ghana.</p></div>
          <div className="domain-grid">{domains.map((item, index) => <motion.article key={item.code} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="domain-card"><span className="domain-code">FIELD / {item.code}</span><DomainEmblem domain={item.domain} size={54} /><h3>{item.title}</h3><p>{item.focus}</p><div><span>{item.proof}</span><Link href={`/publications`}>Open dossier ↗</Link></div></motion.article>)}</div>
        </div>
      </section>

      <section className="site-shell flagship-section">
        <div className="flagship-visual"><Image src="/images/ghana_satellite_infrared.jpg" alt="Infrared satellite view used for forest and cocoa landscape analysis" fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /><div className="scanline" /><span className="image-caption">SENTINEL-2 / FALSE COLOUR COMPOSITE<br />HIGH FOREST ZONE · 10M RESOLUTION</span></div>
        <div className="flagship-copy"><span className="chapter-mark">02 / DEFINING WORK</span><p className="section-label">Forest 2020 Ghana</p><h2>Teaching a satellite to tell cocoa from forest.</h2><p>As Remote Sensing Technical Lead, Dr. Ashiagbor helped develop Ghana’s harmonised cocoa-landscape classification—turning complex mosaic landscapes into evidence that institutions can use.</p><dl><div><dt>Role</dt><dd>Technical Lead</dd></div><div><dt>Partners</dt><dd>UK Space Agency · Ecometrica · Forestry Commission</dd></div><div><dt>Window</dt><dd>2017—2021</dd></div></dl><Link href="/timeline" className="button-primary">Follow the full journey <span>→</span></Link></div>
      </section>

      <section className="manuscript-section"><div className="site-shell manuscript-grid"><div className="manuscript-heading"><span>03 / SCHOLARLY RECORD</span><p className="section-label">Recent manuscripts</p><h2>Evidence,<br /><em>made public.</em></h2><Link href="/publications" className="ink-link">Search all {publications.length} works ↗</Link></div><div className="paper-list">{latest.map((pub, index) => <Link href="/publications" key={pub.id} className="paper-row"><span className="paper-index">{String(index + 1).padStart(2, "0")}</span><div><span>{pub.year} · {pub.journal}</span><h3>{pub.title}</h3><p>{pub.themes.slice(0, 3).join(" / ")}</p></div><b>↗</b></Link>)}</div></div></section>

      <section className="site-shell fieldnotes-section"><div className="fieldnotes-tabs">{fieldNotes.map((item, index) => <button key={item.voice} onClick={() => setNote(index)} className={note === index ? "active" : ""}><span>0{index + 1}</span>{item.voice}</button>)}</div><div className="fieldnotes-content"><div><p className="section-label">Notes in the margin</p><h2>Principles for<br />the long mission.</h2><p className="note-context">A quiet nod to a story about discipline, mentorship, and refusing to abandon the work.</p></div><AnimatePresence mode="wait"><motion.blockquote key={note} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span>“</span><p>{fieldNotes[note].quote}</p><cite>— {fieldNotes[note].voice}</cite><small>{fieldNotes[note].idea}</small></motion.blockquote></AnimatePresence></div></section>

      <section className="atlas-invite"><div className="site-shell"><span>13 SITES · 8 REGIONS · ONE LIVING ATLAS</span><h2>Do not take the map’s word for it.<br /><em>Enter the field.</em></h2><Link href="/map" className="button-primary">Explore Ghana’s study sites <span>↗</span></Link></div></section>
    </div>
  );
}
