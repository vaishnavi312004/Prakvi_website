import React from 'react';
import { Link } from 'react-router-dom';
import { PrakviLogo } from '../common/PrakviLogo';
import { companyData } from '../../data/companyData';
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
    <footer className="bg-[#02060D] text-white border-t border-[#00F0FF]/15 relative overflow-hidden" role="contentinfo">
      {/* Background Tech Watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/4 translate-y-1/4">
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#00F0FF" strokeWidth="4" />
          <circle cx="100" cy="100" r="50" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M40 100H160" stroke="#00F0FF" strokeWidth="2" />
          <path d="M100 40V160" stroke="#00F0FF" strokeWidth="2" />
        </svg>
      </div>

      {/* Subtle top cyan ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Top Grid: Main Corporate Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1 & 2: Brand Identity & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <PrakviLogo variant="light" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Prakvi Techno Solutions Private Limited is a premier corporate technology partner delivering high-impact enterprise solutions, IT consulting, specialized healthcare staffing, unified mobility architectures, and proprietary SaaS platforms.
            </p>

            <div className="pt-2 text-xs text-slate-400 font-mono">
              CIN Registered Enterprise // Global Innovation Hub
            </div>

            {/* Social Links with Cyan Hover */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={companyData.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
                aria-label="Prakvi on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
                aria-label="Prakvi on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
                aria-label="Prakvi on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
                aria-label="Prakvi on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={companyData.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
                aria-label="Prakvi on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Enterprise Services */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-4">
              Enterprise Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/services/staffing" className="hover:text-[#00F0FF] transition-colors">
                  Staffing & Workforce
                </Link>
              </li>
              <li>
                <Link to="/services/mobility-practice" className="hover:text-[#00F0FF] transition-colors">
                  Mobility Practice (BYOD & CYOD)
                </Link>
              </li>
              <li>
                <Link to="/services/cloud-services" className="hover:text-[#00F0FF] transition-colors">
                  Cloud Services & Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/services/business-intelligence" className="hover:text-[#00F0FF] transition-colors">
                  Business Intelligence & Analytics
                </Link>
              </li>
              <li>
                <Link to="/services/supply-chain-management" className="hover:text-[#00F0FF] transition-colors">
                  Supply Chain Management
                </Link>
              </li>
              <li>
                <Link to="/services/system-integration" className="hover:text-[#00F0FF] transition-colors">
                  System Integration & Architecture
                </Link>
              </li>
              <li>
                <Link to="/services/web-design" className="hover:text-[#00F0FF] transition-colors">
                  Web Design & UI/UX
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="hover:text-[#00F0FF] transition-colors">
                  Digital Marketing & Growth
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/services" className="text-[#00F0FF] hover:underline font-semibold flex items-center gap-1">
                  View All 17 Practices →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Products & Careers */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-4">
              Platforms & Careers
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/products/data-analytics" className="hover:text-[#00F0FF] transition-colors">
                  DataPulse Analytics
                </Link>
              </li>
              <li>
                <Link to="/products/hr-management-system" className="hover:text-[#00F0FF] transition-colors">
                  TalentCore HRMS
                </Link>
              </li>
              <li>
                <Link to="/products/vendor-management" className="hover:text-[#00F0FF] transition-colors">
                  NexVendor VMS
                </Link>
              </li>
              <li>
                <Link to="/products/relationship-management" className="hover:text-[#00F0FF] transition-colors">
                  ClientSync CRM
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link to="/careers" className="text-[#38BDF8] hover:text-[#00F0FF] font-semibold flex items-center gap-1">
                  Careers & Job Portal
                  <span className="text-[10px] bg-[#00F0FF]/15 text-[#00F0FF] px-2 py-0.5 rounded-full ml-1 border border-[#00F0FF]/30">We're Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#00F0FF] transition-colors">
                  Insights & Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Headquarters & Contact */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-4">
              Headquarters Hub
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  Mindspace Tech Park Zone, HITEC City, Hyderabad, Telangana 500081, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00F0FF] flex-shrink-0" />
                <a href={`tel:${companyData.contact.phone}`} className="text-xs hover:text-[#00F0FF]">
                  {companyData.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00F0FF] flex-shrink-0" />
                <a href={`mailto:${companyData.contact.primaryEmail}`} className="text-xs hover:text-[#00F0FF]">
                  {companyData.contact.primaryEmail}
                </a>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#02060D] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
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
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#00F0FF] transition-colors focus:outline-none focus:underline"
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
