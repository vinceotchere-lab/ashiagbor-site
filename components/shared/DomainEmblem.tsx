"use client";

import React from "react";

export type DomainKey = "forest" | "wetland" | "soil" | "cocoa" | "remote-sensing";

export interface DomainMeta {
  key: DomainKey;
  label: string;
  sublabel: string;
  color: string;
  bgSoft: string;
  borderSoft: string;
}

export const DOMAIN_METAS: Record<DomainKey, DomainMeta> = {
  forest: {
    key: "forest",
    label: "Forest & Biomass",
    sublabel: "Canopy dynamics & deforestation",
    color: "#1e7a4c",
    bgSoft: "#e9f1ed",
    borderSoft: "rgba(30, 122, 76, 0.25)",
  },
  wetland: {
    key: "wetland",
    label: "Wetlands & Water",
    sublabel: "Ramsar sites & coastal hydrology",
    color: "#2b83b8",
    bgSoft: "#e8f2f8",
    borderSoft: "rgba(43, 131, 184, 0.25)",
  },
  soil: {
    key: "soil",
    label: "Soil & Terrain",
    sublabel: "Land use change & geology",
    color: "#b76a25",
    bgSoft: "#f5e8dc",
    borderSoft: "rgba(183, 106, 37, 0.25)",
  },
  cocoa: {
    key: "cocoa",
    label: "Cocoa Landscapes",
    sublabel: "Agroforestry & EUDR compliance",
    color: "#d96b28",
    bgSoft: "#f4e0d3",
    borderSoft: "rgba(217, 107, 40, 0.25)",
  },
  "remote-sensing": {
    key: "remote-sensing",
    label: "Satellite Telemetry",
    sublabel: "Multispectral & SAR microwave radar",
    color: "#5f5da9",
    bgSoft: "#eceaf7",
    borderSoft: "rgba(95, 93, 169, 0.25)",
  },
};

export function resolveDomainFromTheme(theme: string): DomainKey {
  const t = theme.toLowerCase();
  if (t.includes("forest") || t.includes("deforest") || t.includes("wildlife")) return "forest";
  if (t.includes("wetland") || t.includes("water") || t.includes("hydrol") || t.includes("coastal")) return "wetland";
  if (t.includes("soil") || t.includes("erosion") || t.includes("land-use") || t.includes("geolog")) return "soil";
  if (t.includes("cocoa") || t.includes("eudr") || t.includes("agroforest") || t.includes("redd")) return "cocoa";
  return "remote-sensing";
}

interface DomainEmblemProps {
  domain: DomainKey;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export default function DomainEmblem({
  domain,
  size = 28,
  className = "",
  showLabel = false,
}: DomainEmblemProps) {
  const meta = DOMAIN_METAS[domain] ?? DOMAIN_METAS.forest;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className="flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 hover:scale-105"
        style={{
          width: size,
          height: size,
          backgroundColor: meta.bgSoft,
          border: `1px solid ${meta.borderSoft}`,
        }}
        title={meta.label}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          style={{ width: size * 0.65, height: size * 0.65 }}
          aria-hidden="true"
        >
          {/* FOREST: Botanical canopy spiral leaf form (inspired by the swirling leaf emblem) */}
          {domain === "forest" && (
            <g>
              <line x1="18" y1="32" x2="18" y2="10" stroke={meta.color} strokeWidth="2.2" strokeLinecap="round" />
              <path
                d="M18 20 Q9 15 8 7 Q16 8 18 19Z"
                fill={meta.color}
                opacity="0.9"
              />
              <path
                d="M18 20 Q27 15 28 7 Q20 8 18 19Z"
                fill={meta.color}
                opacity="0.9"
              />
              <path
                d="M18 14 Q14 7 18 4 Q22 7 18 14Z"
                fill={meta.color}
                opacity="0.75"
              />
              <circle cx="18" cy="20" r="1.5" fill="#ffffff" />
            </g>
          )}

          {/* WETLAND: Undulating mist and water wave contours (inspired by the mist/water wave emblem) */}
          {domain === "wetland" && (
            <g>
              <path
                d="M18 5 C18 5 9 16 9 23 A9 9 0 0 0 27 23 C27 16 18 5 18 5Z"
                fill={meta.color}
                opacity="0.85"
              />
              <path
                d="M6 26 Q12 23 18 26 T30 26"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M9 30 Q15 28 21 30 T31 30"
                stroke={meta.color}
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.6"
                fill="none"
              />
            </g>
          )}

          {/* SOIL & TERRAIN: Interlocking angular rock strata (inspired by the stone emblem) */}
          {domain === "soil" && (
            <g>
              <path
                d="M7 26 L29 26 L27 31 L9 31 Z"
                fill={meta.color}
                opacity="0.95"
              />
              <path
                d="M8 19 L28 19 L30 25 L6 25 Z"
                fill={meta.color}
                opacity="0.7"
              />
              <path
                d="M11 12 L25 12 L28 18 L8 18 Z"
                fill={meta.color}
                opacity="0.45"
              />
              <path
                d="M14 6 L22 6 L25 11 L11 11 Z"
                fill={meta.color}
                opacity="0.3"
              />
              {/* Fault line crack */}
              <line x1="19" y1="6" x2="17" y2="31" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
            </g>
          )}

          {/* COCOA LANDSCAPE: Aerodynamic seed vortex & cocoa pod form (inspired by sand/wind vortex) */}
          {domain === "cocoa" && (
            <g>
              <ellipse cx="18" cy="20" rx="9" ry="12" fill={meta.color} opacity="0.9" />
              <path
                d="M18 8 L18 32"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M13 10 C11 15 11 25 13 30"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
              />
              <path
                d="M23 10 C25 15 25 25 23 30"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
              />
              <path
                d="M18 8 C16 4 21 3 19 8"
                stroke="#8c3e10"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="23" cy="7" r="2.5" fill="#1e7a4c" />
            </g>
          )}

          {/* REMOTE SENSING: Satellite dish & microwave radar emission arcs (inspired by cloud/lightning) */}
          {domain === "remote-sensing" && (
            <g>
              <rect x="16" y="22" width="4" height="7" rx="1" fill={meta.color} />
              <line x1="13" y1="29" x2="23" y2="29" stroke={meta.color} strokeWidth="2" strokeLinecap="round" />
              <path
                d="M8 17 A12 12 0 0 1 28 17"
                fill="none"
                stroke={meta.color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M11 11 A10 10 0 0 1 25 11"
                fill="none"
                stroke={meta.color}
                strokeWidth="1.8"
                strokeDasharray="2 3"
                strokeLinecap="round"
              />
              <path
                d="M14 6 A8 8 0 0 1 22 6"
                fill="none"
                stroke={meta.color}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="18" cy="17" r="2.2" fill="#d96b28" />
            </g>
          )}
        </svg>
      </div>

      {showLabel && (
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-bold text-ink">{meta.label}</span>
          <span className="text-[10px] text-[#59656d]">{meta.sublabel}</span>
        </div>
      )}
    </div>
  );
}
