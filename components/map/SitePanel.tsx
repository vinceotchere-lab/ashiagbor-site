"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DomainEmblem, { type DomainKey } from "../shared/DomainEmblem";
import ArrowUpRight from "../shared/ArrowUpRight";

export type StudySite = {
  id: string;
  name: string;
  region: string;
  coords: [number, number];
  category: string;
  period: string;
  summary: string;
  themes: string[];
  publications: string[];
};

export type LinkedPub = { id: string; title: string; year: number; doi?: string };

export const CATEGORY_STYLES: Record<string, { label: string; color: string; domain: DomainKey }> = {
  "cocoa-forest": { label: "Cocoa–Forest Mosaic", color: "#e85d2a", domain: "cocoa" },
  forest: { label: "Forest Reserve Canopy", color: "#4f8a68", domain: "forest" },
  wetland: { label: "Wetland & Coastal Lagoon", color: "#55a3aa", domain: "wetland" },
  wildlife: { label: "Wildlife Conservation Area", color: "#87a35a", domain: "forest" },
  urban: { label: "Urban & Peri-Urban Zone", color: "#bf784b", domain: "soil" },
  savanna: { label: "Savanna & Riparian Basin", color: "#d19a54", domain: "soil" },
};

const coord = (v: number, pos: string, neg: string) =>
  `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;

export default function SitePanel({
  site,
  pubs,
  onClose,
}: {
  site: StudySite | null;
  pubs: LinkedPub[];
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const category = site ? CATEGORY_STYLES[site.category] : null;

  useEffect(() => {
    setIsExpanded(false);
  }, [site?.id]);

  if (!site) return null;

  return (
    <AnimatePresence>
      <motion.aside
        key={site.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25 }}
        className={`site-dossier ${isExpanded ? "is-expanded" : "is-collapsed"}`}
        style={{ "--dossier-accent": category?.color ?? "#e85d2a" } as React.CSSProperties}
      >
        <div className="dossier-top">
          <span className="dossier-heading-code">FIELD DOSSIER / {site.id.replaceAll("-", " ")}</span>
          <div className="dossier-actions">
            <button
              type="button"
              className="dossier-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Minimize dossier" : "Expand full dossier"}
            >
              {isExpanded ? "MINIMIZE ▾" : "FULL EVIDENCE ▴"}
            </button>
            <button type="button" onClick={onClose} aria-label="Close field dossier">
              CLOSE ×
            </button>
          </div>
        </div>

        <div className="dossier-title">
          <DomainEmblem domain={category?.domain ?? "forest"} size={34} />
          <div>
            <small>{category?.label}</small>
            <h3>{site.name}</h3>
          </div>
        </div>

        <div className="dossier-coordinates">
          <span>{coord(site.coords[0], "N", "S")}</span>
          <span>{coord(site.coords[1], "E", "W")}</span>
          <span>{site.period}</span>
        </div>

        <div className="dossier-expandable-content">
          <p className="dossier-summary">{site.summary}</p>
          <div className="dossier-themes">
            {site.themes.map((theme) => (
              <span key={theme}>#{theme}</span>
            ))}
          </div>
          {pubs.length > 0 && (
            <div className="dossier-pubs">
              <span>ASSOCIATED EVIDENCE · {pubs.length}</span>
              {pubs.map((pub) =>
                pub.doi ? (
                  <a
                    key={pub.id}
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>{pub.year}</b>
                    {pub.title}
                    <i><ArrowUpRight className="w-2.5 h-2.5" /></i>
                  </a>
                ) : (
                  <p key={pub.id}>
                    <b>{pub.year}</b>
                    {pub.title}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

