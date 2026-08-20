import { site } from "@/lib/site";

const PILLARS = [
  { h: "15+ Years of Technology", p: "Building software and business systems long before the AI headlines." },
  { h: "Proprietary Technology", p: "Systems we built and refined ourselves — not repackaged third-party tools." },
  { h: "Business Strategy First", p: "Every recommendation starts with how your business actually operates." },
  { h: "Implementation Experience", p: "We install and activate — the step where most AI initiatives quietly die." },
  { h: "Training & Coaching", p: "Your team learns to run the systems confidently, not just watch them." },
  { h: "Cross-Industry Depth", p: "Direct experience across dozens of business categories and models." },
];

export function Why() {
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
          <div className="why-punch">
            Strategy without systems is a wish list. Systems without strategy is expensive noise. You need both —
            working together.
          </div>
          <div className="why-cta">
            <a className="btn btn-gold" href={site.bookingHref}>
              See What We&apos;d Build for Your Business
            </a>
          </div>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.h}>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
