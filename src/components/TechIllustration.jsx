import { motion } from 'motion/react'

/**
 * Abstract workflow-canvas illustration used in place of photography.
 *
 * Drawn as inline SVG in the site palette: a panel of connected nodes branching
 * and converging, which is what building on a workflow platform actually looks
 * like. Vector, so it stays sharp at any size and adds no image weight.
 */

const COCOA = '#613D3B'
const WINE = '#701622'
const ROSE = '#E0B0AF'
const BLUSH = '#F1D6D4'
const CREAM = '#F4EEEC'

const nodes = [
  { x: 40, y: 176, fill: CREAM, stroke: 0.35, icon: ROSE, bar: 0.35 },
  { x: 218, y: 98, fill: BLUSH, stroke: 0.25, icon: WINE, bar: 0.4 },
  { x: 218, y: 254, fill: CREAM, stroke: 0.35, icon: COCOA, bar: 0.3 },
]

const connectors = [
  'M164,210 C190,210 192,132 218,132',
  'M164,210 C190,210 192,288 218,288',
  'M342,132 C368,132 370,210 396,210',
  'M342,288 C368,288 370,210 396,210',
]

const arrows = [
  [216, 132],
  [216, 288],
  [394, 210],
]

/** Dot grid behind the flow. */
const dots = []
for (let x = 36; x <= 528; x += 26) {
  for (let y = 96; y <= 388; y += 26) dots.push([x, y])
}

export default function TechIllustration({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 560 420"
      className={className}
      role="img"
      aria-label="Illustration of an automated workflow: connected steps branching and converging into a completed task"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
      fill="none"
    >
      {/* panel */}
      <motion.g
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.7 }}
      >
        <rect
          x="8"
          y="8"
          width="544"
          height="404"
          rx="16"
          fill="#F6F2E8"
          stroke={COCOA}
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
        <circle cx="38" cy="40" r="5.5" fill={ROSE} />
        <circle cx="58" cy="40" r="5.5" fill={BLUSH} />
        <circle cx="78" cy="40" r="5.5" fill={COCOA} fillOpacity="0.3" />
        <line x1="8" y1="68" x2="552" y2="68" stroke={COCOA} strokeOpacity="0.15" strokeWidth="1.5" />
        <g fill={COCOA} fillOpacity="0.1">
          {dots.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />
          ))}
        </g>
      </motion.g>

      {/* connectors draw themselves in */}
      <g stroke={COCOA} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
        {connectors.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            variants={{ hidden: { pathLength: 0, opacity: 0 }, shown: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.6, delay: 0.28 + i * 0.09, ease: 'easeInOut' }}
          />
        ))}
      </g>

      <motion.g
        fill={COCOA}
        fillOpacity="0.55"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.35, delay: 0.8 }}
      >
        {arrows.map(([x, y]) => (
          <polygon key={`${x}-${y}`} points={`${x},${y} ${x - 9},${y - 4.5} ${x - 9},${y + 4.5}`} />
        ))}
      </motion.g>

      {/* steps */}
      {nodes.map((n, i) => (
        <motion.g
          key={n.x + '-' + n.y}
          variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect
            x={n.x}
            y={n.y}
            width="124"
            height="68"
            rx="12"
            fill={n.fill}
            stroke={COCOA}
            strokeOpacity={n.stroke}
            strokeWidth="1.5"
          />
          <rect x={n.x + 18} y={n.y + 25} width="18" height="18" rx="5" fill={n.icon} />
          <rect x={n.x + 46} y={n.y + 27} width="54" height="6" rx="3" fill={COCOA} fillOpacity={n.bar} />
          <rect x={n.x + 46} y={n.y + 41} width="34" height="6" rx="3" fill={COCOA} fillOpacity={n.bar * 0.7} />
        </motion.g>
      ))}

      {/* final step - resolved */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x="396" y="176" width="124" height="68" rx="12" fill={WINE} />
        <path
          d="M416,210 l6,7 l12,-14"
          stroke={CREAM}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="446" y="197" width="52" height="6" rx="3" fill={CREAM} fillOpacity="0.8" />
        <rect x="446" y="211" width="32" height="6" rx="3" fill={CREAM} fillOpacity="0.45" />
      </motion.g>
    </motion.svg>
  )
}
