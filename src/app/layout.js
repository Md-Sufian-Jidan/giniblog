import { Roboto } from "next/font/google";
import "./globals.css";
import App from '@/pages/App';
import { Toaster } from "react-hot-toast";
import "keen-slider/keen-slider.min.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata = {
  title: "GiniBlog",
  description: "GiniBlog is Blog website. With the help of the website you can write blog with ai.",
};

export default function RootLayout({ children }) {
  return (
    <App>
      <html lang="en">
        <body className={`${roboto.variable} antialiased`}>
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </body>
      </html>
    </App>
  );
}
