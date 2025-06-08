"use client"
import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from '../features/api/blogApi';
// import authReducer from '../features/auth/authSlice'; // Optional

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    // auth: authReducer, // Optional: if you have auth state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
