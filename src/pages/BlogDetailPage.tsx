import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { BlogDetails } from '../components/blog/BlogDetails';
import { PageTransition } from '../components/layout/PageTransition';
import { blogsData } from '../data/blogsData';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogsData.find((post) => post.slug === slug);

  if (!blog) return <Navigate to="/blogs" replace />;

  return (
    <PageTransition>
      <BlogDetails blog={blog} />
    </PageTransition>
  );
};

export default BlogDetailPage;
