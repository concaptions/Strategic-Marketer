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
- `src/components/visuals/*` — experimentation-cycle (animated), orbit (Business Intelligence Foundation, live + hover explain), count-up
- `src/lib/site.ts` — site name, URL, booking link (`bookingHref`), nav
- `src/lib/methodology.ts` — the foundation / activation items and their hover explanations
- `docs/` — client brief, Loom transcript, build plan, the source HTML

## Open items (need client input)
- Booking link for "Schedule Your AI Business Assessment" (currently anchors to the assessment section)
- Exit-intent form is not wired to an email provider
- Stats are sample placeholders, labelled as such
- Proof section uses layout placeholders (logos, testimonials, video)
- Separate pages (For Agencies, Industries, About, Resources) pending content
