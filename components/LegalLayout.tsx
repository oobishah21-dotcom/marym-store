import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated = "February 2026", children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream/20 text-charcoal">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal/70 hover:text-deep-sage mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <header className="mb-10 pb-6 border-b border-soft-gray">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-xs text-charcoal/60">
              Last Updated: {lastUpdated} • Governed by United Arab Emirates Commercial Laws
            </p>
          </header>

          <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-charcoal/80">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
