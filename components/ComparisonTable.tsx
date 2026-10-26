"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Check,
  Minus,
  Sparkles,
  Droplets,
  Brush,
  Smile,
  BatteryCharging,
  Wind,
  Star,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export function ComparisonTable() {
  const shouldReduceMotion = useReducedMotion();

  const comparisonRows = [
    {
      feature: "Hydrating mist",
      subtext: "Micro-droplet cool hydration for hair fibers",
      lumora: "Ultrasonic cool mist gently quenches dry strands",
      regular: "No hydration capability; requires separate spray bottles",
      lumoraHas: true,
      regularHas: false,
      icon: Droplets,
    },
    {
      feature: "Easy detangling",
      subtext: "Flexible smooth bristles glide with less pull",
      lumora: "Flexible smooth bristles glide with minimal tension",
      regular: "Stiff bristles can snag or pull on stubborn knots",
      lumoraHas: true,
      regularHas: true,
      icon: Brush,
    },
    {
      feature: "Scalp massage",
      subtext: "Rounded bristle tips feel gentle and relaxing",
      lumora: "Rounded bristle tips feel soothing and relaxing",
      regular: "Often sharp or scratchy on sensitive scalps",
      lumoraHas: true,
      regularHas: true,
      icon: Smile,
    },
    {
      feature: "Cordless, USB-C rechargeable",
      subtext: "Universal charging for travel and vanity rituals",
      lumora: "Universal USB-C charging for easy travel anywhere",
      regular: "Standard manual brush (no mist) or bulky corded hot tools",
      lumoraHas: true,
      regularHas: false,
      icon: BatteryCharging,
    },
    {
      feature: "Helps reduce static",
      subtext: "Fine nano-mist neutralizes flyaways naturally",
      lumora: "Fine mist neutralizes static charge naturally",
      regular: "Dry brushing can increase friction and flyaways",
      lumoraHas: true,
      regularHas: false,
      icon: Wind,
    },
  ];

  const mistDroplets = [
    { left: "12%", bottom: "14%", size: 5, delay: "0s", duration: "4.8s" },
    { left: "28%", bottom: "20%", size: 4, delay: "1.4s", duration: "5.4s" },
    { left: "46%", bottom: "10%", size: 6, delay: "0.7s", duration: "6s" },
    { left: "68%", bottom: "22%", size: 5, delay: "2.2s", duration: "5.1s" },
    { left: "84%", bottom: "16%", size: 7, delay: "1.1s", duration: "6.3s" },
    { left: "94%", bottom: "8%", size: 4, delay: "0.5s", duration: "4.6s" },
  ];

  // Animation Variants
  const headerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : 0.15 + i * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="comparison"
      className="relative w-full py-10 sm:py-16 px-5 sm:px-6 lg:px-8 overflow-hidden bg-cream/35 scroll-mt-24"
    >
      {/* Ambient Diffuse Atmospheric Aura Gradients */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 25, 0],
                y: [0, -18, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blush/30 blur-3xl -z-10"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -22, 0],
                y: [0, 20, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-lavender/35 blur-3xl -z-10"
      />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-sage/25 blur-3xl -z-10" />

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

      <div className="relative max-w-[1240px] mx-auto w-full">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          {/* Pill Label */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-sage/30 mb-3 sm:mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
            <span className="text-[11px] uppercase tracking-widest text-deep-sage font-semibold">
              Compare
            </span>
          </motion.div>

          {/* Headline with Staggered Words and Shimmer on "Mist Brush" */}
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[40px] leading-tight text-charcoal tracking-tight mb-3">
            <motion.span variants={wordVariants} className="inline-block mr-2">
              {siteConfig.name}
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block pr-[0.15em] italic font-normal animate-shimmer mr-2"
            >
              Mist Brush
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block">
              vs Regular Hairbrush
            </motion.span>
          </h2>

          {/* Subtext */}
          <motion.p
            variants={wordVariants}
            className="text-sm sm:text-base text-charcoal/75 max-w-lg mx-auto font-light"
          >
            See what a little mist and a gentle massage can add to your everyday brushing ritual.
          </motion.p>
        </motion.div>

        {/* ================= COMPARISON CARD CANVAS ================= */}
        <div className="relative mt-10 sm:mt-14 max-w-[980px] mx-auto">
          {/* Base Glass Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative rounded-[28px] sm:rounded-[32px] bg-white/75 backdrop-blur-2xl shadow-[0_24px_50px_-12px_rgba(95,115,85,0.09)] p-3.5 sm:p-8 md:p-10 border border-white/90"
          >
            {/* Grid Container with Highlight Pillar */}
            <div className="relative">
              {/* Lumora Column Background Pillar (Pops out top & bottom) */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scaleY: 1 }
                    : { opacity: 0, scaleY: 0.9 }
                }
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : 0.2,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                style={{ transformOrigin: "center" }}
                className="absolute left-[66.666%] -right-1 sm:-right-4 -top-8 sm:-top-14 -bottom-3 sm:-bottom-6 bg-gradient-to-b from-blush/35 via-white/95 to-sage/25 rounded-2xl sm:rounded-3xl shadow-[0_16px_36px_-6px_rgba(95,115,85,0.14)] border border-deep-sage/30 pointer-events-none z-0"
              >
                {/* Soft Glowing Pulsing Border */}
                {!shouldReduceMotion && (
                  <motion.div
                    animate={{ opacity: [0.45, 0.9, 0.45] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-deep-sage/35 pointer-events-none"
                  />
                )}
              </motion.div>

              {/* Column Grid Header */}
              <div className="grid grid-cols-12 items-end pb-4 sm:pb-6 relative z-10 border-b border-soft-gray/70">
                {/* Col 1 Header: Specifications Label */}
                <div className="col-span-5 pb-1 sm:pb-3 pr-1 sm:pr-2">
                  <span className="text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-charcoal/60 font-semibold">
                    Core Attributes
                  </span>
                </div>

                {/* Col 2 Header: Regular Hairbrush */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : 0.15,
                  }}
                  className="col-span-3 text-center pb-1 sm:pb-2 px-0.5 sm:px-2"
                >
                  <div className="w-8 h-8 sm:w-11 sm:h-11 mx-auto rounded-full bg-soft-gray flex items-center justify-center text-charcoal/60 shadow-inner mb-1.5 sm:mb-3">
                    <Brush className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-charcoal/60" />
                  </div>
                  <p className="font-sans text-[11px] sm:text-[15px] text-charcoal font-medium leading-tight">
                    Regular
                  </p>
                  <span className="text-[9px] sm:text-xs text-charcoal/50 hidden xs:inline block">
                    Bristles
                  </span>
                </motion.div>

                {/* Col 3 Header: Lumora Mist Brush (Elevated) */}
                <div className="col-span-4 relative -mt-7 sm:-mt-12 pt-1 sm:pt-2 px-0.5 sm:px-2 flex flex-col items-center text-center">
                  {/* Our Pick Pill with Bounce */}
                  <motion.span
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -16 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: shouldReduceMotion ? 0 : 0.35,
                    }}
                    className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-deep-sage text-white text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-sm mb-1 sm:mb-2"
                  >
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" />
                    <span>Our Pick</span>
                  </motion.span>

                  {/* Circular Product Thumbnail */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.7, opacity: 0 }
                    }
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                      delay: shouldReduceMotion ? 0 : 0.3,
                    }}
                    className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white p-0.5 sm:p-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)] mb-1 sm:mb-2 group border border-white shrink-0"
                  >
                    <Image
                      src="/images/product-1.jpg"
                      alt={`${siteConfig.name} Mist Brush`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>

                  <p className="font-sans text-[11px] sm:text-base text-deep-sage font-bold tracking-tight leading-tight">
                    {siteConfig.name}
                  </p>
                  <span className="text-[9px] sm:text-xs text-deep-sage/80 font-medium">
                    Mist Brush
                  </span>
                </div>
              </div>

              {/* Feature Rows */}
              <div className="flex flex-col divide-y divide-soft-gray/50 relative z-10">
                {comparisonRows.map((row, idx) => {
                  const IconComp = row.icon;

                  return (
                    <motion.div
                      key={idx}
                      custom={idx}
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      className="grid grid-cols-12 items-center py-3.5 sm:py-4.5 px-1.5 sm:px-3 -mx-1.5 sm:-mx-3 rounded-2xl group transition-colors duration-200 hover:bg-sage/15 cursor-default"
                    >
                      {/* Col 1: Attribute Title & Icon */}
                      <div className="col-span-5 flex items-center gap-1.5 sm:gap-3.5 pr-1 sm:pr-2">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-sage/20 flex items-center justify-center text-deep-sage shrink-0 transition-transform duration-300 group-hover:scale-110">
                          <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deep-sage animate-wiggle" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-sans text-[11px] sm:text-sm font-semibold text-charcoal tracking-tight leading-tight">
                            {row.feature}
                          </h4>
                          <p className="text-[11px] text-charcoal/65 leading-snug line-clamp-1 hidden sm:block">
                            {row.subtext}
                          </p>
                        </div>
                      </div>

                      {/* Col 2: Regular Brush State */}
                      <div className="col-span-3 flex justify-center items-center">
                        {row.regularHas ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.35,
                              delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.08,
                            }}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-soft-gray flex items-center justify-center text-charcoal/60"
                          >
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </motion.div>
                        ) : (
                          <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.35,
                              delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.08,
                            }}
                            className="inline-flex w-6 h-6 sm:w-7 sm:h-7 rounded-full items-center justify-center text-charcoal/30"
                          >
                            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </motion.span>
                        )}
                      </div>

                      {/* Col 3: Lumora State (Animated SVG Checkmark) */}
                      <div className="col-span-4 flex justify-center items-center">
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0.5, opacity: 0 }
                          }
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 24,
                            delay: shouldReduceMotion
                              ? 0
                              : 0.15 + idx * 0.08,
                          }}
                          whileHover={
                            shouldReduceMotion ? {} : { scale: 1.15 }
                          }
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-deep-sage flex items-center justify-center text-white shadow-sm shadow-deep-sage/35 transition-transform"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.75}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M20 6L9 17L4 12"
                              initial={{
                                pathLength: shouldReduceMotion ? 1 : 0,
                              }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.4,
                                delay: shouldReduceMotion
                                  ? 0
                                  : 0.22 + idx * 0.08,
                                ease: "easeOut",
                              }}
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Below Card Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.6,
            }}
            className="text-xs text-charcoal/50 text-center mt-6"
          >
            Individual results may vary.
          </motion.p>

          {/* Shop the Mist Brush CTA Pill */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="mt-6 flex justify-center w-full"
          >
            <a
              href="#shop"
              className="group flex flex-col sm:inline-flex sm:flex-row items-center gap-2 sm:gap-4 p-2 sm:pl-6 sm:pr-2 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 border border-white/90 hover:border-sage/40 hover:-translate-y-0.5 active:scale-95 text-center w-full sm:w-auto"
            >
              <span className="text-xs sm:text-sm font-medium text-charcoal py-1 sm:py-0">
                Ready for effortless daily hair care?
              </span>
              <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-deep-sage group-hover:bg-[#4d5e45] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 shadow-sm button-shine w-full sm:w-auto min-h-[44px]">
                <span>Shop the Mist Brush</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
