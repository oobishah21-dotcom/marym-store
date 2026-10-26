"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { Sparkles } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // If flag in config is false, hide the whole section automatically
  if (!siteConfig.showBeforeAfter) {
    return null;
  }

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-soft-gray">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/20 text-deep-sage text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Results</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            See the difference
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 mt-2">
            Drag the slider left or right to see how fine nano-mist transforms dry, static hair.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-2xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-square w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-soft-gray shadow-soft-lg bg-soft-gray"
          >
            {/* After Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/after.jpg"
                alt="After using Lumora Mist Brush - smooth hydrated hair"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-deep-sage/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm backdrop-blur-sm pointer-events-none">
                AFTER LUMORA
              </div>
            </div>

            {/* Before Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 min-w-full h-full"
                  style={{ width: containerRef.current?.offsetWidth || "100%" }}
                >
                  <Image
                    src="/images/before.jpg"
                    alt="Before using Lumora Mist Brush - frizzy dry hair"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-charcoal/80 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm backdrop-blur-sm pointer-events-none">
                BEFORE
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-soft-lg flex items-center justify-center border-2 border-deep-sage">
                <div className="flex items-center gap-0.5 text-deep-sage">
                  <span className="text-xs font-bold">◀</span>
                  <span className="text-xs font-bold">▶</span>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-xs text-charcoal/50 mt-4 italic">
            Individual results may vary. For best results, use with clean water on dry or lightly damp hair.
          </p>
        </div>
      </div>
    </section>
  );
}
