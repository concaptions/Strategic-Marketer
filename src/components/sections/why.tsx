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

const PILLARS: { h: string; p: string; icon: ReactNode }[] = [
  {
    h: "15+ Years of Technology",
    p: "Building software and business systems long before the AI headlines.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    h: "Proprietary Technology",
    p: "Systems we built and refined ourselves — not repackaged third-party tools.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    h: "Business Strategy First",
    p: "Every recommendation starts with how your business actually operates.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 19.5h16" />
        <path d="M6 16l4-4.5 3.5 2.5L18 8" />
        <path d="M14.5 8H18v3.5" />
      </svg>
    ),
  },
  {
    h: "Implementation Experience",
    p: "We install and activate — the step where most AI initiatives quietly die.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M13.5 3.5 5 13h5l-1 7.5L18 11h-5.5z" />
      </svg>
    ),
  },
  {
    h: "Training & Coaching",
    p: "Your team learns to run the systems confidently, not just watch them.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19c.7-3 3-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
        <path d="M15.5 8h5M15.5 11.5h3.5" />
      </svg>
    ),
  },
  {
    h: "Cross-Industry Depth",
    p: "Direct experience across dozens of business categories and models.",
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
    <section className="why">
      <div className="wrap split">
        <div className="why-copy">
          <div className="eyebrow">Why Strategic Marketer</div>
          <h2>We Don&apos;t Just Recommend AI. We Build It Into Your Business.</h2>
          <p style={{ marginTop: "1.2rem" }}>
            Most consultants hand you a list of AI tools and leave. We do the opposite: we build the technology
            ourselves, set it up around the way your business already runs, and stay until your team is using it
            every day.
          </p>
          <p>
            Behind that is 15+ years of <strong>building software, strategy, implementation, training and coaching</strong>{" "}
            for real businesses across hundreds of industries.
          </p>
          <blockquote className="why-punch why-punch-xl">
            <span className="why-punch-mark" aria-hidden="true">
              &ldquo;
            </span>
            Strategy without systems is a wish list. Systems without strategy is expensive noise. You need both —
            working together.
          </blockquote>
          <div className="why-cta">
            <a className="btn btn-gold" href={site.bookingHref}>
              See What We&apos;d Build for Your Business
            </a>
            <p className="micro why-cta-micro">Starts with one consultative conversation — the AI Business Assessment.</p>
          </div>
        </div>
        <div className="pillars pillars-live">
          {PILLARS.map((p, i) => (
            <motion.div
              className="pillar"
              key={p.h}
              style={{ ["--i" as string]: i }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.12, ease: "easeOut" }}
            >
              <div className="pillar-ic">{p.icon}</div>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
