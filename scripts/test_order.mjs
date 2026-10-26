async function runTests() {
  console.log("=== Testing Lumora Store Live Server ===");
  const BASE_URL = "http://localhost:3000";

  // Test 1: Fetch Homepage
  try {
    const res = await fetch(`${BASE_URL}/`);
    console.log(`[TEST 1] GET / -> Status: ${res.status}`);
    const text = await res.text();
    if (text.includes("Lumora") && text.includes("Mist. Detangle. Shine.")) {
      console.log("  ✓ Homepage contains brand title and tagline");
    } else {
      console.error("  ✗ Homepage missing expected brand text");
    }
  } catch (err) {
    console.error("  ✗ Error fetching /:", err.message);
  }

  // Test 2: Fetch Robots.txt
  try {
    const res = await fetch(`${BASE_URL}/robots.txt`);
    console.log(`[TEST 2] GET /robots.txt -> Status: ${res.status}`);
    const text = await res.text();
    if (text.includes("User-Agent: *") && text.includes("sitemap.xml")) {
      console.log("  ✓ robots.txt configured properly");
    }
  } catch (err) {
    console.error("  ✗ Error fetching /robots.txt:", err.message);
  }

  // Test 3: POST /api/order with valid COD order
  try {
    const validOrder = {
      customer: {
        fullName: "Sarah Al Hashimi",
        phone: "+971501234567",
        emirate: "Dubai",
        cityArea: "Downtown Dubai",
        streetAddress: "Mohammed Bin Rashid Blvd",
        buildingVilla: "Boulevard Crescent, Apt 1804",
        deliveryNotes: "Please ring apartment buzzer",
        email: "customer.test@example.com",
        paymentMethod: "cod",
      },
      items: [
        {
          id: "lumora-mist-brush-v1",
          bundleId: "single",
          colorId: "cream-white",
          quantity: 1,
        },
      ],
    };

    const res = await fetch(`${BASE_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validOrder),
    });

    const data = await res.json();
    console.log(`[TEST 3] POST /api/order (Valid Order) -> Status: ${res.status}`);
    console.log("  Response payload:", JSON.stringify(data, null, 2));

    if (data.success && data.orderId && data.orderId.startsWith("LUM-")) {
      console.log(`  ✓ Order successfully created with ID: ${data.orderId}`);
      console.log(`  ✓ Recalculated pricing: Subtotal = ${data.pricing.subtotal}, Shipping = ${data.pricing.deliveryFee}, Total = ${data.pricing.total}`);
    } else {
      console.error("  ✗ Order creation response unexpected:", data);
    }
  } catch (err) {
    console.error("  ✗ Error posting order:", err.message);
  }

  // Test 4: POST /api/order with honeypot triggered
  try {
    const honeypotOrder = {
      customer: {
        fullName: "Spam Bot",
        phone: "+971501234567",
        emirate: "Dubai",
        cityArea: "Spam City",
        streetAddress: "Bot Street",
        buildingVilla: "Bot Villa",
        email: "bot@spam.com",
        paymentMethod: "cod",
        hp_field: "I am a spam bot filling this hidden field",
      },
      items: [
        {
          id: "lumora-mist-brush-v1",
          bundleId: "single",
          colorId: "cream-white",
          quantity: 1,
        },
      ],
    };

    const res = await fetch(`${BASE_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(honeypotOrder),
    });

    const data = await res.json();
    console.log(`[TEST 4] POST /api/order (Honeypot Bot Trap) -> Status: ${res.status}`);
    if (data.orderId && data.orderId.includes("BOT")) {
      console.log("  ✓ Bot gracefully intercepted without creating real order");
    }
  } catch (err) {
    console.error("  ✗ Error posting honeypot test:", err.message);
  }

  // Test 5: POST /api/order with invalid phone number
  try {
    const invalidOrder = {
      customer: {
        fullName: "Test User",
        phone: "12345", // Invalid UAE phone
        emirate: "Dubai",
        cityArea: "Marina",
        streetAddress: "Marina Walk",
        buildingVilla: "Tower 1",
        paymentMethod: "cod",
      },
      items: [
        {
          id: "lumora-mist-brush-v1",
          bundleId: "single",
          colorId: "cream-white",
          quantity: 1,
        },
      ],
    };

    const res = await fetch(`${BASE_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidOrder),
    });

    console.log(`[TEST 5] POST /api/order (Invalid Phone) -> Status: ${res.status} (Expected 400)`);
    if (res.status === 400) {
      console.log("  ✓ Correctly rejected invalid phone number");
    }
  } catch (err) {
    console.error("  ✗ Error with validation test:", err.message);
  }

  console.log("=== All Tests Completed ===");
}

runTests();
