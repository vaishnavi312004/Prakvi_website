import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { PrakviLogo } from '../common/PrakviLogo';
import { ButtonLink } from '../ui/Button';
import { navigationData } from '../../data/navigationData';

const groups = [
  { label: 'Who We Are', links: [{ title: 'About Us', path: '/about' }, { title: 'Insights', path: '/insights' }] },
  { label: 'What We Do', links: [{ title: 'All Services', path: '/services' }, ...navigationData.enterpriseSolutions, ...navigationData.businessSolutions, { title: 'Our Products', path: '/products' }, ...navigationData.products] },
  { label: 'How We Help', links: [{ title: 'Case Studies', path: '/case-studies' }, { title: 'Blogs', path: '/insights' }] },
];
const searchableLinks = [
  { title: 'Home', path: '/' }, { title: 'About Us', path: '/about' },
  { title: 'Services', path: '/services' }, { title: 'Products', path: '/products' },
  { title: 'Careers', path: '/careers' }, { title: 'Blogs', path: '/insights' }, { title: 'Case Studies', path: '/case-studies' },
  { title: 'Contact', path: '/contact' }, ...navigationData.enterpriseSolutions,
  ...navigationData.businessSolutions, ...navigationData.products,
];

export const Header: React.FC = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const results = query.trim() ? searchableLinks.filter(item => item.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6) : [];

  useEffect(() => { setOpenGroup(null); setMobileOpen(false); setQuery(''); }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && focused.closest('.header-dropdown')) {
          focused.closest('.header-dropdown-group')?.querySelector<HTMLButtonElement>('button')?.focus();
        }
        setOpenGroup(null); setMobileOpen(false); setQuery(''); }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) { setOpenGroup(null); setQuery(''); setMobileOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, []);

  const search = (mobile = false) => (
    <div className={`relative ${mobile ? 'w-full' : 'w-[180px] shrink-0'}`}>
      <form role="search" onSubmit={event => { event.preventDefault(); }} className="site-search">
        <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        <input aria-label="Search the website" placeholder="Search..." value={query}
          onFocus={() => setOpenGroup(null)} onChange={event => setQuery(event.target.value)}
          className="min-w-0 w-full bg-transparent text-xs text-white outline-none placeholder:text-subtle" />
      </form>
      {query.trim() && <div className="absolute right-0 top-full z-20 mt-2 w-full min-w-[240px] rounded-xl border border-white/15 bg-surface p-2 shadow-xl" aria-live="polite">
        {results.length ? results.map(item => <Link key={item.path} to={item.path} aria-current={pathname === item.path ? 'page' : undefined} onClick={() => setQuery('')} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/10 focus-visible:bg-white/10">{item.title}</Link>) : <p className="px-3 py-2 text-sm text-muted">No matching pages found.</p>}
      </div>}
    </div>
  );

  return (
    <header ref={headerRef} className="site-header fixed inset-x-0 top-0 z-50 text-white" onMouseLeave={() => setOpenGroup(null)}>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-6 xl:px-10">
        <PrakviLogo size="sm" />
        <div className="hidden min-[1200px]:flex items-center gap-5 xl:gap-7">
          <nav aria-label="Primary navigation" className="flex items-center gap-2 xl:gap-4">
            {groups.map((group, index) => <div className="header-dropdown-group relative" key={group.label}
              onMouseLeave={() => setOpenGroup(current => current === group.label ? null : current)}
              onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenGroup(current => current === group.label ? null : current); }}>
              <button data-active={group.links.some(item => item.path !== '/contact' && (pathname === item.path || pathname.startsWith(item.path + '/')))} aria-expanded={openGroup === group.label} aria-controls={`header-group-${index}`} onMouseEnter={() => setOpenGroup(group.label)} onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)} className="flex items-center gap-2 rounded px-2 py-3 text-[13px] font-bold uppercase tracking-[0.025em] text-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-accent">
                {group.label}<ChevronDown className={`h-3 w-3 transition-transform ${openGroup === group.label ? 'rotate-180' : ''}`} />
              </button>
              {openGroup === group.label && <div id={`header-group-${index}`} className="header-dropdown absolute left-0 top-full z-50 w-[260px] rounded-2xl p-2 shadow-xl">
                <div className="px-2 pb-1 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-subtle">Menu</div>
                <div data-lenis-prevent className="header-dropdown-scroll max-h-[min(340px,calc(100dvh-120px))] overflow-y-auto overscroll-contain pr-2">
                {group.links.map(item => <Link key={item.path} to={item.path} aria-current={pathname === item.path ? 'page' : undefined} onClick={() => setOpenGroup(null)} className="header-dropdown-link block rounded-lg px-2 py-1.5 text-[13px] font-semibold leading-snug text-slate-200">{item.title}</Link>)}
                </div>
              </div>}
            </div>)}
            <Link to="/careers" onMouseEnter={() => setOpenGroup(null)} aria-current={pathname === '/careers' ? 'page' : undefined} className="px-2 py-3 text-[13px] font-bold uppercase tracking-[0.025em] text-muted hover:text-white">Careers</Link>
          </nav>
          {search()}
          <ButtonLink to="/contact">Let’s Talk<ArrowRight aria-hidden="true" style={{ width: 12, height: 12 }} /></ButtonLink>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="rounded-lg p-2 text-muted min-[1200px]:hidden focus-visible:outline-2 focus-visible:outline-accent">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      {mobileOpen && <nav data-lenis-prevent id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-canvas px-6 py-5 min-[1200px]:hidden">
        {search(true)}
        {groups.map((group, index) => <div key={group.label} className="border-b border-white/10">
          <button onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)} aria-expanded={openGroup === group.label} aria-controls={`mobile-group-${index}`} className="flex w-full items-center justify-between py-5 text-sm font-bold uppercase text-muted">{group.label}<ChevronDown className={`h-4 w-4 ${openGroup === group.label ? 'rotate-180' : ''}`} /></button>
          {openGroup === group.label && <div data-lenis-prevent id={`mobile-group-${index}`} className="header-dropdown header-dropdown-scroll max-h-[340px] overflow-y-auto rounded-xl p-2 mb-4 space-y-1">{group.links.map(item => <Link key={item.path} to={item.path} aria-current={pathname === item.path ? 'page' : undefined} className="block rounded px-3 py-2 text-sm text-muted hover:bg-white/10">{item.title}</Link>)}</div>}
        </div>)}
        <Link to="/careers" className="block py-5 text-sm font-bold uppercase text-muted">Careers</Link>
        <ButtonLink to="/contact">Let’s Talk<ArrowRight aria-hidden="true" style={{ width: 12, height: 12 }} /></ButtonLink>
      </nav>}
    </header>
  );
};
