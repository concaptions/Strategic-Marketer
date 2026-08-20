export function Trust() {
  return (
    <section className="trust" id="about">
      <div className="wrap">
        <div className="trust-grid">
          <div className="trust-item">
            {/* Loom 02:15: show the Inc. recognition by name rather than as "2×". */}
            <div className="trust-num">Inc. 500</div>
            <p>Twice recognized by Inc. Magazine among America&apos;s fastest-growing private companies</p>
          </div>
          <div className="trust-item">
            <div className="trust-num">15+</div>
            <p>Years building software, marketing technology and business systems</p>
          </div>
          {/* Round 6 (Shahzaib): the real numbers from the old strategicmarketer.com site */}
          <div className="trust-item">
            <div className="trust-num">13,701+</div>
            <p>Strategic customers served</p>
          </div>
          <div className="trust-item">
            <div className="trust-num">2,976+</div>
            <p>Online income entrepreneurs coached</p>
          </div>
        </div>
        <p className="trust-note">
          We were building business technology <strong>long before AI became the latest trend</strong>, which is
          exactly why we know the difference between what&apos;s impressive in a demo and what actually works inside a
          company.
        </p>
      </div>
    </section>
  );
}
