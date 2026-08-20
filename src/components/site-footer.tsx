import Link from "next/link";
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
              We help established businesses identify, install and activate the right AI systems, built around the
              way their business actually works.
            </p>
          </div>
          <div className="foot-col">
            <div className="foot-h">Company</div>
            <Link href="/#how">How We Help</Link>
            <Link href="/#approach">Our Approach</Link>
            <Link href="/#industries">Industries</Link>
            <Link href="/#about">About</Link>
          </div>
          <div className="foot-col">
            <div className="foot-h">Resources</div>
            <Link href="/#resources">Free Training</Link>
            <Link href="/#proof">Results</Link>
            <a href={site.bookingHref}>Book Assessment</a>
          </div>
          <div className="foot-col">
            <div className="agency-box" id="agencies">
              <div className="foot-h agency-h">✦ For Agencies</div>
              <p>
                Bring proven AI-powered solutions to your clients without building the technology, systems and
                support infrastructure yourself.
              </p>
              <a href="/for-agencies">Explore Agency Partnerships →</a>
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
