"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  Truck,
  Banknote,
  ArrowLeft,
  Lock,
  Loader2,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { checkoutFormSchema, CheckoutFormData } from "@/lib/validation";
import { siteConfig, UAE_EMIRATES } from "@/lib/config";
import { formatPrice, calculateVatBreakdown } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    freeShippingQualified,
    clearCart,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      emirate: "Dubai",
      cityArea: "",
      streetAddress: "",
      buildingVilla: "",
      deliveryNotes: "",
      email: "",
      paymentMethod: "cod",
      hp_field: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setServerError("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const orderPayload = {
        customer: data,
        items: items.map((i) => ({
          id: i.productId,
          bundleId: i.bundleId,
          colorId: i.colorId,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to process order. Please try again.");
      }

      // Store basic order confirmation info in sessionStorage so /order-success can display it
      const successInfo = {
        orderId: result.orderId,
        customerName: data.fullName,
        phone: data.phone,
        emirate: data.emirate,
        address: `${data.buildingVilla}, ${data.streetAddress}, ${data.cityArea}`,
        total: result.pricing?.total || total,
        subtotal: result.pricing?.subtotal || subtotal,
        deliveryFee: result.pricing?.deliveryFee || deliveryFee,
        items: items.map((i) => ({
          name: i.productName,
          color: i.colorName,
          bundle: i.bundleName,
          quantity: i.quantity,
          price: i.price,
        })),
      };

      sessionStorage.setItem("lumora_last_order", JSON.stringify(successInfo));

      // Clear the cart
      clearCart();

      // Redirect to Order Success
      router.push(`/order-success?orderId=${encodeURIComponent(result.orderId)}`);
    } catch (err: unknown) {
      console.error("Order submission error:", err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { vat: vatPortion } = calculateVatBreakdown(subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream/30 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-soft border border-soft-gray text-center">
          <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-deep-sage mx-auto mb-4 border border-sage/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal mb-2">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mb-6 leading-relaxed">
            Please add the Lumora Cordless Mist Brush to your shopping bag before proceeding to checkout.
          </p>
          <Link
            href="/#shop"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-deep-sage text-white text-sm font-semibold hover:bg-sage-dark transition-colors"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30 pt-6 pb-28 sm:py-8 lg:py-14">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Top Header / Back */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-soft-gray">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal/70 hover:text-deep-sage transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight text-charcoal"
          >
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-deep-sage font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Checkout Error:</strong>
              <span>{serverError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile Collapsible Order Summary (< lg) */}
          <div className="lg:hidden mb-6 bg-white rounded-3xl border border-soft-gray overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-cream/40 hover:bg-cream/60 transition-colors cursor-pointer min-h-[48px]"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-deep-sage" />
                <span className="text-xs font-semibold text-charcoal">
                  {mobileSummaryOpen ? "Hide order summary" : "Show order summary"}
                </span>
                <span className="text-[11px] bg-sage/20 text-deep-sage font-bold px-2 py-0.5 rounded-full">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-charcoal/60 transition-transform duration-200 ${
                    mobileSummaryOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <span className="text-sm font-bold text-deep-sage font-serif">
                {formatPrice(total)}
              </span>
            </button>

            {mobileSummaryOpen && (
              <div className="p-5 border-t border-soft-gray bg-white space-y-4">
                <div className="divide-y divide-soft-gray/70 max-h-56 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-soft-gray overflow-hidden shrink-0 border border-soft-gray">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-charcoal truncate">
                          {item.productName}
                        </h4>
                        <p className="text-[11px] text-charcoal/60">
                          {item.colorName} • {item.bundleName}
                        </p>
                        <p className="text-[10px] text-charcoal/50">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-charcoal font-serif">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs border-t border-soft-gray pt-3">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span className="font-medium text-charcoal font-serif">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Delivery (UAE)</span>
                    <span className="font-medium text-charcoal">
                      {deliveryFee === 0 ? <span className="text-deep-sage font-bold">FREE</span> : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-charcoal/50 text-[11px]">
                    <span>Includes 5% UAE VAT</span>
                    <span>{formatPrice(vatPortion)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Delivery Details Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-soft-gray">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-sage/20 text-deep-sage flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="font-serif text-xl font-bold text-charcoal">
                    Delivery Address (UAE)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="e.g. Sarah Al Hashimi"
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                        errors.fullName ? "border-red-400" : "border-soft-gray"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Mobile Phone (for delivery SMS & call) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="050 123 4567 or +971 50 123 4567"
                        className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                          errors.phone ? "border-red-400" : "border-soft-gray"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Emirate Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Emirate <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("emirate")}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                        errors.emirate ? "border-red-400" : "border-soft-gray"
                      }`}
                    >
                      {UAE_EMIRATES.map((em) => (
                        <option key={em} value={em}>
                          {em}
                        </option>
                      ))}
                    </select>
                    {errors.emirate && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.emirate.message}
                      </p>
                    )}
                  </div>

                  {/* City / Area */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Area / District <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("cityArea")}
                      type="text"
                      placeholder="e.g. Dubai Marina / Downtown"
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                        errors.cityArea ? "border-red-400" : "border-soft-gray"
                      }`}
                    />
                    {errors.cityArea && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.cityArea.message}
                      </p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Street / Nearest Landmark <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("streetAddress")}
                      type="text"
                      placeholder="e.g. Al Wasl Road, near City Walk"
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                        errors.streetAddress ? "border-red-400" : "border-soft-gray"
                      }`}
                    />
                    {errors.streetAddress && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>

                  {/* Building & Apartment */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Building / Villa & Flat No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("buildingVilla")}
                      type="text"
                      placeholder="e.g. Silver Tower, Apt 1402 or Villa 12"
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                        errors.buildingVilla ? "border-red-400" : "border-soft-gray"
                      }`}
                    />
                    {errors.buildingVilla && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.buildingVilla.message}
                      </p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Email Address <span className="text-charcoal/40 font-normal">(Optional, for receipt & tracking)</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="e.g. sarah@example.com"
                      className={`w-full px-4 py-3 rounded-2xl border text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all ${
                        errors.email ? "border-red-400" : "border-soft-gray"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Delivery Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Delivery Instructions <span className="text-charcoal/40 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      {...register("deliveryNotes")}
                      rows={2}
                      placeholder="e.g. Leave with security or call upon arrival"
                      className="w-full px-4 py-2.5 rounded-2xl border border-soft-gray text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage transition-all resize-none"
                    />
                  </div>

                  {/* Hidden Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      {...register("hp_field")}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-soft-gray">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-sage/20 text-deep-sage flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="font-serif text-xl font-bold text-charcoal">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery (Selected by Default) */}
                  <label className="relative flex items-center justify-between p-4.5 rounded-2xl border-2 border-deep-sage bg-cream/50 cursor-pointer shadow-sm">
                    <div className="flex items-center gap-3.5">
                      <input
                        type="radio"
                        value="cod"
                        {...register("paymentMethod")}
                        defaultChecked
                        className="w-4 h-4 text-deep-sage focus:ring-deep-sage accent-deep-sage"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-deep-sage" />
                          <span className="text-sm font-bold text-charcoal">
                            Cash on Delivery (COD)
                          </span>
                        </div>
                        <p className="text-xs text-charcoal/65 mt-0.5">
                          Pay directly in cash to the courier when your package arrives at your door.
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-deep-sage bg-sage/20 px-2.5 py-1 rounded-lg">
                      Popular
                    </span>
                  </label>

                  {/* Disabled Credit Card / Apple Pay (Coming Soon) */}
                  <div className="p-4.5 rounded-2xl border border-soft-gray bg-soft-gray/20 opacity-60 cursor-not-allowed flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <input
                        type="radio"
                        disabled
                        className="w-4 h-4 text-charcoal/30"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-charcoal/50" />
                          <span className="text-sm font-medium text-charcoal/60">
                            Credit / Debit Card or Apple Pay
                          </span>
                        </div>
                        <p className="text-xs text-charcoal/40 mt-0.5">
                          Stripe / Telr gateway activation in progress.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 bg-soft-gray px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges on Mobile */}
              <div className="lg:hidden bg-white/70 rounded-3xl p-5 border border-soft-gray space-y-2.5 text-[11px] text-charcoal/65">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-deep-sage shrink-0" />
                  <span>Dubai: 1-2 days | Other Emirates: 2-3 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-deep-sage shrink-0" />
                  <span>6-Month Official Warranty Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-deep-sage shrink-0" />
                  <span>No upfront payment required • Pay Cash on Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order (Desktop) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-soft-gray">
                <h3 className="font-serif text-xl font-bold text-charcoal mb-5 pb-4 border-b border-soft-gray">
                  Order Summary
                </h3>

                {/* Items Mini List */}
                <div className="divide-y divide-soft-gray/70 mb-6 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-xl bg-soft-gray overflow-hidden shrink-0 border border-soft-gray">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-charcoal truncate">
                          {item.productName}
                        </h4>
                        <p className="text-[11px] text-charcoal/60">
                          {item.colorName} • {item.bundleName}
                        </p>
                        <p className="text-[11px] text-charcoal/50">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-charcoal font-serif">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-sm border-t border-soft-gray pt-4 pb-5">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span className="font-medium text-charcoal font-serif">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-charcoal/70">
                    <span>Delivery (UAE)</span>
                    <span className="font-medium text-charcoal">
                      {deliveryFee === 0 ? (
                        <span className="text-deep-sage font-bold">FREE</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-charcoal/50 text-xs">
                    <span>Includes 5% UAE VAT</span>
                    <span>{formatPrice(vatPortion)}</span>
                  </div>

                  <div className="flex justify-between text-base sm:text-lg font-bold text-charcoal pt-3 border-t border-soft-gray">
                    <span>Total Due</span>
                    <span className="text-deep-sage font-serif text-xl sm:text-2xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-deep-sage hover:bg-sage-dark text-white font-medium text-base shadow-soft hover:shadow-soft-md transition-all active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <span>Confirm Order (Pay on Delivery)</span>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-5 border-t border-soft-gray space-y-2.5 text-[11px] text-charcoal/65">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-deep-sage shrink-0" />
                    <span>Dubai: 1-2 days | Other Emirates: 2-3 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-deep-sage shrink-0" />
                    <span>6-Month Official Warranty Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-deep-sage shrink-0" />
                    <span>No upfront payment required • Pay Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Place Order Bar */}
          <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-soft-gray p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] z-30 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between gap-4 max-w-[1200px] mx-auto">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-charcoal/50 block font-medium">
                  Total Due (COD)
                </span>
                <span className="font-serif text-lg font-bold text-deep-sage">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-deep-sage hover:bg-sage-dark text-white font-semibold text-sm shadow-md transition-all active:scale-98 min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Place Order (COD)</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
