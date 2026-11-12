import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { insightsData } from '../data/insightsData';
import {
  Calendar,
  Clock,
  Share2,
  Linkedin,
  Twitter,
} from 'lucide-react';

export const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const relatedArticles = insightsData.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <PageTransition className="min-h-screen bg-[#02060D] text-slate-100 pt-20">
      {/* 1. ARTICLE HEADER WITH BLENDED CANVAS */}
      <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-16 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Insights', path: '/insights' },
              { label: article.category },
            ]}
            variant="light"
          />

          <div className="mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                {article.category}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#00F0FF]"
                />
                <span className="text-white font-semibold">{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>{article.publishedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS READING CANVAS IN DARK THEME */}
      <div className="bg-[#02060D] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-12">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Reading Flow (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Executive Summary Pullout (No thick left border, sleek hairline cyan border) */}
              <div className="p-7 rounded-3xl bg-[#040E1E]/90 border border-[#00F0FF]/30 shadow-xl text-slate-200 text-base font-medium leading-relaxed font-light">
                {article.summary}
              </div>

              {/* Body Sections */}
              <div className="space-y-8 text-base text-slate-300 leading-relaxed font-light">
                {article.content.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    {section.heading && (
                      <h2
                        id={`section-${idx}`}
                        className="font-display text-2xl font-bold text-white tracking-tight pt-4"
                      >
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-slate-400">Topics:</span>
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/15 text-xs font-mono text-[#00F0FF]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar (4 cols): Table of Contents & Social Share */}
            <div className="lg:col-span-4 space-y-8">
              {/* Table of Contents */}
              <div className="p-6 rounded-3xl bg-[#040E1E]/90 border border-white/10 shadow-xl sticky top-28 backdrop-blur-xl">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2.5 text-xs">
                  {article.content.map((section, idx) => {
                    if (!section.heading) return null;
                    return (
                      <a
                        key={idx}
                        href={`#section-${idx}`}
                        className="block text-slate-400 hover:text-[#00F0FF] transition-colors leading-normal"
                      >
                        {idx + 1}. {section.heading}
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-xs font-mono font-bold text-white mb-2">Share Briefing</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors"
                      title="Copy Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors"
                      title="Share to LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors"
                      title="Share to Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RELATED INSIGHTS */}
        {relatedArticles.length > 0 && (
          <section className="pt-20 mt-16 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h3 className="font-display text-2xl font-bold text-white mb-8">
                Related Research Briefings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <div key={rel.id} className="p-6 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 shadow-xl space-y-3 transition-colors">
                    <div className="text-[10px] font-mono text-[#00F0FF] uppercase font-bold">{rel.category}</div>
                    <h4 className="font-display text-base font-bold text-white hover:text-[#00F0FF]">
                      <Link to={`/insights/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 font-light">{rel.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA */}
      <CTASection
        title="Discuss This Architecture With Our Authors"
        subtitle="Schedule an executive briefing session with our research practice to evaluate applying these patterns inside your organization."
      />
    </PageTransition>
  );
};
