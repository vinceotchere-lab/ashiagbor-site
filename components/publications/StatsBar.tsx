"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { SCHOLAR_STATS } from "./types";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = `${Math.round(v).toLocaleString()}${suffix}`;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0</span>;
}

export default function StatsBar({ yearsActive }: { yearsActive: number }) {
  const stats = [
    {
      chapter: "VERIFIED",
      label: "PUBLICATIONS",
      value: SCHOLAR_STATS.totalPublications,
      suffix: "+",
    },
    {
      chapter: "IMPACT",
      label: "CITATIONS",
      value: SCHOLAR_STATS.citations,
      suffix: "+",
    },
    {
      chapter: "INDEX",
      label: "H-INDEX",
      value: SCHOLAR_STATS.hIndex,
      suffix: "",
    },
    {
      chapter: "RECORD",
      label: "YEARS ACTIVE",
      value: yearsActive,
      suffix: "+",
    },
  ];

  return (
    <div className="grid4 my-8 bg-[#f8f3e9]/60">
      {stats.map((s) => (
        <article key={s.chapter} className="flex flex-col justify-between p-6">
          <span className="chapter">{s.chapter}</span>
          <div className="my-3 font-display text-4xl font-bold tracking-tight text-[#171714] sm:text-5xl">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <p className="annotation font-mono text-[11px] uppercase tracking-wider text-[#77746c]">
            {s.label}
          </p>
        </article>
      ))}
    </div>
  );
}
