import React from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Features } from "@/components/Features";
import { ProductSection } from "@/components/ProductSection";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { mainProduct } from "@/data/products";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  // Compute Schema.org JSON-LD data
  const hasReviews = reviews.length > 0;
  const averageRating = hasReviews
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: mainProduct.name,
    image: mainProduct.images.map((img) => `${siteConfig.siteUrl}${img}`),
    description: mainProduct.description.overview,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.siteUrl}/#shop`,
      priceCurrency: siteConfig.currency,
      price: mainProduct.basePrice,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  // Only include aggregateRating if real reviews exist (per guidelines)
  if (hasReviews && averageRating) {
    productJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Main Store Layout */}
      <div className="flex flex-col min-h-screen">
        {/* 1. Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Header */}
        <Header />

        <main className="flex-1">
          {/* 3. Hero */}
          <Hero />

          {/* 4. Trust Strip */}
          <TrustStrip />

          {/* 5. Features */}
          <Features />

          {/* 6. Product Section */}
          <ProductSection />

          {/* 8. How It Works */}
          <HowItWorks />

          {/* 9. Before / After */}
          <BeforeAfterSlider />

          {/* 10. Comparison Table */}
          <ComparisonTable />

          {/* 11. Reviews */}
          <ReviewsSection />

          {/* 12. FAQ */}
          <FaqSection />

          {/* 13. Final CTA Banner */}
          <FinalCta />
        </main>

        {/* 14. Footer */}
        <Footer />
      </div>
    </>
  );
}
