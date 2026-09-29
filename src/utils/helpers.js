/**
 * Capitalises the first letter of a category slug like "mens-shirts"
 * and turns dashes into spaces: "Mens shirts".
 */
export function formatCategoryLabel(slug = '') {
  const spaced = slug.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Clamp a number between a min and max value.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Builds a URLSearchParams string from an object, skipping empty values.
 */
export function buildQueryString(params = {}) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    usp.set(key, value);
  });
  const str = usp.toString();
  return str ? `?${str}` : '';
}

/**
 * Safe image fallback — used when a product image fails to load.
 */
export const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#EFEDE4"/>
      <path d="M140 260L180 210L215 245L250 190L280 260H140Z" fill="#3A4066" opacity="0.35"/>
      <circle cx="255" cy="150" r="20" fill="#3A4066" opacity="0.35"/>
    </svg>
  `);
