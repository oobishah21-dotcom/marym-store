export interface BrandConfig {
  name: string;
  tagline: string;
  description: string;
  supportEmail: string;
  phone: string;
  whatsappNumber: string; // Formatted without '+' or spaces for wa.me links, e.g. '971501234567'
  whatsappDisplay: string; // Formatted for display, e.g. '+971 50 123 4567'
  location: string;
  tradeLicense: string;
  currency: string;
  vatRate: number; // 0.05 for 5%
  freeShippingThreshold: number; // 99 AED
  flatShippingFee: number; // 15 AED
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
  demoVideoUrl?: string; // Optional YouTube / Vimeo or MP4 URL. If empty, shows 'Demo video coming soon' placeholder
  showBeforeAfter: boolean; // false: hide the whole Before/After section until real photos are added
  showReviews: boolean; // true: reviews section shows "Be the first to review" while data file is empty
  siteUrl: string;
  gaId?: string;
  pixelId?: string;
}

export const siteConfig: BrandConfig = {
  name: "Lumora",
  tagline: "Mist. Detangle. Shine.",
  description: "The cordless rechargeable Mist Hair Brush combining fine nano-mist hydration, gentle scalp massage, and effortless detangling. Designed for smooth, frizz-free hair across the UAE.",
  supportEmail: process.env.SUPPORT_EMAIL || "oobishah1@gmail.com",
  phone: "+92 303 9199321",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923039199321",
  whatsappDisplay: "+92 303 9199321",
  location: "Dubai, United Arab Emirates",
  tradeLicense: "DED E-Trader / Commercial License: TR-89412-DXB",
  currency: "AED",
  vatRate: 0.05,
  freeShippingThreshold: 99,
  flatShippingFee: 15,
  socials: {
    instagram: "https://instagram.com/lumora.uae",
    tiktok: "https://tiktok.com/@lumora.uae",
    facebook: "https://facebook.com/lumorabeauty",
  },
  demoVideoUrl: "", // Set to YouTube or video link, or leave empty for interactive placeholder
  showBeforeAfter: false, // Hide the whole Before/After section until real photos are added
  showReviews: true, // Reviews section shows "Be the first to review" while data file is empty
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://marym-store.vercel.app",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};

export const UAE_EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
] as const;

export type UAEEmirate = typeof UAE_EMIRATES[number];
