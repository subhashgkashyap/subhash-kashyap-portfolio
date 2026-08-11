# Going live - the complete, zero-rupee path

Everything here costs **₹0 forever** at portfolio traffic. No credit card, no trial that
expires, no bill in month three. Where a free tier has a catch, I've said so.

---

## Part 1 - The one thing to understand first

> **"Do I need to run `npm run dev` after deploying?"**
>
> **No. Never.** Once deployed, your laptop can be switched off, thrown in a bag, or
> reinstalled and the site keeps serving visitors 24/7.

Here's what's actually going on, because this confusion is worth clearing up properly:

| Command | What it does | Who can see it | When you use it |
| --- | --- | --- | --- |
| `npm run dev` | Starts a **development server on your laptop** at `localhost`. Watches your files and refreshes the browser as you type. | **Only you.** `localhost` means "this machine". Nobody else on earth can reach it. | Only while you're *editing* the site |
| `npm run build` | Compiles everything into plain files (HTML, CSS, JS, images) in the `dist/` folder. No React, no Node needed to view them. | - | Rarely by hand; the host does it for you |
| Hosting (Vercel etc.) | Runs `npm run build` **on their servers**, then serves the `dist/` files from ~300 datacentres worldwide | **Everyone, always** | Automatically, every time you `git push` |

The site is what's called a **static site**: after building, it's just files. There's no
program that has to stay running, which is exactly why hosting it is free - a CDN serving
files costs the host almost nothing.

**The loop after deployment looks like this:**

```
edit a file → see it instantly at localhost (npm run dev) → happy?
   → git push → host rebuilds automatically → live for everyone in ~60 seconds
```

You run `npm run dev` on the days you feel like changing something. Visitors are never
affected either way.

---

## Part 2 - Pre-flight: what makes it a "proper" website

I've already done the ones marked ✅ - they were genuinely missing and would have hurt you,
especially the link preview, since your whole plan is to share this on LinkedIn.

| Item | Why it matters | Status |
| --- | --- | --- |
| **Favicon** | Without one the browser tab shows a blank sheet of paper and looks unfinished | ✅ `public/favicon.svg` + `apple-touch-icon.png` (wine "SK" monogram) |
| **Link preview card** | Paste your URL into LinkedIn/WhatsApp and a proper card appears instead of a naked link. This single thing changes how many people click. | ✅ `public/og-image.jpg` (1200×630, matches the site) + OG/Twitter tags |
| **Page title + description** | What Google shows in results | ✅ |
| **Structured data (JSON-LD)** | Tells Google this page is *a person* named Subhash who works on ServiceNow | ✅ |
| **robots.txt + sitemap.xml** | Lets search engines index you | ✅ |
| **Web manifest** | Lets phones "Add to Home Screen" with your icon | ✅ |
| **HTTPS** | Padlock in the address bar | Automatic on every host below |
| **Mobile tested** | Over half your visitors | ✅ verified 320px → 1440px |
| **Update the placeholder URL** | The meta tags contain `https://your-site.vercel.app` | ⬜ **You, after step 3** |
| **Analytics** | So you know if anyone visits | ⬜ Part 5 |
| **Working contact** | So people can reach you | ⬜ Part 4 |

---

## Part 3 - Deploy (about 15 minutes, one time)

### 3a. Put the code on GitHub

You need this once; after that everything is automatic. Run these in `E:\subhash-portfolio`:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Portfolio site"
```

Now create an empty repo at [github.com/new](https://github.com/new) named `portfolio`.
**Don't** tick "Add a README". Then:

```bash
git remote add origin https://github.com/subhashgkashyap/portfolio.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

> Bonus: a clean, well-documented repo on your GitHub profile is itself a portfolio piece.
> Recruiters do look.

