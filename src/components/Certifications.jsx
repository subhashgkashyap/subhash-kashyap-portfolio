import Reveal from './Reveal'
import { certifications } from '../data/content'

/**
 * Deliberately understated: a plain hairline-separated list rather than cards.
 * These are credentials, not headline achievements, so they are stated and not
 * dressed up.
 */
export default function Certifications() {
  return (
    <section id="certifications" className="grain bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-black/50">certifications</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="h-serif mt-6 text-[clamp(1.9rem,3.6vw,2.75rem)]">
                Certified on the platform.
              </h2>
            </Reveal>
          </div>

          <ul>
            {certifications.map((name, i) => (
              <Reveal key={name} delay={i * 0.05}>
                <li className="rule flex items-baseline gap-5 py-5">
                  <span className="label-accent shrink-0 text-black/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[clamp(0.95rem,1.5vw,1.05rem)] text-black/80">{name}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/*
          ACCOMPLISHMENTS - REMOVED.

          The award / knowledge-transfer / interview-panel list used to sit here.
          The data is commented out in src/data/content.js; see INTERVIEW-NOTES.md
          for how to talk about each one. To restore: uncomment the data, re-add
          `accomplishments` to the import above, and restore this block.

          <div className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24">
            <Reveal>
              <p className="label-accent text-black/60">accomplishments</p>
            </Reveal>
            <div>
              {accomplishments.map((item, i) => (
                <Reveal key={item} delay={i * 0.06}>
                  <p className="rule py-6 text-black/75">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        */}
      </div>
    </section>
  )
}
