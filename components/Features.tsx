"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Droplets,
  Sparkles,
  Waves,
  BatteryCharging,
  Wind,
  Check,
  Zap,
  Sun,
  ShieldCheck,
  Brush,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

// 10 CSS-based mist particle coordinates for large card
const CARD_MIST_PARTICLES = [
  { id: 1, left: "20%", delay: "0s", duration: "3.6s", size: 6 },
  { id: 2, left: "35%", delay: "1.2s", duration: "4.2s", size: 4 },
  { id: 3, left: "50%", delay: "0.5s", duration: "3.8s", size: 7 },
  { id: 4, left: "65%", delay: "2.1s", duration: "4.5s", size: 5 },
  { id: 5, left: "80%", delay: "1.8s", duration: "3.9s", size: 6 },
  { id: 6, left: "28%", delay: "2.7s", duration: "4.1s", size: 4 },
  { id: 7, left: "44%", delay: "3.2s", duration: "3.5s", size: 5 },
  { id: 8, left: "72%", delay: "0.9s", duration: "4.4s", size: 6 },
  { id: 9, left: "58%", delay: "2.4s", duration: "3.7s", size: 4 },
  { id: 10, left: "15%", delay: "1.5s", duration: "4.0s", size: 5 },
];

export function Features() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax on the large card image on scroll (max 20px)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-16, 16]
  );

  // Stagger container for header
  const headerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
      filter: shouldReduceMotion ? "none" : "blur(5px)",
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

  // Bento container variants
  const bentoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: 0.1,
      },
    },
  };

  // Bento card variants (staggered fade + slide up + scale 0.97 to 1)
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby="features-heading"
      className="w-full px-5 sm:px-6 max-w-[1320px] mx-auto pt-6 sm:pt-8 pb-4 sm:pb-6 relative scroll-mt-24"
    >
      {/* Atmospheric Ambient Canvas Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[680px] h-[680px] rounded-full bg-sage/20 blur-[130px] -z-10" />
      <div className="pointer-events-none absolute top-96 -right-32 w-[620px] h-[620px] rounded-full bg-blush/35 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-[850px] left-[-100px] w-[540px] h-[540px] rounded-full bg-lavender/30 blur-[120px] -z-10" />

      {/* Editorial Header Stack */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-16"
      >
        {/* Label Pill */}
        <motion.div
          variants={wordVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/20 text-deep-sage font-medium text-xs tracking-[0.14em] uppercase mb-3 shadow-[0_2px_8px_rgba(71,90,62,0.06)] border border-sage/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
          <span>Why {siteConfig.name}</span>
        </motion.div>

        {/* Headline with Staggered Words and Gradient Shimmer on "care" */}
        <h2
          id="features-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight sm:leading-[52px] font-normal text-charcoal tracking-tight mb-3"
        >
          <motion.span variants={wordVariants} className="inline-block mr-2">
            Smart
          </motion.span>
          <motion.span
            variants={wordVariants}
            className="inline-block mr-2 font-serif italic animate-shimmer"
          >
            care
          </motion.span>
          <motion.span variants={wordVariants} className="inline-block mr-2">
            in
          </motion.span>
          <motion.span variants={wordVariants} className="inline-block mr-2">
            every
          </motion.span>
          <motion.span variants={wordVariants} className="inline-block">
            stroke
          </motion.span>
        </h2>

        {/* Subtitle */}
        <motion.p
          variants={wordVariants}
          className="text-base sm:text-lg text-charcoal/75 font-normal"
        >
          Mist. Massage. Shine. All in one gentle brush.
        </motion.p>
      </motion.div>

      {/* Bento Grid Canvas (3 Columns x 2 Rows) */}
      <motion.div
        variants={bentoContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* ================= TILE 1: HERO COLUMN (Spans 2 rows on lg) ================= */}
        <motion.article
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  boxShadow: "0 24px 48px -10px rgba(95, 115, 85, 0.16)",
                }
          }
          className="lg:row-span-2 rounded-3xl bg-gradient-to-b from-white via-cream to-white p-6 sm:p-8 flex flex-col justify-between shadow-[0_16px_40px_-8px_rgba(95,115,85,0.06)] border border-transparent hover:border-deep-sage/30 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Watermark Droplet Background Pattern */}
          <div className="absolute -top-10 -right-10 w-48 h-48 text-sage/20 pointer-events-none">
            <svg className="w-full h-full opacity-60" fill="currentColor" viewBox="0 0 200 200" aria-hidden="true">
              <path d="M100 15 C100 15 35 105 35 145 C35 178 64 200 100 200 C136 200 165 178 165 145 C165 105 100 15 100 15 Z" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Top row: 01 and Badge */}
            <div className="flex items-center justify-between mb-5">
              <span className="font-serif text-charcoal/25 text-[34px] sm:text-[36px] font-light select-none">
                01
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-deep-sage/10 text-deep-sage text-[11px] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-sage animate-pulse" />
                <span>Ultra-fine 0.03mm</span>
              </div>
            </div>

            {/* Arched Architectural Product Showcase Frame */}
            <div className="relative w-full aspect-[4/5] rounded-[2.2rem] bg-gradient-to-b from-sage/20 via-cream to-lavender/30 p-3 shadow-[inset_0_2px_8px_rgba(255,255,255,0.8)] overflow-hidden flex items-center justify-center mb-6">
              <div className="absolute w-56 h-56 rounded-full bg-sage/30 blur-2xl" />

              {/* Rising Soft Mist Particles (CSS only, max 10) */}
              {!shouldReduceMotion &&
                CARD_MIST_PARTICLES.map((particle) => (
                  <span
                    key={particle.id}
                    style={{
                      left: particle.left,
                      bottom: "20%",
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      animationDelay: particle.delay,
                      animationDuration: particle.duration,
                    }}
                    className="mist-particle-card absolute rounded-full bg-white/80 pointer-events-none blur-[0.5px]"
                  />
                ))}

              {/* Floating Product Image with 6s gentle float and scroll parallax */}
              <motion.div
                style={{ y: parallaxY }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full h-full rounded-[1.8rem] overflow-hidden shadow-md"
              >
                <Image
                  src="/images/product-3.jpg"
                  alt={`${siteConfig.name} nano-mist spray feature close-up`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Floating Micro-Mist Indicator */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                  <Wind className="w-3.5 h-3.5 text-deep-sage" />
                  <span className="text-[10px] text-charcoal/80 font-medium">Cellular Mist</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-sage/20 flex items-center justify-center text-deep-sage mb-3 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-semibold mb-2">
              Fine Moisturizing Mist
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              A gentle micro-particle mist that delivers hydration straight to the hair fiber and scalp with every rhythmic stroke.
            </p>
          </div>
        </motion.article>

        {/* ================= TILE 2: EASY DETANGLING ================= */}
        <motion.article
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  boxShadow: "0 24px 48px -10px rgba(95, 115, 85, 0.12)",
                }
          }
          className="rounded-3xl bg-white/85 backdrop-blur-xl p-7 flex flex-col justify-between shadow-[0_8px_28px_-6px_rgba(71,90,62,0.05)] border border-transparent hover:border-deep-sage/30 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="absolute top-4 right-6 font-serif text-charcoal/20 text-[32px] font-light select-none">
            02
          </span>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blush/60 flex items-center justify-center text-charcoal mb-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-110">
              <Brush className="w-6 h-6 text-deep-sage" />
            </div>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2">
              Easy Detangling
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Flexible cushion-set bristles glide smoothly through knots and tangles with noticeably less tension and pulling.
            </p>
          </div>
          <div className="pt-6 mt-4 flex items-center gap-2 text-charcoal/65 text-xs uppercase tracking-wider font-medium">
            <Sparkles className="w-4 h-4 text-deep-sage" />
            <span>Zero Snag Tension</span>
          </div>
        </motion.article>

        {/* ================= TILE 3: SCALP MASSAGE ================= */}
        <motion.article
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  boxShadow: "0 24px 48px -10px rgba(95, 115, 85, 0.14)",
                }
          }
          className="rounded-3xl bg-sage/15 backdrop-blur-xl p-7 flex flex-col justify-between shadow-[0_8px_28px_-6px_rgba(71,90,62,0.05)] border border-transparent hover:border-deep-sage/30 transition-all duration-300 relative overflow-hidden group ring-1 ring-deep-sage/15"
        >
          <span className="absolute top-4 right-6 font-serif text-deep-sage/25 text-[32px] font-light select-none">
            03
          </span>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-deep-sage mb-5 shadow-[0_6px_16px_rgba(71,90,62,0.12)] transition-transform duration-300 group-hover:scale-110">
              <Waves className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-serif text-xl text-charcoal font-semibold">
                Soothing Scalp Massage
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-deep-sage text-white text-[10px] uppercase tracking-widest font-semibold">
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Polished, rounded bristle tips offer tactile micro-stimulation that invigorates the roots while feeling supremely gentle.
            </p>
          </div>
          <div className="pt-6 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-deep-sage text-xs tracking-wide font-medium">
              <Check className="w-4 h-4" />
              <span>Acupressure tip design</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-deep-sage animate-pulse" />
          </div>
        </motion.article>

        {/* ================= TILE 4: STATIC & FRIZZ CONTROL ================= */}
        <motion.article
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  boxShadow: "0 24px 48px -10px rgba(95, 115, 85, 0.12)",
                }
          }
          className="rounded-3xl bg-blush/25 backdrop-blur-xl p-7 flex flex-col justify-between shadow-[0_8px_28px_-6px_rgba(71,90,62,0.05)] border border-transparent hover:border-deep-sage/30 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="absolute top-4 right-6 font-serif text-charcoal/20 text-[32px] font-light select-none">
            04
          </span>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-charcoal mb-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-110">
              <Sun className="w-6 h-6 text-deep-sage" />
            </div>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2">
              Helps Reduce Static & Frizz
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Moisture diffusion neutralizes airborne dryness and Gulf humidity flyaways, leaving strands supple and glossy.
            </p>
          </div>
          <div className="pt-6 mt-4 flex items-center gap-2 text-charcoal/65 text-xs uppercase tracking-wider font-medium">
            <Sparkles className="w-4 h-4 text-deep-sage" />
            <span>Silken Finish Shield</span>
          </div>
        </motion.article>

        {/* ================= TILE 5: CORDLESS FREEDOM ================= */}
        <motion.article
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  boxShadow: "0 24px 48px -10px rgba(95, 115, 85, 0.12)",
                }
          }
          className="rounded-3xl bg-white/85 backdrop-blur-xl p-7 flex flex-col justify-between shadow-[0_8px_28px_-6px_rgba(71,90,62,0.05)] border border-transparent hover:border-deep-sage/30 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="absolute top-4 right-6 font-serif text-charcoal/20 text-[32px] font-light select-none">
            05
          </span>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sage/20 flex items-center justify-center text-deep-sage mb-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-110">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-charcoal font-semibold mb-2">
              Cordless & Rechargeable
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Universal USB-C charging with long battery endurance. Thoughtfully lightweight for seamless bedside or vanity rituals.
            </p>
          </div>
          <div className="pt-6 mt-4 flex items-center justify-between text-xs">
            <span className="text-charcoal/60 tracking-wider uppercase font-medium">
              USB-C Fast Port
            </span>
            <span className="text-deep-sage font-semibold">
              Up to 2 Weeks Use
            </span>
          </div>
        </motion.article>

        {/* ================= TILE 6: EFFORTLESS CARE & REFILL (Spans 2 cols on md/lg) ================= */}
        <motion.article
          variants={cardVariants}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  boxShadow: "0 24px 48px -10px rgba(95, 115, 85, 0.12)",
                }
          }
          className="md:col-span-2 lg:col-span-2 rounded-3xl bg-gradient-to-r from-cream via-white to-sage/15 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_8px_28px_-6px_rgba(71,90,62,0.05)] border border-transparent hover:border-deep-sage/30 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="absolute top-4 right-6 font-serif text-charcoal/20 text-[32px] font-light select-none">
            06
          </span>
          <div className="flex items-start gap-5 max-w-xl">
            <div className="w-12 h-12 rounded-2xl bg-sage/20 flex items-center justify-center text-deep-sage shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal font-semibold mb-1.5">
                Easy to Refill and Clean
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                Equipped with a magnetic-latch liquid chamber. Simply twist, add purified water, and rinse clean in seconds.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2.5 bg-white/90 px-4 py-2.5 rounded-full shadow-sm border border-soft-gray/80">
            <ShieldCheck className="w-4 h-4 text-deep-sage" />
            <span className="text-xs uppercase tracking-wider text-charcoal font-medium">
              Quick-Detach Chamber
            </span>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
