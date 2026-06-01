import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BITEBOX | Gourmet Fast Food & Premium Burgers",
  description: "Savor the best truffle smashed burgers, loaded gourmet fries, and sourdough pizzas. Handcrafted daily with fresh local ingredients and delivered warm in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-zinc-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300"
        suppressHydrationWarning
      >
        <MenuProvider>{children}</MenuProvider>
      </body>
    </html>
  );
}
