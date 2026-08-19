type Props = { size?: number; compact?: boolean; href?: string };

/** Strategic Marketer wordmark + gear-bulb mark, ported from the approved HTML. */
export function Logo({ size = 36, compact = false, href = "#top" }: Props) {
  return (
    <a className="logo" href={href} aria-label="Strategic Marketer home">
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ width: size, height: size }}>
        <g>
          <circle cx="24" cy="24" r="15.5" fill="#1E3A5F" stroke="#4A8FD6" strokeWidth="2.5" />
          {!compact && (
            <g fill="#4A8FD6">
              <rect x="21.5" y="2" width="5" height="7" rx="1.6" />
              <rect x="21.5" y="39" width="5" height="7" rx="1.6" />
              <rect x="2" y="21.5" width="7" height="5" rx="1.6" />
              <rect x="39" y="21.5" width="7" height="5" rx="1.6" />
              <rect x="21.5" y="2" width="5" height="7" rx="1.6" transform="rotate(45 24 24)" />
              <rect x="21.5" y="39" width="5" height="7" rx="1.6" transform="rotate(45 24 24)" />
              <rect x="2" y="21.5" width="7" height="5" rx="1.6" transform="rotate(45 24 24)" />
              <rect x="39" y="21.5" width="7" height="5" rx="1.6" transform="rotate(45 24 24)" />
            </g>
          )}
          <path
            d="M24 13c-4.6 0-8 3.4-8 7.6 0 2.8 1.5 4.7 2.9 6.2 1 1.1 1.6 2 1.8 3.2h6.6c.2-1.2.8-2.1 1.8-3.2 1.4-1.5 2.9-3.4 2.9-6.2 0-4.2-3.4-7.6-8-7.6z"
            fill="#7CC24B"
          />
          {!compact && (
            <>
              <rect x="20.5" y="31" width="7" height="2" rx="1" fill="#5EA332" />
              <path d="M24 17.5l1.2 2.6 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z" fill="#F8D48A" />
            </>
          )}
        </g>
      </svg>
      <span className="lw">
        Strategic<span style={{ color: "var(--gold)" }}>Marketer</span>
      </span>
    </a>
  );
}
