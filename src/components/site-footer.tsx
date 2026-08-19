import { Logo } from "./logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo size={30} compact />
            <p>
              We help established businesses identify, install and activate the right AI systems — built around the
              way their business actually works.
            </p>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href="#how">How We Help</a>
            <a href="#approach">Our Approach</a>
            <a href="#industries">Industries</a>
            <a href="#about">About</a>
          </div>
          <div className="foot-col">
            <h4>Resources</h4>
            <a href="#resources">Free Training</a>
            <a href="#proof">Results</a>
            <a href={site.bookingHref}>Book Assessment</a>
          </div>
          <div className="foot-col">
            <div className="agency-box" id="agencies">
              <h4>✦ For Agencies</h4>
              <p>
                Bring proven AI-powered solutions to your clients — without building the technology, systems and
                support infrastructure yourself.
              </p>
              <a href="#agencies">Explore Agency Partnerships →</a>
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} Strategic Marketer. All rights reserved.</span>
          <span className="foot-mark">
            ✦ <span>Less Experimenting</span> More Implementing ✦
          </span>
        </div>
      </div>
    </footer>
  );
}
