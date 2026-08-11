import { motion } from 'motion/react'
import Artwork from './Artwork'
import Reveal, { easing } from './Reveal'
import { expertise } from '../data/content'

const panelBg = {
  cocoa: 'bg-cocoa',
  wine: 'bg-wine',
  bark: 'bg-bark',
}

export default function Expertise() {
  return (
    <section id="expertise" className="bg-cocoa">
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:px-12 md:py-28">
        <Reveal>
          <p className="eyebrow text-cream/60">what I work on</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-serif mx-auto mt-6 max-w-3xl text-[clamp(1.9rem,3.6vw,2.75rem)] text-cream">
            Three areas of the platform I work in every day.
          </h2>
        </Reveal>
      </div>

      <div>
        {expertise.map((item, i) => (
          <motion.article
            key={item.number}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: easing }}
            className="group grid min-h-[520px] lg:grid-cols-2"
          >
            <div
              className={`${i % 2 ? 'lg:order-2' : ''} relative min-h-[280px] overflow-hidden`}
            >
              <Artwork
                tone={item.art}
                src={item.img}
                alt={item.imgAlt}
                className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <span className="h-display absolute bottom-8 left-8 text-[clamp(3.5rem,7vw,6rem)] text-cream/35 mix-blend-overlay select-none">
                {item.number.replace('.', '')}
              </span>
            </div>

            <div
              className={`${panelBg[item.tone]} grain flex flex-col justify-center px-6 py-20 md:px-16 md:py-24`}
            >
              <div className="max-w-xl">
                <Reveal>
                  <p className="label-accent text-cream/80">{item.number}</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h3 className="h-display mt-4 text-[clamp(1.9rem,3.6vw,3rem)] text-cream">
                    {item.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-7 text-cream/85">{item.body}</p>
                </Reveal>
                <Reveal delay={0.18}>
                  <a href="#experience" className="btn-solid mt-9">
                    see it in practice
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </Reveal>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
