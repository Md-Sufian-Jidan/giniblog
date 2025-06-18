'use client';

import { useUser } from '@clerk/nextjs';
import { useGetAllPostsQuery } from '@/features/posts/postApi';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#7C3AED', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];

const Overview = () => {
  const { user } = useUser();
  const { data: posts = [], isLoading, isError } = useGetAllPostsQuery();

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError || !user) return <p className="text-center text-red-500 mt-20">Error loading data.</p>;

  const userPosts = posts.filter(post => post.author_email === user?.emailAddresses[0]?.emailAddress);

  const categoryMap = userPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryMap).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Blog Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Total Blogs */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Total Blogs</p>
          <h2 className="text-4xl font-bold text-purple-700">{userPosts.length}</h2>
        </div>

        {/* Categories */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Categories You Used</p>
          <ul className="list-disc ml-5 text-purple-700">
            {Object.keys(categoryMap).map((cat, i) => (
              <li key={i}>{cat} ({categoryMap[cat]})</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Posts by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
