import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';

export interface PillNavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  logoElement?: React.ReactNode;
  items: PillNavItem[];
  activeHref?: string;
  itemStyle?: 'pill' | 'underline';
  hoverEffect?: 'fill' | 'subtle';
  indicator?: 'dot' | 'line' | 'none';
  layout?: 'split' | 'center';
  surface?: 'glass' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  bounce?: number;
  stretch?: number;
  collapse?: 'auto' | 'always' | 'never';
  intro?: boolean;
  rightSlot?: React.ReactNode;
  mobileControls?: React.ReactNode;
  mobileOpen?: boolean;
  onToggleMobile?: () => void;
  className?: string;
}

export const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Prakvi Techno Solutions',
  logoElement,
  items,
  activeHref = '/',
  itemStyle = 'pill',
  hoverEffect = 'fill',
  indicator = 'dot',
  layout = 'split',
  surface = 'glass',
  size = 'md',
  bounce = 0.3,
  stretch = 0.5,
  collapse = 'auto',
  intro = true,
  rightSlot,
  mobileControls,
  mobileOpen = false,
  onToggleMobile,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const springTransition = {
    type: 'spring' as const,
    bounce: reducedMotion ? 0 : bounce,
    duration: reducedMotion ? 0 : 0.45,
  };

  const sizeHeight = size === 'sm' ? 'h-14' : size === 'lg' ? 'h-18' : 'h-16';
  const surfaceClass =
    surface === 'glass'
      ? 'site-header-pill'
      : 'pointer-events-auto rounded-full border border-line bg-card shadow-lg';

  const navVisibility =
    collapse === 'never'
      ? 'flex'
      : collapse === 'always'
      ? 'hidden'
      : 'hidden lg:flex';

  const mobileVisibility =
    collapse === 'never'
      ? 'hidden'
      : collapse === 'always'
      ? 'flex'
      : 'flex lg:hidden';

  return (
    <motion.div
      initial={
        intro && !reducedMotion
          ? { opacity: 0, y: -12, scale: 0.985 }
          : false
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', bounce: bounce * 0.85, duration: 0.55 }}
      className={`${surfaceClass} mx-auto flex ${sizeHeight} max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 ${className}`}
    >
      {/* LEFT ZONE: Exact Original Logo Placement + PillNav Navigation */}
      <div
        className={`flex items-center min-w-0 ${
          layout === 'split' ? 'gap-4 xl:gap-6' : 'gap-6'
        }`}
      >
        {logoElement ? (
          logoElement
        ) : logo ? (
          <Link to="/" className="inline-flex shrink-0">
            <img src={logo} alt={logoAlt} className="h-9 w-auto object-contain" />
          </Link>
        ) : null}

        <nav
          aria-label="Primary navigation"
          onMouseLeave={() => setHoveredHref(null)}
          className={`${navVisibility} items-center gap-1 xl:gap-1.5`}
        >
          {items.map((item) => {
            const isActive = activeHref === item.href || item.isOpen;
            const isHovered = hoveredHref === item.href;
            const showFill =
              hoverEffect === 'fill' &&
              (isHovered || (!hoveredHref && isActive));

            const innerContent = (
              <>
                {showFill && (
                  <motion.span
                    layoutId="pill-nav-active-fill"
                    transition={springTransition}
                    initial={false}
                    animate={{
                      scaleX: isHovered ? 1 + stretch * 0.06 : 1,
                    }}
                    className={`absolute inset-0 -z-10 ${
                      itemStyle === 'pill' ? 'rounded-full' : 'rounded-lg'
                    } ${
                      isActive
                        ? 'bg-soft-accent border border-accent/25 shadow-sm'
                        : 'bg-surface border border-line/70'
                    }`}
                    aria-hidden="true"
                  />
                )}

                <span className="relative z-10">{item.label}</span>

                {item.hasDropdown && (
                  <ChevronDown
                    className={`relative z-10 h-3.5 w-3.5 transition-transform duration-200 ${
                      item.isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                )}

                {indicator === 'dot' && isActive && (
                  <motion.span
                    layoutId="pill-nav-active-dot"
                    transition={springTransition}
                    className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orange"
                    aria-hidden="true"
                  />
                )}
              </>
            );

            const itemClass = `relative z-10 inline-flex items-center gap-1 px-3 xl:px-3.5 py-2 ${
              itemStyle === 'pill' ? 'rounded-full' : 'rounded-lg'
            } text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors ${
              isActive || isHovered
                ? 'text-accent-text'
                : 'text-foreground'
            }`;

            if (item.hasDropdown) {
              return (
                <button
                  key={item.href}
                  type="button"
                  onMouseEnter={() => {
                    setHoveredHref(item.href);
                    item.onMouseEnter?.();
                  }}
                  onClick={item.onClick}
                  aria-expanded={item.isOpen}
                  aria-haspopup="true"
                  data-active={isActive}
                  className={itemClass}
                >
                  {innerContent}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={activeHref === item.href ? 'page' : undefined}
                onMouseEnter={() => {
                  setHoveredHref(item.href);
                  item.onMouseEnter?.();
                }}
                className={itemClass}
              >
                {innerContent}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT ZONE (Desktop) */}
      {rightSlot && (
        <div className={`${navVisibility} items-center gap-2 xl:gap-2.5 shrink-0`}>
          {rightSlot}
        </div>
      )}

      {/* MOBILE CONTROLS */}
      {onToggleMobile && (
        <div className={`${mobileVisibility} items-center gap-2`}>
          {mobileControls}
          <button
            type="button"
            onClick={onToggleMobile}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-foreground shadow-sm hover:text-accent-text transition-colors"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PillNav;
