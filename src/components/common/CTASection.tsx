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
    <section className="relative py-24 bg-gradient-to-b from-[#040E1E] via-[#071D3A] to-[#02060D] text-white overflow-hidden border-t border-[#00F0FF]/15">
      {/* Subtle Cyber Grid */}
      <div className="absolute inset-0 tech-grid-dark opacity-40 pointer-events-none" />

      {/* Radiant Cyan Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-[#00F0FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#009EDB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="text-xs font-mono font-semibold tracking-widest uppercase text-[#00F0FF] mb-4">
          Enterprise Strategic Consultation
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto text-balance">
          {title}
        </h2>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          {subtitle}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#02060D]" />
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4 text-[#02060D]" />
          </Link>

          <Link
            to={secondaryButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] hover:border-[#00F0FF]/40 transition-colors"
          >
            <span>{secondaryButtonText}</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#00F0FF] font-bold">✓</span> SLA-Backed Deployments
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00F0FF] font-bold">✓</span> ISO & HIPAA Compliant Frameworks
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00F0FF] font-bold">✓</span> Rapid 48-Hour Discovery Response
          </div>
        </div>
      </div>
    </section>
  );
};
