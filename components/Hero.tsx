"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { mainProduct } from "@/data/products";
import { formatPrice } from "@/lib/utils";

// Lightweight rising mist droplet particle generator (14 particles)
const MIST_PARTICLES = [
  { id: 1, left: "12%", size: 6, delay: 0, duration: 9 },
  { id: 2, left: "28%", size: 4, delay: 2.5, duration: 11 },
  { id: 3, left: "42%", size: 7, delay: 4.8, duration: 10 },
  { id: 4, left: "58%", size: 5, delay: 1.2, duration: 12 },
  { id: 5, left: "74%", size: 6, delay: 3.4, duration: 9.5 },
  { id: 6, left: "86%", size: 4, delay: 5.7, duration: 10.5 },
  { id: 7, left: "20%", size: 5, delay: 6.2, duration: 11.5 },
  { id: 8, left: "65%", size: 8, delay: 7.1, duration: 13 },
  { id: 9, left: "34%", size: 4, delay: 8.3, duration: 8.5 },
  { id: 10, left: "80%", size: 6, delay: 9.6, duration: 12 },
  { id: 11, left: "48%", size: 5, delay: 1.8, duration: 10 },
  { id: 12, left: "92%", size: 4, delay: 3.9, duration: 11 },
  { id: 13, left: "16%", size: 7, delay: 5.1, duration: 12.5 },
  { id: 14, left: "54%", size: 4, delay: 7.8, duration: 9 },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Soft mouse parallax handler (max 12px)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Stagger container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.15,
      },
    },
  };

  // Headline item animation (slide up + fade in + blur removal)
  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
      filter: shouldReduceMotion ? "none" : "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-37px)] flex flex-col justify-between overflow-hidden pt-4 pb-8"
    >
      {/* ================= AMBIENT SOFT GRADIENT MESH & DRIFTING BLOOMS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF6EF] via-[#FAF3ED] to-[#F3EDF8] opacity-90" />

        {/* Ambient organic color blooms with slow drift */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-36 -left-36 w-[560px] h-[560px] rounded-full bg-blush/60 blur-[110px]"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -25, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 right-[-100px] w-[620px] h-[620px] rounded-full bg-lavender/50 blur-[130px]"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 15, 0],
                  y: [0, 18, 0],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-140px] left-1/3 w-[580px] h-[580px] rounded-full bg-sage/25 blur-[120px]"
        />

        {/* Subtle fine grain texture */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#2b2b2b_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Lightweight Rising Mist Droplet Particles */}
        {!shouldReduceMotion &&
          MIST_PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: "105vh", opacity: 0 }}
              animate={{
                y: "-10vh",
                opacity: [0, 0.45, 0.6, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
              }}
              className="absolute rounded-full bg-white/70 shadow-sm pointer-events-none blur-[0.5px]"
            />
          ))}
      </div>

      {/* ================= HERO MAIN GRID CONTENT ================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-4 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Copy & CTAs (5-6 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center max-w-xl"
          >
            {/* Pill Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 self-start bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-sm mb-6"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberGlow opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amberGlow" />
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-deep-sage">NEW</span>
              <span className="text-charcoal/30 text-xs">|</span>
              <span className="text-xs font-medium text-charcoal/80 flex items-center gap-1">
                Cordless Mist Brush
                <svg className="w-3 h-3 text-sage inline-block ml-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </motion.div>

            {/* Headline with Staggered Word Reveal */}
            <h1 className="font-serif text-[42px] sm:text-6xl xl:text-[68px] leading-[1.08] font-normal tracking-[-0.02em] text-charcoal mb-5 sm:mb-6">
              <motion.span variants={wordVariants} className="inline-block">
                Mist.
              </motion.span>
              <br />
              <motion.span variants={wordVariants} className="inline-block">
                Detangle.
              </motion.span>
              <br />
              <motion.span
                variants={wordVariants}
                className="inline-block animate-shimmer italic font-medium"
              >
                Shine.
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg text-charcoal/75 font-normal leading-relaxed mb-7 sm:mb-9 max-w-lg"
            >
              One gentle brush that mists, massages, and detangles. Soft, smooth, easier-to-manage hair, anywhere you go in the UAE heat.
            </motion.p>

            {/* Action Buttons: Full Width on Mobile */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-11">
              {/* Primary Order Button with Amber Glow Accent */}
              <Link
                href="/#shop"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-deep-sage text-white text-sm font-semibold px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:bg-[#4e6046] hover:scale-[1.02] shadow-[0_12px_28px_-6px_rgba(95,115,85,0.45)] button-shine min-h-[48px]"
              >
                {/* Tiny Amber Glow Accent with Pulse */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amberGlow opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amberGlow border-2 border-cream" />
                </span>

                <span>Order Now</span>
                <span className="text-white/60 font-normal text-xs pl-1">
                  {formatPrice(mainProduct.basePrice)}
                </span>
                <svg
                  className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* Secondary Watch Demo Button with Ripple Ring Animation */}
              <Link
                href="/#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/70 hover:bg-white text-charcoal text-sm font-medium px-6 py-3.5 sm:py-4 rounded-full border border-white/90 backdrop-blur-md transition-all duration-200 shadow-sm hover:shadow-md group min-h-[48px]"
              >
                <div className="relative w-7 h-7 flex items-center justify-center">
                  {/* Ripple Ring Animation */}
                  <span className="absolute inset-0 rounded-full bg-deep-sage/30 animate-ripple pointer-events-none" />
                  <span className="relative w-7 h-7 rounded-full bg-deep-sage/10 text-deep-sage flex items-center justify-center group-hover:bg-deep-sage group-hover:text-white transition-colors duration-200">
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <span>Watch Demo</span>
                <span className="text-charcoal/40 text-xs font-normal">0:45</span>
              </Link>
            </motion.div>

            {/* Trust Row (3 items) */}
            <motion.div
              variants={itemVariants}
              className="pt-6 sm:pt-7 border-t border-charcoal/10 grid grid-cols-3 gap-2 sm:gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sage/20 flex-shrink-0 flex items-center justify-center text-deep-sage">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6H2.25m0 0v10.5m0-10.5a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v10.5m-18 0a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal leading-tight">Cash on Delivery</p>
                  <p className="text-[11px] text-charcoal/60">Pay at your doorstep</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blush/80 flex-shrink-0 flex items-center justify-center text-deep-sage">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal leading-tight">6-Month Warranty</p>
                  <p className="text-[11px] text-charcoal/60">Direct replacement</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-lavender/80 flex-shrink-0 flex items-center justify-center text-deep-sage">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal leading-tight">7-Day Returns</p>
                  <p className="text-[11px] text-charcoal/60">Hassle-free guarantee</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Stage with Arch Frame & 3 Floating Glass Cards (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] aspect-[4/4.7] flex items-center justify-center">
              
              {/* Large Soft Sage Backing Circle for Depth */}
              <div className="absolute w-[440px] h-[440px] rounded-full bg-[#9fb391]/35 blur-2xl -top-6 -left-6 z-0" />
              
              {/* Ambient blush halo */}
              <div className="absolute w-[360px] h-[360px] rounded-full bg-blush/70 blur-3xl -bottom-10 right-4 z-0" />

              {/* Arch-shaped Product Showcase Container (scales in from 0.95, then gently floats up and down in 6s loop) */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  opacity: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                }}
                className="relative z-10 w-full h-full arch-frame overflow-hidden p-2.5 glass-card shadow-2xl"
              >
                <div className="relative w-full h-full arch-frame overflow-hidden bg-gradient-to-b from-[#F8E1E4]/40 via-[#FAF6EF]/60 to-[#E7E0F5]/50">
                  <Image
                    src="/images/hero.jpg"
                    alt={`${siteConfig.name} Cordless Rechargeable Mist Hair Brush editorial shoot with 3 colorways`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="arch-frame object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Inner gentle gradient shade at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none" />

                  {/* Live UAE Availability Badge at bottom right of arch */}
                  <div className="absolute bottom-5 right-5 z-20 bg-white/85 backdrop-blur-md py-1.5 px-3.5 rounded-full border border-white/90 text-[11px] font-medium text-charcoal flex items-center gap-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock • Ships Tomorrow</span>
                  </div>
                </div>
              </motion.div>

              {/* ================= 3 FLOATING GLASS CARDS WITH INDEPENDENT LOOPS & MOUSE PARALLAX ================= */}

              {/* Card 1: Top-Left (Fine Nano Mist) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -9, 0],
                        x: mousePos.x * 10,
                      }
                }
                transition={{
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  x: { type: "spring", stiffness: 120, damping: 20 },
                }}
                className="absolute -top-3 -left-2 sm:-left-8 z-30 pointer-events-none scale-[0.88] sm:scale-100 origin-top-left"
              >
                <div className="glass-card rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 shadow-md">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-lavender to-blush flex items-center justify-center text-deep-sage shadow-inner shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold text-charcoal">Fine Nano Mist</p>
                    <p className="text-[10px] sm:text-[11px] text-charcoal/60">0.03mm hydration aura</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Mid-Right (USB-C Rechargeable) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, 8, 0],
                        x: mousePos.x * -11,
                      }
                }
                transition={{
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  x: { type: "spring", stiffness: 110, damping: 20 },
                }}
                className="absolute top-1/3 -right-2 sm:-right-6 z-30 pointer-events-none scale-[0.88] sm:scale-100 origin-top-right"
              >
                <div className="glass-card rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 shadow-md">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sage/30 to-cream flex items-center justify-center text-deep-sage shadow-inner shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold text-charcoal">USB-C Rechargeable</p>
                    <p className="text-[10px] sm:text-[11px] text-charcoal/60">Up to 30 days per charge</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Bottom-Left (Gentle Scalp Massage - Desktop only to keep mobile clean) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -7, 0],
                        x: mousePos.x * 8,
                      }
                }
                transition={{
                  y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
                  x: { type: "spring", stiffness: 130, damping: 20 },
                }}
                className="hidden sm:block absolute -bottom-4 left-3 sm:left-6 z-30 pointer-events-none"
              >
                <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blush to-white flex items-center justify-center text-deep-sage shadow-inner shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal">Gentle Scalp Massage</p>
                    <p className="text-[11px] text-charcoal/60">Soft silicone ionic bristles</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Mist Droplet Sparkles */}
              <div className="absolute top-16 left-4 z-20 pointer-events-none opacity-80 animate-ping" style={{ animationDuration: "3.5s" }}>
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md block" />
              </div>
              <div className="absolute bottom-28 -right-2 z-20 pointer-events-none opacity-60 animate-ping" style={{ animationDuration: "4.8s" }}>
                <span className="w-2 h-2 rounded-full bg-white/90 shadow-md block" />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM SCROLL INDICATOR ================= */}
      <div className="relative z-20 pb-2 pt-1 flex justify-center items-center">
        <Link
          href="/#features"
          className="group inline-flex flex-col items-center gap-1.5 text-charcoal/50 hover:text-deep-sage transition-colors duration-200"
          aria-label="Scroll down to features"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium">Scroll</span>
          {/* Minimal mouse pill icon with looping bouncing dot */}
          <div className="w-5 h-8 rounded-full border-[1.5px] border-charcoal/30 group-hover:border-deep-sage/60 flex items-start justify-center p-1 transition-colors">
            <motion.span
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, 10, 0],
                      opacity: [1, 0.4, 1],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 rounded-full bg-deep-sage"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
