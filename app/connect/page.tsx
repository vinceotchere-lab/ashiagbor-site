import ConnectForm from "@/components/connect/ConnectForm";
import ArrowUpRight from "@/components/shared/ArrowUpRight";

export const metadata={title:"Connect",description:"Contact Ing. Dr. George Ashiagbor for collaboration, consultancy, supervision, and speaking."};
const links=[
  ["01","Email","gashiagbor.canr@knust.edu.gh","mailto:gashiagbor.canr@knust.edu.gh"],
  ["02","LinkedIn","Professional network","https://www.linkedin.com/in/ing-ashiagbor"],
  ["03","Google Scholar","Citations & publications","https://scholar.google.com/citations?user=rw2tffMAAAAJ&hl=en"],
  ["04","ORCID","0000-0001-9215-9366","https://orcid.org/0000-0001-9215-9366"],
  ["05","Scopus","Author profile","https://www.scopus.com/authid/detail.uri?authorId=57190575322"],
  ["06","Web of Science","Author record","https://www.webofscience.com/wos/author/record/AAN-6626-2021"],
  ["07","KNUST","Official staff profile","https://webapps.knust.edu.gh/staff/dirsearch/profile/summary/c4d93e9be7a3.html"],
];
export default function ConnectPage(){return <main className="connect-page">
  <section className="site-shell connect-hero"><div><p className="section-label light">Open channel · Connect</p><h1>Serious questions deserve<br/><em>good company.</em></h1></div><p>For research collaboration, consultancy on forest monitoring and deforestation-free supply chains, graduate supervision, and speaking engagements.</p></section>
  <section className="site-shell connect-workspace">
    <aside><span className="chapter-mark">01 / DIRECT CHANNELS</span><div className="contact-links">{links.map(([code,label,value,href])=><a key={code} href={href} target={href.startsWith("mailto")?undefined:"_blank"} rel="noopener noreferrer"><span>{code}</span><div><strong>{label}</strong><small>{value}</small></div><b><ArrowUpRight className="w-3.5 h-3.5" /></b></a>)}</div><div className="office-card"><span>OFFICE COORDINATES</span><p>Department of Wildlife &amp; Range Management<br/>Faculty of Renewable Natural Resources<br/>KNUST · Kumasi, Ghana</p><small>06°40′N · 01°34′W</small></div></aside>
    <div><span className="chapter-mark">02 / WRITE A NOTE</span><ConnectForm/></div>
  </section>
  </main>}
