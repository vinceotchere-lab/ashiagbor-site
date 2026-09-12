"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, ScaleControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import rawSites from "./study-sites.json";
import rawPubs from "../publications/publications.json";
import SitePanel, { CATEGORY_STYLES, type LinkedPub, type StudySite } from "./SitePanel";

const sites = rawSites as StudySite[];
const allPubs = rawPubs as LinkedPub[];
const GHANA_CENTER: [number, number] = [7.6, -1.2];

function pinIcon(color: string, active: boolean, index: number) {
  const size = active ? 46 : 34;
  return L.divIcon({
    className: "atlas-marker",
    html: `<span class="atlas-marker-ring ${active ? "is-active" : ""}" style="--pin:${color};width:${size}px;height:${size}px"><i></i><b>${String(index + 1).padStart(2, "0")}</b></span>`,
    iconSize: [size, size], iconAnchor: [size / 2, size / 2],
  });
}

function MapController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => { map.fitBounds(L.latLngBounds(sites.map((s) => s.coords)), { padding: [60, 60] }); }, [map]);
  useEffect(() => { if (target) map.flyTo(target, 11, { duration: 1.2 }); }, [target, map]);
  return null;
}

export default function StudySitesMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [target, setTarget] = useState<[number, number] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const visibleSites = useMemo(() => categoryFilter ? sites.filter((s) => s.category === categoryFilter) : sites, [categoryFilter]);
  const selected = sites.find((s) => s.id === selectedId) ?? null;
  const selectedPubs = selected ? allPubs.filter((p) => selected.publications.includes(p.id)) : [];
  const selectSite = (site: StudySite) => { setSelectedId(site.id); setTarget(site.coords); };

  return (
    <div className="atlas-console">
      <aside className="atlas-ledger">
        <div className="ledger-head"><span>FIELD LEDGER</span><b>{String(visibleSites.length).padStart(2,"0")} SIGNALS</b></div>
        <div className="atlas-filters">
          <button onClick={() => setCategoryFilter(null)} className={!categoryFilter ? "active" : ""}>All</button>
          {Object.entries(CATEGORY_STYLES).map(([key, style]) => <button key={key} onClick={() => setCategoryFilter(categoryFilter === key ? null : key)} className={categoryFilter === key ? "active" : ""} style={{ "--filter-color": style.color } as React.CSSProperties}>{style.label.split(" ")[0]}</button>)}
        </div>
        <ol className="site-ledger-list">
          {visibleSites.map((site) => {
            const originalIndex = sites.findIndex((item) => item.id === site.id);
            const active = site.id === selectedId;
            const style = CATEGORY_STYLES[site.category];
            return <li key={site.id}><button onClick={() => selectSite(site)} className={active ? "active" : ""}><span className="site-sequence">{String(originalIndex + 1).padStart(2,"0")}</span><span className="site-ledger-copy"><strong>{site.name}</strong><small>{site.region} · {site.period}</small></span><i style={{ background: style?.color }} /></button></li>;
          })}
        </ol>
        <div className="ledger-foot"><span>SELECT A SIGNAL</span><span>GHA / WGS84</span></div>
      </aside>

      <div className="atlas-map-frame">
        <MapContainer center={GHANA_CENTER} zoom={7} scrollWheelZoom className="atlas-map">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors' maxZoom={19} />
          <ScaleControl position="bottomright" imperial={false} />
          <MapController target={target} />
          {visibleSites.map((site) => {
            const index = sites.findIndex((item) => item.id === site.id);
            return <Marker key={site.id} position={site.coords} icon={pinIcon(CATEGORY_STYLES[site.category]?.color ?? "#e85d2a", site.id === selectedId, index)} eventHandlers={{ click: () => selectSite(site) }} />;
          })}
        </MapContainer>
        <div className="map-hud map-hud-top"><span><i /> LIVE FIELD INDEX</span><b>GHANA · 1:2,500,000</b></div>
        <div className="map-crosshair" aria-hidden="true"><span /><span /></div>
        <div className="map-compass" aria-hidden="true"><b>N</b><span>✦</span></div>
        <SitePanel site={selected} pubs={selectedPubs} onClose={() => { setSelectedId(null); setTarget(null); }} />
      </div>
    </div>
  );
}