### 3b. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Sign up with GitHub** (free "Hobby" plan, no card).
2. **Add New → Project** → select your `portfolio` repo → **Import**.
3. It auto-detects Vite. Leave everything as-is (build `npm run build`, output `dist`).
4. **Deploy.** ~60 seconds later you have a live URL.

You can rename it under **Settings → Domains** to something like
`subhash-kashyap.vercel.app` - free, and it reads fine on a résumé.

> **Is Vercel's free plan really free?** Yes, for personal, non-commercial projects - a
> portfolio qualifies. It's the plan hundreds of thousands of developers use for exactly
> this. No card required, and it cannot silently start charging you.

### 3b-alt. Deploy on Netlify - and exactly what to upload

> **The short answer: never upload the whole `E:\subhash-portfolio` folder.** Either connect the Git
> repo and upload nothing at all, or drag **only the `dist` folder**.

**Way A - connect GitHub (recommended, nothing to upload)**

1. Push to GitHub (step 3a).
2. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** → GitHub → pick the repo.
3. Netlify reads the Vite setup. Confirm these two fields:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Deploy site.** Every `git push` after that rebuilds and republishes automatically.

**Way B - drag and drop (no Git)**

1. Build it first, otherwise there is nothing to upload:

```bash
npm run build
```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag **the `dist` folder itself** (`E:\subhash-portfolio\dist`) onto the page. Not the project root.

Way B has no automatic updates - after any change you must run `npm run build` again and
re-drag `dist`.

**Why not the whole folder?** Two reasons, and the first one is fatal:

- The `index.html` in the project root is a *source* file. It points at `/src/main.jsx`,
  which no browser can run. Upload the root and you get a blank page. Only the `index.html`
  inside `dist` points at the compiled, minified files.
- `node_modules` is ~83 MB and tens of thousands of files. It is build machinery, rebuilt
  from `package.json` whenever needed. It never belongs on a web server.

**What is and isn't deployed**

| Folder / file | Deployed? | Why |
| --- | --- | --- |
| `dist/` | ✅ **this is the site** | The compiled output - HTML, CSS, JS, images, résumé PDF, favicon |
| `src/` | ❌ | Source code. It gets compiled *into* `dist/assets` |
| `public/` | ❌ directly | Its contents are copied into `dist/` at build time |
| `index.html` (root) | ❌ | The source template; the built copy lands in `dist/` |
| `node_modules/` | ❌ | 83 MB of build tooling |
| `package.json`, `vite.config.js` | Only for Way A | Netlify needs them to run the build; irrelevant for drag-and-drop |
| `*.md` docs, `.claude/` | ❌ | Notes for you, not for visitors |

With Way A you don't have to think about any of this - `.gitignore` already excludes
`node_modules` and `dist`, and Netlify builds the rest itself.

**No `_redirects` file needed.** That's for apps with client-side routing. This site is a
single page with anchor links, so every URL a visitor can reach is already `/`.

### 3c. Fix the placeholder URL (2 minutes, don't skip)

Now that you know your address, replace `https://your-site.vercel.app` with the real one in:

- `index.html` - 5 places (canonical, og:url, og:image, twitter:image, JSON-LD `url`)
- `public/robots.txt` - 1 place
- `public/sitemap.xml` - 1 place

Then:

```bash
git add . && git commit -m "Set live URL" && git push
```

Test the preview card at [opengraph.xyz](https://www.opengraph.xyz) - paste your URL and
you should see the cream card with your name.

> LinkedIn caches previews aggressively. If you shared the link before this step, clear it
> with LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).

### 3d. Tell Google you exist

