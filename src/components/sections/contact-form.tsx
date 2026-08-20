"use client";

import { useState, type FormEvent } from "react";

/**
 * Round 6 (Shahzaib): every "Schedule" CTA redirects here. Styled after his reference,
 * the exit-intent popup: dark placeholder-only inputs, full-width gold button, fine print.
 * Front-end only for now; a webhook to David's mail gets connected later, so submit
 * shows a success state and the data stays on the visitor's side.
 */
export function ContactSection() {
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-head">
          <div className="eyebrow center">Schedule Your Assessment</div>
          <h2>Tell Us About Your Business.</h2>
          <p className="lead">
            Fill this out and we&apos;ll reach out to schedule your AI Business Assessment. It takes less than a
            minute.
          </p>
        </div>

        <div className="contact-card">
          {!done ? (
            <form className="contact-form" onSubmit={submit}>
              <div className="cf-grid">
                <input type="text" name="firstName" placeholder="First name" autoComplete="given-name" aria-label="First name" required />
                <input type="email" name="email" placeholder="Email address" autoComplete="email" aria-label="Email address" required />
                <input type="tel" name="phone" placeholder="Phone number (optional)" autoComplete="tel" aria-label="Phone number (optional)" />
                <input type="text" name="company" placeholder="Company name" autoComplete="organization" aria-label="Company name" required />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder="What's the biggest thing you'd like AI to take off your plate? (optional)"
                aria-label="What's the biggest thing you'd like AI to take off your plate? (optional)"
              />
              <button className="btn btn-gold cf-submit" type="submit">
                Request My AI Business Assessment
              </button>
              <p className="cf-fine">No spam. No pressure. We&apos;ll reply within one business day to set a time.</p>
            </form>
          ) : (
            <div className="cf-success" role="status">
              <span className="cf-success-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.4 2.4 4.6-5" />
                </svg>
              </span>
              <h3>Request received.</h3>
              <p>Thanks for reaching out. We&apos;ll be in touch within one business day to schedule your AI Business Assessment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
