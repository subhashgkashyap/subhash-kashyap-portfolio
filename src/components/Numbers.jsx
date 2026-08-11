import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import Reveal from './Reveal'
import { numbers } from '../data/content'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="h-display block text-[clamp(2.8rem,6vw,4.6rem)] leading-none">
      {display}
      {suffix}
    </span>
  )
}

export default function Numbers() {
  return (
    <section className="grain bg-wine py-24 text-cream md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <p className="label-accent text-center text-cream/70">by the numbers</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-serif mx-auto mt-6 max-w-2xl text-center text-[clamp(1.8rem,3.4vw,2.6rem)]">
            Outcomes delivered on the platform.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="text-center">
              <Counter value={item.value} suffix={item.suffix} />
              <p className="eyebrow mt-5 text-cream/70">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
