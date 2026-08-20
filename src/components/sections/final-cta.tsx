import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="final" id="resources">
      <div className="glow" aria-hidden="true" />
      <div className="wrap final-inner">
        <div className="eyebrow center">Ready When You Are</div>
        <h2>
          Your Business Doesn&apos;t Need Another AI Tool.{" "}
          <span className="gold-text">It Needs the Right AI Systems Working Together.</span>
        </h2>
        <p className="lead">
          Schedule an AI Business Assessment and we&apos;ll help identify where AI can create the greatest opportunity
          inside your business, and exactly what needs to happen next.
        </p>
        <a className="btn btn-gold" href={site.bookingHref}>
          Schedule My AI Business Assessment
        </a>
        <p className="micro">A focused, consultative conversation, not a sales pitch. You&apos;ll leave with clarity either way.</p>
      </div>
    </section>
  );
}
