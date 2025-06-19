'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useGetPostsQuery } from '@/features/posts/postApi';
import { Search } from 'lucide-react';
import Image from 'next/image';

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [category, setCategory] = useState('all');

  const { data, isLoading } = useGetPostsQuery({ page, search, sort, category });
  const posts = data?.posts || [];
  const total = data?.total || 0;
  const perPage = 12;
  const totalPages = Math.ceil(total / perPage);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      {/* Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search blogs by title..."
            className="w-full border border-gray-300 rounded-full px-5 py-3 pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border rounded px-3 py-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostLiked">Most Liked</option>
          </select>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* Blog Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link href={`/blogs/${post._id}`} key={post._id}>
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition duration-300">
                  <Image
                    src={post.image}
                    alt={post.title}
                    height={160}
                    width={160}
                    className="w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.description.slice(0, 80)}...</p>
                  <p className="text-sm text-purple-600 mt-2">By {post.author}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded border ${page === i + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-white hover:bg-gray-100'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default BlogList;
