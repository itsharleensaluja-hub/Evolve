# Evolve

Evolve is an AI business intelligence platform — it analyses revenue, detects churn risks, forecasts cash flow, and automates workflows. This repo is the marketing site for it: a one-page landing page with 12 sections, built as a static React app.

If you're here to look at the code, the interesting bits are in how we handled animations (zero libraries, all WAAPI + CSS keyframes), the data-driven pricing matrix, and the custom SVG illustrations. If you're here to see what Evolve looks like as a product — that's what the page itself is for.

## Sections

The page scrolls through 12 sections on an alternating background pattern:

| Background | Sections |
|---|---|
| **Teal** `#114C5A` | Hero, Scenario Simulator |
| **Powder** `#F1F6F4` | Features, Health Score, Pricing, Testimonials |
| **White** | Timeline, Dashboard, FAQ |
| **Noir** `#172B36` | Footer |

The pattern is: dark hero → light content → dark interactive section → light content → dark footer. It gives the page a rhythm without needing a dark/light mode toggle.

### Section list

1. **Hero** — Dashboard mockup SVG with animated chart lines, floating KPI cards (staggered entrance at 0.8s–1.3s), floating particles, 2,400+ businesses badge
2. **Features** — 8 feature cards in a bento grid that collapses to an accordion on mobile. Hover and active states are separate — hover is transient, active persists on click. The resize between grid and accordion preserves which card is open.
3. **Timeline** — Split layout: left heading, right vertical timeline with 4 milestones (Connect → Analyze → Automate → Transform). Gradient line draws in via WAAPI, nodes fade and slide in staggered.
4. **Health Score** — 270-degree SVG radial gauge (score 87/100) with 4 driver rows (Revenue Growth 92, Retention 78, Cash Flow 65, Capacity 45). The arc sweeps in, then the needle rotates with a spring easing.
5. **Dashboard** — Full SVG dashboard (900×500) with sidebar, KPI row, revenue chart, AI insights panel.
6. **Scenario Simulator** — Three sliders (Ad Spend, Churn Reduction, Efficiency) with preset buttons (Boost Growth, Cut Costs, Balanced). Results animate via requestAnimationFrame count-up with cubic ease-out.
7. **Pricing** — Three currencies (INR/USD/EUR), monthly/annual toggle, 20% annual discount, regional multipliers. Price card re-mounts with a spring animation on toggle via React key.
8. **Testimonials** — Three case studies with real metrics ($240k cash flow saved, 22 hrs/week saved, $1.8M revenue saved). Auto-rotates every 5s, pauses on hover.
9. **FAQ** — 8 questions with data-backed answers (Stripe, Shopify, Salesforce sources). CSS transition accordion with scrollHeight measurement.
10. **CTA** — Social proof grid, gradient button
11. **Footer** — Noir background, 4-column link grid, newsletter input, language selector

## Stack

- **React 19** — concurrent rendering, though for a marketing page the main benefit is the improved hydration and smaller footgun surface
- **Vite 8** — fast dev, good build output (CSS 55KB, JS 301KB gzipped to ~87KB)
- **Tailwind 4** — the CSS-first config model meant we could define the 6 brand colors as theme tokens and skip the tailwind.config.js entirely
- **Oxlint** — fast linting, catches unused vars and duplicate props (which we had a few of)
- **Zero animation libraries** — every entrance animation, hover effect, and count-up runs on the Web Animations API or CSS keyframes. We wanted to see how far native browser APIs could go before reaching for Framer Motion. Answer: pretty far. The only thing we'd reach for a library for is drag-and-drop and complex gesture sequences.

No TypeScript. It's a 12-section landing page with 7 data files, not a component library. The overhead wasn't worth it for this scope.

## Live site

