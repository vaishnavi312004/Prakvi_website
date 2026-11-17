import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { insightsData } from '../data/insightsData';
import { Calendar, Clock, Linkedin, Twitter } from 'lucide-react';

export const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const relatedArticles = insightsData.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        {/* 1. ARTICLE HERO */}
        <section className="hero-clay-canvas py-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Insights', path: '/insights' },
                { label: article.category },
              ]}
            />

            <div className="mt-6">
              <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                {article.category}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                {article.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-muted font-mono">
                <div className="flex items-center gap-2.5">
                  <div className="clay-soft w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-accent">
                    {article.author.name[0]}
                  </div>
                  <span className="text-foreground font-semibold">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>{article.publishedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ARTICLE CONTENT */}
        <section className="bg-canvas text-foreground py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="clay-soft p-3 mb-12">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="clay-pastel p-6 sm:p-8 mb-12">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                Executive Summary
              </div>
              <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
                {article.summary}
              </p>
            </div>

            <div className="clay-card p-7 sm:p-10 space-y-8 text-base text-muted leading-relaxed">
              {article.content.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  {section.heading && (
                    <h2 className="font-display text-2xl font-bold text-foreground pt-2">
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
            <div className="mt-12 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-muted">Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="clay-soft text-xs font-mono text-accent px-3 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted font-mono">Share:</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="clay-soft p-2.5 rounded-xl text-foreground hover:text-accent transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="clay-soft p-2.5 rounded-xl text-foreground hover:text-accent transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-12 border-t border-line">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Related Research & Strategy
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/insights/${rel.slug}`}
                      className="clay-card clay-card-interactive p-6 group block"
                    >
                      <div className="text-xs font-mono text-accent mb-1.5 font-semibold">
                        {rel.category}
                      </div>
                      <h4 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <CTASection
          title="Consult with the Author & Practice Team"
          subtitle="Schedule a technical workshop to discuss how these principles apply to your enterprise infrastructure."
        />
      </div>
    </PageTransition>
  );
};
