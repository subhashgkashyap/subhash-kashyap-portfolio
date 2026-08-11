/**
 * Fonts are bundled with the site rather than fetched from Google at runtime,
 * so they always render - no third-party request that can be slow, blocked on a
 * corporate network, or fall back to Times New Roman.
 *
 * ── To change the heading font ──────────────────────────────────────────────
 * Swap the heading import below, then change --font-display / --font-serif in
 * src/index.css to match. All three are already installed:
 *
 *   Instrument Serif    → '@fontsource/instrument-serif/400.css'       (current, elegant serif)
 *       CSS name: 'Instrument Serif'
 *   Bricolage Grotesque → '@fontsource-variable/bricolage-grotesque'   (modern sans)
 *       CSS name: 'Bricolage Grotesque Variable'
 *   Fraunces            → '@fontsource-variable/fraunces'              (warm serif)
 *       CSS name: 'Fraunces Variable'
 */

// Headings
import '@fontsource/instrument-serif/400.css'

// Everything else - variable weight, one file covers 300-700
import '@fontsource-variable/inter'
