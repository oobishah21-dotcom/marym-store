"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { siteConfig } from "@/lib/config";
import { calculateVatBreakdown } from "@/lib/utils";

export interface CartItem {
  id: string; // unique key e.g. `${productId}-${bundleId}-${colorId}`
  productId: string;
  productName: string;
  bundleId: string;
  bundleName: string;
  colorId: string;
  colorName: string;
  price: number; // unit bundle price in AED
  quantity: number; // number of bundles
  image: string;
  savingsText?: string;
}

interface ToastMessage {
  id: string;
  title: string;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  vatAmount: number;
  freeShippingQualified: boolean;
  amountNeededForFreeShipping: number;
  isDrawerOpen: boolean;
  toast: ToastMessage | null;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "lumora_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart to storage", e);
    }
  }, [items, isHydrated]);

  // Calculations
  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const freeShippingQualified = subtotal >= siteConfig.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - subtotal);
  const deliveryFee = items.length === 0 ? 0 : freeShippingQualified ? 0 : siteConfig.flatShippingFee;
  const total = subtotal + deliveryFee;
  const { vat: vatAmount } = calculateVatBreakdown(subtotal);

  const showToast = (title: string, description: string) => {
    const id = Math.random().toString();
    setToast({ id, title, description });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  };

  const dismissToast = () => setToast(null);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const cartItemId = `${newItem.productId}-${newItem.bundleId}-${newItem.colorId}`;
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }
      return [...prevItems, { ...newItem, id: cartItemId }];
    });

    showToast(
      "Added to Cart",
      `${newItem.quantity}x ${newItem.productName} (${newItem.colorName})`
    );
    setIsDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        vatAmount,
        freeShippingQualified,
        amountNeededForFreeShipping,
        isDrawerOpen,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
