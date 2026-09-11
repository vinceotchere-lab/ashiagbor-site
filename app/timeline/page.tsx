import CareerTimeline from "@/components/timeline/CareerTimeline";

export const metadata = {
  title: "Career Timeline — Ing. Dr. George Ashiagbor",
  description:
    "Two decades of geospatial research: from geomatic engineering at KNUST to validating forest maps for the UK Space Agency and EUDR map validation with the European Forest Institute.",
};

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <CareerTimeline />
    </main>
  );
}
