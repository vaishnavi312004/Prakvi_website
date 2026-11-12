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
    <PageTransition className="min-h-screen bg-[#02060D] text-slate-100 pt-20">
      {/* 1. HERO WITH BLENDED CANVAS */}
      <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Insights & Research' }]} variant="light" />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                Executive Research & Thought Leadership
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Technology Architecture & Strategic Perspectives.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-light">
              In-depth analysis, architectural patterns, and strategic guidance curated by Prakvi’s practice leaders across cloud, AI, endpoint security, and workforce innovation.
            </p>
          </div>
        </div>
      </section>

      {/* CONTINUOUS UNIFIED EDITORIAL CANVAS */}
      <div className="bg-[#02060D]">
        {/* 2. FEATURED ARTICLE SPOTLIGHT */}
        {featuredArticle && selectedCategory === 'All' && !searchTerm && (
          <section className="py-16 border-b border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#040E1E]/90 border border-[#00F0FF]/25 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
                      Featured Insight
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white hover:text-[#00F0FF] transition-colors leading-snug">
                    <Link to={`/insights/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
                    <span className="font-medium text-white">{featuredArticle.author.name}</span>
                    <span>•</span>
                    <span>{featuredArticle.publishedDate}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all"
                    >
                      <span>Read Full Briefing</span>
                      <ArrowRight className="w-4 h-4 text-[#02060D]" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    <img
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/70 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. SEARCH & CATEGORY FILTERS + ARTICLES GRID */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
              {/* Category Segmented Controls */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#00F0FF] text-[#02060D] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 bg-[#040E1E] rounded-xl border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-[#040E1E]/90 rounded-3xl border border-white/10 hover:border-[#00F0FF]/40 overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#02060D]/85 border border-[#00F0FF]/30 text-[10px] font-mono font-bold text-[#00F0FF] backdrop-blur-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2">
                        <Link to={`/insights/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-light">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {article.author.name}
                      </span>
                      <Link
                        to={`/insights/${article.slug}`}
                        className="text-xs font-bold text-[#00F0FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read Insight</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 text-center text-xs text-slate-500 font-mono">
              *Executive research perspectives curated for enterprise technology leaders.
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <CTASection
        title="Stay Ahead of Enterprise Shifts"
        subtitle="Consult with our research fellows and enterprise architects to evaluate how emerging technologies impact your operational roadmap."
      />
    </PageTransition>
  );
};
