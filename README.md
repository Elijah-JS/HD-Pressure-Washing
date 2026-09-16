# HD Pressure Washing — Website Redesign (Mockup)

A production-quality homepage redesign for **HD Pressure Washing**, Fontana CA.

This is a **separate project**. It does not touch, modify or deploy over the live site at
hdpressurewasher.com.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

---

## ⚠️ Read this first: two things that need the owner's confirmation

### 1. Phone number conflict

| Source | Number |
| --- | --- |
| Project brief | (909) 809-1966 |
| **Live website** (header, contact page, footer — every page) | **909-809-1720** |

The site uses **909-809-1720**, because the live website is the source of truth for conflicting
information. If 1966 is the current number, change it in one place — `src/lib/site.ts` →
`site.phone` — and it updates the header, hero, quote section, footer, click-to-call links and the
Schema.org structured data together.

### 2. The photography is stock, not HD's own work

Every image on the current website is licensed stock photography, not photos of HD's jobs. Those
same images have been reused here so the layout can be judged with real content in place, but
**before this goes live the owner should confirm the stock licence covers the new site, and
ideally replace them with photos of actual HD work.** Real job photos will outperform stock badly
in this industry — see *Replacing images* below.

---

## What was verified, and what was deliberately left out

Everything factual on the page was taken from hdpressurewasher.com.

**Verified and used**

- Business name, logo artwork, brand colours (`#0291F9`, `#003A6B`)
- Phone `909-809-1720`, email `cesar@hdpressurewasher.com`
- Address: 8972 Gentian Ave, Fontana CA 92344
- Hours: Monday–Friday, 8:00 AM – 6:00 PM
- Licence: FBN20240001972
- Facebook `/hdpressurewasher` and Instagram `/hd.pressurewashing` — both real and linked
- All 8 services and their descriptions
- Service areas: Fontana, Rancho Cucamonga, Redlands (each has a dedicated page today)
- FAQ answers, adapted from the FAQ on their location pages
- Their own claims: eco-friendly/biodegradable products, trained and insured technicians,
  free no-obligation quotes, satisfaction guarantee, residential and commercial

**Deliberately absent — nothing was invented to fill these gaps**

- ❌ No review count, star rating, or testimonials. None exist on their site, and no public
  listing for this business could be verified. The reviews section ships as three reserved frames
  with an on-page explanation. See *Adding reviews* below.
- ❌ No years in business, jobs completed, customer counts, awards or certifications
- ❌ No before/after pairs. None exist. The comparison slider is fully built and working; it
  currently renders a labelled placeholder on the "before" side.
- ❌ No prices, no guarantees beyond the one they already publish
- ❌ No invented social profiles
- ❌ No `aggregateRating` or `review` in the structured data — fabricated review markup is a
  Google manual-action offence

---

## Structure

```
src/
├── app/
│   ├── layout.tsx          metadata, fonts, Open Graph, favicons
│   ├── page.tsx            homepage composition + JSON-LD injection
│   ├── globals.css         design tokens (Tailwind v4 @theme) + base styles
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── layout/             Header, Footer, MobileCTABar
│   ├── sections/           Hero, TrustStrip, Services, Results, About,
│   │                       Process, ServiceAreas, Reviews, Faq, Quote, QuoteForm
│   └── ui/                 Button, Container, SectionHeading, Logo,
│                           BeforeAfterSlider, Reveal
└── lib/
    ├── site.ts             ← single source of truth for ALL business data
    ├── schema.ts           Schema.org LocalBusiness / ProfessionalService / FAQPage
    └── cn.ts
```

**`src/lib/site.ts` is the file to edit.** Phone, email, address, hours, licence, services,
service areas and social links all live there and flow into every component plus the structured
data. No business fact is hardcoded in a component.

---

## Connecting the quote form

`src/components/sections/QuoteForm.tsx` is frontend-only right now. It validates, shows real
submitting/success/error states, and logs the payload.

