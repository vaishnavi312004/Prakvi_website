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

// Map string icon names to Lucide icon components
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
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute top-full left-0 w-full bg-canvas/98 text-foreground shadow-[0_25px_60px_rgba(3,15,30,0.95)] border-b border-x border-accent/30 backdrop-blur-2xl z-50 rounded-b-3xl overflow-hidden"
          onMouseLeave={onClose}
        >
          {/* Subtle glowing cyan top border highlight */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Column 1: Enterprise Solutions (6 cols, 2 subcolumns) */}
              <div className="lg:col-span-6 pr-0 lg:pr-4">
                <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">
                    Enterprise Solutions
                  </h3>
                  <span className="text-[11px] font-mono text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/30">
                    {navigationData.enterpriseSolutions.length} Practices
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {/* Left Subcolumn */}
                  <div className="space-y-2.5">
                    {leftEnterprise.map((item) => {
                      const IconComp = iconMap[item.iconName] || Layers;
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={onClose}
                          className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-muted leading-snug mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Right Subcolumn */}
                  <div className="space-y-2.5">
                    {rightEnterprise.map((item) => {
                      const IconComp = iconMap[item.iconName] || Layers;
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={onClose}
                          className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-muted leading-snug mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Column 2: Business Solutions (3 cols) */}
              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-6">
                <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">
                    Business Solutions
                  </h3>
                  <span className="text-[11px] font-mono text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/30">
                    {navigationData.businessSolutions.length} Solutions
                  </span>
                </div>

                <div className="space-y-3">
                  {navigationData.businessSolutions.map((item) => {
                    const IconComp = iconMap[item.iconName] || PenTool;
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={onClose}
                        className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-muted leading-snug mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Products (3 cols) */}
              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-6">
                <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">
                    Products
                  </h3>
                  <span className="text-[11px] font-mono text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/30">
                    {navigationData.products.length} Platforms
                  </span>
                </div>

                <div className="space-y-3">
                  {navigationData.products.map((item) => {
                    const IconComp = iconMap[item.iconName] || Database;
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={onClose}
                        className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.06] transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-muted leading-snug mt-0.5">
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
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-6">
                <Link
                  to="/services"
                  onClick={onClose}
                  className="font-semibold text-accent hover:text-highlight flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore All Services & Frameworks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="hover:text-white transition-colors"
                >
                  Explore SaaS Platforms →
                </Link>
              </div>

              <div className="text-[11px] text-muted font-mono">
                Prakvi Techno Solutions Private Limited • Enterprise Architecture
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
