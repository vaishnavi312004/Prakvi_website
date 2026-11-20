import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { BlogPost } from '../../data/blogsData';

interface BlogCardProps {
  blog: BlogPost;
  index?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, index = 0 }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : (index % 3) * 0.045 }}
      className="clay-card clay-card-interactive group flex h-full flex-col overflow-hidden"
    >
      <Link to={`/blogs/${blog.slug}`} className="relative block h-52 overflow-hidden bg-surface" aria-label={`Read ${blog.title}`}>
        <img
          src={blog.coverImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-text shadow-sm backdrop-blur">
          {blog.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-mono text-muted">
          <CalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <time>{blog.publishedDate}</time>
        </div>
        <h2 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent line-clamp-2">
          <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{blog.description}</p>
        <div className="mt-5 border-t border-line pt-4">
          <Link
            to={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-accent transition-transform group-hover:translate-x-1"
          >
            Read More <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
