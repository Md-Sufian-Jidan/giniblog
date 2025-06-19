'use client';

import { useUser } from '@clerk/nextjs';
import { useDeletePostMutation, useGetMyPostsQuery } from '@/features/posts/postApi';
import Link from 'next/link';
import Swal from 'sweetalert2'

const MyBlogs = () => {
    const { user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress;
    const { data: posts = [], isLoading, isError, error, } = useGetMyPostsQuery(email, { skip: !email });
    const [deletePost] = useDeletePostMutation();

    if (isLoading) return <p className="text-center mt-8">Loading your posts...</p>;
    if (isError) return <p className="text-center mt-8 text-red-500">Error: {error?.data}</p>;
    if (posts.length === 0) return <p className="text-center mt-8">No blog posts found.</p>;

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deletePost({ id, email });
                if (res.data.status === 201) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-[#7C3AED] mb-6">My Blogs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">Category: {post.category}</p>
                        <p className="text-gray-700">{post.description.slice(0, 100)}...</p>
                        <div className="flex items-center justify-between gap-4 mt-5">
                            <Link
                                className="text-blue-600 hover:cursor-pointer"
                                href={`/edit-post/${post._id}`}
                            >
                                ✏️ Edit
                            </Link>
                            <button
                                className="text-red-600 hover:cursor-pointer"
                                onClick={() => handleDelete(post._id)}
                            >
                                🗑️ Delete
                            </button>
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
