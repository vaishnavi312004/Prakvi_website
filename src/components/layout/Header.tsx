import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { PrakviLogo } from '../common/PrakviLogo';
import { MegaMenu } from './MegaMenu';
import { navigationData } from '../../data/navigationData';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
    `relative px-3.5 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4EA] rounded-lg ${
      isActive
        ? 'text-[#00D4EA] font-semibold drop-shadow-[0_0_8px_rgba(0,212,234,0.4)]'
        : 'text-slate-200 hover:text-white hover:bg-white/[0.06]'
    }`;

  const headerBgClass = isScrolled
    ? 'bg-[#071D3A]/92 border-b border-[#009EDB]/25 backdrop-blur-xl shadow-[0_10px_35px_rgba(3,15,30,0.6)]'
    : 'bg-[#071D3A]/80 border-b border-white/10 backdrop-blur-md';

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

          {/* Desktop Navigation Links (Dynamic from navigationData) */}
          <nav
            className="hidden lg:flex items-center space-x-1"
            aria-label="Primary Navigation"
          >
            {navigationData.mainNav.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <button
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4EA] rounded-lg ${
                        location.pathname.startsWith('/services') || isMegaMenuOpen
                          ? 'text-[#00D4EA] font-semibold drop-shadow-[0_0_8px_rgba(0,212,234,0.4)]'
                          : 'text-slate-200 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isMegaMenuOpen ? 'rotate-180 text-[#00D4EA]' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {location.pathname.startsWith('/services') && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00D4EA] rounded-full shadow-[0_0_8px_#00D4EA] pointer-events-none" />
                    )}
                  </div>
                );
              }

              return (
                <NavLink key={item.path} to={item.path} end={item.path === '/'} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00D4EA] rounded-full shadow-[0_0_8px_#00D4EA]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Header Action Button (Desktop: Glowing Cyan / Corporate Blue) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={navigationData.headerCta.path}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#071D3A] bg-gradient-to-r from-[#00D4EA] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00D4EA] shadow-[0_0_20px_rgba(0,212,234,0.35)] hover:shadow-[0_0_28px_rgba(0,212,234,0.55)] transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{navigationData.headerCta.label}</span>
              <ArrowRight className="w-4 h-4 text-[#071D3A] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              to={navigationData.headerCta.path}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#071D3A] bg-gradient-to-r from-[#00D4EA] to-[#009EDB] shadow-sm transition-all"
            >
              {navigationData.headerCta.label}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4EA]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#00D4EA]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Services Mega Menu Overlay */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Mobile Drawer Navigation (Accessible Accordion) in Deep Corporate Navy */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#071D3A]/98 border-t border-[#009EDB]/25 backdrop-blur-2xl overflow-y-auto px-6 py-6 text-white space-y-4">
          <NavLink
            to="/"
            end
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00D4EA]"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00D4EA]"
          >
            About Us
          </NavLink>

          {/* Services Mobile Accordion */}
          <div className="border-b border-white/10 py-2">
            <button
              onClick={() => toggleMobileAccordion('services')}
              className="w-full flex items-center justify-between text-base font-semibold py-1 hover:text-[#00D4EA] focus:outline-none"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === 'services' ? 'rotate-180 text-[#00D4EA]' : ''
                }`}
              />
            </button>

            {mobileAccordion === 'services' && (
              <div className="mt-3 pl-3 space-y-4 border-l-2 border-[#00D4EA]/40 text-sm text-slate-300">
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-semibold text-[#00D4EA] py-1"
                >
                  All Services Overview →
                </Link>

                {/* Enterprise Solutions Section */}
                <div className="pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00D4EA] font-bold mb-1.5">
                    Enterprise Solutions ({navigationData.enterpriseSolutions.length})
                  </div>
                  <div className="space-y-1.5 pl-1.5">
                    {navigationData.enterpriseSolutions.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block hover:text-[#00D4EA] py-0.5 text-xs text-slate-200"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Business Solutions Section */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00D4EA] font-bold mb-1.5">
                    Business Solutions ({navigationData.businessSolutions.length})
                  </div>
                  <div className="space-y-1.5 pl-1.5">
                    {navigationData.businessSolutions.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block hover:text-[#00D4EA] py-0.5 text-xs text-slate-200"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Mobile Accordion */}
          <div className="border-b border-white/10 py-2">
            <button
              onClick={() => toggleMobileAccordion('products')}
              className="w-full flex items-center justify-between text-base font-semibold py-1 hover:text-[#00D4EA] focus:outline-none"
            >
              <span>Products</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === 'products' ? 'rotate-180 text-[#00D4EA]' : ''
                }`}
              />
            </button>

            {mobileAccordion === 'products' && (
              <div className="mt-3 pl-3 space-y-2 border-l-2 border-[#00D4EA]/40 text-sm text-slate-300">
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-semibold text-[#00D4EA] py-1"
                >
                  All Products Overview →
                </Link>
                {navigationData.products.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:text-[#00D4EA] py-0.5 text-xs text-slate-200"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00D4EA]"
          >
            Careers & Job Portal
          </NavLink>

          <NavLink
            to="/insights"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00D4EA]"
          >
            Insights & Thought Leadership
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold border-b border-white/10 hover:text-[#00D4EA]"
          >
            Contact & Office Hubs
          </NavLink>

          <div className="pt-6">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00D4EA] to-[#009EDB] text-[#071D3A] font-bold text-center shadow-[0_0_15px_rgba(0,212,234,0.35)] transition-all"
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
