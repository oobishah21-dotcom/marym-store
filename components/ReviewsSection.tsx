"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Star,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/utils";

export function ReviewsSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for ghost cards
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostLeftParallax = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const ghostRightParallax = useTransform(scrollYProgress, [0, 1], [16, -16]);

  if (!siteConfig.showReviews) {
    return null;
  }

  const hasReviews = reviews.length > 0;
  const averageRating = hasReviews
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const whatsappReviewMessage = `Hello ${siteConfig.name}, I would like to share my honest experience with my mist brush!`;

  const mistDroplets = [
    { left: "14%", bottom: "16%", size: 5, delay: "0s", duration: "4.8s" },
    { left: "32%", bottom: "24%", size: 4, delay: "1.3s", duration: "5.5s" },
    { left: "52%", bottom: "12%", size: 6, delay: "0.8s", duration: "6s" },
    { left: "70%", bottom: "20%", size: 5, delay: "2.3s", duration: "5.2s" },
    { left: "86%", bottom: "14%", size: 7, delay: "1.2s", duration: "6.2s" },
    { left: "95%", bottom: "8%", size: 4, delay: "0.4s", duration: "4.7s" },
  ];

  // Header Animation Variants
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

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full py-10 sm:py-16 px-5 sm:px-6 lg:px-8 overflow-hidden bg-cream/30 scroll-mt-24"
    >
      {/* Ambient Diffuse Atmospheric Aura Gradients */}
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
        className="pointer-events-none absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-blush/30 blur-3xl -z-10"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -22, 0],
                y: [0, 18, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-lavender/35 blur-3xl -z-10"
      />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-sage/20 blur-3xl -z-10" />

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
            <span className="text-[11px] uppercase tracking-wider text-deep-sage font-semibold">
              Customer Feedback
            </span>
          </motion.div>

          {/* Headline with Staggered Words and Shimmer on "experience" */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-tight text-charcoal tracking-tight mb-3">
            <motion.span variants={wordVariants} className="inline-block mr-2">
              Your
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block pr-[0.15em] italic font-normal animate-shimmer mr-2"
            >
              experience
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block">
              matters
            </motion.span>
          </h2>

          {/* Subtext */}
          <motion.p
            variants={wordVariants}
            className="text-sm sm:text-base text-charcoal/75 max-w-md mx-auto font-light"
          >
            Tried Lumora? We would love to hear what you think.
          </motion.p>
        </motion.div>

        {/* ================= CONTENT: EMPTY STATE vs FILLED STATE ================= */}
        {!hasReviews ? (
          /* ================= EMPTY STATE WITH GHOST CARDS ================= */
          <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center">
            {/* Left Ghost Preview Card */}
            <motion.div
              style={{
                y: shouldReduceMotion ? 0 : ghostLeftParallax,
              }}
              initial={
                shouldReduceMotion
                  ? { opacity: 0.55, x: 0 }
                  : { opacity: 0, x: -40 }
              }
              whileInView={{ opacity: 0.55, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="hidden xl:block absolute left-0 w-72 p-6 rounded-3xl bg-white/40 backdrop-blur-sm -rotate-2 transform scale-95 shadow-sm pointer-events-none border border-white/60 select-none -z-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-soft-gray/80 animate-pulse" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-24 bg-soft-gray/80 rounded-full" />
                  <div className="h-2 w-16 bg-soft-gray/60 rounded-full" />
                </div>
              </div>
              <div className="flex gap-1 mb-3 text-sage/40">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-soft-gray/80" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-soft-gray/70 rounded-full" />
                <div className="h-2 w-5/6 bg-soft-gray/70 rounded-full" />
                <div className="h-2 w-2/3 bg-soft-gray/50 rounded-full" />
              </div>
            </motion.div>

            {/* Central Empty State Glass Card */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, y: 24, scale: 0.97 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative z-10 w-full max-w-[720px] rounded-[28px] sm:rounded-[32px] bg-white/75 backdrop-blur-xl p-6 sm:p-12 md:p-14 text-center shadow-[0_20px_50px_-15px_rgba(71,90,62,0.08)] overflow-hidden border border-white/90"
            >
              {/* Floating Blush Atmospheric Quote Mark */}
              <motion.span
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
                className="absolute -top-6 -right-3 font-serif italic text-[160px] sm:text-[180px] leading-none text-blush/35 select-none pointer-events-none"
              >
                “
              </motion.span>

              {/* 5 Outlined Stars that Sequentially Light Up Every 6s */}
              <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <motion.div
                    key={starIndex}
                    animate={
                      shouldReduceMotion
                        ? { scale: 1, opacity: 1 }
                        : {
                            scale: [1, 1.25, 1],
                            color: [
                              "rgba(95, 115, 85, 0.25)",
                              "rgba(95, 115, 85, 1)",
                              "rgba(95, 115, 85, 1)",
                              "rgba(95, 115, 85, 0.25)",
                            ],
                          }
                    }
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      times: [
                        0,
                        0.05 + starIndex * 0.05,
                        0.6,
                        0.75 + starIndex * 0.04,
                      ],
                      ease: "easeInOut",
                    }}
                    className="text-deep-sage"
                  >
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Title & Subtext */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold mb-3 tracking-normal relative z-10"
              >
                Be the first to review
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
                className="text-xs sm:text-sm text-charcoal/75 max-w-md mx-auto mb-8 font-light leading-relaxed relative z-10"
              >
                Share your experience and help others choose with confidence. Honest feedback guides our craft across the Emirates.
              </motion.p>

              {/* WhatsApp Button with Pulsing Glow */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a
                  href={getWhatsAppLink(whatsappReviewMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-deep-sage text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#4d5e45] hover:-translate-y-0.5 active:scale-[0.97] shadow-[0_8px_20px_rgba(95,115,85,0.24)] animate-pulse-glow group min-h-[48px]"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform animate-wiggle"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.031 2C6.511 2 2.015 6.476 2.015 11.973c0 1.761.459 3.48 1.332 5.001L2 22l5.176-1.319c1.472.802 3.129 1.226 4.855 1.226 5.52 0 10.016-4.476 10.016-9.974C22.047 6.476 17.551 2 12.031 2zm0 18.274c-1.503 0-2.972-.397-4.253-1.151l-.305-.181-3.159.805.845-3.064-.199-.315a8.23 8.23 0 0 1-1.268-4.39c0-4.57 3.733-8.286 8.28-8.286 4.546 0 8.279 3.716 8.279 8.286 0 4.57-3.733 8.296-8.279 8.296z" />
                  </svg>
                  <span>Share your experience on WhatsApp</span>
                </a>
              </div>

              {/* Sub-label */}
              <p className="text-[10px] uppercase tracking-widest text-charcoal/60 mt-6 relative z-10 font-medium">
                Personal Touch • Direct Client Liaison in Dubai
              </p>
            </motion.div>

            {/* Right Ghost Preview Card */}
            <motion.div
              style={{
                y: shouldReduceMotion ? 0 : ghostRightParallax,
              }}
              initial={
                shouldReduceMotion
                  ? { opacity: 0.55, x: 0 }
                  : { opacity: 0, x: 40 }
              }
              whileInView={{ opacity: 0.55, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="hidden xl:block absolute right-0 w-72 p-6 rounded-3xl bg-white/40 backdrop-blur-sm rotate-2 transform scale-95 shadow-sm pointer-events-none border border-white/60 select-none -z-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-soft-gray/80 animate-pulse" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-20 bg-soft-gray/80 rounded-full" />
                  <div className="h-2 w-14 bg-soft-gray/60 rounded-full" />
                </div>
              </div>
              <div className="flex gap-1 mb-3 text-sage/40">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-soft-gray/80" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-soft-gray/70 rounded-full" />
                <div className="h-2 w-4/5 bg-soft-gray/70 rounded-full" />
                <div className="h-2 w-3/4 bg-soft-gray/50 rounded-full" />
              </div>
            </motion.div>
          </div>
        ) : (
          /* ================= FILLED STATE (Only when real verified reviews exist) ================= */
          <div className="space-y-10">
            {/* Rating Summary Card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-8 shadow-sm border border-white/90 text-center"
            >
              <span className="font-serif text-5xl font-bold text-deep-sage block mb-1">
                {averageRating}
              </span>
              <div className="flex justify-center text-amber-500 mb-2 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-charcoal/70">
                Based on {reviews.length} verified UAE customer review{reviews.length > 1 ? "s" : ""}
              </p>
            </motion.div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev, idx) => (
                <motion.div
                  key={rev.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -6,
                          boxShadow: "0 20px 40px -10px rgba(95, 115, 85, 0.15)",
                        }
                  }
                  className="rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-7 shadow-sm border border-white/90 flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-500 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-charcoal/50">{rev.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed italic mb-4">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-soft-gray/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-charcoal">{rev.author}</h4>
                      <p className="text-[11px] text-charcoal/60">{rev.city}, UAE</p>
                    </div>
                    {rev.verified && (
                      <motion.span
                        initial={shouldReduceMotion ? {} : { scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-deep-sage bg-sage/20 px-2.5 py-0.5 rounded-full"
                      >
                        <CheckCircle2 className="w-3 h-3 text-deep-sage" />
                        Verified Buyer
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
