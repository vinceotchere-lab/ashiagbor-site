import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Biography, education, and professional memberships of Ing. Dr. George Ashiagbor, Senior Lecturer in GIS and Remote Sensing at KNUST, Ghana.",
};

const EDUCATION = [
  { year: "2020", title: "PhD, Geomatic Engineering", org: "KNUST, Kumasi" },
  { year: "2019", title: "Forest Degradation Mapping (training)", org: "University of Edinburgh, UK" },
  { year: "2018", title: "SAR Training (certificate)", org: "University of Leicester, UK" },
  { year: "2011", title: "MPhil, Geomatic Engineering", org: "KNUST, Kumasi" },
  { year: "2007", title: "BSc, Geodetic (Geomatic) Engineering", org: "KNUST, Kumasi" },
];

const CURRENT_ROLES = [
  { role: "Senior Lecturer", org: "Dept. of Wildlife & Range Management, KNUST", tone: "bg-[#e9f1ed] text-[#1e7a4c]" },
  { role: "Remote Sensing Analyst, EUDR Map Validation", org: "European Forest Institute", tone: "bg-[#e8f2f8] text-[#2b83b8]" },
  { role: "Deputy Coordinator, MSc Geo-Information (NRM)", org: "KNUST", tone: "bg-[#eceaf7] text-[#5f5da9]" },
  { role: "Co-PI / RS-GIS Lead, FRAME-Cocoa", org: "APNI · CSIR-Soil Research Institute", tone: "bg-[#f5e8dc] text-[#b76a25]" },
];

export default function AboutPage() {
  return (
    <main className="site-shell py-10 md:py-16">
      <section>
        <p className="section-label">About</p>
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-4xl md:text-5xl">
          A geospatial scientist, rooted in Ghana&apos;s landscapes
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6 text-base leading-relaxed text-[#59656d]">
            <div className="data-panel overflow-hidden p-3">
              <svg viewBox="0 0 640 280" aria-label="Abstract map visual" className="w-full rounded-[12px]">
                <rect width="640" height="280" fill="#F8FAFB" />
                <g stroke="#dce5e9" strokeWidth="1">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={18 + i * 22} x2="640" y2={18 + i * 22} />
                  ))}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <line key={`v-${i}`} x1={18 + i * 40} y1="0" x2={18 + i * 40} y2="280" />
                  ))}
                </g>
                <g fill="none" stroke="#111111" strokeWidth="1.4">
                  <path d="M110 90 L150 70 L210 90 L265 78 L330 96 L404 80 L470 92 L515 116 L492 146 L448 178 L402 198 L365 236 L310 246 L248 228 L224 198 L178 180 L138 154 L114 116 Z" fill="#EAF2F5" />
                </g>
                <g fill="#DCE5E9" stroke="#111111" strokeWidth="1.1">
                  <path d="M150 138 L210 120 L220 168 L178 176 Z" />
                  <path d="M285 120 L348 145 L332 196 L280 206 Z" />
                  <path d="M408 120 L468 138 L450 176 L405 170 Z" />
                </g>
                <g fill="#111111" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">
                  <text x="194" y="94">Juabeso-Bia</text>
                  <text x="280" y="118">Kumasi</text>
                  <text x="408" y="118">Mole</text>
                  <text x="260" y="232">Keta Lagoon</text>
                </g>
              </svg>
            </div>

            <p>
              <strong className="font-semibold text-ink">Dr. George Ashiagbor</strong> is a Senior Lecturer at the Faculty of Renewable Natural Resources, Kwame Nkrumah University of Science and Technology (KNUST). A GIS and Remote Sensing analyst, his research uses satellite and geospatial methods to study landscape-level change and the relationships between people and their environments — spanning deforestation, forest monitoring, landscape ecology, conservation, land use/cover change, and environmental modelling.
            </p>
            <p>
              He has developed methodologies for accurately mapping Ghana&apos;s landscape and served as the Remote Sensing Technical Lead for the Forest 2020 Ghana project, a collaboration between the Forestry Commission of Ghana and Ecometrica with support from the UK Space Agency. The work centred on distinguishing cocoa farms from natural forest in the cocoa–forest mosaic landscape.
            </p>
            <p>
              His work on commodity-driven deforestation, particularly in cocoa, oil palm, and rubber systems, is relevant to discussions on the European Union&apos;s Deforestation Regulation (EUDR). He currently validates forest/non-forest maps with the European Forest Institute and collaborates with CSIR-Soil Research Institute on the APNI-funded FRAME-Cocoa project for site-specific smallholder cocoa management.
            </p>

            <div className="pt-2">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.05em] text-ink">
                Education and training
              </h2>
              <ul className="mt-5 space-y-3">
                {EDUCATION.map((item) => (
                  <li key={item.title} className="flex gap-4 border-b border-[#dce5e9] py-3 last:border-b-0">
                    <span className="w-16 shrink-0 font-display text-lg font-semibold text-[#1e7a4c]">
                      {item.year}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="text-sm text-[#59656d]">{item.org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="data-panel p-5">
              <h2 className="font-display text-xl font-semibold tracking-[-0.04em] text-ink">
                Current roles
              </h2>
              <ul className="mt-4 space-y-3">
                {CURRENT_ROLES.map((role) => (
                  <li key={role.role}>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${role.tone}`}>
                      {role.role}
                    </span>
                    <p className="mt-2 text-sm text-[#59656d]">{role.org}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="data-panel p-5">
              <h2 className="font-display text-xl font-semibold tracking-[-0.04em] text-ink">
                Memberships and languages
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-[#59656d]">
                <li>Ghana Institution of Engineers (GhIE)</li>
                <li>Ghana Geospatial Society</li>
                <li>English · Ga/Dangme · Twi</li>
              </ul>
            </div>

            <div className="data-panel bg-[#111111] p-5 text-white">
              <h2 className="font-display text-xl font-semibold tracking-[-0.04em]">Research focus</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Forest change and deforestation</li>
                <li>Cocoa landscapes and land use</li>
                <li>Wetlands and conservation</li>
                <li>Environmental modelling</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/publications" className="button-primary">Publications</Link>
                <Link href="/map" className="button-secondary border-white/30 bg-transparent text-white hover:bg-white/5">Atlas</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
