"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ACTIVATION, FOUNDATION } from "@/lib/methodology";


type Pt = { x: number; y: number; sx: number; sy: number; a: number };

function layout(w: number, h: number) {
  const cx = w / 2,
    cy = h / 2;
  const r1x = Math.min(w * 0.255, 265),
    r1y = Math.min(h * 0.3, 196);
  const r2x = Math.min(w * 0.435, 455),
    r2y = Math.min(h * 0.465, 306);
  const inner: Pt[] = FOUNDATION.map((_, i) => {
    const a = -Math.PI / 2 + i * ((2 * Math.PI) / FOUNDATION.length);
    return { a, x: cx + r1x * Math.cos(a), y: cy + r1y * Math.sin(a), sx: cx + 122 * Math.cos(a), sy: cy + 122 * Math.sin(a) };
  });
  const outer: Pt[] = ACTIVATION.map((_, i) => {
    const a = -Math.PI / 2 + Math.PI / ACTIVATION.length + i * ((2 * Math.PI) / ACTIVATION.length);
    return {
      a,
      x: cx + r2x * Math.cos(a),
      y: cy + r2y * Math.sin(a),
      sx: cx + r1x * 0.62 * Math.cos(a),
      sy: cy + r1y * 0.62 * Math.sin(a),
    };
  });
  return { cx, cy, r1x, r1y, r2x, r2y, inner, outer };
}

/**
 * The Business Intelligence Foundation — signature radial visual.
 * Ported from the approved HTML layout (same geometry, tokens and type), then brought to life:
 * breathing core, slowly turning rings, pulses travelling core → foundation → activation,
 * gentle node float, and hover/focus expands a node to explain it (Loom 05:13, 05:54).
 */
export function Orbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1020, h: 680 });
  const [hot, setHot] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const L = useMemo(() => layout(size.w, size.h), [size]);
  const { w, h } = size;

  const isHot = (k: string) => hot === k;
  const dim = (k: string) => hot !== null && hot !== k;

  return (
    <div className={`orbit-stage${reduce ? "" : " is-live"}`} id="orbitStage" ref={stageRef}>
      <svg className="orbit-lines" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
        <defs>
          <radialGradient id="pulseGrad">
            <stop offset="0%" stopColor="#F8D48A" />
            <stop offset="100%" stopColor="#E9B95C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Foundation ring guide (slowly flowing dash) */}
        <ellipse
          className="orbit-ring orbit-ring-1"
          cx={L.cx}
          cy={L.cy}
          rx={L.r1x}
          ry={L.r1y}
          fill="none"
          stroke="rgba(233,185,92,.14)"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
        {/* Activation ring guide */}
        <ellipse
          className="orbit-ring orbit-ring-2"
          cx={L.cx}
          cy={L.cy}
          rx={L.r2x}
          ry={L.r2y}
          fill="none"
          stroke="rgba(233,185,92,.07)"
          strokeWidth="1"
          strokeDasharray="2 12"
        />

        {/* Spokes: core → foundation */}
        {L.inner.map((p, i) => {
          const k = `f${i}`;
          return (
            <g key={k} className={`spoke${isHot(k) ? " is-hot" : ""}${dim(k) ? " is-dim" : ""}`}>
              <line x1={p.sx} y1={p.sy} x2={p.x} y2={p.y} stroke="rgba(233,185,92,.28)" strokeWidth="1.2" />
              {!reduce && (
                <circle r="3.2" fill="url(#pulseGrad)" className="pulse">
                  <animateMotion
                    dur="3.2s"
                    begin={`${(i * 0.45).toFixed(2)}s`}
                    repeatCount="indefinite"
                    path={`M ${p.sx} ${p.sy} L ${p.x} ${p.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="3.2s"
                    begin={`${(i * 0.45).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Spokes: foundation → activation */}
        {L.outer.map((p, i) => {
          const k = `a${i}`;
          return (
            <g key={k} className={`spoke spoke-outer${isHot(k) ? " is-hot" : ""}${dim(k) ? " is-dim" : ""}`}>
              <line
                x1={p.sx}
                y1={p.sy}
                x2={p.x}
                y2={p.y}
                stroke="rgba(233,185,92,.14)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle cx={p.x} cy={p.y} r="2.4" fill="rgba(233,185,92,.55)" />
              {!reduce && (
                <circle r="2.6" fill="url(#pulseGrad)" className="pulse">
                  <animateMotion
                    dur="4.6s"
                    begin={`${(1.2 + i * 0.5).toFixed(2)}s`}
                    repeatCount="indefinite"
                    path={`M ${p.sx} ${p.sy} L ${p.x} ${p.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;.9;.9;0"
                    keyTimes="0;0.2;0.8;1"
                    dur="4.6s"
                    begin={`${(1.2 + i * 0.5).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      <div className="core" style={{ left: L.cx, top: L.cy }}>
        <span className="core-halo" aria-hidden="true" />
        <div className="k">The Foundation</div>
        <div className="t">Business Intelligence Foundation</div>
      </div>

      {L.inner.map((p, i) => {
        const k = `f${i}`;
        const item = FOUNDATION[i];
        const below = p.y <= L.cy;
        return (
          <div
            key={k}
            className={`node${isHot(k) ? " is-hot" : ""}${dim(k) ? " is-dim" : ""}`}
            style={{ left: p.x, top: p.y, ["--d" as string]: `${(i * 0.7).toFixed(2)}s` }}
          >
            <button
              type="button"
              className="node-inner"
              aria-describedby={`tip-${k}`}
              onMouseEnter={() => setHot(k)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(k)}
              onBlur={() => setHot(null)}
            >
              {item.label}
            </button>
            <span id={`tip-${k}`} role="tooltip" className={`node-tip ${below ? "tip-below" : "tip-above"}`}>
              <b>{item.label}</b>
              {item.tip}
            </span>
          </div>
        );
      })}

      {L.outer.map((p, i) => {
        const k = `a${i}`;
        const item = ACTIVATION[i];
        const below = p.y <= L.cy;
        return (
          <div
            key={k}
            className={`node${isHot(k) ? " is-hot" : ""}${dim(k) ? " is-dim" : ""}`}
            style={{ left: p.x, top: p.y, ["--d" as string]: `${(0.35 + i * 0.6).toFixed(2)}s` }}
          >
            <button
              type="button"
              className="node-outer"
              aria-describedby={`tip-${k}`}
              onMouseEnter={() => setHot(k)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(k)}
              onBlur={() => setHot(null)}
            >
              {item.label}
            </button>
            <span id={`tip-${k}`} role="tooltip" className={`node-tip ${below ? "tip-below" : "tip-above"}`}>
              <b>{item.label}</b>
              {item.tip}
            </span>
          </div>
        );
      })}
    </div>
  );
}
