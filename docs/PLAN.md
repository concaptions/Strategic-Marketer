# Strategic Marketer — Corporate Website: Build Plan (v0, 2026-08-19)

Status: PLAN ONLY. Nothing built. Waiting on David's answers (see "Open questions") before starting.

## 1. What we have (inputs)

| Input | Where | What it is |
|---|---|---|
| `strategic-marketer-homepage.html` | `website/` | One-page homepage built by "john" (60 KB, inline CSS/JS, no images). Dark navy + gold, Archivo / Instrument Sans. 12 sections + footer + exit-intent popup. David: "the bulk of the page". |
| `Strategic Marketer B2B Website Concept - August 2026.md` | `website/` | David's Google Doc, 3 tabs: B2B Website Framework (creative brief), Prompt (the full generation brief the HTML was built from), Ad Image Reference (1 Facebook ad = visual source of truth). David: "here's the core". |
| `strategic-marketer/ad-reference.png` | this folder | The Facebook ad from the doc (dark navy, gold glow, white display type, floating dark cards, glowing threads). |
| `strategic-marketer/loom-2026-08-19-transcript.txt` | this folder | David's 9.5-min Loom, section-by-section feedback. |
| Slack (5:42 PM) | — | "Our logo is Blue and Green so I think IdeoLab is really a good model. Use the blue and green of our logo as the color base. Then we can update IdeoLab to be a different type of blue." + IdeoLab platform screenshot + old SM site stats screenshot with "116+ 6 & 7 Figure Agencies Built" crossed out in red. |
| Live site | strategicmarketer.com | Old "online income entrepreneurs" training site. To be replaced. Stats there: 2× Inc 500, 13,701+ customers, 2,976+ coached, 860,159+ businesses impacted. |
| IdeoLab site | ideolab-website.vercel.app | David opens the Loom on it: "I love this site, beautiful professional site... I think it serves us well." Used as the quality bar / model. |

## 2. What the site is

- Strategic Marketer = the authority that helps established businesses identify, install and activate AI systems. NOT an agency, NOT a software company, NOT selling Content Velocity or IdeoLab.
- One conversion goal: **Schedule an AI Business Assessment**. Secondary: exit-intent popup (free training, first name + email).
- Audience: business owners / executives, cold Facebook traffic. Agencies = separate "For Agencies" path, never part of the homepage story.
- Tone: confident, consultative, no hype, no "AI magic", no robots/neon/holograms.
- Design direction (doc): modern, minimal, large typography, white space, simple diagrams, professional photography, software-company quality, must feel like the same brand as the Facebook ads.

## 3. David's Loom feedback, mapped to sections (the work list)

Global
- Container width: "bring it in... 1,200 or 1,400 range", not edge to edge; several sections (assessment) are "full screen, need more rigidness".
- Typography: keep. "I love love love the typography. Big headlines."
- Palette: "I might even keep it black and gold, it's so nice" (Loom) vs "use the blue and green of our logo as the color base, IdeoLab is a good model" (Slack). UNRESOLVED, see Q1.
- Navigation: today one page with anchors. He wants real pages: "for businesses, for agencies, and then industries, but these are different pages altogether." Industries: "jump to a page and then jump to a section on that page."
- Headlines: shorter, 1 to 2 lines, not 3.

Per section (order as in the HTML)
1. Hero: headline is critical, maybe slightly smaller; line 1 "Stop Experimenting With AI." line 2 "Start Putting It to Work." CTA "Schedule your AI Business Assessment" very important. (On the IdeoLab hero he also floated "a video behind this, a blur of people working together", wider hero, Studio Zero style storytelling; said "I don't want to change anything, just letting you know." Treat as optional idea for both sites, needs his asset or an approved concept.)
2. Trust bar: "2×" is weak, say "Inc. 500" / "Inc. 5000" properly. Do not use "116+ 6 & 7 figure agencies built" (crossed out).
3. The Problem: the "Experimentation Cycle" card, "not a big fan, I probably just want an image". Needs an image concept approved first (client rule: no new graphics without approved concept).
4. Market stats: "hard to tell the story here, make it a little smaller and animated". XX% placeholders stay until he supplies sourced figures.
5. Point of view (generic AI vs your foundation): "I love everything about this". Keep.
6. Methodology / Business Intelligence Foundation:
   - Eyebrow or headline = "Everything we install starts here", sub = "a structured foundation of what makes your business your business".
   - Naming direction: "Business Intelligence Agent... a business intelligence agent that knows and understands all about your business. I want to go in that direction."
   - The orbit visual should feel like it is "working, moving" (animated), headline down to 2 lines.
   - Hover on an item = expands and explains.
7. Activation cards: headline 3 lines → 2. Nine cards "waste of space, gets a little AI sloppy", cut to two rows (6) since the orbit already lists them.
8. How the Assessment works: "love this, nice and clean" but full-width, needs a container. Copy more conversational ("structured consultative look... not a disguised software demo" he is not a fan of). Step headlines: 1 Understand your growth, 2 Diagnose growth gaps and opportunities, 3 Prioritize, 4 Map (the roadmap), 5 Activate your business intelligence agent.
9. Wall of proof: keep layout, placeholders until he sends logos / testimonials / videos.
10. Industries marquee: "this is a good taxonomy", keep. (He considered pulling IdeoLab in, then said no.)
11. Why Strategic Marketer: "not a big fan, we can clean it up... you and I go step by step through this." Expect a copy pass with him.
12. Final CTA + footer + exit-intent: keep.

## 4. Proposed build

Stack: same as IdeoLab site (Next.js App Router + TypeScript + Tailwind + Framer Motion), Vercel. New repo (e.g. `strategic-marketer-website`), same Vercel gotcha: author commits as the owner account.

Phase 1 (after Q1 + Q2 answered): scaffold, design tokens (palette per David's answer, HTML typography), 1200–1400 px container, header/footer, exit-intent.
Phase 2: port the 12 homepage sections from the HTML into components, applying every Loom note above. Methodology orbit = animated + hover-expand. Stats = animated counters.
Phase 3: secondary pages, content from David: For Agencies (separate experience), Industries (page with per-industry sections, deep links), About, Resources.
Phase 4: SEO/OG/schema, mobile-first (sticky mobile "Book Assessment" CTA), performance, analytics, booking link wiring, email capture wiring.
Phase 5: live verification + David's rounds.

Rough time: homepage MVP 2–3 working days once palette + pages are decided; secondary pages depend on his content.

## 5. Open questions for David (he asked "let me know your questions")

1. Palette: black + gold (the HTML / the ads) or logo blue + green (Slack)? Shahzaib already asked about design inspiration; this is the one specific decision we need.
2. Pages: homepage + For Agencies + Industries confirmed as separate pages? Also About and Resources? Any content for them yet, or homepage first?
3. Booking: where does "Schedule Your AI Business Assessment" go (calendar link / form)? Where should exit-intent emails land?
4. Assets he owns: hero background video, client logos, testimonials / video testimonials, sourced stats, a real Inc. badge.
5. Domain: replace strategicmarketer.com, or launch on a new domain / subdomain first?
6. "Business Intelligence Agent" as the final name for the foundation section?

## 6. Rules carried over from the IdeoLab build

- No new AI-generated graphics / images without an approved concept from David first.
- Commit author = owner account for Vercel.
- Verify live before reporting done.
