# Prakvi design system

All routes use the dark enterprise theme in `src/index.css`. Use these shared primitives for new pages instead of adding a separate palette.

## Theme tokens

| Purpose | Tailwind utility | Value |
| --- | --- | --- |
| Main background | `bg-canvas` | `#080D19` |
| Secondary surface | `bg-surface` | `#101827` |
| Raised surface | `bg-raised` | `#162236` |
| Cyan accent | `text-accent` | `#00AEEF` |
| Secondary blue | `text-accent-secondary` | `#087FC1` |
| Highlight | `text-highlight` | `#16B8F3` |
| Primary action | `bg-cta` | `#F47721` |
| Action hover | `bg-cta-hover` | `#FF8A32` |
| Main text | `text-foreground` | `#FFFFFF` |
| Body text | `text-muted` | `#AAB5C5` |
| Muted metadata | `text-subtle` | `#7F8CA3` |
| Borders | `border-line` | white at 12% |

Use `py-section` for responsive section spacing, `rounded-panel` for panels, and `rounded-control` for form controls. Typography inherits Inter and Plus Jakarta Sans from the shared layout.

## Shared components

```tsx
import { Button, ButtonLink } from '../components/ui/Button';
import { Card, Input } from '../components/ui/Card';
import { SectionHeading } from '../components/common/SectionHeading';

<SectionHeading badge="Our capabilities" title="Built for your next chapter" />
<Card interactive className="p-6">
  <h3 className="text-xl font-bold">Enterprise solutions</h3>
  <p className="mt-3">Supporting copy uses the shared body text color.</p>
  <ButtonLink to="/contact" className="mt-6">Talk to our team</ButtonLink>
</Card>
<Input label="Work email" type="email" error={error} />
<Button type="submit">Send inquiry</Button>
<ButtonLink to="/services" variant="secondary">Explore services</ButtonLink>
```

Existing markup can use `btn-primary`, `btn-secondary`, `glass-panel`, `glass-card`, `field`, and `field-label`. Use the same classes on links and buttons to preserve their correct semantics. Orange is reserved for conversion actions; cyan marks links, selected tabs, metrics, and icons.

## Page and interaction rules

- Keep the shared header, logo, footer, body font, and page transitions.
- Use dark surfaces with restrained cyan ambient lighting. Glass is for highlighted panels and cards, not whole pages.
- Keep hero copy white with selected cyan words. Use infrastructure imagery with dark overlays; keep images in `public/img`.
- Keep primary and secondary actions visually distinct. Tabs and filters use a cyan selected state.
- Inputs use dark surfaces, white values, and cyan focus. Associate labels with fields and connect errors with `aria-describedby`.
- Preserve visible keyboard focus and the skip link. Motion honors the user's reduced-motion preference through MotionConfig, CSS, video handling, counters, and the globe.
- Use responsive grids; modal panels must fit and scroll within the viewport. Avoid fixed content widths on mobile.

## Verification

Run `npm.cmd run build` and `npx.cmd tsc --noEmit` on Windows. Inspect Home, About, Services, a service detail, Products, a product detail, Careers, Insights, an insight detail, Contact, and the fallback page at desktop and mobile widths. Check dropdowns, search, filters, tabs, accordions, form errors, and modal states.

The existing contact, demo, and application submission implementations are preserved; this theme update does not introduce backend delivery.

## Light content update

PageTransition applies `theme-light` to all page content: white canvas, off-white secondary sections, white cards, navy headings, and slate body text. The homepage's first hero explicitly uses `theme-dark`. The shared header and footer retain their dark palette. Primary actions remain orange. Use semantic utilities (`text-foreground`, `text-muted`, `bg-canvas`, `bg-surface`, `border-line`) so components adapt to either context; avoid hardcoded white text in content.


## Warm ivory reference

Content from the second homepage section onward and all inner pages now uses the supplied cream-and-gold reference: `#FFFDF8` ivory canvas, `#FFF6E3` cream surfaces, `#F9EBCF` pale-gold raised surfaces, soft gold borders and ambient light, and white cards. Alternate sections retain white breathing room. Keep navy text, the original blue brand accents, and orange conversion buttons. The first landing hero, header, and footer keep their dark styling.


## Scroll and motion

`SmoothScroll` owns one Lenis instance and destroys it on unmount. Wheel scrolling uses `lerp: 0.085`; touch remains native. Reduced-motion preferences are respected live. Anchor links use a 96px header offset, route changes reset pending inertia, and the footer uses the same scroll instance. Put `data-lenis-prevent` on nested scrolling panels and dialogs. Do not add CSS `scroll-behavior: smooth` alongside Lenis. Section divider borders and decorative grid lines are removed; input and card outlines remain for usability. Page transitions use opacity rather than translating the entire page, and service card springs use gentler damping.


## Continuous content surface

Light page content uses one uninterrupted ivory canvas (`#FFFDF8`). Sections inherit it through transparent backgrounds; do not alternate white/cream sections or restart gradients at their boundaries. Keep background contrast inside cards, forms, and media panels. The landing hero and shared header/footer retain their established branding.


## Homepage globe journey

The homepage has a single globe canvas rendered through a body portal. HeroVisual retains a layout anchor and eases the globe from that anchor into a small, noninteractive right-side companion as the user scrolls. The scroll position also drives globe rotation. HeroScene blends the sphere material from dark cyan to soft blue on ivory content; cards fade as the globe contracts, and the companion fades before the footer. Its fixed layer stays below navigation and modals and never captures pointer input. Reduced-motion users see the globe only in its original hero position. Animation frames and ResizeObserver are cleaned up on route unmount.


## Site-wide winding globe path

GlobeJourney now owns the single canvas globally, across all routes. HeroVisual supplies only the homepage anchor (and a static globe for reduced motion). The scroll path moves across the full viewport, alternating right, center, and left over roughly two viewport heights per crossing; its height and scale vary gently. It reverses naturally when scrolling upward. Route and layout observers recalculate the journey after page transitions; the globe stays noninteractive and fades near the footer. This replaces the previous right-side-only companion.
