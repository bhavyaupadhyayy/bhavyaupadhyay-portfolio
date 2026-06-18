/* ============================================================
   Single source of truth for site content.
   All copy is real, pulled from the resume + live repos.
   ============================================================ */

export const site = {
  name: "Bhavya Upadhyay",
  title: "Data Engineer",
  subhead:
    "I build end-to-end data and ML systems, and I'm honest about how they're built. One year shipping AWS ETL at scale at TCS (Air Canada). MS Data Science @ UC Irvine.",
  email: "officiallybhavya@gmail.com",
  location: "Irvine, CA",
  github: "https://github.com/bhavyaupadhyayy",
  githubHandle: "bhavyaupadhyayy",
  linkedin: "https://www.linkedin.com/in/bhavyaupadhyay",
  url: "https://bhavyaupadhyay.site",
  resume: "/Bhavya_Upadhyay_Resume_Updated.pdf",
} as const;

export const stats = [
  { value: "10M+", label: "records/month in production ETL", sub: "TCS · Air Canada" },
  { value: "99.9%", label: "pipeline SLA compliance", sub: "incident triage −35%" },
  { value: "498", label: "S&P 500 companies modeled end-to-end", sub: "EDGAR-X" },
  { value: "MS", label: "Data Science @ UC Irvine", sub: "full merit scholarship" },
] as const;

export const about = {
  lead: "I'm a data engineer and ML practitioner who builds across the whole stack: streaming and batch ingestion, tested transformation pipelines, ML models with honest evaluation, and multi-agent LLM systems with source-grounded output.",
  body: [
    "I grew up in New Delhi and moved to the US in 2025 to do my Master of Data Science at UC Irvine — a goal I'd held since the sixth grade. Before that, at TCS on the Air Canada account, I engineered AWS Lambda ETL pipelines processing 10M+ flight and booking records a month, cut data latency by roughly 50%, and raised pipeline SLA compliance to 99.9%.",
    "Today I'm finishing my MS on a full merit scholarship while building retention-risk models and KPI dashboards across 20+ graduate programs as a Data Analyst at UCI's Graduate Division.",
  ],
  values: [
    {
      title: "Pipelines that survive messy data",
      body: "Idempotent loads, schema-drift tolerance, and test gates so bad data never reaches the marts.",
    },
    {
      title: "ML reported with its limits attached",
      body: "Time-based splits, the right metric for the base rate, and SHAP attribution — not a vanity accuracy number.",
    },
    {
      title: "LLM claims you can trace to a source",
      body: "Code-supplied provenance so a model can't fabricate a citation, plus an independent LLM judge on every output.",
    },
  ],
} as const;

export type Flagship = {
  slug: string;
  name: string;
  tagline: string;
  oneLine: string;
  problem: string;
  stack: string[];
  challenges: { title: string; body: string }[];
  results: { value: string; label: string }[];
  honesty?: string;
  links: { label: string; href: string; primary?: boolean }[];
};

