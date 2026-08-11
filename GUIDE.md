# Everyday guide

How to run the site, change it, and put it online. No prior React knowledge needed -
for most edits you only ever touch one file.

---

## 1. Running it on your machine

You need Node.js (you have v22.14 - anything 20.19+ or 22.12+ works).

**One time only**, in `E:\subhash-portfolio`:

```bash
npm install
```

**Every time you want to work on it:**

```bash
npm run dev
```

The terminal prints something like:

```
➜  Local:   http://localhost:5173/
```

Open that link. Leave the terminal running - every time you save a file, the browser
updates by itself within a second. Press `Ctrl+C` in the terminal to stop.

> If port 5173 is already in use, Vite quietly picks the next free port (5174, 5175…).
> Always read the URL the terminal prints rather than assuming 5173.

**To check the real production version** (minified, exactly what visitors get):

```bash
npm run build
```

```bash
npm run preview
```

`build` writes the finished site into `dist/`. `preview` serves that folder locally
(usually http://localhost:4173). You do not need to run `build` for normal editing -
only to test the final output or when deploying manually.

---

## 2. Changing the words

**Almost everything lives in one file: [`src/data/content.js`](src/data/content.js).**

Open it, change the text between the quote marks, save. The browser updates instantly.

| What you want to change | The export to edit |
| --- | --- |
| Name, headline, email, phone, LinkedIn, GitHub, summary, About paragraphs | `profile` |
| The menu items | `navLinks` |
| The scrolling keyword strip | `marqueeWords` |
| The three big ITSM / HRSD / Platform panels | `expertise` |
| Job titles, companies, dates, locations | `roles` |
| Skill tags | `skillGroups` |
| "Get to know Subhash" Q&A grid | `gettingToKnow` |
| Certifications list | `certifications` |
| Degree and university | `education` |
| The lines that type out in the hero | `heroLines` |

Rules of thumb so you don't break anything:

- Keep the quotes, commas and curly braces exactly as they are - only change text inside `'…'`.
- If your text contains an apostrophe, use the curly one (`’`) as the existing entries do,
  or escape it (`\'`).
- To **add** an item, copy an existing block including its trailing comma and edit the copy.
- To **remove** one, delete the whole block including its comma.
- If the page goes blank, the terminal or the browser console tells you which line broke.
  Undo (`Ctrl+Z`) and save again.
- Some blocks near the bottom of the file are **commented out on purpose** (client
  engagements, the numbers band, accomplishments). Each says how to switch it back on.
  Read [INTERVIEW-NOTES.md](INTERVIEW-NOTES.md) before restoring the numbers.

**Other things you might want to change:**

| What | Where |
| --- | --- |
| Order of sections on the page | [`src/App.jsx`](src/App.jsx) - reorder the lines inside `<main>` |
| Colours, fonts, button style | [`src/index.css`](src/index.css) - the `@theme` block at the top |
| Browser tab title, description | [`index.html`](index.html) |
| A section's headline / layout | The matching file in [`src/components/`](src/components) |
| Your résumé PDF | Replace `public/Subhash-G-Kashyap-Resume.pdf` (keep the filename) |

---

## 3. Adding or replacing images

All images live in **`public/images/`**. The site refers to them by filename, so:

> **The easiest way to use your own photos: rename your file to match an existing one
> and overwrite it. No code changes at all.**

| Filename | Where it appears | Best shape |
| --- | --- | --- |
| `hero-portrait.jpg` | Hero, right panel + the mobile hero block | Portrait (4:5) |
| `hero-desk.jpg` | Hero, left panel | Portrait (3:4) |
| `intro-desk.jpg` | Intro section, next to the summary | Portrait (4:5) |
| `expertise-itsm.jpg` | Panel 01 - ITSM | Landscape |
| `expertise-hrsd.jpg` | Panel 02 - HRSD | Landscape |
| `expertise-platform.jpg` | Panel 03 - Platform Customization | Landscape |
| `about-workspace.jpg` | About, wide block | Landscape (16:10) |
| `about-posing.jpg` | About, left square | Portrait or square |
| `about-focus.jpg` | About, right square | Portrait or square |

Practical tips:

- Keep each file **under about 400 KB** so the site stays fast. Resize to ~1400px on the
  long edge before saving. [squoosh.app](https://squoosh.app) does this in the browser.
- The current files are Unsplash stock placeholders, **not photos of you** - see
  [`public/images/README.md`](public/images/README.md) for the source of each one.
- If a face gets cropped oddly, add `focal="top"` to that `<Artwork />` (see below).

**Adding an image somewhere new**, e.g. in a component:

```jsx
<Artwork
  src="/images/my-photo.jpg"   // file in public/images/
  alt="Short description"      // shown if the image fails, read by screen readers
  tone="blush"                 // gradient colour used as fallback
  focal="top"                  // optional: keeps faces in frame on square crops
  warm={false}                 // optional: turns off the warm colour filter
  className="aspect-[4/5] w-full"
/>
```

If the file is missing or misspelled, you get the gradient instead of a broken image icon.

---

## 4. Putting it on GitHub

You need this before any one-click deployment, and it's also your backup and undo history.

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Portfolio site"
```

Then create an empty repository on GitHub (e.g. `portfolio`) - do **not** add a README
there - and connect it:

```bash
git remote add origin https://github.com/subhashgkashyap/portfolio.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

After any future change:

```bash
git add . && git commit -m "Updated experience section" && git push
```

`node_modules/` and `dist/` are already excluded by [`.gitignore`](.gitignore) - don't
commit them.

---

## 5. Deploying it

The site is fully static (HTML, CSS, JS, images), which means it can be hosted free
almost anywhere, loads fast worldwide, and has nothing to hack.

### Recommended: Vercel

1. Push to GitHub (step 4).
2. Sign in at [vercel.com](https://vercel.com) with GitHub → **Add New → Project** → pick the repo.
3. It auto-detects Vite. Confirm: build command `npm run build`, output directory `dist`.
4. **Deploy**. You get `your-project.vercel.app` in about a minute.
5. Every `git push` after that redeploys automatically.

Add a custom domain under **Settings → Domains** (a `.com` costs roughly ₹800-1,200/year
from Namecheap, GoDaddy or Cloudflare). Something like `subhashkashyap.dev` reads far
better on a résumé than a `.vercel.app` link.

### The alternatives

| Host | Free tier | Why you'd pick it |
| --- | --- | --- |
| **Vercel** | Generous | Best Vite/React experience, easiest serverless functions later |
| **Netlify** | Generous | Built-in **form handling with zero backend** (see BACKEND.md) |
| **Cloudflare Pages** | Very generous | Fastest CDN, free analytics, Workers + D1 database |
| **GitHub Pages** | Free | Simplest if you're already on GitHub - but static only, no backend, and needs `base: '/repo-name/'` added to `vite.config.js` |
| **Azure Static Web Apps** | Free tier | Familiar if you already use Azure DevOps; ties into Azure Functions |
| **Render / Firebase Hosting** | Free tier | Fine, but no real advantage here |

**Manual deploy without git** (any host that accepts a folder): run `npm run build` and
drag the `dist` folder onto Netlify Drop or your host's upload page. Fine for a one-off,
but you lose automatic redeploys.

### After you deploy

- Test it on your phone, not just the browser's device preview.
- Add the link to your LinkedIn profile, résumé header and email signature.
- Use tagged links so you can tell where visitors came from, e.g.
  `?src=linkedin`, `?src=resume` (see BACKEND.md on analytics).

---

## 6. Collecting feedback from people

Right now the site has no way to receive anything - the contact section opens the
visitor's email app, and nothing is recorded anywhere.

- **Today, zero effort:** share the link and collect comments over WhatsApp/email yourself.
- **This week, ~15 minutes:** add a real contact form using a hosted form service.
- **Later:** a feedback box, view counter and an admin page where you can see it all.

All three are laid out, with the trade-offs and what I'd build first, in
**[BACKEND.md](BACKEND.md)**.

---

## 7. When something goes wrong

| Symptom | Fix |
| --- | --- |
| `npm : command not found` | Node isn't installed or isn't on PATH - reinstall from nodejs.org and reopen the terminal |
| Blank white page | Look at the terminal and the browser console (F12) - usually a typo in `content.js`; undo and save |
| Port already in use | Vite picks the next port automatically; read the URL it prints |
| Images not showing | Filename or extension mismatch (`.jpg` vs `.jpeg`), or the file isn't in `public/images/` |
| Styles look unstyled | Stop the dev server and run `npm run dev` again |
| Everything is broken and you don't know why | `git checkout .` reverts uncommitted changes (only after step 4) |
