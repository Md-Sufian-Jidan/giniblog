import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }), // Adjust if needed
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    // Add more endpoints: updatePost, deletePost, etc.
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = blogApi;
