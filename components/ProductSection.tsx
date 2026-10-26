"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Check,
  ChevronDown,
  ShoppingBag,
  MessageCircle,
  Truck,
  Minus,
  Plus,
  Zap,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  ShieldCheck,
  Banknote,
  RotateCcw,
  Lock,
} from "lucide-react";
import { mainProduct } from "@/data/products";
import { siteConfig } from "@/lib/config";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { trackAddToCart } from "@/lib/analytics";

// 8 CSS-based mist droplets inside the gallery frame
const GALLERY_MIST_DROPLETS = [
  { id: 1, left: "12%", bottom: "18%", delay: "0s", duration: "4.2s", size: 5 },
  { id: 2, left: "22%", bottom: "14%", delay: "1.4s", duration: "3.8s", size: 4 },
  { id: 3, left: "78%", bottom: "20%", delay: "0.8s", duration: "4.5s", size: 6 },
  { id: 4, left: "86%", bottom: "16%", delay: "2.1s", duration: "3.9s", size: 4 },
  { id: 5, left: "18%", bottom: "25%", delay: "2.8s", duration: "4.0s", size: 5 },
  { id: 6, left: "82%", bottom: "28%", delay: "1.8s", duration: "4.3s", size: 5 },
  { id: 7, left: "30%", bottom: "12%", delay: "3.2s", duration: "3.6s", size: 4 },
  { id: 8, left: "70%", bottom: "15%", delay: "2.5s", duration: "4.1s", size: 6 },
];

