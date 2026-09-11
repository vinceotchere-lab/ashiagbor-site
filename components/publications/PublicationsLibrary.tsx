"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Publication } from "./types";
import rawData from "./publications.json";
import PublicationCard from "./PublicationCard";
import StatsBar from "./StatsBar";
import YearChart, { type YearCount } from "./YearChart";

const publications = rawData as Publication[];

type SortKey = "year-desc" | "year-asc" | "title";
type ViewMode = "grid" | "timeline";

export default function PublicationsLibrary() {
  const [query, setQuery] = useState("");
  const [activeThemes, setActiveThemes] = useState<string[]>([]);
  const [journal, setJournal] = useState("all");
  const [type, setType] = useState("all");
  const [year, setYear] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("year-desc");
  const [view, setView] = useState<ViewMode>("grid");

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
    setJournal("all");
    setType("all");
    setYear(null);
  };

  const hasFilters =
    query !== "" || activeThemes.length > 0 || journal !== "all" || type !== "all" || year !== null;

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
      const matchesJournal = journal === "all" || p.journal === journal;
      const matchesType = type === "all" || p.type === type;
      const matchesYear = year === null || p.year === year;
      return matchesQuery && matchesTheme && matchesJournal && matchesType && matchesYear;
    });
    return [...list].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "year-asc") return a.year - b.year;
      return b.year - a.year;
    });
  }, [query, activeThemes, journal, type, year, sort]);

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
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
          Research Output
        </p>
        <h1 className="mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl">
          Publications Library
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Peer-reviewed papers, conference work, and technical reports on
          deforestation, cocoa landscapes, remote sensing, and natural resource
          management in Ghana. Search, filter, and export citations.
        </p>
      </header>

      {/* Stats */}
      <StatsBar yearsActive={yearsActive} />

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            Featured papers
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
      <div className="mt-8">
        <YearChart data={yearCounts} activeYear={year} onSelect={setYear} />
      </div>

      {/* Controls */}
      <div className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, journals, themes…"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
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
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "bg-emerald-700 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
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
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Clear filters
              </button>
            )}
            <div className="flex rounded-lg border border-neutral-300 p-0.5 text-xs font-medium">
              {(["grid", "timeline"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-md px-3 py-1 capitalize ${
                    view === v ? "bg-neutral-900 text-white" : "text-neutral-600"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {view === "grid" ? (
        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <PublicationCard key={p.id} pub={p} onThemeClick={toggleTheme} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-6 space-y-8">
          {groupedByYear.map(([y, pubs]) => (
            <div key={y}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xl font-bold text-emerald-800">{y}</span>
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-xs text-neutral-400">
                  {pubs.length} {pubs.length === 1 ? "entry" : "entries"}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pubs.map((p) => (
                  <PublicationCard key={p.id} pub={p} onThemeClick={toggleTheme} />
                ))}
              </div>
            </div>
          ))}
        </div>
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
