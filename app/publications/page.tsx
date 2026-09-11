import PublicationsLibrary from "@/components/publications/PublicationsLibrary";

export const metadata = {
  title: "Publications — Ing. Dr. George Ashiagbor",
  description:
    "Searchable library of journal articles, conference papers, and technical reports on remote sensing, deforestation, and natural resource management in Ghana.",
};

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <PublicationsLibrary />
    </main>
  );
}
