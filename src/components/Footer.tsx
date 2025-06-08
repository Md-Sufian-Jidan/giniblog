'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 px-6 md:px-12 py-12">
            <div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo & Tagline */}
                    <div className="text-center md:text-left">
                        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            <Logo />
                        </Link>
                        <p className="text-sm mt-1">Empower your writing with AI</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
                        <Link href="/posts" className="hover:text-indigo-600 dark:hover:text-indigo-400">Posts</Link>
                        <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About</Link>
                        <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 text-xl"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 text-xl"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 text-xl"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} AiBlog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
