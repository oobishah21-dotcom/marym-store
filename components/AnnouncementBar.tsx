import React from "react";
import { siteConfig } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <aside className="relative z-50 bg-deep-sage text-white/95 text-[11px] sm:text-xs font-medium tracking-wide py-2 px-4 sm:px-6 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center truncate">
        <span className="inline-flex items-center gap-1.5 opacity-90 truncate">
          <svg className="w-3.5 h-3.5 text-sage shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-6a1 1 0 00-.293-.707l-3-3A1 1 0 0016 3H3z" />
          </svg>
          <span className="truncate">Free UAE Delivery over {siteConfig.currency} {siteConfig.freeShippingThreshold}</span>
        </span>
        <span className="text-white/40">•</span>
        <span className="opacity-90 whitespace-nowrap">Cash on Delivery</span>
        <span className="text-white/30 hidden md:inline">•</span>
        <span className="text-white/70 hidden md:inline text-[11px] font-normal tracking-normal whitespace-nowrap">Dispatched from Dubai</span>
      </div>
    </aside>
  );
}
