import { motion } from 'motion/react'

const easing = [0.22, 1, 0.36, 1]

/** Fade + rise on scroll - the reference site's default section entrance. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  className = '',
  as = 'div',
}) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </Tag>
  )
}

export { easing }
