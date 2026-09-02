import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Typewriter from './Typewriter'
import { easing } from './Reveal'
import { profile, heroLines } from '../data/content'

const lines = ['Subhash G', 'Kashyap']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cream pt-32 pb-16 md:pt-40"
    >
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
      </motion.div>
    </section>
  )
}
