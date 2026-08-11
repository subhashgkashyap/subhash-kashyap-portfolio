import Reveal from './Reveal'
import { roles } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-black/50">experience</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-serif mt-6 max-w-3xl text-[clamp(1.9rem,3.6vw,2.75rem)]">
            Where I’ve been building.
          </h2>
        </Reveal>

        {/* Role timeline */}
        <div className="mt-16">
          {roles.map((role, i) => (
            <Reveal key={`${role.company}-${role.title}`} delay={i * 0.05}>
              <div className="rule group grid grid-cols-1 gap-2 py-7 transition-colors duration-300 hover:bg-black/[0.03] md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,1fr)] md:items-baseline md:gap-8">
                <p className="eyebrow text-black/50">{role.period}</p>
                <h3 className="h-display text-[clamp(1.25rem,2.4vw,1.9rem)]">
                  {role.title}
                  <span className="ml-3 text-[15px] tracking-normal text-black/55 normal-case">
                    {role.company}
                  </span>
                </h3>
                <p className="text-black/60">{role.location}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/*
          CLIENT ENGAGEMENT TILES - REMOVED.

          The PepsiCo HRSD and Proximus cards used to sit here. Named client work
          was taken off the site. The data is commented out in src/data/content.js;
          uncomment it there, re-add `engagements` to the import above, and restore
          this block to bring them back.

          <div className="mt-24 grid gap-8 lg:grid-cols-2">
            {engagements.map((eng, i) => (
              <Reveal key={eng.client} delay={i * 0.08}>
                <article className="grain h-full bg-sand p-8 md:p-11">
                  <p className="eyebrow text-black/50">{eng.period}</p>
                  <h3 className="h-display mt-5 text-[clamp(1.5rem,2.8vw,2.1rem)]">{eng.client}</h3>
                  <p className="mt-3 text-[15px] text-black/65">{eng.role} · {eng.org}</p>
                  <ul className="mt-8 space-y-4">
                    {eng.points.map((point) => (
                      <li key={point} className="flex gap-4 text-black/75">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-rose" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        */}
      </div>
    </section>
  )
}
