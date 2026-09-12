interface SiteLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  inverse?: boolean;
}

export default function SiteLogo({ size = 42, className = "", showText = false, inverse = false }: SiteLogoProps) {
  const ink = inverse ? "#f3ead8" : "#171714";
  const muted = inverse ? "#b9ad99" : "#5e625d";
  return (
    <span className={`brand-lockup ${className}`}>
      <span className="brand-mark" style={{ width: size, height: size }}>
        <svg viewBox="0 0 92 92" role="img" aria-label="G Ashiagbor orbital satellite seal">
          <circle cx="45" cy="47" r="32" fill="none" stroke={ink} strokeWidth="2.4" strokeDasharray="155 48" />
          <circle cx="45" cy="47" r="24" fill="none" stroke={ink} strokeWidth="1.25" strokeDasharray="102 49" opacity=".72" />
          <path d="M54 29a20 20 0 1 0 2 33" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="square" />
          <path d="M45 47h15" stroke="#e85d2a" strokeWidth="2.4" />
          <circle cx="45" cy="47" r="3.2" fill="#e85d2a" />
          <g className="brand-satellite" transform="translate(18 13) rotate(-28)">
            <rect x="8" y="4" width="10" height="8" rx="1.5" fill={ink} />
            <path d="M0 2h7v12H0zM19 2h7v12h-7z" fill="none" stroke={ink} strokeWidth="1.8" />
            <path d="M2 6h3M2 10h3M21 6h3M21 10h3" stroke={ink} strokeWidth="1" />
          </g>
          <path d="M69 73l4 4M17 69l-4 4M71 21l5-4" stroke="#e85d2a" strokeWidth="2" />
        </svg>
      </span>
      {showText && <span className="brand-wordmark"><strong style={{ color: ink }}>G. Ashiagbor</strong><small style={{ color: muted }}>Earth observation · Ghana</small></span>}
    </span>
  );
}