export const flagships: Flagship[] = [
  {
    slug: "edgar-x",
    name: "EDGAR-X",
    tagline: "Multi-Agent Financial Intelligence System",
    oneLine:
      "A 7-layer system that ingests real SEC EDGAR and FRED data for 498 S&P 500 companies into Snowflake, transforms it through a tested dbt pipeline, trains a revenue-direction ranking model, and runs source-grounded LLM agents whose research memos are scored by an automated judge.",
    problem:
      "Answer one deliberately modest question honestly: given everything knowable on the day a company files its 10-K, will next year's revenue be higher? On real, messy financial data, at zero ongoing cost.",
    stack: [
      "Python",
      "SEC EDGAR + FRED APIs",
      "Kafka + Avro",
      "Airflow",
      "Snowflake",
      "dbt (75 tests)",
      "XGBoost + Optuna + SHAP",
      "Anthropic API",
      "Streamlit",
      "Terraform + Kubernetes",
      "GitHub Actions CI",
    ],
    challenges: [
      {
        title: "Real financial-data landmines, caught by tests",
        body: "XBRL tag migrations, silent API pagination truncation, REIT accounting quirks, and filer sign errors were each caught by an automated dbt data test. The suite caught four real extraction bugs.",
      },
      {
        title: "Margins above 1.0 — scoped out, not papered over",
        body: "Financials (~70 companies) produced computed margins above 1.0 because bank and insurer revenue isn't captured by the XBRL revenue concepts used. I excluded them and scoped every claim to the S&P 500 ex-Financials rather than ship an indefensible number.",
      },
      {
        title: "Hallucination risk, designed out",
        body: "Agents use code-supplied provenance, so the model cannot fabricate a citation, and every memo is independently scored by an LLM judge.",
      },
    ],
    results: [
      { value: "0.726", label: "Test ROC-AUC vs 0.500 baseline — framed as a ranked screen, not a classifier (83% positive base rate makes raw accuracy meaningless)" },
      { value: "498 / 503", label: "current S&P 500 constituents loaded — 7,863 XBRL rows, 4,758 parsed 10-Ks, 11,583 FRED observations, 6,234 labeled training rows" },
      { value: "39 / 29 / 16 / 16", label: "SHAP attribution % — fundamentals / macro regime / sector / filing language" },
      { value: "~4.6–5 / 5", label: "Agent memos scored by the LLM judge across 5 companies, 3 sectors · 124 tests passing, 93% coverage" },
    ],
    honesty:
      "Layers 1–6 including the live dashboard are built and tested. The Kafka-to-Snowflake sink is not yet wired, the FastAPI serving layer is not built, and the Layer 7 cloud IaC is deployment-ready but not deployed (running it would incur AWS cost). Treat the stack as built-and-tested with deployment status plain — not running in production.",
    links: [
      { label: "Live demo", href: "https://edgar-x-26rm39rzy6c8fjzyb9pxdt.streamlit.app", primary: true },
      { label: "GitHub", href: "https://github.com/bhavyaupadhyayy/EDGAR-X" },
    ],
  },
  {
    slug: "flightline",
    name: "Flightline",
    tagline: "End-to-End Flight Data Pipeline",
    oneLine:
      "A production-patterned US flight on-time data pipeline: BTS batch ingestion into Snowflake, transformed with dbt (26/26 tests), served on a live Streamlit dashboard, orchestrated with Airflow and containerized with Docker, plus a scaffolded Kafka streaming path for live OpenSky aircraft positions.",
    problem:
      "Build a re-runnable, test-gated pipeline over messy government CSVs (BTS files ship ~110 columns and occasionally re-publish corrected rows) that never duplicates data and never lets bad data reach the marts.",
    stack: [
      "Apache Airflow 2.10",
      "Snowflake (RSA key-pair auth)",
      "dbt-snowflake 1.8 + dbt_utils",
      "Streamlit",
      "Docker + docker-compose",
      "GitHub Actions (sqlfluff + dbt build)",
      "OpenSky REST + Kafka (Phase 2)",
    ],
    challenges: [
      {
        title: "Idempotent loads",
        body: "Delete the (year, month) partition before COPY INTO, so re-runs and backfills never duplicate rows.",
      },
      {
        title: "Schema-drift tolerance",
        body: "MATCH_BY_COLUMN_NAME on COPY with a target table that declares only the 25 columns used, so the pipeline survives BTS adding or reordering columns.",
      },
      {
        title: "Test gate inside the DAG",
        body: "dbt build runs in the DAG — a failing test fails the run, so bad data never silently reaches the marts.",
      },
      {
        title: "Dedup for re-published rows",
        body: "Surrogate key plus row_number() dedup in staging, because BTS re-publishes corrected rows for the same flight leg.",
      },
      {
        title: "Modern auth, secrets at runtime",
        body: "RSA key-pair auth (Snowflake deprecated single-factor password auth in late 2025); the private key loads at runtime and is never stored in config.",
      },
      {
        title: "Kafka for decoupling, not buzz",
        body: "Kafka makes the poller and loader independent processes — decoupling, not a throughput claim bolted on.",
      },
    ],
    results: [
      { value: "26 / 26", label: "dbt tests passing, including two custom singular tests encoding real business rules" },
      { value: "2", label: "business-rule tests: no negative distance; and 15+ min late flights must reconcile BTS delay-cause buckets to arrival delay within 5 min" },
      { value: "CI", label: "sqlfluff lint + dbt build on an ephemeral schema, on every push" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/bhavyaupadhyayy/Flightline-End-to-End-Flight-Data-Pipeline", primary: true },
      // [CONFIRM] hosted Streamlit URL — labeled run-locally until provided
      { label: "Demo: run locally", href: "https://github.com/bhavyaupadhyayy/Flightline-End-to-End-Flight-Data-Pipeline#readme" },
    ],
  },
];

export const secondaryProjects = [
  {
    name: "Signal Miner",
    tagline: "LLM-Powered Market Intelligence",
    body: "LLM pipeline (LangChain prompt chaining + RAG) turning unstructured market data from 250+ sources into clean, structured records. Supabase store with deduplication and vector retrieval; prompt versioning and output validation catch malformed LLM responses before they reach the store; containerized with Docker; Streamlit query interface.",
    tags: ["Python", "LangChain", "RAG", "Supabase", "Docker", "Streamlit"],
    href: "https://github.com/bhavyaupadhyayy/saas-signal-miner",
  },
  {
    name: "Duplicate Detection in Job Postings",
    tagline: "Semantic dedup at scale",
    body: "Semantic deduplication over 250K+ postings; precision lifted 68% → 92%, roughly 3× faster matching via optimized ANN indexing.",
    tags: ["Sentence Transformers", "Milvus", "RAG"],
    href: "https://github.com/bhavyaupadhyayy/bayesian-duplicate-detection",
  },
  {
    name: "Skin Lesion Classification",
    tagline: "Attention CNN + interpretability",
    body: "EfficientNet-B0 + CBAM attention on ISIC 2019 (25K images, 8 classes); ablation across 4 variants, Grad-CAM interpretability, served via a FastAPI inference endpoint.",
    tags: ["PyTorch", "FastAPI", "Grad-CAM"],
    href: "https://github.com/bhavyaupadhyayy/skin-lesion-classification",
  },
] as const;

export const experience = [
  {
    role: "Data Analyst",
    org: "University of California, Irvine — Graduate Division",
    period: "Sep 2025 – Present",
    bullets: [
      "Automated data integration across 5+ institutional systems (enrollment, funding, admissions) with Python and SQL ETL, removing ~40 hours/month of manual reconciliation and resolving duplicate and mismatched records.",
      "Built retention-risk and graduation-forecasting models across 20+ graduate programs to inform funding and resource-planning decisions.",
      "Designed 8+ Tableau and Python KPI dashboards for cohort analysis and retention tracking, cutting reporting turnaround by ~30%.",
    ],
  },
  {
    role: "Data Engineer",
    note: "promoted from Assistant Systems Engineer",
    org: "Tata Consultancy Services — Air Canada",
    period: "Jun 2024 – Jul 2025",
    bullets: [
      "Engineered Python ETL pipelines on AWS Lambda processing 10M+ flight and booking records monthly, cutting data latency ~50% and enabling near-real-time operational analytics.",
      "Optimized 50+ Athena SQL queries behind enterprise reporting, reducing average query runtime ~40% and speeding delivery to 10+ downstream teams.",
      "Built 12+ Grafana dashboards on AWS CloudWatch with automated anomaly alerting, cutting incident triage time ~35% and improving pipeline SLA compliance to 99.9%.",
    ],
  },
] as const;

export const education = [
  {
    school: "University of California, Irvine",
    degree: "Master of Data Science",
    detail: "Full merit scholarship (fee remission + stipend)",
    period: "Expected Dec 2026",
  },
  {
    school: "SRM Institute of Science and Technology, Chennai",
    degree: "B.Tech, Electronics & Communication Engineering",
    detail: "Data Science specialization",
    period: "Sep 2020 – May 2024",
  },
] as const;

export const skills = [
  { group: "Languages", items: ["Python", "SQL", "R", "Bash"] },
  {
    group: "Data Engineering & Cloud",
    items: ["AWS (Lambda, Glue, Athena, S3, CloudWatch)", "Airflow", "dbt", "Snowflake", "Kafka", "ETL pipeline design", "Docker", "FastAPI", "Streamlit", "Git", "Terraform", "Kubernetes"],
  },
  {
    group: "ML & AI",
    items: ["PyTorch", "scikit-learn", "XGBoost", "LightGBM", "Hugging Face", "Model evaluation", "Ablation studies", "Hyperparameter tuning"],
  },
  {
    group: "NLP & LLMs",
    items: ["LangChain", "RAG pipelines", "Sentence Transformers", "Prompt engineering", "Semantic search", "Vector databases (Milvus)"],
  },
  {
    group: "Data & Analytics",
    items: ["Pandas", "NumPy", "PostgreSQL", "Supabase", "Tableau", "Power BI", "Matplotlib", "A/B testing", "Statistical modeling", "Cohort analysis"],
  },
] as const;

export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
