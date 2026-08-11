import { marqueeWords } from '../data/content'

export default function Marquee() {
  const strip = [...marqueeWords, ...marqueeWords]

  return (
    <div className="grain group relative overflow-hidden border-y border-black/10 bg-blush py-4">
      {/* Sliding pauses while the pointer is over the strip, and resumes on leave. */}
      <div className="animate-marquee flex w-max whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {strip.map((word, i) => (
              <span
                key={`${copy}-${word}-${i}`}
                className="eyebrow flex items-center gap-6 px-6 text-[11px] text-black/75"
              >
                {word}
                <span className="text-cocoa">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
