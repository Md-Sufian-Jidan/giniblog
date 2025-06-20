'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useCreatePostMutation } from '@/features/posts/postApi';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

const categories = ['Technology', 'Design', 'Education', 'Business', 'Lifestyle'];

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch, getValues, setValue } = useForm();
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();
  const watchedTags = watch('tags');
  const [createPost, { isLoading }] = useCreatePostMutation();
  const onSubmit = async (data) => {
    const token = await getToken();
    const postPayload = {
      ...data,
      tags: data.tags.split(',').map((tag) => tag.trim()),
      date: Date.now(),
      author: user?.fullName,
      author_img: user?.imageUrl,
      author_email: user?.emailAddresses[0]?.emailAddress,
    };

    try {
      const res = await createPost({ data: postPayload, token });
      if (res.data.status === 201) {
        reset();
        router.push('/dashboard/myBlogs');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  const getTags = async () => {
    const description = getValues('description');

    if (!description) return toast.error('Add description first');
    try {
      const res = await fetch('/api/ai/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: description }),
      });
      const data = await res.json();

      if (data.tags) {
        setValue('tags', data.tags);
        toast.success('Tags suggested!');
      }
      else {
        toast.error(data.error || 'Failed to generate tags');
      }
    } catch (e) {
      toast.error('Error generating tags');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-[#7C3AED] mb-6">Write a New Blog Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Enter the blog title"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>
        {/* description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full border p-2 rounded-lg min-h-[120px]"
            placeholder="Write your blog content here"
          ></textarea>
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>
        {/* image url */}
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
        {/* tags */}
        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            {...register('tags')}
            value={watchedTags || ''}
            onChange={(e) => setValue('tags', e.target.value)}
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="e.g., design, ui, productivity"
          />
          {errors.tags && <p className="text-red-600">{errors.tags.message}</p>}
        </div>
        <button
          type="button"
          onClick={() => getTags()}
          className="text-sm bg-emerald-600 text-white px-3 py-1 rounded hover:cursor-pointer"
        >
          Suggest Tags with AI
        </button>
        {/* category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register('category', { required: true })}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-600">{errors.category.message}</p>}
        </div>
        {/* submit button */}
        <div className='text-center'>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#A78BFA] text-white px-6 py-2 rounded-lg hover:bg-[#C4B5FD] transition hover:cursor-pointer mx-2 sm:mx-auto"
          >
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;