export function ProductSection() {
  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  // State management
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [selectedColor, setSelectedColor] = useState(mainProduct.colors[0]);
  const [selectedBundle, setSelectedBundle] = useState(mainProduct.bundles[1] || mainProduct.bundles[0]); // Duo pre-selected as Best Value
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAddedMorph, setIsAddedMorph] = useState(false);
  const [showFlyingThumbnail, setShowFlyingThumbnail] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Refs for IntersectionObserver
  const mainCtaRef = useRef<HTMLButtonElement>(null);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    inTheBox: false,
    specs: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Gallery Navigation
  const totalImages = mainProduct.images.length;

  const navigateGallery = useCallback((newIndex: number, dir: 1 | -1) => {
    setSlideDirection(dir);
    setSelectedImageIndex((newIndex + totalImages) % totalImages);
  }, [totalImages]);

  const handlePrevSlide = () => navigateGallery(selectedImageIndex - 1, -1);
  const handleNextSlide = () => navigateGallery(selectedImageIndex + 1, 1);

  // Swipe support on main image
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrevSlide();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNextSlide();
    }
  };

  // Mouse Parallax inside Main Gallery Frame (clamped to max 10px, disabled on touch)
  const handleGalleryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  const handleGalleryMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Sticky Mini Bar IntersectionObserver
  useEffect(() => {
    const currentBtn = mainCtaRef.current;
    if (!currentBtn) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the main CTA has scrolled out of view (above the viewport)
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(currentBtn);
    return () => observer.disconnect();
  }, []);

  // Pricing calculations
  const unitPrice = selectedBundle.price;
  const totalPrice = unitPrice * quantity;
  const originalTotalPrice = selectedBundle.originalPrice * quantity;
  const discountPercent = Math.round(
    ((selectedBundle.originalPrice - selectedBundle.price) / selectedBundle.originalPrice) * 100
  );

  // Add to Cart handler with button morph & flying thumbnail
  const handleAddToCart = () => {
    addToCart({
      productId: mainProduct.id,
      productName: mainProduct.name,
      bundleId: selectedBundle.id,
      bundleName: selectedBundle.name,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      price: selectedBundle.price,
      quantity,
      image: mainProduct.images[0],
      savingsText: selectedBundle.savingsText,
    });
    trackAddToCart(mainProduct.name, selectedBundle.price, quantity);

    // Trigger button morph to "Added" for 1.5 seconds
    setIsAddedMorph(true);
    setTimeout(() => {
      setIsAddedMorph(false);
    }, 1500);

    // Trigger flying thumbnail animation toward top-right header cart
    if (!shouldReduceMotion) {
      setShowFlyingThumbnail(true);
      setTimeout(() => {
        setShowFlyingThumbnail(false);
      }, 600);
    }
  };

  // WhatsApp prefilled message
  const whatsappOrderMessage = `Hello ${siteConfig.name}, I would like to order:
• Product: ${mainProduct.name}
• Color: ${selectedColor.name}
• Bundle: ${selectedBundle.name}
• Quantity: ${quantity}
• Total: ${formatPrice(totalPrice)}
Please confirm delivery details via Cash on Delivery across UAE.`;

  // Entrance animations
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const detailsListVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const detailsItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="shop"
      className="w-full pt-4 sm:pt-6 pb-12 sm:pb-24 bg-cream/40 relative overflow-hidden scroll-mt-24 px-5 sm:px-6"
    >
      {/* Subtle Ambient Botanical Halo Backdrops */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[620px] h-[620px] rounded-full bg-blush/35 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[540px] h-[540px] rounded-full bg-sage/40 blur-[130px] -z-10" />
      <div className="pointer-events-none absolute -bottom-24 left-10 w-[580px] h-[580px] rounded-full bg-sage/30 blur-[150px] -z-10" />

      {/* MONUMENTAL FLOATING GLASS CONTAINER */}
      <div className="max-w-[1320px] mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full bg-white/75 backdrop-blur-2xl rounded-[28px] sm:rounded-[44px] shadow-[0_24px_64px_-16px_rgba(95,115,85,0.12)] p-5 sm:p-10 lg:p-12 relative border border-white/90"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ================= LEFT COLUMN: GALLERY (7 COLS) ================= */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-7 flex flex-col gap-4"
            >
              {/* Main Hero Frame */}
              <div
                onMouseMove={handleGalleryMouseMove}
                onMouseLeave={handleGalleryMouseLeave}
                className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/4.5] rounded-3xl overflow-hidden bg-gradient-to-b from-cream via-soft-gray to-cream flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.8)] group select-none"
              >
                {/* Large Breathing Sage Halo Circle */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.04, 1],
                          opacity: [0.35, 0.5, 0.35],
                        }
                  }
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-80 h-80 rounded-full bg-sage/35 blur-3xl pointer-events-none -bottom-8"
                />

                {/* Soft CSS-Only Rising Mist Droplets (corners) */}
                {!shouldReduceMotion &&
                  GALLERY_MIST_DROPLETS.map((m) => (
                    <span
                      key={m.id}
                      style={{
                        left: m.left,
                        bottom: m.bottom,
                        width: `${m.size}px`,
                        height: `${m.size}px`,
                        animationDelay: m.delay,
                        animationDuration: m.duration,
                      }}
                      className="mist-particle-card absolute rounded-full bg-white/80 pointer-events-none blur-[0.5px]"
                    />
                  ))}

                {/* Animated Image with Slide Cross-Fade, Swipe Drag & Hover Zoom */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedImageIndex}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.98,
                            x: slideDirection > 0 ? 25 : -25,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            scale: 0.98,
                            x: slideDirection > 0 ? -25 : 25,
                          }
                    }
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as const }}
                    style={{
                      x: mouseOffset.x * 0.5,
                      y: mouseOffset.y * 0.5,
                    }}
                    className="relative w-full h-full cursor-zoom-in overflow-hidden"
                    onClick={() => setIsZoomOpen(true)}
                  >
                    <Image
                      src={mainProduct.images[selectedImageIndex] || mainProduct.images[0]}
                      alt={`${mainProduct.name} - perspective ${selectedImageIndex + 1}`}
                      fill
                      priority={selectedImageIndex === 0}
                      sizes="(max-width: 1024px) 100vw, 680px"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Glass Badges */}
                {/* Top Left: USB-C */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, -5, 0],
                        }
                  }
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    x: mouseOffset.x * -0.3,
                    y: mouseOffset.y * -0.3,
                  }}
                  className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md shadow-sm text-charcoal pointer-events-none z-20 border border-white/80"
                >
                  <Zap className="w-3.5 h-3.5 text-deep-sage fill-deep-sage" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    USB-C Rechargeable
                  </span>
                </motion.div>

                {/* Top Right: Zoom Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsZoomOpen(true)}
                  aria-label="Expand image view"
                  type="button"
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-sm text-charcoal/70 hover:text-charcoal hover:bg-white transition-all flex items-center justify-center z-20 border border-white/80 focus:outline-none"
                >
                  <ZoomIn className="w-4 h-4" />
                </motion.button>

                {/* Bottom Right: Nano Mist Telemetry Indicator */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, 5, 0],
                        }
                  }
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{
                    x: mouseOffset.x * 0.3,
                    y: mouseOffset.y * 0.3,
                  }}
                  className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-charcoal pointer-events-none z-20 border border-white/80"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberGlow opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amberGlow" />
                  </span>
                  <span className="text-[11px] tracking-wide font-medium text-charcoal">
                    Fine Nano Mist Ready
                  </span>
                </motion.div>

                {/* Bottom Center: Gallery Counter Pill */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-md shadow-sm z-20 border border-white/80 pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedImageIndex}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="text-[11px] tracking-widest text-charcoal/75 font-medium block"
                    >
                      {selectedImageIndex + 1} / {totalImages}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Left / Right Chevron Controls */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  aria-label="Previous view"
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-sm text-charcoal flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity z-20 border border-white/80 focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5 text-charcoal" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  aria-label="Next view"
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-sm text-charcoal flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity z-20 border border-white/80 focus:outline-none"
                >
                  <ChevronRight className="w-5 h-5 text-charcoal" />
                </motion.button>
              </div>

              {/* Mobile Swipe Pagination Dots */}
              <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1">
                {mainProduct.images.slice(0, 4).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => navigateGallery(idx, idx > selectedImageIndex ? 1 : -1)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      selectedImageIndex === idx ? "w-6 bg-deep-sage" : "w-1.5 bg-charcoal/25"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Thumbnails Row (4 Thumbnails with layoutId Ring & Lift) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4 pt-1">
                {mainProduct.images.slice(0, 4).map((img, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ opacity: 1 }}
                      animate={{
                        y: isSelected ? -4 : 0,
                        opacity: isSelected ? 1 : 0.7,
                      }}
                      transition={{ duration: 0.25 }}
                      onClick={() => navigateGallery(idx, idx > selectedImageIndex ? 1 : -1)}
                      className="relative aspect-square rounded-2xl overflow-hidden bg-soft-gray transition-all shadow-sm focus:outline-none"
                      type="button"
                      aria-label={`Select product image ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${mainProduct.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="130px"
                      />

                      {/* Animated Active Ring via layoutId */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeThumbRing"
                          className="absolute inset-0 rounded-2xl ring-2 ring-deep-sage ring-offset-2 ring-offset-white pointer-events-none"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* ================= RIGHT COLUMN: PRODUCT DETAILS (5 COLS) ================= */}
            <motion.div
              variants={detailsListVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5"
            >
              {/* 1. Category & Title */}
              <motion.div variants={detailsItemVariants} className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-deep-sage font-semibold">
                  Lumora Dubai
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-charcoal font-semibold tracking-tight leading-snug">
                  {mainProduct.name}
                </h1>
                <p className="text-xs sm:text-sm text-charcoal/70 font-light pt-0.5">
                  Mist, massage and detangle in one gentle brush.
                </p>
              </motion.div>

              {/* 2. Price Row with Rolling AnimatePresence Transition */}
              <motion.div variants={detailsItemVariants} className="space-y-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={totalPrice}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="font-serif text-3xl sm:text-4xl text-deep-sage font-bold tracking-tight inline-block"
                    >
                      {formatPrice(totalPrice)}
                    </motion.span>
                  </AnimatePresence>

                  <span className="text-base text-charcoal/45 line-through">
                    {formatPrice(originalTotalPrice)}
                  </span>

                  {discountPercent > 0 && (
                    <motion.span
                      key={discountPercent}
                      initial={shouldReduceMotion ? false : { scale: 0.9 }}
                      animate={{ scale: [0.9, 1.08, 1] }}
                      transition={{ duration: 0.35 }}
                      className="px-2.5 py-0.5 rounded-full bg-sage/20 text-deep-sage text-xs font-semibold tracking-wider uppercase"
                    >
                      {discountPercent}% OFF BUNDLE
                    </motion.span>
                  )}
                </div>
                <p className="text-[11px] text-charcoal/60">
                  Price includes {siteConfig.vatRate * 100}% UAE VAT • Free UAE Express Shipping
                </p>
              </motion.div>

              <div className="w-full h-px bg-soft-gray/80" />

              {/* 3. COLOR SELECTOR */}
              <motion.div variants={detailsItemVariants} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-charcoal font-medium">
                    Color:
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedColor.id}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}
                      transition={{ duration: 0.18 }}
                      className="text-xs font-semibold text-deep-sage"
                    >
                      {selectedColor.name}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 pt-0.5">
                  {mainProduct.colors.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <motion.button
                        key={color.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color.name}`}
                        type="button"
                        className="w-10 h-10 rounded-full shadow-inner relative flex items-center justify-center transition-all focus:outline-none"
                        style={{ backgroundColor: color.hex }}
                      >
                        {/* Animated Selection Ring via layoutId */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeColorRing"
                            className="absolute -inset-1 rounded-full ring-2 ring-deep-sage ring-offset-2 ring-offset-white pointer-events-none"
                            transition={{ type: "spring", stiffness: 450, damping: 28 }}
                          />
                        )}

                        {/* Animated Checkmark Pop */}
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-deep-sage" />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* 4. BUNDLE SELECTOR (Radio Cards) */}
              <motion.div variants={detailsItemVariants} className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-charcoal font-medium block">
                  Select Bundle:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                  {mainProduct.bundles.map((bundle) => {
                    const isSelected = selectedBundle.id === bundle.id;
                    return (
                      <motion.div
                        key={bundle.id}
                        whileHover={shouldReduceMotion ? {} : { y: -2 }}
                        onClick={() => setSelectedBundle(bundle)}
                        className={`cursor-pointer rounded-2xl p-4 transition-all flex flex-col justify-between relative shadow-sm border ${
                          isSelected
                            ? "bg-sage/15 border-deep-sage ring-2 ring-deep-sage ring-offset-1 ring-offset-white"
                            : "bg-white/80 border-soft-gray hover:bg-white"
                        }`}
                      >
                        {/* Best Value Badge with Gentle Shimmer */}
                        {bundle.badge && (
                          <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-deep-sage text-white text-[10px] uppercase tracking-wider font-semibold shadow-sm animate-shimmer">
                            {bundle.badge}
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm font-semibold text-charcoal">
                            {bundle.name}
                          </span>
                          {/* Animated Radio Circle & Dot */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelected ? "border-deep-sage" : "border-charcoal/30"
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                className="w-2.5 h-2.5 rounded-full bg-deep-sage"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex items-baseline justify-between">
                          <span
                            className={`font-serif text-lg font-bold ${
                              isSelected ? "text-deep-sage" : "text-charcoal"
                            }`}
                          >
                            {formatPrice(bundle.price)}
                          </span>
                          <span className="text-xs text-charcoal/45 line-through">
                            {formatPrice(bundle.originalPrice)}
                          </span>
                        </div>

                        {bundle.savingsText ? (
                          <span className="text-[11px] text-deep-sage font-semibold mt-1">
                            {bundle.savingsText}
                          </span>
                        ) : (
                          <span className="text-[11px] text-charcoal/60 mt-1">
                            Single Ritual
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* 5. QUANTITY & LIVE AVAILABILITY */}
              <motion.div
                variants={detailsItemVariants}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1"
              >
                {/* Quantity Stepper */}
                <div className="inline-flex items-center rounded-full bg-white/90 border border-soft-gray px-2 py-1 shadow-sm w-fit">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:bg-cream transition-all focus:outline-none"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </motion.button>

                  <div className="w-10 text-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={quantity}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="font-serif text-sm font-bold text-charcoal block"
                      >
                        {quantity}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/70 hover:text-charcoal hover:bg-cream transition-all focus:outline-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* Live Availability Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-soft-gray/80 shadow-sm w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-[11px] tracking-wide text-charcoal font-medium">
                    Ready to ship in UAE • In stock
                  </span>
                </div>
              </motion.div>

              {/* 6. ACTION BUTTONS */}
              <motion.div variants={detailsItemVariants} className="space-y-3 pt-2">
                {/* Primary Add to Cart Button */}
                <motion.button
                  ref={mainCtaRef}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  type="button"
                  className="w-full py-4 px-6 rounded-full bg-deep-sage text-white text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_12px_28px_-6px_rgba(71,90,62,0.35)] hover:bg-[#4d5e45] transition-all animate-pulse-glow button-shine focus:outline-none"
                >
                  <AnimatePresence mode="wait">
                    {isAddedMorph ? (
                      <motion.div
                        key="added"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Check className="w-5 h-5 text-white" />
                        <span>Added to Bag</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>Add to Cart • {formatPrice(totalPrice)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Secondary WhatsApp Direct Order Button */}
                <a
                  href={getWhatsAppLink(whatsappOrderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-3.5 px-6 rounded-full bg-white/85 text-charcoal text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2.5 shadow-sm border border-soft-gray hover:border-emerald-600/40 hover:text-emerald-800 hover:bg-emerald-50/50 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600 transition-transform duration-300 group-hover:rotate-12" />
                  <span>Order via WhatsApp Direct</span>
                </a>
              </motion.div>

              {/* 7. TRUST ROW (4 Pillars) */}
              <motion.div
                variants={detailsItemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="p-2.5 rounded-xl bg-white/70 border border-soft-gray/60 flex flex-col items-center gap-1 shadow-xs"
                >
                  <Banknote className="w-4 h-4 text-deep-sage" />
                  <span className="text-[10px] uppercase font-semibold text-charcoal">
                    Cash on Delivery
                  </span>
                </motion.div>

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="p-2.5 rounded-xl bg-white/70 border border-soft-gray/60 flex flex-col items-center gap-1 shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-deep-sage" />
                  <span className="text-[10px] uppercase font-semibold text-charcoal">
                    6-Mo Warranty
                  </span>
                </motion.div>

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="p-2.5 rounded-xl bg-white/70 border border-soft-gray/60 flex flex-col items-center gap-1 shadow-xs"
                >
                  <RotateCcw className="w-4 h-4 text-deep-sage" />
                  <span className="text-[10px] uppercase font-semibold text-charcoal">
                    7-Day Returns
                  </span>
                </motion.div>

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="p-2.5 rounded-xl bg-white/70 border border-soft-gray/60 flex flex-col items-center gap-1 shadow-xs"
                >
                  <Lock className="w-4 h-4 text-deep-sage" />
                  <span className="text-[10px] uppercase font-semibold text-charcoal">
                    Secure Checkout
                  </span>
                </motion.div>
              </motion.div>

              {/* 8. DELIVERY INFO GLASS CARD */}
              <motion.div
                variants={detailsItemVariants}
                className="rounded-2xl p-4 bg-white/80 border border-soft-gray/70 shadow-sm flex items-center gap-3.5"
              >
                <motion.div
                  initial={shouldReduceMotion ? { x: 0 } : { x: -14, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-deep-sage shrink-0"
                >
                  <Truck className="w-5 h-5" />
                </motion.div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-charcoal">
                    Dispatched Daily from Dubai Logistics Hub
                  </p>
                  <p className="text-[11px] text-charcoal/65">
                    Dubai & Abu Dhabi: 1–2 business days • Other Emirates: 2–3 days
                  </p>
                </div>
              </motion.div>

              {/* 9. LUXURY ACCORDIONS (with AnimatePresence) */}
              <motion.div variants={detailsItemVariants} className="space-y-2 pt-1">
                {/* Accordion 1: Description */}
                <div className="rounded-2xl bg-white/80 border border-soft-gray/70 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleAccordion("description")}
                    type="button"
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-charcoal hover:text-deep-sage transition-colors focus:outline-none"
                  >
                    <span>Trichological Performance</span>
                    <motion.span
                      animate={{ rotate: openAccordions.description ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4 text-charcoal/60" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openAccordions.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0.5 text-xs text-charcoal/75 leading-relaxed space-y-2 border-t border-soft-gray/40">
                          <p>{mainProduct.description.overview}</p>
                          <ul className="space-y-1 pl-4 list-disc text-charcoal/80">
                            {mainProduct.description.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: In The Box */}
                <div className="rounded-2xl bg-white/80 border border-soft-gray/70 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleAccordion("inTheBox")}
                    type="button"
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-charcoal hover:text-deep-sage transition-colors focus:outline-none"
                  >
                    <span>What is in the Box</span>
                    <motion.span
                      animate={{ rotate: openAccordions.inTheBox ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4 text-charcoal/60" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openAccordions.inTheBox && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0.5 text-xs text-charcoal/75 leading-relaxed border-t border-soft-gray/40">
                          <ul className="space-y-1.5">
                            {mainProduct.inTheBox.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-deep-sage shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 3: Specifications */}
                <div className="rounded-2xl bg-white/80 border border-soft-gray/70 overflow-hidden shadow-xs">
                  <button
                    onClick={() => toggleAccordion("specs")}
                    type="button"
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-charcoal hover:text-deep-sage transition-colors focus:outline-none"
                  >
                    <span>Technical Specifications</span>
                    <motion.span
                      animate={{ rotate: openAccordions.specs ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4 text-charcoal/60" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openAccordions.specs && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0.5 text-xs text-charcoal/75 leading-relaxed border-t border-soft-gray/40">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mainProduct.specifications.map((spec, i) => (
                              <div key={i} className="p-2 rounded-xl bg-soft-gray/40">
                                <span className="font-semibold text-charcoal block">
                                  {spec.label}:
                                </span>
                                <span className="text-[11px] text-charcoal/70">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ================= FULLSCREEN ZOOM PREVIEW MODAL ================= */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomOpen(false)}
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl z-10 p-2 border border-white/80"
            >
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-charcoal hover:bg-white shadow-md transition-colors"
                aria-label="Close zoom preview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={mainProduct.images[selectedImageIndex] || mainProduct.images[0]}
                  alt="Full screen product zoom"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FLYING THUMBNAIL ANIMATION ON ADD TO CART ================= */}
      <AnimatePresence>
        {showFlyingThumbnail && (
          <motion.div
            initial={{
              top: "75%",
              left: "50%",
              scale: 1,
              opacity: 0.9,
            }}
            animate={{
              top: "20px",
              left: "92%",
              scale: 0.2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="fixed pointer-events-none z-50 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-2 border-white"
          >
            <Image
              src={mainProduct.images[0]}
              alt="Added item"
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= STICKY FLOATING QUICK-BUY MINI BAR ================= */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-0 z-40 max-w-xl mx-auto pointer-events-auto"
          >
            <div className="glass-card rounded-full p-2.5 sm:p-3 shadow-2xl border border-white/95 flex items-center justify-between gap-3">
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-3 pl-1.5 min-w-0">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-sage/30 bg-cream">
                  <Image
                    src={mainProduct.images[0]}
                    alt={mainProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-charcoal truncate">
                    {mainProduct.name}
                  </h4>
                  <p className="text-[10px] text-charcoal/60 truncate">
                    {selectedColor.name} • {selectedBundle.name}
                  </p>
                </div>
              </div>

              {/* Price & Add to Cart Mini CTA */}
              <div className="flex items-center gap-2.5 shrink-0 pr-1">
                <span className="font-serif text-sm sm:text-base font-bold text-deep-sage">
                  {formatPrice(totalPrice)}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  type="button"
                  className="py-2.5 px-4 sm:px-5 rounded-full bg-deep-sage text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:bg-[#4d5e45] transition-all focus:outline-none"
                >
                  <AnimatePresence mode="wait">
                    {isAddedMorph ? (
                      <motion.span
                        key="added-mini"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default-mini"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
