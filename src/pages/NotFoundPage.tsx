import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition className="min-h-screen bg-canvas text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-6 bg-surface/90 border border-accent/30 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="font-mono text-7xl font-extrabold text-accent">404</div>

        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
          Requested Architecture Not Found
        </h1>

        <p className="text-sm text-muted leading-relaxed font-light">
          The page or route you are attempting to access does not exist on this portal or has been relocated to another service cluster.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto btn-primary"
          >
            <Home className="w-4 h-4 text-foreground" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto btn-secondary"
          >
            <Compass className="w-4 h-4 text-accent" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
