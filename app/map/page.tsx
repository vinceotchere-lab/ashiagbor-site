"use client";

import dynamic from "next/dynamic";

const StudySitesMap = dynamic(() => import("@/components/map/StudySitesMap"), {
  ssr: false,
  loading: () => <div className="atlas-loading"><span>Calibrating field atlas</span><i /></div>,
});

export default function StudySitesPage() {
  return (
    <main className="atlas-page">
      <header className="site-shell atlas-masthead">
        <div>
          <p className="section-label light">Research atlas · Ghana</p>
          <h1>The field is the<br /><em>final authority.</em></h1>
        </div>
        <div className="atlas-intro">
          <p>Thirteen landscapes where satellite inference meets field evidence—from cocoa–forest mosaics in Western North to the mangroves of Keta Lagoon.</p>
          <dl><div><dt>Sites</dt><dd>13</dd></div><div><dt>Regions</dt><dd>8</dd></div><div><dt>Earliest record</dt><dd>2011</dd></div></dl>
        </div>
      </header>
      <section className="site-shell atlas-workspace"><StudySitesMap /></section>
    </main>
  );
}
