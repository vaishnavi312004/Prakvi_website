/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { SmoothScroll, resetRouteScroll } from './components/layout/SmoothScroll';
import { Header } from './components/layout/Header';
import { GlobeJourney } from './components/layout/GlobeJourney';
import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CareersPage } from './pages/CareersPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={resetRouteScroll}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <SmoothScroll />
      <div className="flex flex-col min-h-screen bg-canvas text-foreground selection:bg-accent selection:text-white">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content" className="flex-1 flex flex-col w-full relative">
          <AnimatedRoutes />
        </main>
        <Footer />
        <BackToTop />
        <GlobeJourney />
      </div>
    </BrowserRouter>
    </MotionConfig>
  );
}