[Google Search Console](https://search.google.com/search-console) → add your URL as a
property → submit `sitemap.xml`. Free. Takes a few days to appear in search results for
"Subhash G Kashyap".

---

## Part 4 - Making "contact me" actually work (free)

### It already works, today

The contact section opens the visitor's email app with your address filled in. That is a
real, functioning contact method with zero dependencies - **if you deploy right now,
people can reach you.** Don't let the rest of this document block you from shipping.

Its weakness: if someone is on a work laptop with no email client configured, clicking does
nothing, and they leave. A form converts better and can't fail that way.

### Option Zero - no form, no database, nothing to maintain

If all you want is "someone reads this, likes it, and reaches me", **you do not need a
backend at all.** This is a completely legitimate end state, not a compromise. Every option
below is free forever, cannot break, cannot be shut down by a vendor, and stores nothing
anywhere except your own inbox.

| Channel | How | Why it's good | Watch out for |
| --- | --- | --- | --- |
| **Email link** ⭐ | `mailto:` - already on the site | Universal, zero dependencies | Fails silently if they have no mail app configured |
| **Email shown as copyable text** ⭐ | The address is displayed, not hidden behind a button | Works even when `mailto:` doesn't - they copy and paste | A public address gets scraped by spam bots |
| **LinkedIn DM** | Link to your profile - already on the site | Where recruiters *prefer* to talk; you see who they are | - |
| **WhatsApp** | `https://wa.me/919591957689` opens a chat, prefilled if you like | Huge in India, instant, works on desktop too | Publishes your phone number to the whole internet |
| **Calendly / Cal.com** | Free tier, "book a 15-min call" link | Skips the back-and-forth entirely | One more account |
| **Telegram** | `https://t.me/yourusername` | Free, no number exposed if you set a username | Fewer people use it professionally |

**Belt and braces:** show the email as text *and* make it a `mailto:` link *and* add a
"copy" button. Then no visitor can fail to contact you, whatever their setup - and you've
still written zero backend code.

> **One fact worth knowing:** a static site **cannot send email by itself**. Sending mail
> requires SMTP credentials, and anything in the browser is visible to everyone - so
> putting a password there would just get it stolen. That's the entire reason form services
> and serverless functions exist. Your two honest choices are "the visitor's own mail app
> sends it" (`mailto:`) or "someone else's server sends it" (a form service or your own
> function). There is no third option.

### On putting your email and phone number in public

Both are on the site right now, and both will be scraped within weeks of going live. That's
a trade, not a mistake - being reachable is the whole point. Just decide deliberately:

- **Email in public:** fine. Gmail's spam filter is excellent. Most people do this.
- **Phone in public:** riskier. Indian mobile numbers on public pages attract spam calls
  and WhatsApp marketing. If you'd rather not, delete the `phone` line from
  `src/data/content.js` - people who genuinely want to reach you will email.
- **Want zero exposure?** Use a form instead and remove both. The form posts to a service;
  your address never appears in the page source.

### Option A - hosted form service (recommended, ~15 min, free)

| Service | Free limit | Signup | Note |
| --- | --- | --- | --- |
| **Web3Forms** ⭐ | 250 submissions/month | Just your email - no account | Simplest; gives you an access key instantly |
| **FormSubmit** | Unlimited | None at all | You confirm once by email; less polished |
| **Formspree** | 50/month | Account | Nicest dashboard |
| **Netlify Forms** | 100/month | - | Only if you host on Netlify, and needs a workaround with React |

You'd get an email every time someone writes, plus a dashboard of past messages. For a
portfolio that receives a handful of messages a month, 250/month is effectively unlimited.

### Option B - your own endpoint (a weekend, free, more impressive)

Covered in Part 6. You'd own the data and could show it in your own admin page.

---

## Part 5 - Tracking visits without paying

### The honest limits, again

Analytics tells you **how many** people visited, from **where**, on **what device**, and
via **which link**. It cannot tell you *which individual person* visited - no free or paid
tool honestly can. The only people you can identify are the ones who choose to contact you.

That said, the aggregate numbers answer the questions you actually care about: *is the
LinkedIn link working? did anyone open my résumé? did that post bring traffic?*

### Free-forever analytics options

