'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
    useGetPostByIdQuery,
    useUpdatePostMutation,
} from '@/features/posts/postApi';
import toast from 'react-hot-toast';
import axios from 'axios';

const EditPostPage = () => {
    const { id } = useParams();
    const { user } = useUser();
    const router = useRouter();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    const { data: postData, isLoading } = useGetPostByIdQuery(id);
    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues, setValue
    } = useForm();

    useEffect(() => {
        if (postData) {
            reset({
                title: postData.title,
                description: postData.description,
                image: postData.image,
                tags: postData.tags.join(', '),
                category: postData.category,
            });
        }
    }, [postData, reset]);

    const onSubmit = async (formData) => {
        const updatedPost = {
            ...formData,
            tags: formData.tags.split(',').map((tag) => tag.trim()),
        };

        try {
            const res = await updatePost({ id, data: updatedPost, email }).unwrap();
            if (res.status === 201) {
                toast.success(res.message);
                router.push('/dashboard/myBlogs');
            }
        } catch (error) {
            toast.error(error?.data?.error || 'Update failed');
        }
    };

    const handleTag = async () => {
        const description = getValues('description');

        if (!description) return toast.error('Add description first');
        try {
            const res = await axios.post('/api/ai/tags', { content: description });

            const data = await res.json();
            if (data.tags) {
                setValue((prev) => ({ ...prev, tags: data.tags.join(', ') }));
                toast.success('Tags suggested!');
            } else {
                toast.error(data.error || 'Failed to generate tags');
            }
        } catch (e) {
            toast.error('Error generating tags');
        }
    }

    if (isLoading) return <p>Loading post...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Your Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.title && <p className="text-red-600">{errors.title.message}</p>}
                </div>
                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.description && (
                        <p className="text-red-600">{errors.description.message}</p>
                    )}
                </div>
                {/* Image URL */}
                <div>
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        {...register('image', {
                            required: 'Image URL is required',
                            pattern: {
                                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/i,
                                message: 'Enter a valid image URL',
                            },
                        })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.image && <p className="text-red-600">{errors.image.message}</p>}
                </div>
                {/* Tags */}
                <div>
                    <label className="block mb-1 font-medium">Tags (comma separated)</label>
                    <input
                        {...register('tags')}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {/* generate ai tags */}
                <button
                    type="button"
                    onClick={() => handleTag()}
                    className="text-sm bg-emerald-600 text-white px-3 py-1 rounded"
                >
                    Suggest Tags with AI
                </button>
                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        {...register('category', { required: 'Category is required' })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-600">{errors.category.message}</p>
                    )}
                </div>
                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-blue-600 text-white px-4 py-2 rounded  hover:cursor-pointer"
                    >
                        {isUpdating ? 'Updating...' : 'Update Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPostPage;
