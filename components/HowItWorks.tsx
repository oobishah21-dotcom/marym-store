"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Sparkles,
  Droplets,
  Wind,
  Smile,
  Zap,
  Play,
  Activity,
  Leaf,
  CheckCircle2,
  ArrowRight,
  X,
  Heart,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoNotice, setVideoNotice] = useState(false);

  // Scroll-driven dotted line progress
  const { scrollYProgress: lineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(lineScrollProgress, [0, 1], [0, 1]);

  // Subtle parallax for overlapping lifestyle image
  const { scrollYProgress: photoScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoParallaxY = useTransform(photoScrollProgress, [0, 1], [10, -15]);

  const steps = [
    {
      step: "01",
      title: "Fill and charge",
      subtitleIcon: Zap,
      description: "Fill the compact reservoir with clean water and charge via USB-C.",
      icon: Droplets,
      gradient: "from-sage/30 to-cream",
      iconBg: "bg-sage/20 text-deep-sage",
      isActive: false,
    },
    {
      step: "02",
      title: "Mist and brush",
      subtitleIcon: null,
      badge: "Active Ritual",
      description: "Press the mist button and brush through dry or lightly damp hair.",
      icon: Wind,
      gradient: "from-deep-sage to-sage",
      iconBg: "bg-deep-sage text-white",
      isActive: true,
    },
    {
      step: "03",
      title: "Enjoy softer-feeling hair",
      subtitleIcon: Heart,
      description: "Smooth, soft hair that is easier to manage with reduced static.",
      icon: Smile,
      gradient: "from-sage/30 to-cream",
      iconBg: "bg-sage/20 text-deep-sage",
      isActive: false,
    },
  ];

  const careTips = [
    "Use clean water only (distilled or filtered recommended)",
    "Do not add styling oils, serums, or chemicals to the water chamber",
    "Empty and air-dry the tank after use to preserve the nano-nozzle",
  ];

  const mistDroplets = [
    { left: "10%", bottom: "12%", size: 5, delay: "0s", duration: "4.5s" },
    { left: "24%", bottom: "22%", size: 4, delay: "1.2s", duration: "5.2s" },
    { left: "42%", bottom: "8%", size: 6, delay: "0.6s", duration: "5.8s" },
    { left: "62%", bottom: "18%", size: 5, delay: "2.1s", duration: "4.8s" },
    { left: "78%", bottom: "25%", size: 7, delay: "1.5s", duration: "6.2s" },
    { left: "90%", bottom: "10%", size: 4, delay: "0.8s", duration: "5.0s" },
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
      x: shouldReduceMotion ? 0 : -24,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : i * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const tipItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : i * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const handlePlayClick = () => {
    if (siteConfig.demoVideoUrl) {
      setIsVideoModalOpen(true);
    } else {
      setVideoNotice(true);
      setTimeout(() => setVideoNotice(false), 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
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
        className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-blush/30 blur-3xl pointer-events-none -z-10"
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
        className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-lavender/35 blur-3xl pointer-events-none -z-10"
      />
      <div className="absolute -bottom-16 left-12 w-80 h-80 rounded-full bg-sage/20 blur-3xl pointer-events-none -z-10" />

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

      <div className="max-w-[1240px] mx-auto w-full flex flex-col items-center">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col items-center text-center max-w-xl mb-10 sm:mb-12"
        >
          {/* Pill Label */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-md shadow-sm border border-sage/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
            <span className="text-[11px] uppercase tracking-wider text-deep-sage font-semibold">
              How It Works
            </span>
          </motion.div>

          {/* Headline with Staggered Words and Shimmer on "Gentle." */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-tight text-charcoal tracking-tight mb-3">
            <motion.span variants={wordVariants} className="inline-block mr-2">
              Simple.
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block pr-[0.15em] italic font-normal animate-shimmer mr-2"
            >
              Gentle.
            </motion.span>
            <motion.span variants={wordVariants} className="inline-block">
              Effortless.
            </motion.span>
          </h2>

          {/* Subtext */}
          <motion.p
            variants={wordVariants}
            className="text-sm sm:text-base text-charcoal/75 font-light"
          >
            Three easy steps to softer-feeling hair.
          </motion.p>
        </motion.div>

        {/* ================= MAIN TWO-COLUMN RITUAL DISPLAY ================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* ---------- LEFT COLUMN: VERTICAL TIMELINE STEPS ---------- */}
          <div ref={timelineRef} className="relative flex flex-col space-y-4">
            {/* Scroll-Driven Dotted Spine */}
            <div className="absolute left-[38px] top-8 bottom-8 w-[2px] pointer-events-none z-0">
              <motion.div
                style={{
                  scaleY: shouldReduceMotion ? 1 : lineScale,
                  transformOrigin: "top",
                }}
                className="w-full h-full border-l-2 border-dotted border-deep-sage/30"
              />
            </div>

            {/* Step Cards */}
            {steps.map((s, idx) => {
              const IconComp = s.icon;
              const SubIconComp = s.subtitleIcon;

              return (
                <motion.div
                  key={s.step}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -6,
                          boxShadow: "0 18px 36px -10px rgba(95, 115, 85, 0.16)",
                          borderColor: "rgba(95, 115, 85, 0.35)",
                        }
                  }
                  className={`relative z-10 rounded-3xl p-6 transition-all duration-300 flex items-start gap-4 group cursor-default border ${
                    s.isActive
                      ? "bg-white/90 backdrop-blur-md shadow-md border-deep-sage/30"
                      : "bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md border-white/90"
                  }`}
                >
                  {/* Large Faint Number that Drifts Gently */}
                  <motion.span
                    animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.4,
                    }}
                    className="absolute top-3 right-6 font-serif text-5xl font-light text-deep-sage/15 select-none pointer-events-none"
                  >
                    {s.step}
                  </motion.span>

                  {/* Icon Bubble */}
                  <motion.div
                    variants={{
                      hidden: { scale: 0.6, opacity: 0 },
                      visible: {
                        scale: 1,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 350, damping: 22 },
                      },
                    }}
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${s.iconBg}`}
                  >
                    {/* Active Step Pulsing Ring */}
                    {s.isActive && !shouldReduceMotion && (
                      <span className="absolute inset-0 rounded-2xl bg-deep-sage/20 animate-ping pointer-events-none -z-10" />
                    )}

                    {/* Step Icon with Micro-Animation */}
                    {idx === 0 && (
                      <motion.div
                        animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <IconComp className="w-5 h-5 text-deep-sage animate-wiggle" />
                      </motion.div>
                    )}
                    {idx === 1 && (
                      <motion.div
                        animate={shouldReduceMotion ? {} : { opacity: [0.75, 1, 0.75] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <IconComp className="w-5 h-5 text-white animate-wiggle" />
                      </motion.div>
                    )}
                    {idx === 2 && (
                      <motion.div
                        animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <IconComp className="w-5 h-5 text-deep-sage animate-wiggle" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Step Content */}
                  <div className="flex flex-col pr-8">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3
                        className={`font-sans text-base sm:text-lg text-charcoal ${
                          s.isActive ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {s.title}
                      </h3>
                      {s.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-sage/30 text-deep-sage text-[10px] font-semibold uppercase tracking-wider">
                          {s.badge}
                        </span>
                      )}
                      {SubIconComp && (
                        <SubIconComp className="w-3.5 h-3.5 text-deep-sage/60" />
                      )}
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        s.isActive ? "text-charcoal/85 font-normal" : "text-charcoal/70 font-light"
                      }`}
                    >
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ---------- RIGHT COLUMN: VIDEO PREVIEW & CARE TIPS ---------- */}
          <div className="relative flex flex-col items-center lg:items-end w-full">
            {/* Breathing Sage Glow behind Video */}
            <motion.div
              animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1], opacity: [0.25, 0.35, 0.25] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-6 w-72 h-72 rounded-full bg-sage/30 blur-3xl pointer-events-none -z-10"
            />

            {/* Main Video Preview Box (16:9 Aspect Video) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative w-full aspect-video sm:h-[340px] rounded-[32px] overflow-hidden bg-gradient-to-br from-blush/25 via-white/75 to-sage/30 backdrop-blur-md shadow-lg flex flex-col items-center justify-center p-6 text-center border border-white/80 select-none"
            >
              {/* Soft Diffuse Interior Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-transparent to-cream/30 pointer-events-none" />

              {/* Looping Ripple Play Button */}
              <div className="relative z-20 flex items-center justify-center">
                {!shouldReduceMotion && (
                  <>
                    <span className="absolute w-20 h-20 rounded-full bg-deep-sage/20 animate-ping pointer-events-none" />
                    <span className="absolute w-24 h-24 rounded-full bg-sage/25 animate-pulse pointer-events-none" />
                  </>
                )}
                <motion.button
                  type="button"
                  onClick={handlePlayClick}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  aria-label="Play demonstration preview"
                  className="relative w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-deep-sage hover:bg-white transition-colors duration-200 border border-white cursor-pointer group"
                >
                  <Play className="w-7 h-7 fill-deep-sage translate-x-0.5 text-deep-sage group-hover:scale-105 transition-transform" />
                </motion.button>
              </div>

              {/* Floating Video Status Badge */}
              <div className="relative z-20 mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-soft-gray">
                <span className="w-2 h-2 rounded-full bg-deep-sage animate-pulse" />
                <span className="font-sans text-xs font-medium text-charcoal tracking-normal">
                  {siteConfig.demoVideoUrl ? "Watch 0:45 Ritual Demo" : "Demo video coming soon"}
                </span>
              </div>

              {/* Interactive Micro Bar at Bottom */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-charcoal/70 text-[11px] font-medium">
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-charcoal/80">
                  <Activity className="w-3.5 h-3.5 text-deep-sage" />
                  0:45 RITUAL DEMO
                </span>
                <span className="uppercase tracking-widest text-[9px] text-deep-sage font-semibold">
                  Ultra-fine Ultrasonic Mist
                </span>
              </div>
            </motion.div>

            {/* Overlapping Lifestyle Photographic Card */}
            <motion.div
              style={{
                y: shouldReduceMotion ? 0 : photoParallaxY,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="self-end -mt-8 sm:-mt-12 mr-2 sm:mr-6 z-20 transition-transform duration-300 hover:rotate-0 rotate-2 sm:rotate-3 shadow-xl rounded-2xl overflow-hidden bg-white p-1.5 max-w-[150px] sm:max-w-[176px] border border-white/90 cursor-default"
            >
              <div className="relative w-40 h-32 rounded-xl overflow-hidden shadow-inner bg-soft-gray">
                <Image
                  src="/images/lifestyle-1.jpg"
                  alt={`${siteConfig.name} ultrasonic mist device daily morning ritual`}
                  width={160}
                  height={128}
                  className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2 py-1.5 flex items-center justify-between">
                <span className="text-[9px] text-charcoal uppercase tracking-wider font-semibold">
                  Morning Regimen
                </span>
                <Sparkles className="w-3 h-3 text-deep-sage" />
              </div>
            </motion.div>

            {/* Care Tips Glass Panel */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full bg-white/75 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm mt-5 border border-white/85"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-deep-sage"
                >
                  <Leaf className="w-4 h-4 fill-deep-sage/20 text-deep-sage" />
                </motion.div>
                <span className="text-xs uppercase tracking-wider text-charcoal font-semibold">
                  Care Tips
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-charcoal/75 font-light">
                {careTips.map((tip, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx}
                    variants={tipItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-deep-sage shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ================= BOTTOM CONVERSION FLOATING STRIP ================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-12 flex justify-center w-full"
        >
          <a
            href="#shop"
            className="group inline-flex items-center gap-4 pl-5 pr-2 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 border border-white/90 hover:border-sage/40"
          >
            <span className="text-xs sm:text-sm font-medium text-charcoal">
              Ready to try it?
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-deep-sage group-hover:bg-[#4d5e45] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 shadow-sm button-shine">
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Video Modal if URL is configured */}
      <AnimatePresence>
        {isVideoModalOpen && siteConfig.demoVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20"
            >
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={siteConfig.demoVideoUrl}
                title="Lumora Mist Brush Demonstration"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fallback gentle feedback if no URL is set and user clicks play */}
      <AnimatePresence>
        {videoNotice && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-sage/30 flex items-center gap-2.5 text-xs text-charcoal font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-deep-sage animate-ping" />
            <span>High-definition demo video is being edited and will arrive soon!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
