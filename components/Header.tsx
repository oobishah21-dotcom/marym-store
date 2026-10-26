"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/context/CartContext";
import { getWhatsAppLink } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Features", href: "/#features" },
    { name: "Shop", href: "/#shop" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Reviews", href: "/#reviews" },
    { name: "FAQ", href: "/#faq" },
  ];

  const whatsappInquiryMessage = `Hello ${siteConfig.name}, I would like to inquire about the Cordless Mist Brush.`;

  return (
    <>
      <header className="sticky top-0 z-40 pt-2.5 sm:pt-4 px-3 sm:px-8 lg:px-12 w-full max-w-[1440px] mx-auto pointer-events-none">
        <motion.nav
          initial={shouldReduceMotion ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className={`pointer-events-auto rounded-full flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "glass-nav-scrolled px-4 sm:px-6 py-2 sm:py-2.5 shadow-md"
              : "glass-nav px-5 sm:px-7 py-2.5 sm:py-3.5 shadow-sm"
          }`}
        >
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sage/25 flex items-center justify-center text-deep-sage group-hover:bg-sage/40 transition">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-charcoal">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-deep-sage/70 font-medium pl-1 hidden lg:inline">
              Dubai
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-9 text-[13.5px] font-medium text-charcoal/80">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group py-1">
                <Link
                  href={link.href}
                  className="text-charcoal/80 hover:text-deep-sage transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage rounded"
                >
                  {link.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-deep-sage rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Right: Actions (Cart Button with Badge & Hamburger) */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Cart button */}
            <button
              onClick={openDrawer}
              aria-label={`Shopping Cart with ${itemCount} items`}
              className="relative p-2 rounded-full hover:bg-cream/80 text-charcoal/85 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal/85" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={shouldReduceMotion ? false : { scale: 0.6, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-deep-sage text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Desktop Primary "Shop Now" Button */}
            <Link
              href="/#shop"
              className="hidden sm:inline-flex items-center gap-2 bg-deep-sage text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#4d5e45] transition-all duration-200 shadow-md shadow-deep-sage/15 hover:shadow-lg hover:shadow-deep-sage/25 button-shine min-h-[44px]"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 rounded-full text-charcoal hover:bg-cream/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ================= MOBILE FULL-HEIGHT GLASS DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            />

            {/* Drawer Sliding from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="absolute inset-y-0 right-0 w-[310px] max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-white/80 flex flex-col justify-between p-6 overflow-y-auto"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-soft-gray/80">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sage/25 flex items-center justify-center text-deep-sage">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tight text-charcoal">
                      {siteConfig.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-full text-charcoal/70 hover:text-charcoal hover:bg-soft-gray transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Large Navigation Links */}
                <nav className="py-6">
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link, idx) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between py-3 px-3 rounded-2xl text-charcoal font-serif text-lg font-medium hover:bg-cream/60 hover:text-deep-sage transition-all"
                        >
                          <span>{link.name}</span>
                          <span className="text-deep-sage/40 text-sm">→</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-soft-gray/80 space-y-3">
                <Link
                  href="/#shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-deep-sage text-white text-sm font-semibold py-3.5 px-6 rounded-full shadow-md hover:bg-[#4d5e45] transition-all min-h-[48px] button-shine"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getWhatsAppLink(whatsappInquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-charcoal border border-soft-gray text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-full hover:bg-cream/50 transition-all min-h-[48px]"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 fill-emerald-600 shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.031 2C6.511 2 2.015 6.476 2.015 11.973c0 1.761.459 3.48 1.332 5.001L2 22l5.176-1.319c1.472.802 3.129 1.226 4.855 1.226 5.52 0 10.016-4.476 10.016-9.974C22.047 6.476 17.551 2 12.031 2zm0 18.274c-1.503 0-2.972-.397-4.253-1.151l-.305-.181-3.159.805.845-3.064-.199-.315a8.23 8.23 0 0 1-1.268-4.39c0-4.57 3.733-8.286 8.28-8.286 4.546 0 8.279 3.716 8.279 8.286 0 4.57-3.733 8.296-8.279 8.296z" />
                  </svg>
                  <span>WhatsApp Concierge</span>
                </a>

                <p className="text-[10px] uppercase tracking-widest text-center text-charcoal/50 pt-1 font-medium">
                  Dispatched from Dubai • Cash on Delivery
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
