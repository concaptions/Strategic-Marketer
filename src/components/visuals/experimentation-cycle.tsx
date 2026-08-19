"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactElement } from "react";
import { useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Geometry (viewBox units). Everything is deterministic so SSR and the  */
/* client render the same markup (no Math.random / Date in render).      */
/* ------------------------------------------------------------------ */
const VB_W = 600;
const VB_H = 396;
const CX = 300;
const CY = 205;
const R = 150; // ring radius (nodes + marker path)
const R_DASH = 166; // faint dashed outer ring
const BADGE = 19; // node badge radius
const LAP_S = 9; // seconds per lap
const N = 7;

/** Compact (≤640px) crop: square around the ring, labels hidden, legend shown. */
const VB_COMPACT = `${CX - 178} ${CY - 178} 356 356`;
const VB_FULL = `0 0 ${VB_W} ${VB_H}`;

type Step = {
  key: string;
  label: string; // legend + aria
  lines: string[]; // label lines on the desktop ring
  icon: ReactElement; // 24x24 line icon (stroke currentColor)
};

const Ic = {
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M10.2 9.2v5.6l4.6-2.8z" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M5 19.5h14" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5h5.5A2.5 2.5 0 0 1 12 8v12a2 2 0 0 0-2-2H4z" />
      <path d="M20 5.5h-5.5A2.5 2.5 0 0 0 12 8v12a2 2 0 0 1 2-2h6z" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5" />
      <path d="M15 3v5" />
      <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0z" />
      <path d="M12 17v4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <rect x="13.6" y="13.2" width="3.8" height="3.8" rx=".8" fill="currentColor" stroke="none" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" />
      <path d="M9 7.5V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2" />
      <path d="M3 13h18" />
    </>
  ),
  restart: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.8-6.3" />
      <path d="M3.5 4.5V10h5.5" />
    </>
  ),
};

const STEPS: Step[] = [
  { key: "video", label: "Watch another video", lines: ["Watch another video"], icon: Ic.play },
  { key: "prompt", label: "Download another prompt", lines: ["Download", "another prompt"], icon: Ic.download },
  { key: "course", label: "Buy another course", lines: ["Buy another", "course"], icon: Ic.book },
  { key: "tool", label: "Subscribe to another tool", lines: ["Subscribe to another tool"], icon: Ic.plug },
  { key: "weekend", label: "Experiment for a weekend", lines: ["Experiment for a weekend"], icon: Ic.calendar },
  { key: "business", label: "Get pulled back into the business", lines: ["Get pulled back", "into the business"], icon: Ic.briefcase },
  { key: "restart", label: "Start over next month", lines: ["Start over", "next month"], icon: Ic.restart },
];

const r2 = (v: number) => Math.round(v * 100) / 100;

/** Node positions, clockwise from the top. */
const NODES = STEPS.map((s, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  return { ...s, i, x: r2(CX + R * Math.cos(a)), y: r2(CY + R * Math.sin(a)) };
});

/** Label anchor + baselines for each node (hand-placed so nothing collides with the rings). */
function labelFor(i: number, x: number, y: number, lines: string[]) {
  const gap = 12;
  const lh = 16;
  if (i === 0) return { anchor: "middle" as const, x, ys: [y - BADGE - 13] };
  if (i === 3) return { anchor: "start" as const, x: x + 8, ys: [y + BADGE + 16] };
  if (i === 4) return { anchor: "end" as const, x: x - 8, ys: [y + BADGE + 16] };
  const two = lines.length === 2;
  const ys = two ? [y - 3, y + lh - 3] : [y + 4.5];
  if (i === 1 || i === 2) return { anchor: "start" as const, x: x + BADGE + gap, ys };
  return { anchor: "end" as const, x: x - BADGE - gap, ys };
}

/* marker path: full circle, clockwise from the top (same direction as the nodes) */
const MARKER_PATH = `M${CX},${CY - R} A${R},${R} 0 1,1 ${CX},${CY + R} A${R},${R} 0 1,1 ${CX},${CY - R}`;

/* comet tail: 4 stacked arcs of decreasing length (pathLength=360 → dash units are degrees);
   each dash ENDS at the circle's 0° start point, and the whole group rotates with the marker. */
const TAIL = [
  { len: 78, op: 0.1 },
  { len: 56, op: 0.16 },
  { len: 36, op: 0.24 },
  { len: 18, op: 0.38 },
];

/** Subscribe to a media query. Server/hydration snapshot is `false`, so markup matches on both sides. */
function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * The Experimentation Cycle — a circular loop graphic.
 * A gold ring with the 7 steps as icon badges around it, a glowing marker that travels the ring
 * (SMIL, one lap every 9s), the node it passes lights up, the punchline sits in the centre and
 * pulses once per lap. Reduced motion: timeline paused at the start, every node at rest.
 */
