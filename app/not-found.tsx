import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream/30 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-soft border border-soft-gray text-center">
        <span className="font-serif text-6xl font-bold text-deep-sage block mb-2">
          404
        </span>
        <h1 className="font-serif text-2xl font-bold text-charcoal mb-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-charcoal/70 mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has moved. Let&apos;s get you back to smooth, hydrated hair.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-deep-sage text-white text-xs font-semibold hover:bg-sage-dark transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/#shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-charcoal/20 text-charcoal text-xs font-semibold hover:border-deep-sage hover:text-deep-sage transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Mist Brush</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
