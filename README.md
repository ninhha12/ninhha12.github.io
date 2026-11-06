# Ninh (Johnny) Ha — Personal Website

Single-page static portfolio for Ninh (Johnny) Ha — Business Analytics &amp;
Information Systems, Suffolk University Sawyer Business School, graduated
May 2024. Rebuilt from the original Adobe Portfolio site
(https://johnnyha.myportfolio.com/) with all copy, dates, and numbers kept
verbatim from the original resume and homepage.

## Preview locally

No build step. Serve the folder over HTTP (so fonts, images, and the
lightbox `<dialog>` behave as they will on GitHub Pages), then open
http://localhost:8000/:

```bash
cd ninhha12.github.io
python3 -m http.server 8000
```

Opening `index.html` directly from disk also works, but a local server is
the accurate preview.

## Publish to GitHub Pages

1. Commit these files to the `main` branch of
   `https://github.com/ninhha12/ninhha12.github.io` (the repo root must
   contain `index.html`).
2. On GitHub: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch → Branch: `main`, Folder: `/ (root)` → Save.**
3. The site will be live at `https://ninhha12.github.io/` within a few
   minutes. No build step, no backend, no secrets.

## Files

- `index.html` — the whole site: About, Work, Experience, Skills,
  Education, Contact (single page, anchor navigation).
- `assets/css/main.css` — one stylesheet ("Minimalist Bold" palette:
  #c06014 burnt orange, #eddbcd warm cream, #000000, #cdcdcd, #ffffff;
  Helvetica throughout; small accent text and buttons use a darker
  burnt orange #9c4a0e so contrast passes WCAG AA).
- `assets/js/main.js` — one vanilla-JS file (mobile menu, slide galleries
  + lightbox, back-to-top, active-nav highlighting, reveal-on-scroll).
- `assets/images/` — the user's own photos and slide decks, downloaded
  from the original site's CDN and served locally (no hotlinking):
  `hero-0.jpg` / `hero-1.jpg` (homepage photos, with 600w/1200w
  derivatives for `srcset`), `fetch-01.png` … `fetch-12.png`,
  `lego-01.png` … `lego-15.png` without `lego-09.png` (a duplicate
  slide, removed), all with 600w JPEG thumbnails.
- `assets/images/logos/` — `csumb.svg` and `suffolk.svg`, the official
  logos downloaded from csumb.edu and suffolk.edu (Education section).
- `favicon.svg` — "NH" monogram.

## Notes for Ninh (please confirm)

- **Typos kept verbatim on purpose:** the resume reads "Dick's
  Sporting Good", "sales data-driven for Breakfast category including
  approximate 70 planograms", "Troubleshoot raw database contained over
  50 questions", and "Power Point"; the site also keeps "Ho Chi Minh
  city". These were kept as published; say the
  word and they can be corrected.
- **No GitHub link, resume PDF, GPA, or "available for work"
  statement** — none were on the original site. LinkedIn is linked from
  the contact section (URL taken from the revised resume).
- **Lego Presentation** has no description on the original site, so the
  card says so plainly and shows only the year 2024 (from the old
  cross-link label).
- **Image quirks found while rebuilding:**
  - `lego-04.png` could only be downloaded at 1200w — the CDN returns
    HTTP 403 for its 1920w variant (retried several times). It displays
    identically at the sizes used on this site.
  - `lego-08.png` and `lego-09.png` were byte-identical on the original
    site (the "How STEAM Program Important?" slide appeared twice in a
    row). The duplicate `lego-09` was removed, so the deck has 14
    slides; files `lego-10` … `lego-15` keep their names and are shown
    as slides 9–14.
  - Fetch slides are 1640×924 as served by the CDN (the largest variant
    available for those files, despite the `_rw_1920` URL pattern); the
    `width`/`height` attributes match the actual files. `lego-04.png` is
    1200×675 for the same reason (see above).
  - Alt text for every slide was written after viewing the slide images;
    nothing was guessed from filenames. The "LEGO Discovery Center
    Boston" line on the Lego card and the "Graduation, Suffolk University
    2024" caption come from the deck's own title slide and the photo
    itself (Suffolk seal on the sash, 2024 tassel) — not from the old
    site's text, which had no description for either.
- The Instagram reel linked from the original resume could not be
  verified, so it is mentioned only as an unlinked footnote under the
  Marketing Manager role — it is not embedded or linked.

## Accessibility checks (QA, 2026-11-06)

Contrast ratios verified by calculation (WCAG 2.2 AA, ≥4.5:1 normal text,
≥3:1 large text): ink on paper 16.7:1, ink-2 on paper 9.9:1, accent on
paper 5.2:1, accent on white 5.5:1, white on accent 5.5:1, muted on white
5.0:1, muted on paper 4.7:1, amber on white 5.0:1, amber on accent-soft
4.4:1 (metric numbers only, 28px large text — passes 3:1). Two pairs
failed AA as built and were fixed in QA: muted 13px metric labels and the
14px BLOQ gap note on the accent-soft background were 4.34:1, so both now
use ink-2 (~9.3:1 on accent-soft). All 63 local references (images,
CSS, JS, favicon) return HTTP 200 from a local server; all 7 anchor
targets resolve; single H1; no guessed slide descriptions.

## Scroll pattern & mobile-first (update, 2026-11-06)

- **Scroll-into-view steps:** the Work section is now three numbered steps
  (01 Fetch, 02 VF Corporation, 03 Lego; the Database Management project
  was removed at Ninh's request). On desktop each step is a two-column
  text/visual pair that alternates sides (step 02 is flipped); on phones the
  steps stack text-first, visual-after. Each step fades/slides in
  (600ms ease, 20px rise) only as it scrolls into view, one at a time,
  via a single `IntersectionObserver` (`threshold: 0.15`,
  `rootMargin: "0px 0px -8% 0px"`); elements that enter the viewport
  together stagger 150ms apart (max 450ms), one entering alone has no
  delay. The Experience timeline entries and skill cards use the same
  reveal. To add a step, duplicate one `<article class="card step …">`
  and renumber its `.step-num` — no JS change needed. The pattern is
  inspired by the Webflow "How it works — Scroll into view" example;
  no Webflow copy or imagery is used.
- **Mobile-first:** the base stylesheet is the phone layout (single
  column, 20px gutters at ≤480px, 17px body, 40px H1 on small phones,
  ≥44px tap targets, no hover-only interactions, safe-area padding on
  the lightbox and back-to-top button). Desktop rules are `min-width`
  enhancements only. No horizontal scrolling at 360px and up (checked
  in code review).
- **Safety nets:** the hidden-before-reveal state exists only when JS
  has run (`html.js`) and motion is allowed — with JS off, no
  `IntersectionObserver`, or `prefers-reduced-motion: reduce`, all
  content is visible immediately. Scrolling is never hijacked.
- **Budgets still met:** CSS ~21 KB (≤30 KB), JS ~7.8 KB (≤15 KB).

### How to preview the scroll pattern

Serve the folder (`python3 -m http.server 8000`) and scroll slowly
through Work and Experience on a phone-sized viewport (360–390px) and
on desktop: each step should appear once, in order, as it enters the
viewport. Then check the fallbacks: disable JavaScript (everything
must be visible, no blank sections) and enable reduced motion in the
OS/browser (reveals must be instant, with no sliding).

## Updates, 2026-11-06 (Ninh's requests)

- **Dark / light mode button:** a moon/sun toggle in the header (44px tap
  target). It saves the choice in `localStorage`, falls back to the
  system setting on first visit, and is set before first paint so there
  is no flash. Dark mode inverts the Minimalist Bold palette (black
  background, cream text, lighter orange #ea9a4e accents — 9.23:1 on
  black; buttons use black text on orange in dark mode).
- **Education:** Ninh is currently attending CSUMB, majoring in SHTM,
  expected graduation 2028. Added as the first education card; Suffolk
  (graduated May 2024) is kept below it. Hero role updated to match
  (SHTM · CSUMB, expected 2028). The About quick-facts row (Based in /
  Now studying / Currently) was later removed at Ninh's request.
- **Contact, minimal:** the section is now just "Let's talk." plus the
  email link. The intro sentence, phone number and location lines were
  removed.

- **Feedback fixes, 2026-11-06:** removed the duplicate "Experience"
  eyebrow above the Experience heading; Work steps are now labelled
  "Project #1"–"Project #3"; contact is now just a heading plus buttons
  (Email wired to mailto; LinkedIn and Behance buttons pending Ninh's
  profile URLs — not guessed). Heading changed from "Let's talk." to
  "Say hello.".

- **Intro update, 2026-11-06:** hero occupation line now reads
  "Completing Sustainable Hospitality & Tourism Management at CSU
  Monterey Bay" (SHTM expanded per Ninh). Education card degree line
  updated to match.

- **Feedback fixes, 2026-11-06:** hero email link removed (contact
  section at the bottom is the single place for it); contact buttons
  are now logo buttons — circular outline buttons with the real
  LinkedIn and Behance brand marks (Simple Icons, CC0) and an
  envelope icon for Email. Email is wired to mailto and Behance to
  https://www.behance.net/nnha. LinkedIn is wired to
  https://www.linkedin.com/in/ninh-johnny-ha (from the revised resume).

- **Revised resume sync, 2026-11-06:** title, meta and Open Graph tags
  now say Planogram Analyst (Boston, MA), Suffolk BA&IS graduate (2024)
  and current SHTM student at CSU Monterey Bay, matching the page. The
  intro says "graduate of … (May 2024)" instead of "major … graduate in
  May 2024". Dates and copy follow the revised resume: Dick's Sporting
  Good Oct 2024 – Apr 2025 (no longer overlaps Advantage Solutions,
  Apr 2025 – Present, Boston, MA), BLOQ May 2023 – Sep 2023, revised
  Advantage Solutions bullets, "reported" (Fetch), "Troubleshoot raw
  database" (VF), "150 visitors" (BLOQ), and JDA removed from skills.
  Months are abbreviated consistently (Apr, not April/July).

- **Education redesign, 2026-11-06:** the two centered cards are now two
  left-aligned cards side by side (stacked on phones), each with the
  school's real logo on a white plate (so the navy logos stay visible in
  dark mode), school + college, degree, and a footer with the location
  and a status pill ("In progress · 2028" / "Graduated May 2024").
  "B.S." for Suffolk comes from the revised resume.
