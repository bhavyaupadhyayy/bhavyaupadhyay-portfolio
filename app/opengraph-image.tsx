import { ImageResponse } from "next/og";

export const alt = "Bhavya Upadhyay — Data Engineer";
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
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 520px at 18% -12%, rgba(244,168,58,0.20), transparent 60%), radial-gradient(680px 480px at 102% 4%, rgba(244,168,58,0.10), transparent 55%), #090a0e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#f4a83a" }} />
          <div style={{ color: "#a7acb6", fontSize: 26, letterSpacing: 2 }}>
            Open to Data Engineer roles · US
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f4f4f5", fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            Bhavya Upadhyay
          </div>
          <div style={{ color: "#f4a83a", fontSize: 52, fontWeight: 600, marginTop: 8, letterSpacing: -1 }}>
            Data Engineer
          </div>
          <div style={{ color: "#a7acb6", fontSize: 30, marginTop: 22, maxWidth: 900, lineHeight: 1.4 }}>
            End-to-end data &amp; ML systems, built and tested honestly. AWS ETL at scale (TCS / Air
            Canada). MS Data Science @ UC Irvine.
          </div>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          {[
            ["10M+", "records/mo ETL"],
            ["99.9%", "pipeline SLA"],
            ["498", "S&P 500 modeled"],
            ["0.726", "EDGAR-X test AUC"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#f3f4f6", fontSize: 40, fontWeight: 700 }}>{v}</div>
              <div style={{ color: "#7e8795", fontSize: 22, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
