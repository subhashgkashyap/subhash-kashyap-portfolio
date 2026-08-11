# Adding a backend

Everything you asked about - where to see who contacted you, how many people visited,
letting visitors leave suggestions - needs something that can *remember* data. Right now
the site can't: it's static files on a CDN, with no server and no database.

This document lays out every realistic option, what I'd actually build, and in what order.

> **Read [DEPLOY.md](DEPLOY.md) first if your budget is ₹0.** It narrows everything below
> into one concrete free-forever stack. One correction it makes to this document: I star
> **Supabase** below, but its free tier **pauses a project after 7 days of inactivity**,
> which is a poor fit for a site that may sit idle for weeks. For that case use
> **Cloudflare D1**, **Turso** or **Neon** instead.

---

## First, one honest correction

You asked how to see **"who has contacted or visited"**. Those are two very different things:

- **Who contacted you** - fully solvable. People type their name and email into a form, so
  you know exactly who they are. Easy, and worth doing.
- **Who visited** - *not* solvable, and not because of effort. Web analytics gives you
  **anonymous, aggregate** numbers: how many visits, which pages, which country, what
  device, which link they arrived from. It cannot tell you "Priya from Infosys looked at
  your site at 4pm."

  (B2B tools like RB2B or Clearbit Reveal try to guess a visitor's *company* from their IP.
  They're inaccurate for home/mobile connections, cost money, and are legally messy under
  privacy law. Not worth it for a personal portfolio.)

What you *can* learn from analytics is genuinely useful anyway: whether the LinkedIn link
is working, whether people reach the Experience section or bounce at the hero, how many
opened your résumé, and when traffic spikes after you post something.

---

## The three levels

### Level 0 - No backend at all (hosted services)

You bolt on third-party services. No server code, no database, no maintenance.

| Need | Service | Effort | Cost |
| --- | --- | --- | --- |
| Contact form | **Formspree**, **Web3Forms**, **Getform**, **Formspark** | ~15 min | Free tier (~50-250 submissions/month) |
| Contact form (Netlify only) | **Netlify Forms** | ~10 min | Free tier |
| Visitor analytics | **Vercel Web Analytics**, **Cloudflare Web Analytics** | ~5 min | Free |
| Analytics (nicer dashboards) | **Plausible**, **Umami**, **Fathom** | ~10 min | ~$9/mo, or free if you self-host Umami |
| Analytics (most detailed, heaviest) | **Google Analytics 4** | ~15 min | Free |
| Comments / suggestions | **Giscus** (uses GitHub Discussions - you already have GitHub) | ~20 min | Free |
| Feedback survey | **Tally**, **Google Forms** embedded | ~10 min | Free |
| Newsletter | **Buttondown**, **ConvertKit**, **Mailchimp** | ~20 min | Free tier |

**How a hosted form works:** you point the form's `action` at their URL, they email you
every submission and keep a dashboard of them. That's it.

```jsx
// Roughly what a Formspree-backed contact form looks like
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required />
  <button type="submit">Send</button>
</form>
```

> ⚠️ **Netlify Forms + React caveat:** Netlify detects forms by scanning the HTML at build
> time, and a React app's HTML is empty until JavaScript runs. You must add a hidden
> plain-HTML copy of the form in `index.html` and a `form-name` hidden input in the React
> form. It works, it's just not as automatic as the docs make it sound.

**Good:** working in an evening, nothing to maintain, free.
**Limits:** data lives in someone else's dashboard, submission caps, no custom logic, and
you can't build an admin page that shows contacts + feedback + stats together.

---

### Level 1 - Serverless functions in this same repo ⭐ recommended

You add an `api/` folder next to `src/`. Each file becomes an API endpoint that only runs
when someone calls it. Same repo, same `git push`, same deploy. No server to keep alive,
no monthly bill at this traffic level.

```
E:\subhash-portfolio
├─ src/            ← the site (unchanged)
├─ api/            ← new: your backend
│   ├─ contact.js      POST - save + email a contact message
│   ├─ feedback.js     POST - save a visitor suggestion
│   ├─ track.js        POST - count a page view / résumé download
│   └─ stats.js        GET  - your private dashboard data
└─ package.json
```

**Where the functions run:** Vercel Functions, Netlify Functions, or Cloudflare Workers -
all included free with the hosting you're already using. Vercel's is the least friction:
drop a file in `api/`, push, done.

**Where the data lives** - pick one:

