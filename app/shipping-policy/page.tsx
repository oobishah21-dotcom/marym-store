import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: `Shipping & Delivery Policy | ${siteConfig.name} UAE`,
  description: `Shipping details, transit times, and delivery fees for ${siteConfig.name} across the UAE.`,
};

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping & Delivery Policy">
      {/* STORE OWNER NOTE: Confirm specific delivery windows and rates with your contracted courier partner (e.g. Aramex, Fetchr, Quiqup, iMile). */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">1. UAE Delivery Coverage</h2>
        <p>
          We deliver directly to homes and offices across all seven Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">2. Delivery Timeframes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Dubai & Sharjah:</strong> 1 to 2 business days from order confirmation.
          </li>
          <li>
            <strong>Abu Dhabi & Other Emirates:</strong> 2 to 3 business days from order confirmation.
          </li>
          <li>
            Orders placed on Fridays or UAE public holidays are dispatched on the following business day.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">3. Shipping Rates</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Free UAE Delivery:</strong> Automatically applied to all orders with a subtotal of {formatPrice(siteConfig.freeShippingThreshold)} or higher.
          </li>
          <li>
            <strong>Standard Delivery Fee:</strong> Orders below {formatPrice(siteConfig.freeShippingThreshold)} incur a flat rate delivery fee of {formatPrice(siteConfig.flatShippingFee)}.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">4. Cash on Delivery Process</h2>
        <p>
          On the day of delivery, the dispatch courier will contact you via phone call or WhatsApp message to confirm your availability. Please ensure someone is present at your provided address with the exact cash payment amount.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">5. Tracking Your Delivery</h2>
        <p>
          You can track your order status at any time by messaging our customer support team directly on WhatsApp with your Order ID (e.g. LUM-2026-XXXX).
        </p>
      </section>
    </LegalLayout>
  );
}
