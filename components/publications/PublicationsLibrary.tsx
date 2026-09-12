"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Publication } from "./types";
import rawData from "./publications.json";
import PublicationCard from "./PublicationCard";
import PublicationScrollItem from "./PublicationScrollItem";
import ScrollContainer from "../shared/ScrollContainer";
import DomainEmblem, {
  DomainKey,
  DOMAIN_METAS,
  resolveDomainFromTheme,
} from "../shared/DomainEmblem";
import StatsBar from "./StatsBar";
import YearChart, { type YearCount } from "./YearChart";

const publications = rawData as Publication[];

type SortKey = "year-desc" | "year-asc" | "title";
type ViewMode = "manuscript" | "timeline";

export default function PublicationsLibrary() {
  const [query, setQuery] = useState("");
  const [activeThemes, setActiveThemes] = useState<string[]>([]);
  const [activeDomain, setActiveDomain] = useState<DomainKey | "all">("all");
  const [journal, setJournal] = useState("all");
  const [type, setType] = useState("all");
  const [year, setYear] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("year-desc");
  const [view, setView] = useState<ViewMode>("manuscript");

  const allThemes = useMemo(
    () => Array.from(new Set(publications.flatMap((p) => p.themes))).sort(),
    []
  );
  const allJournals = useMemo(
    () => Array.from(new Set(publications.map((p) => p.journal))).sort(),
    []
  );

  const toggleTheme = (t: string) =>
    setActiveThemes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const clearAll = () => {
    setQuery("");
    setActiveThemes([]);
    setActiveDomain("all");
    setJournal("all");
    setType("all");
    setYear(null);
  };

  const hasFilters =
    query !== "" ||
    activeThemes.length > 0 ||
    activeDomain !== "all" ||
    journal !== "all" ||
    type !== "all" ||
    year !== null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = publications.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q) ||
        p.authors.join(" ").toLowerCase().includes(q) ||
        p.themes.some((t) => t.toLowerCase().includes(q));
      const matchesTheme =
        activeThemes.length === 0 ||
        activeThemes.every((t) => p.themes.includes(t));
      const matchesDomain =
        activeDomain === "all" ||
        p.themes.some((t) => resolveDomainFromTheme(t) === activeDomain);
      const matchesJournal = journal === "all" || p.journal === journal;
      const matchesType = type === "all" || p.type === type;
      const matchesYear = year === null || p.year === year;
      return (
        matchesQuery &&
        matchesTheme &&
        matchesDomain &&
        matchesJournal &&
        matchesType &&
        matchesYear
      );
    });
    return [...list].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "year-asc") return a.year - b.year;
      return b.year - a.year;
    });
  }, [query, activeThemes, activeDomain, journal, type, year, sort]);

  const yearCounts: YearCount[] = useMemo(() => {
    const m = new Map<number, number>();
    publications.forEach((p) => m.set(p.year, (m.get(p.year) ?? 0) + 1));
    return Array.from(m.entries())
      .map(([y, count]) => ({ year: y, count }))
      .sort((a, b) => a.year - b.year);
  }, []);

  const yearsActive = useMemo(() => {
    const ys = publications.map((p) => p.year);
    return Math.max(...ys) - Math.min(...ys) + 1;
  }, []);

  const featured = useMemo(() => publications.filter((p) => p.featured), []);

  const groupedByYear = useMemo(() => {
    if (view !== "timeline") return [];
    const groups = new Map<number, Publication[]>();
    filtered.forEach((p) => {
      const arr = groups.get(p.year) ?? [];
      arr.push(p);
      groups.set(p.year, arr);
    });
    return Array.from(groups.entries()).sort((a, b) =>
      sort === "year-asc" ? a[0] - b[0] : b[0] - a[0]
    );
  }, [filtered, view, sort]);

  return (
    <section className="research-page mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="research-header mb-8">
        <p className="section-label">
          The scholarly archive
        </p>
        <h1 className="interior-title mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
          Evidence, made <em>public.</em>
        </h1>
        <p className="research-deck mt-2 max-w-2xl text-neutral-600">
          Peer-reviewed papers, conference work, and technical reports on
          deforestation, cocoa landscapes, remote sensing, and natural resource
          management in Ghana. Search, filter, and export citations.
        </p>
      </header>

      {/* Stats */}
      <StatsBar yearsActive={yearsActive} />

      {/* Featured */}
      {featured.length > 0 && (
        <div className="featured-research mt-8">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            <span>01 /</span> Selected evidence
          </h2>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {featured.map((p) => (
              <div key={p.id} className="w-[320px] shrink-0 snap-start sm:w-[420px]">
                <PublicationCard pub={p} onThemeClick={toggleTheme} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Year chart */}
      <div className="research-chart mt-8">
        <YearChart data={yearCounts} activeYear={year} onSelect={setYear} />
      </div>

      {/* Controls */}
      <div className="research-controls mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        {/* Research Domains Filter Bar */}
        <div>
          <p className="section-label mb-3">Research Domains</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDomain("all")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeDomain === "all"
                  ? "bg-[#111111] text-white shadow-sm"
                  : "border border-[#dce5e9] bg-white text-[#59656d] hover:border-[#111111] hover:text-[#111111]"
              }`}
            >
              All Domains
            </button>
            {(Object.keys(DOMAIN_METAS) as DomainKey[]).map((dk) => {
              const meta = DOMAIN_METAS[dk];
              const isActive = activeDomain === dk;
              return (
                <button
                  key={dk}
                  onClick={() => setActiveDomain(isActive ? "all" : dk)}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "text-white shadow-sm"
                      : "border border-[#dce5e9] bg-white text-[#59656d] hover:border-[#111111]"
                  }`}
                  style={{
                    backgroundColor: isActive ? meta.color : undefined,
                    borderColor: isActive ? meta.color : undefined,
                  }}
                >
                  <DomainEmblem domain={dk} size={18} />
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row pt-2 border-t border-neutral-100">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, journals, themes…"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#d96b28] focus:ring-2 focus:ring-[#d96b28]/15"
          />
          <div className="flex gap-3">
            <select
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:w-56"
            >
              <option value="all">All outlets</option>
              {allJournals.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            >
              <option value="all">All types</option>
              <option value="journal">Journal articles</option>
              <option value="conference">Conference papers</option>
              <option value="report">Technical reports</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            >
              <option value="year-desc">Newest first</option>
              <option value="year-asc">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {allThemes.map((t) => {
            const active = activeThemes.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTheme(t)}
                className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                  active
                    ? "bg-[#1e7a4c] text-white"
                    : "bg-[#f3f6f8] text-neutral-600 hover:bg-[#e4ebef]"
                }`}
              >
                #{t}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <p className="text-sm text-neutral-500">
            Showing <strong>{filtered.length}</strong> of {publications.length} entries
            {year !== null && ` from ${year}`}
          </p>
          <div className="flex items-center gap-2">
            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-[#d96b28] hover:underline"
              >
                Clear filters
              </button>
            )}
            <div className="flex rounded-lg border border-neutral-300 p-0.5 text-xs font-medium">
              {(["manuscript", "timeline"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-md px-3 py-1 capitalize transition-colors ${
                    view === v ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {v === "manuscript" ? "Manuscript View" : "By Year"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results: Tactile Manuscript Scroll */}
      {view === "manuscript" ? (
        <ScrollContainer
          className="research-scroll mt-8"
          headerLabel={
            activeDomain === "all"
              ? `Research Archives · ${filtered.length} Documented Publications`
              : `${DOMAIN_METAS[activeDomain].label} · ${filtered.length} Publications`
          }
          headerIcon={
            activeDomain !== "all" ? (
              <DomainEmblem domain={activeDomain} size={18} />
            ) : undefined
          }
          accentTone={activeDomain === "all" ? "default" : activeDomain}
        >
          <div className="divide-y divide-[#e2d8c3]">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <PublicationScrollItem
                  key={p.id}
                  pub={p}
                  onThemeClick={toggleTheme}
                />
              ))}
            </AnimatePresence>
          </div>
        </ScrollContainer>
      ) : (
        <ScrollContainer
          className="research-scroll mt-8"
          headerLabel={`Chronological Archive · ${filtered.length} Entries (2007–Present)`}
        >
          <div className="space-y-8">
            {groupedByYear.map(([y, pubs]) => (
              <div key={y} className="border-b border-[#e2d8c3] pb-6 last:border-b-0 last:pb-0">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-[#1e7a4c]">{y}</span>
                  <div className="h-px flex-1 bg-[#d8ccb4]" />
                  <span className="font-mono text-xs text-[#59656d]">
                    {pubs.length} {pubs.length === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <div className="divide-y divide-[#e2d8c3]">
                  {pubs.map((p) => (
                    <PublicationScrollItem
                      key={p.id}
                      pub={p}
                      onThemeClick={toggleTheme}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollContainer>
      )}

      {filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-neutral-300 p-10 text-center">
          <p className="text-neutral-500">No publications match your filters.</p>
          <button
            onClick={clearAll}
            className="mt-2 text-sm font-medium text-emerald-700 hover:underline"
          >
            Reset everything
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-neutral-400">
        Full and continuously updated list on{" "}
        <a
          href="https://scholar.google.com/citations?user=rw2tffMAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-600"
        >
          Google Scholar
        </a>{" "}
        and{" "}
        <a
          href="https://orcid.org/0000-0001-9215-9366"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-600"
        >
          ORCID
        </a>
        .
      </p>
    </section>
  );
}
