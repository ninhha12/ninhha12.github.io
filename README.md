# Ninh (Johnny) Ha — Personal Website

A single-page static portfolio for **Ninh (Johnny) Ha**: Planogram Analyst at
Advantage Solutions (Boston, MA), Business Analytics & Information Systems
graduate of Suffolk University (May 2024), and now a Sustainable Hospitality &
Tourism Management student at CSU Monterey Bay (expected 2028).

This README is the handover document. It explains what the site looks like,
how it is built, and how to change it without breaking the design.

| | |
|---|---|
| **Live** | https://ninhha12.github.io/ |
| **Repo** | https://github.com/ninhha12/ninhha12.github.io (branch `main`) |
| **Stack** | Plain HTML + one CSS file + one JS file. GSAP 3.13 (`gsap`, `ScrollTrigger`, `SplitText`) from cdnjs for motion. |
| **Build** | None. No npm, no bundler, no framework. |
| **Hosting** | GitHub Pages, deployed from `main` / root. |
| **Weight** | `index.html` ~40 KB, `main.css` ~22 KB, `main.js` ~13 KB, GSAP ~124 KB from the CDN. |
| **Origin** | Rebuilt from the old Adobe Portfolio site (https://johnnyha.myportfolio.com/) and Ninh's revised resume. |

---

## 1. Quick start

**Preview locally.** Serve the folder over HTTP, since the `<dialog>` lightbox
and lazy images behave as they do on GitHub Pages only over HTTP:

```bash
cd ninhha12.github.io
python3 -m http.server 8000
```

Then open http://localhost:8000/.

**Deploy.** Push to `main`. GitHub Pages (Settings → Pages → Deploy from a
branch → `main`, `/ (root)`) publishes within a few minutes. Browsers may cache
the old page for up to 10 minutes (`max-age=600`), so check with a hard refresh
(Ctrl+F5 / Cmd+Shift+R).

**Before editing, always pull.** Ninh sometimes edits text directly on
GitHub:

```bash
git pull origin main
```

---

## 2. Files

```
index.html                  The whole page: every section, all copy, slide galleries, lightbox.
assets/css/main.css         The only stylesheet: tokens, layout, components, dark mode, print.
assets/js/main.js           Behaviour (theme, menu, galleries, lightbox, nav) + the GSAP motion layer.
assets/images/
  hero-0*.jpg, hero-1*.jpg  Portrait and graduation photo (full size + 600w / 1200w for srcset).
  fetch-01..12.png          Fetch Design-a-Thon deck, full size (lightbox).
  fetch-01..12-600.jpg      The same slides as 600w thumbnails (page).
  lego-01..15.png / -600.jpg LEGO Discovery Center deck. lego-09 was a duplicate and is deleted,
                            so files 10–15 are shown as slides 9–14.
  bloq-standee.png,         BLOQ work art (link to Behance).
  bloq-tablecloths.png
  logos/csumb.svg,          Official school logos (downloaded from csumb.edu / suffolk.edu).
  logos/suffolk.svg
favicon.svg                 "NH" monogram.
README.md                   This file.
LICENSE                     MIT.
```

---

## 3. Page layout

One page with anchor navigation. Section order and ids:

| # | Section (`id`) | What it shows | Nav label |
|---|---|---|---|
| 1 | Hero (`#home`) | Current role, name, study line, two buttons, photo strip | (wordmark "Ninh Ha") |
| 2 | About (`#about`) | Ninh's own intro: one big statement + one paragraph | About |
| 3 | Work (`#work`) | 3 projects: Fetch, VF Corporation, LEGO | Work |
| 4 | Experience (`#experience`) | 4 roles, most recent first | Experience |
| 5 | Skills (`#skills`) | 3 skill groups | Skills |
| 6 | Education (`#education`) | CSUMB (in progress) and Suffolk (graduated) | Education |
| 7 | Contact (`#contact`) | "Say hello." + Email / LinkedIn / Behance | Get in touch (orange pill) |
| – | Footer | © 2026 Ninh (Johnny) Ha | – |

### Desktop (≥1024px), top to bottom

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ Ninh Ha        ( About  Work  Experience  Skills  Education  [Get in touch] )  (moon) │  sticky header
├───────────────────────────────────────────────────────────────────────────────────────┤
│ (• Planogram Analyst at Advantage Solutions)                                          │  HERO
│ Ninh (Johnny) Ha                  <- very large, up to 148px                          │
│ Completing Sustainable Hospitality & Tourism Management at CSU ...                    │
│ [View work]  [Get in touch]                                                           │
│ [photo] [slide] [photo] [slide] [art]   drifts left on scroll                         │  photo strip, full bleed
├───────────────────────────────────────────────────────────────────────────────────────┤
│ About me          | I'm Ninh (Johnny) Ha. I turn data into ...                        │  ABOUT, 4 / 8 columns
│                   | Suffolk Business Analytics graduate (May 2024) ...                │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ Work & projects                                                                       │  WORK
│ +---------------------+  Fetch x Suffolk University    Mar & Oct 2023                 │  project row, 7 / 5
│ | cover (opens deck)  |  Design-a-Thon   (chips)                                      │
│ +---------------------+  - bullets      [View all 12 slides]                          │
│ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                 │
│ VF Corporation x Suffolk University  | - bullets                                      │  text-only row, 5 / 7
│ Marketing Research Project (chips)   |                                                │
│ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                 │
│ +---------------------+  LEGO Discovery Center Boston            2024                 │
│ | cover (opens deck)  |  Lego Presentation   (chips)                                  │
│ +---------------------+  - bullets      [View all 14 slides]                          │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ Experience                                                                            │  EXPERIENCE, 4 / 8
│ Apr 2025 – Present [Now]   | Planogram Analyst                                        │
│ Boston, Massachusetts ...  | Advantage Solutions                                      │
│ On-site, full-time         | - bullets (key numbers bold)                             │
│ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                 │
│ ... 3 more roles (BLOQ also shows 2 work-art images -> Behance)                       │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ Tools & skills                                                                        │  SKILLS, 3 columns
│ Analytics (Data)   | Operation Management Tools | Office Skills                       │
│ -----------------  | -------------------------- | -------------                       │
│ ruled lists ...    | ...                        | ...                                 │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ Education                                                                             │  EDUCATION, 2 cards
│ [ logo  CSU Monterey Bay       ]  [ logo  Suffolk University        ]                 │
│ [ ...   In progress · 2028     ]  [ ...   Graduated May 2024       ]                  │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ Say hello.                        <- very large, up to 176px                          │  CONTACT
│ [Email Ninh]  [LinkedIn]  [Behance]                                                   │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ © 2026 Ninh (Johnny) Ha                              (Back to top)                    │  footer + floating button
└───────────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet and phone

- **768–1023px:** one-column hero, About and Experience (the rail sits above
  each role), project rows stack (cover, then text), Skills and Education stay
  side by side, galleries show 3 slides per row.
- **Under 768px (phone first, base CSS):**
  - Everything is one column with 20px gutters.
  - The header shows the wordmark, the theme button and a **Menu** button that
    opens a floating glass panel.
  - Galleries show 2 per row, and the floating Back-to-top button is hidden
    (it covered text).
- No horizontal scroll at any width from 320px up (the photo strip is clipped).

---

## 4. Design system

### Colour

Ninh's "Minimalist Bold" palette: **#c06014** burnt orange, **#eddbcd** warm
cream, **#000000**, **#cdcdcd**, **#ffffff**. All colours are CSS custom
properties on `:root` (light) and `html[data-theme="dark"]` (dark) at the top
of `main.css`. Never hard-code a colour in a component: add a token, and give
it a dark value too.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ground` | `#ffffff` | `#000000` | Page background |
| `--surface` | `#ffffff` | `#141414` | Solid surfaces (gallery slides, ghost-button hover) |
| `--glass` | white 72% | `#141414` 72% | Frosted nav, buttons, cards, header bar (with `backdrop-filter: blur`) |
| `--glass-line` | black 7% | white 9% | Hairline borders on glass and images, ground grid lines |
| `--ink` | `#000000` | `#eddbcd` | Headings, main text |
| `--ink-2` | `#1a1a1a` | `#e8ddd0` | Body text, bullets |
| `--muted` | `#595959` | `#c9c2b8` | Meta: dates, places, captions, footer |
| `--faint` | `#cdcdcd` | `#5a5550` | Chip and ghost-button outlines |
| `--line` | `#e4ddd5` | `#2b2826` | Row dividers |
| `--accent` | `#c06014` | `#ea9a4e` | Dots, bullets, the "Now" marker; never small text on light |
| `--accent-text` | `#9c4a0e` | `#ea9a4e` | Links, primary buttons, active nav, small orange text |
| `--accent-hover` | `#7e3c0b` | `#f2b273` | Hover state of the above |
| `--accent-soft` | `#f7ece0` | `#2a1c10` | Active nav background, "In progress" pill, image placeholders |
| `--on-accent` | `#ffffff` | `#000000` | Text on primary buttons |
| `--blob-a/b/c` | orange 22% / cream 95% / orange 12% | orange 30% / cream 7% / orange 12% | The three blurred lights in the fixed background |

`#c06014` is only 4.26:1 on white, which is why small orange text uses
`#9c4a0e`.

**Dark mode.** A moon/sun button toggles `data-theme` on `<html>` and saves the
choice in `localStorage` (`nh-theme`). On a first visit the page follows the
system setting. An inline script in `<head>` sets the theme before first paint,
so there is no flash.

### Type

One family: `"Helvetica Neue", Helvetica, Arial, sans-serif` (no web fonts).
Large type uses weight 500 with tight negative tracking. That is the main "look".

| Role | Selector | Size (phone → desktop) | Weight / tracking |
|---|---|---|---|
| Hero name (H1) | `.hero-title` | `clamp(3.1rem, 11.2vw, 9.25rem)` | 500 / −0.05em, line-height 0.92 |
| Closing line | `.contact-title` | `clamp(3.5rem, 14vw, 11rem)` | 500 / −0.055em |
| Section heading (H2) | `h2` | `clamp(2.5rem, 6vw, 4.75rem)` | 500 / −0.035em |
| About statement | `.statement` | `clamp(2rem, 4.6vw, 3.75rem)` | 500 / −0.035em |
| Project title | `.project-text h3` | `clamp(1.75rem, 3vw, 2.5rem)` | 500 / −0.03em |
| Role title | `.role-body h3` | `clamp(1.5rem, 2.4vw, 2rem)` | 500 / −0.025em |
| Hero sub-line | `.hero-sub` | `clamp(1.25rem, 2.4vw, 1.75rem)` | 400, max 40ch |
| Body | `body` | 17px, line-height 1.6 | 400 |
| Meta / chips / pills | various | 13–15px | 500–600 |

Rules: sentence case everywhere, no ALL-CAPS labels, no letter-spaced
eyebrows, no "→" appended to buttons. Body text lines stay under about 62
characters (`max-width: 62ch`).

### Space and grid

| | Value |
|---|---|
| Container | `max-width: 1240px`, gutters 20px (phone) / 40px (≥768px) |
| Breakpoints | `min-width: 768px` and `min-width: 1024px` only (mobile-first) |
| Section padding | 88px (phone) / 120px (≥1024px) top and bottom |
| Header height | `--header-h: 76px` (sticky). `scroll-padding-top` keeps anchors and focus below it. |
| Desktop grids | About, Experience: 4 / 8 columns. Project rows: 7 / 5 (media / text). VF text-only row: 5 / 7. Skills: 3 equal columns. Education: 2 equal columns. |
| Background | Fixed `.ground` layer: 3 blurred blobs and faint vertical lines every 1/6 of the width, fading out downwards. Decorative and `aria-hidden`. |

### Shapes and surfaces

- **Radius:** `--radius: 24px` for big things (project covers, photo strip,
  cards, lightbox frame). `--radius-sm: 14px` for small ones (gallery slides,
  logo plates, BLOQ art, mobile menu). Pills, chips and buttons are fully
  round (`999px`).
- **Shadow:** a single `--shadow` (very soft) on glass surfaces, covers and
  cards. No other shadows.
- **Borders:** 1px hairlines only (`--glass-line`, `--line`, `--faint`).

### Components

| Component | Class | Notes |
|---|---|---|
| Glass pill nav | `.nav-desktop` | Desktop only. Links are 40px pills; the last one (`.nav-cta`, "Get in touch") is solid orange. The active section gets `aria-current="true"` (cream pill, orange text). |
| Header bar | `.site-header::before` | Frosted full-width bar that fades in once the page scrolls (`.is-scrolled`), so the wordmark never sits on content. |
| Mobile menu | `.mobile-menu` | Glass panel with 52px rows. Closes on link click, Escape, outside click and resize to desktop. |
| Buttons | `.btn`, `.btn-ghost` | 50px tall pills. Primary is orange; ghost is glass with a grey outline. At most two side by side. |
| Status pill | `.status` | Glass pill with an orange dot; used once, in the hero. |
| Chips | `.chip` | Outline pills for project tags. |
| Bullets | `.bullets` | Orange 7px dots; key numbers in `<strong>`. |
| Project row | `.project` (+ `.project--text`) | Cover button (opens the lightbox), meta line (org left, date right), title, chips, bullets, gallery toggle. Rows are separated by a hairline. |
| Role row | `.role` | Left rail: date (+ "Now" marker on `.is-current`) and place/arrangement. Right: title, company, bullets, optional `.role-art`. |
| Education card | `.glass.edu-card` | Logo on a white plate (so navy logos work in dark mode). CSUMB wordmark 52px, Suffolk stacked logo 54px tall, so they look the same size. Footer: place left, status pill right. |
| Pills | `.pill-now`, `.pill-done` | "In progress · 2028" (cream, orange dot) / "Graduated May 2024" (outline). |
| Gallery | `.gallery` | Grid of slide thumbnails; collapsed by JS, opened by "View all N slides". |
| Lightbox | `<dialog id="lightbox">` | Native modal: Prev / caption / Next / Close. Arrow keys work, and clicking outside the slide closes it. The caption is `aria-live`. |
| Back to top | `.back-to-top` | Floating glass pill, desktop/tablet only, appears after 700px of scroll. |

---

## 5. Motion (GSAP)

**Loading.**
- `gsap.min.js`, `ScrollTrigger.min.js` and `SplitText.min.js` (3.13.0)
  load from cdnjs with `defer`, before `assets/js/main.js`.
- GSAP 3.13 is free to use, including SplitText.

**Guard.**
- The `<head>` script adds `html.anim` only when motion is allowed. In CSS,
  `html.anim [data-load] { opacity: 0 }` holds the first-screen pieces for the
  intro.
- `main.js` removes `anim` when it starts.
- If GSAP hasn't loaded after 2.5s, the `<head>` script removes `anim` itself,
  so nothing stays hidden.
- With `prefers-reduced-motion: reduce`, no GSAP code runs and everything is
  simply visible.

The animations are numbered in `main.js` (steps 1–8):

| # | What moves | Trigger | Effect |
|---|---|---|---|
| 1 | Header, status pill, hero name, sub-line, buttons, photo strip | Page load (timeline) | Fade/slide in; the name rises **letter by letter** from a mask (SplitText `chars`, `expo.out`). |
| 2 | Photo strip | Scrolling the hero away (`scrub`) | Drifts left up to 25% of the viewport (max 320px). |
| 3 | About statement | Scrolling through it (`scrub`) | Words fill from 16% opacity to full ink. |
| 4 | Every section H2 (except Contact) | Enters the viewport (once) | Rises **word by word** from a mask. |
| 5 | Project covers | Scrolling past (`scrub`) | Frame opens from an inset clip-path; the image settles from 1.14× zoom. |
| 6 | Every `.reveal` element | Enters the viewport (once, `ScrollTrigger.batch`) | Fades up 28px, 0.12s stagger within a batch; gets class `in`. |
| 7 | "Say hello." | Enters the viewport (once) | Rises letter by letter. |
| 8 | Background blobs | Always (18–26s yoyo) | Slow drift. |

Not GSAP: the header bar, the hover states (CSS transitions, 0.2–0.6s,
`cubic-bezier(0.2, 0.7, 0.2, 1)`), and image zoom on hover (1.03×, pointer
devices only).

**Rules for motion:**
- Native scrolling only. No smooth-scroll library and no scroll hijacking.
- Hidden starting states are set by GSAP in JS, never in CSS (except
  `[data-load]` under `html.anim`). That keeps content visible with JS off.
- `ScrollTrigger` re-measures whenever the page height changes (a
  `ResizeObserver` on `<body>`, debounced 150ms). Keep that, or lazy images
  will stop later reveals from firing.
- SplitText keeps an `aria-label` with the full text on split headings, so
  screen readers read words, not letters.
- To turn an animation off, delete its numbered block in `main.js`. To make a
  block appear on scroll, add `class="reveal"`.

---

## 6. Behaviour (`main.js`, part 1: always on)

- **Theme toggle:** constant label "Dark mode", state in `aria-pressed`.
- **Mobile menu:** hidden by JS on load (so phones without JS still see the
  links).
- **Galleries:** collapsed by JS on load; the toggle reads "View all N slides" /
  "Hide slides".
- **Lightbox:**
  - The deck is built from the gallery's own slides, in slide order.
  - The cover button only chooses the starting slide, so any slide can be a
    cover without breaking Prev/Next.
  - Focus moves into the dialog and returns to the opener on close.
- **Active nav:**
  - An `IntersectionObserver` marks the section crossing 30–40% from the top.
  - At the very bottom of the page, Contact is marked instead.
  - The hero has no nav link, so nothing is highlighted there.
- **Back to top:** shown after 700px of scroll; smooth unless reduced motion.

---

## 7. Accessibility (measured 2026-11-07)

**Contrast (WCAG 2.2 AA).** Each pair is measured on plain white and on the
strongest point of the orange blur.

| Pair | Light theme | Dark theme |
|---|---|---|
| Ink | 21 / 15.8:1 | 15.6 / 11.5:1 |
| ink-2 | 17.4 / 13.1:1 | – |
| Muted | 7.0 / 5.3:1 | 11.9 / 8.8:1 |
| Accent text | 6.2 / 4.7:1 | 9.2 / 6.8:1 |
| Primary button text | 6.2:1 (white on orange) | 9.2:1 (black on orange) |

**Other checks that pass:**
- One H1.
- Visible focus on every control, landing below the header.
- Skip link.
- 44px minimum tap targets (wordmark included).
- Every image has meaningful alt text; slide thumbnails are named by their
  alt.
- No horizontal scroll from 320 to 1440px.
- Reduced motion, JS off and a blocked CDN all show every section.
- `@media print` prints every section.

Keep these when you change things: check contrast for any new colour pair, in
both themes.

---

## 8. Content rules

- **Sources:**
  - Ninh's revised resume (PDF, not in the repo)
  - the slide decks in `assets/images/`
  - the old portfolio site
  - Ninh's own edits (the About text is Ninh's, written on GitHub)
