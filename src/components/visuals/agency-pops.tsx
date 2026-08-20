/**
 * Floating pop cards for the For Agencies hero (Zuria 2026-08-20: "home page ki
 * trha pop ups moveable add kro"). Same classes as the homepage HeroPops, so
 * styles/hero.css drives the look, the wander animation, the >=1100px gate and
 * the reduced-motion fallback. Copy mirrors the page's own licensing promises;
 * nothing is claimed about real customers.
 */
import type { ReactNode } from "react";

type Pop = { id: "p1" | "p2" | "p3" | "p4"; label: string; sub: string; dot: "green" | "gold"; icon: ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const POPS: Pop[] = [
  {
    id: "p1",
    label: "Client system live",
    sub: "Delivered under your brand",
    dot: "green",
    icon: (
      // rocket
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 15c-2 0-4.5-.6-6-2 1.5-5.5 5-9.5 9.5-10.5.6 4.6-1 9.6-3.5 12.5z" />
        <path d="M9.5 14.5 6 18M12 15c1.2 1.2 1.5 3 1 4.5-1.5-.3-2.8-1-3.5-2" />
        <circle cx="13.5" cy="7.5" r="1.6" />
      </svg>
    ),
  },
  {
    id: "p2",
    label: "White-label ready",
    sub: "Licensed, not built",
    dot: "gold",
    icon: (
      // tag
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 3h8l10 10-8 8L3 11z" />
        <circle cx="8" cy="8" r="1.6" />
      </svg>
    ),
  },
  {
    id: "p3",
    label: "Support handled",
    sub: "Our team behind yours",
    dot: "gold",
    icon: (
      // headset
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="3" y="13" width="4" height="6" rx="1.6" />
        <rect x="17" y="13" width="4" height="6" rx="1.6" />
        <path d="M19 19a4 4 0 0 1-4 2.5h-2" />
      </svg>
    ),
  },
  {
    id: "p4",
    label: "New offer launched",
    sub: "No engineering required",
    dot: "green",
    icon: (
      // spark
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="m12 8 1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z" />
      </svg>
    ),
  },
];

export function AgencyPops() {
  return (
    <div className="hero-pops" aria-hidden="true">
      {POPS.map((p) => (
        <div key={p.id} className={`hero-pop ${p.id}`}>
          <div className="hero-pop-float">
            <div className="hero-pop-card">
              <span className="hero-pop-icon">{p.icon}</span>
              <span className="hero-pop-text">
                <span className="hero-pop-label">
                  <span className={`hero-pop-dot${p.dot === "gold" ? " gold" : ""}`} />
                  {p.label}
                </span>
                <span className="hero-pop-sub">{p.sub}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