To connect a backend, set one environment variable:

```bash
NEXT_PUBLIC_QUOTE_ENDPOINT=https://your-endpoint
```

It POSTs JSON matching the exported `QuotePayload` type:

```ts
{ name: string; phone: string; email: string; service: string; details: string }
```

That works with a Netlify Function, Formspree, a HighLevel webhook (their current site runs on
HighLevel, so the existing lead pipeline can be reused), or a Next.js route handler. No other code
change is needed.

---

## Deploying to Netlify

`netlify.toml` is included and configured.

1. Push the repo, then "Add new site → Import an existing project" in Netlify.
2. Netlify detects Next.js and installs `@netlify/plugin-nextjs` automatically.
3. Build command `npm run build`, publish directory `.next` — already set in `netlify.toml`.
4. Set `NEXT_PUBLIC_QUOTE_ENDPOINT` under Site settings → Environment variables if the form is
   being wired up.
5. Update `site.url` in `src/lib/site.ts` to the real production origin so canonical URLs, Open
   Graph tags, `sitemap.xml` and the structured data all point at the right host.

The page is fully static (prerendered at build time) — first-load JS is ~117 kB.

---

## Existing SEO URLs — do not drop these

The live site has 15 indexed URLs. If this redesign becomes the production site, **every one of
them must be recreated or 301-redirected**, not deleted. They are listed in `LEGACY_URLS` in
`src/lib/site.ts`, and each service and area object carries its own `legacyUrl`.

| Existing URL | Plan when this goes live |
| --- | --- |
| `/` | Replaced by this homepage |
| `/about-us` | Recreate, or 301 → `/#about` |
| `/contact-us` | Recreate, or 301 → `/#quote` |
| `/services` | Recreate, or 301 → `/#services` |
| `/pressure-washing-services` | Recreate as `/services/pressure-washing` + 301 |
| `/house-washing-services` | Recreate as `/services/house-washing` + 301 |
| `/driveway-cleaning-services` | Recreate as `/services/driveway-cleaning` + 301 |
| `/roof-cleaning-services` | Recreate as `/services/roof-cleaning` + 301 |
| `/gutter-cleaning-services` | Recreate as `/services/gutter-cleaning` + 301 |
| `/solar-panel-cleaning-services` | Recreate as `/services/solar-panel-cleaning` + 301 |
| `/window-cleaning-services` | Recreate as `/services/window-cleaning` + 301 |
| `/commercial-cleaning-services` | Recreate as `/services/commercial-cleaning` + 301 |
| `/pressure-washing-services-in-fontana-ca` | Recreate as `/areas/fontana` + 301 |
| `/pressure-washing-services-in-rancho-cucamonga-ca` | Recreate as `/areas/rancho-cucamonga` + 301 |
| `/pressure-washing-services-in-redlands-ca` | Recreate as `/areas/redlands` + 301 |

> Redirects preserve the ranking; deleting the pages throws it away. Pick one column and apply it
> consistently before the DNS cutover.

### Adding those pages later

The app is structured so they drop straight in:

```
src/app/services/[slug]/page.tsx   → generateStaticParams() over SERVICES
src/app/areas/[slug]/page.tsx      → generateStaticParams() over PRIMARY_AREAS
```

Both arrays already carry `slug`, `title`, `description`, `image`, `imageAlt` and `legacyUrl`.
Add the redirects in `next.config.mjs` under `async redirects()`, and extend `src/app/sitemap.ts`
to enumerate the new routes.

---

## Replacing images

All assets are in `public/images/`. Replace a file with the same name and the same aspect ratio
and nothing else needs to change.

| File | Used for | Ratio |
| --- | --- | --- |
| `hero.webp` | Desktop hero | 16:9 |
| `hero-portrait.webp` | Phone hero (art-directed via `<picture>`) | 3:4 |
| `about.webp` | About section | 3:4 |
| `services/<slug>.webp` | Service tiles — filenames match service slugs | 4:3 |
| `work/*.webp` | Results mosaic | 4:3 and 3:4 |
| `brand/logo@3x.png` | Header and footer logo | transparent PNG |
| `og.jpg` | Open Graph / social share card | 1200×630 |

