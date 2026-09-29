/**
 * Formats a numeric price as a USD currency string.
 * Returns null when the price is missing/invalid so callers can
 * decide how to render "no price available" states.
 */
export function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

/**
 * Given a discounted price and a discount percentage, derive the
 * original ("was") price. DummyJSON only returns the final price
 * and the discount percentage, not the original price directly.
 */
export function deriveOriginalPrice(price, discountPercentage) {
  if (!price || !discountPercentage) return null;
  const original = price / (1 - discountPercentage / 100);
  return Math.round(original * 100) / 100;
}
