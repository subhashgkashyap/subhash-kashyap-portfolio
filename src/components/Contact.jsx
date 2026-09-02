import Reveal from './Reveal'
import Marquee from './Marquee'
import Logo from './Logo'
import { profile, navLinks } from '../data/content'

const socials = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'Email', href: `mailto:${profile.email}` },
]

export default function Contact() {
  return (
    <>
      <section id="contact" className="bg-cream py-24 text-center md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Reveal>
            <p className="label-accent text-black/60">let’s talk</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="h-serif mx-auto mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)]">
              Have a ServiceNow problem worth solving?
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <a
              href={`mailto:${profile.email}`}
              className="h-display mt-12 inline-block text-[clamp(1.1rem,2.6vw,2rem)] tracking-[0.06em] underline decoration-black/25 underline-offset-[10px] transition-colors duration-300 hover:decoration-black"
            >
              {profile.email}
            </a>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="eyebrow mt-6 text-black/55">
              {profile.phone} - {profile.location}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="btn-outline hover:bg-black hover:text-cream"
                >
                  {s.label.toLowerCase()}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <footer className="bg-cocoa py-14 text-cream">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 md:px-12 lg:flex-row lg:justify-between">
          <a href="#top" aria-label="Back to top" className="text-[19px]">
            <Logo tone="dark" />
          </a>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] tracking-[0.1em] text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-[11px] tracking-[0.1em] text-cream/50">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  )
}
