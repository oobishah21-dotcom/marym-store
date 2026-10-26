export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ProductBundle {
  id: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice: number;
  savingsText?: string;
  badge?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
  note?: string; // e.g. supplier confirmation note
}

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  basePrice: number;
  originalPrice: number;
  rating?: number;
  reviewCount?: number;
  images: string[];
  colors: ProductColor[];
  bundles: ProductBundle[];
  description: {
    overview: string;
    highlights: string[];
  };
  inTheBox: string[];
  specifications: ProductSpec[];
  shippingNotice: string;
}

export const mainProduct: ProductData = {
  id: "lumora-mist-brush-v1",
  name: "Lumora Cordless Mist Hair Brush",
  slug: "cordless-mist-hair-brush",
  tagline: "Fine nano-mist hydration, gentle scalp massage & effortless detangling in one cordless brush.",
  basePrice: 119,
  originalPrice: 199,
  // Exactly 4 gallery images: product-1.jpg, product-2.jpg, product-3.jpg, product-4.jpg
  images: [
    "/images/product-1.jpg",
    "/images/product-2.jpg",
    "/images/product-3.jpg",
    "/images/product-4.jpg",
  ],
  // Three colorways: Cream White, Blush Pink, Lavender
  colors: [
    {
      id: "cream-white",
      name: "Cream White",
      hex: "#FAF6EF",
      image: "/images/product-1.jpg",
    },
    {
      id: "blush-pink",
      name: "Blush Pink",
      hex: "#F8E1E4",
      image: "/images/product-1.jpg",
    },
    {
      id: "lavender",
      name: "Lavender",
      hex: "#E7E0F5",
      image: "/images/product-1.jpg",
    },
  ],
  bundles: [
    {
      id: "single",
      name: "1 Brush",
      quantity: 1,
      price: 119,
      originalPrice: 199,
      badge: "Standard",
    },
    {
      id: "duo",
      name: "2 Brushes (Best Value)",
      quantity: 2,
      price: 219,
      originalPrice: 398,
      savingsText: "Save AED 19 extra",
      badge: "Most Popular",
    },
  ],
  description: {
    overview:
      "The Lumora Cordless Mist Hair Brush transforms dry, unruly strands into soft, manageable hair wherever you are. Equipped with ultrasonic nano-mist technology, it emits an ultra-fine water vapor that gently quenches thirsty hair fibers while flexible, rounded bristles massage the scalp and detangle knots with minimal tension.",
    highlights: [
      "Ultrasonic nano-mist hydrates without soaking or wetting hair",
      "Flexible smooth-tip bristles offer a soothing scalp massage",
      "Gently untangles knots to reduce hair breakage and pull",
      "Helps neutralize static electricity and reduce everyday frizz",
      "100% cordless with universal USB-C rechargeable battery",
      "Detachable water tank for quick refilling with clean water",
    ],
  },
  inTheBox: [
    "1x Lumora Cordless Mist Hair Brush",
    "1x USB-C Charging Cable",
    "1x Water Refill Dropper / Pipette",
    "1x Quick Start Guide & User Manual",
  ],
  // NOTE FOR STORE OWNER: Verify specifications with your direct factory supplier before final bulk release
  specifications: [
    {
      label: "Battery Capacity",
      value: "800 mAh Lithium-ion Rechargeable",
      note: "[CONFIRM WITH SUPPLIER]",
    },
    {
      label: "Charging Port",
      value: "USB-C (universal 5V input)",
      note: "Compatible with any standard USB-C charger or power bank",
    },
    {
      label: "Charging Time",
      value: "Approx. 90 - 120 minutes",
      note: "[CONFIRM WITH SUPPLIER]",
    },
    {
      label: "Continuous Runtime",
      value: "Up to 45 minutes continuous misting (multiple weeks of daily quick sessions)",
      note: "[CONFIRM WITH SUPPLIER]",
    },
    {
      label: "Water Tank Capacity",
      value: "15 ml (Nano-atomization reservoir)",
      note: "[CONFIRM WITH SUPPLIER]",
    },
    {
      label: "Material",
      value: "Eco-friendly ABS polymer & smooth-tipped nylon bristles",
      note: "[CONFIRM WITH SUPPLIER]",
    },
    {
      label: "Net Weight",
      value: "Approx. 185 grams (Ultra-lightweight for travel)",
      note: "[CONFIRM WITH SUPPLIER]",
    },
  ],
  shippingNotice: "Dubai: 1-2 days | Other Emirates: 2-3 days",
};
