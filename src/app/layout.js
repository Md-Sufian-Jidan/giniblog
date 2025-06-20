import { Roboto } from "next/font/google";
import "./globals.css";
import App from '@/pages/App';
import { Toaster } from "react-hot-toast";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata = {
  title: "GiniBlog",
  description: "GiniBlog is Blog website. With the help of the website you can write blog with ai.",
  icons: {
    icon: '/favicon-16x16.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <App>
      <html lang="en">
        <body className={`${roboto.variable} antialiased`}>
          <div className='min-h-[calc(100vh-370px)]'>
            {children}
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </body>
      </html>
    </App>
  );
}
