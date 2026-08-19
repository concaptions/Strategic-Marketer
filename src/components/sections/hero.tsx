import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="glow" aria-hidden="true" />
      <svg className="threads" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g stroke="rgba(233,185,92,.18)" strokeWidth="1.2" fill="none">
          <path d="M720 700 C 640 520, 420 480, 220 430" />
          <path d="M720 700 C 800 520, 1020 480, 1220 430" />
          <path d="M720 700 C 690 560, 560 540, 400 560" />
          <path d="M720 700 C 750 560, 880 540, 1040 560" />
        </g>
        <g fill="rgba(233,185,92,.5)">
          <circle cx="220" cy="430" r="3" />
          <circle cx="1220" cy="430" r="3" />
          <circle cx="400" cy="560" r="2.5" />
          <circle cx="1040" cy="560" r="2.5" />
        </g>
      </svg>
      <div className="wrap hero-inner">
        <div className="eyebrow center">AI Systems for Established Businesses</div>
        {/* Loom 01:51: line 1 and line 2 each on their own line. */}
        <h1>
          <span className="l1">Stop Experimenting With AI.</span>
          <span className="l2 gold-text">Start Putting It to Work.</span>
        </h1>
        <p className="lead">
          Strategic Marketer helps established businesses identify, install and activate practical AI systems built
          around their brand, their knowledge, their customers and their growth priorities — not around the latest
          tool.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-gold" href={site.bookingHref}>
            Schedule Your AI Business Assessment
          </a>
          <a className="btn btn-ghost" href="#approach">
            See How Our Approach Works
          </a>
        </div>
        <div className="hero-chips" aria-hidden="true">
          <span className="chip">
            <b>✦</b>Built around your business
          </span>
          <span className="chip">
            <b>✦</b>Installed, not just recommended
          </span>
          <span className="chip">
            <b>✦</b>Sounds like you, not AI
          </span>
        </div>
        <div className="hero-micro">
          ✦ <span>Less experimenting</span> · <span>More implementing</span> ✦
        </div>
      </div>
    </section>
  );
}
