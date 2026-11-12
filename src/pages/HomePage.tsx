import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { HeroScene } from '../components/3d/HeroScene';
import { companyData } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { productsData } from '../data/productsData';
import { insightsData } from '../data/insightsData';
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Server,
  Smartphone,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Interactive core expertise active tab
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  // Active product showcase tab
  const [activeProductId, setActiveProductId] = useState(productsData[0].id);
  const activeProduct = productsData.find((p) => p.id === activeProductId) || productsData[0];

  return (
    <PageTransition>
      <div className="bg-[#02060D] text-slate-100 overflow-x-hidden">
        {/* =========================================================================
            SECTION 1: CINEMATIC ENTERPRISE HERO WITH 3D GLOWING DIGITAL GLOBE
           ========================================================================= */}
        <section className="relative w-full min-h-[96vh] flex items-center justify-center bg-[#02060D] text-white overflow-hidden">
          {/* 3D Glowing Digital Network Globe Canvas (Inspiration from Ref Image 1) */}
          <HeroScene />

          {/* Measured Radiant Ambient Scrims & Atmospheric Glow */}
          <div className="absolute inset-0 bg-radial-cyan opacity-80 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#02060D] via-[#02060D]/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#02060D] via-[#02060D]/70 to-transparent pointer-events-none" />

          {/* Foreground Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              {/* Refined Corporate Kicker with Radiant Cyan */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Enterprise Technology & Workforce Solutions
                </span>
              </div>

              {/* Exact Hero Headline from Brief with Glowing Cyan Accent */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white text-balance">
                Engineering Tomorrow's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-[#38BDF8] drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                  Digital Enterprise.
                </span>
              </h1>

              {/* Exact Supporting Text from Brief */}
              <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance font-light">
                Empowering businesses through intelligent technology, enterprise solutions, and digital innovation.
              </p>

              {/* Primary Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all transform active:scale-95"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-[#02060D]" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-[#00F0FF]/50 transition-all backdrop-blur-sm"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* Quiet Proof Badges (Zero-Pill discipline) */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400 font-mono">
                <span>15+ Years Enterprise Footprint</span>
                <span className="text-[#00F0FF]/40">•</span>
                <span>17 Specialized Practices</span>
                <span className="text-[#00F0FF]/40">•</span>
                <span>Tier-1 Global Hubs</span>
                <span className="text-[#00F0FF]/40">•</span>
                <span>99.98% SLA Delivery</span>
              </div>
            </motion.div>
          </div>

          {/* Clean Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center text-slate-400 text-xs font-medium">
            <span className="tracking-widest uppercase text-[10px] mb-1 font-mono text-slate-500">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 text-[#00F0FF] animate-bounce" />
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: COMPANY INTRODUCTION (Seamless Dark Corporate Canvas)
           ========================================================================= */}
        <section className="py-24 relative bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] border-t border-white/[0.06]">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Who We Are
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
                  Architecting resilient technology platforms for market leaders worldwide.
                </h2>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                    <span>CIN Registered Private Limited</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                    <span>Global Delivery Centers</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5 lg:pl-8 lg:border-l lg:border-white/10">
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  Founded with a mission to bridge complex technology domains with measurable business value, Prakvi operates as an agile enterprise catalyst. From full-scale cloud migrations and specialized healthcare staffing to cognitive AI integrations and proprietary workforce software, we build systems designed to perform at global enterprise scale.
                </p>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#00F0FF] hover:text-[#7DD3FC] group transition-colors"
                  >
                    <span>Learn more about our journey</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: CORE EXPERTISE (Dark Glassmorphism Showcase with Seamless Flow)
           ========================================================================= */}
        <section className="py-24 relative bg-[#07192F] border-t border-white/[0.06]">
          {/* Cyan Glow Accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <SectionHeading
                badge="Domain Capabilities"
                title="Tailored Solutions Engineered for High-Stakes Operations"
                description="Explore our specialized practices designed to modernize infrastructure, accelerate hiring, and drive digital execution."
                theme="dark"
              />
              <Link
                to="/services"
                className="mt-6 md:mt-0 text-sm font-bold text-[#00F0FF] hover:text-[#7DD3FC] flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View all 17 practices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Interactive Showcase: Segmented Filter Tabs + Asymmetric Split Preview */}
            <div className="bg-[#040E1E]/80 rounded-3xl border border-[#00F0FF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
              {/* Clean Segmented Practice Tabs */}
              <div className="flex overflow-x-auto border-b border-white/10 scrollbar-none bg-black/25 p-2 gap-1.5">
                {servicesData.slice(0, 8).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeServiceId === service.id
                        ? 'bg-[#00F0FF] text-[#02060D] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono font-semibold text-[#00F0FF]">
                    {activeService.badge || 'Enterprise Practice'}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    {activeService.title}
                  </h3>

                  <p className="text-base text-slate-300 leading-relaxed font-light">
                    {activeService.fullDesc}
                  </p>

                  {/* Key Practice Capabilities */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
                      Core Deliverables
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.capabilities.slice(0, 4).map((cap, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-white">{cap.title}</div>
                            <div className="text-slate-400 line-clamp-1 mt-0.5">{cap.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/services/${activeService.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all"
                    >
                      <span>Explore {activeService.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-slate-300 hover:text-[#00F0FF] transition-colors"
                    >
                      Consult with practice lead →
                    </Link>
                  </div>
                </div>

                {/* Right Media Preview (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    <img
                      src={activeService.featuredImage}
                      alt={activeService.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-[#02060D]/40 to-transparent" />
                    
                    <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#02060D]/85 border border-[#00F0FF]/30 text-white backdrop-blur-md">
                      <div className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider mb-0.5">
                        Verified Benchmark
                      </div>
                      <div className="text-xl font-bold font-display text-white">
                        {activeService.businessBenefits[0]?.metric || 'Enterprise Ready'}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
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
            SECTION 4: WHY PRAKVI (The Prakvi Distinction on Deep Obsidian Navy)
           ========================================================================= */}
        <section className="py-24 relative bg-gradient-to-b from-[#07192F] via-[#040E1E] to-[#02060D] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <SectionHeading
                  badge="The Prakvi Distinction"
                  title="Why Global Enterprises Partner With Prakvi"
                  description="We combine direct architect-level engagement, transparent SLAs, and high-velocity engineering outcomes without bureaucratic agency overhead."
                  theme="dark"
                />

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-[#00F0FF]/40 transition-all"
                  >
                    <span>Explore our culture & governance</span>
                    <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 6 Core Pillars (7 cols) in Premium Dark Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#040E1E]/80 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group">
                  <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1.5 group-hover:drop-shadow-[0_0_8px_#00F0FF]">Technical Expertise</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Practicing senior architects and certified cloud engineers evaluate every technical blueprint before implementation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#040E1E]/80 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group">
                  <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1.5 group-hover:drop-shadow-[0_0_8px_#00F0FF]">Client-Focused Delivery</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Transparent governance, shared Slack/Teams channels, and bi-weekly milestone reviews ensure total strategic alignment.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#040E1E]/80 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group">
                  <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1.5 group-hover:drop-shadow-[0_0_8px_#00F0FF]">Scalable Solutions</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Microservice systems and staffing models that seamlessly expand from initial prototypes to global enterprise scale.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#040E1E]/80 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group">
                  <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1.5 group-hover:drop-shadow-[0_0_8px_#00F0FF]">Business Understanding</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Technology is mapped directly to operational P&L, customer retention, and quantifiable EBITDA margins.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#040E1E]/80 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group">
                  <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1.5 group-hover:drop-shadow-[0_0_8px_#00F0FF]">Security & Reliability</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Enterprise-grade encryption, zero-trust role-based access, and audited compliance built natively into every pipeline.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#040E1E]/80 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all group">
                  <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1.5 group-hover:drop-shadow-[0_0_8px_#00F0FF]">Continuous Innovation</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Active R&D pipelines bringing modern GenAI, cloud FinOps, and mobile endpoint innovations to our clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: TECHNOLOGY AND INNOVATION ARCHITECTURE
           ========================================================================= */}
        <section className="py-24 relative overflow-hidden bg-[#02060D] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              badge="Innovation Architecture"
              title="Technology That Moves Business Forward."
              description="Our engineering foundation combines battle-tested cloud backbones, intelligent automation, and rigorous governance to give enterprises durable velocity."
              theme="dark"
              align="center"
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-7 rounded-2xl bg-[#040E1E]/90 border border-[#00F0FF]/15 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Cloud Orchestration
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Multi-region auto-scaling Kubernetes fabrics with zero-trust network segregation and sub-second failover.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#040E1E]/90 border border-[#00F0FF]/15 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Distributed Mobility
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Hardware-backed BYOD/CYOD containerization protecting sensitive corporate IP across any endpoint device.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#040E1E]/90 border border-[#00F0FF]/15 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Cognitive Intelligence
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Private VPC Retrieval-Augmented Generation (RAG) and predictive models trained exclusively on enterprise context.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#040E1E]/90 border border-[#00F0FF]/15 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Governed Security
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Automated continuous posture management compliant with SOC 2, HIPAA, ISO 27001, and GDPR mandates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: BUSINESS IMPACT (Large Minimalist Typography with Cyan Glow)
           ========================================================================= */}
        <section className="py-20 relative border-t border-b border-[#00F0FF]/15 bg-gradient-to-r from-[#02060D] via-[#07192F] to-[#02060D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {companyData.verifiedImpactMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#00F0FF] tracking-tight tabular-nums drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    {metric.value}
                    <span className="text-[#38BDF8]">{metric.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-white pt-1">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-light">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center text-[11px] text-slate-500 font-mono mt-10">
              *Verified client engagements and performance benchmarks (provisional company audit)
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: PROPRIETARY PLATFORMS (Enterprise Software Suites)
           ========================================================================= */}
        <section className="py-24 relative bg-[#02060D]">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#009EDB]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              badge="Proprietary Platforms"
              title="Enterprise Software Suites"
              description="Explore our modular, purpose-built SaaS suites designed to optimize business intelligence, human capital, supplier relationships, and client pipelines."
              theme="dark"
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
                      ? 'bg-[#00F0FF] text-[#02060D] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  {prod.name.split(' ')[1] || prod.name}
                </button>
              ))}
            </div>

            {/* Active Product Detailed Card */}
            <div className="mt-10 bg-[#040E1E]/90 rounded-3xl border border-[#00F0FF]/20 p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono font-semibold text-[#00F0FF]">
                    {activeProduct.badge || 'Proprietary IP'}
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                    {activeProduct.name}
                  </h3>

                  <p className="text-sm font-medium text-[#00F0FF]">
                    {activeProduct.tagline}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {activeProduct.fullDesc}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 pt-2">
                    {activeProduct.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03]">
                        <span className="text-[#00F0FF] font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/products/${activeProduct.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all"
                    >
                      <span>View Platform Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-slate-300 hover:text-[#00F0FF] transition-colors"
                    >
                      Request live demo →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/80 via-transparent to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {activeProduct.stats.slice(0, 2).map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#02060D]/90 border border-[#00F0FF]/20 text-center">
                        <div className="text-xl font-bold font-display text-[#00F0FF]">{st.value}</div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: INSIGHTS & THOUGHT LEADERSHIP (Dark Editorial Cards)
           ========================================================================= */}
        <section className="py-24 relative bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <SectionHeading
                badge="Thought Leadership"
                title="Insights From Our Practice Leaders"
                description="Research, architectural strategies, and executive perspectives on digital modernization and workforce transformation."
                theme="dark"
              />
              <Link
                to="/insights"
                className="mt-4 sm:mt-0 text-sm font-bold text-[#00F0FF] hover:text-[#7DD3FC] flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insightsData.slice(0, 3).map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-[#040E1E]/90 rounded-3xl border border-white/10 hover:border-[#00F0FF]/40 overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#02060D]/85 border border-[#00F0FF]/30 text-[11px] font-mono font-semibold text-[#00F0FF] backdrop-blur-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2">
                        <Link to={`/insights/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-light">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {article.author.name}
                      </span>
                      <Link
                        to={`/insights/${article.slug}`}
                        className="text-xs font-bold text-[#00F0FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
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
           ========================================================================= */}
        <section className="py-24 relative bg-[#07192F] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Join Our Collective
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
                  Build What's Next With Us.
                </h2>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  At Prakvi, we nurture autonomous problem solvers, cloud architects, and talent leaders. We provide fully funded certifications, high-impact enterprise projects, and an open, collaborative engineering culture.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/careers"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all"
                  >
                    <span>Explore Open Positions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/[0.06] border border-white/15 hover:border-[#00F0FF]/40 transition-colors"
                  >
                    <span>Our Culture & Values</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src="/src/assets/images/careers_culture_team_1794479543837.jpg"
                    alt="Prakvi Collaborative Culture"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
