// Single source of truth for the published prices.
//
// These were literals inside Pricing.jsx, while the ROI and payback copy quoted
// them again by hand in five languages. A reprice changed the cards and left
// the copy claiming the old arithmetic. Everything that states a price should
// derive it from here, and the locale tests assert the copy still matches.
//
// Values are in UZS, per venue, per month.
export const MONTHLY_UZS = {
  counter: 300_000,
  service: 600_000,
};

// One-time implementation fee: menu import, warehouse setup, staff training.
export const SETUP_UZS = 2_000_000;

// What a venue pays in its first year on a tier, which is the figure the
// payback line compares against the food-cost saving.
export function yearOneCost(tier = 'service') {
  return MONTHLY_UZS[tier] * 12 + SETUP_UZS;
}

// Space-grouped, matching how the cards and the copy render a sum: 600000 ->
// "600 000". Intl grouping uses a non-breaking space and varies by runtime, so
// group explicitly rather than relying on toLocaleString.
export function groupUZS(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
