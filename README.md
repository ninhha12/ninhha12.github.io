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
- `assets/js/main.js` — one JS file: theme toggle, mobile menu, slide
  galleries + lightbox, back-to-top, active nav, and the GSAP motion
  layer. GSAP 3.13 (`gsap`, `ScrollTrigger`, `SplitText`) loads from
  cdnjs; the site works fully without it.
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
- **Lego Presentation** had no description on the original site; its two
  bullets were written from the deck's own slides (see the dated note
  below) and the year 2024 comes from the old cross-link label.
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

## Design and motion (redesign, 2026-11-07)

Inspired by the feel of microdose.studio (airy light ground, very large
type, glass pill navigation, scroll-driven text). Nothing of theirs is
copied: no code, copy, images, logos or signature effects. Ninh's palette
and Helvetica are kept.

- **Layout:** white ground with soft cream and orange light and faint
  column lines (`.ground`, fixed, decorative). Sticky header with the
  wordmark and a glass pill nav; a frosted bar fades in once you scroll.
  Hero: a status pill (current role), the name set very large, the study
  line, two buttons, then a photo strip. About is a heading-left,
  statement-right split. Work projects are full-width rows (cover left,
  text right; VF is text-only). Experience rows have a date and location
  rail on the left from 1024px, with the key numbers bold inside the
  bullets (the old number boxes repeated them). Skills is one list in
  three columns. Education keeps the logo cards. Contact is a very large
  "Say hello." with labelled buttons.
- **Motion (GSAP):** intro timeline (header, status pill, the name letter
  by letter, then sub-line, buttons and photo strip); the photo strip
  drifts left while the hero scrolls away; the About statement fills from
  faint to ink as it scrolls through; section headings rise word by word
  once; project covers open from an inset frame; `.reveal` blocks fade up
  in batches; the closing line rises letter by letter; the ground's light
  drifts slowly. Native scrolling is kept (no scroll hijacking).
- **Safety nets:** with `prefers-reduced-motion: reduce`, with JS off, or
  if the GSAP CDN fails (after 2.5s), all content is visible at once. With
  JS off the mobile menu is a plain link list and the slide galleries are
  open. `@media print` prints every section whatever the animation state.
  `ScrollTrigger` re-measures whenever the page height changes (lazy
  images, opened galleries).

## Accessibility (measured 2026-11-07)

WCAG 2.2 AA contrast, light theme, on white and on the strongest point of
the orange blur: ink 21 / 15.8:1, ink-2 17.4 / 13.1:1, muted #595959
7.0 / 5.3:1, accent text #9c4a0e 6.2 / 4.7:1, white on the #9c4a0e
buttons 6.2:1. Dark theme on black and on the blur: ink #eddbcd 15.6 /
11.5:1, muted #c9c2b8 11.9 / 8.8:1, accent #ea9a4e 9.2 / 6.8:1, black on
the #ea9a4e buttons 9.2:1. Other checks: one H1 (SplitText keeps its full
text as an `aria-label`); focus visible on every control, landing below
the sticky header (`scroll-padding-top`); 44px tap targets; the mobile
menu closes on Escape, outside click and resize to desktop; the lightbox
caption is a polite live region and slide thumbnails are named by their
alt text; no horizontal scroll from 320px to 1440px.

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

- **Lego project bullets, 2026-11-06:** two short bullets written from the
  deck itself (DESE 2023-24 enrollment data for Somerville, SWOT and 4P
  marketing mix, the two campaign ideas). Every number comes from the
  slides; please confirm the wording.