export function ExperimentationCycle() {
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(cardRef, { amount: 0.2 });

  const [active, setActive] = useState(-1); // -1 = none lit
  const [lap, setLap] = useState(0); // increments every time the marker crosses the top
  /* Compact layout + reduced-motion preference via matchMedia (server snapshot = false → no hydration mismatch). */
  const compact = useMedia("(max-width: 640px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");

  /* Reduced motion: freeze the SVG timeline at the start (marker parked at the top, tail hidden). */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (reduce) {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    } else {
      svg.unpauseAnimations();
    }
  }, [reduce]);

  /* Drive the "active node" from the SVG's own clock so it can never drift from the marker. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reduce || !inView) return;
    let raf = 0;
    let lastLit = -2;
    let lastIdx = -1;
    const tick = () => {
      const t = svg.getCurrentTime() % LAP_S;
      const pos = (t / LAP_S) * N; // 0..7, node i sits at pos === i
      const near = Math.round(pos) % N;
      const dist = Math.abs(pos - Math.round(pos));
      const lit = dist < 0.3 ? near : -1;
      if (lit !== lastLit) {
        lastLit = lit;
        setActive(lit);
        if (lit === 0 && lastIdx !== 0) setLap((l) => l + 1);
        if (lit !== -1) lastIdx = lit;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const pulse = lap > 0 && !reduce;
  const lit = reduce ? -1 : active;

  return (
    <div
      ref={cardRef}
      className={`xc-card${compact ? " is-compact" : ""}${reduce ? " is-static" : ""}`}
      role="img"
      aria-label="The AI experimentation cycle, drawn as a loop: watch another video, download another prompt, buy another course, subscribe to another tool, experiment for a weekend, get pulled back into the business, start over next month — and nothing meaningful gets installed. Repeat until exhausted."
    >
      <svg
        ref={svgRef}
        className="xc-svg"
        viewBox={compact ? VB_COMPACT : VB_FULL}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="xcBlur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="xcBlurSoft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <radialGradient id="xcCenterGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" className="xc-stop-a" />
            <stop offset="55%" className="xc-stop-b" />
            <stop offset="100%" className="xc-stop-c" />
          </radialGradient>
          <radialGradient id="xcDiscGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" className="xc-stop-d" />
            <stop offset="100%" className="xc-stop-c" />
          </radialGradient>
        </defs>

        {/* soft inner disc for depth */}
        <circle cx={CX} cy={CY} r={R - 2} fill="url(#xcDiscGrad)" />

        {/* rings */}
        <circle className="xc-ring-dash" cx={CX} cy={CY} r={R_DASH} />
        <circle className="xc-ring" cx={CX} cy={CY} r={R} />

        {/* centre glow — pulses once per lap (SMIL, same clock as the marker) */}
        <circle className="xc-center-glow" cx={CX} cy={CY} r={104}>
          <animate
            attributeName="opacity"
            values="0.55;0.55;1;0.55"
            keyTimes="0;0.9;0.965;1"
            dur={`${LAP_S}s`}
            repeatCount="indefinite"
          />
        </circle>

        {/* comet tail + travelling marker (drawn UNDER the badges so it passes through them) */}
        <g className="xc-trail">
          {TAIL.map((t) => (
            <circle
              key={t.len}
              cx={CX}
              cy={CY}
              r={R}
              pathLength={360}
              strokeDasharray={`0 ${360 - t.len} ${t.len}`}
              style={{ opacity: t.op }}
            />
          ))}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`-90 ${CX} ${CY}`}
            to={`270 ${CX} ${CY}`}
            dur={`${LAP_S}s`}
            repeatCount="indefinite"
          />
        </g>
        <g className="xc-marker">
          <circle className="xc-marker-halo" r={16} filter="url(#xcBlur)" />
          <circle className="xc-marker-core" r={8} filter="url(#xcBlurSoft)" />
          <circle className="xc-marker-dot" r={5} />
          <animateMotion dur={`${LAP_S}s`} repeatCount="indefinite" path={MARKER_PATH} />
        </g>

        {/* nodes */}
        {NODES.map((n) => {
          const lab = labelFor(n.i, n.x, n.y, n.lines);
          const on = lit === n.i;
          return (
            <g key={n.key} className={`xc-node${on ? " is-active" : ""}`}>
              <circle className="xc-halo" cx={n.x} cy={n.y} r={30} filter="url(#xcBlur)" />
              <circle className="xc-badge" cx={n.x} cy={n.y} r={BADGE} />
              <g className="xc-icon" transform={`translate(${r2(n.x - 9)} ${r2(n.y - 9)}) scale(0.75)`}>
                {n.icon}
              </g>
              <text className="xc-label" textAnchor={lab.anchor}>
                {n.lines.map((line, li) => (
                  <tspan key={line} x={r2(lab.x)} y={r2(lab.ys[li])}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* centre copy */}
        <text className="xc-eyebrow" x={CX} y={CY - 30} textAnchor="middle">
          THE EXPERIMENTATION CYCLE
        </text>
        <text
          key={pulse ? lap : "static"}
          className={`xc-punch${pulse ? " is-lap" : ""}`}
          x={CX}
          y={CY + 2}
          textAnchor="middle"
        >
          <tspan x={CX} y={CY + 2}>
            …and nothing meaningful
          </tspan>
          <tspan x={CX} y={CY + 24}>
            gets installed.
          </tspan>
        </text>
      </svg>

      {/* compact legend (≤640px) — mirrors the ring, same active state */}
      <ul className="xc-legend" aria-hidden="true">
        {STEPS.map((s, i) => (
          <li key={s.key} className={lit === i ? "is-active" : undefined}>
            <span className="xc-legend-badge">
              <svg viewBox="0 0 24 24">{s.icon}</svg>
            </span>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <div className="xc-repeat">
        <svg
          key={pulse ? lap : "static"}
          className={pulse ? "is-spin" : undefined}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </svg>
        Repeat until exhausted
      </div>
    </div>
  );
}
