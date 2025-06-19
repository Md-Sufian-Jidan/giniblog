'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Sara Malik',
        quote: 'Gini helped me brainstorm content 3x faster. I love how easy it feels!',
        avatar: '/avatars/sara.png',
    },
    {
        name: 'Devon Cruz',
        quote: 'Writing feels less stressful with AI support. Game-changer for my blog.',
        avatar: '/avatars/devon.png',
    },
    {
        name: 'Aisha Ray',
        quote: 'The suggestions are on-point. It feels like I have a creative partner.',
        avatar: '/avatars/aisha.png',
    },
];

const Testimonials = () => {
    return (
        <section className="bg-[#FAF8F6] py-10 px-4">
            <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">
                💬 What Writers Are Saying
            </h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop
                className="max-w-3xl mx-auto"
            >
                {testimonials.map((t, index) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-md text-center flex flex-col items-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Image
                                    src={t.avatar}
                                    alt={t.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full mb-4 shadow-md"
                                />
                            </motion.div>

                            <p className="text-lg text-gray-700 italic mb-4">“{t.quote}”</p>
                            <p className="text-sm text-[#1F2937] font-semibold">— {t.name}</p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Testimonials;