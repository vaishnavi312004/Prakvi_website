# Prakvi corporate website

Standalone React + TypeScript website, separate from the HRMS applications. Vite, React Router, Tailwind CSS, Lucide, Motion, and Lenis power the frontend.

The homepage opens with a dark navy, blue-accented animated network scene. All lower sections and internal pages use white and pale-blue surfaces. Services use rounded light cards.

## Run locally

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The `dist` folder is the deployable static website. The host must fall back to `index.html` for application routes (excluding missing asset requests).

## Content and architecture

- `src/data.ts`: editable company contacts, service content, products, demo articles, jobs, and imagery.
- `src/components.tsx`: shared navigation, footer, video/poster component, reveals, counters, FAQs, product concept interface, and buttons.
- `src/pages`: lazy-loaded page groups, with service/product/article/job detail routes.
- `src/styles.css`: navy/cyan visual system, responsive layouts, and reduced-motion rules.
- `src/light-theme.css`: current white/pale-blue theme, light routed pages, cards, and dark hero overrides.
- `src/HeroScene.tsx`: rotating network sphere and flowing particle ribbons; pauses offscreen and when the tab is hidden, honors reduced motion, and includes a user pause control.
- `src/scroll.tsx`: one Lenis instance shared across routes, smooth wheel/anchor scrolling, native touch scrolling, menu scroll locking, route resets, and reduced-motion support.
- `public/assets/network-globe.png`: supplied theme reference used as hero poster.

## Routes

Home `/`, company `/about`, solutions `/services` and `/services/:slug`, products `/products` and `/products/:slug`, careers `/careers`, sample listings `/careers/jobs`, role details `/careers/jobs/:slug`, application `/careers/jobs/:slug/apply`, insights `/insights` and `/insights/:slug`, contact `/contact`, privacy `/privacy`, terms `/terms`, and a wildcard 404.

## Frontend-only behavior

Enquiry and application forms validate locally and show explicit simulated confirmations. There is no backend, email service, upload endpoint, analytics, or persistent form storage. Resume selection is local and limited to PDF/DOC/DOCX files up to 5 MB. Use sample data when testing.

Demo jobs and articles, proposed culture/values, legal drafts, and product concepts are labeled. Replace these with company-approved information before a public launch. Contact details are provisional from https://prakvi.com/.

Workplace imagery loads from Unsplash; fonts load from Google Fonts. For fully self-hosted production assets, supply licensed local images/fonts and update the references. The Prakvi wordmark is a typographic treatment pending the official brand asset.

The reusable `Film` component supports a video `src` and a static `poster`. Home, company, solution, and careers imagery currently use posters. Supply approved video assets through that component to enable playback and pause controls. It respects reduced-motion preferences.

## Before public launch

Confirm service/product claims and contacts; replace demo roles/articles and draft policies; supply the official logo, approved culture/leadership/milestone content, and videos; connect forms only after the backend and data-handling requirements are approved. No invented client logos, testimonials, certifications, or achievements are included.
