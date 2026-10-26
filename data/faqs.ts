export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "delivery-time",
    question: "How long does delivery take across the UAE?",
    answer:
      "Delivery takes 1 to 2 business days in Dubai and Sharjah, and 2 to 3 business days for Abu Dhabi, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. You will receive an SMS and WhatsApp tracking update once your order is dispatched.",
  },
  {
    id: "cash-on-delivery",
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "Yes, absolutely. You can pay in cash directly to the courier upon delivery at your doorstep anywhere in the UAE. Please ensure you have the exact amount ready where possible.",
  },
  {
    id: "how-to-charge",
    question: "How do I charge the brush and how long does it take?",
    answer:
      "The brush is 100% cordless and charges via the included standard USB-C cable. Simply plug it into any USB-C port, phone adapter, or power bank. A full charge takes approximately 90 to 120 minutes and provides up to 45 minutes of continuous misting runtime.",
  },
  {
    id: "water-tank-contents",
    question: "What liquids can I put into the water tank?",
    answer:
      "Use clean, purified, or mineral water only. Do not add essential oils, serums, perfumes, or chemical treatments into the water tank, as oils and viscous liquids will clog the ultrasonic nano-atomizer nozzle.",
  },
  {
    id: "warranty",
    question: "What warranty coverage is included?",
    answer:
      "Every Lumora Cordless Mist Brush includes an official 6-Month Manufacturer Warranty against electronic defects, atomizer malfunction, or battery failure. If you experience any technical issues, our Dubai-based support team will arrange a prompt replacement.",
  },
  {
    id: "return-policy",
    question: "Can I return or exchange the product?",
    answer:
      "Yes, we offer a 7-day return policy. For hygiene reasons, items must be in their original, unopened packaging, unused, and with all protective seals intact. If your order arrived damaged or defective, we replace it immediately free of charge.",
  },
  {
    id: "hair-types",
    question: "Is the mist brush suitable for all hair types?",
    answer:
      "Yes. The gentle rounded bristles and ultra-fine nano mist are designed for straight, wavy, curly, fine, and thick hair. It helps soften knots and reduces static friction without over-wetting your hairstyle.",
  },
  {
    id: "cleaning-maintenance",
    question: "How do I clean and maintain the brush?",
    answer:
      "Empty any remaining water from the reservoir after each use and leave the silicone seal open to air dry. To clean the bristles, gently remove loose hairs and wipe the surface with a dry or lightly dampened microfiber cloth. Do not submerge the brush body in water.",
  },
];
