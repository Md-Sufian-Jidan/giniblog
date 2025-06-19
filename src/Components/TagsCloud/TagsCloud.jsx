'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from '@/features/tags/tagsSlice';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const tagStyles = ['text-lg', 'text-xl', 'text-2xl'];

const getSizeClass = (count) => {
    if (count > 30) return tagStyles[2];
    if (count > 15) return tagStyles[1];
    return tagStyles[0];
};

export default function TagsCloud() {
    const dispatch = useDispatch();
    const { items: tags, loading, error } = useSelector((state) => state.tags);

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    if (loading) return <p className="text-center py-8">Loading tags...</p>;
    if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;
    if (!tags.length) return null;

    return (
        <section className="bg-[#FAF8F6]">
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#1F2937]">
                🔖 Popular Tags
            </h2>
            <motion.div
                className="w-full flex flex-wrap justify-center gap-4 py-10 px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                {tags.map((tag, idx) => (
                    <motion.div
                        key={tag.name}
                        whileHover={{
                            scale: 1.15,
                            textShadow: '0px 0px 8px rgba(167,139,250,0.8)',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        data-tooltip-id={`tooltip-${idx}`}
                        data-tooltip-content={`${tag.count} posts with #${tag.name}`}
                        className={clsx(
                            'px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border border-purple-300',
                            getSizeClass(tag.count),
                            'text-[#A78BFA] hover:bg-purple-50'
                        )}
                    >
                        #{tag.name}
                        <Tooltip id={`tooltip-${idx}`} place="top" effect="solid" />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