- **Never invent facts.** That means numbers, dates, outcomes, quotes or
  titles. If something is missing, ask Ninh.
- **Resume typos are kept verbatim on purpose:** "Dick's Sporting Good",
  "sales data-driven for Breakfast category including approximate 70
  planograms", "Troubleshoot raw database contained over 50 questions",
  "Power Point", "Ho Chi Minh city". Correct them only if Ninh asks.
- **Project descriptions:** at most 2–3 bullets of about 3 lines each at
  1280px, so rows stay a similar height. The Lego bullets were written from
  the deck itself (Somerville figures from the DESE 2023–24 enrollment slides).
- **Images:**
  - No captions under photos (the BLOQ art captions are link titles).
  - Alt text describes what is in the image, written after looking at it.
- **Contact:** email via `mailto:`, LinkedIn https://www.linkedin.com/in/ninh-johnny-ha,
  Behance https://www.behance.net/nnha. There's no phone number and no street
  address, on purpose.

---

## 9. How to…

**Change copy.** Edit the text in `index.html`. Keep `&amp;` for "&". If the
text is a section heading, it is split by SplitText at runtime; no extra
markup is needed.

**Add a project.**
1. Copy one `<article class="project">` in `#work` (or `project--text` for one
   without slides).
2. Keep the cover `<button class="gallery-thumb step-cover project-media"
   data-deck="NAME" data-full="…png" data-alt="…" data-caption="…">`.
