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
          <h2>We Don&apos;t Recommend AI Tools. We Make AI Useful.</h2>
          <p style={{ marginTop: "1.2rem" }}>
            Anyone can hand you a list of software. Very few can look at your business, understand how it actually
            works, and install AI systems that fit it — then make sure they get used.
          </p>
          <p>
            That&apos;s the difference 15+ years of building technology for real businesses makes. We&apos;ve been on
            every side of this: <strong>software development, business strategy, implementation, training and coaching</strong>{" "}
            — across hundreds of business categories.
          </p>
          <div className="why-punch">
            Strategy without systems is a wish list. Systems without strategy is expensive noise. You need both —
            working together.
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