[https://evolve-fox4nmku7-harleen.vercel.app](https://evolve-fox4nmku7-harleen.vercel.app)

## Running it

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
npm run lint     # oxlint, 91 rules
npm run preview  # serve the built output
```

## Project layout

```
src/
├── assets/
│   └── icons.jsx          # 11 inline SVG icon components
├── components/
│   ├── ui/
│   │   ├── Button.jsx     # 7 variants, 3 sizes, ripple effect
│   │   ├── Container.jsx  # max-w-7xl wrapper
│   │   └── SectionHeading.jsx
│   ├── Hero.jsx
│   ├── Features.jsx       # BentoGrid + AccordionView, resize persistence
│   ├── FeatureMockup.jsx  # 8 SVG mockup variants per feature type
│   ├── Timeline.jsx
│   ├── HealthScoreGauge.jsx
│   ├── DashboardPreview.jsx
│   ├── ScenarioSimulator.jsx
│   ├── Pricing.jsx
│   ├── Testimonials.jsx
│   ├── FAQ.jsx
│   ├── CTA.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx         # frosted glass, active section highlighting
│   └── Logo.jsx
├── data/
│   ├── features.js        # 8 feature definitions
│   ├── pricing.js         # base prices + regional multipliers + getPrice()
│   ├── testimonials.js    # 3 case studies with metrics
│   ├── timeline.js        # 4 milestones
│   ├── healthScore.js     # 4 health drivers
│   ├── scenario.js        # 3 presets + computeImpact()
│   └── faq.js             # 8 questions
├── hooks/
│   ├── useWaapiAnimation.js  # (keyframes, options, deps) → ref
│   ├── useInView.js          # IntersectionObserver wrapper
│   ├── useMediaQuery.js
│   ├── useReducedMotion.js
│   └── useActiveSection.js   # scroll-based nav highlighting
├── App.jsx
├── index.css             # Tailwind @theme + 30+ keyframe animations + utilities
└── main.jsx
```

Every piece of content — features, pricing tiers, testimonials, timeline milestones, health score drivers, scenario presets, FAQ items — lives in `src/data/` as plain JavaScript arrays and objects. No component has hardcoded content strings (except section headings and button labels). This means changing copy never requires touching a component file.

## Things worth mentioning

**The useWaapiAnimation ref bug.** The hook creates its own internal ref and returns it. But we kept creating a separate ref with `useRef()` and passing it as the first argument — which the hook interpreted as keyframe data. The animation silently failed (the guard clause caught the ref object as a non-element and bailed). This happened in 5 files before we caught it. The fix: `const ref = useWaapiAnimation(keyframes, options, deps)` and use the returned ref on the element.

**SVG gradient ID collisions.** Inline SVGs that use `url(#gradient-id)` break when you render multiple instances of the same component — every instance competes for the same gradient name. We worked around it by keeping gradient defs close to their usage and using unique suffixes, but it's something to watch for if you add more SVGs.

**content-visibility: auto is a trade-off.** Great for initial load performance (the browser skips rendering below-fold sections). But it can delay WAAPI triggers because the element hasn't been laid out when the hook runs. We tuned IntersectionObserver thresholds and added small delays to compensate.

**The pricing matrix looks simple but isn't.** Seven tiers × three currencies × two billing periods × regional multipliers = 42 price points. Everything is computed from a single `getPrice(tier, currencyCode, annual)` function backed by `basePrices` and `regionalMultipliers` objects. The currency and billing toggles force a PriceDisplay re-mount via React key to trigger the spring entrance animation.

**No dark mode.** The teal/yellow/orange palette on powder is the whole identity. A dark variant would shift the teal to something else and the orange would look different against a dark background. We decided the fixed design was worth the simplicity.

**No floating UI library, no Framer Motion, no react-spring, no gsap.** The entire animation budget is covered by CSS keyframes (entrance sequences, hover transitions, loader spinner, chart draw-in, gauge sweep, typing dots) and WAAPI (hero dashboard entrance, timeline node stagger, gauge needle spring, scenario count-up). The only native API we don't use is the View Transition API — it wasn't stable enough when we started.

## What's missing

- Tests. The pricing `getPrice()` function could use unit tests, and the ScenarioSimulator `computeImpact()` too. For a marketing page it felt like over-engineering, but they'd be easy to add with Vitest.
- SSR. It's a Vite SPA. Could add `vite-plugin-ssr` if SEO beyond the meta tags matters more, but the server-rendered meta tags in `index.html` cover the basics.
- A real backend. Every number is static. The dashboard, health score, scenario results, and pricing are all computed from static data files. None of it comes from an API.
