# Golf Star Motors — concept site

A concept site for **Golf Star Motors**, a multi-make dealership in Ard El Golf,
Nasr City, trading since 1975. Bilingual (Arabic / English) with full RTL
support.

Imagery, prices and copy tone come from the showroom's own Instagram
([@golf.star.motors](https://www.instagram.com/golf.star.motors/)) and Facebook.
Unofficial concept, not affiliated with the dealership.

## Design notes

- **Signature technique** — a GLSL displacement dissolve between photographs,
  driven by scroll through a pinned section. Two textures are sampled with their
  UVs pushed apart along a noise field, so frames melt rather than cross-fade.
- **Palette** taken from their own collateral: metallic gold wordmark on black,
  with the red they use for price flashes.
- **Type** — Archivo at extrabold for retail weight, Parisienne for the "Since
  1975" signature they sign every post with, Cairo for Arabic.
- **Motion** is deliberately quick and mechanical — counters ticking up, a
  continuous make ticker — the opposite of a slow luxury fade.
- Deposits and instalments shown are transcribed from their published posts and
  labelled as-published.

## Local development

```bash
pnpm install
pnpm dev
```

Next.js 16, React 19, Tailwind v4, GSAP, Lenis, react-three-fiber.
Designed and built by Claude.
