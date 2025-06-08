'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      {/* Overlay (optional for dark effect on background image) */}
      <div className="absolute inset-0 dark:bg-slate-900 bg-opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-extrabold mb-6"
        >
          Ready to Share Your Thoughts with the World?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
        >
          Join our community of creators and use AI to make your writing smarter, faster, and more powerful.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
