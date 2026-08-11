# Images

These are **stock placeholders**, not photos of Subhash. They were pulled from
Unsplash (free for commercial use under the [Unsplash License](https://unsplash.com/license),
no attribution required) so the layout reads as intended until real photos exist.
Replace any of them by overwriting the file with the same name — no code changes needed.

| File | Used in | Unsplash source |
| --- | --- | --- |
| `hero-portrait.jpg` | Hero (right panel, and the mobile hero block) | [photo-1720203979339](https://unsplash.com/photos/1720203979339-d3e21cf7ee5d) |
| `hero-desk.jpg` | Hero (left panel) | [photo-1631624210938](https://unsplash.com/photos/1631624210938-539575f92e3c) |
| `intro-desk.jpg` | Intro section | [photo-1623095211984](https://unsplash.com/photos/1623095211984-10e4a9326bc4) |
| `expertise-itsm.jpg` | Expertise 01 — ITSM | [photo-1581094794329](https://unsplash.com/photos/1581094794329-c8112a89af12) |
| `expertise-hrsd.jpg` | Expertise 02 — HRSD | [photo-1583508915901](https://unsplash.com/photos/1583508915901-b5f84c1dcde1) |
| `expertise-platform.jpg` | Expertise 03 — Platform Customization | [photo-1534665482403](https://unsplash.com/photos/1534665482403-a909d0d97c67) |
| `about-workspace.jpg` | About (wide block) | [photo-1603969409447](https://unsplash.com/photos/1603969409447-ba86143a03f6) |
| `about-posing.jpg` | About (left square) | [photo-1681164314433](https://unsplash.com/photos/1681164314433-7964ccf32bc7) |
| `about-focus.jpg` | About (right square) | [photo-1602992708529](https://unsplash.com/photos/1602992708529-c9fdb12905c9) |

## How images are rendered

Every image goes through the `<Artwork />` component:

```jsx
<Artwork src="/images/hero-portrait.jpg" alt="…" tone="blush" className="aspect-[4/5]" />
```

- `src` missing or the file fails to load → it falls back to a gradient in the `tone` colour.
- A light warm filter (`sepia(0.16) saturate(0.92)`) keeps photography inside the
  cream/rose palette. Pass `warm={false}` to turn it off for a specific image.
