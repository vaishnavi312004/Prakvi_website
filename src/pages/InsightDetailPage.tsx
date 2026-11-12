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
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-[#009EDB] selection:text-white">
      {/* =========================================================================
          1. ARTICLE HEADER (Deep Navy #071D3A)
         ========================================================================= */}
      <section className="bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white py-16 relative overflow-hidden border-b border-white/10">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
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
                  className="w-7 h-7 rounded-full object-cover border border-[#00D4EA]"
                />
                <span className="text-white font-semibold">{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00D4EA]" />
                <span>{article.publishedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00D4EA]" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. READING CANVAS (Clean White #FFFFFF & Off-White)
         ========================================================================= */}
      <div className="bg-white text-[#172B45] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-12">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* Executive Summary Card (Hairline Border, zero thick left stripe) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F7FAFC] border border-slate-200 mb-12 shadow-sm">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB] mb-2">
              Executive Summary
            </div>
            <p className="text-base sm:text-lg text-[#071D3A] leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>

          {/* Article Prose Content */}
          <div className="space-y-10 text-base sm:text-lg text-[#57708E] leading-relaxed">
            {article.content.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold text-[#071D3A] pt-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Share Links & Tags */}
          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Tags:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-[#009EDB] bg-[#DDF4FF] px-2.5 py-1 rounded-lg border border-[#009EDB]/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono">Share:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-[#009EDB] hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-[#009EDB] hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="font-display text-xl font-bold text-[#071D3A] mb-6">
                Related Research & Strategy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/insights/${rel.slug}`}
                    className="p-5 rounded-2xl bg-[#F7FAFC] border border-slate-200 hover:border-[#009EDB] transition-all group"
                  >
                    <div className="text-xs font-mono text-[#009EDB] mb-1 font-semibold">
                      {rel.category}
                    </div>
                    <h4 className="font-display text-base font-bold text-[#071D3A] group-hover:text-[#009EDB] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <CTASection
        title="Consult with the Author & Practice Team"
        subtitle="Schedule a private technical workshop to discuss how these principles apply to your enterprise infrastructure."
      />
    </PageTransition>
  );
};
