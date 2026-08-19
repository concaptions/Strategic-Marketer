"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const STEPS = [
  "Watch another YouTube video",
  "Download another prompt",
  "Buy another course",
  "Subscribe to another tool",
  "Experiment for a weekend",
  "Get pulled back into the business",
  "Start over next month",
];
const DEAD = "…and nothing meaningful gets installed.";

const STEP_MS = 1050; // dwell per step
const DEAD_MS = 1900; // dwell on the punchline before the loop restarts

/**
 * The Experimentation Cycle card, animated as a loop:
 * a glowing playhead walks the rail, each step lights up in turn, the punchline pulses,
 * the repeat arrow turns, and it starts over — exactly the cycle the copy describes.
 * Same card, tokens and type sizes as the approved HTML. Static when reduced motion is on.
 */
export function ExperimentationCycle() {
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const inView = useInView(cardRef, { amount: 0.35 });
  const reduce = useReducedMotion();

  // -1 = idle, 0..6 = steps, 7 = punchline
  const [active, setActive] = useState(-1);
  const [cycle, setCycle] = useState(0);
  const [playTop, setPlayTop] = useState(0);
  const [railTop, setRailTop] = useState(0);

  // Advance the playhead while in view.
  useEffect(() => {
    if (reduce || !inView) return;
    let i = -1;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      if (i > STEPS.length) {
        i = 0;
        setCycle((c) => c + 1);
      }
      setActive(i);
      t = setTimeout(tick, i === STEPS.length ? DEAD_MS : STEP_MS);
    };
    t = setTimeout(tick, 350);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  // Measure where the playhead should sit for the active item (dot centre, relative to the list).
  useEffect(() => {
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const first = itemRefs.current[0];
      if (first) setRailTop(first.offsetTop + 0.98 * rem + 4.5);
      const idx = active < 0 ? 0 : active;
      const el = itemRefs.current[idx];
      if (el) setPlayTop(el.offsetTop + 0.98 * rem + 4.5);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const atDead = active === STEPS.length;

  return (
    <div
      ref={cardRef}
      className={`loop-card loop-card-live${reduce ? " is-static" : ""}`}
      role="img"
      aria-label="The AI experimentation cycle: watch videos, download prompts, buy courses, subscribe to tools, experiment, get distracted, start over — and nothing meaningful gets installed"
    >
      <span className="loop-ring" aria-hidden="true" />
      <div className="loop-title">The Experimentation Cycle</div>
      <ul className="loop" ref={listRef}>
        {!reduce && (
          <>
            <motion.span
              className="loop-progress"
              aria-hidden="true"
              style={{ top: railTop }}
              animate={{ height: Math.max(0, playTop - railTop), opacity: active < 0 ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
            <motion.span
              className="loop-play"
              aria-hidden="true"
              animate={{ top: playTop, opacity: active < 0 ? 0 : 1, scale: atDead ? 1.35 : 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
            />
          </>
        )}
        {STEPS.map((s, i) => {
          const state = reduce ? "" : active === i ? " is-active" : active > i ? " is-done" : "";
          return (
            <li
              key={s}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={state.trim()}
            >
              {s}
            </li>
          );
        })}
        <li
          ref={(el) => {
            itemRefs.current[STEPS.length] = el;
          }}
          className={`dead${!reduce && atDead ? " is-hit" : ""}`}
        >
          {DEAD}
        </li>
      </ul>
      <span className="loop-repeat">
        <motion.svg
          key={cycle}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduce ? undefined : atDead ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </motion.svg>
        Repeat until exhausted
      </span>
    </div>
  );
}
