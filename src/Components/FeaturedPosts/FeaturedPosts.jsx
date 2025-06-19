// components/FeaturedPostsSlider.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import { FaBookmark, FaShareAlt } from "react-icons/fa";

const posts = [
    {
        id: 1,
        title: "How to Build Habits that Stick",
        image: "/images/habits.jpg",
        category: "Lifestyle",
        excerpt: "Learn science-backed methods for creating habits that actually last.",
    },
    {
        id: 2,
        title: "My Journey into Creative Writing",
        image: "/images/writing.jpg",
        category: "Writing",
        excerpt: "A personal story about becoming a better storyteller.",
    },
    {
        id: 3,
        title: "10 Mindful Morning Rituals",
        image: "/images/morning.jpg",
        category: "Wellness",
        excerpt: "Start your day with intention using these gentle routines.",
    },
];

const FeaturedPosts = () => {
    const slider = useKeenSlider < HTMLDivElement > ({
        loop: true,
        slides: {
            perView: 1.2,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: {
                    perView: 2.2,
                },
            },
            "(min-width: 1024px)": {
                slides: {
                    perView: 3.2,
                },
            },
        },
    });
    const sliderRef = slider?.ref || null;


    return (
        <section className="px-4 py-8 bg-[#FAF8F6] mt-10">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-6">✨ Featured Posts</h2>
            <div ref={sliderRef} className="keen-slider">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        className="keen-slider__slide"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                <span className="absolute top-3 left-3 bg-[#34D399] text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-[#1F2937]">{post.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <button className="text-[#A78BFA] hover:text-purple-600">
                                        <FaBookmark />
                                    </button>
                                    <button className="text-[#F87171] hover:text-red-500">
                                        <FaShareAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedPosts;