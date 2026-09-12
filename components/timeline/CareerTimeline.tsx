"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import rawTimeline from "./timeline.json";
import DomainEmblem, { DomainKey } from "../shared/DomainEmblem";

type Milestone = {
  id: string;
  year: number;
  period: string;
  category: "career" | "education" | "project";
  title: string;
  org: string;
  description: string;
  current?: boolean;
  highlight?: boolean;
};

const milestones = (rawTimeline as Milestone[]).sort((a, b) => b.year - a.year);

const CATEGORY_DOMAINS: Record<Milestone["category"], DomainKey> = {
  career: "forest",
  education: "remote-sensing",
  project: "cocoa",
};

const CATEGORY_STYLES: Record<
  Milestone["category"],
  { label: string; color: string; bg: string }
> = {
  career: {
    label: "Academic & Career",
    color: "#1e7a4c",
    bg: "#e9f1ed",
  },
  education: {
    label: "Degrees & Certifications",
    color: "#5f5da9",
    bg: "#eceaf7",
  },
  project: {
    label: "Initiatives & Consultancies",
    color: "#d96b28",
    bg: "#f4e0d3",
  },
};

type Filter = "all" | Milestone["category"];

export default function CareerTimeline() {
  const [filter, setFilter] = useState<Filter>("all");
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const visible = useMemo(
    () => (filter === "all" ? milestones : milestones.filter((m) => m.category === filter)),
    [filter]
  );

  return (
    <section className="journey-page mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <header className="journey-header mb-8 text-center">
        <p className="section-label inline-flex">Chronological Record</p>
        <h1 className="interior-title mt-4 font-display text-3xl font-bold tracking-[-0.05em] text-ink sm:text-4xl md:text-5xl">
          A career built in <em>layers.</em>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#59656d]">
          From foundational geomatic engineering in Kumasi to national EUDR policy mapping and
          international forest monitoring — 18+ years of applied geospatial science in Ghana.
        </p>
      </header>

      <div className="journey-stats"><div><span>2007</span><small>first coordinate</small></div><div><span>18+</span><small>years in practice</small></div><div><span>17</span><small>recorded milestones</small></div><div><span>NOW</span><small>active fieldwork</small></div></div>

      {/* Category Filter Chips */}
      <div className="journey-filters mb-12 flex flex-wrap justify-center gap-2">
        {(["all", "career", "project", "education"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all ${
              filter === f
                ? "bg-[#111111] text-white shadow-sm"
                : "border border-[#dce5e9] bg-white text-[#59656d] hover:border-[#111111] hover:text-[#111111]"
            }`}
          >
            {f !== "all" && (
              <DomainEmblem domain={CATEGORY_DOMAINS[f]} size={16} />
            )}
            <span>{f === "all" ? "All Milestones" : CATEGORY_STYLES[f].label}</span>
          </button>
        ))}
      </div>

      {/* ── The Hanging Scroll Architecture ── */}
      <div className="journey-scroll relative mx-auto max-w-4xl">
        {/* Top Hanging Rod with Finials */}
        <div className="scroll-rod mx-4 sm:mx-8 mb-1" />

        {/* Parchment Manuscript Body */}
        <div className="scroll-parchment mx-4 sm:mx-8 px-4 sm:px-10 py-10">
          <div ref={trackRef} className="relative">
            {/* Center Spine Track Line */}
            <div className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 rounded bg-[#d8ccb4] md:left-1/2" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute bottom-0 left-5 top-0 w-0.5 origin-top -translate-x-1/2 rounded bg-gradient-to-b from-[#d96b28] via-[#1e7a4c] to-[#5f5da9] md:left-1/2"
            />

            <div className="space-y-12">
              {visible.map((m, i) => {
                const style = CATEGORY_STYLES[m.category];
                const domainKey = CATEGORY_DOMAINS[m.category];
                const leftSide = i % 2 === 0;

                return (
                  <div
                    key={m.id}
                    className={`relative md:flex ${
                      leftSide ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Node Emblem Stamp on Spine */}
                    <div
                      className="absolute left-5 top-6 z-10 flex -translate-x-1/2 items-center justify-center md:left-1/2"
                      title={style.label}
                    >
                      <div className="rounded-full border-2 border-white shadow-md bg-white p-0.5">
                        <DomainEmblem domain={domainKey} size={26} />
                      </div>
                    </div>

                    {/* Milestone Manuscript Card */}
                    <motion.article
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`reticle-box ml-12 rounded-xl border border-[#d8ccb4] bg-[#fbf7ee] p-5 shadow-xs transition-all hover:border-[#111111] hover:shadow-sm md:ml-0 md:w-[calc(50%-2.5rem)]`}
                      style={{
                        borderLeftWidth: leftSide ? "3px" : "1px",
                        borderRightWidth: !leftSide ? "3px" : "1px",
                        borderColor: m.highlight ? style.color : "#d8ccb4",
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xl font-bold tabular-nums text-ink">
                            {m.year}
                          </span>
                          <span className="font-mono text-xs text-[#59656d]">
                            {m.period}
                          </span>
                        </div>

                        {m.current && (
                          <span className="rounded-full bg-[#d96b28] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: style.color }}>
                        {style.label}
                      </div>

                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink">
                        {m.title}
                      </h3>

                      <p className="mt-0.5 font-mono text-xs font-semibold text-[#59656d]">
                        {m.org}
                      </p>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#59656d]">
                        {m.description}
                      </p>
                    </motion.article>
                  </div>
                );
              })}
            </div>

            {/* End Cap */}
            <div className="relative mt-12 flex md:justify-center">
              <span className="ml-5 -translate-x-1/2 rounded-full border border-dashed border-[#b8aa90] bg-[#fdfaf5] px-4 py-1.5 font-mono text-xs text-[#59656d] md:ml-0 md:translate-x-0">
                Active Research &amp; Field Work Continues
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Weighted Roller Rod with Finials */}
        <div className="scroll-rod mx-4 sm:mx-8 mt-1" />
      </div>
    </section>
  );
}
