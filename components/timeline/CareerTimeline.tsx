"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import rawTimeline from "./timeline.json";

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

const CATEGORY_STYLES: Record<
  Milestone["category"],
  { label: string; dot: string; chip: string }
> = {
  career: {
    label: "Career",
    dot: "#047857",
    chip: "bg-emerald-100 text-emerald-800",
  },
  education: {
    label: "Education & training",
    dot: "#0284c7",
    chip: "bg-sky-100 text-sky-800",
  },
  project: {
    label: "Projects & consultancies",
    dot: "#d97706",
    chip: "bg-amber-100 text-amber-800",
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
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <header className="mb-8 text-center">
        <p className="section-label inline-flex">The journey</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-4xl md:text-5xl">
          Career and research timeline
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#59656d]">
          From geomatic engineering in Kumasi to field-based research and policy-facing map validation — a timeline of applied geospatial work in Ghana and beyond.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {(["all", "career", "project", "education"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {f === "all" ? "All milestones" : CATEGORY_STYLES[f].label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div ref={trackRef} className="relative">
        {/* Track line */}
        <div className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 rounded bg-[#dce5e9] md:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-5 top-0 w-0.5 origin-top -translate-x-1/2 rounded bg-[#d96b28] md:left-1/2"
        />

        <div className="space-y-10">
          {visible.map((m, i) => {
            const style = CATEGORY_STYLES[m.category];
            const leftSide = i % 2 === 0;
            return (
              <div
                key={m.id}
                className={`relative md:flex ${
                  leftSide ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Node dot */}
                <span
                  className="absolute left-5 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white shadow-sm md:left-1/2"
                  style={{ background: style.dot }}
                />

                {/* Card */}
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`ml-12 rounded-xl border bg-white p-5 shadow-sm md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    m.highlight
                      ? "border-emerald-300 ring-1 ring-emerald-200"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold tabular-nums text-neutral-900">
                      {m.year}
                    </span>
                    <span className="text-xs text-neutral-400">{m.period}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${style.chip}`}
                    >
                      {style.label}
                    </span>
                    {m.current && (
                      <span className="rounded-full bg-[#d96b28] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-base font-semibold leading-snug text-neutral-900">
                    {m.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-500">{m.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {m.description}
                  </p>
                </motion.article>
              </div>
            );
          })}
        </div>

        {/* End cap */}
        <div className="relative mt-10 flex md:justify-center">
          <span className="ml-5 -translate-x-1/2 rounded-full border border-dashed border-neutral-300 bg-white px-4 py-1.5 text-xs text-neutral-400 md:ml-0 md:translate-x-0">
            The story continues…
          </span>
        </div>
      </div>
    </section>
  );
}
