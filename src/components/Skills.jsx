import Reveal from './Reveal'
import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-black/50">skills</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="h-serif mt-6 text-[clamp(1.9rem,3.6vw,2.75rem)]">
                The toolkit behind the work.
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-x-14 gap-y-12 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={(i % 2) * 0.06}>
                <div className="rule pt-7">
                  <h3 className="label-accent">{group.title}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-black/15 px-4 py-[7px] text-[12px] tracking-[0.06em] text-black/75 transition-colors duration-300 hover:border-black hover:bg-blush"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
