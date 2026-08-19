import { PovSlider } from "@/components/visuals/pov-slider";
import { POV_BAD, POV_GOOD } from "@/lib/pov";

export function Pov() {
  return (
    <section className="pov" id="approach">
      <div className="wrap">
        <div className="eyebrow center">Our Point of View</div>
        <h2>
          Before AI Can Work for Your Business, <span className="gold-text">It Has to Understand Your Business.</span>
        </h2>
        <p className="lead">
          Generic AI is like hiring the smartest person you&apos;ve ever met — and never telling them what your company
          does, who your customers are, or how you talk. They&apos;ll produce something. It just won&apos;t be yours.
        </p>

        {/* Desktop / tablet: before-after slider (Shahzaib round 2) */}
        <div className="pov-slider-wrap">
          <PovSlider />
          <p className="pov-hint">Drag the handle to compare</p>
        </div>

        {/* Small screens: the two stacked cards */}
        <div className="pov-cards pov-stack">
          <div className="pov-card bad">
            <h3>{POV_BAD.title}</h3>
            <ul>
              {POV_BAD.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="pov-card good">
            <h3>{POV_GOOD.title}</h3>
            <ul>
              {POV_GOOD.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
