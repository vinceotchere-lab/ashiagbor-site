# G. Ashiagbor — Living Atlas design handoff

This folder is the source of truth for implementing the remaining pages. The HTML files are semantic composition blueprints, not production React. Preserve their hierarchy, pacing, copy roles, and responsive intent when translating them into Next.js components.

## Brand thesis

**Working title:** The Living Atlas  
**Core thought:** *Seeing what the land remembers.*  
**Narrative movement:** Orbit → evidence → field validation → stewardship.

The Naruto influence is structural, not decorative:

- mission dossiers become research records;
- scrolls become chronology and publication archives;
- village/element systems become research-domain emblems;
- speed-line rhythm becomes directional motion and map telemetry;
- seals become credentials, verification states, and site markers;
- the “long mission” becomes mentorship and environmental stewardship.

Never use characters, headbands, franchise logos, cosplay language, shuriken, or anime-style portraits. The professor and his work must always remain the subject.

## Design tokens

| Token | Value | Use |
|---|---:|---|
| Ink | `#171714` | primary text, dark sections |
| Field paper | `#F1EADC` | global canvas |
| Cream | `#F8F3E9` | cards and manuscripts |
| Signal orange | `#E85D2A` | only decisive actions, active data, emphasis |
| Forest | `#255C45` | environmental authority |
| Spectral cyan | `#55A3AA` | water/radar signals |
| Field line | `#CFC4B1` | dividers and cartographic grids |

Typography:

- Display: `Iowan Old Style`, `Baskerville`, `Times New Roman`, serif.
- UI/body: `Avenir Next`, `Segoe UI`, Arial, sans-serif.
- Telemetry: `Courier New`, monospace.
- Large titles use `0.79–0.88` line height and `-0.035em` to `-0.065em` tracking.
- Italic display text carries the orange narrative phrase. Never italicize body copy.

## Shared composition rules

1. Every page opens with a unique editorial proposition, not its navigation label.
2. Every major section has a numbered chapter marker such as `02 / FORMATION`.
3. Use hard 1px rules and offset shadows. Avoid generic rounded SaaS cards.
4. Keep paragraphs to 55–68 characters per line.
5. Orange should occupy less than 10% of any viewport.
6. Use asymmetry on desktop; collapse to a clear single-column reading order on mobile.
7. Motion should communicate scanning, revealing, or travelling—not merely make cards float.
8. Respect `prefers-reduced-motion`.

## Existing assets

- Main generated atlas artwork: `public/images/ghana-field-atlas.png`
- Natural canopy satellite image: `public/images/ghana_satellite_canopy.jpg`
- Infrared satellite image: `public/images/ghana_satellite_infrared.jpg`
- Brand reference supplied by client: `site-logo.jpg`
- Domain emblem component: `components/shared/DomainEmblem.tsx`
- Naruto quote source: `naruto-quotes.json`

The generated atlas art was intentionally created without text, characters, logos, or franchise iconography. Use it only for the homepage and broad campaign moments; the inner pages should feel more archival and instrument-like.

## Page implementation order

1. `about.html` — establishes editorial typography and credential language.
2. `atlas.html` — establishes the field-console interaction model.
3. `publications.html` — applies the archival system to dense content.
4. `journey.html` — turns chronology into the long-mission narrative.
5. `connect.html` — creates a quiet, decisive ending.

## Accessibility and responsive requirements

- Minimum body text: 15px desktop, 14px mobile.
- All interactive targets: minimum 44×44px.
- Orange-on-paper is decorative unless text is large/bold; body links should use ink plus underline.
- Map sites must be accessible from the ledger without interacting with the map.
- Keep a visible focus state using a 2px orange outline.
- Mobile map order: map first, ledger second.
- Do not trap scroll inside more than one nested region on mobile.

## Acceptance checklist

- Each route looks recognizably related but has a distinct spatial personality.
- No generic gradient hero, pill-card grid, testimonial section, or stock profile portrait.
- Publication search and filters remain fully functional.
- Map filters, marker selection, fly-to animation, and site dossier remain functional.
- Timeline filters and scroll-progress line remain functional.
- Contact form retains validation and mail-client behavior.
- Test at 390px, 768px, 1280px, and 1440px widths.
- Verify keyboard navigation and reduced motion.

