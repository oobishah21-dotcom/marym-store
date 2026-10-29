import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in UAE Dirhams, e.g. "AED 119"
 */
export function formatPrice(amount: number): string {
  return `${siteConfig.currency} ${Math.round(amount)}`;
}

/**
 * Calculate VAT breakdown (price includes 5% VAT)
 */
export function calculateVatBreakdown(totalWithVat: number, vatRate = siteConfig.vatRate) {
  // total = net * (1 + vatRate) => net = total / (1 + vatRate)
  const netAmount = totalWithVat / (1 + vatRate);
  const vatAmount = totalWithVat - netAmount;
  return {
    net: Math.round(netAmount * 100) / 100,
    vat: Math.round(vatAmount * 100) / 100,
    total: totalWithVat,
  };
}

/**
 * Generate a clean WhatsApp chat link with an optional prefilled message
 */
export function getWhatsAppLink(message?: string): string {
  let number = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  if (number.startsWith("03") && number.length === 11) {
    number = "92" + number.slice(1);
  }
  if (!message) {
    return `https://wa.me/${number}`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
