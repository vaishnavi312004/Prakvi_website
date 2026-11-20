# Prakvi Techno Solutions — Corporate Website Redesign

Premier corporate digital presence for **Prakvi Techno Solutions Private Limited** (prakvi.com), engineered with the visual fidelity, architectural depth, and interaction quality of leading global IT enterprises.

---

## 1. Technology Architecture

- **Framework**: React 19 with TypeScript
- **Bundler & Tooling**: Vite with full client-side routing (`react-router-dom`)
- **Styling**: Tailwind CSS v4 design tokens (`@theme`) with Plus Jakarta Sans & Inter typography
- **3D Graphics**: Three.js WebGL procedural enterprise matrix with ACESFilmic tone mapping, PBR Studio reflections, and zero-404 procedural textures
- **Icons**: Lucide React vector icons
- **Audio/Video Config**: Reusable `HeroVideo` component with central configuration (`/src/config/videos.ts`) and zero-layout-shift fallbacks

---

## 2. Local Setup & Build

### Development Server
```bash
npm install
npm run dev
```
The application runs on `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

### Type Checking & Linting
```bash
npm run lint
```

### PHP and MySQL Contact Form Backend

The contact form saves inquiries through a PHP API into MySQL. Install PHP 8.4+ and MySQL 8.4+, then:

1. Create a local `.env` file from `.env.example` and set `DB_PASSWORD`, `TURNSTILE_SECRET_KEY`, and `SMTP_PASSWORD`. `VITE_TURNSTILE_SITE_KEY` is public and is used by the contact form; SMTP and Turnstile secret keys stay server-side.
2. In MySQL, run `database/schema.sql` to create the database and contact table. Create a `prakvi_app` user and grant it access to `prakvi_website`. If you created the table using the earlier schema, run `database/migrations/2026-11-20-remove-unused-service-field.sql` once to align it with the visible form.
3. In one terminal, start the PHP API with `npm run serve:php`.
4. In another terminal, start the site with `npm run dev`. Vite forwards `/api` requests to the PHP server.

The API is available at `POST /api/contact`. It verifies Turnstile server-side, inserts the inquiry using a prepared statement, and sends an SMTP notification. For production, provide the same private environment variables to PHP and `VITE_TURNSTILE_SITE_KEY` to the frontend build, then serve the PHP API and React site behind the same HTTPS domain and route `/api/contact` to `backend/public/api/contact.php`.

---

## 3. Brand Identity & Design System

- **Deep Navy**: `#071D3A` (Primary corporate background)
- **Primary Blue**: `#009EDB` (Action buttons, brand accents)
- **Light Blue / Cyan**: `#48C4F7` (Highlights, telemetry beacons, glowing accents)
- **Ice White**: `#F4F8FC` (Section backgrounds)
- **Slate Navy**: `#0B2952` (Secondary panels)
- **Typography**: Headings: *Plus Jakarta Sans* | Body: *Inter* | Code/Stats: *JetBrains Mono*

---

## 4. Key Page Routes & Scope

1. **Homepage (`/`)**:
   - Cinematic hero with dual-mode toggle between **Three.js 3D Enterprise Matrix** and **Cinematic Background Video**
   - Editorial company introduction with typography hierarchy
   - Interactive core expertise showcase (Enterprise Solutions, Staffing, Mobility, Cloud, AI, Consulting)
   - Full-width navy technology and innovation showcase
   - Split-screen "Why Prakvi" value proposition
   - Business impact statistics section with verified reference metrics
   - Proprietary enterprise software suites showcase
   - Executive insights and research articles
   - Careers culture preview and high-impact CTA

2. **About Us (`/about`)**:
   - Institutional positioning hero
   - Editorial company story and founding purpose
   - Side-by-side Mission & Vision presentation
   - Core enterprise values (Innovation, Integrity, Excellence, Collaboration, Passion, Sustainability)
   - Engineering culture pillars
   - Structured practice leadership profiles (provisional placeholders)
   - 15-year company journey milestone timeline
   - Governance & verification statement

3. **Services Hub (`/services`) & Dynamic Detail Pages (`/services/:slug`)**:
   - Categorized practice tracks (Enterprise Solutions & Digital Engineering)
   - **Staffing & Workforce Solutions**: Preserves Healthcare Staffing, IT consulting, permanent hiring, executive search, and the 5-step recruitment process timeline (Client Needs Analysis → Sourcing → Shortlisting → Offer → Ongoing Support).
   - **Enterprise Mobility Practice**: Preserves BYOD, CYOD, Endpoint Security, and interactive tabs for BYOD, CYOD, Security, and Tools.
   - Cloud & Infrastructure, AI & Data Analytics, System Integration, Digital Engineering, and IT Consulting detail templates.

4. **Products Hub (`/products`) & Detail Pages (`/products/:slug`)**:
   - **DataPulse Analytics Platform**: Real-time business intelligence and anomaly detection
   - **TalentCore HRMS**: End-to-end workforce lifecycle and multi-country payroll
   - **NexVendor VMS**: Third-party procurement and contingent labor governance
   - **ClientSync CRM**: High-velocity B2B sales pipeline orchestration
   - Interactive simulated demo booking modal

5. **Careers & Job Portal (`/careers`)**:
   - Employee benefits, sponsored certifications, and global mobility culture
   - 5-stage transparent recruitment process
   - Live interactive job portal with search, department, location, and employment type filters
   - Role specifications modal
   - Complete candidate application modal with resume upload UI, client-side validation, and simulated confirmation states

6. **Insights & Research Hub (`/insights`) & Article View (`/insights/:slug`)**:
   - Thought leadership briefings across AI, Cloud, Cybersecurity, and Workforce Strategy
   - Category filtering and search
   - Reading mode with table of contents, author attribution, and social sharing links

7. **Contact Us (`/contact`)**:
   - Global delivery centers (Hyderabad Innovation HQ, Bengaluru Hub, North America Desk)
   - Complete interactive enterprise RFP inquiry form with strict field validation, privacy consent, and simulated submission feedback

---

## 5. Assets to Replace for Production

When deploying to live production domain at `prakvi.com`:

1. **Hero Video**: Place actual high-resolution corporate video asset at `/public/videos/hero.mp4` (or update CDN URL in `/src/config/videos.ts`).
2. **Leadership Bios**: Replace provisional executive council placeholders in `/src/data/companyData.ts` with verified director photographs and official bios upon corporate board clearance.
3. **Company Registration**: Update formal CIN registration numbers and GST credentials in `/src/data/companyData.ts`.

---

## 6. Future Backend Integration Points

The application architecture has clean data separation to make future backend integrations seamless:

1. **Job Application API**: Connect `CareersPage.tsx` application modal to an ATS (e.g. Greenhouse, Lever, or custom backend endpoint `/api/careers/apply`).
2. **Contact Form API**: Connect `ContactPage.tsx` form handler to your corporate email service or CRM webhook (`/api/contact`).
3. **Product Demo Booking**: Connect `ProductsPage.tsx` demo modal to your sales CRM or Calendly / HubSpot scheduling API.
4. **Content Management System (CMS)**: Replace static JSON arrays in `/src/data/insightsData.ts` and `/src/data/servicesData.ts` with API calls to a headless CMS (Strapi, Sanity, or Contentful).
