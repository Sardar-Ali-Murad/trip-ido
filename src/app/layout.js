import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import LayoutWrap from "@/components/layout/LayoutWrap";

export const metadata = {
  title: "trip-ido.com",
  description:
    "Discover the perfect destinations and top attractions with our comprehensive travel website. Whether you're planning a weekend getaway or a dream vacation, our platform provides a seamless experience for searching and exploring a wide range of places and attractions worldwide. From stunning natural landscapes to vibrant cities, our website empowers travelers to find their ideal destinations, book accommodations, and explore popular points of interest. Unlock a world of possibilities and create unforgettable experiences with our user-friendly search engine, curated recommendations, and insightful reviews. Start your journey today and let us guide you towards the best places and attractions, just like booking.com",
  icons: {
    icon: "/assets/logomain.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ overflowX: "hidden" }}>
        <LayoutWrap>{children}</LayoutWrap>
      </body>
    </html>
  );
}
