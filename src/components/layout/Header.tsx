import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import { PrakviLogo } from '../common/PrakviLogo';
import { PillNav, PillNavItem } from '../common/PillNav';
import { MegaMenu } from './MegaMenu';
import { NavigationTree } from './NavigationTree';
import { ThemeSelector } from './ThemeSelector';
import { ButtonLink } from '../ui/Button';
import {
  navigationData,
  navigationTrees,
  NavSectionKey,
} from '../../data/navigationData';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  path: string;
}

const sectionOrder: NavSectionKey[] = ['who', 'what', 'how', 'careers'];

export const Header: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [activeDropdown, setActiveDropdown] = useState<NavSectionKey | null>(null);
  const [focusFirstNode, setFocusFirstNode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<NavSectionKey | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setFocusFirstNode(false);
    setMobileOpen(false);
    setMobileSection(null);
    setSearchFocused(false);
    setSearchQuery('');
  }, [pathname, search, hash]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeDropdown) {
          const triggerId = `nav-trigger-${activeDropdown}`;
          setActiveDropdown(null);
          setFocusFirstNode(false);
          document.getElementById(triggerId)?.focus();
        }
        setMobileOpen(false);
        setSearchFocused(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null);
        setFocusFirstNode(false);
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
  }, [activeDropdown]);

  const allSearchItems = useMemo<SearchItem[]>(
    () => [
      ...navigationData.whoWeAreLinks.map((i) => ({
        id: `who-${i.id}`,
        title: i.title,
        category: 'Who We Are',
        path: i.path,
      })),
      ...navigationData.enterpriseSolutions.map((i) => ({
        id: `ent-${i.id}`,
        title: i.title,
        category: 'Enterprise Service',
        path: i.path,
      })),
      ...navigationData.businessSolutions.map((i) => ({
        id: `biz-${i.id}`,
        title: i.title,
        category: 'Business Service',
        path: i.path,
      })),
      ...navigationData.products.map((i) => ({
        id: `prod-${i.id}`,
        title: i.title,
        category: 'Product',
        path: i.path,
      })),
      ...navigationData.howWeHelpLinks.map((i) => ({
        id: `how-${i.id}`,
        title: i.title,
        category: 'How We Help',
        path: i.path,
      })),
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

  const closeDropdownAndReturnFocus = (sectionKey: NavSectionKey) => {
    setActiveDropdown(null);
    setFocusFirstNode(false);
    requestAnimationFrame(() => {
      document.getElementById(`nav-trigger-${sectionKey}`)?.focus();
    });
  };

  const renderTreeDropdown = (sectionKey: NavSectionKey) => {
    const section = navigationTrees[sectionKey];
    const isOpen = activeDropdown === sectionKey;

    if (sectionKey === 'what') {
      return <MegaMenu isOpen={isOpen} onClose={() => setActiveDropdown(null)} />;
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`dropdown-${sectionKey}`}
            initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6, scale: 0.96 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 440, damping: 32, mass: 0.8 }
            }
            onPointerDown={(e) => e.stopPropagation()}
            className="pointer-events-auto absolute left-0 top-full z-50 pt-3 w-[min(410px,calc(100vw-2rem))] origin-top-left"
          >
            <div
              data-lenis-prevent
              role="region"
              aria-label={`${section.label} navigation tree`}
              className="clay-card bg-card/92 backdrop-blur-2xl border border-line rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[55vh]"
            >
              <div className="px-3.5 py-2.5 border-b border-line flex items-center justify-between gap-3 shrink-0 bg-surface/45">
                <span className="font-display text-xs font-bold tracking-tight text-foreground">
                  {section.label}
                </span>
                <span className="font-mono text-[10px] font-medium text-muted">
                  Expand to explore
                </span>
              </div>

              <div
                data-lenis-prevent
                className="overflow-y-auto overscroll-contain p-2.5"
              >
                <NavigationTree
                  key={sectionKey}
                  nodes={section.nodes}
                  treeLabel={section.label}
                  variant="dropdown"
                  autoFocusFirst={focusFirstNode}
                  onNavigate={() => {
                    setActiveDropdown(null);
                    setFocusFirstNode(false);
                  }}
                  onEscape={() => closeDropdownAndReturnFocus(sectionKey)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const pillNavItems: PillNavItem[] = sectionOrder.map((key) => {
    const section = navigationTrees[key];
    const isOpen = activeDropdown === key;

    return {
      label: section.label,
      href: section.href,
      hasDropdown: true,
      isOpen,
      buttonId: `nav-trigger-${key}`,
      onClick: () => {
        setSearchFocused(false);
        setFocusFirstNode(false);
        setActiveDropdown((prev) => (prev === key ? null : key));
      },
      onKeyDown: (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSearchFocused(false);
          setFocusFirstNode(true);
          setActiveDropdown(key);
        } else if (e.key === 'Escape' && isOpen) {
          e.preventDefault();
          setActiveDropdown(null);
          setFocusFirstNode(false);
        }
      },
      dropdown: renderTreeDropdown(key),
    };
  });

  return (
    <header
      ref={headerRef}
      className={`site-header fixed inset-x-0 z-50 px-3 sm:px-6 text-foreground transition-[top] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled ? 'top-2 sm:top-2.5' : 'top-3 sm:top-4'
      }`}
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
        scrolled={scrolled}
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
                    setFocusFirstNode(false);
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
              <AnimatePresence>
                {searchFocused && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -6, scale: 0.96 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 440, damping: 32 }
                    }
                    className="absolute right-0 top-full mt-3 w-80 origin-top-right clay-card bg-card/94 backdrop-blur-2xl p-3 shadow-2xl border border-line z-50"
                  >
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
                              className="flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs hover:bg-surface active:scale-[0.985] transition-all"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeSelector compact />

            <ButtonLink to="/contact" className="!min-h-0 !h-9 !px-4 !py-1.5 !text-xs">
              <span>Let's Talk</span>
              <ArrowRight className="arrow-shift" aria-hidden="true" />
            </ButtonLink>
          </>
        }
      />

      {/* Mobile & Portrait Tablet Nested Tree Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={reducedMotion ? false : { opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 380, damping: 30 }
            }
            data-lenis-prevent
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="pointer-events-auto lg:hidden mx-auto max-w-[1380px] mt-2.5 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain origin-top clay-card bg-card/94 backdrop-blur-2xl px-4 py-4 shadow-2xl border border-line"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
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
                      <span className="text-[10px] font-mono text-accent-text">{item.category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            {/* Hierarchical Accordion Tree for All 4 Main Navigation Sections */}
            <div className="divide-y divide-line/70">
              {sectionOrder.map((key) => {
                const section = navigationTrees[key];
                const isExpanded = mobileSection === key;

                return (
                  <div key={key} className="py-1">
                    <button
                      type="button"
                      onClick={() => setMobileSection(isExpanded ? null : key)}
                      aria-expanded={isExpanded}
                      className={`flex w-full min-h-[44px] items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isExpanded
                          ? 'bg-soft-blue/70 text-accent-text'
                          : 'text-foreground hover:bg-surface'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isExpanded && (
                          <span
                            aria-hidden="true"
                            className="h-3.5 w-0.5 shrink-0 rounded-full bg-orange"
                          />
                        )}
                        <span className="font-display text-xs font-bold uppercase tracking-wider">
                          {section.label}
                        </span>
                      </span>

                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90 text-orange' : 'text-accent-text'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden pl-2 pt-1 pb-2"
                        >
                          <NavigationTree
                            key={`mobile-${key}`}
                            nodes={section.nodes}
                            treeLabel={section.label}
                            variant="drawer"
                            onNavigate={() => setMobileOpen(false)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-line">
              <ButtonLink to="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
                <span>Let's Talk</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
