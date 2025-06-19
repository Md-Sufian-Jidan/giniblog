'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useGetPostsQuery } from '@/features/posts/postApi';
import { Search } from 'lucide-react';

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetPostsQuery({ page, search });
  console.log(data);

  const posts = data?.posts || [];
  const total = data?.total || 0;
  const perPage = 12;
  const totalPages = Math.ceil(total / perPage);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6 relative w-full sm:w-1/2 mx-auto">
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

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* Blog Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link href={`/blogs/${post._id}`} key={post._id}>
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
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
              className="px-4 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 hover:cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded border ${page === i + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-white hover:bg-gray-100 hover:cursor-pointer'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 hover:cursor-pointer"
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
