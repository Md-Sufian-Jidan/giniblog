'use client';

import { useUser } from '@clerk/nextjs';
import { useGetMyPostsQuery } from '@/features/posts/postApi';
import Link from 'next/link';

const MyBlogs = () => {
    const { user } = useUser();

    const email = user?.emailAddresses[0]?.emailAddress;
    const {
        data: posts = [],
        isLoading,
        isError,
        error,
    } = useGetMyPostsQuery(email, { skip: !email });

    if (isLoading) return <p className="text-center mt-8">Loading your posts...</p>;
    if (isError) return <p className="text-center mt-8 text-red-500">Error: {error?.data}</p>;
    if (posts.length === 0) return <p className="text-center mt-8">No blog posts found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-[#7C3AED] mb-6">My Blogs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">Category: {post.category}</p>
                        <p className="text-gray-700">{post.description.slice(0, 100)}...</p>
                        <div className="text-right mt-3">
                            <Link
                                href={`/dashboard/myBlogs/${post._id}`}
                                className="text-[#7C3AED] hover:underline text-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBlogs;
