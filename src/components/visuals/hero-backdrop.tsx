/**
 * Hero backdrop: the approved radial glow + four golden "threads", now alive.
 *  - the glow breathes (CSS keyframes, see styles/hero.css)
 *  - a soft gold pulse travels each thread (SVG SMIL animateMotion along the same path strings, staggered)
 *  - a few faint gold particles drift upward (CSS keyframes, deterministic positions)
 * Purely decorative (aria-hidden). Reduced motion = static: pulses hidden, glow/particles frozen.
 * Server-safe: no hooks, no randomness, nothing that can differ between server and client.
 */
import type { CSSProperties } from "react";

type Thread = { d: string; end: [number, number]; r: number; dur: string; begin: string };

// Same four paths as the approved HTML build (viewBox 0 0 1440 700); pulses travel from the centre outward.
const THREADS: Thread[] = [
  { d: "M720 700 C 640 520, 420 480, 220 430", end: [220, 430], r: 3, dur: "6.2s", begin: "0.4s" },
  { d: "M720 700 C 800 520, 1020 480, 1220 430", end: [1220, 430], r: 3, dur: "6.8s", begin: "2.1s" },
  { d: "M720 700 C 690 560, 560 540, 400 560", end: [400, 560], r: 2.5, dur: "5.6s", begin: "3.4s" },
  { d: "M720 700 C 750 560, 880 540, 1040 560", end: [1040, 560], r: 2.5, dur: "6.0s", begin: "1.2s" },
];

type Particle = { x: number; y: number; size: number; dur: number; delay: number; dx: number; o: number };

// Hardcoded (deterministic) particle field — mostly lower half and sides, away from the headline.
const PARTICLES: Particle[] = [
  { x: 7, y: 64, size: 3, dur: 19, delay: -3, dx: 14, o: 0.32 },
  { x: 15, y: 80, size: 2, dur: 23, delay: -9, dx: -10, o: 0.28 },
  { x: 27, y: 90, size: 4, dur: 21, delay: -14, dx: 18, o: 0.3 },
  { x: 41, y: 94, size: 2.5, dur: 17, delay: -5, dx: -8, o: 0.34 },
  { x: 58, y: 92, size: 3, dur: 25, delay: -11, dx: 12, o: 0.3 },
  { x: 71, y: 86, size: 2, dur: 18, delay: -2, dx: -16, o: 0.28 },
  { x: 85, y: 76, size: 3.5, dur: 22, delay: -16, dx: 10, o: 0.32 },
  { x: 93, y: 62, size: 2.5, dur: 20, delay: -7, dx: -12, o: 0.3 },
  { x: 33, y: 24, size: 2, dur: 26, delay: -12, dx: 8, o: 0.22 },
  { x: 67, y: 20, size: 2, dur: 24, delay: -6, dx: -8, o: 0.22 },
];

export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="glow" />

      {/* Base threads — unchanged from the approved build */}
      <svg className="threads" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" focusable="false">
        <g stroke="rgba(233,185,92,.18)" strokeWidth="1.2" fill="none">
          {THREADS.map((t) => (
            <path key={t.d} d={t.d} />
          ))}
        </g>
        <g fill="rgba(233,185,92,.5)">
          {THREADS.map((t) => (
            <circle key={t.d} cx={t.end[0]} cy={t.end[1]} r={t.r} />
          ))}
        </g>
      </svg>

      {/* Pulses — a second SVG stacked exactly over the first (same box, same viewBox), shown at full strength */}
      <svg
        className="threads hero-pulses"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMax slice"
        focusable="false"
      >
        <defs>
          <radialGradient id="heroPulseHalo">
            <stop offset="0%" stopColor="rgba(248,212,138,.85)" />
            <stop offset="45%" stopColor="rgba(233,185,92,.35)" />
            <stop offset="100%" stopColor="rgba(233,185,92,0)" />
          </radialGradient>
        </defs>
        {THREADS.map((t) => (
          <g key={t.d} opacity="0">
            {/* travel the first half of each cycle, rest (invisible) for the second half — so the threads never feel busy */}
            <animateMotion
              dur={t.dur}
              begin={t.begin}
              repeatCount="indefinite"
              path={t.d}
              calcMode="linear"
              keyPoints="0;1;1"
              keyTimes="0;0.5;1"
            />
            <animate
              attributeName="opacity"
              dur={t.dur}
              begin={t.begin}
              repeatCount="indefinite"
              values="0;1;1;0;0"
              keyTimes="0;0.06;0.42;0.5;1"
            />
            <circle r="9" fill="url(#heroPulseHalo)" />
            <circle r="1.9" style={{ fill: "var(--gold-hi)" }} />
          </g>
        ))}
      </svg>

      {/* Drifting particles */}
      <div className="hero-particles">
        {PARTICLES.map((p) => (
          <span
            key={`${p.x}-${p.y}`}
            className="hero-particle"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                "--p-size": `${p.size}px`,
                "--p-dur": `${p.dur}s`,
                "--p-delay": `${p.delay}s`,
                "--p-dx": `${p.dx}px`,
                "--p-o": p.o,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
