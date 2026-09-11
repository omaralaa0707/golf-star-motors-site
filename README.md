# Golf Star Motors — site 02 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Golf Star Motors, and not an official site.**

- **Live:** https://golf-star-motors-site.vercel.app
- **Repo:** [golf-star-motors-site](https://github.com/omaralaa0707/golf-star-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Metallic gold / pitch black / flash red

**Type pairing**
: Archivo + Parisienne script / Cairo (AR)

**3D / signature technique**
: GLSL displacement dissolve between photos, scroll-driven

**Motion language**
: Quick and mechanical: ticking counters, continuous make ticker

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/golf.star.motors/
- Facebook: https://www.facebook.com/golfstarmotors/
- Google Maps: https://www.google.com/maps/place/%D8%AC%D9%88%D9%84%D9%81+%D8%B3%D8%AA%D8%A7%D8%B1%E2%80%AD/data=!4m2!3m1!1s0x0:0x678fcac3b2cab5e2

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