| Tool | Cost | Cookie banner needed? | Catch |
| --- | --- | --- | --- |
| **Cloudflare Web Analytics** ⭐ | Free, unlimited, forever | No (no cookies) | None. Works on any host - it's just a script tag |
| **Vercel Web Analytics** | Free tier on Hobby | No | Monthly event cap; fine at your traffic |
| **GoatCounter** | Free for personal use | No | Simple, slightly plain dashboard |
| **Umami Cloud** | Limited free tier | No | Or self-host free |
| **Google Analytics 4** | Free, unlimited | **Yes** (uses cookies) | Heavy, complex, and legally needs a consent banner |

**My pick: Cloudflare Web Analytics.** Free with no cap, no cookies, no consent banner,
and you don't have to host on Cloudflare to use it. Setup: sign up → add your site → copy
the one-line script into `index.html` before `</head>` → push.

### The single most useful number: résumé downloads

Views are vanity; a résumé download is intent. You can count them for free with
[GoatCounter's event tracking](https://www.goatcounter.com) or a Cloudflare Worker
(Part 6). If you build only one custom thing, build this.

### Free trick: tagged links

Costs nothing, needs no code. Share different URLs in different places:

- LinkedIn profile → `https://your-site.vercel.app/?src=linkedin`
- Résumé PDF → `?src=resume`
- GitHub profile → `?src=github`
- Email signature → `?src=email`

Analytics shows these as separate entries, so you learn exactly which channel works.

---

## Part 6 - A database, for free, without getting burned

You asked whether a database is affordable. It is - several are free permanently. **But the
free tiers differ in one way that matters enormously for a low-traffic personal site: some
of them go to sleep.**

| Database | Type | Free tier | ⚠️ The catch |
| --- | --- | --- | --- |
| **Cloudflare D1** ⭐ | SQLite | ~5 GB, millions of reads/day | **None.** Never sleeps, no card, same account as your hosting |
| **Turso** ⭐ | SQLite | Generous free plan | None meaningful. Check current limits - they've been revised over time |
| **Neon** | Postgres | Free project | Sleeps after a few minutes idle but **wakes itself** in under a second - you never notice |
| **Firebase Firestore** | Document | 1 GB, ~50k reads/day | None. Google-scale stability; Google account required |
| **Upstash Redis** | Key-value | Free daily command allowance | Perfect for counters; not for storing messages |
| **MongoDB Atlas M0** | Document | 512 MB | Can auto-pause after ~60 days of inactivity (resumable) |
| **Supabase** | Postgres + auth | 500 MB, 2 projects | ⚠️ **Pauses a project after 7 idle days** and you must click restore. On a site with occasional visitors this *will* bite you |
| **Appwrite Cloud / Nhost** | BaaS | Free tier | Supabase-style all-in-ones; check their inactivity policies before relying on them |
| **Google Sheets** | Spreadsheet | Free | Genuinely fine for a few rows a month, in a UI you already know. Write to it from a free Apps Script web app |
| **GitHub Issues / a JSON file in the repo** | - | Free | You already have GitHub. Submissions become issues via the API - searchable, notified, and *yours* |
| **Notion / Airtable** | Database-as-app | Free personal plan | Lovely UI, API rate limits are fine at this volume |

### About the word "lifetime"

Be a little sceptical of it. **No free tier is contractually forever** - companies change
terms, and several well-loved free tiers have died:

- **Heroku** killed free dynos in 2022, after years of being the default recommendation
- **PlanetScale** removed its free tier in 2024
- **Railway** replaced its free tier with a trial
- **Fauna** shut down the service entirely in 2025

So rather than hunting for a promise nobody can make, optimise for **being able to leave**:

1. **Prefer free tiers that exist to sell the paid product** - Cloudflare, Firebase and
   Neon give away small usage to win developers. That's a durable business reason to keep
   the free tier alive, unlike a startup burning investor money.
2. **Prefer SQLite** (D1, Turso). Your whole database is one file - export it with one
   command and move it anywhere in an afternoon. Postgres is nearly as portable.
3. **Prefer things you already own.** GitHub and Google Sheets are not going to delete your
   data or discontinue the free plan. This is the genuinely unkillable option.
4. **Keep the schema boring.** Plain SQL tables move between providers. Deeply
   provider-specific features (Firebase security rules, Supabase realtime) do not.
5. **Export occasionally.** A monthly download of ~50 rows is not a chore.

**For your case - irregular traffic, ₹0 budget, no appetite for maintenance - the ranking
is: Cloudflare D1, then Turso, then Neon.** If you want something that categorically cannot
be taken away, write submissions to **GitHub Issues** or a **Google Sheet** instead of a
database at all. For a portfolio contact log, that is not a hack - it's a sensible choice.

**For your situation - irregular traffic, zero budget, no maintenance appetite - the answer
is Cloudflare D1 or Turso, not Supabase.** I recommended Supabase in the earlier document
for its nicer dashboard; knowing now that the site may sit idle for weeks, the 7-day pause
makes it the wrong choice. D1 and Turso just sit there, free, indefinitely.

### The all-Cloudflare, all-free stack

Since Cloudflare gives you hosting, functions, database **and** analytics on one free
account, this is the cheapest path with the fewest moving parts:

| Piece | Cloudflare product | Free limit |
| --- | --- | --- |
| Hosting the site | **Pages** | Unlimited bandwidth, 500 builds/month |
| API endpoints | **Pages Functions** (Workers) | 100,000 requests/day |
| Database | **D1** | 5 GB, 5M reads/day |
| Counters / rate limiting | **KV** | 100k reads/day |
| Analytics | **Web Analytics** | Unlimited |
| Spam protection | **Turnstile** | Unlimited |

100,000 requests a day against a portfolio that might see 50 visits is not a limit you will
ever approach.

Deploying to Cloudflare Pages is the same shape as Vercel: connect the GitHub repo, build
command `npm run build`, output directory `dist`.

### What it looks like in the repo

```
E:\subhash-portfolio
├─ src/                     ← the site, unchanged
├─ functions/               ← new: each file becomes an API endpoint
│   └─ api/
│       ├─ contact.js           POST - save a message + ping your phone
│       ├─ feedback.js          POST - save a visitor's suggestion
│       ├─ track.js             POST - count a view / résumé download
│       └─ stats.js             GET  - data for your private admin page
└─ schema.sql               ← the tables
```

A complete contact endpoint on Cloudflare - this is the whole thing:

```js
// functions/api/contact.js
export async function onRequestPost({ request, env }) {
  const { name, email, message, website } = await request.json()

  if (website) return Response.json({ ok: true })            // honeypot: bots fill this, humans can't see it
  if (!name || !email || !message) return Response.json({ error: 'Missing fields' }, { status: 400 })
  if (message.length > 5000) return Response.json({ error: 'Too long' }, { status: 400 })

  await env.DB.prepare(
    'INSERT INTO contacts (name, email, message, source) VALUES (?, ?, ?, ?)'
  ).bind(name, email, message, request.headers.get('referer') || '').run()

  // Free instant notification on your phone - no email service needed
  await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TG_CHAT_ID,
      text: `New portfolio message\nFrom: ${name} (${email})\n\n${message}`,
    }),
  })

  return Response.json({ ok: true })
}
```

> **Notifications for free:** a **Telegram bot** costs nothing, has no monthly limit, and
> buzzes your phone the second someone writes. Email services (Resend, SendGrid) have free
> tiers too, but Telegram is simpler and there's no domain verification.

### The tables

```sql
CREATE TABLE contacts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  source     TEXT,
  status     TEXT DEFAULT 'new'          -- new | read | replied | spam
);

CREATE TABLE feedback (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  rating     INTEGER,                    -- 1-5
  comment    TEXT,
  email      TEXT,                       -- optional
  approved   INTEGER DEFAULT 0
);

CREATE TABLE events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  type       TEXT NOT NULL,              -- page_view | resume_download | section_view
  path       TEXT,
  referrer   TEXT
);

CREATE TABLE testimonials (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  name       TEXT NOT NULL,
  role       TEXT,
  company    TEXT,
  quote      TEXT NOT NULL,
  linkedin   TEXT,
  approved   INTEGER DEFAULT 0
);
```

---

## Part 7 - What I'd actually do, in order

**Today (30 minutes, no code, no accounts beyond GitHub + Vercel):**

1. Push to GitHub, deploy on Vercel, fix the placeholder URL. **The site is live.**
2. Add the Cloudflare Web Analytics script. You now know your visitor numbers.
3. Put the link on LinkedIn, your résumé and your GitHub profile - with `?src=` tags.

That's a proper, working, findable website. Everything below is optional improvement, not a
prerequisite.

> **If you stop here, that is a perfectly good outcome.** A fast, well-made portfolio with a
> working email link and a visitor counter does the job you set out to do: get noticed and
> get contacted. Steps 4-9 exist because they're useful and because building them teaches
> you things worth putting on a CV - not because the site is incomplete without them.

**This month (~15 minutes):**

4. Swap the mailto for a **Web3Forms** contact form so nobody needs an email client.

**When you have a free weekend (the part worth putting on your CV):**

5. Move to Cloudflare Pages, add `functions/api/contact.js` + **D1**, so messages land in
   your own database and Telegram.
6. Add a **feedback widget** - a small "Suggest an improvement" button with a 1-5 rating and
   a comment box. This is the "suggestions from people who look at it" you wanted.
7. Add a **résumé download counter**.
8. Build **`/admin`** (one password in an environment variable): messages inbox, feedback
   list, view counts, download counts. One page answering "who contacted me and how's it
   doing".
9. Add **moderated testimonials** - a colleague submits an endorsement, you approve it, it
   appears on the site. For a portfolio this is the highest-value feature in this document.

---

## Part 8 - Free-tier traps, so you never get a bill

- **Never add a credit card** to any of these services. Without one, the worst case is the
  service stops until next month - it can never charge you.
- **Supabase pauses after 7 days idle.** Use D1, Turso or Neon instead. (Neon sleeps but
  wakes itself; that's fine.)
- **Render/Railway free web services sleep** after ~15 minutes and take 30+ seconds to wake.
  Irrelevant if you use serverless functions, which don't work that way.
- **Vercel Hobby is non-commercial.** A personal portfolio is fine. If you ever put a
  "Hire me - ₹X/hour, pay here" button on it, move to Cloudflare Pages, which has no such
  restriction.
- **Secrets never go in git.** API keys and tokens belong in `.env.local` (already
  git-ignored) locally, and in the host's Environment Variables dashboard in production.
  If a key does get committed, rotate it - deleting the line doesn't erase git history.
- **Spam will arrive** within days of going live. Honeypot field + length cap + rate limit,
  and Cloudflare Turnstile (free) if it gets bad.
- **Domains are the one real cost.** ~₹1,000/year. Completely optional - a
  `.vercel.app` or `.pages.dev` address is perfectly respectable. If you ever want one,
  Cloudflare Registrar sells at cost.

---

## Part 9 - Quick reference

| I want to… | Do this |
| --- | --- |
| Edit the site | `npm run dev`, edit `src/data/content.js`, save |
| Publish my changes | `git add . && git commit -m "..." && git push` - live in ~60s |
| See visitor numbers | Cloudflare Web Analytics dashboard |
| See who contacted me | Your email (mailto/Web3Forms) or `/admin` (custom backend) |
| Roll back a bad change | Vercel dashboard → Deployments → previous one → **Promote to Production** |
| Take the site offline | Vercel → Settings → delete the project (the code stays on GitHub) |
