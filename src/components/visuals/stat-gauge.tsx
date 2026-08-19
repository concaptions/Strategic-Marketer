"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = { percent: number; size?: number; stroke?: number };

/** Thin gold ring that fills to `percent` once scrolled into view (static when reduced motion is on). */
export function StatGauge({ percent, size = 72, stroke = 4 }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setGo(true), 120);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(100, percent));
  const filled = reduce || go;
  const offset = filled ? c * (1 - p / 100) : c;

  return (
    <svg
      ref={ref}
      className="stat-gauge"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#statGaugeGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: reduce ? "none" : "stroke-dashoffset 1.6s cubic-bezier(.22,.61,.36,1)" }}
      />
      <defs>
        <linearGradient id="statGaugeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold-hi)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
