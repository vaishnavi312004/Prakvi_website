import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { navigationData, type NavTreeSection, type TreeNavNode } from '../../data/navigationData';
import {
  User,
  Smartphone,
  BarChart3,
  Truck,
  Users,
  Plug,
  Cloud,
  PieChart,
  Server,
  Receipt,
  Layers,
  Headphones,
  CheckSquare,
  PenTool,
  Code2,
  Megaphone,
  Database,
  Handshake,
  Contact,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  MapPin,
} from 'lucide-react';

interface MegaMenuProps {
  section: NavTreeSection;
  isOpen: boolean;
  focusFirstLink: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  User,
  Smartphone,
  BarChart3,
  Truck,
  Users,
  Plug,
  Cloud,
  PieChart,
  Server,
  Receipt,
  Layers,
  Headphones,
  CheckSquare,
  PenTool,
  Code2,
  Megaphone,
  Database,
  Handshake,
  Contact,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  MapPin,
};

function SectionLinks({ nodes, iconName, onClose }: {
  nodes: TreeNavNode[];
  iconName?: string;
  onClose: () => void;
}) {
  return (
    <ul className="space-y-2">
      {nodes.map((node) => {
        const Icon = iconMap[node.iconName ?? iconName ?? ''] ?? ArrowRight;
        return (
          <li key={node.id}>
            {node.path && (
              <Link
                to={node.path}
                onClick={onClose}
                className="group flex items-center gap-2.5 rounded-xl p-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-accent-text"
              >
                <span className="clay-icon-box flex h-8 w-8 shrink-0 items-center justify-center group-hover:scale-105">
                  <Icon className="h-4 w-4" />
                </span>
                {node.label}
              </Link>
            )}
            {node.children?.length ? (
              <div className="mt-3">
                <h4 className="mb-1 text-xs font-semibold text-muted">{node.label}</h4>
                <SectionLinks nodes={node.children} iconName={node.iconName ?? iconName} onClose={onClose} />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ section, isOpen, focusFirstLink, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen && focusFirstLink) {
      panelRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus();
    }
  }, [isOpen, focusFirstLink]);

  const midPoint = Math.ceil(navigationData.enterpriseSolutions.length / 2);
  const leftEnterprise = navigationData.enterpriseSolutions.slice(0, midPoint);
  const rightEnterprise = navigationData.enterpriseSolutions.slice(midPoint);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="pointer-events-auto fixed top-20 left-0 w-full z-50 px-3 sm:px-6 pt-3"
          onMouseLeave={onClose}
        >
          <div
            ref={panelRef}
            data-lenis-prevent
            role="region"
            aria-label={section.label}
            className="mx-auto max-w-[1720px] max-h-[calc(100dvh-7rem)] overflow-y-auto clay-card bg-card/94 backdrop-blur-2xl p-6 lg:p-8 shadow-2xl border border-line overscroll-contain"
          >
            {section.key === 'what' ? (
              <>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Column 1: Enterprise Solutions (13 Practices) */}
                  <div className="lg:col-span-6 lg:pr-4">
                    <div className="pb-3 border-b border-line mb-4 flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-foreground tracking-tight">
                        Enterprise Solutions
                      </h3>
                      <span className="text-[11px] font-mono font-semibold text-accent-text">
                        {navigationData.enterpriseSolutions.length} Practices
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                      {[leftEnterprise, rightEnterprise].map((col, colIdx) => (
                        <div key={colIdx} className="space-y-1.5">
                          {col.map((item) => {
                            const IconComp = iconMap[item.iconName] || Layers;
                            return (
                              <Link
                                key={item.id}
                                to={item.path}
                                onClick={onClose}
                                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-surface transition-all"
                              >
                                <div className="clay-icon-box w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-105">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-muted leading-snug mt-0.5 line-clamp-1">
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Business Solutions (4 Solutions) */}
                  <div className="lg:col-span-3 lg:border-l lg:border-line lg:pl-6">
                    <div className="pb-3 border-b border-line mb-4 flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-foreground tracking-tight">
                        Business Solutions
                      </h3>
                      <span className="text-[11px] font-mono font-semibold text-accent-text">
                        {navigationData.businessSolutions.length} Solutions
                      </span>
                    </div>

                    <div className="space-y-2">
                      {navigationData.businessSolutions.map((item) => {
                        const IconComp = iconMap[item.iconName] || PenTool;
                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            onClick={onClose}
                            className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-surface transition-all"
                          >
                            <div className="clay-icon-box w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-105">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-muted leading-snug mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 3: Products (4 Platforms) */}
                  <div className="lg:col-span-3 lg:border-l lg:border-line lg:pl-6">
                    <div className="pb-3 border-b border-line mb-4 flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-foreground tracking-tight">
                        Products
                      </h3>
                      <span className="text-[11px] font-mono font-semibold text-accent-text">
                        {navigationData.products.length} Platforms
                      </span>
                    </div>

                    <div className="space-y-2">
                      {navigationData.products.map((item) => {
                        const IconComp = iconMap[item.iconName] || Database;
                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            onClick={onClose}
                            className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-surface transition-all"
                          >
                            <div className="clay-icon-box w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-105">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent-text transition-colors leading-tight">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-muted leading-snug mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom bar linking to full catalog */}
                <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
                  <div className="flex flex-wrap items-center gap-6">
                    <Link
                      to="/services"
                      onClick={onClose}
                      className="font-semibold text-accent-text hover:text-highlight flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore All 17 Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/products"
                      onClick={onClose}
                      className="font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      Explore All Products →
                    </Link>
                    <Link
                      to="/insights"
                      onClick={onClose}
                      className="font-semibold text-muted hover:text-accent transition-colors"
                    >
                      Insights & Articles →
                    </Link>
                  </div>

                  <div className="text-[11px] text-subtle font-mono">
                    Prakvi Techno Solutions Private Limited
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap gap-y-6">
                  {section.nodes.map((group, index) => (
                    <div
                      key={group.id}
                      className={`w-full min-w-0 sm:w-1/2 sm:px-4 ${section.nodes.length > 2 ? 'xl:w-1/4' : ''} ${index > 0 ? 'xl:border-l xl:border-line' : ''}`}
                    >
                      <h3 className="mb-4 border-b border-line pb-3 font-display text-sm font-bold tracking-tight text-foreground">
                        {group.label}
                      </h3>
                      <SectionLinks nodes={group.children ?? [group]} iconName={group.iconName} onClose={onClose} />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 text-xs">
                  <Link
                    to={section.href}
                    onClick={onClose}
                    className="flex items-center gap-1.5 font-semibold text-accent-text transition-colors hover:text-highlight"
                  >
                    {section.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="font-mono text-[11px] text-subtle">
                    Prakvi Techno Solutions Private Limited
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
