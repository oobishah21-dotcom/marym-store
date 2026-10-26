import React from "react";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name} UAE`,
  description: `Privacy policy and customer data protection for ${siteConfig.name} in the United Arab Emirates.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      {/* STORE OWNER NOTE: Review and customize with your legal counsel to reflect your specific data handling practices under UAE Federal Decree Law No. 45 of 2021 regarding Personal Data Protection. */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">1. Introduction</h2>
        <p>
          Welcome to {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting personal data collected through our website ({siteConfig.siteUrl}). This policy explains how we collect, use, and safeguard your details when you place an order for delivery within the United Arab Emirates.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">2. Information We Collect</h2>
        <p>
          To process your Cash on Delivery orders, we collect essential contact and delivery details, including:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Full name</li>
          <li>UAE contact telephone / mobile number</li>
          <li>Delivery address (Emirate, Area, Street, Building, Apartment/Villa)</li>
          <li>Email address (optional, for electronic receipts)</li>
          <li>Delivery instructions or landmark notes</li>
        </ul>
        <p>
          We do not store credit card credentials on our servers for Cash on Delivery transactions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">3. How We Use Your Information</h2>
        <p>Your details are used solely to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Fulfill, route, and deliver your ordered items across the UAE</li>
          <li>Send SMS, phone, or WhatsApp notifications regarding courier delivery timing</li>
          <li>Provide customer care, warranty service, and handle returns</li>
          <li>Comply with UAE commercial and tax regulations</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">4. Third-Party Courier Sharing</h2>
        <p>
          We share your name, phone number, and delivery address with trusted local UAE courier and logistics partners for the sole purpose of transporting and delivering your order.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-charcoal">5. Contact Us</h2>
        <p>
          If you have questions regarding your data or wish to exercise your privacy rights, please reach us at:
          <br />
          Email: <a href={`mailto:${siteConfig.supportEmail}`} className="text-deep-sage font-medium">{siteConfig.supportEmail}</a>
          <br />
          Location: {siteConfig.location}
        </p>
      </section>
    </LegalLayout>
  );
}
