"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Truck,
  ArrowUp,
  Clock,
  Droplets,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/utils";

// Custom TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31 0 2.6.01 3.89.02.08 1.53.72 2.87 1.83 3.87 1.12.97 2.47 1.44 3.95 1.52v4.06c-1.39-.02-2.73-.39-3.92-1.07-.38-.21-.73-.47-1.05-.75-.02 3.32.01 6.64-.02 9.96-.06 1.49-.53 2.87-1.39 4.02-1.33 1.81-3.26 2.92-5.49 3.16-1.57.17-3.08-.07-4.47-.79-2.02-1.04-3.37-2.77-3.89-4.99-.44-1.89-.13-3.72.88-5.37 1.25-2.05 3.17-3.32 5.57-3.6 1.01-.12 2.02-.03 3.01.24v4.21c-.48-.17-.98-.26-1.49-.27-1.28-.02-2.35.53-3.06 1.58-.58.85-.71 1.81-.46 2.79.31 1.24 1.17 2.05 2.42 2.3 1.13.23 2.19-.08 3.02-.82.68-.61 1.07-1.39 1.11-2.3.06-2.58.03-5.17.03-7.75V.02h-.07z" />
    </svg>
  );
}

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const mistDroplets = [
    { left: "12%", bottom: "18%", size: 5, delay: "0s", duration: "4.8s" },
    { left: "30%", bottom: "28%", size: 4, delay: "1.2s", duration: "5.5s" },
    { left: "54%", bottom: "14%", size: 6, delay: "0.7s", duration: "6.1s" },
    { left: "74%", bottom: "24%", size: 5, delay: "2.2s", duration: "5.2s" },
    { left: "88%", bottom: "16%", size: 7, delay: "1.4s", duration: "6.4s" },
    { left: "96%", bottom: "10%", size: 4, delay: "0.5s", duration: "4.7s" },
  ];

  const shopLinks = [
    { label: "Cordless Mist Brush", href: "/#shop" },
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Reviews", href: "/#reviews" },
    { label: "FAQ", href: "/#faq" },
  ];

  const supportLinks = [
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "6-Month Warranty", href: "/warranty" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Contact Concierge", href: `mailto:${siteConfig.supportEmail}` },
  ];

  const columnVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : i * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        delay: shouldReduceMotion ? 0 : 0.15 + i * 0.04,
        ease: "easeOut",
      },
    }),
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-cream/40 pt-10 sm:pt-16 pb-8 text-charcoal border-t border-soft-gray/60">
      {/* Wave / Curved Subtle Top Divider */}
      <div className="absolute top-0 inset-x-0 overflow-hidden pointer-events-none h-6 opacity-30 text-deep-sage">
        <motion.div
          animate={shouldReduceMotion ? {} : { x: [-15, 15, -15] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="w-[120%] -ml-[10%] h-full"
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full fill-current"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,-10 1200,30 L1200,0 L0,0 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Atmospheric Ambient Glowing Spheres */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 25, 0],
                y: [0, -20, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-blush/30 blur-[120px] -z-10"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -20, 0],
                y: [0, 20, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-lavender/35 blur-[130px] -z-10"
      />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-sage/25 blur-[110px] -z-10" />

      {/* Gentle Floating Mist Droplets (Max 6, hidden on small screens) */}
      {!shouldReduceMotion && (
        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {mistDroplets.map((d, i) => (
            <span
              key={i}
              style={{
                left: d.left,
                bottom: d.bottom,
                width: `${d.size}px`,
                height: `${d.size}px`,
                animationDelay: d.delay,
                animationDuration: d.duration,
              }}
              className="mist-particle-card absolute rounded-full bg-sage/40 blur-[1px]"
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
        {/* Main Footer Columns Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 pb-10 sm:pb-16 items-start">
          
          {/* ================= COLUMN 1: BRAND (SPAN 4) ================= */}
          <motion.div
            custom={0}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-6"
          >
            <div className="space-y-3 sm:space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 group"
              >
                <span className="font-serif text-3xl font-bold tracking-tight text-deep-sage group-hover:text-[#4d5e45] transition-colors">
                  {siteConfig.name}
                </span>
                <Droplets className="w-5 h-5 text-deep-sage opacity-75 -mt-1 group-hover:scale-110 transition-transform" />
              </Link>
              <p className="text-xs sm:text-sm text-charcoal/75 max-w-xs leading-relaxed font-light">
                Gentle everyday hair care. Mist, massage and detangle in one cordless brush.
              </p>
            </div>

            {/* Glass Social Orbit */}
            <div className="pt-6 sm:pt-8 flex items-center gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-deep-sage backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-blush hover:shadow-md border border-white group"
              >
                <Instagram className="h-4 w-4 fill-current group-hover:animate-wiggle" />
              </a>

              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-deep-sage backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-blush hover:shadow-md border border-white group"
              >
                <TikTokIcon className="h-4 w-4 fill-current group-hover:animate-wiggle" />
              </a>

              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-deep-sage backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-blush hover:shadow-md border border-white group"
              >
                <Facebook className="h-4 w-4 fill-current group-hover:animate-wiggle" />
              </a>
            </div>
          </motion.div>

          {/* ================= COLUMNS 2 & 3: SHOP & SUPPORT (2-COL ON MOBILE, SPAN 4 ON LG) ================= */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Shop Column */}
            <motion.div
              custom={1}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              <span className="font-serif text-lg font-semibold text-deep-sage block tracking-tight">
                Shop
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/75">
                {shopLinks.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    custom={idx}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-charcoal/75 hover:text-deep-sage transition-all duration-200 relative py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage rounded"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-0.5 rounded-full bg-deep-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.label}</span>
                      </span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-deep-sage/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support Column */}
            <motion.div
              custom={2}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              <span className="font-serif text-lg font-semibold text-deep-sage block tracking-tight">
                Support
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/75">
                {supportLinks.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    custom={idx}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-charcoal/75 hover:text-deep-sage transition-all duration-200 relative py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage rounded"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-0.5 rounded-full bg-deep-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.label}</span>
                      </span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-deep-sage/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ================= COLUMN 4: ATELIER DISPATCH CARD (SPAN 4) ================= */}
          <motion.div
            custom={3}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="relative rounded-3xl bg-white/80 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_16px_36px_-8px_rgba(95,115,85,0.08)] border border-white/90">
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-deep-sage block">
                  Atelier Dispatch
                </span>

                <div className="space-y-3 text-xs sm:text-sm">
                  {/* WhatsApp */}
                  <a
                    href={getWhatsAppLink("Hello Lumora, I have an inquiry.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-charcoal/80 hover:text-deep-sage transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage rounded"
                  >
                    <motion.span
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/20 text-deep-sage group-hover:bg-deep-sage group-hover:text-white transition-colors shrink-0 shadow-sm"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current group-hover:animate-wiggle"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.031 2C6.511 2 2.015 6.476 2.015 11.973c0 1.761.459 3.48 1.332 5.001L2 22l5.176-1.319c1.472.802 3.129 1.226 4.855 1.226 5.52 0 10.016-4.476 10.016-9.974C22.047 6.476 17.551 2 12.031 2zm0 18.274c-1.503 0-2.972-.397-4.253-1.151l-.305-.181-3.159.805.845-3.064-.199-.315a8.23 8.23 0 0 1-1.268-4.39c0-4.57 3.733-8.286 8.28-8.286 4.546 0 8.279 3.716 8.279 8.286 0 4.57-3.733 8.296-8.279 8.296z" />
                      </svg>
                    </motion.span>
                    <span className="font-medium tracking-wide">
                      {siteConfig.whatsappDisplay}
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="flex items-center gap-3 text-charcoal/80 hover:text-deep-sage transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage rounded"
                  >
                    <motion.span
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/20 text-deep-sage group-hover:bg-deep-sage group-hover:text-white transition-colors shrink-0 shadow-sm"
                    >
                      <Mail className="w-4 h-4 group-hover:animate-wiggle" />
                    </motion.span>
                    <span className="tracking-wide">
                      {siteConfig.supportEmail}
                    </span>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-3 text-charcoal/80">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/20 text-deep-sage shrink-0 shadow-sm">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span>{siteConfig.location}</span>
                  </div>
                </div>

                {/* Delivery Across Emirates Badge */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 rounded-full bg-cream/70 px-3.5 py-1.5 text-xs text-charcoal/80 border border-sage/25">
                    <Truck className="w-4 h-4 text-deep-sage shrink-0" />
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-deep-sage">
                      Delivery across all 7 Emirates
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Divider Line */}
        <div className="h-[1px] w-full bg-deep-sage/15" />

        {/* ================= BOTTOM BAR ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 pb-2 text-xs text-charcoal/70"
        >
          {/* Left: Legal & License */}
          <div className="space-y-0.5 text-center md:text-left">
            <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50">
              {siteConfig.tradeLicense}
            </p>
          </div>

          {/* Center: Payment Options Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Active COD Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 shadow-sm backdrop-blur-md border border-white">
              <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[11px] font-medium text-charcoal">
                Cash on Delivery
              </span>
            </div>

            {/* Coming Soon Card / Apple Pay */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3.5 py-1.5 opacity-70 backdrop-blur-sm border border-soft-gray">
              <Clock className="w-3.5 h-3.5 text-charcoal/60" />
              <span className="text-[11px] text-charcoal/70">
                Card / Apple Pay: coming soon
              </span>
            </div>
          </div>

          {/* Right: Glass Back to Top Button */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-deep-sage backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md border border-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </motion.div>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
