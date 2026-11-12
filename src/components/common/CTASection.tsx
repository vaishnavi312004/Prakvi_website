import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Let's Build Your Next Digital Advantage.",
  subtitle = "Whether modernizing mission-critical legacy architectures, scaling specialized workforce pods, or deploying cognitive analytics, our enterprise architects are ready to collaborate.",
  primaryButtonText = 'Start a Conversation',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Explore Enterprise Services',
  secondaryButtonLink = '/services',
}) => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-[#071D3A] via-[#0B2952] to-[#009EDB] text-white overflow-hidden border-t border-[#00D4EA]/25 shadow-2xl">
      {/* Subtle Grid */}
      <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />

      {/* Radiant Cyan Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-[#00D4EA]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-white">
            Enterprise Strategic Consultation
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto text-balance">
          {title}
        </h2>

        <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed text-balance font-light">
          {subtitle}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-[#071D3A] bg-white hover:bg-[#DDF4FF] shadow-xl hover:shadow-2xl transition-all transform active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#071D3A]" />
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4 text-[#071D3A]" />
          </Link>

          <Link
            to={secondaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-white/10 border border-white/25 hover:bg-white/20 transition-colors"
          >
            <span>{secondaryButtonText}</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-200 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#00D4EA] font-bold">✓</span> SLA-Backed Deployments
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D4EA] font-bold">✓</span> ISO & HIPAA Compliant Frameworks
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D4EA] font-bold">✓</span> Rapid 24-Hour Discovery Response
          </div>
        </div>
      </div>
    </section>
  );
};
