import { useState } from 'react'

/**
 * Editorial image block.
 *
 * The reference site is built on personal photography; none was supplied here,
 * so each block renders a soft gradient composition in the site palette. Drop a
 * file into /public/images and pass `src` to swap any block for a real photo -
 * if the file is missing the gradient is used instead.
 */
const tones = {
  blush: {
    base: '#f1d6d4',
    layers: [
      'radial-gradient(120% 90% at 20% 15%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%)',
      'radial-gradient(90% 80% at 85% 80%, rgba(224,176,175,0.95) 0%, rgba(224,176,175,0) 60%)',
      'radial-gradient(70% 60% at 60% 40%, rgba(97,61,59,0.18) 0%, rgba(97,61,59,0) 70%)',
    ],
  },
  rose: {
    base: '#e0b0af',
    layers: [
      'radial-gradient(100% 100% at 75% 10%, rgba(246,242,232,0.95) 0%, rgba(246,242,232,0) 55%)',
      'radial-gradient(80% 90% at 15% 85%, rgba(112,22,34,0.35) 0%, rgba(112,22,34,0) 65%)',
    ],
  },
  sand: {
    base: '#f6f2e8',
    layers: [
      'radial-gradient(90% 80% at 25% 20%, rgba(241,214,212,0.9) 0%, rgba(241,214,212,0) 60%)',
      'radial-gradient(85% 85% at 80% 85%, rgba(102,81,66,0.28) 0%, rgba(102,81,66,0) 62%)',
    ],
  },
  cocoa: {
    base: '#613d3b',
    layers: [
      'radial-gradient(95% 85% at 20% 15%, rgba(241,214,212,0.55) 0%, rgba(241,214,212,0) 60%)',
      'radial-gradient(90% 90% at 85% 90%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%)',
    ],
  },
  wine: {
    base: '#701622',
    layers: [
      'radial-gradient(100% 90% at 80% 10%, rgba(224,176,175,0.6) 0%, rgba(224,176,175,0) 60%)',
      'radial-gradient(80% 80% at 10% 90%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%)',
    ],
  },
  bark: {
    base: '#422819',
    layers: [
      'radial-gradient(100% 90% at 30% 12%, rgba(224,176,175,0.45) 0%, rgba(224,176,175,0) 62%)',
      'radial-gradient(90% 90% at 90% 85%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)',
    ],
  },
  clay: {
    base: '#665142',
    layers: [
      'radial-gradient(95% 85% at 70% 20%, rgba(246,242,232,0.6) 0%, rgba(246,242,232,0) 58%)',
      'radial-gradient(85% 85% at 10% 90%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 62%)',
    ],
  },
}

export default function Artwork({
  tone = 'blush',
  src,
  alt = '',
  caption,
  className = '',
  /** Warms photography slightly so it sits inside the cream/rose palette. */
  warm = true,
  /** object-position for the photo, e.g. 'top' to keep a face in frame. */
  focal = 'center',
  children,
}) {
  const [failed, setFailed] = useState(false)
  const t = tones[tone] ?? tones.blush
  const showImage = src && !failed

  return (
    <div
      className={`grain relative isolate overflow-hidden ${className}`}
      style={
        showImage
          ? undefined
          : { backgroundColor: t.base, backgroundImage: t.layers.join(', ') }
      }
    >
      {showImage && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{
            objectPosition: focal,
            ...(warm ? { filter: 'sepia(0.16) saturate(0.92) contrast(1.02)' } : {}),
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!showImage && caption && (
        <span className="label-accent absolute bottom-5 left-5 z-10 text-black/45">
          {caption}
        </span>
      )}
      {children}
    </div>
  )
}
