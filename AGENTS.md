# AGENTS.md — Portfolio Abdoulaye Lankoandé

This file documents the architecture and conventions for AI agents working on this codebase.

## Project Overview

Single-page personal portfolio for Abdoulaye Lankoandé (Youth Engagement & Public Health Specialist, Burkina Faso). Built with TanStack Start, deployed on Netlify.

## Architecture

### Single-Page Design
All portfolio content lives in **`src/routes/index.tsx`** as one large component. Sections are connected via smooth scroll navigation. This was an intentional choice for simplicity and performance — no separate routes for sections.

### Routing
- `src/routes/__root.tsx` — Root layout, Google Fonts, SEO meta
- `src/routes/index.tsx` — Full portfolio (all sections)
- Other routes (`blog/`, `contact.tsx`, `projects.tsx`, `resume.tsx`) exist from the template but are not linked from the portfolio navigation

### Styling
- **`src/styles.css`** — CSS custom properties for the blue/green palette, all keyframe animations, utility classes
- **Tailwind CSS 4** — utility-first styling inline in JSX
- Color palette: Blue primary `#0A66C2` / `#1E3A8A`, Green secondary `#16A34A` / `#22C55E`
- Dark mode: toggled via `.dark` class on `<html>`, persisted in localStorage

### Animations
All animations are pure CSS defined in `src/styles.css`:
- `orbit` — rotating dot around the hero photo
- `float`, `pulseGlow` — hero photo effects
- `fadeInUp`, `slideInLeft/Right` — scroll reveal
- `.scroll-reveal`, `.scroll-reveal-left`, `.scroll-reveal-right` — Intersection Observer classes applied via `useScrollReveal()` hook

### Key Components (all in index.tsx)
- `ProgressBar` — animated language skill bar with IntersectionObserver trigger
- `CircleProgress` — SVG circle chart with animated stroke-dashoffset
- `TimelineItem` — individual entry for the academic/certification timeline
- `ExpertiseCard` — hover-animated domain card
- `Mindmap` — SVG-line + absolutely-positioned nodes circular mindmap

## Directory Structure

```
src/
  routes/
    __root.tsx        # HTML shell, Google Fonts preconnect, SEO meta
    index.tsx         # Full portfolio page
  styles.css          # Design tokens, animations, utility classes
  components/ui/      # Radix UI primitives (not used in index.tsx currently)
  lib/utils.ts        # cn() helper
public/
  abdoulaye-profile.jpg  # Profile photo (moved from .netlify/assets)
```

## Conventions

- **Inline styles** for brand colors (avoid Tailwind config extension for one-off values)
- **No external animation libraries** — all CSS keyframes hand-written
- **IntersectionObserver** for scroll-triggered animations (no GSAP/framer-motion)
- **Dark mode** via `document.documentElement.classList.toggle('dark', ...)` + CSS `.dark` variant
- **localStorage** key: `'theme'` → `'dark'` | `'light'`

## Non-obvious Decisions

- The mindmap uses absolute positioning with trigonometric placement (`Math.cos`/`Math.sin`) for nodes — adjust `165`/`34.5` constants to change orbit radius
- `CircleProgress` uses SVG `stroke-dashoffset` animation driven by React state (triggered once on IntersectionObserver)
- `ProgressBar` uses inline `style={{ width: filled ? X% : 0% }}` with a CSS `transitionDuration: '1.4s'` override rather than Tailwind's `duration-*` classes because Tailwind v4 doesn't support arbitrary transition durations in JIT for dynamic values
- Content Collections (`content/` directory) is present from the template but not used in the portfolio — it can be safely ignored or removed
