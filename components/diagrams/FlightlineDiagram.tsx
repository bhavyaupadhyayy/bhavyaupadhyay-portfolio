import { Figure, Node, Arrow } from "./flow";

export default function FlightlineDiagram() {
  return (
    <Figure caption="Flightline data flow. Batch path (live): BTS TranStats → Airflow DAG → Snowflake RAW → dbt staging → marts → Streamlit. Streaming path (scaffolded): OpenSky via OAuth2 → Kafka → consumer → Snowflake RAW.">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Batch · live
        </span>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Node>BTS TranStats</Node>
          <Arrow />
          <Node accent>Airflow DAG</Node>
          <Arrow />
          <Node store>Snowflake RAW</Node>
          <Arrow />
          <Node>dbt staging → marts</Node>
          <Arrow />
          <Node terminal>Streamlit</Node>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Streaming · scaffolded
        </span>
        <div className="flex flex-col gap-2.5 opacity-80 sm:flex-row sm:items-center">
          <Node>OpenSky (OAuth2)</Node>
          <Arrow />
          <Node>Kafka</Node>
          <Arrow />
          <Node>consumer</Node>
          <Arrow />
          <Node store>Snowflake RAW</Node>
        </div>
      </div>
    </Figure>
  );
}
