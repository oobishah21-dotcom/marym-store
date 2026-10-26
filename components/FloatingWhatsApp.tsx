import React from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/utils";

export function FloatingWhatsApp() {
  const defaultMessage = `Hi ${siteConfig.name}, I'm interested in the Cordless Mist Brush and would like to ask a quick question.`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <a
        href={getWhatsAppLink(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lumora on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Subtle animated pulse halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-white relative z-10" />

        {/* Hover label tooltip on desktop */}
        <span className="hidden sm:group-hover:inline-block absolute right-16 bg-charcoal text-white text-xs font-medium py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap transition-opacity">
          Chat with us on WhatsApp
        </span>
      </a>
    </aside>
  );
}
