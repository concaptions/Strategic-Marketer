"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/testimonials";

/** Wall of Proof: real testimonials from strategicmarketer.com + the Inc. Magazine recognition. */
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
          <motion.div
            className="p-card award proof-award"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="laurel">🏆</div>
            <h3 style={{ fontSize: "1rem" }}>Inc. Magazine</h3>
            <p>Twice named among America&apos;s fastest-growing private companies</p>
          </motion.div>

          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              className="p-card quote proof-quote"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
            >
              <div className="mark">&quot;</div>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="proof-who">
                <Image src={t.photo} alt={t.name} width={44} height={44} className="proof-avatar" />
                <b>{t.name}</b>
                <span className="proof-star" aria-hidden="true">
                  ✦
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
