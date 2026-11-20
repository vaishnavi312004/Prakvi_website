import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { BlogPost } from '../../data/blogsData';

interface BlogDetailsProps {
  blog: BlogPost;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => (
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
          </div>
        </div>
      </div>
    </section>

    <section className="bg-canvas py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="clay-soft mb-10 overflow-hidden rounded-3xl p-2.5 sm:mb-12 sm:p-3">
          <img src={blog.coverImage} alt={blog.title} className="h-64 w-full rounded-2xl object-cover sm:h-[26rem]" />
        </div>

        <div className="clay-card space-y-6 p-6 text-base leading-8 text-muted sm:p-10">
          {blog.content.map((paragraph, index) => <p key={`${blog.id}-paragraph-${index}`}>{paragraph}</p>)}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <Link to="/blogs" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </article>
    </section>
  </div>
);

export default BlogDetails;
