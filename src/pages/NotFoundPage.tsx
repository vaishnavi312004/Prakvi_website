import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition className="min-h-screen bg-[#02060D] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-6 bg-[#040E1E]/90 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="font-mono text-7xl font-extrabold text-[#00F0FF] drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">404</div>

        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Requested Architecture Not Found
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed font-light">
          The page or route you are attempting to access does not exist on this portal or has been relocated to another service cluster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
          >
            <Home className="w-4 h-4 text-[#02060D]" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] border border-white/15 hover:border-[#00F0FF]/40 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#00F0FF]" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
