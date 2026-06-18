# Design System — VitaLife Klinika

## Product Context
- **What this is:** Premium private medical clinic website (bilingual AZ/RU)
- **Who it's for:** Urban professionals 25-55 seeking quality healthcare in Baku
- **Space/industry:** Private healthcare, premium medical services
- **Project type:** Marketing site + admin panel

## Aesthetic Direction
- **Direction:** Luxury/Refined with editorial touches
- **Decoration level:** Intentional — subtle tints, warm gradients, no heavy decoration
- **Mood:** Premium health magazine meets boutique clinic. Warm and trustworthy, not cold and clinical. The first impression should feel like arriving at a private Swiss clinic, not a state hospital.
- **Key insight:** Every Azerbaijani clinic uses hospital blue (#0D9488, #2196F3). VitaLife uses deep forest emerald — same health/growth associations, radically more distinctive.

## Typography
- **Display/Hero:** Fraunces (optical variable serif, wght 300-700, opsz 9-144) — editorial authority, luxury health magazine energy. The italic variant is a design asset used deliberately in headings.
- **Body/UI:** DM Sans (humanist sans-serif, variable opsz 9-40) — warm, readable, never robotic
- **Loading:** Google Fonts CDN — both loaded via next/font/google
- **Pairing rationale:** Fraunces italic in hero headings creates an instant visual signature nobody else in the market has. DM Sans body keeps it legible and modern.
- **Scale:**
  - hero: clamp(2.5rem, 5vw, 4rem) / Fraunces 500
  - h1: 2.25rem / Fraunces 600
  - h2: 1.75rem / Fraunces 500
  - h3: 1.25rem / DM Sans 600
  - body: 1rem / DM Sans 400
  - small: 0.875rem / DM Sans 400
  - label: 0.75rem / DM Sans 600 uppercase tracking-wide

## Color
- **Approach:** Balanced — emerald primary used purposefully, warm neutrals everywhere else
- **Primary:** `#064E3B` (emerald-900) — deep forest, used for CTAs, key accents, logo
- **Primary 600:** `#047857` — hover state for primary elements
- **Primary 500:** `#10B981` — lighter accent, links, icons, active states, section ornaments
- **Primary light:** `#ECFDF5` — badge backgrounds, subtle icon containers
- **Primary muted:** `#F0FDF4` — section background tints (not the page bg)
- **Surface:** `#FFFFFF` — cards, modals, form inputs
- **Surface Alt:** `#FAFAF8` — page background (warm, NOT cold gray or pure white)
- **Border:** `#E7E5E0` — warm stone border (NOT cold gray like slate-200)
- **Border light:** `#F5F4F2` — very subtle dividers
- **Text:** `#1C1917` — stone-950, warm near-black (NOT cold slate-900)
- **Text muted:** `#78716C` — stone-500, warm gray for secondary text
- **Text subtle:** `#A8A29E` — stone-400, captions and tertiary content
- **Text inverse:** `#FFFFFF`
- **Semantic:** success `#059669`, warning `#D97706`, error `#DC2626`, info `#0369A1`

## Spacing
- **Base unit:** 4px
- **Density:** Spacious — generous whitespace is the luxury signal
- **Section padding:** 80-96px vertical on desktop, 48px on mobile
- **Container:** max-width 1200px, padding-inline 24px (md: 32px)

## Layout
- **Approach:** Grid-disciplined with editorial hero
- **Hero:** Full-viewport-height, split 55/45 (text left, photo right)
- **Grid:** 12-column, sections use 4-column cards or 3-column features
- **Border radius:** sm: 8px, md: 12px, lg: 16px, xl: 20px, full: 9999px (buttons, badges)

## Motion (Emil Kowalski principles)
- **Approach:** Intentional — only where it aids comprehension or creates delight
- **Easing:** enter `cubic-bezier(0.25, 0.46, 0.45, 0.94)` / exit `ease-in`
- **Duration:** micro 100ms / short 200ms / medium 350ms / long 500ms
- **Hero entrance:** text from left (x: -24), photo from right (x: 24), opacity 0→1, stagger 0.15s
- **Card hover:** translateY(-4px), shadow deepens — NO scale transforms
- **Scroll animations:** whileInView, once: true, y: 20→0, opacity 0→1
- **NEVER:** bounce, spring, pulse, wiggle, rotation. No hover-scale on anything. No loop animations.
- **Navbar:** blur + shadow appear on scroll (CSS backdrop-filter, not JS)

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-14 | Deep forest emerald (#064E3B) as primary | Every AZ clinic uses teal-600; this is distinctive yet same health associations |
| 2026-06-14 | Fraunces (optical serif) for display | Editorial signature nobody else in medical space uses |
| 2026-06-14 | Warm surface (#FAFAF8) not cold white | Warmer feel reduces patient anxiety, feels less clinical |
| 2026-06-14 | DM Sans for body | Humanist sans — warm personality, not sterile |
| 2026-06-14 | Full-viewport hero split layout | Doctor photo immediately establishes trust |
