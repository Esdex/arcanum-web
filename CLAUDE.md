# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Static build → dist/
npm run preview  # Preview the built dist/
```

## Stack

- **Astro** — static site generator (`astro.config.mjs`)
- **Tailwind CSS v3** — via `@astrojs/tailwind` integration (`tailwind.config.mjs`)
- **Framer Motion** — scroll/load animations; requires `@astrojs/react` + React 18
- **Deploy target** — GitHub Pages at `arcanum.zip` (CNAME in `public/`)

## Architecture

The site is a single-page marketing landing for the Arcanum Android app (VeraCrypt-compatible encrypted vault). Three routes: `/` (landing), `/privacy`, `/docs`.

**Component split:** Static Astro components handle layout and non-animated content. React `.tsx` components are used only where Framer Motion is needed:

| React component | Client directive | Purpose |
|---|---|---|
| `HeroLogo.tsx` | `client:load` | Floating + glow-pulse logo animation above the fold |
| `FeatureCards.tsx` | `client:visible` | 8 feature cards that fade+slide in on scroll (staggered) |
| `ScreenshotGallery.tsx` | `client:visible` | Phone mockup cards that slide in from alternating sides |

All other components (`Nav`, `Hero`, `Features`, `Screenshots`, `VeraCryptSection`, `Download`, `Footer`) are plain `.astro`.

## Design system

| Token | Value |
|---|---|
| Background | `#0A0A0A` (AMOLED black) |
| Surface | `#1A1A1A` / `#141414` |
| Crystal accent | `#3aa6ae` → `#67c0b6` gradient |
| Purple accent | `#9C27B0` |
| Text muted | `text-gray-400` / `text-gray-500` |

Custom Tailwind token: `text-crystal` = `#3aa6ae`, `text-gradient-crystal` utility in `global.css`.

## Logo

`public/logo.svg` — hand-crafted crystal chest SVG with teal gradient. Used as favicon and in-page. Replace with real logo asset when available.

## Placeholders to fill in later

- GitHub repo URLs (currently `https://github.com/` everywhere)
- F-Droid package URL
- Real screenshots in `public/screenshots/` (currently CSS phone mockups)
- Privacy policy full text in `src/pages/privacy.astro`
- Documentation content in `src/pages/docs.astro`
