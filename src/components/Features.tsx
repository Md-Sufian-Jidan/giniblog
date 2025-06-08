// src/components/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiTag, FiEdit3, FiZap } from 'react-icons/fi';

const features = [
  {
    title: 'AI-Generated Summaries',
    description:
      'Automatically generate concise summaries for your blog posts, saving time and boosting engagement.',
    icon: <FiCpu size={32} className="text-indigo-500" />,
  },
  {
    title: 'Smart Tag Suggestions',
    description:
      'Get intelligent tag recommendations based on your post content to improve discoverability.',
    icon: <FiTag size={32} className="text-indigo-500" />,
  },
  {
    title: 'Writing Assistance',
    description:
      'Use AI to help draft or refine your blog posts with context-aware suggestions and improvements.',
    icon: <FiEdit3 size={32} className="text-indigo-500" />,
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Track post performance with real-time data to optimize your content strategy.',
    icon: <FiZap size={32} className="text-indigo-500" />,
  },
];

export default function Features() {
  return (
    <section className=" px-6 md:px-12 py-12 text-center bg-white dark:bg-slate-900">
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">
          Powerful Features
        </h2>
        <p className="text-indigo-600 dark:text-indigo-400 mb-12 max-w-2xl mx-auto">
          Enhance your blogging experience with AI-powered tools designed to make content creation effortless.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon }, i) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
