import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { navigationData } from '../../data/navigationData';
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
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
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
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const midPoint = Math.ceil(navigationData.enterpriseSolutions.length / 2);
  const leftEnterprise = navigationData.enterpriseSolutions.slice(0, midPoint);
  const rightEnterprise = navigationData.enterpriseSolutions.slice(midPoint);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="pointer-events-auto absolute top-full left-0 w-full z-50 px-3 sm:px-6 pt-3"
          onMouseLeave={onClose}
        >
          <div className="mx-auto max-w-[1380px] clay-card bg-card/94 backdrop-blur-2xl p-6 lg:p-8 shadow-2xl border border-line">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
