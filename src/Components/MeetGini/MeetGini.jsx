'use client';

import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiEdit3, FiZap } from 'react-icons/fi';
import { Player } from '@lottiefiles/react-lottie-player';
import giniAnimation from '/public/gini-avatar.json';

const MeetGini = () => {
    return (
        <section className="bg-[#FAF8F6] py-10 px-6 md:px-12">
            <motion.div
                className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                {/* Lottie AI avatar */}
                <Player
                    autoplay
                    loop
                    src={giniAnimation}
                    className="w-48 md:w-64"
                />

                {/* Text + CTA */}
                <div className="text-center md:text-left space-y-4">
                    <h2 className="text-3xl font-semibold text-[#1F2937]">Meet Gini</h2>
                    <p className="text-xl text-[#1F2937]">
                        <Typewriter
                            words={["Hi, I'm Gini. I help you write smarter blogs."]}
                            loop={false}
                            cursor
                            cursorStyle="_"
                            typeSpeed={60}
                            deleteSpeed={0}
                            delaySpeed={2000}
                        />
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                        <button className="bg-[#A78BFA] hover:bg-purple-500 text-white px-5 py-2 rounded-full flex items-center gap-2 transition hover:cursor-pointer">
                            <FiEdit3 /> Write with Gini
                        </button>
                        <button className="bg-[#34D399] hover:bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 transition hover:cursor-pointer">
                            <FiZap /> Blog Idea Boost
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default MeetGini;