### Adding real before/after pairs

In `src/components/sections/Results.tsx`, give `FEATURED_PAIR` a `beforeSrc`:

```ts
const FEATURED_PAIR: BeforeAfterPair = {
  beforeSrc: '/images/work/driveway-before.webp',
  beforeAlt: 'Stained concrete driveway before cleaning',
  afterSrc:  '/images/work/driveway-after.webp',
  afterAlt:  'The same driveway after pressure washing',
  caption:   'Driveway & concrete restoration',
  location:  'Fontana, CA',
};
```

The placeholder frame disappears automatically. Shoot both photos from the same spot in similar
light — that is what makes the slider land. `BeforeAfterSlider` takes any number of pairs, so
adding a row of several is straightforward.

### Adding reviews

In `src/components/sections/Reviews.tsx`, push objects into the `REVIEWS` array:

```ts
const REVIEWS: Review[] = [
  { quote: '…', name: '…', detail: 'Driveway cleaning, Fontana', source: 'Google' },
];
```

The placeholder frames and the explanation panel are replaced automatically once the array is
non-empty. **Only paste reviews that exist verbatim on a real profile, and attribute the source.**
Once there are real, verifiable ratings, `aggregateRating` can be added to `src/lib/schema.ts`.

---

## SEO notes

- Title, meta description and Open Graph are set in `src/app/layout.tsx`
- Schema.org `ProfessionalService` + `LocalBusiness`, `WebSite` and `FAQPage` are generated in
  `src/lib/schema.ts` from `site.ts` — they cannot drift from the visible content
- FAQ copy and FAQPage markup share one source (`FAQS` in `Faq.tsx`)
- Semantic heading order: one `h1`, `h2` per section, `h3` for items
- Every image has descriptive alt text; decorative layers are `aria-hidden`
- Target intent is covered in body copy, not stuffed: pressure washing Fontana CA, exterior
  cleaning Inland Empire, roof / driveway / gutter / window / solar panel cleaning

## Mobile

Mobile is not the desktop layout stacked — several sections change behaviour below `sm`/`md`:

- **Services** render as a two-column grid of square crops with titles only. One column of
  full-width 4:3 tiles was ~2,300px of scrolling on its own.
- **Reviews** become a snap-scrolling rail (three cards at one card's height) instead of a
  900px stack. Reverts to a three-column grid at `md`.
- **Trust strip** is a two-up grid of labels; the supporting line is desktop-only detail.
- **Hero** uses an art-directed portrait crop via `<picture>`, a lower type floor, and only the
  vertical scrim — stacking both scrims crushed the photo to black on a narrow viewport.
- **Why-choose points** put the icon beside the text rather than above it, saving ~60px each.
- **Before/after slider** drops its instruction line, since the revealed strip is ~140px wide.
- A persistent call / quote bar appears once the hero is off screen and hides over the quote
  section and footer, where the same actions are already full-size.
- Hover-only affordances (the tile arrow badge) are hidden on touch.

Verified with no horizontal overflow at 320, 375, 390, 430, 768, 1024, 1440 and 1920px.

## Accessibility

- Skip-to-content link, visible focus rings, `aria-current` on the active nav item
- Mobile menu is a labelled dialog with Esc-to-close and scroll lock
- FAQ uses native `<details>` — keyboard accessible with zero JS
- The before/after slider is a real `<input type="range">`: arrow keys, Home/End and touch all work
- `prefers-reduced-motion` disables the entrance animations and smooth scrolling
- Entrance animations are gated behind `html.js`, so with JS unavailable the page renders fully
  visible rather than blank

## Tech

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · lucide-react.

Four runtime dependencies total. No UI kit, no animation library, no CSS-in-JS.
