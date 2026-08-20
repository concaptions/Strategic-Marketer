"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/testimonials";

/** Wall of Proof: real testimonials from strategicmarketer.com. */
export function Proof() {
  const reduce = useReducedMotion();
  return (
    <section className="proof" id="proof">
      <div className="wrap">
        <div className="proof-head">
          <div className="eyebrow center">The Wall of Proof</div>
          <h2>Real Businesses. Real Outcomes.</h2>
          <p className="lead" style={{ margin: "1rem auto 0" }}>
            Some of these businesses worked with us directly. Others reached us through agency partners. All of them
            are why we&apos;re confident this approach works.
          </p>
        </div>

        <div className="proof-wall">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              className="proof-quote"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
            >
              <figcaption className="proof-who">
                <Image src={t.photo} alt={t.name} width={48} height={48} className="proof-avatar" />
                <b>{t.name}</b>
                <svg className="proof-qicon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 14c0-4.4 2.6-7.7 6.5-9l.9 1.8C8.9 8 7.6 9.6 7.3 11.4c.3-.1.7-.2 1.2-.2 1.9 0 3.3 1.4 3.3 3.3 0 2-1.5 3.5-3.6 3.5C5.7 18 4 16.3 4 14zm9.6 0c0-4.4 2.6-7.7 6.5-9l.9 1.8c-2.5 1.2-3.8 2.8-4.1 4.6.3-.1.7-.2 1.2-.2 1.9 0 3.3 1.4 3.3 3.3 0 2-1.5 3.5-3.6 3.5-2.5 0-4.2-1.7-4.2-4z" />
                </svg>
              </figcaption>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
