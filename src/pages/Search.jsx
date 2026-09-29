import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchX, Compass, Flame } from 'lucide-react';
import SearchBar from '../components/search/SearchBar.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import ProductFilters from '../components/product/ProductFilters.jsx';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
  PAGE_SIZE,
} from '../services/productApi.js';
import { formatCategoryLabel } from '../utils/helpers.js';

export default function Search() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const sort = searchParams.get('sort') || 'relevance';

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadFirstPage = useCallback(() => {
    setLoading(true);
    setError(null);
    const fetcher = category
      ? fetchProductsByCategory({ category, skip: 0 })
      : query
      ? searchProducts({ query, skip: 0 })
      : fetchProducts({ skip: 0 });

    fetcher
      .then(({ products: fetched, total: totalCount }) => {
        setProducts(fetched);
        setTotal(totalCount);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [category, query]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  useEffect(() => {
    document.title = category
      ? `${formatCategoryLabel(category)} — Omni Find`
      : query
      ? `“${query}” — Omni Find search`
      : 'Search — Omni Find';
  }, [category, query]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    const fetcher = category
      ? fetchProductsByCategory({ category, skip: products.length })
      : query
      ? searchProducts({ query, skip: products.length })
      : fetchProducts({ skip: products.length });

    fetcher
      .then(({ products: fetched }) => setProducts((prev) => [...prev, ...fetched]))
      .catch((err) => setError(err))
      .finally(() => setLoadingMore(false));
  };

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value === undefined || value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next, { replace: true });
  };

  const handleResetFilters = () => updateParams({ minPrice: '', maxPrice: '' });

  // Client-side filtering + sorting on already-fetched data — no refetch needed.
  const visibleProducts = useMemo(() => {
    let list = [...products];

    if (minPrice !== '') list = list.filter((p) => p.price !== null && p.price >= Number(minPrice));
    if (maxPrice !== '') list = list.filter((p) => p.price !== null && p.price <= Number(maxPrice));

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case 'rating-desc':
        list.sort((a, b) => (b.rating ?? -Infinity) - (a.rating ?? -Infinity));
        break;
      default:
        break;
    }

    return list;
  }, [products, minPrice, maxPrice, sort]);

  const heading = category
    ? formatCategoryLabel(category)
    : query
    ? `Results for “${query}”`
    : 'All products';

  return (
    <div className="container-app py-10">
      <div className="mb-8">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-signal-dark dark:text-signal-light">
          {sort === 'rating-desc' && !category && !query ? <Flame size={13} aria-hidden="true" /> : <Compass size={13} aria-hidden="true" />}
          {category ? 'Category' : 'Search'}
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper sm:text-3xl">{heading}</h1>
        {!loading && !error && (
          <p className="mt-1 text-sm text-ink-muted dark:text-paper/60">
            {visibleProducts.length} of {total} product{total === 1 ? '' : 's'}
          </p>
        )}
        <div className="mt-5 max-w-xl md:hidden">
          <SearchBar mode="controlled" initialValue={query} onSearch={(v) => updateParams({ q: v })} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductFilters
            minPrice={minPrice === '' ? '' : Number(minPrice)}
            maxPrice={maxPrice === '' ? '' : Number(maxPrice)}
            sort={sort}
            onChange={(patch) => updateParams(patch)}
            onReset={handleResetFilters}
          />
        </aside>

        <div>
          {loading && <ProductGridSkeleton count={PAGE_SIZE} />}

          {!loading && error && <ErrorState onRetry={loadFirstPage} />}

          {!loading && !error && visibleProducts.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No products found"
              description={query ? `We couldn't find anything for “${query}”.` : 'No products match your filters.'}
              tips={[
                'Try a different keyword',
                'Check your spelling',
                'Remove some filters',
                'Browse categories from the homepage',
              ]}
            />
          )}

          {!loading && !error && visibleProducts.length > 0 && (
            <>
              <ProductGrid products={visibleProducts} />

              {products.length < total && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="rounded-full border border-ink/10 bg-white px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-signal hover:text-signal-dark disabled:opacity-60 dark:border-paper/15 dark:bg-ink-soft dark:text-paper"
                  >
                    {loadingMore ? 'Loading…' : 'Load more products'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
