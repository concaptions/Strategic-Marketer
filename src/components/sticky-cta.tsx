import { site } from "@/lib/site";

export function StickyCta() {
  return (
    <div className="sticky-cta">
      <a className="btn btn-gold" href={site.bookingHref}>
        Schedule My AI Business Assessment
      </a>
    </div>
  );
}
