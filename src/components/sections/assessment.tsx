import { site } from "@/lib/site";

/** Step headlines per David's Loom (06:38–07:15). Step descriptions are the approved HTML copy. */
const STEPS = [
  { h: "Understand Your Growth", p: "We review your business, goals, current systems and how you're using AI today." },
  { h: "Diagnose Growth Gaps", p: "We identify the gaps, bottlenecks and missing foundational intelligence holding AI back." },
  { h: "Prioritize", p: "We determine where AI can create the greatest near-term business value — for your business specifically." },
  { h: "Map", p: "We map the right combination of technology, implementation, automation, training or managed support." },
  { h: "Activate Your Business Intelligence Agent", p: "You get a practical roadmap to move from experimentation to implementation." },
];

export function Assessment() {
  return (
    <section className="assessment" id="assessment">
      <div className="wrap split assessment-inner">
        <div>
          <div className="eyebrow">The Next Step</div>
          <h2>How the AI Business Assessment Works</h2>
          {/* Loom 06:18: more conversational than "a structured, consultative look… not a disguised software demo". */}
          <p className="lead" style={{ margin: "1.2rem 0 2.6rem" }}>
            Think of it as a working session about your business, not a software demo. We look at how you operate
            today, where AI could genuinely help, and what to do first. You leave with clarity either way, whether or
            not we work together.
          </p>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.h}>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="assessment-card">
          <div className="eyebrow">AI Business Assessment</div>
          <h3>Find Out What AI Should Actually Look Like Inside Your Company.</h3>
          <p>Here is what you walk away with, whether or not we ever work together:</p>
          <ul className="assess-points">
            <li>A clear diagnosis of what is holding AI back in your business</li>
            <li>The two or three places AI would pay for itself first</li>
            <li>A prioritized roadmap you keep either way</li>
          </ul>
          <a className="btn btn-gold" href={site.bookingHref}>
            Schedule Your AI Business Assessment
          </a>
          <p className="micro">
            No pressure and no obligation. If we&apos;re not the right fit, we&apos;ll tell you — and point you in a
            better direction.
          </p>
          <p className="assess-note">
            <b>One conversation.</b> That is all it takes to know what AI should look like inside your company.
          </p>
        </div>
      </div>
    </section>
  );
}
