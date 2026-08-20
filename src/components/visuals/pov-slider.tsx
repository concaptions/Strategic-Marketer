"use client";

import { useCallback, useRef, useState } from "react";
import { POV_BAD, POV_GOOD } from "@/lib/pov";


const MIN = 4;
const MAX = 96;

/**
 * Before/after comparison slider for the Point of View section.
 * Round 3: one state at a time — the "without" pane fills the card by default (handle parked right);
 * dragging the handle left sweeps the gold "with" pane across it. Drag (pointer), keyboard
 * (arrows / Home / End). The knob pulses until the first interaction.
 */
export function PovSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(94);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);

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
