"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { POV_BAD, POV_GOOD } from "@/lib/pov";


const MIN = 8;
const MAX = 92;

/**
 * Before/after comparison slider for the Point of View section (Shahzaib: "a slider here will be better").
 * Left = AI without context (muted), right = AI on your foundation (gold). The gold pane is revealed by a
 * clip-path driven by the handle. Drag (pointer), keyboard (arrows / Home / End). Sways gently until the
 * first interaction; reduced motion = static at 50%.
 */
export function PovSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  // Gentle auto-sway until the visitor takes over.
  useEffect(() => {
    if (reduce || touched || !inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      setPos(50 + 6 * Math.sin(t * 0.55));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, touched, inView]);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(MIN, Math.min(MAX, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setTouched(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const onKey = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = pos - 5;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = pos + 5;
    if (e.key === "Home") next = MIN;
    if (e.key === "End") next = MAX;
    if (next === null) return;
    e.preventDefault();
    setTouched(true);
    setPos(Math.max(MIN, Math.min(MAX, next)));
  };

  const p = Math.round(pos * 10) / 10;

  return (
    <div
      ref={ref}
      className={`pov-slider${touched ? " is-touched" : ""}`}
      style={{ ["--pos" as string]: `${p}%` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      {/* Base layer: without */}
      <div className="pov-pane pov-pane-bad" aria-label={POV_BAD.title}>
        <div className="pov-pane-inner">
          <span className="pov-tag">✕ {POV_BAD.tag}</span>
          <h3>{POV_BAD.title}</h3>
          <ul>
            {POV_BAD.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Overlay: with (revealed from the handle to the right) */}
      <div className="pov-pane pov-pane-good" aria-label={POV_GOOD.title}>
        <div className="pov-pane-inner">
          <span className="pov-tag">✓ {POV_GOOD.tag}</span>
          <h3>{POV_GOOD.title}</h3>
          <ul>
            {POV_GOOD.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Divider + knob */}
      <div className="pov-divider" aria-hidden="true" />
      <button
        type="button"
        className="pov-knob"
        role="slider"
        aria-label="Compare AI without and with your business foundation"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(p)}
        aria-valuetext={`${Math.round(p)} percent`}
        onKeyDown={onKey}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l-5 6 5 6" />
          <path d="M15 6l5 6-5 6" />
        </svg>
      </button>
    </div>
  );
}
