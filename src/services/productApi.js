/**
 * Product API service layer.
 *
 * Omni Find uses DummyJSON (https://dummyjson.com) as its product data
 * source: it's free, requires no API key, and supports search, categories,
 * pagination, ratings, prices, discounts and images — everything the
 * product-discovery UI needs.
 *
 * Known limitation: DummyJSON is a demo API and does not return a real
 * external "buy this product" URL for each item. Every function below
 * normalizes results into a single internal `Product` shape with an
 * `externalUrl` field so that, if Omni Find is pointed at a different
 * provider that *does* return a source URL, no UI code needs to change —
 * only this file. See the README for details.
 *
 * All functions in this file are the ONLY place that should know about
 * DummyJSON's specific response shape. Components must never reach for
 * `fetch` directly.
 */

const BASE_URL = import.meta.env.VITE_PRODUCT_API_BASE_URL || 'https://dummyjson.com';
export const PAGE_SIZE = Number(import.meta.env.VITE_PRODUCTS_PAGE_SIZE) || 12;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch (networkError) {
    throw new ApiError('Network error — please check your internet connection.', 0);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError('The server returned an unexpected response.', response.status);
  }
}

/** Normalizes a raw DummyJSON product into Omni Find's internal Product shape. */
function normalizeProduct(raw) {
  if (!raw) return null;

  const price = typeof raw.price === 'number' ? raw.price : null;
  const discountPercentage =
    typeof raw.discountPercentage === 'number' ? Math.round(raw.discountPercentage) : 0;
  const originalPrice =
    price && discountPercentage ? Math.round((price / (1 - discountPercentage / 100)) * 100) / 100 : null;

  return {
    id: raw.id,
    title: raw.title || 'Untitled product',
    description: raw.description || '',
    price,
    originalPrice,
    discountPercentage,
    rating: typeof raw.rating === 'number' ? raw.rating : null,
    ratingCount: Array.isArray(raw.reviews) ? raw.reviews.length : raw.stock ?? 0,
    category: raw.category || 'uncategorised',
    brand: raw.brand || raw.category || 'Omni Find Marketplace',
    thumbnail: raw.thumbnail || raw.images?.[0] || null,
    images: Array.isArray(raw.images) && raw.images.length ? raw.images : [raw.thumbnail].filter(Boolean),
    stock: typeof raw.stock === 'number' ? raw.stock : null,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    warrantyInformation: raw.warrantyInformation || null,
    shippingInformation: raw.shippingInformation || null,
    returnPolicy: raw.returnPolicy || null,
    availabilityStatus: raw.availabilityStatus || null,
    // DummyJSON does not expose a real external storefront URL.
    externalUrl: null,
  };
}

function normalizeListResponse(json) {
  const products = Array.isArray(json?.products) ? json.products.map(normalizeProduct) : [];
  return {
    products,
    total: json?.total ?? products.length,
    skip: json?.skip ?? 0,
    limit: json?.limit ?? products.length,
  };
}

/** Fetches a single page of products (used for the default "browse all" view). */
export async function fetchProducts({ skip = 0, limit = PAGE_SIZE } = {}) {
  const json = await request(`/products?limit=${limit}&skip=${skip}`);
  return normalizeListResponse(json);
}

/** Searches products by free-text query, with pagination. */
export async function searchProducts({ query, skip = 0, limit = PAGE_SIZE } = {}) {
  const trimmed = (query || '').trim();
  if (!trimmed) return fetchProducts({ skip, limit });
  const json = await request(
    `/products/search?q=${encodeURIComponent(trimmed)}&limit=${limit}&skip=${skip}`
  );
  return normalizeListResponse(json);
}

/** Fetches products belonging to a single category, with pagination. */
export async function fetchProductsByCategory({ category, skip = 0, limit = PAGE_SIZE } = {}) {
  const json = await request(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  );
  return normalizeListResponse(json);
}

/** Fetches a single product by id for the product details page. */
export async function fetchProductById(id) {
  const json = await request(`/products/${encodeURIComponent(id)}`);
  return normalizeProduct(json);
}

/** Fetches the list of supported categories and maps them to {slug, label}. */
export async function fetchCategories() {
  const json = await request('/products/categories');
  if (!Array.isArray(json)) return [];
  return json.map((entry) =>
    typeof entry === 'string'
      ? { slug: entry, label: entry }
      : { slug: entry.slug, label: entry.name || entry.slug }
  );
}

/**
 * Fetches "trending" products. DummyJSON has no dedicated trending
 * endpoint, so Omni Find requests a larger batch sorted by rating
 * (highest rated = trending) as a sensible fallback strategy.
 */
export async function fetchTrendingProducts({ limit = 8 } = {}) {
  const json = await request(`/products?limit=30&skip=0`);
  const { products } = normalizeListResponse(json);
  return products
    .filter((p) => typeof p.rating === 'number')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

/**
 * Lightweight, locally-derived search suggestions based on product titles
 * from a single search request — avoids firing an extra API call per
 * keystroke just for autocomplete.
 */
export async function fetchSearchSuggestions(query) {
  const trimmed = (query || '').trim();
  if (trimmed.length < 2) return [];
  const json = await request(`/products/search?q=${encodeURIComponent(trimmed)}&limit=6`);
  const { products } = normalizeListResponse(json);
  const seen = new Set();
  const suggestions = [];
  products.forEach((p) => {
    const label = p.title;
    if (!seen.has(label.toLowerCase())) {
      seen.add(label.toLowerCase());
      suggestions.push({ id: p.id, label, category: p.category });
    }
  });
  return suggestions.slice(0, 6);
}

export { ApiError };
