import { useEffect, useState } from 'react';
import { Globe2, Compass, ShieldCheck } from 'lucide-react';
import SearchBar from '../components/search/SearchBar.jsx';
import CategoryGrid from '../components/category/CategoryGrid.jsx';
import { CategoryGridSkeleton } from '../components/common/LoadingSkeleton.jsx';
import TrendingSection from '../components/trending/TrendingSection.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import { fetchCategories, fetchTrendingProducts } from '../services/productApi.js';

const FEATURED_SLUGS = [
  'smartphones',
  'laptops',
  'mens-shirts',
  'womens-dresses',
  'skincare',
  'fragrances',
  'furniture',
  'home-decoration',
  'sunglasses',
  'sports-accessories',
  'groceries',
  'mens-shoes',
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState(null);

  useEffect(() => {
    document.title = 'Omni Find — Discover Products From Around the World';
  }, []);

  const loadCategories = () => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    fetchCategories()
      .then((data) => {
        const featured = data.filter((c) => FEATURED_SLUGS.includes(c.slug));
        setCategories((featured.length ? featured : data).slice(0, 8));
      })
      .catch((err) => setCategoriesError(err))
      .finally(() => setCategoriesLoading(false));
  };

  const loadTrending = () => {
    setTrendingLoading(true);
    setTrendingError(null);
    fetchTrendingProducts({ limit: 8 })
      .then(setTrending)
      .catch((err) => setTrendingError(err))
      .finally(() => setTrendingLoading(false));
  };

  useEffect(() => {
    loadCategories();
    loadTrending();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/5 bg-gradient-to-b from-sand/60 via-paper to-paper dark:border-paper/10 dark:from-ink-soft/40 dark:via-ink dark:to-ink">
        <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full border border-signal/20 sm:right-[-60px]" aria-hidden="true">
          <span className="absolute inset-8 rounded-full border border-signal/30" />
          <span className="absolute inset-16 rounded-full border border-signal/40" />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-radar rounded-full border-2 border-signal" />
        </div>

        <div className="container-app relative py-20 sm:py-28">
          <div className="max-w-2xl animate-riseIn">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-semibold text-signal-dark dark:text-signal-light">
              <Compass size={13} aria-hidden="true" />
              Find anything. Anywhere.
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink dark:text-paper sm:text-5xl lg:text-6xl">
              Discover products
              <br />
              from around the world
            </h1>
            <p className="mt-5 max-w-lg text-base text-ink-muted dark:text-paper/70 sm:text-lg">
              Search millions of listings, compare prices at a glance, and save the ones you
              love — all from one clean, distraction-free place.
            </p>

            <div className="mt-8 max-w-xl">
              <SearchBar size="lg" autoFocus placeholder="Try “wireless headphones”, “running shoes”…" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted dark:text-paper/60">
              <span className="flex items-center gap-1.5">
                <Globe2 size={15} className="text-signal-dark dark:text-signal-light" aria-hidden="true" />
                Global product coverage
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-signal-dark dark:text-signal-light" aria-hidden="true" />
                Transparent pricing
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-app space-y-16 py-16 sm:space-y-20 sm:py-20">
        {/* Categories */}
        <section id="categories" aria-labelledby="categories-heading" className="scroll-mt-24">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-signal-dark dark:text-signal-light">
              Browse
            </p>
            <h2 id="categories-heading" className="mt-1 font-display text-2xl font-semibold text-ink dark:text-paper sm:text-3xl">
              Shop by category
            </h2>
          </div>

          {categoriesLoading && <CategoryGridSkeleton count={8} />}
          {!categoriesLoading && categoriesError && <ErrorState onRetry={loadCategories} />}
          {!categoriesLoading && !categoriesError && <CategoryGrid categories={categories} />}
        </section>

        {/* Trending */}
        <TrendingSection products={trending} loading={trendingLoading} error={trendingError} onRetry={loadTrending} />
      </div>
    </div>
  );
}
