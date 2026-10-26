import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: `Terms of Service | ${siteConfig.name} UAE`,
  description: `Terms and conditions of sale and use for ${siteConfig.name} in the United Arab Emirates.`,
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      {/* STORE OWNER NOTE: Review and customize with your commercial legal adviser in accordance with UAE Consumer Protection Law (Federal Law No. 15 of 2020). */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">1. Overview & Agreement</h2>
        <p>
          These Terms of Service govern your purchase and use of products offered on {siteConfig.siteUrl} by {siteConfig.name} ({siteConfig.tradeLicense}). By placing an order, you agree to be bound by these terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">2. Cash on Delivery (COD) Commitments</h2>
        <p>
          When you place an order selecting Cash on Delivery, you make a binding commitment to accept the package and pay the courier the exact total shown on your confirmation invoice upon delivery. Please ensure that an authorized recipient is reachable via phone at your specified UAE address.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">3. Pricing and Value Added Tax (VAT)</h2>
        <p>
          All product prices listed on our website are denominated in United Arab Emirates Dirhams (AED) and inclusive of the statutory 5% UAE Value Added Tax (VAT) in compliance with the Federal Tax Authority (FTA).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">4. Product Safe Use & Care</h2>
        <p>
          The {siteConfig.name} Mist Hair Brush is a cordless rechargeable personal grooming device operating with ultrasonic cool atomization. It is strictly not a hot-air styling tool and contains no heating elements. Customers must only add clean, pure water to the reservoir. The use of oils, flammable liquids, perfumes, or harsh chemicals will void the warranty and may cause damage.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">5. Governing Law & Jurisdiction</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of the United Arab Emirates and the Emirate of Dubai.
        </p>
      </section>
    </LegalLayout>
  );
}
