'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/create', label: 'Write' },
    { href: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 10);
    });

    return (
        <nav className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''} bg-[#FAF8F6] border-b border-gray-200 shadow-sm px-6 py-4`}>
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold text-[#A78BFA] hover:cursor-pointer">GiniBlog</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-[#1F2937] font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-[#1D4ED8] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-[#A78BFA] hover:text-[#1D4ED8]">Sign In</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="ml-2 text-[#A78BFA] hover:text-[#1D4ED8]">Sign Up</button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <svg
                            className="w-6 h-6 text-[#1F2937]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6 text-gray-700 hover:cursor-pointer" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 hover:cursor-pointer" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden flex flex-col gap-3 mt-3 px-4 pb-4 text-[#1F2937] font-medium"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-[#1D4ED8] transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-left text-[#A78BFA] hover:text-[#1D4ED8]">Sign In</button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