3. Add a `<div class="gallery" id="NAME-gallery">` with one `<figure>` per
   slide, each holding a `gallery-thumb` button with the same `data-deck`.
4. Point the toggle's `aria-controls` at the gallery id and set `data-total`.
5. Images: a full-size PNG for the lightbox and a 600px-wide JPEG thumbnail,
   with real `width`/`height` attributes.

No JS change is needed for any of this.

**Add a role.** Copy one `<li class="role reveal">` in `#experience`. Put the
date in `.role-date`, place and arrangement in `.role-place`, and bold the key
number inside its bullet with `<strong>`. Move `is-current` to the newest role.

**Add a skill.** Add an `<li>` to the right `.skill-group`.

**Change a colour.** Change the token in `:root` and in
`html[data-theme="dark"]`, then re-check contrast.

**Add a section.**
1. Add `<section id="x" aria-labelledby="x-heading">` with a `.container`
   and a `.section-head` holding an `h2`.
2. Add the nav link in both `.nav-desktop` and `.mobile-menu`.
3. Add the id to the `sections` list in `main.js` (active nav).

**Swap a school logo.** Put the SVG in `assets/images/logos/` and match the
visual size of the other logo (heights in `.edu-logo img` /
`.logo-stacked`).

---

## 10. QA before every push

