'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        id: 1,
        name: 'Alice Johnson',
        avatar:
            'https://randomuser.me/api/portraits/women/68.jpg',
        text: 'This blog platform revolutionized how I write content. The AI suggestions are spot on!',
    },
    {
        id: 2,
        name: 'Mark Wilson',
        avatar:
            'https://randomuser.me/api/portraits/men/43.jpg',
        text: 'The ease of use and the AI-powered features make blogging fun and effortless.',
    },
    {
        id: 3,
        name: 'Sophia Lee',
        avatar:
            'https://randomuser.me/api/portraits/women/21.jpg',
        text: 'Highly recommend! The AI-generated summaries save me so much time.',
    },
    {
        id: 4,
        name: 'James Smith',
        avatar:
            'https://randomuser.me/api/portraits/men/77.jpg',
        text: 'A sleek, modern platform with thoughtful features and great community support.',
    },
];

const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
    return (
        <section className="py-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
                    What Our Users Say
                </h2>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="py-6"
                >
                    {testimonials.map(({ id, name, avatar, text }) => (
                        <SwiperSlide key={id}>
                            <motion.div
                                variants={fadeVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 shadow-md flex flex-col items-center text-center h-full"
                            >
                                <Image
                                    height={50}
                                    width={50}
                                    src={avatar}
                                    alt={name}
                                    className="w-20 h-20 rounded-full mb-4 object-cover shadow-lg"
                                    loading="lazy"
                                />
                                <p className="text-indigo-700 dark:text-indigo-400 italic mb-4 flex-grow">
                                    “{text}”
                                </p>
                                <h3 className="font-semibold text-lg">{name}</h3>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
