
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-[#FAF8F6] text-[#1F2937] py-12 border"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link href={'/'} className="text-xl font-bold text-[#A78BFA] mb-2">GiniBlog</Link>
                    <p className="text-sm">
                        Insightful blogs, creative content, and inspiring thoughts for curious minds.
                    </p>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:hover:text-[#1D4ED8] transition">Home</Link></li>
                        <li><Link href="/blogs" className="hover:hover:text-[#1D4ED8] transition">Blogs</Link></li>
                        <li><Link href="/about" className="hover:hover:text-[#1D4ED8] transition">About</Link></li>
                        <li><Link href="/contact" className="hover:hover:text-[#1D4ED8] transition">Contact</Link></li>
                    </ul>
                </motion.div>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-sm font-semibold text-[#1F2937] mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="text-[#1F2937] hover:hover:text-[#1D4ED8] transition"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-[#1F2937] hover:hover:text-[#1D4ED8] transition"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-[#1F2937] hover:hover:text-[#1D4ED8] transition"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-[#1F2937] hover:hover:text-[#1D4ED8] transition"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Note */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} YourBlog. All rights reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;