| Store | Type | Why | Free tier |
| --- | --- | --- | --- |
| **Cloudflare D1** ⭐ | SQLite | Free, never sleeps, same account as hosting + analytics | Yes |
| **Supabase** | Postgres + auth + storage + dashboard | You know SQL; browsable table editor; can also handle admin login | Yes, but ⚠️ pauses after 7 idle days |
| **Neon** | Postgres | Pure serverless Postgres, very fast cold starts | Yes |
| **Turso** | SQLite | Tiny, cheap, fast | Yes |
| **Upstash Redis** | Key-value | Perfect for counters (`INCR views`) and rate limiting | Yes |
| **Cloudflare D1 / KV** | SQLite / key-value | If you host on Cloudflare | Yes |
| **MongoDB Atlas** | Document | If you prefer JSON documents to tables | Yes |
| **Firebase Firestore** | Document | Realtime updates out of the box | Yes |
| **Airtable / Google Sheets** | Spreadsheet | Genuinely fine for a handful of rows a month, and you read it in a UI you already know | Yes |

**Where the emails come from:** **Resend** (cleanest API, free tier), SendGrid, or Brevo.
Or skip email entirely and get a **Telegram bot** or **Slack webhook** to ping your phone
the moment someone contacts you - that's often nicer than another unread email.

A contact endpoint end to end, so you can see how little code it is:

```js
// api/contact.js  - Vercel serverless function
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, message, website } = req.body
  if (website) return res.status(200).json({ ok: true })        // honeypot: silently drop bots
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })
  if (message.length > 5000) return res.status(400).json({ error: 'Too long' })

  await db.from('contacts').insert({ name, email, message, source: req.headers.referer })

  await resend.emails.send({
    from: 'site@yourdomain.com',
    to: 'sgkashyap2000@gmail.com',
    subject: `Portfolio message from ${name}`,
    html: `<p><b>${name}</b> (${email})</p><p>${message}</p>`,
  })

  return res.status(200).json({ ok: true })
}
```

**Good:** one repo, one deploy, real database, your own admin page, free at this scale,
and it's genuinely impressive in an interview.
**Limits:** you now own the code - validation, spam handling, secrets.

---

### Level 2 - A real backend server

A long-running app (Express, FastAPI, Spring Boot) on its own host, talking to a database.

| Stack | Fits you because | Host it on |
| --- | --- | --- |
| **Node + Express / Fastify** | JavaScript, same language as the site | Render, Railway, Fly.io |
| **Python + FastAPI** | Python is on your résumé; excellent docs | Render, Railway, Fly.io |
| **Java + Spring Boot** | Java is on your résumé; the most "enterprise" signal | Render, Railway, **Azure App Service** |

Azure is worth a mention specifically because you already work with Azure DevOps - an
Azure Static Web App + Azure Functions + Azure SQL is a story you can tell in interviews.

**When this is actually the right call:** you want scheduled jobs, user accounts, file
uploads, an API other things consume, or more than a handful of endpoints. For a contact
form and a view counter it's overkill - and free tiers sleep after inactivity, so the
first request after a quiet hour takes 30+ seconds.

---

### Level 3 - Backend-as-a-Service (no backend code at all)

| Platform | What you get | Note |
| --- | --- | --- |
| **Supabase** | Postgres + auth + storage + realtime, callable straight from React | With Row Level Security you can insert contacts from the browser and never write a server function |
| **Firebase** | Firestore + auth + hosting + functions | Google ecosystem, very mature |
| **Appwrite** | Open-source Firebase equivalent | Self-host or cloud |
| **PocketBase** | One Go binary: SQLite + auth + admin UI | Charming for small projects; you host it |

Supabase blurs into Level 1 - which is exactly why I'd start there.

---

## Comparison at a glance

| | Level 0 (services) | Level 1 (serverless) ⭐ | Level 2 (server) | Level 3 (BaaS) |
| --- | --- | --- | --- | --- |
| Time to first working feature | ~15 min | ~2-3 hours | ~1 day | ~1 hour |
| Monthly cost at your traffic | ₹0 | ₹0 | ₹0-500 | ₹0 |
| You write server code | No | A little | Yes | Barely |
| Custom admin dashboard | No | Yes | Yes | Yes (built-in) |
| Something to discuss in interviews | Not really | Yes | Yes, most | Some |
| Ongoing maintenance | None | Very little | Real | Little |

---

## What I'd actually build, in order

### Phase 1 - one evening, no code

1. Deploy to Vercel (see [GUIDE.md](GUIDE.md) §5).
2. Turn on **Vercel Web Analytics** - visits, top pages, referrers, countries, devices.
3. Swap the mailto link for a **Formspree** contact form so nobody has to open an email client.
4. Share the link with tagged URLs so you know what's working:
   `?src=linkedin`, `?src=resume`, `?src=github`.

