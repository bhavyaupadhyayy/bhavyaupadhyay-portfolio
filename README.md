# Bhavya Upadhyay — Portfolio

Personal portfolio for a Data Engineer job hunt. Next.js (App Router) + TypeScript + Tailwind v4.
Dark, mobile-first, server-rendered. Built to convert a skeptical technical recruiter in the first
30 seconds, then make it effortless to go deeper into the two flagship projects and download the résumé.

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender to static)
npm run start    # serve the production build
npm run lint
```

## Architecture decisions (why it's fast)

- **Server-first.** Every section is a React Server Component shipping zero client JS. Only `Nav`
  (sticky/scroll state + mobile menu) and `Reveal` (scroll-in animation) are client components, so
  first-load JS stays at the framework baseline as the site grows.
- **No Mermaid / no chart libs.** Architecture diagrams are hand-built, dependency-free
  (`components/diagrams/`) — same information, no heavy client bundle.
- **No Framer Motion.** Reveals use a tiny `IntersectionObserver` + CSS. The hidden→visible state
  only applies under `html.js` (set by a pre-paint inline script in `app/layout.tsx`), so with
  **JavaScript disabled the page is fully visible and readable.** `prefers-reduced-motion` disables
  all motion in `app/globals.css`.
- **Design tokens** live in `app/globals.css` (`@theme`). Muted/faint text colors are chosen to
  clear WCAG AA contrast on the near-black background.

## Content

All copy is in `lib/data.ts` — one source of truth for hero, stats, projects, experience, skills,
and contact. Edit there, not in components.

## ⚠️ Assets to replace before launch

These are placeholders or need real files dropped in:

1. **`public/Bhavya_Upadhyay_Resume_Updated.pdf`** — currently a generated **placeholder**.
   Replace with the real résumé PDF (same filename, no code change needed).
2. **Flagship dashboard screenshots** — not yet added. The spec calls for 2–3 from each live
   dashboard (EDGAR-X: company explorer, calibration, sector overview; Flightline:
   `assets/dashboard.png`, `assets/routes.png`). Drop them in `public/` and wire into
   `components/sections/Projects.tsx` if you want them inline.

## Open `[CONFIRM]` items from the spec

- **Flightline live demo URL** — currently labeled "Demo: run locally" (links to the repo README).
  If you host it on Streamlit, add the URL to the Flightline `links` array in `lib/data.ts`.
- **Optional sections not built** (off the current résumé, per spec — add only if you opt in):
  Live Good Inc. research role; publications (YOLOv8 construction-site detection; crypto
  forecasting). Need confirmed links before adding.

## SEO

- Per-page metadata + canonical in `app/layout.tsx`.
- Open Graph + Twitter card image generated at build by `app/opengraph-image.tsx` (sharp 1200×630 PNG).
- JSON-LD `Person` schema (jobTitle Data Engineer, alumniOf UC Irvine, sameAs GitHub/LinkedIn).
- `app/sitemap.ts`, `app/robots.ts`. Update `site.url` in `lib/data.ts` if the domain changes.

## Deploy

Zero-config on **Vercel** (recommended) or **Cloudflare Pages**. Static output; no env vars, no
server runtime, no trackers. Point `bhavyaupadhyay.site` at the deployment.
