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
// Scaled per tier — a flat 2M was 6.7x the entry tier's monthly price, which
// made the cheap tier the expensive one to start. The top tier is scoped per
// venue count, so it is quoted rather than listed.
export const SETUP_UZS = {
  counter: 1_000_000,
  service: 2_000_000,
};

// Annual prepay discount. Twelve months of cash up front is worth more to a
// two-person company than the discount costs it.
export const ANNUAL_DISCOUNT = 0.15;

// The per-month rate when a year is paid up front.
export function annualMonthlyUZS(tier) {
  return Math.round(MONTHLY_UZS[tier] * (1 - ANNUAL_DISCOUNT));
}

// What a year up front costs in total.
export function annualTotalUZS(tier) {
  return annualMonthlyUZS(tier) * 12;
}

// What a venue pays in its first year on a tier, which is the figure the
// payback line compares against the food-cost saving.
export function yearOneCost(tier = 'service') {
  return MONTHLY_UZS[tier] * 12 + SETUP_UZS[tier];
}

// Space-grouped, matching how the cards and the copy render a sum: 600000 ->
// "600 000". Intl grouping uses a non-breaking space and varies by runtime, so
// group explicitly rather than relying on toLocaleString.
export function groupUZS(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// English prose grouping: 300000 -> "300,000". The cards and the non-English
// copy group with spaces (groupUZS); llms.txt and the JSON-LD description are
// English prose, so they group with commas.
export function commaUZS(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// schema.org AggregateOffer wants bare integers as strings, ungrouped.
export const offerLowPrice = () => String(MONTHLY_UZS.counter);
export const offerHighPrice = () => String(MONTHLY_UZS.service);

// schema.org LocalBusiness priceRange is free text, but keep it machine-ish.
export const priceRangeLabel = () =>
  `UZS ${MONTHLY_UZS.counter}\u2013${MONTHLY_UZS.service} / mo`;

// The sentence both the AggregateOffer description and llms.txt need: what the
// monthly price buys and what the one-time fee is.
export const setupFeeSentence = () =>
  `Per venue, per month, plus a one-time setup fee from ${commaUZS(SETUP_UZS.counter)} UZS ` +
  '(menu import, warehouse setup, staff training, migration). ' +
  `${Math.round(ANNUAL_DISCOUNT * 100)}% off on annual prepay. Custom pricing for groups.`;

// The llms.txt pricing fact, in the same prose style as the rest of that file.
export const llmsPricingLine = () =>
  `from ${commaUZS(MONTHLY_UZS.counter)} UZS per venue per month to ` +
  `${commaUZS(MONTHLY_UZS.service)} UZS, ` +
  `${Math.round(ANNUAL_DISCOUNT * 100)}% off when a year is paid up front; ` +
  `one-time setup from ${commaUZS(SETUP_UZS.counter)} UZS`;
