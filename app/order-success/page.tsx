"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Truck,
  MessageCircle,
  Home,
  ShieldCheck,
  PackageCheck,
  Calendar,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { trackPurchase } from "@/lib/analytics";

interface StoredOrder {
  orderId: string;
  customerName: string;
  phone: string;
  emirate: string;
  address: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  items: {
    name: string;
    color: string;
    bundle: string;
    quantity: number;
    price: number;
  }[];
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#A9B89A", "#5F7355", "#F8E1E4", "#E7E0F5"],
      });
    } catch (e) {
      // Ignore if confetti fails
    }

    // Retrieve order details from session storage
    try {
      const saved = sessionStorage.getItem("lumora_last_order");
      if (saved) {
        const parsed: StoredOrder = JSON.parse(saved);
        setOrder(parsed);

        // Fire analytics purchase event once
        trackPurchase(parsed.orderId, parsed.total, parsed.items);
      }
    } catch (e) {
      console.error("Error reading last order details", e);
    }
  }, []);

  const displayOrderId = order?.orderId || orderIdFromUrl || "LUM-CONFIRMED";

  const trackWhatsAppMessage = `Hi ${siteConfig.name}, I would like to track my Cash on Delivery order: ${displayOrderId}. Can you please provide an update on dispatch?`;

  return (
    <div className="min-h-screen bg-cream/40 py-12 lg:py-20">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-soft-lg border border-soft-gray text-center animate-in fade-in zoom-in-95 duration-500">
          {/* Animated Green Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-soft">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold text-deep-sage tracking-widest uppercase bg-sage/20 px-3 py-1 rounded-full">
            Order Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight mt-3 mb-2">
            Thank you for your order!
          </h1>

          <p className="text-sm sm:text-base text-charcoal/75 max-w-md mx-auto mb-6">
            We have received your Cash on Delivery order. Our dispatch center in the UAE is now preparing your Lumora Mist Brush.
          </p>

          {/* Order ID Box */}
          <div className="bg-cream/80 border border-sage/30 rounded-2xl p-4.5 mb-8 max-w-md mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider block">
                Your Order Reference
              </span>
              <span className="font-mono text-lg font-bold text-deep-sage tracking-wide">
                {displayOrderId}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider block">
                Payment Due
              </span>
              <span className="text-sm font-bold text-charcoal">
                {order ? formatPrice(order.total) : "Cash on Delivery"}
              </span>
            </div>
          </div>

          {/* Delivery & Schedule Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
            <div className="p-4 rounded-2xl bg-soft-gray/40 border border-soft-gray flex items-start gap-3">
              <Truck className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-charcoal">Estimated Delivery</h4>
                <p className="text-xs text-charcoal/70 mt-0.5">
                  Dubai & Sharjah: <strong>1-2 business days</strong><br />
                  Other Emirates: <strong>2-3 business days</strong>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-soft-gray/40 border border-soft-gray flex items-start gap-3">
              <PackageCheck className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-charcoal">Payment Instruction</h4>
                <p className="text-xs text-charcoal/70 mt-0.5">
                  Please have the cash ready for the courier. The courier will contact you prior to arrival.
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Items Summary (if present) */}
          {order && order.items && order.items.length > 0 && (
            <div className="mb-8 text-left border border-soft-gray rounded-2xl p-4 sm:p-5 bg-white">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-3 pb-2 border-b border-soft-gray">
                Items in this package
              </h3>
              <div className="divide-y divide-soft-gray/60">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-charcoal">{item.name}</p>
                      <p className="text-charcoal/60">
                        {item.color} • {item.bundle} (Qty: {item.quantity})
                      </p>
                    </div>
                    <span className="font-bold text-charcoal font-serif">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-2 border-t border-soft-gray flex justify-between text-xs text-charcoal/80">
                <span>Shipping Fee</span>
                <span className="font-semibold">
                  {order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={getWhatsAppLink(trackWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-soft transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Track on WhatsApp</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-charcoal/20 hover:border-deep-sage hover:text-deep-sage text-charcoal font-medium text-sm transition-all bg-white"
            >
              <Home className="w-4 h-4" />
              <span>Return to Store</span>
            </Link>
          </div>

          {/* Guarantee Footer */}
          <div className="mt-10 pt-6 border-t border-soft-gray/80 flex items-center justify-center gap-2 text-xs text-charcoal/60">
            <ShieldCheck className="w-4 h-4 text-deep-sage" />
            <span>Official 6-Month Lumora UAE Warranty Included</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream/40">
          <p className="text-sm font-medium text-charcoal">Loading order confirmation...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
