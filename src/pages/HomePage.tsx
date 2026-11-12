import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { HeroVisual } from '../components/common/HeroVisual';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { homeData } from '../data/homeData';
import { statsData } from '../data/statsData';
import { servicesData } from '../data/servicesData';
import { productsData } from '../data/productsData';
import { insightsData } from '../data/insightsData';
import {
  ArrowRight,
  CheckCircle2,
  Server,
  Smartphone,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Active service practice tab in capabilities showcase
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  // Active product showcase tab
  const [activeProductId, setActiveProductId] = useState(productsData[0].id);
  const activeProduct = productsData.find((p) => p.id === activeProductId) || productsData[0];

  const pillarIconMap: Record<string, React.FC<{ className?: string }>> = {
    Server,
    Smartphone,
    Sparkles,
    ShieldCheck,
  };

  return (
    <PageTransition>
      <div className="overflow-x-hidden selection:bg-[#009EDB] selection:text-white">
        {/* =========================================================================
            SECTION 1: HERO (SPLIT-SCREEN 55% / 45% — FIX OVERLAPPING)
            Theme: Deep Navy (#071D3A) with subtle Cyan (#00D4EA) glow & Corporate Blue
           ========================================================================= */}
        <section className="relative w-full min-h-[92vh] flex items-center bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white pt-28 pb-20 overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-radial-cyan opacity-60 pointer-events-none" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#009EDB]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#00D4EA]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column (55% on desktop: lg:col-span-7) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6 text-left"
              >
                {/* Enterprise Technology Label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
                    {homeData.hero.badge}
                  </span>
                </div>

                {/* Large Bold Headline */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white text-balance">
                  {homeData.hero.headlinePrefix}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D4EA] to-[#38BDF8] drop-shadow-[0_0_25px_rgba(0,212,234,0.4)]">
                    {homeData.hero.headlineHighlight}
                  </span>
                </h1>

                {/* Short Supporting Description */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl leading-relaxed font-light text-balance">
                  {homeData.hero.description}
                </p>

                {/* Two CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    to={homeData.hero.primaryCta.path}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-[#071D3A] bg-gradient-to-r from-[#00D4EA] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00D4EA] shadow-[0_0_25px_rgba(0,212,234,0.35)] hover:shadow-[0_0_35px_rgba(0,212,234,0.55)] transition-all transform active:scale-95 text-center"
                  >
                    <span>{homeData.hero.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#071D3A]" />
                  </Link>

                  <Link
                    to={homeData.hero.secondaryCta.path}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#00D4EA]/50 transition-all backdrop-blur-sm text-center"
                  >
                    <span>{homeData.hero.secondaryCta.label}</span>
                  </Link>
                </div>

                {/* Small Trust Indicators Underneath (Zero Overlap) */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-mono">
                  {homeData.hero.trustBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4EA]" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column (45% on desktop: lg:col-span-5) — Hero Visual Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 w-full flex justify-center"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>

          {/* Smooth Bottom Blend Transition into Introduction */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#DDF4FF]/40 pointer-events-none" />
        </section>

        {/* =========================================================================
            SECTION 2: COMPANY INTRODUCTION (Soft Blue Gradient Introduction)
            Theme: Soft Sky Blue (#DDF4FF to #F0F8FF to #FFFFFF) with Crisp Dark Navy Text
           ========================================================================= */}
        <section className="py-24 relative bg-gradient-to-b from-[#DDF4FF]/40 via-[#F0F8FF] to-white text-[#172B45] border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#009EDB]">
                  {homeData.intro.kicker}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071D3A] tracking-tight leading-tight text-balance">
                  {homeData.intro.title}
                </h2>
                <div className="flex flex-wrap gap-4 pt-2">
                  {homeData.intro.proofPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#071D3A] bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-[#009EDB]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-5 space-y-5 lg:pl-8 lg:border-l lg:border-slate-300/70"
              >
                {homeData.intro.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-base sm:text-lg text-[#57708E] leading-relaxed font-normal">
                    {para}
                  </p>
                ))}

                <div className="pt-2">
                  <Link
                    to={homeData.intro.ctaPath}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#009EDB] hover:text-[#071D3A] group transition-colors"
                  >
                    <span>{homeData.intro.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: WHITE / LIGHT SERVICES (17 Domain Capabilities)
            Theme: Pure White (#FFFFFF) with Light Blue Gradient & White Cards
           ========================================================================= */}
        <section className="py-24 relative bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <SectionHeading
                badge="Domain Capabilities"
                title="Tailored Solutions Engineered for High-Stakes Operations"
                description="Explore our specialized practices designed to modernize infrastructure, accelerate hiring, and drive digital execution."
                theme="light"
              />
              <Link
                to="/services"
                className="mt-6 md:mt-0 text-sm font-bold text-[#009EDB] hover:text-[#071D3A] flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View all 17 practices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Interactive Showcase: Segmented Practice Tabs + Asymmetric Split Preview */}
            <div className="bg-gradient-to-br from-white to-[#F4F8FC] rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Clean Segmented Practice Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-200/80 bg-slate-50/80 p-2.5 gap-2 scrollbar-none">
                {servicesData.slice(0, 8).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeServiceId === service.id
                        ? 'bg-[#071D3A] text-white shadow-md'
                        : 'text-slate-600 hover:text-[#071D3A] hover:bg-white'
                    }`}
                  >
                    {service.title.split('&')[0].trim()}
                  </button>
                ))}
              </div>

              {/* Active Practice Split Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                {/* Left Content Area (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF4FF] border border-[#009EDB]/30 text-xs font-mono font-semibold text-[#009EDB]">
                    {activeService.badge || 'Enterprise Practice'}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#071D3A]">
                    {activeService.title}
                  </h3>

                  <p className="text-base text-[#57708E] leading-relaxed">
                    {activeService.fullDesc}
                  </p>

                  {/* Core Deliverables in White Cards with Soft Shadow */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB]">
                      Core Deliverables
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.capabilities.slice(0, 4).map((cap, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-slate-800 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#009EDB] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-[#071D3A]">{cap.title}</div>
                            <div className="text-slate-500 line-clamp-1 mt-0.5">{cap.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/services/${activeService.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                    >
                      <span>Explore {activeService.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-[#009EDB] hover:text-[#071D3A] transition-colors"
                    >
                      Consult with practice lead →
                    </Link>
                  </div>
                </div>

                {/* Right Media Preview (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                    <img
                      src={activeService.featuredImage}
                      alt={activeService.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/90 via-[#071D3A]/30 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 border border-slate-200 text-[#071D3A] backdrop-blur-md shadow-lg">
                      <div className="text-[11px] font-mono text-[#009EDB] uppercase tracking-wider mb-0.5 font-bold">
                        Verified Benchmark
                      </div>
                      <div className="text-xl font-bold font-display text-[#071D3A]">
                        {activeService.businessBenefits[0]?.metric || 'Enterprise Ready'}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {activeService.businessBenefits[0]?.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: BLUE GRADIENT TECHNOLOGY SHOWCASE
            Theme: Deep Navy to Blue Gradient (#071D3A via #0B2952 to #071D3A)
           ========================================================================= */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white">
          <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-96 bg-[#00D4EA]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              badge={homeData.technologyShowcase.kicker}
              title={homeData.technologyShowcase.title}
              description={homeData.technologyShowcase.description}
              theme="dark"
              align="center"
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeData.technologyShowcase.pillars.map((pillar) => {
                const IconComp = pillarIconMap[pillar.iconName] || Server;
                return (
                  <motion.div
                    key={pillar.id}
                    whileHover={{ y: -6 }}
                    className="p-7 rounded-2xl bg-[#071D3A]/90 border border-[#00D4EA]/25 hover:border-[#00D4EA] hover:shadow-[0_0_30px_rgba(0,212,234,0.25)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#00D4EA]/10 border border-[#00D4EA]/30 flex items-center justify-center text-[#00D4EA] mb-5 shadow-[0_0_15px_rgba(0,212,234,0.3)]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#00D4EA] font-semibold">
                      {pillar.accentText}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: OFF-WHITE ABOUT / WHY PRAKVI (6 Core Pillars)
            Theme: Off-White (#F7FAFC) with White Cards & Light Blue Accents
           ========================================================================= */}
        <section className="py-24 relative bg-[#F7FAFC] text-[#172B45] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <SectionHeading
                  badge={homeData.whyPrakvi.kicker}
                  title={homeData.whyPrakvi.title}
                  description={homeData.whyPrakvi.description}
                  theme="light"
                />

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#071D3A] hover:bg-[#009EDB] transition-all shadow-md"
                  >
                    <span>Explore our culture & governance</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 6 Pillars in Premium White Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {homeData.whyPrakvi.pillars.map((pillar) => (
                  <motion.div
                    key={pillar.id}
                    whileHover={{ y: -4 }}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#009EDB]/40 hover:shadow-lg transition-all group"
                  >
                    <div className="text-xs font-mono font-bold text-[#009EDB] mb-1.5">
                      {pillar.title}
                    </div>
                    <p className="text-xs text-[#57708E] leading-relaxed">
                      {pillar.description}
                    </p>
                    <div className="mt-3 text-[11px] font-mono font-semibold text-slate-400 group-hover:text-[#071D3A] transition-colors">
                      {pillar.metric}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: DARK NAVY FEATURED SECTION (Verified Impact Metrics)
            Theme: Deep Navy (#071D3A) with Cyan Glowing Numbers & Animated Counters
           ========================================================================= */}
        <section className="py-20 relative bg-[#071D3A] text-white border-t border-b border-[#009EDB]/25">
          <div className="absolute inset-0 tech-grid-dark opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {statsData.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#00D4EA] tracking-tight tabular-nums drop-shadow-[0_0_20px_rgba(0,212,234,0.4)]">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-sm font-bold text-white pt-1">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed font-light">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center text-[11px] text-slate-400 font-mono mt-10">
              {statsData.auditDisclaimer}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: PROPRIETARY PLATFORMS (Enterprise Software Suites)
            Theme: Off-White / Soft Light Background (#FFFFFF to #F7FAFC)
           ========================================================================= */}
        <section className="py-24 relative bg-gradient-to-b from-[#F7FAFC] to-white text-[#172B45] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              badge="Proprietary Platforms"
              title="Enterprise Software Suites"
              description="Explore our modular, purpose-built SaaS suites designed to optimize business intelligence, human capital, supplier relationships, and client pipelines."
              theme="light"
              align="center"
            />

            {/* Product Selector Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {productsData.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveProductId(prod.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeProductId === prod.id
                      ? 'bg-[#071D3A] text-white font-bold shadow-md'
                      : 'bg-white text-slate-600 hover:text-[#071D3A] hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {prod.name.split(' ')[1] || prod.name}
                </button>
              ))}
            </div>

            {/* Active Product Detailed Card */}
            <div className="mt-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF4FF] border border-[#009EDB]/30 text-xs font-mono font-semibold text-[#009EDB]">
                    {activeProduct.badge || 'Proprietary IP'}
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071D3A]">
                    {activeProduct.name}
                  </h3>

                  <p className="text-sm font-medium text-[#009EDB]">
                    {activeProduct.tagline}
                  </p>

                  <p className="text-sm text-[#57708E] leading-relaxed">
                    {activeProduct.fullDesc}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 pt-2">
                    {activeProduct.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                        <span className="text-[#009EDB] font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/products/${activeProduct.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                    >
                      <span>View Platform Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-[#009EDB] hover:text-[#071D3A] transition-colors"
                    >
                      Request live demo →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/60 via-transparent to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {activeProduct.stats.slice(0, 2).map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-xl font-bold font-display text-[#071D3A]">{st.value}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: LIGHT CAREERS & BLOGS / INSIGHTS
            Theme: Off-White (#F7FAFC) & Pure White Cards
           ========================================================================= */}
        <section className="py-24 relative bg-[#F7FAFC] text-[#172B45] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <SectionHeading
                badge="Thought Leadership"
                title="Insights From Our Practice Leaders"
                description="Research, architectural strategies, and executive perspectives on digital modernization and workforce transformation."
                theme="light"
              />
              <Link
                to="/insights"
                className="mt-4 sm:mt-0 text-sm font-bold text-[#009EDB] hover:text-[#071D3A] flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insightsData.slice(0, 3).map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200 hover:border-[#009EDB]/40 overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[11px] font-mono font-semibold text-[#071D3A] backdrop-blur-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#071D3A] group-hover:text-[#009EDB] transition-colors line-clamp-2">
                        <Link to={`/insights/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#57708E] line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {article.author.name}
                      </span>
                      <Link
                        to={`/insights/${article.slug}`}
                        className="text-xs font-bold text-[#009EDB] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: CAREERS & CULTURE PREVIEW
            Theme: Soft Sky Blue Gradient (#DDF4FF/50 to #FFFFFF)
           ========================================================================= */}
        <section className="py-24 relative bg-gradient-to-r from-[#DDF4FF]/50 via-white to-[#DDF4FF]/30 text-[#172B45] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#009EDB]">
                  {homeData.careersPreview.kicker}
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071D3A] tracking-tight leading-tight text-balance">
                  {homeData.careersPreview.title}
                </h2>

                <p className="text-base sm:text-lg text-[#57708E] leading-relaxed">
                  {homeData.careersPreview.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to={homeData.careersPreview.primaryCta.path}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                  >
                    <span>{homeData.careersPreview.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={homeData.careersPreview.secondaryCta.path}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#071D3A] bg-white border border-slate-300 hover:border-[#009EDB] shadow-sm transition-colors"
                  >
                    <span>{homeData.careersPreview.secondaryCta.label}</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src={homeData.careersPreview.image}
                    alt="Prakvi Collaborative Culture"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/70 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: PREMIUM GRADIENT CTA & DARK FOOTER
           ========================================================================= */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
