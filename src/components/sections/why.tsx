"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** The promise of the headline, as a pipeline: we don't recommend — we build it in. */
const PIPELINE: { word: string; line: string; icon: ReactNode }[] = [
  {
    word: "Build It",
    line: "Our own technology, not repackaged third-party tools.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M14.5 6.5a4 4 0 0 0-5.6 5L4 16.4V20h3.6l4.9-4.9a4 4 0 0 0 5-5.6L14.6 12l-2.6-2.6z" />
      </svg>
    ),
  },
  {
    word: "Fit It",
    line: "Shaped around how your business already runs.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 8h7v8H4z" />
        <path d="M11 10h4V6h5v12h-5v-4h-4" />
      </svg>
    ),
  },
  {
    word: "Install It",
    line: "Activated inside your company, not left as advice.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3v9" />
        <path d="M8 8.5 12 12l4-3.5" />
        <rect x="4" y="14" width="16" height="6.5" rx="2" />
        <circle cx="7.5" cy="17.2" r=".9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    word: "Train Your Team",
    line: "Your people learn to run it confidently.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19c.7-3 3-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
        <path d="M15.5 8h5M15.5 11.5h3.5" />
      </svg>
    ),
  },
  {
    word: "Stay On It",
    line: "We stick around until it's working every day.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 20.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3.5c0 5.4-7.5 10-7.5 10z" />
        <path d="M8.5 12h2l1.5-2.5 1.5 4 1.5-1.5h1.5" />
      </svg>
    ),
  },
];

/** Credentials, compressed into a badge row (the old six pillar cards). */
const CREDS: { label: string; icon: ReactNode }[] = [
  {
    label: "15+ Years of Technology",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    label: "Proprietary Technology",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    label: "Business Strategy First",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 19.5h16" />
        <path d="M6 16l4-4.5 3.5 2.5L18 8" />
        <path d="M14.5 8H18v3.5" />
      </svg>
    ),
  },
  {
    label: "Implementation Experience",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M13.5 3.5 5 13h5l-1 7.5L18 11h-5.5z" />
      </svg>
    ),
  },
  {
    label: "Training & Coaching",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 4 3 8.5l9 4.5 9-4.5z" />
        <path d="M6.5 10.5V15c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5" />
      </svg>
    ),
  },
  {
    label: "Cross-Industry Depth",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3.5 20V9.5l5-3.5 5 3.5V20" />
        <path d="M13.5 20V12l5-3 2 1.2V20" />
        <path d="M3.5 20h17" />
      </svg>
    ),
  },
];

export function Why() {
  const reduce = useReducedMotion();
  return (
    <section className="why why-v3">
      <div className="wrap">
        <div className="why-head">
          <div className="eyebrow center">Why Strategic Marketer</div>
          <h2>We Don&apos;t Just Recommend AI. We Build It Into Your Business.</h2>
          <p className="lead" style={{ margin: "1.2rem auto 0" }}>
            Most consultants hand you a list of AI tools and leave. We do the opposite, and it shows in how we work:
          </p>
        </div>

        {/* The build pipeline — the headline, drawn */}
        <div className="pipeline" role="list">
          <span className="pipeline-rail" aria-hidden="true">
            {!reduce && <span className="pipeline-pulse" />}
          </span>
          {PIPELINE.map((p, i) => (
            <motion.div
              role="listitem"
              className="pipe-node"
              key={p.word}
              style={{ ["--i" as string]: i }}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
            >
              <span className="pipe-ic">{p.icon}</span>
              <b>{p.word}</b>
              <p>{p.line}</p>
            </motion.div>
          ))}
        </div>

        {/* Credentials, one quiet row */}
        <div className="cred-row" aria-label="Experience">
          {CREDS.map((c) => (
            <span className="cred" key={c.label}>
              <span className="cred-ic">{c.icon}</span>
              {c.label}
            </span>
          ))}
        </div>

        <blockquote className="why-punch why-punch-center">
          <span className="why-punch-mark" aria-hidden="true">
            &ldquo;
          </span>
          Strategy without systems is a wish list. Systems without strategy is expensive noise. You need both,
          working together.
        </blockquote>

        <div className="why-cta why-cta-center">
          <a className="btn btn-gold" href={site.bookingHref}>
            See What We&apos;d Build for Your Business
          </a>
          <p className="micro">Starts with one consultative conversation: the AI Business Assessment.</p>
        </div>
      </div>
    </section>
  );
}
