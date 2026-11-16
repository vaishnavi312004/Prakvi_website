import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { insightsData } from '../data/insightsData';
import { Search, ArrowRight } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Artificial Intelligence',
    'Cloud Computing',
    'Cybersecurity',
    'Recruitment & Workforce',
  ];

  const filteredArticles = insightsData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = insightsData[0];

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        {/* 1. INSIGHTS HERO */}
        <section className="hero-clay-canvas py-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Insights & Research' }]} />

            <div className="mt-8 max-w-3xl">
              <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                Executive Research & Thought Leadership
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                Technology Architecture & Strategic Perspectives.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed text-balance">
                In-depth analysis, architectural patterns, and strategic guidance curated by Prakvi’s practice leaders across cloud, analytics, enterprise security, and workforce innovation.
              </p>
            </div>
          </div>
        </section>

        {/* 2. FEATURED INSIGHT */}
        {featuredArticle && selectedCategory === 'All' && !searchTerm && (
          <section className="py-section bg-canvas text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="clay-card p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="font-bold text-accent uppercase tracking-wider">
                      Featured Insight
                    </span>
                    <span className="text-muted">•</span>
                    <span className="text-muted font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line">
                    <div className="flex items-center gap-3">
                      <div className="clay-soft w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-accent">
                        {featuredArticle.author.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          {featuredArticle.author.name}
                        </div>
                        <div className="text-[11px] text-muted">
                          {featuredArticle.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="btn-primary"
                    >
                      <span>Read Full Analysis</span>
                      <ArrowRight className="arrow-shift" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="clay-soft p-3">
                    <div className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={featuredArticle.featuredImage}
                        alt={featuredArticle.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. FILTER & ARTICLES GRID */}
        <section className="py-section bg-surface/70 text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex flex-wrap items-center gap-2 p-1.5 clay-soft rounded-2xl">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-muted absolute left-3.5 top-3.5" aria-hidden="true" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter articles..."
                  aria-label="Filter insights articles"
                  className="clay-soft w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="clay-card p-10 text-center">
                <p className="text-sm text-muted">
                  No insights match your current filter. Try clearing your search query or switching categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="clay-card clay-card-interactive group flex flex-col overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden bg-surface">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-accent font-semibold mb-2">
                          <span>{article.category}</span>
                          <span className="text-muted">•</span>
                          <span className="text-muted font-normal">{article.publishedDate}</span>
                          <span className="text-muted">•</span>
                          <span className="text-muted font-normal">{article.readTime}</span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                          <Link to={`/insights/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-line flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted">
                          {article.author.name}
                        </span>
                        <Link
                          to={`/insights/${article.slug}`}
                          className="text-xs font-bold text-accent inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Read article</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <CTASection
          title="Looking for Tailored Architectural Advisory?"
          subtitle="Our practice leaders conduct technical discovery sessions and roadmap reviews for enterprise partners."
        />
      </div>
    </PageTransition>
  );
};
