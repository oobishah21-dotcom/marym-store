import { siteConfig } from "./config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (siteConfig.gaId && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  // Meta Pixel
  if (siteConfig.pixelId && typeof window.fbq === "function") {
    if (name === "purchase") {
      window.fbq("track", "Purchase", {
        value: params?.value,
        currency: params?.currency || siteConfig.currency,
        content_type: "product",
      });
    } else if (name === "add_to_cart") {
      window.fbq("track", "AddToCart", {
        value: params?.value,
        currency: params?.currency || siteConfig.currency,
      });
    } else if (name === "begin_checkout") {
      window.fbq("track", "InitiateCheckout", {
        value: params?.value,
        currency: params?.currency || siteConfig.currency,
      });
    } else {
      window.fbq("trackCustom", name, params);
    }
  }
}

export function trackAddToCart(productName: string, price: number, quantity: number) {
  trackEvent("add_to_cart", {
    currency: siteConfig.currency,
    value: price * quantity,
    items: [
      {
        item_name: productName,
        price,
        quantity,
      },
    ],
  });
}

export function trackInitiateCheckout(total: number, itemCount: number) {
  trackEvent("begin_checkout", {
    currency: siteConfig.currency,
    value: total,
    num_items: itemCount,
  });
}

export function trackPurchase(orderId: string, total: number, items: unknown[]) {
  trackEvent("purchase", {
    transaction_id: orderId,
    currency: siteConfig.currency,
    value: total,
    items,
  });
}
