"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { AgencyPops } from "@/components/visuals/agency-pops";

/* Placeholder copy throughout (Zuria 2026-08-20) except the approved H1 -
   see page.tsx. Reveals follow the homepage idiom: fade-up on scroll with
   whileInView + once, guarded by useReducedMotion. */

const OFFER = [
  {
    title: "AI Marketing Systems",
    line: "License the same systems we install for our own clients, ready to deliver under your agency's roof.",
  },
  {
    title: "Content Velocity Technology",
    line: "Give your clients high-volume, on-brand content production without assembling the pipeline yourself.",
  },
  {
    title: "IdeoLab Technology",
    line: "A complete AI platform behind your service offering - knowledge, creation and automation in one place.",
  },
];

const STEPS = [
  {
    title: "Talk through your client base",
    line: "We look at the services you sell today and where licensed technology fits without disrupting what already works.",
  },
  {
    title: "License the solutions that fit",
    line: "You pick the systems that match your clients. We handle the technology, the infrastructure and the support behind them.",
  },
  {
    title: "Deliver under your own brand",
    line: "Your agency stays the face of the relationship. The systems, updates and support structure stay our problem.",
  },
];

const REASONS = [
  "No engineering team to hire, train or retain",
  "No support infrastructure to build and staff",
  "Proven systems that are already running inside real businesses",
  "Your client relationships stay yours",
];

export function AgencyContent() {
  /* Zuria 2026-08-20: reveals run on EVERY machine - the OS reduced-motion
     guard hid them on Windows setups with animations disabled, and the page
     read as static. Slightly slower + deeper so the motion is visible. */
  const up = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main>
      {/* compact hero: the doc's ONE approved line is the headline */}
      <section className="hero agn-hero" id="top">
        <div className="glow" aria-hidden />
        {/* Zuria 2026-08-20: same moveable pop cards as the homepage hero */}
        <AgencyPops />
        <div className="wrap hero-inner">
          <motion.p className="eyebrow center" {...up(0)}>
            For Agencies
          </motion.p>
          <motion.h1 {...up(0.08)}>
            Bring proven AI-powered solutions to your clients{" "}
            <span className="gold-text">
              without building the technology, systems and support infrastructure yourself.
            </span>
          </motion.h1>
          <motion.p className="lead" {...up(0.16)}>
            {/* placeholder */}
            License Strategic Marketer technology and solutions, deliver them under your own
            brand, and keep your team focused on clients instead of engineering.
          </motion.p>
          <motion.div className="hero-ctas" {...up(0.24)}>
            <a className="btn btn-gold" href={site.bookingHref}>
              Book a Conversation
            </a>
            <Link className="btn btn-ghost" href="/">
              Back to Strategic Marketer
            </Link>
          </motion.div>
        </div>
      </section>

      {/* what you can license - Content Velocity + IdeoLab are named in the doc */}
      <section className="agn-offer">
        <div className="wrap">
          <motion.p className="eyebrow" {...up(0)}>
            What you can license
          </motion.p>
          <motion.h2 {...up(0.06)}>
            Proven technology, <span className="gold-text">ready to deliver.</span>
          </motion.h2>
          <div className="agn-grid">
            {OFFER.map((o, i) => (
              <motion.div key={o.title} className="agn-card" {...up(0.1 + i * 0.12)}>
                <h3>{o.title}</h3>
                <p>{o.line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works - placeholder copy */}
      <section className="agn-how">
        <div className="wrap">
          <motion.p className="eyebrow" {...up(0)}>
            How it works
          </motion.p>
          <motion.h2 {...up(0.06)}>
            Three steps, <span className="gold-text">no channel conflict.</span>
          </motion.h2>
          <ol className="steps agn-steps">
            {STEPS.map((s, i) => (
              <motion.li key={s.title} {...up(0.1 + i * 0.12)}>
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* why license instead of build - placeholder copy */}
      <section className="agn-why">
        <div className="wrap agn-why-inner">
          <motion.div {...up(0)}>
            <p className="eyebrow">Why license</p>
            <h2>
              Sell the outcome. <span className="gold-text">Skip the build.</span>
            </h2>
            <p className="lead">
              {/* placeholder */}
              Building AI technology in-house means years of engineering, maintenance and
              support. Licensing it means your clients get it this quarter.
            </p>
          </motion.div>
          <ul className="assess-points agn-points">
            {/* checkmarks land one by one instead of as a single block */}
            {REASONS.map((r, i) => (
              <motion.li key={r} {...up(0.15 + i * 0.14)}>
                {r}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* closing CTA - placeholder copy */}
      <section className="agn-cta">
        <motion.div className="wrap agn-cta-inner" {...up(0)}>
          <h2>
            Let&apos;s talk about <span className="gold-text">your client base.</span>
          </h2>
          <p className="lead">
            A short conversation is enough to see whether licensing fits the services you
            already sell.
          </p>
          <a className="btn btn-gold" href={site.bookingHref}>
            Book a Conversation
          </a>
        </motion.div>
      </section>
    </main>
  );
}
