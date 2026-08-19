export function Proof() {
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

        <div className="proof-grid">
          <div className="p-card quote">
            <div className="mark">&quot;</div>
            <p>
              For the first time, the content actually sounds like me. I review it, I approve it — but I&apos;m not
              the bottleneck anymore.
            </p>
            <div className="who">
              <b>Client Name</b>Professional Services · Placeholder testimonial
            </div>
          </div>
          <div className="p-card metric">
            <div className="big">+XX%</div>
            <p>
              Increase in qualified inbound inquiries within 90 days of activation
              <br />
              <span style={{ fontSize: ".78rem", color: "var(--muted-2)" }}>
                Placeholder metric — verified case data to be inserted
              </span>
            </p>
          </div>
          <div className="p-card video">
            <div className="play">▶</div>
            <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>
              Video testimonial placeholder
              <br />
              <span style={{ fontSize: ".78rem", color: "var(--muted-2)" }}>Owner, Home Services company</span>
            </p>
          </div>
          <div className="p-card case">
            <span className="tag">✦ Mini Case Study</span>
            <h3>From invisible online to the obvious local choice</h3>
            <p>
              How an established service business turned 20 years of offline reputation into consistent digital
              authority — without hiring a marketing team.{" "}
              <span style={{ color: "var(--muted-2)" }}>(Placeholder — full case study to be inserted.)</span>
            </p>
          </div>
          <div className="p-card quote">
            <div className="mark">&quot;</div>
            <p>
              We&apos;d been burned by two agencies before this. The difference is they built the system around our
              business instead of forcing us into theirs.
            </p>
            <div className="who">
              <b>Client Name</b>Manufacturing · Placeholder testimonial
            </div>
          </div>
          <div className="p-card award">
            <div className="laurel">🏆</div>
            <h3 style={{ fontSize: "1rem" }}>Inc. Magazine</h3>
            <p>Twice named among America&apos;s fastest-growing private companies</p>
          </div>
        </div>
        <p className="proof-foot">
          Testimonials, metrics and case studies shown as layout samples — to be replaced with verified client results
          before publication.
        </p>
      </div>
    </section>
  );
}
