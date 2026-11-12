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
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-[#009EDB] selection:text-white">
      {/* =========================================================================
          1. HERO (Deep Navy #071D3A)
         ========================================================================= */}
      <section className="bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Insights & Research' }]} variant="light" />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
                Executive Research & Thought Leadership
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Technology Architecture & Strategic Perspectives.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-200 leading-relaxed font-light">
              In-depth analysis, architectural patterns, and strategic guidance curated by Prakvi’s practice leaders across cloud, AI, endpoint security, and workforce innovation.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FEATURED ARTICLE SPOTLIGHT (Off-White #F7FAFC)
         ========================================================================= */}
      <div className="bg-[#F7FAFC] text-[#172B45]">
        {featuredArticle && selectedCategory === 'All' && !searchTerm && (
          <section className="py-16 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#009EDB] uppercase tracking-wider">
                      Featured Insight
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-mono">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071D3A] leading-tight">
                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="hover:text-[#009EDB] transition-colors"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-[#57708E] leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#DDF4FF] border border-[#009EDB]/30 flex items-center justify-center font-bold text-xs text-[#009EDB]">
                        {featuredArticle.author.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#071D3A]">
                          {featuredArticle.author.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {featuredArticle.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                    >
                      <span>Read Full Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                    <img
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            3. ARTICLES GRID & CATEGORY FILTER
           ========================================================================= */}
        <section className="py-20">
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
                        ? 'bg-[#071D3A] text-white shadow-sm font-bold'
                        : 'bg-white text-slate-600 hover:text-[#071D3A] border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Keyword Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter articles..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-[#071D3A] placeholder-slate-400 focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                />
              </div>
            </div>

            {/* Articles Grid in White Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 hover:border-[#009EDB]/40 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[11px] font-mono font-semibold text-[#071D3A] backdrop-blur-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#071D3A] group-hover:text-[#009EDB] transition-colors line-clamp-2">
                        <Link to={`/insights/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#57708E] line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {article.author.name}
                      </span>
                      <Link
                        to={`/insights/${article.slug}`}
                        className="text-xs font-bold text-[#009EDB] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
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
