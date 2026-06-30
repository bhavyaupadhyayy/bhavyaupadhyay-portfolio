import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

// Display: Archivo — an engineered grotesque with a wide, instrument-panel cut.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Body: Hanken Grotesk — neutral, high x-height, reads calm at small sizes.
const sans = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mono: JetBrains — literal here (the terminal, data readouts), not costume.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Bhavya Upadhyay — Data Engineer. End-to-end data and ML systems: AWS ETL at scale (TCS / Air Canada), tested dbt pipelines, and source-grounded multi-agent LLM systems. MS Data Science @ UC Irvine.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bhavya Upadhyay — Data Engineer",
    template: "%s · Bhavya Upadhyay",
  },
  description,
  keywords: [
    "Bhavya Upadhyay",
    "Data Engineer",
    "ETL",
    "Snowflake",
    "dbt",
    "Airflow",
    "AWS",
    "Machine Learning",
    "UC Irvine",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Bhavya Upadhyay",
    title: "Bhavya Upadhyay — Data Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavya Upadhyay — Data Engineer",
    description,
    creator: "@bhavyaupadhyay",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Data Engineer",
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Irvine", addressRegion: "CA", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of California, Irvine" },
    { "@type": "CollegeOrUniversity", name: "SRM Institute of Science and Technology" },
  ],
  worksFor: { "@type": "Organization", name: "University of California, Irvine" },
  knowsAbout: ["Data Engineering", "ETL", "Snowflake", "dbt", "Airflow", "Machine Learning", "LLM systems"],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Mark JS-enabled before paint so scroll-reveal hidden states never apply without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
