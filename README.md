# Monerul Islam Bishal — Portfolio

Personal portfolio for a full-stack developer. Dark, motion-led, with a procedural
3D hero scene built in **vanilla three.js** — no models, no post-processing, no
scroll hijacking.

## Stack

- **Next.js 15** (App Router, RSC-first) + **React 18** + **TypeScript**
- **Tailwind CSS** + a small design system in `app/globals.css`
- **three.js** for the hero scene, lazy-loaded and deferred until after first paint
- **Framer Motion** for section reveals, page transitions and card tilt
- **Lenis** for smooth scrolling (skipped when `prefers-reduced-motion` is set)
- **lucide-react** icons, **next/font** (Space Grotesk + JetBrains Mono)
- **canvas cursor trail** on desktop (fine pointers only, disabled for reduced motion)
- **typewriter terminal** in the About section, triggered after its reveal
- **masked line reveal** for the hero copy (CSS-driven, runs on first paint)
- **scene skeleton** that holds the 3D area until the first frame is drawn
- **looping ambient aurora** behind the page + liquid-glass cards

## Structure

```
app/
  layout.tsx          fonts, metadata, JSON-LD, nav/footer, smooth scroll
  template.tsx        route-change transition (transform only, no flash)
  page.tsx            home: hero, about, skills, work, principles, CTA
  projects/page.tsx   full project index
  contact/page.tsx    contact details + mailto form
  not-found.tsx       404
  error.tsx           runtime error boundary
  sitemap.ts robots.ts icon.svg
components/
  hero/               hero copy, line reveal, WebGL mount / skeleton / fallback
  three/hero-scene.tsx  procedural desk, monitor, robot, particles
  home/sections.tsx   about, skills, work preview, principles, CTA
  home/terminal.tsx   typed profile.json terminal
  work/project-card.tsx
  effects/            looping aurora + glass proximity
  fancyCursor/        canvas cursor trail
  layout/             nav, footer, smooth scroll
  ui/                 reveal, tilt, marquee, section heading
lib/site.ts           single source of truth for copy, links and projects
public/
  projectImage/       project screenshots (real captures where possible)
  assets/             résumé PDF
  og.png              generated social card
scripts/              Playwright audit + capture + OG generator
```

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start
```

Node 20+ recommended. `npm install` may need `--cache ./.npm-cache` if your global
npm cache has permission issues.

## Editing content

Everything editorial lives in [`lib/site.ts`](lib/site.ts):

- `site` — name, role, location, email, socials, résumé path, skill groups
- `projects` — title, tagline, description, image, stack, `href`, `kind`
- `featured` — which projects appear on the home page

Project copy, screenshots and client names are **drafts to be replaced with your
own case studies**. The live domain is only set for DROFY; the other cards render
without a link and are labelled as client work.

Résumé: replace `public/assets/Bishal Resume V2.pdf` and update `site.resume`.

## The 3D scene

`components/three/hero-scene.tsx` builds the whole scene from primitives:

- desk, retro monitor with a live `<canvas>` code texture, instanced keyboard,
  lamp, plant, mug, floating shapes, dust motes and a small robot companion
- pointer parallax, a hello-wave on load, subtle idle animation
- fog-faded floor grid and a single contact-shadow disc

Performance decisions:

- loaded with `next/dynamic(..., { ssr: false })`
- **mounted ~900 ms after hydration** so it never competes with LCP
- `dpr` clamped to 1.25 on mobile / 1.6 on desktop
- rendering pauses when the canvas leaves the viewport or the tab is hidden
- single WebGL context, no shadows, no post-processing, all geometry disposed on
  unmount
- graceful fallback: CSS gradient scene when WebGL is unavailable, plus the
  scene fades in only after it is ready

Reduced motion: the scene renders one static frame, the cursor trail is skipped,
and the rest of the site drops parallax/reveals (see `components/ui/reveal.tsx`,
`tilt-card.tsx`). The trail also pauses on tab blur/hide and ignores touch-only
devices.

## Measured (production build, Chromium, warm GPU)

| Metric | Value |
| --- | --- |
| LCP | ~0.17 s |
| CLS | 0 |
| First-load JS | ~159 kB |
| three.js chunk (lazy) | ~130 kB gzip |
| Console errors | 0 |

The aurora is drawn on a fixed, low-resolution 2D canvas behind `main`. It is
time-based, not scroll-based: four pre-rendered, blurred sine curtains orbit on
a 26-second loop, so the glow drifts continuously and seamlessly regardless of
how the page is scrolled. Each band has its own orbit, scale and breathing
alpha, and a gentle horizontal drift keeps the motion from looking mechanical.

When a band passes behind a card, the card picks up a liquid-glass treatment
for that moment: backdrop blur and saturation, a brighter border, and a light
highlight that tracks the band's height inside the card. It is capped to the
two closest cards and updated every eighth frame.

Readability is tuned deliberately: `main` carries a 35% dark scrim over the
aurora, cards use near-opaque surfaces instead of translucent glass, low-contrast
text tokens were raised, and project badges are opaque instead of sitting on a
50% black pill over screenshots. The full page was sampled at eight scroll
positions (181 text elements): every element measured at 4.5:1 or better, with
most above 8:1.

Texture generation is a single blur pass at 600×350, the canvas renders at 0.45×
resolution, animation runs at ~30 fps, and under `prefers-reduced-motion` a
single static frame is painted instead.

When a band passes under a card, the card gets a liquid-glass treatment: a
backdrop blur, a brighter border, and a light highlight that tracks the band's
height inside the card. The effect is capped to the three nearest cards and
updated every fourth frame. Texture generation is a single blur pass at 600×350,
the canvas renders at 0.45× resolution, and the whole effect is skipped under
`prefers-reduced-motion`.

Numbers come from `scripts/verify.mjs` on a local production server; real-world
results depend on network and device.

## Verification scripts

Playwright is a dev dependency; scripts reuse the cached Chromium if present.

```bash
npm run audit     # screenshots + DOM/a11y/overflow/WebGL checks into artifacts/
npm run verify    # LCP/CLS/JS weight, canvas animation, nav, anchors, form
npm run og        # regenerate public/og.png
```

If Chromium is not in the default Playwright cache, set `CHROMIUM_PATH` to the
browser binary, or run `npx playwright install chromium`.

## Environment

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, OpenGraph, `sitemap.xml` and
`robots.txt`. Set it to the deployed origin before shipping — the fallback is
`http://localhost:3000`.

## Deploy

Vercel is the simplest target (zero config). Build command `next build`, output
`.next`. Set `NEXT_PUBLIC_SITE_URL` in the project environment.

Before going live:

- [ ] replace draft project copy/screenshots and résumé
- [ ] confirm every `href` in `lib/site.ts` returns 200
- [ ] set `NEXT_PUBLIC_SITE_URL`
- [ ] run `npm run build` and `npm run verify` against the deployed URL
