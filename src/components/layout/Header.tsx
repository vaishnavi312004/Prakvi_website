import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Database,
  Layers,
  MapPin,
  Search,
  Users,
} from 'lucide-react';
import { PrakviLogo } from '../common/PrakviLogo';
import { PillNav, PillNavItem } from '../common/PillNav';
import { MegaMenu } from './MegaMenu';
import { ThemeSelector } from './ThemeSelector';
import { ButtonLink } from '../ui/Button';
import { navigationData, SolutionLink } from '../../data/navigationData';

type DesktopMenu = 'who' | 'what' | 'how' | null;
type MobileAccordion = 'who' | 'what-enterprise' | 'what-business' | 'what-products' | 'how' | null;

const dropdownIconMap: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Award,
  MapPin,
  Users,
  Layers,
  Database,
  Briefcase,
  BookOpen,
};

interface SearchItem {
  id: string;
  title: string;
  category: string;
  path: string;
}

export const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<DesktopMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<MobileAccordion>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileAccordion(null);
    setSearchFocused(false);
    setSearchQuery('');
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
        setSearchFocused(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null);
        setMobileOpen(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  const allSearchItems = useMemo<SearchItem[]>(
    () => [
      ...navigationData.whoWeAreLinks.map((i) => ({ id: `who-${i.id}`, title: i.title, category: 'Who We Are', path: i.path })),
      ...navigationData.enterpriseSolutions.map((i) => ({ id: `ent-${i.id}`, title: i.title, category: 'Enterprise Service', path: i.path })),
      ...navigationData.businessSolutions.map((i) => ({ id: `biz-${i.id}`, title: i.title, category: 'Business Service', path: i.path })),
      ...navigationData.products.map((i) => ({ id: `prod-${i.id}`, title: i.title, category: 'Product', path: i.path })),
      ...navigationData.howWeHelpLinks.map((i) => ({ id: `how-${i.id}`, title: i.title, category: 'How We Help', path: i.path })),
    ],
    [],
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allSearchItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .slice(0, 7);
  }, [searchQuery, allSearchItems]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
      setSearchQuery('');
      setSearchFocused(false);
    } else if (searchQuery.trim()) {
      navigate('/services');
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const isWhoActive = pathname === '/about' || pathname === '/contact';
  const isWhatActive =
    pathname === '/services' ||
    pathname.startsWith('/services/') ||
    pathname === '/products' ||
    pathname.startsWith('/products/');
  const isHowActive =
    pathname === '/case-studies' ||
    pathname === '/insights' ||
    pathname.startsWith('/insights/');
  const isCareersActive = pathname === '/careers';

  const activePillHref = isWhoActive
    ? '/about'
    : isWhatActive
    ? '/services'
    : isHowActive
    ? '/case-studies'
    : isCareersActive
    ? '/careers'
    : '/';

  const pillNavItems: PillNavItem[] = [
    {
      label: 'Who We Are',
      href: '/about',
      hasDropdown: true,
      isOpen: activeDropdown === 'who',
      onMouseEnter: () => setActiveDropdown('who'),
      onClick: () => setActiveDropdown((prev) => (prev === 'who' ? null : 'who')),
    },
    {
      label: 'What We Do',
      href: '/services',
      hasDropdown: true,
      isOpen: activeDropdown === 'what',
      onMouseEnter: () => setActiveDropdown('what'),
      onClick: () => setActiveDropdown((prev) => (prev === 'what' ? null : 'what')),
    },
    {
      label: 'How We Help',
      href: '/case-studies',
      hasDropdown: true,
      isOpen: activeDropdown === 'how',
      onMouseEnter: () => setActiveDropdown('how'),
      onClick: () => setActiveDropdown((prev) => (prev === 'how' ? null : 'how')),
    },
    {
      label: 'Careers',
      href: '/careers',
      onMouseEnter: () => setActiveDropdown(null),
    },
  ];

  const renderCompactDropdown = (
    items: SolutionLink[],
    heading: string,
    subtext: string,
    footerLink: { label: string; to: string },
  ) => (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="pointer-events-auto absolute top-full left-0 w-full z-50 px-3 sm:px-6 pt-3"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="w-full max-w-2xl clay-card bg-card/94 backdrop-blur-2xl p-6 shadow-2xl border border-line">
          <div className="pb-3 mb-4 border-b border-line flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-sm font-bold text-foreground tracking-tight">
                {heading}
              </h3>
              <p className="text-xs text-muted mt-0.5">{subtext}</p>
            </div>
            <Link
              to={footerLink.to}
              onClick={() => setActiveDropdown(null)}
              className="text-xs font-semibold text-accent-text hover:text-highlight inline-flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>{footerLink.label}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => {
              const IconComp = dropdownIconMap[item.iconName] || Layers;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveDropdown(null)}
                  className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-surface transition-all"
                >
                  <div className="clay-icon-box w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-105">
                    <IconComp className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-muted leading-snug mt-1">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <header
      ref={headerRef}
      className="site-header fixed inset-x-0 top-3 sm:top-4 z-50 px-3 sm:px-6 text-foreground"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Floating Rounded Light Glassmorphism PillNav Capsule Bar */}
      <PillNav
        logo="/img/prakvi-logo.png"
        logoAlt="Prakvi Techno Solutions Private Limited"
        logoElement={<PrakviLogo size="xs" />}
        items={pillNavItems}
        activeHref={activePillHref}
        itemStyle="pill"
        hoverEffect="fill"
        indicator="dot"
        layout="split"
        surface="glass"
        size="md"
        bounce={0.3}
        stretch={0.5}
        collapse="auto"
        intro
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((prev) => !prev)}
        mobileControls={<ThemeSelector compact />}
        rightSlot={
          <>
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onFocus={() => {
                    setSearchFocused(true);
                    setActiveDropdown(null);
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  placeholder="Search..."
                  aria-label="Search services, products, and company pages"
                  className="!min-h-0 h-9 w-28 xl:w-40 !rounded-full bg-surface/75 pl-8 pr-3 !py-1 text-xs text-foreground placeholder:text-muted/80"
                />
              </form>

              {/* Instant Search Results Popover */}
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full mt-3 w-80 clay-card bg-card/94 backdrop-blur-2xl p-3 shadow-2xl border border-line z-50">
                  <div className="px-2 pb-2 mb-1 border-b border-line flex items-center justify-between text-[11px] font-mono text-muted">
                    <span>Quick Results</span>
                    <span>{searchResults.length} found</span>
                  </div>
                  {searchResults.length === 0 ? (
                    <p className="px-2 py-3 text-xs text-muted">
                      No matching services or pages found for "{searchQuery}".
                    </p>
                  ) : (
                    <ul className="space-y-1 max-h-72 overflow-y-auto">
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={item.path}
                            onClick={() => {
                              setSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs hover:bg-surface transition-colors"
                          >
                            <span className="font-semibold text-foreground truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono text-accent-text shrink-0">
                              {item.category}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <ThemeSelector compact />

            <ButtonLink to="/contact" className="!min-h-0 !h-9 !px-4 !py-1.5 !text-xs">
              <span>Let's Talk</span>
              <ArrowRight className="arrow-shift" aria-hidden="true" />
            </ButtonLink>
          </>
        }
      />

      {/* Desktop Dropdowns: WHO WE ARE & HOW WE HELP */}
      <AnimatePresence>
        {activeDropdown === 'who' &&
          renderCompactDropdown(
            navigationData.whoWeAreLinks,
            'Who We Are',
            'Prakvi Techno Solutions Private Limited — corporate heritage, values, and delivery hubs.',
            { label: 'About Prakvi', to: '/about' },
          )}

        {activeDropdown === 'how' &&
          renderCompactDropdown(
            navigationData.howWeHelpLinks,
            'How We Help',
            'Explore our services, proprietary platforms, client outcomes, and research articles.',
            { label: 'All Services', to: '/services' },
          )}
      </AnimatePresence>

      {/* Desktop MegaMenu: WHAT WE DO (All 13 Enterprise + 4 Business + 4 Products) */}
      <MegaMenu
        isOpen={activeDropdown === 'what'}
        onClose={() => setActiveDropdown(null)}
      />

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          data-lenis-prevent
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="pointer-events-auto lg:hidden mx-auto max-w-[1380px] mt-2.5 max-h-[calc(100dvh-6rem)] overflow-y-auto clay-card bg-card/88 backdrop-blur-2xl px-5 py-5 shadow-2xl border border-line"
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <Search
              className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, products, pages..."
              aria-label="Search site"
              className="!min-h-0 h-10 w-full !rounded-full bg-surface pl-10 pr-4 !py-2 text-xs text-foreground placeholder:text-muted/80"
            />
            {searchQuery.trim().length > 0 && searchResults.length > 0 && (
              <div className="mt-2 rounded-2xl border border-line bg-surface p-2 space-y-1">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => {
                      setMobileOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs hover:bg-card"
                  >
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <span className="text-[10px] font-mono text-accent">{item.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </form>

          <div className="space-y-1">
            {/* WHO WE ARE Accordion */}
            <div className="border-b border-line/70 py-1">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'who' ? null : 'who')}
                aria-expanded={mobileAccordion === 'who'}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-surface"
              >
                <span>Who We Are</span>
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform ${
                    mobileAccordion === 'who' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'who' && (
                <div className="mt-1 mb-2 grid grid-cols-1 gap-1 pl-3">
                  {navigationData.whoWeAreLinks.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* WHAT WE DO: Enterprise Services */}
            <div className="border-b border-line/70 py-1">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'what-enterprise' ? null : 'what-enterprise')
                }
                aria-expanded={mobileAccordion === 'what-enterprise'}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-surface"
              >
                <span>What We Do — Enterprise (13)</span>
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform ${
                    mobileAccordion === 'what-enterprise' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'what-enterprise' && (
                <div className="mt-1 mb-2 grid grid-cols-1 gap-1 pl-3">
                  <Link
                    to="/services"
                    className="rounded-lg px-3 py-2 text-xs font-bold text-accent hover:bg-surface"
                  >
                    All Services Overview →
                  </Link>
                  {navigationData.enterpriseSolutions.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* WHAT WE DO: Business Solutions */}
            <div className="border-b border-line/70 py-1">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'what-business' ? null : 'what-business')
                }
                aria-expanded={mobileAccordion === 'what-business'}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-surface"
              >
                <span>What We Do — Business (4)</span>
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform ${
                    mobileAccordion === 'what-business' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'what-business' && (
                <div className="mt-1 mb-2 grid grid-cols-1 gap-1 pl-3">
                  {navigationData.businessSolutions.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* WHAT WE DO: Products */}
            <div className="border-b border-line/70 py-1">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'what-products' ? null : 'what-products')
                }
                aria-expanded={mobileAccordion === 'what-products'}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-surface"
              >
                <span>What We Do — Products ({navigationData.products.length})</span>
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform ${
                    mobileAccordion === 'what-products' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'what-products' && (
                <div className="mt-1 mb-2 grid grid-cols-1 gap-1 pl-3">
                  <Link
                    to="/products"
                    className="rounded-lg px-3 py-2 text-xs font-bold text-accent hover:bg-surface"
                  >
                    All Products →
                  </Link>
                  {navigationData.products.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* HOW WE HELP Accordion */}
            <div className="border-b border-line/70 py-1">
              <button
                type="button"
                onClick={() => setMobileAccordion(mobileAccordion === 'how' ? null : 'how')}
                aria-expanded={mobileAccordion === 'how'}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-surface"
              >
                <span>How We Help</span>
                <ChevronDown
                  className={`h-4 w-4 text-accent transition-transform ${
                    mobileAccordion === 'how' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'how' && (
                <div className="mt-1 mb-2 grid grid-cols-1 gap-1 pl-3">
                  {navigationData.howWeHelpLinks.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/careers"
              className="block rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-surface hover:text-accent"
            >
              Careers
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-line">
            <ButtonLink to="/contact" className="w-full">
              <span>Let's Talk</span>
              <ArrowRight className="arrow-shift" aria-hidden="true" />
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
};
