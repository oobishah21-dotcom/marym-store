export interface Review {
  id: string;
  author: string;
  city: string; // e.g. "Dubai", "Abu Dhabi"
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verified: boolean;
}

/**
 * REVIEWS DATA
 * Keep this array EMPTY ([]) until verified customer reviews are received.
 * Per store policy, no fake or simulated reviews are permitted.
 * When empty, the UI displays a clean "Be the first to review" card
 * with a direct "Share your experience on WhatsApp" button.
 */
export const reviews: Review[] = [
  // Store owner can add real verified reviews here once customers provide them:
  // Example format:
  // {
  //   id: "rev-1",
  //   author: "Fatima Al M.",
  //   city: "Dubai",
  //   rating: 5,
  //   date: "2026-02-15",
  //   comment: "Very gentle mist, perfect for refreshing hair in the midday humidity. Cordless makes it so convenient in the bag.",
  //   verified: true
  // }
];
