"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import rawPubs from "@/components/publications/publications.json";
import type { Publication } from "@/components/publications/types";

const publications = rawPubs as Publication[];

const researchRows = [
  "Forest monitoring and deforestation",
  "Cocoa landscapes, livelihoods and EUDR",
  "Wetlands, wildlife and conservation",
];

const latestEntries = publications
  .slice()
  .sort((a, b) => b.year - a.year)
  .slice(0, 4);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function HomeSections() {
  return (
    <section className="site-shell pb-16 pt-8 md:pb-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="data-panel p-6 md:p-8"
      >
        <p className="section-label">Spatial evidence</p>
        <h2 className="mt-4 max-w-[38rem] font-display text-2xl font-semibold tracking-[-0.06em] text-ink sm:text-3xl">
          Spatial evidence for changing landscapes
        </h2>

        <div className="mt-7 space-y-3">
          {researchRows.map((title, index) => (
            <div
              key={title}
              className="flex items-center justify-between gap-4 border-t border-[#dce5e9] py-4 first:border-t-0"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold text-[#111111]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-ink sm:text-lg">{title}</span>
              </div>
              <Link href="/publications" className="text-sm font-semibold text-[#d96b28] hover:underline">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <article className="data-panel p-6 md:p-8">
          <p className="section-label">Selected project</p>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.06em] text-ink sm:text-3xl">
            Forest 2020 Ghana
          </h3>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-[#59656d]">
            Apr 2017 – Mar 2021 · Ecometrica / UK Space Agency / Forestry Commission of Ghana
          </p>
          <p className="mt-5 max-w-[42rem] text-base leading-relaxed text-[#59656d]">
            As Remote Sensing Technical Lead, Dr. Ashiagbor supported the development of Ghana&apos;s harmonised cocoa-landscape classification scheme and the geospatial evidence base for forest stewardship and monitoring.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="data-chip">Forest monitoring</span>
            <span className="data-chip">Cocoa landscapes</span>
            <span className="data-chip">Geospatial methods</span>
          </div>
        </article>

        <div className="data-panel p-6 md:p-8">
          <p className="section-label">Latest publications</p>
          <ul className="mt-5 space-y-4">
            {latestEntries.map((pub) => (
              <li key={pub.id} className="border-b border-[#dce5e9] pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{pub.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#59656d]">
                      {pub.journal}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#59656d]">
                    {pub.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/publications" className="mt-5 inline-flex text-sm font-semibold text-[#d96b28] hover:underline">
            Browse all publications
          </Link>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="data-panel p-6 md:p-8">
          <p className="section-label">Atlas</p>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.06em] text-ink">
            Research sites across Ghana
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[#59656d]">
            Study areas span cocoa–forest mosaics, wetland systems, wildlife landscapes, and forest reserves used to ground geospatial evidence in national decision-making.
          </p>
          <Link href="/map" className="mt-5 inline-flex items-center text-sm font-semibold text-[#d96b28] hover:underline">
            Explore the research atlas
          </Link>
        </div>

        <div className="data-panel overflow-hidden">
          <div className="grid h-full min-h-[220px] grid-cols-12 gap-1 bg-[#f3f6f8] p-3">
            {Array.from({ length: 84 }).map((_, index) => (
              <span
                key={index}
                className={
                  index % 7 === 0 || index % 9 === 0
                    ? "block rounded-[4px] bg-[#dfeaf0]"
                    : index % 5 === 0
                      ? "block rounded-[4px] bg-[#cfe4d5]"
                      : index % 3 === 0
                        ? "block rounded-[4px] bg-[#f1e4d8]"
                        : "block rounded-[4px] bg-[#f7fafb]"
                }
              />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 flex flex-col justify-between gap-5 rounded-[14px] border border-[#dce5e9] bg-white p-6 md:flex-row md:items-center md:p-8"
      >
        <div>
          <p className="section-label">Connect</p>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.06em] text-ink">
            Research questions, collaborations, and supervision
          </h3>
        </div>

        <Link href="/connect" className="button-primary">
          Contact the research team
        </Link>
      </motion.div>
    </section>
  );
}
