'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useGetPostsQuery } from '@/features/posts/postApi';

const BlogList = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetPostsQuery({ page, search });

  const posts = data || []
  const total = data?.total || 0;
  const pages = Math.ceil(total / 10);

  return (
    <section className="p-6">
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
      {isLoading ? <p>Loading...</p> : (
        <div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link href={`/blogs/${post._id}`} key={post._id}>
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                  <img src={post.image} alt={post.title} className="h-40 w-full object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-500 text-sm">{post.description.slice(0, 80)}...</p>
                  <p className="text-sm text-purple-600 mt-2">By {post.author}</p>
                </div>
              </Link>
            ))}
          </div>
          <div>
            {/* Simple Previous/Next Pager */}
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
            <span>{page}/{pages}</span>
            <button disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogList;
