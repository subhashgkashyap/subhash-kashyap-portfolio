import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { navLinks, profile } from '../data/content'
import { easing } from './Reveal'
import Logo from './Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu if the viewport grows past the breakpoint while it is open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          scrolled || open
            ? 'bg-cream/95 py-3 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-md md:py-4'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 md:px-12">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label="Subhash G Kashyap - home"
            className="shrink-0 text-[17px] sm:text-[19px] md:text-[22px]"
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[14px] tracking-[0.02em] text-black/80 transition-colors hover:text-black"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contact" className="btn-outline hover:bg-black hover:text-cream">
              get in touch
            </a>
          </nav>

          {/* Menu toggle - everything below xl, where the full nav no longer fits */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[6px] rounded-full transition-colors duration-300 hover:bg-black/5 xl:hidden"
          >
            <span
              className={`block h-[1.5px] w-6 bg-black transition-transform duration-300 ${
                open ? 'translate-y-[7.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-black transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-black transition-transform duration-300 ${
                open ? '-translate-y-[7.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen menu. Kept mounted and toggled by opacity so it can never
          get stuck mid-exit; `inert` keeps it out of the tab order while closed. */}
      <motion.div
        inert={!open}
        aria-hidden={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 h-[100dvh] overflow-y-auto overscroll-contain bg-cream pt-24 pb-12 xl:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-5 md:px-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: open ? 0.05 * i + 0.08 : 0,
                duration: open ? 0.5 : 0.15,
                ease: easing,
              }}
              className="h-display border-b border-black/10 py-4 text-[clamp(1.5rem,7vw,2.25rem)] md:py-5"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="mt-9 flex flex-col items-start gap-4 px-5 md:px-12">
          <a
            href={`mailto:${profile.email}`}
            className="btn-outline max-w-full break-all hover:bg-black hover:text-cream"
          >
            {profile.email}
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="eyebrow">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="eyebrow">
              GitHub
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="eyebrow">
              Resume
            </a>
          </div>
        </div>
      </motion.div>
    </>
  )
}
