import Reveal from './Reveal'
import { gettingToKnow } from '../data/content'

export default function GetToKnow() {
  return (
    <section className="grain bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <p className="label-accent text-center text-black/60">get to know subhash</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-serif mx-auto mt-5 max-w-2xl text-center text-[clamp(1.9rem,3.6vw,2.75rem)]">
            A few details, straight from the source.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-20 gap-y-14 md:grid-cols-2">
          {gettingToKnow.map((item, i) => (
            <Reveal key={item.q} delay={(i % 2) * 0.08}>
              <div className="rule pt-8">
                <h3 className="h-display text-[clamp(1.4rem,2.8vw,2.35rem)] leading-tight">
                  {item.q}
                </h3>
                <p className="mt-5 text-black/75">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
