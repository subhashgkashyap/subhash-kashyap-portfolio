import Artwork from './Artwork'
import Reveal from './Reveal'
import { profile } from '../data/content'

export default function Intro() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 md:px-12 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[310px_minmax(0,1fr)] xl:gap-20">
        <Reveal>
          <Artwork
            tone="sand"
            src="/images/hero-portrait.jpg"
            alt="Software engineer standing with a coffee mug"
            className="aspect-[4/5] w-full"
            caption="ServiceNow · since 2023"
          />
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <p className="label-accent text-black/60">certified servicenow professional</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-serif mt-6 text-[clamp(1.9rem,3.6vw,2.75rem)]">
              3+ years designing, developing and testing ServiceNow solutions.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-justify hyphens-auto text-black/75">{profile.summary}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="#about" className="btn-outline mt-10 hover:bg-black hover:text-cream">
              more about me
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
