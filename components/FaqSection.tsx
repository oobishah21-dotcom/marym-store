"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
} from "lucide-react";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/utils";

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const whatsappFaqMessage = `Hello ${siteConfig.name}, I have a question about the mist brush.`;

  const mistDroplets = [
    { left: "10%", bottom: "12%", size: 5, delay: "0s", duration: "4.8s" },
    { left: "26%", bottom: "22%", size: 4, delay: "1.2s", duration: "5.4s" },
    { left: "48%", bottom: "10%", size: 6, delay: "0.6s", duration: "5.9s" },
    { left: "68%", bottom: "20%", size: 5, delay: "2.1s", duration: "5.1s" },
    { left: "85%", bottom: "15%", size: 7, delay: "1.5s", duration: "6.3s" },
    { left: "94%", bottom: "8%", size: 4, delay: "0.8s", duration: "4.6s" },
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

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : i * 0.07,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="faq"
      className="relative w-full py-10 sm:py-16 px-5 sm:px-6 lg:px-8 overflow-hidden bg-cream/40 scroll-mt-24"
    >
      {/* Ambient Diffuse Atmospheric Aura Gradients */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 24, 0],
                y: [0, -18, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-tertiary/20 blur-3xl -z-10"
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
        className="pointer-events-none absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-sage/25 blur-3xl -z-10"
      />
      <div className="pointer-events-none absolute -bottom-20 left-12 w-80 h-80 rounded-full bg-blush/25 blur-3xl -z-10" />

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
            <HelpCircle className="w-3.5 h-3.5 text-deep-sage" />
            <span className="text-[11px] uppercase tracking-wider text-deep-sage font-semibold">
              FAQ
            </span>
          </motion.div>

          {/* Headline with Staggered Words and Shimmer on "questions" */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-tight text-charcoal tracking-tight mb-3">
            <motion.span variants={wordVariants} className="inline-block mr-2">
              Frequently
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block mr-2">
              asked
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block pr-[0.15em] italic font-normal animate-shimmer"
            >
              questions
            </motion.span>
          </h2>

          {/* Subtext */}
          <motion.p
            variants={wordVariants}
            className="text-sm sm:text-base text-charcoal/75 max-w-md mx-auto font-light"
          >
            Everything you need to know before you order.
          </motion.p>
        </motion.div>

        {/* ================= TWO-COLUMN ASYMMETRICAL COMPOSITION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ---------- LEFT COLUMN: STICKY CONCIERGE SUPPORT CARD (4 COLS) ---------- */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-4 lg:sticky lg:top-28 w-full"
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-[28px] bg-white/80 backdrop-blur-xl shadow-[0_12px_32px_rgba(71,90,62,0.06)] border border-white/90 relative overflow-hidden">
              {/* Gentle Bobbing Chat-Bubble Icon */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sage/20 flex items-center justify-center text-deep-sage mb-5 sm:mb-6 shadow-sm border border-sage/30"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-deep-sage" />
              </motion.div>

              <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-semibold mb-2 sm:mb-3">
                Still have a question?
              </h3>

              <p className="text-xs sm:text-sm text-charcoal/75 mb-6 sm:mb-7 leading-relaxed font-light">
                Message us on WhatsApp and our Dubai ritual team will be delighted to guide your choice personally.
              </p>

              {/* Green WhatsApp Action Button with Pulsing Glow */}
              <a
                href={getWhatsAppLink(whatsappFaqMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-deep-sage text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#4d5e45] hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_6px_16px_rgba(95,115,85,0.22)] animate-pulse-glow group min-h-[48px]"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 fill-current text-white shrink-0 group-hover:scale-110 transition-transform animate-wiggle"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 2C6.511 2 2.015 6.476 2.015 11.973c0 1.761.459 3.48 1.332 5.001L2 22l5.176-1.319c1.472.802 3.129 1.226 4.855 1.226 5.52 0 10.016-4.476 10.016-9.974C22.047 6.476 17.551 2 12.031 2zm0 18.274c-1.503 0-2.972-.397-4.253-1.151l-.305-.181-3.159.805.845-3.064-.199-.315a8.23 8.23 0 0 1-1.268-4.39c0-4.57 3.733-8.286 8.28-8.286 4.546 0 8.279 3.716 8.279 8.286 0 4.57-3.733 8.296-8.279 8.296z" />
                </svg>
                <span>Chat with us</span>
              </a>

              {/* Status Bullets */}
              <div className="mt-8 pt-6 border-t border-soft-gray/70 space-y-2.5">
                <div className="flex items-center gap-2.5 text-[11px] text-charcoal/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-deep-sage shrink-0" />
                  <span>Replies during business hours</span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-charcoal/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-deep-sage shrink-0" />
                  <span>Dispatched from Dubai, UAE</span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-charcoal/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-deep-sage shrink-0" />
                  <span>Daily 9:00 AM – 9:00 PM GST</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---------- RIGHT COLUMN: ACCORDION LIST (8 COLS) ---------- */}
          <div className="lg:col-span-8 flex flex-col gap-3.5 w-full">
            {faqs.map((faq, idx) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  custom={idx}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className={`rounded-2xl transition-all duration-300 relative overflow-hidden border ${
                    isOpen
                      ? "bg-white/90 shadow-md border-deep-sage/35"
                      : "bg-white/70 shadow-sm border-white/85 hover:bg-white/85 hover:-translate-y-0.5 hover:shadow-md hover:border-sage/40"
                  }`}
                >
                  {/* Left Sage Accent Line (Grows in when opened) */}
                  {isOpen && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ transformOrigin: "top" }}
                      className="absolute left-0 top-0 bottom-0 w-1 bg-deep-sage rounded-r z-10"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-sage rounded-2xl"
                  >
                    <span className="font-sans text-sm sm:text-base text-charcoal font-medium tracking-tight pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-deep-sage text-white shadow-sm"
                          : "bg-soft-gray text-charcoal/60"
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </motion.div>
                    </div>
                  </button>

                  {/* Smooth Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1] as const,
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 8, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light"
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
