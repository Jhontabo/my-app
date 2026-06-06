import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BITEBOX | Comida Rápida Gourmet & Hamburguesas Premium",
  description:
    "Las mejores hamburguesas trufadas, pizzas artesanales y comida rápida gourmet de Colombia. Preparadas al instante con ingredientes locales frescos.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "BITEBOX",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "BITEBOX | Comida Rápida Gourmet",
    description:
      "Las mejores hamburguesas trufadas, pizzas artesanales y comida rápida gourmet de Colombia.",
    siteName: "BITEBOX",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className="min-h-full flex flex-col bg-neutral-950 text-neutral-50 transition-colors duration-300"
        suppressHydrationWarning
      >
        <ToastProvider>
          <MenuProvider>{children}</MenuProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
