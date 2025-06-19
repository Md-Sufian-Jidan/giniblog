import { postApi } from '@/features/posts/postApi';
import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '@/features/tags/tagsSlice';

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    tags: tagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
