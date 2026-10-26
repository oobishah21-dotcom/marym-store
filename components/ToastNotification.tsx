"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ToastNotification() {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white rounded-2xl shadow-soft-lg border border-sage/40 p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sage/20 text-deep-sage flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-charcoal">{toast.title}</h4>
          <p className="text-xs text-charcoal/70 mt-0.5 line-clamp-2">
            {toast.description}
          </p>
        </div>
        <button
          onClick={dismissToast}
          aria-label="Dismiss toast"
          className="text-charcoal/40 hover:text-charcoal p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
