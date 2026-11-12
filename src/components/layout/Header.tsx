import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { PrakviLogo } from '../common/PrakviLogo';
import { MegaMenu } from './MegaMenu';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const location = useLocation();

  // Track window scroll to transition header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle keyboard escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordion(mobileAccordion === section ? null : section);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3.5 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-lg ${
      isActive
        ? 'text-[#00F0FF] font-semibold drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]'
        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
    }`;

  const headerBgClass = isScrolled
    ? 'bg-[#02060D]/90 border-b border-[#00F0FF]/20 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
    : 'bg-[#02060D]/70 border-b border-white/[0.08] backdrop-blur-md';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Brand Logo */}
          <div className="flex-shrink-0">
            <PrakviLogo variant="light" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-1"
            aria-label="Primary Navigation"
          >
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Home</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>About Us</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            {/* Services with MegaMenu dropdown trigger (Reference Image 2 Inspired) */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-lg ${
                  location.pathname.startsWith('/services') || isMegaMenuOpen
                    ? 'text-[#00F0FF] font-semibold drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180 text-[#00F0FF]' : 'text-slate-400'
                  }`}
                />
              </button>
              {location.pathname.startsWith('/services') && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF] pointer-events-none" />
              )}
            </div>

            <NavLink to="/products" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Products</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/careers" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Careers</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/insights" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Insights</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Contact</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          {/* Header Action Button (Desktop: Glowing Cyan Accent matching Reference 2 "Get Started" / "Let's Talk") */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#02060D] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] shadow-[0_0_12px_rgba(0,240,255,0.35)] transition-all"
            >
              Get Started
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#00F0FF]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Services Mega Menu Overlay */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Mobile Drawer Navigation (Accessible Accordion) in Deep Obsidian Navy */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#02060D]/98 border-t border-[#00F0FF]/20 backdrop-blur-2xl overflow-y-auto px-6 py-6 text-white space-y-4">
          <NavLink
            to="/"
            end
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00F0FF]"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00F0FF]"
          >
            About Us
          </NavLink>

          {/* Services Mobile Accordion */}
          <div className="border-b border-white/10 py-2">
            <button
              onClick={() => toggleMobileAccordion('services')}
              className="w-full flex items-center justify-between text-base font-semibold py-1 hover:text-[#00F0FF] focus:outline-none"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === 'services' ? 'rotate-180 text-[#00F0FF]' : ''
                }`}
              />
            </button>

            {mobileAccordion === 'services' && (
              <div className="mt-3 pl-3 space-y-4 border-l-2 border-[#00F0FF]/40 text-sm text-slate-300">
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-semibold text-[#00F0FF] py-1"
                >
                  All Services Overview →
                </Link>

                {/* Enterprise Solutions Section */}
                <div className="pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-bold mb-1.5">
                    Enterprise Solutions
                  </div>
                  <div className="space-y-1.5 pl-1.5">
                    <Link to="/services/staffing" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Staffing</Link>
                    <Link to="/services/mobility-practice" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Mobility Practice (BYOD & CYOD)</Link>
                    <Link to="/services/business-intelligence" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Business Intelligence</Link>
                    <Link to="/services/supply-chain-management" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Supply Chain Management</Link>
                    <Link to="/services/workforce-solution" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Workforce Solution</Link>
                    <Link to="/services/system-integration" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">System Integration</Link>
                    <Link to="/services/cloud-services" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Cloud Services</Link>
                    <Link to="/services/business-analytics" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Business Analytics</Link>
                    <Link to="/services/infrastructure-management" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Infrastructure Management</Link>
                    <Link to="/services/accounting" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Accounting</Link>
                    <Link to="/services/enterprise-architecture" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Enterprise Architecture</Link>
                    <Link to="/services/it-consulting" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">IT Consulting</Link>
                    <Link to="/services/project-management" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Project Management</Link>
                  </div>
                </div>

                {/* Business Solutions Section */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] font-bold mb-1.5">
                    Business Solutions
                  </div>
                  <div className="space-y-1.5 pl-1.5">
                    <Link to="/services/web-design" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Web Design</Link>
                    <Link to="/services/enterprise-solution" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Enterprise Solution</Link>
                    <Link to="/services/digital-marketing" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Digital Marketing</Link>
                    <Link to="/services/mobile-app-development" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#00F0FF] py-0.5 text-xs">Mobile App Development</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Mobile Accordion */}
          <div className="border-b border-white/10 py-2">
            <button
              onClick={() => toggleMobileAccordion('products')}
              className="w-full flex items-center justify-between text-base font-semibold py-1 hover:text-[#00F0FF] focus:outline-none"
            >
              <span>Products</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === 'products' ? 'rotate-180 text-[#00F0FF]' : ''
                }`}
              />
            </button>

            {mobileAccordion === 'products' && (
              <div className="mt-3 pl-3 space-y-2.5 border-l-2 border-[#00F0FF]/40 text-sm text-slate-300">
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-semibold text-[#00F0FF] py-1"
                >
                  All Products Overview →
                </Link>
                <Link
                  to="/products/data-analytics"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-[#00F0FF] py-1"
                >
                  DataPulse Analytics
                </Link>
                <Link
                  to="/products/hr-management-system"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-[#00F0FF] py-1"
                >
                  TalentCore HRMS
                </Link>
                <Link
                  to="/products/vendor-management"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-[#00F0FF] py-1"
                >
                  NexVendor VMS
                </Link>
                <Link
                  to="/products/relationship-management"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-[#00F0FF] py-1"
                >
                  ClientSync CRM
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00F0FF]"
          >
            Careers & Job Portal
          </NavLink>

          <NavLink
            to="/insights"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00F0FF]"
          >
            Insights & Thought Leadership
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00F0FF]"
          >
            Contact & Office Hubs
          </NavLink>

          <div className="pt-6">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#009EDB] text-[#02060D] font-bold text-center shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Start an Enterprise Consultation</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
