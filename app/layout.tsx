import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { ToastNotification } from "@/components/ToastNotification";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Analytics } from "@/components/Analytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5F7355",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Cordless Rechargeable Mist Hair Brush UAE`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Mist hair brush",
    "Cordless mist brush UAE",
    "Nano mist hair spray brush",
    "Rechargeable hair brush Dubai",
    "Anti-frizz mist brush",
    "Scalp massage brush",
    "Lumora beauty",
    "Cash on delivery beauty UAE",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1000,
        height: 1000,
        alt: `${siteConfig.name} Cordless Mist Hair Brush`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-charcoal font-sans antialiased selection:bg-sage/30 selection:text-deep-sage">
        <CartProvider>
          {children}
          <CartDrawer />
          <ToastNotification />
          <FloatingWhatsApp />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
