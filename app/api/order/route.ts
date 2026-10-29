import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { orderApiSchema } from "@/lib/validation";
import { mainProduct } from "@/data/products";
import { siteConfig } from "@/lib/config";
import { calculateVatBreakdown, formatPrice } from "@/lib/utils";

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ORDERS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  // Keep only timestamps within window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_ORDERS_PER_WINDOW) {
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function generateOrderId(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LUM-${year}-${randomChars}`;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many orders placed recently. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    // 2. Body parsing and validation
    const body = await req.json();
    const validationResult = orderApiSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid order data provided",
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { customer, items } = validationResult.data;

    // 3. Honeypot check (bot prevention)
    if (customer.hp_field && customer.hp_field.trim() !== "") {
      // Silently return fake success to fool bot
      return NextResponse.json({
        success: true,
        orderId: `LUM-${new Date().getFullYear()}-BOT`,
        message: "Order placed successfully",
      });
    }

    // 4. Server-Side Price & Product Recalculation (Never trust client prices)
    const verifiedItems: {
      productId: string;
      productName: string;
      bundleId: string;
      bundleName: string;
      colorId: string;
      colorName: string;
      unitPrice: number;
      quantity: number;
      itemTotal: number;
    }[] = [];

    let calculatedSubtotal = 0;

    for (const item of items) {
      if (item.id !== mainProduct.id && item.id !== mainProduct.slug) {
        return NextResponse.json(
          { error: `Unknown product id: ${item.id}` },
          { status: 400 }
        );
      }

      const bundle = mainProduct.bundles.find((b) => b.id === item.bundleId);
      if (!bundle) {
        return NextResponse.json(
          { error: `Invalid bundle option: ${item.bundleId}` },
          { status: 400 }
        );
      }

      const color = mainProduct.colors.find((c) => c.id === item.colorId);
      const colorName = color ? color.name : "Standard";

      const itemTotal = bundle.price * item.quantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        productId: mainProduct.id,
        productName: mainProduct.name,
        bundleId: bundle.id,
        bundleName: bundle.name,
        colorId: item.colorId,
        colorName,
        unitPrice: bundle.price,
        quantity: item.quantity,
        itemTotal,
      });
    }

    const deliveryFee =
      calculatedSubtotal >= siteConfig.freeShippingThreshold
        ? 0
        : siteConfig.flatShippingFee;
    const finalTotal = calculatedSubtotal + deliveryFee;
    const { vat } = calculateVatBreakdown(calculatedSubtotal);

    // 5. Generate unique Order ID
    const orderId = generateOrderId();
    const createdAt = new Date().toISOString();

    const orderRecord = {
      orderId,
      createdAt,
      customer: {
        fullName: customer.fullName,
        phone: customer.phone,
        emirate: customer.emirate,
        cityArea: customer.cityArea,
        streetAddress: customer.streetAddress,
        buildingVilla: customer.buildingVilla,
        deliveryNotes: customer.deliveryNotes || "",
        email: customer.email || "",
      },
      paymentMethod: customer.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Card",
      items: verifiedItems,
      pricing: {
        subtotal: calculatedSubtotal,
        deliveryFee,
        vatAmount: vat,
        total: finalTotal,
        currency: siteConfig.currency,
      },
    };

    // 6. Optional Webhook (Google Sheets, Make.com, Zapier, Telegram, etc.)
    const webhookUrl = process.env.ORDER_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderRecord),
        });
      } catch (webhookErr) {
        console.error("Order webhook failed silently:", webhookErr);
      }
    }

    // 7. Transactional Emails (Gmail SMTP via Nodemailer or Resend)
    const gmailUser = process.env.GMAIL_USER;
    const rawGmailPassword = process.env.GMAIL_APP_PASSWORD;
    const gmailPassword = rawGmailPassword ? rawGmailPassword.replace(/\s+/g, "") : undefined;
    const resendApiKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL || gmailUser || siteConfig.supportEmail;
    const fromEmail = process.env.FROM_EMAIL || "orders@lumorabeauty.com";

    const itemsHtml = verifiedItems
      .map(
        (i) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eaeaea;">
          <strong>${i.productName}</strong><br/>
          <span style="font-size: 13px; color: #666;">Bundle: ${i.bundleName} | Color: ${i.colorName}</span>
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eaeaea; text-align: center;">${i.quantity}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eaeaea; text-align: right;">${formatPrice(i.itemTotal)}</td>
      </tr>
    `
      )
      .join("");

    const ownerEmailSubject = `🔔 New COD Order: ${orderId} - ${customer.fullName} (${customer.emirate})`;
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #2B2B2B; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 12px;">
        <h2 style="color: #5F7355; margin-top: 0;">New Cash on Delivery Order Placed</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}</p>
        
        <h3 style="border-bottom: 2px solid #A9B89A; padding-bottom: 6px; margin-top: 24px;">Customer & Delivery Details</h3>
        <p><strong>Name:</strong> ${customer.fullName}</p>
        <p><strong>Phone:</strong> <a href="tel:${customer.phone}">${customer.phone}</a> | <a href="https://wa.me/${customer.phone.replace(/[^0-9]/g, "")}">Open in WhatsApp</a></p>
        <p><strong>Emirate:</strong> ${customer.emirate}</p>
        <p><strong>Area:</strong> ${customer.cityArea}</p>
        <p><strong>Street Address:</strong> ${customer.streetAddress}</p>
        <p><strong>Building/Villa & Flat:</strong> ${customer.buildingVilla}</p>
        ${customer.deliveryNotes ? `<p><strong>Delivery Notes:</strong> ${customer.deliveryNotes}</p>` : ""}
        ${customer.email ? `<p><strong>Email:</strong> ${customer.email}</p>` : ""}
        <p><strong>Payment Method:</strong> Cash on Delivery (COD)</p>

        <h3 style="border-bottom: 2px solid #A9B89A; padding-bottom: 6px; margin-top: 24px;">Ordered Items</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #FAF6EF;">
              <th style="padding: 8px 12px;">Item</th>
              <th style="padding: 8px 12px; text-align: center;">Qty</th>
              <th style="padding: 8px 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top: 20px; text-align: right;">
          <p style="margin: 4px 0;">Subtotal: ${formatPrice(calculatedSubtotal)}</p>
          <p style="margin: 4px 0;">Delivery: ${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</p>
          <p style="margin: 4px 0; font-size: 12px; color: #777;">(Includes 5% UAE VAT: ${formatPrice(vat)})</p>
          <h3 style="margin: 8px 0; color: #5F7355; font-size: 20px;">Total Due on Delivery: ${formatPrice(finalTotal)}</h3>
        </div>
      </div>
    `;

    const customerEmailSubject = `Your ${siteConfig.name} Order Confirmation (${orderId})`;
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #2B2B2B; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 12px; background: #FAF6EF;">
        <h1 style="color: #5F7355; font-family: Georgia, serif; margin-top: 0;">${siteConfig.name}</h1>
        <p style="font-size: 16px;">Dear ${customer.fullName},</p>
        <p>Thank you for choosing ${siteConfig.name}! We have received your order and our dispatch team is preparing your package.</p>
        
        <div style="background: #ffffff; padding: 18px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2B2B2B;">Order Details (${orderId})</h3>
          <p><strong>Payment:</strong> Cash on Delivery</p>
          <p><strong>Total Amount to Pay:</strong> ${formatPrice(finalTotal)}</p>
          <p><strong>Estimated Delivery:</strong> 1-2 business days (Dubai/Sharjah) or 2-3 business days (other Emirates)</p>
          <p><strong>Delivering to:</strong> ${customer.buildingVilla}, ${customer.streetAddress}, ${customer.cityArea}, ${customer.emirate}</p>
        </div>

        <p>Please make sure someone is available at your delivery location and that you have the cash amount ready for the courier.</p>

        <p style="margin-top: 24px;">Need help or want to modify your order? Chat with us anytime on WhatsApp: <a href="https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Lumora,%20I%20have%20a%20question%20regarding%20Order%20${orderId}">${siteConfig.whatsappDisplay}</a></p>

        <p style="color: #777; font-size: 13px; margin-top: 30px;">Warm regards,<br/>The ${siteConfig.name} Team</p>
      </div>
    `;

    // 1. Try Gmail SMTP via Nodemailer
    if (gmailUser && gmailPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailPassword,
          },
        });

        // Email to Store Owner
        await transporter.sendMail({
          from: `"${siteConfig.name} Store" <${gmailUser}>`,
          to: ownerEmail,
          subject: ownerEmailSubject,
          html: ownerEmailHtml,
        });
        console.log(`[Order Placed - ${orderId}] Owner notification email sent via Gmail SMTP.`);

        // Email to Customer (if customer provided an email)
        if (customer.email && customer.email.trim() !== "") {
          await transporter.sendMail({
            from: `"${siteConfig.name}" <${gmailUser}>`,
            to: customer.email.trim(),
            subject: customerEmailSubject,
            html: customerEmailHtml,
          });
          console.log(`[Order Placed - ${orderId}] Customer confirmation email sent via Gmail SMTP.`);
        }
      } catch (gmailError) {
        console.error("Gmail SMTP email delivery error:", gmailError);
      }
    } else if (resendApiKey) {
      // 2. Fallback to Resend
      try {
        const resend = new Resend(resendApiKey);

        // Email to Store Owner
        await resend.emails.send({
          from: `${siteConfig.name} Orders <${fromEmail}>`,
          to: ownerEmail,
          subject: ownerEmailSubject,
          html: ownerEmailHtml,
        });

        // Email to Customer
        if (customer.email && customer.email.trim() !== "") {
          await resend.emails.send({
            from: `${siteConfig.name} <${fromEmail}>`,
            to: customer.email.trim(),
            subject: customerEmailSubject,
            html: customerEmailHtml,
          });
        }
      } catch (resendError) {
        console.error("Resend email delivery error:", resendError);
      }
    } else {
      console.log(
        `[Order Placed - ${orderId}] Neither Gmail SMTP nor Resend configured. Skipping email dispatch.`
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      pricing: {
        subtotal: calculatedSubtotal,
        deliveryFee,
        vatAmount: vat,
        total: finalTotal,
      },
      customer: {
        fullName: customer.fullName,
        phone: customer.phone,
        emirate: customer.emirate,
      },
    });
  } catch (error) {
    console.error("Unexpected error in /api/order:", error);
    return NextResponse.json(
      { error: "Internal server error processing your order." },
      { status: 500 }
    );
  }
}
