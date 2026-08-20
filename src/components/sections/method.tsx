import { Orbit } from "@/components/visuals/orbit";
import { ACTIVATION, FOUNDATION } from "@/lib/methodology";

export function Method() {
  return (
    <section className="method">
      <div className="wrap">
        <div className="method-head">
          {/* Loom 04:16: "Everything we install starts here" becomes the eyebrow; the rest becomes the sub headline. */}
          <div className="eyebrow center">Everything We Install Starts Here</div>
          <h2>The Business Intelligence Agent</h2>
        </div>
        <p className="method-sub">
          Your agent is the foundation of what makes your business <em>your business</em>, powering every AI system
          that follows.
        </p>

        {/* Radial visual (desktop / tablet) */}
        <Orbit />
        <div className="orbit-caption">
          ✦ <span>AI has to understand the business</span> before it can work for the business ✦
        </div>

        {/* Stacked visual (mobile) */}
        <div className="method-stack">
          <div className="stack-core">
            <div className="k">The Foundation</div>
            <div className="t">Business Intelligence Agent</div>
            <div className="stack-chips">
              {FOUNDATION.map((f) => (
                <span className="chip" key={f.label}>
                  {f.label}
                </span>
              ))}
            </div>
          </div>
          <div className="stack-arrow" aria-hidden="true">
            ↓
          </div>
          <div className="stack-outer">
            {ACTIVATION.map((a) => (
              <span className="chip" key={a.label}>
                <b>✦</b>
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
