import { CountUp } from "@/components/visuals/count-up";

/**
 * Market stats. Figures are SAMPLE PLACEHOLDERS for layout only (the brief says: do not fabricate,
 * label clearly). Replace `value` with the final sourced numbers and the label with the source.
 */
const STATS: { value: number; suffix: string; text: string }[] = [
  { value: 78, suffix: "%", text: "of businesses are actively investing in AI tools, software and initiatives" },
  { value: 74, suffix: "%", text: "struggle to move AI from experimentation and pilots into real implementation" },
  { value: 68, suffix: "%", text: "of owners and teams report feeling overwhelmed by the pace of AI change" },
  { value: 5, suffix: "+ hrs", text: "of potential productivity gains per employee, per week, from well-implemented AI" },
  { value: 62, suffix: "%", text: "of AI output problems trace back to disconnected tools and missing business context" },
  { value: 66, suffix: "%", text: "of early implementers report a measurable competitive advantage over peers" },
];

export function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-head">
          <div className="eyebrow center">The Market Reality</div>
          <h2>Businesses Aren&apos;t Ignoring AI. They&apos;re Stuck Between Interest and Implementation.</h2>
        </div>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stat-card" key={s.text}>
              <div className="stat-num">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p>{s.text}</p>
              <span className="stat-src">Sample figure · source pending</span>
            </div>
          ))}
        </div>
        <p className="stats-foot">
          Figures shown are sample placeholders for layout only — to be replaced with final, verified, sourced
          statistics before publication.
        </p>
      </div>
    </section>
  );
}
