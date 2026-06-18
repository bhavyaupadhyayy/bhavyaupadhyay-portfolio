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
            "radial-gradient(900px 500px at 20% -10%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(700px 500px at 100% 0%, rgba(129,140,248,0.18), transparent 55%), #08090c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#38bdf8" }} />
          <div style={{ color: "#a4acba", fontSize: 26, letterSpacing: 2 }}>
            Open to Data Engineer roles · US
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f3f4f6", fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Bhavya Upadhyay
          </div>
          <div style={{ color: "#38bdf8", fontSize: 52, fontWeight: 600, marginTop: 8, letterSpacing: -1 }}>
            Data Engineer
          </div>
          <div style={{ color: "#a4acba", fontSize: 30, marginTop: 22, maxWidth: 900, lineHeight: 1.4 }}>
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
