import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

/* The concept doc gives ONE approved line for this page (the H1 below) and
   the licensing idea (Content Velocity + IdeoLab technology). Everything
   else on this page is PLACEHOLDER copy to fill the layout - Zuria
   2026-08-20: "jo content given hai wo likho, baki dummy" - and will be
   replaced when the client provides the real content. */

export const metadata: Metadata = {
  title: "For Agencies | Strategic Marketer",
  description:
    "Bring proven AI-powered solutions to your clients without building the technology, systems and support infrastructure yourself.",
};

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

export default function ForAgenciesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* compact hero: the doc's ONE approved line is the headline */}
        <section className="hero agn-hero" id="top">
          <div className="glow" aria-hidden />
          <div className="wrap hero-inner">
            <p className="eyebrow center">For Agencies</p>
            <h1>
              Bring proven AI-powered solutions to your clients{" "}
              <span className="gold-text">without building the technology, systems and support
              infrastructure yourself.</span>
            </h1>
            <p className="lead">
              {/* placeholder */}
              License Strategic Marketer technology and solutions, deliver them under your own
              brand, and keep your team focused on clients instead of engineering.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-gold" href={site.bookingHref}>
                Book a Conversation
              </a>
              <a className="btn btn-ghost" href="/">
                Back to Strategic Marketer
              </a>
            </div>
          </div>
        </section>

        {/* what you can license - Content Velocity + IdeoLab are named in the doc */}
        <section className="agn-offer">
          <div className="wrap">
            <p className="eyebrow">What you can license</p>
            <h2>
              Proven technology, <span className="gold-text">ready to deliver.</span>
            </h2>
            <div className="agn-grid">
              {OFFER.map((o) => (
                <div key={o.title} className="agn-card">
                  <h3>{o.title}</h3>
                  <p>{o.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* how it works - placeholder copy */}
        <section className="agn-how">
          <div className="wrap">
            <p className="eyebrow">How it works</p>
            <h2>
              Three steps, <span className="gold-text">no channel conflict.</span>
            </h2>
            <ol className="steps agn-steps">
              {STEPS.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* why license instead of build - placeholder copy */}
        <section className="agn-why">
          <div className="wrap agn-why-inner">
            <div>
              <p className="eyebrow">Why license</p>
              <h2>
                Sell the outcome. <span className="gold-text">Skip the build.</span>
              </h2>
              <p className="lead">
                {/* placeholder */}
                Building AI technology in-house means years of engineering, maintenance and
                support. Licensing it means your clients get it this quarter.
              </p>
            </div>
            <ul className="assess-points agn-points">
              {REASONS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* closing CTA - placeholder copy */}
        <section className="agn-cta">
          <div className="wrap agn-cta-inner">
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
