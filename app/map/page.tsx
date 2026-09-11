"use client";

import dynamic from "next/dynamic";

const StudySitesMap = dynamic(() => import("@/components/map/StudySitesMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[72vh] items-center justify-center rounded-[14px] border border-[#dce5e9] bg-white text-sm text-[#59656d]">
      Loading research atlas...
    </div>
  ),
});

export default function StudySitesPage() {
  return (
    <main className="site-shell py-10 md:py-14">
      <header className="mb-6">
        <p className="section-label">Research atlas</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-4xl md:text-5xl">
          Research Atlas
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#59656d]">
          Study sites spanning Ghana&apos;s cocoa landscapes, forest reserves, wetlands, and wildlife areas — the places where geospatial evidence and environmental decision-making meet.
        </p>
      </header>
      <StudySitesMap />
    </main>
  );
}
