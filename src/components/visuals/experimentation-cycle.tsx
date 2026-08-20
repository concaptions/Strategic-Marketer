"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactElement } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

/* The seven things owners keep doing — rendered as an endless incoming feed. */
type Step = { key: string; label: string; sub: string; icon: ReactElement };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STEPS: Step[] = [
  {
    key: "video",
    label: "Watched another YouTube video",
    sub: "45 minutes gone",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M10.2 9.2v5.6l4.6-2.8z" />
      </svg>
    ),
  },
  {
    key: "prompt",
    label: "Downloaded another prompt",
    sub: "Saved with the other 200",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 4v11" />
        <path d="M7.5 10.5 12 15l4.5-4.5" />
        <path d="M5 19.5h14" />
      </svg>
    ),
  },
  {
    key: "course",
    label: "Bought another course",
    sub: "Module 1 of 12 started",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 5.5h5.5A2.5 2.5 0 0 1 12 8v12a2 2 0 0 0-2-2H4z" />
        <path d="M20 5.5h-5.5A2.5 2.5 0 0 0 12 8v12a2 2 0 0 1 2-2h6z" />
      </svg>
    ),
  },
  {
    key: "tool",
    label: "Subscribed to another tool",
    sub: "Trial ends in 14 days",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 3v5" />
        <path d="M15 3v5" />
        <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0z" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    key: "weekend",
    label: "Experimented for a weekend",
    sub: "Monday took over",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
      </svg>
    ),
  },
  {
    key: "business",
    label: "Got pulled back into the business",
    sub: "The real work never waits",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" />
        <path d="M9 7.5V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2" />
        <path d="M3 13h18" />
      </svg>
    ),
  },
  {
    key: "restart",
    label: "Started over next month",
    sub: "Same list, same result",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3.5 12a8.5 8.5 0 1 0 2.8-6.3" />
        <path d="M3.5 4.5V10h5.5" />
      </svg>
    ),
  },
];

const STEP_MS = 1150; // one incoming card per beat
const PUNCH_MS = 2600; // punchline hold before the feed starts again
const VISIBLE = 4; // cards kept on screen; older ones fall away

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
 * The Experimentation Cycle as an endless incoming feed: the seven habits arrive like
 * notifications, pile up, sweep away on the punchline — and start again. Reduced motion
 * renders the full list statically with the punchline.
 */
export function ExperimentationCycle() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.3 });
  const reduce = useMedia("(prefers-reduced-motion: reduce)");

  // count = how many steps have arrived (1..7); punch = punchline showing
  const [count, setCount] = useState(0);
  const [punch, setPunch] = useState(false);
  const [lap, setLap] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let n = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      n += 1;
      if (n <= STEPS.length) {
        setCount(n);
        setPunch(false);
        t = setTimeout(tick, STEP_MS);
      } else {
        setPunch(true);
        t = setTimeout(() => {
          n = 0;
          setCount(0);
          setPunch(false);
          setLap((l) => l + 1);
          t = setTimeout(tick, 120);
        }, PUNCH_MS);
      }
    };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  const feed = punch ? [] : STEPS.slice(Math.max(0, count - VISIBLE), count).reverse();

  return (
    <div
      ref={cardRef}
      className={`xf-card${reduce ? " is-static" : ""}`}
      role="img"
      aria-label="The AI experimentation cycle: watch videos, download prompts, buy courses, subscribe to tools, experiment, get pulled back into the business, start over — and nothing meaningful gets installed"
    >
      <div className="loop-title">The Experimentation Cycle</div>

      {reduce ? (
        <div className="xf-static">
          {STEPS.map((s) => (
            <div className="xf-item" key={s.key}>
              <span className="xf-ic">{s.icon}</span>
              <span className="xf-copy">
                <b>{s.label}</b>
                <i>{s.sub}</i>
              </span>
            </div>
          ))}
          <div className="xf-punch is-on">
            <b>…and nothing meaningful gets installed.</b>
          </div>
        </div>
      ) : (
        <>
          <div className="xf-stage">
            <div className="xf-feed">
              <AnimatePresence>
                {feed.map((s, idx) => (
                  <motion.div
                    layout
                    className={`xf-item${idx === 0 ? " is-new" : ""}`}
                    key={s.key + lap}
                    initial={{ opacity: 0, y: -26, scale: 0.96 }}
                    animate={{ opacity: idx === 0 ? 1 : Math.max(0.25, 0.65 - idx * 0.15), y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 46, scale: 0.94, transition: { duration: 0.45 } }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  >
                    <span className="xf-ic">{s.icon}</span>
                    <span className="xf-copy">
                      <b>{s.label}</b>
                      <i>{s.sub}</i>
                    </span>
                    <span className="xf-again">again</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {punch && (
                <motion.div
                  className="xf-punch"
                  key="punch"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <b>…and nothing meaningful gets installed.</b>
                  <span className="xf-repeat">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 3-6.7" />
                      <path d="M3 4v5h5" />
                    </svg>
                    Repeat until exhausted
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="xf-count" aria-hidden="true">
            {STEPS.map((s, i) => (
              <span key={s.key} className={`xf-dot${!punch && i < count ? " is-on" : ""}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
