"use client"
import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

export default function App({ children }: AppProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
