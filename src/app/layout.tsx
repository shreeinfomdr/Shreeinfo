import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shree Infotech | Best Computer Repair & Laptop Sales in Mundra",
  description:
    "Looking for a computer repair shop? Shree Infotech offers expert laptop repair, desktop sales, gaming PC builds, and printer services in Mundra. Purchase laptops at the best price today!",
  keywords:
    "computer repair shop, shree infotech, shree laptop repair, purchase laptop, laptop service mundra, computer shop mundra, printer repair, gaming pc mundra",
  openGraph: {
    title: "Shree Infotech | Computer Repair & Laptop Sales in Mundra",
    description: "Expert laptop repair, desktop sales, and IT solutions in Mundra.",
    url: "https://shreeinfomdr.in",
    siteName: "Shree Infotech",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Infotech | Computer Repair & Laptop Sales",
    description: "Expert laptop repair, desktop sales, and IT solutions in Mundra.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
