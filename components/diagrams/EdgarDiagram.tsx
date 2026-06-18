import { Figure, Node, Arrow } from "./flow";

export default function EdgarDiagram() {
  return (
    <Figure caption="EDGAR-X data flow: SEC EDGAR filings/XBRL and FRED macro data are backfilled into Snowflake Raw, transformed by dbt with 75 tests into staging and marts, which feed both an XGBoost ranked screen (AUC 0.726) and source-grounded LLM agents whose memos are scored by an LLM-as-judge; results surface on a live Streamlit dashboard.">
      {/* Ingestion → store → transform */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col gap-2.5">
          <Node>SEC EDGAR<br />filings + XBRL</Node>
          <Node>FRED<br />macro data</Node>
        </div>
        <Arrow label="backfill" />
        <Node store>Snowflake<br />Raw</Node>
        <Arrow label="dbt · 75 tests" />
        <Node accent>Staging → Marts</Node>
      </div>

      {/* Branch into model + agents */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
          <Node>XGBoost ranked screen<br />AUC 0.726</Node>
          <Arrow />
          <Node terminal>Live Streamlit<br />dashboard</Node>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
          <Node>LLM agents<br />grounded memos</Node>
          <Arrow />
          <Node>LLM-as-judge<br />evaluation</Node>
        </div>
      </div>
    </Figure>
  );
}
