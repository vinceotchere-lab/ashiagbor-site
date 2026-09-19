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

// Scholar-wide stats — Google Scholar · September 2026 CV
export const SCHOLAR_STATS = {
  totalPublications: 34,
  citations: 1181,
  hIndex: 17,
};
