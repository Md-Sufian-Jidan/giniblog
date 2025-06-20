"use client"
import '@/app/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { usePathname } from 'next/navigation';
import Navbar from '@/Components/Navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/Components/Footer/Footer';

export default function App({ children }) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard');
    return (
        <Provider store={store}>
            <ClerkProvider dynamic>
                <div className={`${isDashboard ? '' : 'h-16'}`}>
                    {!isDashboard && <Navbar />}
                </div>
                {children}
                {!isDashboard && <Footer />}
            </ClerkProvider >
        </Provider>
    );
}
