import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl }) =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          headers,
        });

        return { data: result.data };
      } catch (axiosError) {
        let err = axiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ data, token }) => ({
        url: '/posts',
        method: 'POST',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
      invalidatesTags: ['Posts'],
    }),
    getMyPosts: builder.query({
      query: (email) => ({
        url: `/posts?author_email=${email}`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET'
      }),
      providesTags: ['Posts'],
    }),
    getPosts: builder.query({
      query: ({ page = 1, search = '' }) => ({
        url: '/blogs',
        method: 'GET',
        params: { page, search },
      }),
      providesTags: ['Posts'],
    }),
    likePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/like`,
        method: 'POST',
        data: { action: 'like' },
      }),
      invalidatesTags: ['Posts'],
    }),
    dislikePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}/like`,
        method: 'POST',
        data: { action: 'dislike' },
      }),
      invalidatesTags: ['Posts'],
    }),
    commentPost: builder.mutation({
      query: ({ id, content }) => ({
        url: `/posts/${id}/comment`,
        method: 'POST',
        data: { content },
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: ({ id, data, email }) => ({
        url: `/posts/${id}/update`,
        method: 'PUT',
        data: { data, email },
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: ({ id, email }) => ({
        url: `/posts/${id}/delete`,
        method: 'DELETE',
        data: { email },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useCreatePostMutation, useGetMyPostsQuery, useGetPostByIdQuery, useGetAllPostsQuery, useGetPostsQuery, useLikePostMutation, useDislikePostMutation, useCommentPostMutation, useUpdatePostMutation, useDeletePostMutation, } = postApi;
