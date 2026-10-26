import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: `6-Month Official Warranty | ${siteConfig.name} UAE`,
  description: `Warranty coverage and technical support terms for ${siteConfig.name} Cordless Mist Brush in the UAE.`,
};

export default function WarrantyPage() {
  return (
    <LegalLayout title="6-Month Official Warranty">
      {/* STORE OWNER NOTE: Confirm battery and electronics warranty duration with your supplier. */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">1. Warranty Scope</h2>
        <p>
          Every {siteConfig.name} Cordless Mist Hair Brush purchased directly from our official online store is protected by an official <strong>6-Month Limited Warranty</strong> commencing from the date of delivery.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">2. What Is Covered</h2>
        <p>This warranty protects against failures resulting from manufacturing defects, including:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ultrasonic mist nozzle atomization failure under normal use with clean water</li>
          <li>Battery failure or inability to hold normal operational charge</li>
          <li>Defective internal USB-C charging circuitry or power button electronics</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">3. What Is Not Covered</h2>
        <p>The warranty does not cover:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Clogging caused by the use of essential oils, serums, perfumes, or non-pure water</li>
          <li>Physical damage from dropping, crushing, submersion into water, or unauthorized dismantling</li>
          <li>Normal wear and tear of bristle tips over extensive daily usage</li>
          <li>Damage resulting from using incorrect high-voltage fast chargers exceeding specifications</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">4. Claiming Warranty Service</h2>
        <p>
          To file a claim, simply send a message to our UAE support team on WhatsApp at <strong>{siteConfig.whatsappDisplay}</strong> with your Order ID, proof of delivery, and a brief video showing the issue. If verified as a defect, we will arrange replacement delivery promptly.
        </p>
      </section>
    </LegalLayout>
  );
}
