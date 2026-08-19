import { ExperimentationCycle } from "@/components/visuals/experimentation-cycle";

export function Problem() {
  return (
    <section className="problem" id="how">
      <div className="wrap split">
        <div className="problem-copy">
          <div className="eyebrow">The Real Problem</div>
          <h2>The Problem Isn&apos;t Access to AI. It&apos;s Knowing What to Actually Do With It.</h2>
          <p className="lead" style={{ marginTop: "1.2rem" }}>
            Every business owner we talk to has the same story. They know AI matters. They&apos;ve tried to keep up.
            And somehow, nothing has actually changed inside the business.
          </p>
          <p>
            It&apos;s not a knowledge problem — there&apos;s more AI information available than any owner could
            consume in a lifetime. It&apos;s an <strong>implementation problem</strong>. Information keeps arriving.
            Systems never get installed.
          </p>
          <p>
            If the cycle on the right feels familiar, you&apos;re not behind. You&apos;re exactly where most
            established businesses are right now — and it&apos;s fixable.
          </p>
        </div>
        <ExperimentationCycle />
      </div>
    </section>
  );
}
