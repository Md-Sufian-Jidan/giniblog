'use client';

import { motion } from 'framer-motion';
import { Users, Compass, Target, HelpCircle, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const features = [
    {
        icon: <Target className="w-6 h-6 text-purple-600" />,
        title: 'Our Mission',
        description:
            'To empower readers through informative, inspiring, and original blog content across multiple domains.',
    },
    {
        icon: <Compass className="w-6 h-6 text-purple-600" />,
        title: 'Our Vision',
        description:
            'To build a trusted platform where stories, education, and innovation intersect for every curious mind.',
    },
    {
        icon: <Users className="w-6 h-6 text-purple-600" />,
        title: 'Our Team',
        description:
            'We are a small group of creators, writers, and developers passionate about delivering quality content.',
    },
    {
        icon: <HelpCircle className="w-6 h-6 text-purple-600" />,
        title: 'FAQ',
        description:
            'Got questions? We’re here to help. Learn how to contribute, comment, and more in our FAQ section.',
    },
];

const team = [
    {
        name: 'Aarav Patel',
        role: 'Content Strategist',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        name: 'Isha Kapoor',
        role: 'UI/UX Designer',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
        name: 'Md Abu Sufian Jidan',
        role: 'Full Stack Developer',
        image: 'https://randomuser.me/api/portraits/men/74.jpg',
    },
]

const AboutPage = () => {
    const router = useRouter();

    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-purple-700 text-center mb-8"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                About Our Blog
            </motion.h1>
            {/* Intro Paragraph */}
            <motion.p
                className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Welcome to <span className="text-purple-600 font-semibold">GiniBlog</span> – your go-to destination for insightful articles, creative inspiration, and meaningful discussions. Whether you're into technology, design, lifestyle, or education, our mission is to deliver value-packed content that sparks curiosity and encourages lifelong learning.
            </motion.p>
            {/* Feature Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                        whileHover={{ scale: 1.02 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                    >
                        <div className="flex items-center gap-4 mb-3">
                            {feature.icon}
                            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                    </motion.div>
                ))}
            </motion.div>
            {/* Meet the Creator */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <h2 className="text-2xl font-bold text-purple-700 mb-2">Meet the Creator</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Hi, I’m <span className="font-semibold">[Your Name]</span> — a passionate writer and developer who loves turning ideas into impactful digital experiences. This blog is my digital garden, and I’m glad you're here to explore it with me.
                </p>
            </motion.div>
            {/* Team Section */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
            >
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">
                    Meet Our Team
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            {/* Contact CTA */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <p className="text-gray-600 mb-4">Want to get in touch?</p>
                <button
                    onClick={() => router.push('/contact')}
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                >
                    <Mail className="w-4 h-4" />
                    Contact Us
                </button>
            </motion.div>
        </motion.div>
    );
};

export default AboutPage;
