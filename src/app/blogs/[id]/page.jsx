'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCommentPostMutation, useDislikePostMutation, useGetPostByIdQuery, useLikePostMutation, } from '@/features/posts/postApi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import Image from 'next/image';

const BlogDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: blog, refetch } = useGetPostByIdQuery(id);
    const { isSignedIn, user } = useUser();

    const [likePost] = useLikePostMutation();
    const [dislikePost] = useDislikePostMutation();
    const [commentPost] = useCommentPostMutation();

    const [commentText, setCommentText] = useState('');

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    const handleVote = async (type) => {
        if (!isSignedIn) {
            return toast.error('You must be logged in to vote.');
        }
        if (type === 'up') {
            const res = await likePost({ id });
            if (res.data.status === 201) {
                return toast.success(res.data.message);
            }
        }
        else {
            const res = await dislikePost({ id });
            if (res.data.status === 201) {
                return toast.success(res.data.message);
            }
        }
        refetch();
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isSignedIn) {
            return toast.error('You must be logged in to comment.');
        }
        if (!commentText) return;

        const res = await commentPost({
            id,
            content: commentText,
            userEmail: user?.emailAddresses?.[0]?.emailAddress || 'unknown',
            userName: user?.fullName || 'Anonymous',
            userImage: user?.imageUrl || '',
        });

        if (res.data?.status === 201) {
            setCommentText('');
            refetch();
            return toast.success(res.data.message);
        }
    };

    const score = blog.upvotes - blog.downvotes;

    // Sort comments newest first
    const sortedComments = [...blog.comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    console.log(blog);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <motion.button
                whileHover={{ scale: 1.05 }}
                className="mb-6 text-purple-700 font-medium underline hover:cursor-pointer"
                onClick={() => router.back()}
            >
                ← Back to Blogs
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
            >
                <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-60 object-cover rounded-lg mb-6"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <h1 className="text-3xl font-bold text-purple-700 mb-2">{blog.title}</h1>
                <p className="text-gray-600 mb-4 flex items-center gap-2">
                    {blog.author_img && (
                        <img
                            src={blog.author_img}
                            alt={blog.author}
                            className="w-6 h-6 rounded-full"
                        />
                    )}
                    By {blog.author}
                </p>
                <div className="flex gap-2 mb-4">
                    {blog.tags.map((tag, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </motion.span>
                    ))}
                </div>
                <p className="text-gray-800 leading-relaxed">{blog.description}</p>

                {/* Upvote/Downvote */}
                <div className="flex items-center mt-6 gap-4">
                    <button
                        onClick={() => handleVote('up')}
                        className="text-green-600 font-semibold hover:cursor-pointer"
                    >
                        ⬆️ Upvote
                    </button>
                    <button
                        onClick={() => handleVote('down')}
                        className="text-red-600 font-semibold hover:cursor-pointer"
                    >
                        ⬇️ Downvote
                    </button>
                    <span className="text-gray-700 font-medium">Score: {score}</span>
                </div>

                {/* Comments */}
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-2">Comments</h2>
                    <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border p-2 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                        >
                            Comment
                        </button>
                    </form>
                    <ul className="space-y-4 mt-4">
                        {sortedComments.map((c, i) => (
                            <li key={i} className="bg-white shadow-md p-4 rounded-md border border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <Image
                                        src={c.userImage || '/default-avatar.svg'}
                                        alt={c.userName || 'User'}
                                        className="w-8 h-8 rounded-full"
                                        width={32}
                                        height={32}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{c.userName || 'Anonymous'}</p>
                                        <p className="text-xs text-gray-400">
                                            {c?.createdAt && !isNaN(new Date(c.createdAt))
                                                ? formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })
                                                : 'just now'}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700">{c.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogDetails;
