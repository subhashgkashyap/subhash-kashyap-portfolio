import Artwork from './Artwork'
import Reveal from './Reveal'
import { profile, education } from '../data/content'

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 md:px-12 lg:grid-cols-2 lg:gap-24">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="h-serif text-[clamp(1.9rem,3.6vw,2.75rem)]">
              Hi, I’m Subhash.
              <span className="block">Nice to meet you.</span>
            </h2>
          </Reveal>

          {profile.about.map((para, i) => (
            <Reveal key={i} delay={0.08 + i * 0.06}>
              <p className="mt-7 max-w-xl text-black/75">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div className="rule mt-10 max-w-xl pt-7">
              <p className="eyebrow text-black/45">education</p>
              <p className="label-accent mt-3">{education.school}</p>
              <p className="mt-2 text-black/70">
                {education.degree} · {education.years}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-outline mt-10 hover:bg-black hover:text-cream"
            >
              download resume
            </a>
          </Reveal>
        </div>

        <div className="order-1 grid grid-cols-2 gap-5 lg:order-2">
          <Reveal className="col-span-2">
            <Artwork
              tone="blush"
              src="/images/about-workspace.jpg"
              alt="Multi-monitor developer workspace"
              className="aspect-[16/10] w-full"
              caption="Bengaluru, India"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Artwork
              tone="rose"
              src="/images/about-posing.jpg"
              alt="Software engineer standing with arms folded"
              focal="top"
              className="aspect-square w-full"
            />
          </Reveal>
          <Reveal delay={0.14}>
            <Artwork
              tone="clay"
              src="/images/about-focus.jpg"
              alt="Engineer focused on a screen of code"
              className="aspect-square w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
