import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen hero-clay-canvas text-foreground flex items-center justify-center p-6 pt-28 relative overflow-hidden">
        <div className="max-w-lg w-full text-center relative z-10 space-y-6 clay-card p-8 sm:p-12">
          <div className="font-mono text-7xl font-extrabold text-accent">404</div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-muted leading-relaxed">
            The page or route you are attempting to access does not exist or has moved within the Prakvi portal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/" className="w-full sm:w-auto btn-primary">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Link>

            <Link to="/services" className="w-full sm:w-auto btn-secondary">
              <Compass className="w-4 h-4 text-accent" aria-hidden="true" />
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
