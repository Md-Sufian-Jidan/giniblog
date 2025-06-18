'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Overview', path: '/dashboard' },
    { name: 'Create Post', path: '/dashboard/create' },
    { name: 'My Posts', path: '/dashboard/myBlogs' },
];

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user } = useUser();
    const { signOut } = useClerk();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-[#FAF8F6] text-[#1F2937]">
            {/* Sidebar for Desktop */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col p-6 shadow-md">
                <Link href={'/'} className="text-xl font-bold text-[#A78BFA] mb-8 hover:cursor-pointer">GiniBlog</Link>

                <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`px-3 py-2 rounded-lg hover:bg-[#F3F4F6] transition ${pathname === link.path ? 'bg-[#EDE9FE] font-semibold' : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => signOut()}
                    className="mt-auto bg-[#F87171] text-white py-2 px-4 rounded-lg hover:bg-[#FCA5A5] transition hover:cursor-pointer"
                >
                    Logout
                </button>
            </aside>

            {/* Sidebar for Mobile */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#A78BFA]">GiniBlog</h2>
                            <button onClick={toggleSidebar}>
                                <X className="w-6 h-6 text-gray-700 hover:cursor-pointer" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={toggleSidebar}
                                    className={`px-3 py-2 rounded-lg hover:bg-[#F3F4F6] transition ${pathname === link.path ? 'bg-[#EDE9FE] font-semibold' : ''
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={() => {
                                signOut();
                                toggleSidebar();
                            }}
                            className="mt-auto bg-[#F87171] text-white py-2 px-4 rounded-lg hover:bg-[#FCA5A5] transition hover:cursor-pointer"
                        >
                            Logout
                        </button>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Navbar */}
                <div className="flex justify-between items-center px-4 py-4 border-b shadow-sm bg-white sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        {/* Hamburger for Mobile */}
                        <button className="md:hidden" onClick={toggleSidebar}>
                            <Menu className="w-6 h-6 text-gray-700 hover:cursor-pointer" />
                        </button>
                        <h1 className="text-lg font-semibold">
                            Welcome Back, <span>{user?.fullName}</span> 👋
                        </h1>
                    </div>
                    <UserButton afterSignOutUrl="/" />
                </div>

                {/* Page Content */}
                <motion.main
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
}
