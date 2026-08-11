/**
 * Wordmark for the navigation bar and footer.
 *
 * The isometric cube is a redrawn vector version of the supplied logo - redrawn
 * rather than embedded so it stays sharp at any size and so its colours could be
 * moved from the original green onto the site palette (rose / cocoa / wine).
 * The "sgkashyap" wordmark is live text, so it picks up the site's heading font.
 *
 * To use the original raster file instead, drop it at public/images/logo.png and
 * replace <CubeMark /> below with an <img>.
 */

/** Two colourways so the mark keeps its contrast on cream and on cocoa. */
const tones = {
  light: {
    top: '#E0B0AF', // rose
    left: '#9A5A57', // rose fading into cocoa - keeps the three faces distinct
    right: '#701622', // wine
    inner: ['#3A1D1C', '#241011', '#160809'],
    seam: '#F4EEEC', // cream
  },
  dark: {
    top: '#F1D6D4', // blush
    left: '#E0B0AF', // rose
    right: '#B07E7C',
    inner: ['#3A1D1C', '#241011', '#160809'],
    seam: '#613D3B', // cocoa - matches the footer behind it
  },
}

function CubeMark({ className = '', tone = 'light' }) {
  const c = tones[tone] ?? tones.light
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="sgkashyap logo"
      fill="none"
    >
      {/* outer cube - top / left / right faces */}
      <path d="M50 5 L88.97 27.5 L50 50 L11.03 27.5 Z" fill={c.top} />
      <path d="M11.03 27.5 L50 50 L50 95 L11.03 72.5 Z" fill={c.left} />
      <path d="M88.97 27.5 L88.97 72.5 L50 95 L50 50 Z" fill={c.right} />

      {/* stem from the inner cube down to the base vertex */}
      <path d="M50 55 L50 95" stroke={c.seam} strokeWidth="2.5" />

      {/* inner cube, reading as a notch cut into the top face */}
      <path d="M50 22 L66.45 31.5 L50 41 L33.55 31.5 Z" fill={c.inner[0]} />
      <path d="M33.55 31.5 L50 41 L50 60 L33.55 50.5 Z" fill={c.inner[1]} />
      <path d="M66.45 31.5 L66.45 50.5 L50 60 L50 41 Z" fill={c.inner[2]} />

      {/* face separators */}
      <g stroke={c.seam} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M50 5 L88.97 27.5 L88.97 72.5 L50 95 L11.03 72.5 L11.03 27.5 Z" />
        <path d="M11.03 27.5 L50 50 L88.97 27.5" />
      </g>
    </svg>
  )
}

export default function Logo({ className = '', tone = 'light', textClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] ${className}`}>
      <CubeMark tone={tone} className="h-[1.55em] w-[1.55em] shrink-0" />
      <span
        className={`font-display leading-none font-semibold tracking-[-0.02em] ${textClassName}`}
      >
        sgkashyap
      </span>
    </span>
  )
}

export { CubeMark }
