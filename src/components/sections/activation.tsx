"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Card = { title: string; text: string; drawsOn: string[]; icon: ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Six capabilities (Loom 05:39: two rows, not three). Copy is the approved HTML copy, unchanged. */
const CARDS: Card[] = [
  {
    title: "Consistent Brand Visibility",
    text: "Show up across channels with one voice — without becoming a full-time content creator.",
    drawsOn: ["Brand Identity", "Brand Voice"],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="3" />
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      </svg>
    ),
  },
  {
    title: "Better Content, Faster",
    text: "Turn your real expertise into content that sounds like you — not like AI.",
    drawsOn: ["Brand Voice", "Business Knowledge"],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: "Stronger Customer Follow-Up",
    text: "Timely, on-brand communication that doesn't depend on someone remembering to send it.",
    drawsOn: ["Customer Intelligence", "Brand Voice"],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 5h16v10H8l-4 4z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    ),
  },
  {
    title: "Sales Enablement",
    text: "Proposals, answers and materials that reflect your actual offers and positioning.",
    drawsOn: ["Products & Services", "Competitive Positioning"],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
      </svg>
    ),
  },
  {
    title: "Automated Repetitive Work",
    text: "Remove the recurring tasks that drain your team — the right ones, in the right order.",
    drawsOn: ["Business Knowledge", "Source of Truth"],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M20 12a8 8 0 1 1-2.3-5.7" />
        <path d="M20 4v5h-5" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Centralized Business Knowledge",
    text: "One trusted source of truth your whole company — and your AI — can rely on.",
    drawsOn: ["Source of Truth", "Business Knowledge"],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    ),
  },
];

export function Activation() {
  const reduce = useReducedMotion();
  return (
    <section className="activation">
      <div className="wrap">
        <div className="activation-head">
          <div className="eyebrow">From Intelligence to Activation</div>
          {/* Loom 05:21: bring the headline down to two lines. */}
          <h2>
            <span className="l1">Once AI Understands Your Business,</span> It Can Finally Go to Work.
          </h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            With the foundation in place, the same intelligence powers every part of how your company shows up, sells
            and runs.
          </p>
        </div>
        <div className="act-grid">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              className="act-card act-card-live"
              tabIndex={0}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.15, ease: "easeOut" }}
            >
              <div className="ic">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="act-more" aria-hidden="false">
                <span className="act-more-k">Draws on</span>
                <span className="act-chips">
                  {c.drawsOn.map((d) => (
                    <span key={d} className="act-chip">
                      {d}
                    </span>
                  ))}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="act-foot">
          <span className="dot" />
          Every capability above draws from the same Business Intelligence Foundation — which is why the results stay
          consistent instead of drifting apart.
        </div>
      </div>
    </section>
  );
}
