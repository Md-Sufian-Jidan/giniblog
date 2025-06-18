'use client';

import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="bg-[#FAF8F6] py-20 px-6 md:px-12 relative overflow-hidden">
            {/* Text Area */}
            <div className="max-w-5xl mx-auto text-center z-10 relative">
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold text-[#1F2937] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome to{' '}
                    <span className="text-[#A78BFA]">
                        <Typewriter
                            words={['MyBlog', 'Creative Space', 'AI-Powered Writing']}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-[#1F2937] mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Express your thoughts, share your stories, and let AI guide your creativity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link href="/dashboard/create">
                        <button className="bg-[#A78BFA] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#C4B5FD] transition hover:cursor-pointer">
                            Start Writing
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Floating AI Image */}
            <motion.div
                className="absolute right-4 bottom-0 md:right-12 md:bottom-0 w-[180px] md:w-[250px] z-0 opacity-90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <Image
                    src="/ai-assistant.png"
                    alt="AI Assistant"
                    width={300}
                    height={300}
                    className="animate-float"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