You now know how many people visit, where they come from, and you receive real messages.

### Phase 2 - a weekend, the fun part

Supabase + Vercel functions, replacing Formspree with your own:

5. **Contact form** → stored in Postgres + emailed/Telegram-pinged to you, with a honeypot
   field, a length cap and a per-IP rate limit.
6. **Feedback / suggestion box** - a small floating "Suggest an improvement" button:
   1-5 rating, free-text comment, optional email. Exactly the "suggestions from people who
   take a look" you asked about.
7. **Résumé download counter** - a click on "download résumé" hits `/api/track`. This is the
   single most valuable number on the site: recruiters downloading your CV is real intent.
8. **Section view tracking** - which sections people actually scroll to before leaving.

### Phase 3 - the payoff

9. **Admin dashboard at `/admin`** (Supabase magic-link login, or a single password in an
   env var): contacts inbox with read/replied status, feedback list, view charts, résumé
   download count. One page that answers "who contacted me and how's the site doing".
10. **Testimonials with moderation** - colleagues submit a short endorsement; you approve it
    in `/admin`; approved ones appear on the site. For a portfolio this is the highest-value
    feature here, and it maps neatly onto the reference site's card grid.
11. **Notifications** - Telegram bot or Slack webhook so a new contact buzzes your phone.

### Further ideas, if you enjoy it

- **"Available for opportunities" banner** you toggle from `/admin` without redeploying.
- **Per-section reactions** - a quiet 👍 on each section to learn what lands.
- **Guestbook** - visitors leave a public note (moderated).
- **Case studies / blog** - write up an anonymised PepsiCo or Proximus problem you solved.
  Start as MDX files in the repo; move to a CMS (Sanity, Contentful, or the Notion API)
  only if you're writing often. Long-term this is what makes a portfolio memorable.
- **Newsletter signup** - the reference site's "inner circle" block, if you ever write.
- **Short link + QR code** for the résumé, so a printed CV or business card is trackable.
- **Uptime + weekly digest** - a cron job that emails you last week's numbers.

---

## A starting data model

If you go with Postgres (Supabase/Neon), this covers everything above:

```sql
create table contacts (
  id          bigserial primary key,
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  message     text not null,
  source      text,                       -- referrer or ?src= tag
  status      text default 'new',         -- new | read | replied | spam
  ip_hash     text                        -- hashed, for rate limiting only
);

create table feedback (
  id          bigserial primary key,
  created_at  timestamptz default now(),
  rating      int check (rating between 1 and 5),
  comment     text,
  email       text,                       -- optional
  section     text,                       -- which part they were looking at
  approved    boolean default false
);

create table events (                     -- page views, résumé downloads, section views
  id          bigserial primary key,
  created_at  timestamptz default now(),
  type        text not null,              -- 'page_view' | 'resume_download' | 'section_view'
  path        text,
  referrer    text,
  session     text                        -- random per-visit id, not personally identifying
);

create table testimonials (
  id          bigserial primary key,
  created_at  timestamptz default now(),
  name        text not null,
  role        text,
  company     text,
  quote       text not null,
  linkedin    text,
  approved    boolean default false
);
```

---

## Non-negotiables once you have a backend

- **Never commit secrets.** API keys go in `.env.local` (git-ignored) locally and in the
  host's environment-variables dashboard in production. If a key ever lands in a commit,
  rotate it - deleting the line doesn't remove it from git history.
- **Spam will find you** within days of going live. Defend with: a honeypot field (a hidden
  input bots fill in and humans don't), a per-IP rate limit, a length cap, and
  **Cloudflare Turnstile** (free, invisible, far better than a CAPTCHA) if it gets bad.
- **Validate on the server**, not just in the browser. Browser checks are a convenience;
  anyone can POST directly to your endpoint.
- **Store the minimum.** Hash IPs if you need them for rate limiting; don't log message
  contents anywhere extra. Cookie-less analytics (Cloudflare, Plausible, Vercel) means you
  don't need a consent banner under GDPR - Google Analytics does.
- **Back it up.** Supabase/Neon do automatic backups on paid tiers; on free tiers, export
  your contacts table occasionally.

---

## Cost summary

At personal-portfolio traffic - realistically a few hundred visits a month - **all of this
is free**: Vercel Hobby, Supabase free tier, Resend free tier, Cloudflare Analytics.
The only thing worth paying for is a **custom domain (~₹1,000/year)**, and that's the
single highest-return rupee you'll spend on this site.
