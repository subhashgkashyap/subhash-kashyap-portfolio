# Talking about the numbers and the accomplishments

The "by the numbers" band and the accomplishments list are off the site, but the data is
still in the repo (commented out in `src/data/content.js`). This file is how you'd defend
each one if it stayed on your resume and someone pushed on it.

**Nothing here is a claim I can verify** - I only have your resume and LinkedIn. Treat every
script below as a *shape* to fill with what actually happened. If you can't fill it in, that
figure should come off the resume too, not just off the website.

---

## The principle that matters most

Interviewers rarely doubt the number. They're testing whether you understand **what you
built and how you'd know if it worked.** A confident "here's roughly how we measured it,
and here's the caveat" beats a precise-sounding figure you can't unpack every time.

Three rules:

1. **Never inflate under pressure.** If the honest answer is "that was a team estimate, not
   an instrumented measurement", say exactly that. It reads as senior, not weak. Made-up
   methodology is the only answer that can actually sink you.
2. **Say "we" for the outcome, "I" for your part.** Claiming sole credit for a team result
   is the most common own-goal in interviews. "The team cut recurring incidents by about a
   quarter; my part was the business rules and script includes behind it."
3. **Lead with the problem, not the number.** The number is the punchline, not the opener.
   Problem → what you built → how you'd know it worked → caveat.

---

## The four-beat answer

Use this shape for any metric question. It takes about 45 seconds.

> **Problem.** "HR ops were creating and chasing onboarding tasks by hand for every new
> joiner."
> **Build.** "I implemented Lifecycle Events with Case Management so the standard tasks
> fired automatically on the hire event."
> **Measure.** "We compared manually-created onboarding cases in the month before go-live
> against the month after."
> **Caveat.** "It's a directional number off case counts, not a formal time study - and
> other changes shipped in the same window."

That last beat is what separates a credible answer from a rehearsed one. Volunteer it
before they ask for it.

---

## Per-metric scripts

Fill the blanks with real detail. Where I've written `[...]`, I genuinely don't know - only
you do.

### "40% reduction in manual HR intervention"

> "Before the build, every new joiner meant HR ops manually creating and following up on
> the standard onboarding tasks. I implemented Lifecycle Events and Case Management so
> those fired automatically off the hire trigger. We measured it by comparing the count of
> manually-raised onboarding cases before and after go-live - roughly four in ten of those
> steps stopped needing a person. It's a case-count comparison from the instance, not a
> time-and-motion study, so I'd call it directional."

**If pushed further:** be ready to name the specific lifecycle events, what triggered them,
and one thing that *didn't* automate cleanly and why. That last detail is what convinces.

### "25% fewer recurring incidents"

> "We had a cluster of incidents coming back for the same root causes. I wrote business
> rules and script includes to handle the underlying conditions rather than the symptoms.
> Comparing recurring incidents tied to those problem records across a quarter before and
> after, they came down by about a quarter. The caveat is that other fixes shipped in the
> same window, so I'd frame it as a contribution rather than sole cause."

### "15% improvement in SLA adherence"

> "Notifications were waiting on a person to send them, which ate into response SLAs. I
> automated those emails so the case moved on immediately. We read the SLA dashboard
> before and after and adherence improved by about 15% on the case types I touched. I
> wouldn't claim that across the whole queue - just the flows the automation covered."

**Watch for:** "15% of what baseline?" Know roughly where it started, or say you don't
recall the exact baseline rather than guessing on the spot.

### "20+ hours a month saved"

> "There was a recurring data update someone ran by hand. I moved it to scheduled jobs.
> The estimate comes from how long the team said each run took multiplied by the number of
> runs a month - so it's their estimate of effort, not a measured figure. Even discounted
> it was clearly worth automating, and it removed a manual step that occasionally got
> missed."

This is the weakest number of the four, because it's an estimate times a count. Say so
first and it stops being a weakness.

### "100% story completion across sprints"

> "Across the sprints I was on, every story I committed to closed within the sprint. That
> came off the sprint reports."

**Careful with this one.** Perfect completion invites "so were your stories under-scoped?"
A good pre-empt: "we sized conservatively and I'd flag early if something was going to
slip, rather than carrying it silently."

---

## The accomplishments

### Award for excellence / identifying critical defects

Don't lead with the award - lead with the catch.

> "I found a defect in [what] during [UAT / regression] that would have reached production
> and affected [who]. It came from [how you found it - a test case others hadn't
> considered, checking a boundary condition, questioning an assumption]. The team put me
> up for a recognition award for it."

The award is the least interesting part. The interesting part is the *habit* that produced
it - say what you look for that other people don't.

### Knowledge transfer sessions

> "As people joined the project I ran the sessions on [which modules] - what the
> configuration did, where the gotchas were. It cut how often they had to escalate to me,
> and honestly it made me learn the areas properly, because you can't teach something you
> only half know."

This is a genuine seniority signal. It says you scale beyond your own hands.

### Assisting in interviews

> "I sat in on technical rounds for ServiceNow roles - mostly assessing platform
> fundamentals and how candidates approached a problem. I'd write up what I saw and feed
> it into the hiring call."

Signals trust from your leadership. Keep it brief and never discuss individual candidates.

---

## Questions to be ready for

| They ask | The trap | What to do |
| --- | --- | --- |
| "How exactly did you measure that?" | Inventing a methodology | Name the actual source (case counts, SLA dashboard, sprint report) or say it was a team estimate |
| "What was the baseline?" | Guessing a number | Give it if you know it; "I don't recall the exact baseline" is fine |
| "Was that you or the team?" | Over-claiming | Split it explicitly: team outcome, your specific piece |
| "What would you do differently?" | "Nothing" | Have one real answer ready - a shortcut, a test you'd add, a design you'd change |
| "What didn't work?" | Deflecting | Have one genuine failure with what you changed afterwards |

---

## Before you put these back on the site

Ask yourself, per number: **can I do the four beats out loud right now?** If yes, it belongs
on your resume and it can go back on the site. If not, drop it - "automated HR onboarding
with Lifecycle Events and Case Management" is a strong line with no number attached, and it
can't be challenged.

A resume with three defensible claims beats one with six shaky ones. The shaky ones don't
just fail on their own - they make the interviewer discount everything else you said.

**To put them back on the site:** uncomment the `numbers` block in `src/data/content.js`
plus the `<Numbers />` lines in `src/App.jsx`, and the `accomplishments` block in
`src/data/content.js` plus the block in `src/components/Certifications.jsx`.
