import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  ShieldCheck,
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute top-full left-0 w-full bg-[#040E1E]/96 text-slate-100 shadow-[0_25px_60px_rgba(0,10,25,0.95)] border-b border-x border-[#00F0FF]/20 backdrop-blur-2xl z-50 rounded-b-3xl overflow-hidden"
          onMouseLeave={onClose}
        >
          {/* Subtle glowing cyan top border highlight */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Column 1: Enterprise Solutions (6 cols, 2 subcolumns) */}
              <div className="lg:col-span-6 pr-0 lg:pr-4">
                <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-white tracking-tight">
                      Enterprise Solutions
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full border border-[#00F0FF]/20">
                    13 Practices
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {/* Left Subcolumn */}
                  <div className="space-y-3">
                    <Link
                      to="/services/staffing"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Staffing
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Professional workforce sourcing
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/business-intelligence"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Business Intelligence
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Insights through data analytics
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/workforce-solution"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Workforce Solution
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Optimize human capital management
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/cloud-services"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Cloud Services
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Scalable cloud infrastructure
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/infrastructure-management"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Infrastructure Management
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Secure and maintain IT systems
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/enterprise-architecture"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Enterprise Architecture
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Align tech with business goals
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/project-management"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Project Management
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          End-to-end project execution
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Right Subcolumn */}
                  <div className="space-y-3">
                    <Link
                      to="/services/mobility-practice"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Mobility Practice (BYOD & CYOD)
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Flexible enterprise mobility
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/supply-chain-management"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Supply Chain Management
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Streamline operations & logistics
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/system-integration"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Plug className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          System Integration
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Unified tech environment
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/business-analytics"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Business Analytics
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Strategic data-driven decisions
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/accounting"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          Accounting
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Manage finance and compliance
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/services/it-consulting"
                      onClick={onClose}
                      className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                          IT Consulting
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          Expert technology guidance
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Column 2: Business Solutions (3 cols) */}
              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-6">
                <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">
                    Business Solutions
                  </h3>
                  <span className="text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full border border-[#00F0FF]/20">
                    4 Solutions
                  </span>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/services/web-design"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Web Design
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Creative, responsive UI/UX
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/services/enterprise-solution"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Enterprise Solution
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Web development
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/services/digital-marketing"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Digital Marketing
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        SEO, SEM, and branding
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/services/mobile-app-development"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Mobile App Development
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        iOS & Android custom apps
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Products (3 cols) */}
              <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-6">
                <div className="pb-3 border-b border-white/10 mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">
                    Products
                  </h3>
                  <span className="text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full border border-[#00F0FF]/20">
                    4 Platforms
                  </span>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/products/data-analytics"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Data Analytics
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Business intelligence tools
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/hr-management-system"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        HR Management System
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Employee lifecycle automation
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/vendor-management"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Vendor Management
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Partner onboarding & tracking
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/relationship-management"
                    onClick={onClose}
                    className="group flex items-start gap-3 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#00F0FF]/25 group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                      <Contact className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-[#00F0FF] transition-colors leading-tight">
                        Relationship Management
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        Client and contact CRM tools
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom bar linking to full catalog with glowing cyan hover */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-6">
                <Link
                  to="/services"
                  onClick={onClose}
                  className="font-semibold text-[#00F0FF] hover:text-[#7DD3FC] flex items-center gap-1.5 transition-colors"
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

              <div className="text-[11px] text-slate-500 font-mono">
                Prakvi Techno Solutions Private Limited • Enterprise Architecture
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