1. Serve locally and check the browser console for errors.
2. At 390px and 1280px, in light and dark mode, scroll the whole page slowly.
   Nothing should overlap, get cut off or scroll sideways. The header bar
   should cover content under the wordmark.
3. Open the menu on a phone width and close it with Escape. Open a project
   cover, step through all slides with Next and the arrow keys, then close by
   clicking outside.
4. Turn on reduced motion (OS setting, or DevTools → Rendering → Emulate
   `prefers-reduced-motion`), then disable JavaScript. Every section must be
   visible both times.
5. Run Print preview: all sections should be present.
6. Check contrast for any new colour pair.

---

## 11. Known limitations and open items

- **Fonts:** tested in Chromium on Linux, where Helvetica falls back to
  another sans-serif. Real Helvetica (macOS/iOS) and Safari/Firefox are
  untested. Line breaks in the big headings may differ slightly.
- **Assets:** full-size slide PNGs total about 11 MB. They load only when a
  slide is opened in the lightbox, but converting them to JPEG/WebP would make
  that faster.
- **CDN dependency:** motion depends on cdnjs. If it is down, the site still
  works without animation. To remove the dependency, download the three GSAP
  files into `assets/js/vendor/` and change the `<script src>` paths.
- **Image sizes:**
  - `lego-04.png` exists only at 1200×675; the old CDN refused the larger file.
  - The Fetch slides are 1640×924.
