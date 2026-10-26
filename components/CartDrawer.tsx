"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/lib/config";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { trackInitiateCheckout } from "@/lib/analytics";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    subtotal,
    itemCount,
    updateQuantity,
    removeFromCart,
    freeShippingQualified,
    amountNeededForFreeShipping,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  // Build WhatsApp cart text
  const whatsappCartSummary = `Hi ${siteConfig.name}, I want to place an order for my cart:
${items
  .map(
    (item, idx) =>
      `${idx + 1}. ${item.productName} (${item.colorName}, ${item.bundleName}) x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
  )
  .join("\n")}

Subtotal: ${formatPrice(subtotal)}
Delivery: ${freeShippingQualified ? "FREE" : formatPrice(siteConfig.flatShippingFee)}
Total: ${formatPrice(subtotal + (freeShippingQualified ? 0 : siteConfig.flatShippingFee))}

Please take my delivery address for Cash on Delivery.`;

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / siteConfig.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer: Bottom Sheet on Mobile (<sm), Slide-in from Right on Desktop (>=sm) */}
      <div className="fixed inset-x-0 bottom-0 max-h-[88vh] sm:max-h-none sm:inset-y-0 sm:right-0 sm:left-auto sm:max-w-md w-full bg-white shadow-2xl rounded-t-[32px] sm:rounded-t-none flex flex-col justify-between animate-in slide-in-from-bottom sm:slide-in-from-right duration-300 z-50 overflow-hidden">
        {/* Subtle Mobile Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-charcoal/20 mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-soft-gray flex items-center justify-between bg-cream/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-deep-sage" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-charcoal">
              Your Shopping Bag
            </h2>
            <span className="text-xs bg-sage/20 text-deep-sage px-2 py-0.5 rounded-full font-semibold">
              {itemCount}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="p-2 rounded-xl text-charcoal/60 hover:text-charcoal hover:bg-soft-gray transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-cream/70 border-b border-sage/20">
            <div className="flex items-center gap-2 text-xs font-medium text-charcoal mb-2">
              <Truck className="w-4 h-4 text-deep-sage shrink-0" />
              <span>
                {freeShippingQualified ? (
                  <strong className="text-deep-sage font-bold">
                    You have unlocked FREE UAE Delivery!
                  </strong>
                ) : (
                  <>
                    Add{" "}
                    <strong className="text-deep-sage font-bold">
                      {formatPrice(amountNeededForFreeShipping)}
                    </strong>{" "}
                    more for Free Delivery
                  </>
                )}
              </span>
            </div>
            <div className="w-full h-2 bg-soft-gray rounded-full overflow-hidden">
              <div
                className="h-full bg-deep-sage rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-soft-gray">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-charcoal/30 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-serif font-semibold text-charcoal mb-1">
                  Your cart is empty
                </p>
                <p className="text-xs text-charcoal/60 mb-6 max-w-xs">
                  Discover smooth, hydrated hair with the Lumora cordless mist brush.
                </p>
                <button
                  onClick={closeDrawer}
                  className="px-6 py-3 rounded-2xl bg-deep-sage text-white text-xs font-semibold hover:bg-sage-dark transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-2xl bg-soft-gray overflow-hidden shrink-0 border border-soft-gray">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-charcoal truncate">
                        {item.productName}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal/40 hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-charcoal/65 mt-0.5">
                      {item.colorName} • {item.bundleName}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-soft-gray rounded-xl bg-soft-gray/30 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-charcoal font-serif">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout and WhatsApp */}
          {items.length > 0 && (
            <div className="p-6 border-t border-soft-gray bg-cream/20 flex flex-col gap-3">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-charcoal/70">Subtotal</span>
                <span className="text-base font-bold text-charcoal font-serif">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-charcoal/50 -mt-2">
                Price includes 5% UAE VAT
              </p>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                onClick={() => {
                  trackInitiateCheckout(subtotal, itemCount);
                  closeDrawer();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-deep-sage hover:bg-sage-dark text-white font-semibold text-sm shadow-soft hover:shadow-soft-md transition-all active:scale-98 min-h-[48px]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Order via WhatsApp */}
              <a
                href={getWhatsAppLink(whatsappCartSummary)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                <span>Order via WhatsApp</span>
              </a>

              <p className="text-center text-[11px] text-charcoal/60 mt-1">
                🔒 Safe & secure Cash on Delivery across UAE
              </p>
            </div>
          )}
        </div>
      </div>
  );
}
