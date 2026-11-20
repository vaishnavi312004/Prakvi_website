import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { BlogCard } from '../components/blog/BlogCard';
import { blogsData } from '../data/blogsData';

export const BlogsPage: React.FC = () => (
  <PageTransition>
    <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
      <section className="hero-clay-canvas relative overflow-hidden py-section">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="INSIGHTS & UPDATES"
            title="Explore Our Latest Blogs"
            description="Discover insights, technology trends, business strategies, and the latest updates from Prakvi Techno Solutions."
            align="center"
          />
        </div>
      </section>

      <section className="bg-canvas py-section text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {blogsData.map((blog, index) => <BlogCard key={blog.id} blog={blog} index={index} />)}
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default BlogsPage;
