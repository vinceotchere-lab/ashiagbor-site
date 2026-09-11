"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Publication } from "./types";

function apaAuthors(authors: string[]): string {
  const fmt = authors.map((a) => {
    const [last, rest] = a.split(",").map((s) => s.trim());
    if (!rest) return a;
    const initials = rest
      .split(/[^A-Za-z]+/)
      .filter(Boolean)
      .map((w) => `${w[0]}.`)
      .join(" ");
    return `${last}, ${initials}`;
  });
  if (fmt.length === 1) return fmt[0];
  if (fmt.length === 2) return `${fmt[0]}, & ${fmt[1]}`;
  return `${fmt.slice(0, -1).join(", ")}, & ${fmt[fmt.length - 1]}`;
}

export function apaCitation(p: Publication): string {
  const parts = [
    `${apaAuthors(p.authors)} (${p.year}).`,
    `${p.title}.`,
    `*${p.journal}*`,
    p.volume ? `, ${p.volume}` : "",
    p.pages ? `, ${p.pages}` : "",
    ".",
    p.doi ? ` https://doi.org/${p.doi}` : p.url ? ` ${p.url}` : "",
  ];
  return parts.join("").replace(/\*/g, "");
}

export function bibtex(p: Publication): string {
  const key = `${p.authors[0]?.split(",")[0].replace(/\s/g, "") ?? "pub"}${p.year}`;
  const lines = [
    `@${p.type === "conference" ? "inproceedings" : p.type === "report" ? "techreport" : "article"}{${key},`,
    `  title = {${p.title}},`,
    `  author = {${p.authors.join(" and ")}},`,
    `  ${p.type === "journal" ? "journal" : p.type === "conference" ? "booktitle" : "institution"} = {${p.journal}},`,
    `  year = {${p.year}},`,
  ];
  if (p.volume) lines.push(`  volume = {${p.volume}},`);
  if (p.pages) lines.push(`  pages = {${p.pages}},`);
  if (p.doi) lines.push(`  doi = {${p.doi}},`);
  lines.push("}");
  return lines.join("\n");
}

type Props = {
  pub: Publication;
  onThemeClick: (theme: string) => void;
};

export default function PublicationCard({ pub, onThemeClick }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"apa" | "bib" | null>(null);

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        pub.featured ? "border-amber-400 ring-1 ring-amber-300" : "border-neutral-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-left text-base font-semibold leading-snug text-neutral-900 hover:underline"
        >
          {pub.title}
        </button>
        <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
          {pub.year}
        </span>
      </div>

      <p className="mt-1.5 text-sm text-neutral-600">{shownAuthors}</p>
      <p className="mt-0.5 text-sm italic text-neutral-500">{pub.journal}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {pub.featured && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Featured
          </span>
        )}
        {pub.themes.map((t) => (
          <button
            key={t}
            onClick={() => onThemeClick(t)}
            className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            #{t}
          </button>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 border-t border-neutral-100 pt-4 text-sm">
              {pub.volume && (
                <p className="text-neutral-600">
                  {pub.volume}
                  {pub.pages ? `, ${pub.pages}` : ""}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-700"
                  >
                    {pub.doi ? "View on DOI ↗" : "View report ↗"}
                  </a>
                )}
                <button
                  onClick={() => copy("apa")}
                  className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {copied === "apa" ? "Copied ✓" : "Copy citation (APA)"}
                </button>
                <button
                  onClick={() => copy("bib")}
                  className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {copied === "bib" ? "Copied ✓" : "Copy BibTeX"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 self-start text-xs font-medium text-emerald-700 hover:underline"
      >
        {open ? "Show less ↑" : "Details ↓"}
      </button>
    </motion.article>
  );
}
