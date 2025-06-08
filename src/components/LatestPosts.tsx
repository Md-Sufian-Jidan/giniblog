// src/components/LatestPosts.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const posts = [
  {
    id: '1',
    title: 'Boost Your Productivity with AI',
    excerpt: 'Discover how AI tools can streamline your content creation and blogging workflow.',
    author: 'Jane Doe',
    date: '2025-06-01',
  },
  {
    id: '2',
    title: '10 Tips for Writing Engaging Blog Posts',
    excerpt: 'Keep readers hooked from the first sentence with these practical writing tips.',
    author: 'John Smith',
    date: '2025-06-05',
  },
  {
    id: '3',
    title: 'The Power of Smart Tagging',
    excerpt: 'Learn how AI-generated tags can boost your blog’s visibility and SEO performance.',
    author: 'Emily Lin',
    date: '2025-06-07',
  },
];

export default function LatestPosts() {
  return (
    <section className="py-12 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
      <div className=" px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Latest Blog Posts</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Stay up to date with our newest articles and AI insights.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{post.excerpt}</p>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                By <span className="font-medium">{post.author}</span> —{' '}
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/posts"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
