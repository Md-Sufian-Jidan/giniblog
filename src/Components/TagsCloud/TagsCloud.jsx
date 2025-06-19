'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

const tagStyles = [
    'text-lg',
    'text-xl',
    'text-2xl',
];

const getSizeClass = (count) => {
    if (count > 30) return tagStyles[2];
    if (count > 10) return tagStyles[1];
    return tagStyles[0];
};

const popularTags = [
    { name: 'Next.js', count: 35 },
    { name: 'Tailwind', count: 22 },
    { name: 'Framer Motion', count: 12 },
    { name: 'Design', count: 8 },
    { name: 'JavaScript', count: 27 },
    { name: 'CSS', count: 15 },
    { name: 'UX', count: 5 },
    { name: 'Performance', count: 18 },
];

const TagsCloud = () => {
    return (
        <section className="max-w-5xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#1F2937]">🔥 Popular Tags</h2>
            <div className="w-full flex flex-wrap justify-center gap-4 py-10 px-4">
                {popularTags.map((tag) => (
                    <motion.div
                        key={tag.name}
                        whileHover={{
                            scale: 1.2,
                            textShadow: '0px 0px 8px rgba(167,139,250,0.9)',
                        }}
                        className={clsx(
                            'px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border border-purple-300',
                            getSizeClass(tag.count),
                            'text-[#A78BFA] hover:bg-purple-50'
                        )}
                    >
                        #{tag.name}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default TagsCloud