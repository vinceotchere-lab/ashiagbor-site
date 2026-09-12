"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Publication } from "./types";
import DomainEmblem, { resolveDomainFromTheme, DOMAIN_METAS } from "../shared/DomainEmblem";
import { apaCitation, bibtex } from "./PublicationCard";

interface Props {
  pub: Publication;
  onThemeClick: (theme: string) => void;
}

export default function PublicationScrollItem({ pub, onThemeClick }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"apa" | "bib" | null>(null);

  const primaryTheme = pub.themes[0] || "remote-sensing";
  const domainKey = resolveDomainFromTheme(primaryTheme);
  const domainMeta = DOMAIN_METAS[domainKey];

  const shownAuthors = open
    ? pub.authors.join(", ")
    : pub.authors.length > 3
      ? `${pub.authors.slice(0, 3).join(", ")}, et al.`
      : pub.authors.join(", ");

  const copy = async (kind: "apa" | "bib") => {
    const text = kind === "apa" ? apaCitation(pub) : bibtex(pub);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const link = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative border-b border-[#e2d8c3] pb-5 pt-5 first:pt-2 last:border-b-0 last:pb-2"
    >
      <div className="flex items-start gap-4">
        {/* Left silk rod color indicator */}
        <div
          className="w-1 self-stretch rounded-full shrink-0 transition-transform duration-300 group-hover:scale-y-105"
          style={{ backgroundColor: domainMeta.color }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <DomainEmblem domain={domainKey} size={22} />
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: domainMeta.color }}
              >
                {domainMeta.label}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {pub.featured && (
                <span className="rounded-full bg-[#f4e0d3] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#d96b28]">
                  Featured
                </span>
              )}
              <span className="rounded-md border border-[#d8ccb4] bg-[#fbf6ec] px-2 py-0.5 font-mono text-xs font-semibold text-[#111111]">
                {pub.year}
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-left font-display text-base font-semibold leading-snug text-ink transition-colors hover:text-[#d96b28] sm:text-[1.05rem]"
          >
            {pub.title}
          </button>

          <p className="mt-1 text-xs text-[#59656d] sm:text-sm">{shownAuthors}</p>
          <p className="mt-0.5 text-xs italic text-[#72828d]">{pub.journal}</p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {pub.themes.map((t) => (
              <button
                key={t}
                onClick={() => onThemeClick(t)}
                className="rounded-full border border-[#d8ccb4] bg-[#fdfbf6] px-2.5 py-0.5 font-mono text-[10px] text-[#59656d] transition-colors hover:border-[#111111] hover:text-[#111111]"
              >
                #{t}
              </button>
            ))}

            <button
              onClick={() => setOpen((v) => !v)}
              className="ml-auto inline-flex items-center gap-1 font-mono text-xs font-semibold transition-colors"
              style={{ color: domainMeta.color }}
            >
              <span>{open ? "Fold details" : "Unfold details"}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              >
                <path
                  d="M2.5 4.5 L6 8 L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Unfolded Manuscript Detail */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl border border-[#d8ccb4] bg-[#f5ede0]/70 p-4 text-xs sm:text-sm text-[#59656d]">
                  {pub.volume && (
                    <p className="font-mono text-xs text-[#111111]">
                      Volume: {pub.volume} {pub.pages ? `· Pages: ${pub.pages}` : ""}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2.5 pt-2">
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-primary !px-3.5 !py-1.5 !text-xs"
                      >
                        {pub.doi ? "View via DOI ↗" : "View Report ↗"}
                      </a>
                    )}
                    <button
                      onClick={() => copy("apa")}
                      className="rounded-lg border border-[#c9bca4] bg-white px-3 py-1.5 font-mono text-xs font-medium text-[#111111] transition hover:bg-[#faf7f2]"
                    >
                      {copied === "apa" ? "Copied APA ✓" : "Copy APA"}
                    </button>
                    <button
                      onClick={() => copy("bib")}
                      className="rounded-lg border border-[#c9bca4] bg-white px-3 py-1.5 font-mono text-xs font-medium text-[#111111] transition hover:bg-[#faf7f2]"
                    >
                      {copied === "bib" ? "Copied BibTeX ✓" : "Copy BibTeX"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
