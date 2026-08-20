import { ImageResponse } from "next/og";

export const alt = "Strategic Marketer | Stop Experimenting With AI. Start Putting It to Work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "radial-gradient(900px 500px at 50% 110%, rgba(233,185,92,.22), #0A0F1E 70%)",
          color: "#F5F7FC",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#E9B95C", marginBottom: 28 }}>
          ✦ AI SYSTEMS FOR ESTABLISHED BUSINESSES ✦
        </div>
        <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.05, display: "flex", flexDirection: "column" }}>
          <span>Stop Experimenting With AI.</span>
          <span style={{ color: "#E9B95C" }}>Start Putting It to Work.</span>
        </div>
        <div style={{ fontSize: 26, color: "#9DA8C2", marginTop: 34 }}>Strategic Marketer · Schedule Your AI Business Assessment</div>
      </div>
    ),
    { ...size },
  );
}
