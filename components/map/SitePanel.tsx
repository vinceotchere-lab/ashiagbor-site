"use client";

import { motion, AnimatePresence } from "framer-motion";

export type StudySite = {
  id: string;
  name: string;
  region: string;
  coords: [number, number];
  category: string;
  period: string;
  summary: string;
  themes: string[];
  publications: string[]; // ids from publications.json
};

export const CATEGORY_STYLES: Record<string, { label: string; color: string }> = {
  "cocoa-forest": { label: "Cocoa–forest mosaic", color: "#d97706" },
  forest: { label: "Forest reserve", color: "#047857" },
  wetland: { label: "Wetland & lagoon", color: "#0284c7" },
  wildlife: { label: "Wildlife area", color: "#7c3aed" },
  urban: { label: "Urban landscape", color: "#dc2626" },
  savanna: { label: "Savanna & rivers", color: "#ca8a04" },
};

export type LinkedPub = { id: string; title: string; year: number; doi?: string };

const fmtCoord = (v: number, pos: string, neg: string) =>
  `${Math.abs(v).toFixed(2)}° ${v >= 0 ? pos : neg}`;

type Props = {
  site: StudySite | null;
  pubs: LinkedPub[];
  onClose: () => void;
};

export default function SitePanel({ site, pubs, onClose }: Props) {
  return (
    <AnimatePresence>
      {site && (
        <motion.aside
          key={site.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-3 bottom-3 z-[1100] max-h-[55%] overflow-y-auto rounded-xl border border-neutral-200 bg-white/95 p-5 shadow-xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[380px]"
        >
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="absolute right-3 top-3 rounded-full bg-[#f3f6f8] px-2.5 py-1 text-xs font-medium text-[#59656d] hover:bg-[#eaf2f5]"
          >
            Close
          </button>

          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
            style={{ background: CATEGORY_STYLES[site.category]?.color ?? "#525252" }}
          >
            {CATEGORY_STYLES[site.category]?.label ?? site.category}
          </span>

          <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.04em] text-[#111111]">
            {site.name}
          </h3>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#59656d]">
            {site.region} · {fmtCoord(site.coords[0], "N", "S")},{" "}
            {fmtCoord(site.coords[1], "E", "W")} · {site.period}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-[#59656d]">
            {site.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {site.themes.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#f3f6f8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#59656d]"
              >
                #{t}
              </span>
            ))}
          </div>

          {pubs.length > 0 && (
            <div className="mt-4 border-t border-[#dce5e9] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#59656d]">
                Related publications
              </p>
              <ul className="mt-2 space-y-2">
                {pubs.map((p) => (
                  <li key={p.id} className="text-sm leading-snug text-[#59656d]">
                    {p.doi ? (
                      <a
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#111111] hover:text-[#d96b28]"
                      >
                        {p.title}
                      </a>
                    ) : (
                      <span className="font-medium text-[#111111]">{p.title}</span>
                    )}
                    <span className="ml-1 text-[10px] uppercase tracking-[0.12em] text-[#59656d]">({p.year})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
