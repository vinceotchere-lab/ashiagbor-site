"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  ScaleControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import rawSites from "./study-sites.json";
import rawPubs from "../publications/publications.json";
import SitePanel, {
  CATEGORY_STYLES,
  type LinkedPub,
  type StudySite,
} from "./SitePanel";

const sites = rawSites as StudySite[];
const allPubs = rawPubs as LinkedPub[];

const GHANA_CENTER: [number, number] = [7.6, -1.2];

function pinIcon(color: string, active: boolean) {
  const size = active ? 24 : 16;
  return L.divIcon({
    className: "site-pin",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:3px solid #ffffff;box-shadow:0 1px 6px rgba(0,0,0,.5);${
      active ? "outline:4px solid rgba(255,255,255,.35);" : ""
    }"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapController({ target }: { target: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(sites.map((s) => s.coords));
    map.fitBounds(bounds, { padding: [50, 50] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (target) map.flyTo(target, 11, { duration: 1.4 });
  }, [target, map]);

  return null;
}

export default function StudySitesMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [target, setTarget] = useState<[number, number] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const visibleSites = useMemo(
    () => (categoryFilter ? sites.filter((s) => s.category === categoryFilter) : sites),
    [categoryFilter]
  );

  const selected = sites.find((s) => s.id === selectedId) ?? null;
  const selectedPubs = selected
    ? allPubs.filter((p) => selected.publications.includes(p.id))
    : [];

  const selectSite = (site: StudySite) => {
    setSelectedId(site.id);
    setTarget(site.coords);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Sidebar list */}
      <div className="order-2 max-h-[420px] overflow-y-auto rounded-[14px] border border-[#dce5e9] bg-white p-3 shadow-[0_10px_30px_rgba(17,17,17,0.03)] lg:order-1 lg:max-h-none lg:h-[72vh] lg:w-[320px]">
        <div className="mb-2 flex flex-wrap gap-1.5 px-1 pt-1">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              categoryFilter === null
                ? "bg-[#111111] text-white"
                : "bg-[#f3f6f8] text-[#59656d] hover:bg-[#eaf2f5]"
            }`}
          >
            All ({sites.length})
          </button>
          {Object.entries(CATEGORY_STYLES).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setCategoryFilter(categoryFilter === key ? null : key)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                categoryFilter === key
                  ? "text-white"
                  : "bg-[#f3f6f8] text-[#59656d] hover:bg-[#eaf2f5]"
              }`}
              style={categoryFilter === key ? { background: s.color } : undefined}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ul className="space-y-1.5">
          {visibleSites.map((s) => {
            const active = s.id === selectedId;
            const style = CATEGORY_STYLES[s.category];
            return (
              <li key={s.id}>
                <button
                  onClick={() => selectSite(s)}
                  className={`flex w-full items-start gap-2.5 rounded-[12px] border p-3 text-left transition-colors ${
                    active
                      ? "border-[#d96b28] bg-[#fdf3ec]"
                      : "border-[#dce5e9] hover:border-[#bfcfda] hover:bg-[#f8fafb]"
                  }`}
                >
                  <span
                    className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-white shadow-sm"
                    style={{ background: style?.color ?? "#525252" }}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-[#111111]">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] uppercase tracking-[0.12em] text-[#59656d]">
                      {s.region} · {s.period}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Map */}
      <div className="relative order-1 h-[60vh] overflow-hidden rounded-[14px] border border-[#dce5e9] bg-white shadow-[0_10px_30px_rgba(17,17,17,0.03)] lg:order-2 lg:h-[72vh] lg:flex-1">
        <MapContainer
          center={GHANA_CENTER}
          zoom={7}
          scrollWheelZoom
          className="h-full w-full"
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Satellite (Esri)">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics"
                maxZoom={18}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Streets (OSM)">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Dark (Carto)">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <ScaleControl position="bottomright" imperial={false} />
          <MapController target={target} />

          {visibleSites.map((s) => (
            <Marker
              key={s.id}
              position={s.coords}
              icon={pinIcon(
                CATEGORY_STYLES[s.category]?.color ?? "#525252",
                s.id === selectedId
              )}
              eventHandlers={{ click: () => selectSite(s) }}
            />
          ))}
        </MapContainer>

        <SitePanel
          site={selected}
          pubs={selectedPubs}
          onClose={() => {
            setSelectedId(null);
            setTarget(null);
          }}
        />
      </div>
    </div>
  );
}
