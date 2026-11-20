import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, UserRound } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { BlogPost, blogsData } from '../../data/blogsData';

interface BlogDetailsProps {
  blog: BlogPost;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  const articleText = [
    ...blog.content,
    ...(blog.sections ?? []).flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])]),
  ].join(' ');
  const readTime = Math.max(1, Math.ceil(articleText.trim().split(/\s+/).filter(Boolean).length / 220));
  return (
  <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
    <section className="hero-clay-canvas relative overflow-hidden py-14 sm:py-16">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'Blogs', path: '/blogs' }, { label: blog.category }]} />
        <div className="mt-6">
          <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">{blog.category}</div>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{blog.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-muted">
            <span className="inline-flex items-center gap-2 text-foreground"><UserRound className="h-4 w-4 text-accent" aria-hidden="true" />{blog.author}</span>
            <time className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />{blog.publishedDate}</time>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-accent" aria-hidden="true" />{readTime} min read</span>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-canvas py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="clay-soft mb-10 overflow-hidden rounded-3xl p-2.5 sm:mb-12 sm:p-3">
          <img src={blog.coverImage} alt={blog.title} fetchPriority="high" className="h-64 w-full rounded-2xl object-cover sm:h-[26rem]" />
        </div>

        {blog.sections && blog.sections.length > 3 && (
          <nav aria-label="In this article" className="clay-card mb-8 p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">In this article</h2>
            <ol className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {blog.sections.map((section, index) => (
                <li key={`${blog.id}-contents-${index}`}>
                  <a href={`#${blog.id}-section-${index}`} className="leading-relaxed text-muted transition-colors hover:text-accent focus-visible:text-accent">
                    <span className="mr-2 font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="clay-card space-y-6 p-6 text-base leading-8 text-muted sm:p-10">
          {blog.sections ? blog.sections.map((section, sectionIndex) => (
            <section id={`${blog.id}-section-${sectionIndex}`} key={`${blog.id}-section-${sectionIndex}`} className={sectionIndex ? 'scroll-mt-28 border-t border-line pt-6' : 'scroll-mt-28'}>
              <h2 className="mb-3 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${blog.id}-section-${sectionIndex}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-accent">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${blog.id}-section-${sectionIndex}-bullet-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          )) : blog.content.map((paragraph, index) => <p key={`${blog.id}-paragraph-${index}`}>{paragraph}</p>)}
        </div>

      </article>

      <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
        <section className="clay-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Put the ideas into practice</p>
            <h2 className="mt-2 font-display text-xl font-bold text-foreground">Discuss your next technology initiative</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Talk with our team about your goals, constraints, and a practical path forward.</p>
          </div>
          <Link to="/contact" className="btn-primary inline-flex shrink-0 items-center justify-center gap-2">
            Talk to our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4 pb-4 sm:px-6">
        <div className="border-t border-line pt-6">
          <Link to="/blogs" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>

    </section>
  </div>
  );
};

export default BlogDetails;
