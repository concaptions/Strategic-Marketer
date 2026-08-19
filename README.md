# Strategic Marketer — Corporate Website

Homepage build for Strategic Marketer (AI systems for established businesses), ported from the approved
single-file HTML (`docs/source-strategic-marketer-homepage.html`) into Next.js so it can grow into a multi-page site.

**Design rule:** font sizes and the colour theme are the approved HTML's, unchanged. The whole source stylesheet lives in
`src/app/globals.css`; everything added for this build sits at the bottom under `BUILD ADDITIONS` (widths, motion, small
new elements only).

## Stack
- Next.js 16 (App Router) · TypeScript · Framer Motion · next/font (Archivo + Instrument Sans, same weights as the source)
- Hosting: Vercel (import the GitHub repo; zero config)

## Run
```bash
npm install
npm run dev          # http://localhost:3000
npx tsc --noEmit && npm run lint && npm run build
```

## Structure
- `src/app/page.tsx` — section order
- `src/components/sections/*` — one file per homepage section
- `src/components/visuals/*` — hero-backdrop + hero-pops (hero motion), experimentation-cycle (circular loop), orbit (Business Intelligence Agent, live + hover explain), pov-slider, stat-gauge, count-up
- `src/styles/*.css` — per-feature CSS additions (hero, cycle, stats, pov, proof)
- `src/lib/site.ts` — site name, URL, booking link (`bookingHref`), nav
- `src/lib/methodology.ts` — the foundation / activation items and their hover explanations
- `docs/` — client brief, Loom transcript, build plan, the source HTML

## Open items (need client input)
- Booking link for "Schedule Your AI Business Assessment" (currently anchors to the assessment section)
- Exit-intent form is not wired to an email provider
- Stats are SAMPLE figures (labels removed on request); replace with sourced numbers in `src/components/sections/stats.tsx`
- Proof section shows the 12 testimonials published on strategicmarketer.com (`src/lib/testimonials.ts`); swap in new ones there
- Separate pages (For Agencies, Industries, About, Resources) pending content
