// src/components/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import {
  FiUserPlus,
  FiEdit2,
  FiCpu,
  FiSend,
} from 'react-icons/fi';

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your account quickly and securely to start your blogging journey.',
    icon: <FiUserPlus size={28} className="text-indigo-500" />,
  },
  {
    title: 'Create Post',
    description: 'Write and customize your blog posts with an easy-to-use editor.',
    icon: <FiEdit2 size={28} className="text-indigo-500" />,
  },
  {
    title: 'AI Assistance',
    description: 'Leverage AI to generate summaries, suggest tags, or improve your writing.',
    icon: <FiCpu size={28} className="text-indigo-500" />,
  },
  {
    title: 'Publish & Share',
    description: 'Publish your post and share it with your audience instantly.',
    icon: <FiSend size={28} className="text-indigo-500" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 py-12 bg-indigo-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          How It Works
        </h2>

        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >

          {steps.map(({ title, description, icon }, i) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex flex-col items-center lg:items-start lg:max-w-xs text-center lg:text-left mb-12 lg:mb-0 lg:even:self-end"
              style={{ zIndex: 10 }}
            >
              {/* Icon with circle */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-white mb-4 shadow-lg relative z-20">
                {icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-indigo-700 dark:text-indigo-300">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
