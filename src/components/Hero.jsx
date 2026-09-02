import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Typewriter from './Typewriter'
import { easing } from './Reveal'
import { profile, heroLines } from '../data/content'

const lines = ['Subhash G', 'Kashyap']

// const socials = [
//   { label: 'LinkedIn', href: profile.linkedin, external: true },
//   { label: 'GitHub', href: profile.github, external: true },
//   { label: 'Email', href: `mailto:${profile.email}`, external: false },
// ]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cream pt-32 pb-16 md:pt-40"
    >
      {/* Ambient wash - two soft colour fields drifting slowly behind the type.
          Held still for anyone who has asked for reduced motion. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aura animate-drift-a absolute -top-[18%] left-[4%] h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle,rgba(224,176,175,0.5)_0%,rgba(224,176,175,0)_62%)]" />
        <div className="aura animate-drift-b absolute -right-[6%] -bottom-[22%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(241,214,212,0.62)_0%,rgba(241,214,212,0)_62%)]" />
        <div className="aura animate-drift-a absolute top-[35%] right-[22%] h-[26vmax] w-[26vmax] rounded-full bg-[radial-gradient(circle,rgba(112,22,34,0.07)_0%,rgba(112,22,34,0)_65%)]" />
      </div>

      <motion.div style={{ y: textY }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easing }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/45 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-wine" />
            </span>
            <span className="eyebrow text-black/60">ServiceNow Developer</span>
          </span>
        </motion.div>

        <h1 className="h-display mt-8 text-center text-[clamp(2.2rem,5.2vw,4.4rem)]">
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
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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

        {/* Social links - removed from the hero; contact lives in the Contact
            section only. Uncomment this block AND the `socials` array above to
            bring them back. Both must be uncommented together.

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.external ? '_blank' : undefined}
              rel={s.external ? 'noreferrer' : undefined}
              className="group eyebrow relative text-black/50 transition-colors hover:text-black"
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
        */}
      </motion.div>
    </section>
  )
}
