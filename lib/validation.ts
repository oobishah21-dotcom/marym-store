import { z } from "zod";
import { UAE_EMIRATES } from "./config";

// Regex for UAE phone numbers:
// Matches: +971501234567, 00971501234567, 0501234567, 971501234567, 501234567
// with optional spaces or dashes
export const uaePhoneRegex = /^(?:\+?971|00971|0)?(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/;

export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (minimum 2 characters)")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .refine((val) => {
      const cleaned = val.replace(/[\s\-()]/g, "");
      return uaePhoneRegex.test(cleaned);
    }, "Please enter a valid UAE mobile number (e.g. 050 123 4567 or +971 50 123 4567)"),
  emirate: z.enum(UAE_EMIRATES, {
    errorMap: () => ({ message: "Please select your Emirate" }),
  }),
  cityArea: z
    .string()
    .trim()
    .min(2, "Please enter your area or district (e.g. Downtown, Marina, Al Nahda)"),
  streetAddress: z
    .string()
    .trim()
    .min(3, "Please enter your street address or landmark"),
  buildingVilla: z
    .string()
    .trim()
    .min(1, "Please enter your building name / villa number & flat/unit number"),
  deliveryNotes: z.string().trim().max(300, "Notes are too long").optional(),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  paymentMethod: z.enum(["cod", "card_coming_soon"]).default("cod"),
  // Honeypot field for bot/spam prevention - must remain empty
  hp_field: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export const orderApiSchema = z.object({
  customer: checkoutFormSchema,
  items: z.array(
    z.object({
      id: z.string(),
      bundleId: z.string(),
      colorId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Your cart is empty"),
});

export type OrderApiPayload = z.infer<typeof orderApiSchema>;
