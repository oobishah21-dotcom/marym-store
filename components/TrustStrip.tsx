"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Truck, Banknote, ShieldCheck, RefreshCw } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const dividerVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : 0.45,
        ease: "easeOut",
      },
    },
  };

  const items = [
    {
      icon: Truck,
      title: `Free Delivery over ${siteConfig.currency} ${siteConfig.freeShippingThreshold}`,
      desc: "Fast dispatch across all 7 Emirates",
      bgGradient: "from-sage/30 to-cream",
      textColor: "text-deep-sage",
      badge: null,
    },
    {
      icon: Banknote,
      title: "Cash on Delivery",
      desc: "Pay securely at your doorstep",
      bgGradient: "from-blush to-cream",
      textColor: "text-tertiary",
      badge: true, // pulsing live indicator
    },
    {
      icon: ShieldCheck,
      title: "6-Month Warranty",
      desc: "Reliable quality guarantee",
      bgGradient: "from-sage/25 to-soft-gray",
      textColor: "text-deep-sage",
      badge: null,
    },
    {
      icon: RefreshCw,
      title: "7-Day Easy Returns",
      desc: "Hassle-free return policy",
      bgGradient: "from-lavender/40 to-cream",
      textColor: "text-deep-sage",
      badge: null,
    },
  ];

  return (
    <section
      aria-label="Client Assurance & Delivery"
      className="w-full px-5 sm:px-6 max-w-[1320px] mx-auto my-6 sm:my-10 relative z-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_48px_-12px_rgba(95,115,85,0.08)] p-4 sm:p-7 border border-white/90 relative"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 items-start sm:items-center">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={index}>
                {/* Pillar Item */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 group cursor-default lg:px-5 py-1"
                >
                  {/* Icon Container */}
                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${item.bgGradient} flex items-center justify-center ${item.textColor} shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_12px_rgba(71,90,62,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-blush/70 group-hover:shadow-md shrink-0`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 animate-wiggle transition-transform duration-300" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-serif text-xs sm:text-base lg:text-[17px] leading-tight sm:leading-[22px] font-semibold text-charcoal tracking-tight">
                        {item.title}
                      </h3>
                      {item.badge && (
                        <span className="w-1.5 h-1.5 rounded-full bg-deep-sage animate-pulse shrink-0 hidden sm:inline-block" />
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs text-charcoal/65 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Vertical Divider between columns on lg screens */}
                {index < items.length - 1 && (
                  <motion.div
                    variants={dividerVariants}
                    style={{
                      transformOrigin: "top",
                      left: index === 0 ? "25%" : index === 1 ? "50%" : "75%",
                    }}
                    className="hidden lg:block absolute h-12 w-[1px] bg-charcoal/10"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
