import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: `Return & Refund Policy | ${siteConfig.name} UAE`,
  description: `7-day return guidelines and refund procedures for ${siteConfig.name} in the United Arab Emirates.`,
};

export default function ReturnPolicyPage() {
  return (
    <LegalLayout title="Return & Refund Policy">
      {/* STORE OWNER NOTE: Confirm your return inspection process and courier return fee handling with your operations team. */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">1. 7-Day Return Guarantee</h2>
        <p>
          We want you to be completely delighted with your purchase. We offer a 7-day return window from the day your package is delivered anywhere in the UAE.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">2. Hygiene & Condition Requirements</h2>
        <p>
          Due to hygiene standards and the personal nature of hair grooming devices:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The brush must be completely unused, with no water ever loaded into the reservoir.</li>
          <li>The product must be in its original, undamaged retail packaging with all original internal wraps, USB-C cable, and manual included.</li>
          <li>All security seal stickers must remain untampered.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">3. Damaged or Defective Items</h2>
        <p>
          If your item arrives broken or suffers from a manufacturing defect upon arrival, please notify our team within 48 hours of delivery via WhatsApp with a short video of the issue. We will arrange a free exchange courier pickup and deliver a brand new replacement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">4. How to Initiate a Return</h2>
        <p>
          Contact our support team on WhatsApp at <strong>{siteConfig.whatsappDisplay}</strong> or email <strong>{siteConfig.supportEmail}</strong> with your order ID. Our team will guide you through the inspection and collection schedule.
        </p>
      </section>
    </LegalLayout>
  );
}
