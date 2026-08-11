import { useEffect, useState } from 'react'

/**
 * Types each line out, holds it, erases it, then moves to the next - looping.
 *
 * Visitors who have asked their OS to reduce motion get the first line rendered
 * statically instead, with no animation and no blinking caret.
 */
export default function Typewriter({
  lines,
  typeSpeed = 45,
  eraseSpeed = 22,
  holdTime = 1900,
  className = '',
}) {
  const [reduced, setReduced] = useState(false)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced || !lines.length) return
    const current = lines[index]

    if (!erasing && text === current) {
      const t = setTimeout(() => setErasing(true), holdTime)
      return () => clearTimeout(t)
    }

    if (erasing && text === '') {
      const t = setTimeout(() => {
        setErasing(false)
        setIndex((i) => (i + 1) % lines.length)
      }, 320)
      return () => clearTimeout(t)
    }

    const t = setTimeout(
      () => setText(current.slice(0, text.length + (erasing ? -1 : 1))),
      erasing ? eraseSpeed : typeSpeed,
    )
    return () => clearTimeout(t)
  }, [text, erasing, index, lines, reduced, typeSpeed, eraseSpeed, holdTime])

  if (reduced) {
    return <p className={className}>{lines[0]}</p>
  }

  return (
    <p className={className} aria-label={lines.join('. ')}>
      <span aria-hidden="true">
        {text}
        <span className="animate-caret ml-[0.08em] inline-block w-[0.06em] self-stretch bg-current align-[-0.12em] text-current">
          &nbsp;
        </span>
      </span>
    </p>
  )
}
