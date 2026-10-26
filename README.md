# Lumora — Cordless Rechargeable Mist Hair Brush Store (UAE)

A premium, production-ready ecommerce store built for the UAE market targeting customers seeking cordless nano-mist hydration, gentle detangling, and scalp massage. Fully equipped with Cash on Delivery (COD) checkout, WhatsApp ordering, server-side price recalculation, and Resend transactional email notifications.

> **Important Product Note:** This device is **100% cordless** and uses ultrasonic cool nano-mist atomization. It contains **NO heating elements**, no hot air, and requires no wall cords during use.

---

## 📸 Image Slots Reference Table

All images are stored in `/public/images/`. To replace any image with real factory photography or new studio shots, simply replace the file while preserving the filename.

| Filename | Placement & Usage | Dimensions | Description / Alt Text |
| :--- | :--- | :--- | :--- |
| `hero.jpg` | **Hero Section** (right column) | ~1000 × 1000 px | 3 colorways of the brush (Cream White, Blush Pink, Lavender) shown with model; `rounded-2xl`, `object-cover`. |
| `product-1.jpg` | **Shop Gallery - Image 1** (main display & 1st thumbnail) | ~800 × 800 px | Primary product overview (matches hero). |
| `product-2.jpg` | **Shop Gallery - Image 2** (2nd thumbnail) | ~800 × 800 px | Detailed angle showing bristles & bristle bed. |
| `product-3.jpg` | **Shop Gallery - Image 3** (3rd thumbnail) & **Features Section** | ~800 × 800 px | Close-up showing the fine nano-mist spray in action. Rendered in both the product gallery and the 6-feature card showcase. |
| `product-4.jpg` | **Shop Gallery - Image 4** (4th thumbnail) | ~800 × 800 px | Rear view showing USB-C rechargeable port and water refill inlet. |
| `lifestyle-1.jpg` | **How It Works Section** (lifestyle tab) | ~1000 × 750 px | Lifestyle usage shot shown beside the 3 steps, paired with the demo video player tab. |
| `before.jpg` | **Before/After Comparison** (left side) | ~800 × 800 px | Untreated dry, frizzy hair comparison. Hidden while `showBeforeAfter: false`. |
| `after.jpg` | **Before/After Comparison** (right side) | ~800 × 800 px | Treated smooth, hydrated shine hair. Hidden while `showBeforeAfter: false`. |

---

## ⚡ Tech Stack

- **Framework:** Next.js (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS with custom luxury beauty theme palette
- **Typography:** `Playfair Display` (serif headings) & `Inter` (body) via `next/font`
- **Icons:** `lucide-react`
- **Validation:** `zod` + `react-hook-form`
- **Transactional Emails:** `resend`
- **Animations:** Lightweight CSS & `canvas-confetti`
- **Hosting:** Optimized for zero-configuration 1-click deployment on Vercel

---

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up local environment:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build test:**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Configuration Guide

Where to edit everything in this project:

### 1. Brand Name, WhatsApp & Config Flags
Edit `lib/config.ts`:
- **`showBeforeAfter: false`**: Hides the Before/After slider until real photos are uploaded.
- **`showReviews: true`**: Renders the Reviews section (displays a clean *"Be the first to review"* card with WhatsApp feedback button while `data/reviews.ts` is empty).
- **Brand name:** `siteConfig.name` (default: `"Lumora"`)
- **Tagline:** `siteConfig.tagline` (default: `"Mist. Detangle. Shine."`)
- **WhatsApp Number:** `siteConfig.whatsappNumber` (e.g. `"971501234567"` without `+` or spaces for wa.me links)
- **Support Email & Phone:** `siteConfig.supportEmail`, `siteConfig.phone`
- **Trade License:** `siteConfig.tradeLicense` (commercial license placeholder)
- **Free Delivery Threshold:** `siteConfig.freeShippingThreshold` (default: `99` AED)
- **Delivery Fee:** `siteConfig.flatShippingFee` (default: `15` AED)
- **Demo Video URL:** `siteConfig.demoVideoUrl` (embed URL or leave empty for interactive placeholder)

### 2. Product Prices, Bundles & Specifications
Edit `data/products.ts`:
- **Single & Duo Bundle Prices:** In `mainProduct.bundles`
  - 1 Brush: `price: 119`, `originalPrice: 199`
  - 2 Brushes: `price: 219`, `originalPrice: 398`
- **Product Colors:** In `mainProduct.colors` (Cream White, Blush Pink, Lavender)
- **What's in the Box:** In `mainProduct.inTheBox`
- **Supplier Specifications:** In `mainProduct.specifications` (clearly marked with `[CONFIRM WITH SUPPLIER]` placeholders for battery capacity, runtime, tank capacity, weight, etc.)

### 3. Customer Reviews (Zero Fake Reviews Policy)
Edit `data/reviews.ts`:
- Initially set to an empty array `[]`. When empty, the store cleanly displays a **"Be the first to review"** card with a direct WhatsApp feedback button.
- As verified customers leave reviews, add them to `reviews.ts` with their name, UAE city, rating (1–5), date, and comment.

### 4. Frequently Asked Questions (FAQ)
Edit `data/faqs.ts`:
- Contains 8 realistic UAE-focused answers regarding 1–3 day delivery, Cash on Delivery, USB-C charging, water tank liquid rules (clean water only, no oils), 6-month warranty, and 7-day returns.

---

## ✉️ Setting Up Resend for Order Emails

1. Create a free account at [resend.com](https://resend.com).
2. Generate an API Key under **API Keys**.
3. Verify your sending domain (e.g. `orders@lumorabeauty.com`).
4. Set the following environment variables in Vercel or `.env.local`:
   ```env
   RESEND_API_KEY=re_123456789
   OWNER_EMAIL=your-email@example.com
   FROM_EMAIL=orders@yourdomain.com
   ```
*(Note: If `RESEND_API_KEY` is omitted, orders will still complete successfully on the website and log a notice on the server).*

---

## 🔔 Optional Order Webhook (Google Sheets, Telegram, CRM)

Set `ORDER_WEBHOOK_URL` in your environment. Every placed Cash on Delivery order will automatically POST the full order JSON to this endpoint (compatible with Zapier, Make.com, or Google Apps Script).

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and select the repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_SITE_URL`
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
   - `FROM_EMAIL`
   - *(Optional)* `ORDER_WEBHOOK_URL`
   - *(Optional)* `NEXT_PUBLIC_GA_ID`
   - *(Optional)* `NEXT_PUBLIC_META_PIXEL_ID`
4. Click **Deploy**. Vercel will automatically build and deploy with zero extra configuration.
