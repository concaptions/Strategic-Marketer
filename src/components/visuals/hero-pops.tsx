/**
 * Floating "pop" cards around the hero copy (Shahzaib's reference: small notification cards drifting
 * around a hero). Four dark cards — tiny gold line icon + label + sub-line — that fade/slide in one after
 * another and then float gently forever (CSS, see styles/hero.css). Copy mirrors the site's own promises;
 * nothing is claimed about real customers. Shown only at viewport >= 1100px, decorative (aria-hidden),
 * placed in the empty side areas so they never touch the headline, lead, CTAs or chips.
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
    label: "Follow-up sent",
    sub: "On time, in your voice",
    dot: "green",
    icon: (
      // paper plane
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M21 3 3 10.5l7.5 2.5L13 21l8-18Z" />
        <path d="m10.5 13 4-4" />
      </svg>
    ),
  },
  {
    id: "p2",
    label: "Proposal drafted",
    sub: "From your approved offers",
    dot: "gold",
    icon: (
      // document with lines
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h6M10 17h6" />
      </svg>
    ),
  },
  {
    id: "p3",
    label: "Source of truth",
    sub: "Answer approved",
    dot: "gold",
    icon: (
      // shield with check
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "p4",
    label: "Assessment booked",
    sub: "Next step scheduled",
    dot: "green",
    icon: (
      // calendar with check
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M8 3v4M16 3v4" />
        <path d="m9.5 15 2 2 3.5-3.5" />
      </svg>
    ),
  },
];

export function HeroPops() {
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
