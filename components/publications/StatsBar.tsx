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
    { label: "Publications", value: SCHOLAR_STATS.totalPublications, suffix: "+" },
    { label: "Citations", value: SCHOLAR_STATS.citations, suffix: "+" },
    { label: "h-index", value: SCHOLAR_STATS.hIndex, suffix: "" },
    { label: "Years publishing", value: yearsActive, suffix: "" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm"
        >
          <div className="text-3xl font-bold tabular-nums text-neutral-900">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
