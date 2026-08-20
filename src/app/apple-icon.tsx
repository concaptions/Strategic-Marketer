import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the favicon mark (gear-bulb on night) at 180x180. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0F1E",
          borderRadius: 36,
        }}
      >
        <svg width="132" height="132" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="13.5" fill="#1E3A5F" stroke="#4A8FD6" strokeWidth="2.2" />
          <path
            d="M24 14.5c-4 0-7 3-7 6.6 0 2.4 1.3 4.1 2.5 5.4.9 1 1.4 1.7 1.6 2.8h5.8c.2-1.1.7-1.8 1.6-2.8 1.2-1.3 2.5-3 2.5-5.4 0-3.6-3-6.6-7-6.6z"
            fill="#7CC24B"
          />
          <path
            d="M24 18.5l1 2.3 2.5.3-1.8 1.8.4 2.5-2.1-1.2-2.1 1.2.4-2.5-1.8-1.8 2.5-.3z"
            fill="#F8D48A"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
