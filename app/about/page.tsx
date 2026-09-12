import Image from "next/image";
import Link from "next/link";
import DomainEmblem, { type DomainKey } from "@/components/shared/DomainEmblem";

export const metadata = { title:"Profile", description:"Biography, education, and appointments of Ing. Dr. George Ashiagbor, KNUST geospatial scientist." };
const roles:{title:string;org:string;code:string;domain:DomainKey}[]=[
  {title:"Senior Lecturer",org:"Wildlife & Range Management · KNUST",code:"ACA",domain:"forest"},
  {title:"Remote Sensing Analyst",org:"EUDR Map Validation · European Forest Institute",code:"EUDR",domain:"remote-sensing"},
  {title:"Deputy Coordinator",org:"MSc Geo-Information for Natural Resources",code:"MSc",domain:"wetland"},
  {title:"Co-PI / RS–GIS Lead",org:"FRAME-Cocoa · APNI / CSIR-SRI",code:"PI",domain:"cocoa"},
];
const education=[
  ["2020","PhD · Geomatic Engineering","KNUST, Kumasi"],["2019","Forest Degradation Mapping","University of Edinburgh, UK"],["2018","SAR & Microwave Radar","University of Leicester, UK"],["2011","MPhil · Geomatic Engineering","KNUST, Kumasi"],["2007","BSc · Geodetic Engineering","KNUST, Kumasi"],
];

export default function AboutPage(){return <main className="profile-page">
  <section className="site-shell profile-hero">
    <div className="profile-title"><p className="section-label">Profile · The observer</p><h1>Grounded in Ghana.<br /><em>Looking from orbit.</em></h1><p className="profile-deck">Ing. Dr. George Ashiagbor is a geospatial scientist whose work makes environmental change visible—and therefore possible to act upon.</p></div>
    <div className="profile-image"><Image src="/images/ghana_satellite_canopy.jpg" alt="Satellite canopy imagery of Ghana's High Forest Zone" fill sizes="(max-width:900px) 100vw, 42vw" className="object-cover"/><div className="profile-image-grid"/><span>HIGH FOREST ZONE · GHANA<br/>GROUND / ORBIT / POLICY</span></div>
    <div className="profile-seal"><strong>PhD</strong><span>GEOMATIC<br/>ENGINEERING</span><small>KNUST · 2020</small></div>
  </section>

  <section className="profile-statement"><div className="site-shell profile-statement-grid"><span className="chapter-mark">01 / POSITION</span><h2>His work lives in the distance between <em>what a satellite sees</em> and <em>what a landscape means.</em></h2><div><p>Across Ghana and West Africa, Dr. Ashiagbor applies multispectral imagery, synthetic aperture radar, GIS, and field validation to forests, cocoa systems, wetlands, wildlife habitats, and changing cities.</p><p>That practice is deliberately applied: research becomes teaching, institutional capability, map-validation protocols, and evidence for deforestation-free commodity policy.</p></div></div></section>

  <section className="site-shell roles-section"><div className="section-heading"><div><p className="section-label">Current appointments</p><h2>Four roles.<br/><em>One through-line.</em></h2></div><p>Research, teaching, programme leadership, and international policy work converge around one question: how can spatial evidence serve the living landscape?</p></div><div className="roles-grid">{roles.map((role,index)=><article key={role.code}><span>0{index+1} / {role.code}</span><DomainEmblem domain={role.domain} size={44}/><h3>{role.title}</h3><p>{role.org}</p></article>)}</div></section>

  <section className="formation-section"><div className="site-shell formation-grid"><div className="formation-intro"><span>02 / FORMATION</span><p className="section-label light">Degrees & specialist training</p><h2>A discipline refined<br/><em>across borders.</em></h2><p>From geodetic foundations in Kumasi to forest degradation and radar training in the United Kingdom.</p></div><ol>{education.map(([year,title,org],index)=><li key={title}><span>{year}</span><i>{String(index+1).padStart(2,"0")}</i><div><h3>{title}</h3><p>{org}</p></div></li>)}</ol></div></section>

  <section className="site-shell profile-close"><div><p className="section-label">Professional practice</p><h2>Engineering rigour.<br/>Ecological responsibility.</h2></div><div><p>Member of the Ghana Institution of Engineers and the Ghana Geospatial Society. Working in English, Ga/Dangme, and Twi.</p><div><Link href="/publications" className="button-primary">Open research archive <span>↗</span></Link><Link href="/connect" className="ink-link">Discuss a collaboration →</Link></div></div></section>
  </main>}
