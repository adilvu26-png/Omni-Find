# Omni Find

**Find anything. Anywhere.**

Omni Find is a modern product discovery and search platform built with React and
Vite. Search for products, browse by category, track what's trending, filter and
sort results, and save your favourites — all in a fast, responsive, accessible
interface with a light and dark theme.

This is a portfolio-quality frontend project: a fully functional React app, not a
static mockup.

---

## 1. Project overview

Omni Find lets a user:

- Search a live product catalogue with debounced input and autocomplete suggestions
- Browse products by category, or see what's trending
- Filter results by minimum/maximum price and sort by price or rating
- View a full product details page, including images, pricing, ratings and
  shipping/return/warranty info where available
- Save and remove favourites, persisted in `localStorage` across sessions
- Use the app comfortably on mobile, tablet, laptop and large desktop screens,
  in light or dark mode

## 2. Features

- 🔍 Debounced product search with Enter-to-search, clear button, and loading state
- 💡 Lightweight, locally-derived search suggestions (no extra API calls per keystroke)
- 🗂️ Category browsing, mapped from the live API's category list
- 🔥 Trending products section (rating-based fallback strategy — see §11)
- 💲 Price range filter (dual slider + numeric inputs) that filters already-fetched
  data with no unnecessary refetching
- ↕️ Sorting: relevance, price low→high, price high→low, rating
- ❤️ Favourites system with duplicate protection and a dedicated `/favourites` page
- 📄 Product details page with an image gallery, discount badges, and an external
  "Visit store" link when the API provides one
- ⏳ Skeleton loaders for cards, details, and category tiles — no blank screens
- 🚫 Friendly error states with a **Try again** button, and empty states with
  actionable suggestions
- 📱 Fully responsive, mobile-first layouts throughout
- 🎬 Purposeful animations (hero entrance, card entrances, hover/press feedback,
  favourite heartbeat) that respect `prefers-reduced-motion`
- 🌗 Dark mode with a header toggle and persisted preference
- ♿ Semantic HTML, labelled icon-only buttons, visible focus states, keyboard support
- 🔗 Search/filter state reflected in the URL (`/search?q=...&minPrice=...&sort=...`)
  so results can be refreshed or shared

## 3. Tech stack

| Layer            | Choice                                   |
| ----------------- | ----------------------------------------- |
| UI library        | React 18                                  |
| Build tool        | Vite 5                                    |
| Language          | JavaScript (JSX)                          |
| Styling           | Tailwind CSS                              |
| Routing           | React Router 6                            |
| Icons             | lucide-react                              |
| Data fetching     | Fetch API                                 |
| Global state      | React Context + hooks (no Redux)          |
| Persistence       | `localStorage` (favourites, theme)        |
| Product data      | [DummyJSON](https://dummyjson.com) (free, no API key) |

## 4. Screenshots

_Add screenshots of the homepage, search results, product details, and favourites
pages here once the app is running locally._

```
docs/
  screenshot-home.png
  screenshot-search.png
  screenshot-product.png
  screenshot-favourites.png
```

## 5. Folder structure

```text
omni-find/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/       Header, Footer
│   │   ├── common/       Logo, Rating, EmptyState, ErrorState, LoadingSkeleton
│   │   ├── product/      ProductCard, ProductGrid, ProductFilters, FavouriteButton
│   │   ├── search/       SearchBar (debounced, with suggestions)
│   │   ├── category/     CategoryCard, CategoryGrid
│   │   └── trending/     TrendingSection
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx          (handles /search and /category/:category)
│   │   ├── ProductDetails.jsx
│   │   ├── Favourites.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   └── productApi.js       (the ONLY file that talks to the product API)
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useFavourites.js
│   ├── context/
│   │   ├── FavouritesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   ├── formatPrice.js
│   │   ├── helpers.js
│   │   └── categoryIcons.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 6. Installation

```bash
# 1. Extract the ZIP and move into the project folder
cd omni-find

# 2. Install dependencies
npm install

# 3. Copy the example environment file
cp .env.example .env
```

## 7. Environment variables

Omni Find reads its configuration from `.env` (see `.env.example`):

| Variable                     | Description                                      | Default                    |
| ----------------------------- | ------------------------------------------------- | --------------------------- |
| `VITE_PRODUCT_API_BASE_URL`   | Base URL of the product API                       | `https://dummyjson.com`     |
| `VITE_PRODUCTS_PAGE_SIZE`     | Products fetched per page / "Load more" click     | `12`                        |
| `VITE_PRODUCT_API_KEY`        | Optional — only needed if you swap in a provider that requires a key | _(unset)_ |

Vite only exposes variables prefixed with `VITE_` to the browser, and `.env` is
already listed in `.gitignore` so real secrets are never committed.

## 8. API setup

Omni Find uses **[DummyJSON](https://dummyjson.com)**, a free public product API
that requires no signup or API key, and supports everything the app needs:
product search, categories, prices, discount percentages, ratings, images and
descriptions.

All API access lives in **`src/services/productApi.js`**. UI components never call
`fetch` directly — they only call functions like `searchProducts()`,
`fetchProductsByCategory()`, or `fetchProductById()`. This keeps the API logic in
one replaceable layer: to point Omni Find at a different or production product
API, you only need to edit this one file (and update `VITE_PRODUCT_API_BASE_URL`
and, if required, add an API key header).

### Known limitation

DummyJSON is a demo dataset and does **not** return a real external "buy this
product" URL for each listing. Every product is normalized with an `externalUrl`
field, but it is currently `null` for all products. The UI handles this correctly:
the "Visit store" button on the product details page and the external-link icon on
product cards only render when `externalUrl` is present, and a friendly fallback
message is shown otherwise. If you swap in a product API that does provide a real
source URL, populate `externalUrl` in `normalizeProduct()` and the buttons will
appear automatically — no other code changes needed.

## 9. Running the project

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`) in your browser.

## 10. Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs a production bundle to `dist/`. `npm run preview` serves
that build locally so you can sanity-check it before deploying.

## 11. Important implementation notes

- **Trending products**: DummyJSON has no dedicated "trending" endpoint. Omni Find
  fetches a batch of products and sorts by rating (highest first) as a sensible,
  documented fallback strategy, as allowed by the project brief.
- **Categories**: the homepage shows a curated subset of the API's real categories,
  mapped to friendly labels and icons by keyword matching (e.g. `mens-shirts` →
  "Fashion"). The `/category/:category` route works for any category slug the API
  returns.
- **Price filtering & sorting** are applied client-side to already-fetched data —
  changing the price range or sort order does not trigger a new network request.
- **Pagination** uses a "Load more" pattern that appends the next page from the API
  rather than fetching everything at once.
- **Favourites** are stored under the `omnifind:favourites` key in `localStorage`;
  the theme preference is stored under `omnifind:theme`. Both survive page
  refreshes and browser restarts.
- **Accessibility**: all icon-only buttons (favourite, clear search, theme toggle,
  mobile menu) have `aria-label`s, focus states are visible, and animations respect
  `prefers-reduced-motion`.

## 12. Testing checklist

Before shipping, verify:

- Search: typing, Enter key, empty search, debouncing, loading state, error
  handling, no-results state
- Products: cards render with missing images/prices/descriptions handled
  gracefully, details page loads, external links open in a new tab when present
- Favourites: add/remove, no duplicates, persists across refresh, empty state
- Filters: min/max price, reset, sorting
- Navigation: all routes, browser refresh, back button, 404 page
- Responsive layouts at mobile/tablet/desktop/large-screen widths
- No unnecessary API calls or console errors
