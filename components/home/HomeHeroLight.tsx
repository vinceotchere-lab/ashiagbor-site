import Link from "next/link";

const callouts = [
  { value: "37+", label: "Publications" },
  { value: "13", label: "Study sites" },
  { value: "h-index 14", label: "Research impact" },
  { value: "2007–Present", label: "Field & academic work" },
];

const legend = [
  { label: "Forest monitoring", color: "#1E7A4C" },
  { label: "Cocoa landscape", color: "#D96B28" },
  { label: "Wetland research", color: "#2B83B8" },
];

export default function HomeHeroLight() {
  return (
    <section className="site-shell pb-10 pt-10 md:pb-16 md:pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="section-label">Geospatial research · Ghana</p>

          <h1 className="mt-5 max-w-[620px] font-display text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.08em] text-ink sm:text-[4rem] lg:text-[5rem]">
            Reading Ghana&apos;s landscapes from space.
          </h1>

          <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-[#59656d] sm:text-lg">
            Ing. Dr. George Ashiagbor uses GIS and remote sensing to study forest change,
            cocoa landscapes, wetlands, and natural resource management in Ghana.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/map" className="button-primary">
              Explore the research
            </Link>
            <Link href="/publications" className="button-secondary">
              View publications
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-4">
            {callouts.map((item) => (
              <div key={item.label} className="min-w-[8.5rem]">
                <div className="font-display text-[1.65rem] font-semibold tracking-[-0.05em] text-ink">
                  {item.value}
                </div>
                <div className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-[#59656d]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-7 max-w-[42rem] text-sm leading-6 text-[#59656d]">
            KNUST · European Forest Institute · Forestry Commission of Ghana · CSIR-Soil Research Institute
          </p>
        </div>

        <div className="data-panel p-4 sm:p-5">
          <div className="rounded-[12px] border border-[#dce5e9] bg-[#f7fafb] p-3 sm:p-4">
            <svg viewBox="0 0 560 420" aria-label="Abstract geospatial map of Ghana" className="w-full">
              <rect x="0" y="0" width="560" height="420" fill="#F7FAFB" />
              <g stroke="#d1dfe6" strokeWidth="1">
                {Array.from({ length: 15 }).map((_, index) => (
                  <line key={`h-${index}`} x1="0" y1={26 + index * 24} x2="560" y2={26 + index * 24} />
                ))}
                {Array.from({ length: 18 }).map((_, index) => (
                  <line key={`v-${index}`} x1={18 + index * 30} y1="0" x2={18 + index * 30} y2="420" />
                ))}
              </g>

              <g fill="none" stroke="#94aab3" strokeWidth="1.3" strokeDasharray="4 6">
                <path d="M130 98 C170 70, 250 60, 320 85 S470 118, 505 170" />
                <path d="M95 160 C180 140, 210 150, 300 180 S430 210, 490 265" />
                <path d="M92 240 C155 225, 205 250, 260 280 S405 330, 500 312" />
              </g>

              <g>
                <path
                  d="M120 130 L170 110 L210 115 L260 90 L310 110 L350 120 L395 100 L440 120 L465 155 L435 190 L395 215 L368 255 L330 287 L280 305 L240 290 L205 315 L165 285 L135 238 L105 180 Z"
                  fill="#EAF2F5"
                  stroke="#111111"
                  strokeWidth="1.5"
                />
                <path
                  d="M210 135 L245 110 L270 122 L255 162 L225 175 Z"
                  fill="#DCE5E9"
                  stroke="#111111"
                  strokeWidth="1.2"
                />
                <path
                  d="M145 210 L175 185 L230 205 L215 250 L160 260 Z"
                  fill="#E9F1ED"
                  stroke="#111111"
                  strokeWidth="1.2"
                />
                <path
                  d="M325 130 L360 170 L345 220 L315 240 L280 210 L290 152 Z"
                  fill="#F4E0D3"
                  stroke="#111111"
                  strokeWidth="1.2"
                />
                <path
                  d="M236 265 L290 257 L320 285 L280 322 L240 305 Z"
                  fill="#E8F2F8"
                  stroke="#111111"
                  strokeWidth="1.2"
                />
              </g>

              <g fill="#111111" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">
                <text x="327" y="151">Kumasi</text>
                <text x="290" y="280">Keta Lagoon</text>
                <text x="128" y="215">Juabeso-Bia</text>
                <text x="410" y="250">Mole</text>
              </g>

              <g>
                <circle cx="335" cy="142" r="5.5" fill="#1E7A4C" />
                <circle cx="240" cy="245" r="5.5" fill="#2B83B8" />
                <circle cx="146" cy="223" r="5.5" fill="#D96B28" />
                <circle cx="425" cy="240" r="5.5" fill="#1E7A4C" />
              </g>

              <g fill="#59656D" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="0.12em">
                <text x="22" y="30">Selected study sites · Ghana</text>
                <text x="410" y="398">longitude</text>
                <text x="36" y="390">latitude</text>
              </g>
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {legend.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#dce5e9] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#111111]"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
