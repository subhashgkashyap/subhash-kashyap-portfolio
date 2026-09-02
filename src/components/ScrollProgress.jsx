import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Thin bar across the very top that fills as the page scrolls.
 * Sits above the header (z-60) so it stays visible while the nav is sticky.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-wine via-cocoa to-rose"
    />
  )
}