- **Git history:** commit `4d90cc2` (an About text edit) accidentally restored
  an older page. `e87bae7` fixed it right after, and everything since is based
  on `e87bae7`.

---

## 12. Decision log

Short history, newest first.

- **2026-11-07: Redesign.**
  - Airy layout inspired by the feel of microdose.studio, with a GSAP motion
    layer. Nothing of theirs is copied (no code, copy, images or signature
    effects).
  - Ninh's palette and Helvetica were kept by choice.
  - Also from the design and QA audit:
    - the first screen now says who Ninh is,
    - Experience has a date rail,
    - the number boxes were replaced by bold numbers in the bullets,
    - Skills became one list,
    - Contact buttons got labels,
    - print, menu, focus and lightbox fixes.
- **2026-11-07: Content.**
  - Footer location and the footer "Back to top" link were removed.
  - Lego bullets were shortened to two.
  - Ninh rewrote the About text on GitHub.
- **2026-11-06: Education.** The two cards got real school logos.
- **2026-11-06: Revised resume sync.**
  - Title and meta now match the page.
  - Dates come from the resume: Dick's Oct 2024 – Apr 2025, BLOQ from May
    2023.
  - The Advantage Solutions bullets were updated; JDA was removed from skills.
  - LinkedIn was linked.
  - The duplicate Lego slide was removed (14 slides).
- **2026-11-06: Removed at Ninh's request:**
  - the About quick-facts row (Based in / Now studying / Currently),
  - the Database Management project,
  - the BLOQ "Content Creator, Reviewer Specialize" line,
  - internal rebuild notes that were visible to visitors.
- **2026-11-06: Base build.**
  - Rebuilt from the old Adobe Portfolio site as one static page.
  - Dark/light toggle, slide galleries with a lightbox, mobile-first layout.
  - CSUMB was added as current study.

---

## Credits

- Photos, slide decks and BLOQ art: Ninh (Johnny) Ha and teammates (Lego
  deck: with Dung Cao).
- School logos © California State University, Monterey Bay and Suffolk
  University. They are used only to identify where Ninh studied.
- LinkedIn and Behance marks: Simple Icons (CC0). GSAP © GreenSock / Webflow
  (free standard license).
- Code: MIT (see `LICENSE`).
