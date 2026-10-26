import React from "react";
import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-sage/25 via-cream to-blush/30 border-y border-sage/20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight max-w-2xl mx-auto mb-4">
          Ready for softer, smoother-feeling hair?
        </h2>
        <p className="text-sm sm:text-base text-charcoal/75 max-w-lg mx-auto mb-8">
          Order your cordless mist brush today with fast Cash on Delivery anywhere across the United Arab Emirates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-deep-sage hover:bg-sage-dark text-white font-medium text-base shadow-soft hover:shadow-soft-md transition-all active:scale-98"
          >
            <span>Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-charcoal/70 font-medium">
          <Truck className="w-4 h-4 text-deep-sage" />
          <span>Free delivery on orders over {siteConfig.currency} {siteConfig.freeShippingThreshold} • Cash on Delivery</span>
        </div>
      </div>
    </section>
  );
}
