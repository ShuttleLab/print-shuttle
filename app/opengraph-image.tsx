import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Print Shuttle — Free Visual Print Layout & Batch Printing Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 160, marginBottom: 24 }}>🖨️</div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#1e1b4b",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Print Shuttle
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#4c1d95",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Free Visual Print Layout & Batch Printing Designer
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "#4c1d95",
            opacity: 0.7,
          }}
        >
          print.shuttlelab.org
        </div>
      </div>
    ),
    { ...size },
  );
}
