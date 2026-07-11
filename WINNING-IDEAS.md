# 🏆 IMPACT-A-THON 2026 — VERIFIED WINNING IDEAS (with the twist)

> **Meta-review stamp:** Every idea below was adversarially reviewed against 5 filters:
> **(1)** Will other teams build it? **(2)** Does it serve low-literacy ≠ blind ≠ intellectual-disability *differently*? **(3)** Thin-sliceable to high fidelity in ~4 hours? **(4)** Survives a 60-second closed-laptop pitch? **(5)** Survives 1 minute of questions from the nonprofit?
> Weak spots found in review are patched inline (marked **⚠️ fixed**).

---

## 🔮 What the room will build (so we don't)

- **~60% of teams:** a prettier filterable calendar / event site, + an AI chatbot, + font-size and contrast toggles.
- **~25%:** the four examples the organizers *put on a slide* — SMS postal-code lookup, monthly podcast, attendance streaks, flyer-OCR upload. **These are now the second-most-obvious ideas in the room.**
- **~10%:** "ask our chatbot about events" (weak for low-literacy + screen-reader users).
- **Almost nobody:** outbound calling · restructured information architecture · software-generated print · symbol-based rendering · real live calendar data · gap analytics the judges can't fake.

**Our edge nobody else has:** the Belonging Collective calendar is Teamup, and its **JSON API is publicly readable** (`teamup.com/ksakacjdxmrwoqtzym/events?startDate=…&endDate=…`). We measured 4 months of real data: **384 events · 94 series · 2 weekend events · 0 on Sundays · "Youth" tag matches 0 events · cost encoded only as a color · 2 org calendars silent · contribution = emailing KW Hab for manual re-entry.** Every idea below runs on their *live real data* with **zero migration**.

---

# THE SIX CORE IDEAS

## 1. 📞 Belle Calls You — *flip the direction of discovery*

**One breath:** Every Sunday at 6, Belle **calls you** — any phone, even a landline — and says: *"This week near you: Jukebox Bingo Tuesday at the Hangout, Art with Marc Thursday. Press 1 and I'll remind you the morning of."*

