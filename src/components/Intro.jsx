import Artwork from './Artwork'
import Reveal from './Reveal'
import { profile } from '../data/content'

export default function Intro() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 md:px-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <Reveal>
          <Artwork
            tone="sand"
            src="/images/intro-desk.jpg"
            alt="Developer at a laptop in an office"
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
            <p className="mt-8 max-w-xl text-black/75">{profile.summary}</p>
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
