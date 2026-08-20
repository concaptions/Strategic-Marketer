const ROW_A = [
  "Roofing",
  "HVAC",
  "Home Services",
  "Contractors",
  "Health & Wellness",
  "Medical",
  "Legal",
  "Accounting",
  "Financial Services",
  "Real Estate",
];
const ROW_B = [
  "Hospitality",
  "Travel",
  "Ecommerce",
  "Manufacturing",
  "Technology",
  "Education",
  "Consulting",
  "Professional Services",
  "Local Service Businesses",
  "B2B Companies",
];

function Track({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} style={{ display: "contents" }}>
          <span className="m-item">{t}</span>
          <span className="m-sep">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="wrap head">
        <div className="eyebrow center">Who We Help</div>
        <h2>Built for Real Businesses Across Real Industries</h2>
      </div>

      <div className="marquee" aria-hidden="true">
        <Track items={ROW_A} />
        <Track items={ROW_A} hidden />
      </div>
      <div className="marquee reverse" aria-hidden="true">
        <Track items={ROW_B} />
        <Track items={ROW_B} hidden />
      </div>

      <p className="recency wrap">
        <strong>Even in the last 90 days,</strong> we&apos;ve worked with businesses across home services, healthcare,
        professional services, real estate, ecommerce and more. Different industries, the same missing foundation.
      </p>
    </section>
  );
}