- **The twist:** Everyone assumes the person seeks the event. We invert it — **the event seeks the person.** Not "text us your postal code" (that's on the organizers' slide); a warm, named voice that arrives on a ritual schedule.
- **Why it beats the room:** One move structurally covers all three personas — no reading (low literacy ✓), no screen (blind ✓), fixed weekly ritual + a choice of 3, not 384 (intellectual disability ✓) — plus everyone with no smartphone or no internet at all. Discovery without literacy, sight, device, or initiative.
- **⚠️ fixed — consent & spam optics:** Strictly opt-in, one call/week at a chosen time, "say STOP anytime." Enrollment happens where trust already lives: **staff sign people up during existing programs**, a paper form in agency lobbies, or calling the line yourself. Frame in pitch as "a friend who calls," echoing the weekly check-in calls support workers already make.
- **Rubric:** Originality ✓✓ · Accessibility ✓✓ · Feasibility (Twilio + TTS ≈ pennies/call; KW Hab approves the weekly script) ✓ · Problem fit (live data) ✓.
- **4-hour slice:** enrichment pipeline → generated call script → **live phone call on stage in the Round-2 demo.** (Round 1 is laptops-closed: *say* it, don't risk scheduling tricks.)

## 2. 🚪 Clubs, Not Calendars — *kill the grid at the concept level*

**One breath:** The 384 events are really ~94 recurring series that cluster into about **12 ongoing clubs** — Art Club, Games Club, Food Club, Music Club, Walking Club, Coffee & Friends. You **join a club once** (one picture tile), and your club tells you when its next thing is.

- **The twist:** Don't redesign the calendar's UI — **replace its information architecture.** A calendar asks "when are you free?"; a club asks "what do you love?" One decision replaces infinite scrolling, forever.
- **The sleeper collaboration win:** Clubs are **cross-agency by construction** — Art Club blends KW Hab's *Art with Marc*, Our Studio's workshops, and Extend-A-Family crafts under one identity. **The silos dissolve at the concept level** — no dashboard, no policy change, no new workflow for any agency.
- **⚠️ fixed — "isn't this just categories?":** No — membership + push ("your club meets Tuesday") + club identity/symbol + printable club card you can stamp at events (the streak idea, made physical and dignified). Also: clubs default to **open drop-in events only**; registration-required sessions (61 instances are LEG Up!-only) get a clear "sign-up needed" badge — fixing today's silent "can I even go?" confusion.
- **Rubric:** Originality ✓✓ · Accessibility (routine + tiny choice set) ✓✓ · Problem fit ✓ · Feasibility (LLM clusters the live series in one pass) ✓.
- **4-hour slice:** cluster real series → 12 symbol tiles → one fully-built club page (next 3 gatherings, tap-to-listen, bus hint).

## 3. 📬 The Inbox Is the CMS — *collaboration with zero new tools*

**One breath:** Agencies already email events to KW Hab, where a human re-types them. So the email address **becomes the API**: forward a flyer or three sentences → AI drafts a structured, plain-language, symbol-tagged listing → KW Hab taps **Approve** → it publishes everywhere (clubs, Belle's calls, print, web).

- **The twist:** The NPO-side UX is a tool they demonstrably already use — their inbox. Adoption cost: zero. Other teams will build flyer-upload *portals* (it's on the organizers' slide); we grounded ours in their **actual discovered workflow**, which no portal can beat.
- **The incentive loop — Reach Receipts:** every contributing org gets a Monday email: *"Your bingo reached 41 people; 12 asked for reminders; 6 said 'save me a seat.'"* That answers the brief's hardest prompt — "why would a nonprofit ever contribute?" — with the only currency ministry-funded orgs care about: **participation evidence for funders.**
- **⚠️ fixed — "what if the AI gets it wrong?":** Nothing publishes without human approval; one-tap edit; the demo uses a *real flyer pulled from their own calendar attachments*.
- **Rubric:** Collaboration originality ✓✓ · Feasibility ✓✓ · Problem fit ✓✓ (this IS the required "how a nonprofit posts" flow).
- **4-hour slice:** upload/paste → watch the draft assemble → approve → it appears in the member experience live.

## 4. 🗺️ The Belonging Gap Map — *the unfakeable mic-drop*

**One breath:** We analyzed all 384 summer events on their real calendar: **exactly 2 fall on a weekend, zero on Sundays**, evenings are scarce, and the Youth filter matches nothing. The Gap Map shows the Collective — for the first time — not just what exists, but **what's missing**.

- **The twist:** Every other team helps people find what exists. We *also* hand the Collective a mirror: coverage gaps by day, time, audience, and neighbourhood — turning the calendar from a listing into a **planning instrument**.
- **⚠️ fixed — diplomacy:** Never name-and-shame quiet partners on stage (DSO is an intake body, not a program runner). Pitch the **structural** stat ("two weekend events out of 384"); keep per-org contribution health as a quiet internal admin view framed as *opportunity*. Future hook: demand signals ("saved events") tell orgs *what to program next* — e.g., Saturdays.
- **Rubric:** Originality on collaboration ✓✓ · Thinking quality ✓✓ · Judges cannot replicate it without the API discovery.
- **4-hour slice:** one beautiful chart + three stats, already computed. Use as **act three of the pitch**, not a standalone product.

## 5. 🔣 Say It In Symbols — *the first community calendar in easy-read*

**One breath:** Every event renders as a **symbol strip** — 🎨 *Art* · 🕐 *Tuesday 1:30* · 📍 *the Hangout* · 🆓 *Free* · 🚌 *Bus 204* — with tap-to-listen; "My Week" becomes a drag-together **visual schedule that prints for the fridge**, the exact format support workers already use daily.

- **The twist:** We didn't "simplify a website" — we **translated events into the community's existing native visual language** (easy-read / visual-schedule format). Student teams don't know this format exists; the nonprofit judges live in it. Instant domain-respect signal.
- **⚠️ fixed — licensing & tokenism:** Use open symbols/emoji (real AAC sets like PCS/Widgit are licensed — noted in handoff). Symbols follow a consistent grammar (what/when/where/cost/how-to-get-there), and the handoff honestly says: "easy-read output to be **validated with self-advocates**" — which the deck explicitly rewards.
- **Rubric:** Demonstrated accessibility ✓✓✓ (this is the visible *proof*, not a claim) · Originality ✓.
- **4-hour slice:** the symbol-strip renderer inside the club page + one printable My Week sheet.

## 6. 📵 The Un-App — *positioning that reframes the whole room* (narrative layer)

**One breath (say this in the pitch):** *"Most tools built today need a screen, an account, and reading ability. Ours works with none of those — it calls you, prints itself onto agency fridges and lobby posters, and loops on waiting-room TVs. It's still a digital platform; its outputs are just calls, paper, and ambient screens."*

- **The twist:** Contrarian positioning against every other demo in the room, grounded in the truth that flyer-and-lobby culture *is* this sector's reality.
- **⚠️ fixed — "low effort" misread:** Un-App is the **narrative wrapper**, not the product name of a pile of paper. The admin console, enrichment engine, and live call prove software depth; the print kit must look *gorgeous* (auto-generated large-print poster + fridge week + lobby slideshow mode).
- **Rubric:** Originality ✓✓ · Accessibility (digital-divide honesty) ✓✓.
- **4-hour slice:** the print-kit template + a full-screen "lobby loop" route (a rotating today-view — 20 minutes of work, huge demo optics).

---

## 🃏 Wildcards & garnish (deploy selectively)

| Idea | Use |
|---|---|
| 🔴 **The Big Red Button** — physical button in each lobby; press → today's events read aloud | Round-2 prop moment (tablet fake is fine). Zero-barrier interaction, unforgettable. |
| 📻 **Belonging FM** — auto-generated *daily* 90-second audio bulletin | Same content powers Belle, lobby loops, smart speakers. One renderer, three channels. |
| 🪑 **Save a Seat** — "6 people are going · Marc will be there" + one-tap "expect me" | Belonging = not walking in alone. Seed counts via staff RSVPs (cold-start fix). Full buddy-matching → **roadmap only** (safeguarding). |
| 🚌 **GRT hint** — every card shows "which bus gets me there" | Static route mapping for demo; attendance dies between discovery and the door. |
| 🌐 **Syndication** — emit schema.org/Event JSON-LD → Google, 211, Connected KW | Handoff-doc roadmap slide: "we don't own the destination; we syndicate belonging." |
| 📸 **Photo wall** — consented event photos flow back to club pages | Roadmap (consent workflow); closes the belonging loop. |

---

# 🎯 THE RECOMMENDED PLAY: "BELLE" (all six as one story)

**Four acts, each answering one rubric line (25% each):**

1. **Ingest** *(problem fit)* — live Teamup feed + inbox-is-the-CMS + flyer intake → human approval. Their real data; zero migration; zero new tools.
2. **Understand** *(accessibility)* — every event → plain language + symbol strip + audio + "can I just show up?" flag; three switchable modes (Easy Read / Audio-first / Standard) proving low-literacy ≠ blind ≠ intellectual disability.
3. **Reach** *(originality-discovery)* — Belle calls you Sunday at 6 · clubs replace calendars · fridge-week print + lobby loop.
4. **Reveal** *(originality-collaboration + thinking)* — the Gap Map: *"384 events. Two on weekends. Zero on Sundays. Now the Collective can see it — and fix it."*

**Build order if time collapses (cut from the bottom):**
1. Enrichment pipeline on ~20 real events + club page with symbol strips *(the spine — never cut)*
2. Flyer/email → draft → Approve flow *(required NPO deliverable)*
3. One live Belle call (Twilio) *(the demo moment)*
4. Gap Map chart *(stats already computed)*
5. Print kit + lobby loop
6. Save-a-Seat counter

---

## 🎤 The 60-second pitch (laptops closed — memorize)

> *"We read the Belonging Collective's real calendar — all 384 summer events — and found the problem isn't just navigation. Cost is a color. The Youth filter matches nothing. And exactly two events all summer fall on a weekend.*
> *So we built Belle. Nonprofits forward the flyer they already email today — AI turns it into plain language, symbols, and audio, and KW Hab approves with one tap. Nothing new to learn, nothing to migrate.*
> *And instead of asking people to open a website, Belle calls them. Every Sunday at six, on any phone — even a landline — she says: 'Bingo Tuesday. Art Thursday. Press 1 and I'll remind you.' No reading, no screen, no app. Join Art Club once and never search again — and Art Club doesn't care which agency runs Tuesday.*
> *It runs on their live calendar today, for pennies a month. Belle doesn't list events — she invites people. And for the Collective, she shows what's missing, starting with every empty Sunday."*

*(~55 seconds. Contains three things no other team can have: their live data, an outbound call, and an unfakeable stat.)*

## 🛡️ Nonprofit Q&A bank (Round 2, 1 minute)

- **"Who fixes wrong info?"** → Nothing publishes without your one-tap approval; edits propagate everywhere instantly.
- **"What does it cost / who maintains it?"** → LLM enrichment ≈ cents per event; Twilio ≈ dollars/month; Teamup remains your source of truth; Blueprint-ready handoff with full stack docs.
- **"People without phones?"** → Lobby loop, printed fridge weeks, staff broadcast, posters that speak via QR.
- **"How do people sign up for calls?"** → Where trust already lives: your staff, during existing programs; paper form; or call the line and press 2. Opt-out by saying "stop."
- **"Privacy?"** → Members: phone number + 3 interests, opt-in, deletable, no accounts, no tracking. (PIPEDA-friendly by design.)
- **"How is this different from our calendar?"** → It isn't a replacement — it's the accessible discovery layer on top. Your calendar stays; Belle makes it speak.

## 🚫 Anti-patterns we deliberately avoid

Filterable-calendar rebuild · chatbot-only UX (hostile to low-literacy + screen readers) · required accounts · new CMS for agencies · showing 102 events anywhere in the demo · *claiming* accessibility instead of demonstrating it (we show contrast tokens, reading-grade scores, an axe scan, a screen-reader run — and honestly list what still needs testing with real self-advocates).

---
*Built on live data from teamup.com/ksakacjdxmrwoqtzym (public read API) · KW Hab mission: "a community where everyone belongs and participates" · Impact-a-thon 2026*
