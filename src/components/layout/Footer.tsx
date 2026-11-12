import React from 'react';
import { Link } from 'react-router-dom';
import { PrakviLogo } from '../common/PrakviLogo';
import { companyData } from '../../data/companyData';
import { navigationData } from '../../data/navigationData';
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Github,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030F1E] text-white border-t border-[#009EDB]/25 relative overflow-hidden" role="contentinfo">
      {/* Background Tech Watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/4 translate-y-1/4">
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#00D4EA" strokeWidth="4" />
          <circle cx="100" cy="100" r="50" stroke="#009EDB" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M40 100H160" stroke="#00D4EA" strokeWidth="2" />
          <path d="M100 40V160" stroke="#00D4EA" strokeWidth="2" />
        </svg>
      </div>

      {/* Subtle top cyan ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D4EA]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Top Grid: Main Corporate Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1 & 2: Brand Identity & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <PrakviLogo variant="light" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-light">
              Prakvi Techno Solutions Private Limited is a premier corporate technology partner delivering high-impact enterprise solutions, IT consulting, specialized healthcare staffing, unified mobility architectures, and proprietary SaaS platforms.
            </p>

            <div className="pt-2 text-xs text-slate-400 font-mono">
              CIN Registered Enterprise • Global Innovation Hub
            </div>

            {/* Social Links with Cyan Hover */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={companyData.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00D4EA] hover:border-[#00D4EA]/50 hover:shadow-[0_0_12px_rgba(0,212,234,0.3)] transition-all"
                aria-label="Prakvi on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00D4EA] hover:border-[#00D4EA]/50 hover:shadow-[0_0_12px_rgba(0,212,234,0.3)] transition-all"
                aria-label="Prakvi on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00D4EA] hover:border-[#00D4EA]/50 hover:shadow-[0_0_12px_rgba(0,212,234,0.3)] transition-all"
                aria-label="Prakvi on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00D4EA] hover:border-[#00D4EA]/50 hover:shadow-[0_0_12px_rgba(0,212,234,0.3)] transition-all"
                aria-label="Prakvi on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00D4EA] hover:border-[#00D4EA]/50 hover:shadow-[0_0_12px_rgba(0,212,234,0.3)] transition-all"
                aria-label="Prakvi on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Enterprise Services */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D4EA] mb-4">
              Enterprise Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300 font-light">
              {navigationData.enterpriseSolutions.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="hover:text-[#00D4EA] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/services" className="text-[#00D4EA] hover:underline font-semibold flex items-center gap-1 font-mono text-xs">
                  View All 17 Practices →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platforms & Careers */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D4EA] mb-4">
              Platforms & Careers
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300 font-light">
              {navigationData.products.map((p) => (
                <li key={p.id}>
                  <Link to={p.path} className="hover:text-[#00D4EA] transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <Link to="/careers" className="text-[#38BDF8] hover:text-[#00D4EA] font-semibold flex items-center gap-1">
                  Careers & Job Portal
                  <span className="text-[10px] bg-[#00D4EA]/15 text-[#00D4EA] px-2 py-0.5 rounded-full ml-1 border border-[#00D4EA]/30">We're Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#00D4EA] transition-colors">
                  Insights & Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Headquarters & Contact */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D4EA] mb-4">
              Headquarters Hub
            </h3>
            <div className="space-y-3 text-sm text-slate-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D4EA] flex-shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  Mindspace Tech Park Zone, HITEC City, Hyderabad, Telangana 500081, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00D4EA] flex-shrink-0" />
                <a href={`tel:${companyData.contact.phone}`} className="text-xs hover:text-[#00D4EA]">
                  {companyData.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D4EA] flex-shrink-0" />
                <a href={`mailto:${companyData.contact.primaryEmail}`} className="text-xs hover:text-[#00D4EA]">
                  {companyData.contact.primaryEmail}
                </a>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-[#00D4EA]/30 text-[#00D4EA] hover:bg-[#00D4EA] hover:text-[#030F1E] hover:shadow-[0_0_15px_rgba(0,212,234,0.4)] transition-all"
                >
                  View All Regional Hubs →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Prakvi Techno Solutions Private Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#00D4EA] transition-colors focus:outline-none focus:underline"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
