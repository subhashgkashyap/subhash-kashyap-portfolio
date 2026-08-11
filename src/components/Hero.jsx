import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Artwork from './Artwork'
import Typewriter from './Typewriter'
import { easing } from './Reveal'
import { profile, heroLines } from '../data/content'

const lines = ['Subhash G', 'Kashyap']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -130])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cream pt-32 pb-16 md:pt-40"
    >
      {/* flanking editorial panels */}
      <motion.div
        style={{ y: leftY }}
        className="pointer-events-none absolute top-[22%] left-0 hidden w-[16vw] max-w-[240px] lg:block"
      >
        <Artwork
          tone="blush"
          src="/images/hero-desk.jpg"
          alt="Developer working across two screens of code"
          className="aspect-[3/4]"
        />
      </motion.div>
      <motion.div
        style={{ y: rightY }}
        className="pointer-events-none absolute right-0 bottom-[10%] hidden w-[18vw] max-w-[280px] lg:block"
      >
        <Artwork
          tone="rose"
          src="/images/hero-portrait.jpg"
          alt="Software engineer standing with a coffee mug"
          className="aspect-[4/5]"
        />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easing }}
          className="eyebrow text-center text-black/55"
        >
          ServiceNow Developer
        </motion.p>

        <h1 className="h-display mt-7 text-center text-[clamp(2.2rem,5.2vw,4.4rem)]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: easing }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 flex min-h-[3.4em] items-start justify-center sm:min-h-[2.2em]"
        >
          <Typewriter
            lines={heroLines}
            className="text-center text-[clamp(1rem,2.1vw,1.35rem)] leading-[1.5] tracking-[0.01em] text-black/70"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: easing }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#experience" className="btn-outline hover:bg-black hover:text-cream">
            view my experience
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="btn-outline border-black/25 hover:bg-black hover:text-cream"
          >
            resume
          </a>
        </motion.div>

        {/* On small screens the flanking panels are hidden, so the hero carries
            a single image of its own instead of ending on empty space. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: easing }}
          className="mx-auto mt-14 max-w-[280px] lg:hidden"
        >
          <Artwork
            tone="blush"
            src="/images/hero-portrait.jpg"
            alt="Software engineer standing with a coffee mug"
            focal="top"
            className="aspect-[4/5] w-full"
          />
        </motion.div>
      </motion.div>

    </section>
  )
}
