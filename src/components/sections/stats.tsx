import { CountUp } from "@/components/visuals/count-up";
import { StatGauge } from "@/components/visuals/stat-gauge";

/**
 * Market stats. NOTE: the figures are sample values pending the client's sourced statistics
 * (see README "Open items"). `gauge` drives the ring fill (percent).
 */
const STATS: { value: number; suffix: string; gauge: number; text: string }[] = [
  { value: 78, suffix: "%", gauge: 78, text: "of businesses are actively investing in AI tools, software and initiatives" },
  { value: 74, suffix: "%", gauge: 74, text: "struggle to move AI from experimentation and pilots into real implementation" },
  { value: 68, suffix: "%", gauge: 68, text: "of owners and teams report feeling overwhelmed by the pace of AI change" },
  { value: 5, suffix: "+ hrs", gauge: 50, text: "of potential productivity gains per employee, per week, from well-implemented AI" },
  { value: 62, suffix: "%", gauge: 62, text: "of AI output problems trace back to disconnected tools and missing business context" },
  { value: 66, suffix: "%", gauge: 66, text: "of early implementers report a measurable competitive advantage over peers" },
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
          {STATS.map((s, i) => (
            <div className="stat-card stat-card-live" key={s.text} style={{ ["--i" as string]: i }}>
              <div className="stat-top">
                <div className="stat-num">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <StatGauge percent={s.gauge} />
              </div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
