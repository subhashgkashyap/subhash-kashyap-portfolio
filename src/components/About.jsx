import TechIllustration from './TechIllustration'
import Reveal from './Reveal'
import { profile, education } from '../data/content'

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 md:px-12 lg:grid-cols-[minmax(0,600px)_310px] lg:gap-16 xl:grid-cols-[minmax(0,768px)_380px] xl:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="h-serif text-[clamp(1.9rem,3.6vw,2.75rem)]">
              Hi, I’m Subhash.
              <span className="block">Nice to meet you.</span>
            </h2>
          </Reveal>

          {profile.about.map((para, i) => (
            <Reveal key={i} delay={0.08 + i * 0.06}>
              <p className="mt-5 max-w-3xl text-black/75">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div className="mt-5 max-w-xl pt-5">
              <p className="eyebrow text-black/45">education</p>
              <p className="label-accent mt-3">{education.school}</p>
              <p className="mt-2 text-black/70">
                {education.degree} · {education.years}
              </p>
            </div>
          </Reveal>

          {/* <Reveal delay={0.3}>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-outline mt-10 hover:bg-black hover:text-cream"
            >
              download resume
            </a>
          </Reveal> */}
        </div>

        <div className="order-1 lg:order-2">
          <TechIllustration className="w-full" />
        </div>
      </div>
    </section>
  )
}
