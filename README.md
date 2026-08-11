# Subhash G Kashyap - Portfolio

A personal portfolio site for Subhash G Kashyap, ServiceNow Developer.

**Stack:** React 19 + Vite 7 + Tailwind CSS v4 + Motion (Framer Motion) - no hand-rolled
CSS files or vanilla DOM scripting beyond the Tailwind theme layer.

> 📘 **[GUIDE.md](GUIDE.md)** - running it, editing text, swapping images, troubleshooting.
> 🚀 **[DEPLOY.md](DEPLOY.md)** - **start here to go live.** The zero-cost path: hosting, contact, analytics, database, and why you never run `npm run dev` in production.
> 🗣️ **[INTERVIEW-NOTES.md](INTERVIEW-NOTES.md)** - how to defend the metrics and accomplishments that were taken off the site, if you ever want them back.
> 🔌 **[BACKEND.md](BACKEND.md)** - the full menu of backend options and what to build first.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run preview` serves the production build locally.

## Where the content comes from

Every fact on the site lives in [`src/data/content.js`](src/data/content.js) and is taken
verbatim (or near-verbatim) from the résumé and LinkedIn profile export. Nothing is
invented - sections that had no source material were left out rather than filled in.
Edit that one file to update the site's copy.

## Design

The layout, type scale, palette, spacing and interaction language follow the reference
site provided for the brief:

- **Palette** - cream `#F4EEEC`, sand `#F6F2E8`, blush `#F1D6D4`, rose `#E0B0AF`,
  cocoa `#613D3B`, wine `#701622`, bark `#422819`.
- **Type** - two families only: **Bricolage Grotesque** for display and section headlines,
  **Inter** for body copy (15px/21px, 1.2px tracking), labels, navigation and buttons. Both
  are **bundled with the site** (`src/fonts.js`) rather than fetched from Google, so they
  always render and the page makes no third-party requests. Instrument Serif and Fraunces
  are also installed - swap the heading font by editing that one file.
- **Logo** - [`src/components/Logo.jsx`](src/components/Logo.jsx). The isometric cube is a
  redrawn vector version of the supplied mark, recoloured from green onto the site palette,
  with a `tone="dark"` variant for the footer. The wordmark is live text, so it follows the
  heading font. The favicon uses the same cube.
- **Components** - 300px-radius pill buttons, full-bleed alternating panels, a scrolling
  keyword marquee, scroll-reveal entrances, parallax hero panels and animated counters.

## Images

The photographs in `public/images/` are **Unsplash stock placeholders, not photos of
Subhash** - they are there so the layout reads as intended. Overwrite any file with the
same name to swap in a real photo; no code changes are needed. Full list and sources:
[`public/images/README.md`](public/images/README.md).

Images render through `<Artwork />`, which falls back to a palette gradient if a file is
missing and applies a light warm filter so photography sits inside the cream/rose palette.

## Structure

```
GUIDE.md             day-to-day: run, edit, add images, deploy
INTERVIEW-NOTES.md   talking about the metrics that were removed from the site
BACKEND.md           adding a contact form, analytics, feedback, admin page
src/
  App.jsx              section order
  index.css            Tailwind theme tokens, type styles, pill buttons
  data/content.js      all résumé / LinkedIn content
  components/          one file per section + Artwork / Reveal primitives
public/
  Subhash-G-Kashyap-Resume.pdf   linked from the hero and About section
  images/              photos (currently stock placeholders) + their sources
```
