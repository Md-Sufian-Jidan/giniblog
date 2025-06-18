'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetPostByIdQuery } from '@/features/posts/postApi';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const BlogDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: post, isLoading, isError } = useGetPostByIdQuery(id);

    if (isLoading) return <p className="text-center mt-20">Loading...</p>;
    if (isError || !post) return <p className="text-center text-red-500 mt-20">Error loading post.</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            {/* Back Button */}
            <button
                onClick={() => router.push('/blogs')}
                className="flex items-center gap-2 text-purple-600 hover:underline mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
            </button>

            {/* Post Image */}
            <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
            />

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-[#7C3AED] mb-4"
            >
                {post.title}
            </motion.h1>

            {/* Author Info & Meta */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-4"
            >
                <Image
                    src={post.author_img}
                    alt={post.author}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
                <div className="text-sm text-gray-600">
                    <p className="font-medium">{post.author}</p>
                    <p>{new Date(post.date).toLocaleDateString()} · {post.category}</p>
                </div>
            </motion.div>

            {/* Tags */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2 flex-wrap mb-6"
            >
                {post.tags?.map((tag, i) => (
                    <span
                        key={i}
                        className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </motion.div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-800 leading-relaxed text-lg"
            >
                {post.description}
            </motion.p>
        </div>
    );
}

export default BlogDetails;