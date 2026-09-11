export type PublicationType = "journal" | "conference" | "report";

export type Publication = {
  id: string;
  title: string;
  authors: string[]; // "Last, F.M." format preferred for citation export
  journal: string;
  year: number;
  type: PublicationType;
  themes: string[]; // lowercase slugs, e.g. "cocoa", "remote-sensing"
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  featured?: boolean;
};

// Scholar-wide stats (from Google Scholar / Bohrium, Sep 2026 — re-verify before launch)
export const SCHOLAR_STATS = {
  totalPublications: 37,
  citations: 940,
  hIndex: 14,
};
