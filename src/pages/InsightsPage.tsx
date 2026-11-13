import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { insightsData } from '../data/insightsData';
import {
  Search,
  ArrowRight,
} from 'lucide-react';

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
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-accent selection:text-white">

      <section className="bg-gradient-to-b from-canvas via-surface to-canvas text-foreground py-section relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Insights & Research' }]} variant="light" />

          <div className="mt-8 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/[0.04] px-3.5 py-1.5">
              <span className="w-2 h-2 rounded-full bg-accent shadow-accent" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                Executive Research & Thought Leadership
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
              Technology Architecture & Strategic Perspectives.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-muted leading-relaxed font-light">
              In-depth analysis, architectural patterns, and strategic guidance curated by Prakvi’s practice leaders across cloud, AI, endpoint security, and workforce innovation.
            </p>
          </div>
        </div>
      </section>


      <div className="bg-canvas text-foreground">
        {featuredArticle && selectedCategory === 'All' && !searchTerm && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-line  grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                      Featured Insight
                    </span>
                    <span className="text-muted">•</span>
                    <span className="text-xs text-subtle font-mono">
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

                  <div className="pt-2 flex items-center justify-between border-t border-line">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface border border-accent/30 flex items-center justify-center font-bold text-xs text-accent">
                        {featuredArticle.author.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          {featuredArticle.author.name}
                        </div>
                        <div className="text-[11px] text-subtle">
                          {featuredArticle.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="btn-primary"
                    >
                      <span>Read Full Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-line group">
                    <img
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}


        <section className="py-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              {/* Category Pills (Interactive buttons) */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-accent/10 text-accent ring-1 ring-accent/40 font-bold'
                        : 'bg-surface text-muted hover:text-foreground border border-line'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Keyword Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter articles..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface border border-line text-xs text-foreground placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            {/* Articles Grid in White Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col glass-panel rounded-3xl border border-line hover:border-accent/40 overflow-hidden  hover:shadow-accent transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-surface">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface/95 border border-line text-[11px] font-mono font-semibold text-foreground backdrop-blur-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-subtle mb-2 font-mono">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
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
                        className="text-xs font-bold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <CTASection
        title="Looking for Tailored Architectural Advisory?"
        subtitle="Our practice leaders conduct private technical discovery sessions and roadmap reviews for enterprise partners."
      />
    </PageTransition>
  );
};
