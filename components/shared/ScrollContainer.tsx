"use client";

import React from "react";
import type { DomainKey } from "./DomainEmblem";

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  headerLabel?: string;
  headerIcon?: React.ReactNode;
  accentTone?: "default" | DomainKey;
}

export default function ScrollContainer({
  children,
  className = "",
  headerLabel,
  headerIcon,
  accentTone = "default",
}: ScrollContainerProps) {
  const toneBandClass =
    accentTone === "forest"
      ? "washi-band-forest text-[#1e7a4c]"
      : "washi-band text-[#d96b28]";

  return (
    <div className={`relative mx-auto w-full ${className}`}>
      {/* Top Wooden Roller Bar with Brass Finials */}
      <div className="scroll-rod mx-3 sm:mx-6" />

      {/* Decorative Washi Silk Accent Header */}
      {headerLabel && (
        <div
          className={`${toneBandClass} mx-3 sm:mx-6 flex items-center justify-between px-6 py-2 text-xs font-mono font-bold tracking-[0.16em] uppercase`}
        >
          <div className="flex items-center gap-2">
            {headerIcon}
            <span>{headerLabel}</span>
          </div>
          <span className="text-[10px] opacity-70 tracking-widest">
            AUTHENTICATED RECORD
          </span>
        </div>
      )}

      {/* Parchment Manuscript Body */}
      <div className="scroll-parchment mx-3 sm:mx-6 p-5 sm:p-8">
        {children}
      </div>

      {/* Bottom Wooden Roller Bar with Brass Finials */}
      <div className="scroll-rod mx-3 sm:mx-6" />
    </div>
  );
}
