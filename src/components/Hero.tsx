// src/components/Hero.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFeather, FiCoffee, FiStar } from 'react-icons/fi';

const phrases = [
  'Write. Share. Inspire.',
  'Your AI-powered blog platform.',
  'Create content with ease.',
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // typing effect
      if (displayedText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 120);
      } else {
        // wait before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      // deleting effect
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 60);
      } else {
        // move to next phrase
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index]);

  // Icon animation variants
  const iconVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-r from-indigo-700 via-indigo-900 to-slate-900 text-white min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-12 text-center overflow-hidden">
      {/* Animated Icons */}
      <motion.div
        className="absolute top-10 left-10 text-indigo-300 text-4xl opacity-70"
        variants={iconVariants}
        animate="float"
      >
        <FiFeather />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-indigo-400 text-5xl opacity-60"
        variants={iconVariants}
        animate="bounce"
        transition={{ delay: 1 }}
      >
        <FiCoffee />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/3 text-indigo-500 text-6xl opacity-40"
        variants={iconVariants}
        animate="float"
        transition={{ delay: 2 }}
      >
        <FiStar />
      </motion.div>

      {/* Hero Content */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-tight">
        {displayedText}
        <span className="border-r-4 border-indigo-400 animate-pulse ml-1" />
      </h1>
      <p className="text-indigo-200 max-w-2xl text-lg sm:text-xl">
        Build, manage, and enhance your blog posts with AI-powered tools — all in one platform.
      </p>
      <motion.a
        href="/create"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition"
      >
        Get Started
      </motion.a>
    </section>
  );
}
