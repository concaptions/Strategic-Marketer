import { site } from "@/lib/site";
import { HeroBackdrop } from "@/components/visuals/hero-backdrop";
import { HeroPops } from "@/components/visuals/hero-pops";

export function Hero() {
  return (
    <section className="hero" id="top">
      <HeroBackdrop />
      <HeroPops />
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
