import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import ProductCard from '../product/ProductCard.jsx';
import { ProductGridSkeleton } from '../common/LoadingSkeleton.jsx';
import ErrorState from '../common/ErrorState.jsx';

export default function TrendingSection({ products, loading, error, onRetry }) {
  return (
    <section aria-labelledby="trending-heading">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-beacon">
            <Flame size={18} aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wide">Hot right now</span>
          </div>
          <h2 id="trending-heading" className="font-display text-2xl font-semibold text-ink dark:text-paper sm:text-3xl">
            Trending products
          </h2>
        </div>
        <Link
          to="/search?sort=rating-desc"
          className="hidden items-center gap-1 text-sm font-semibold text-signal-dark transition hover:gap-2 dark:text-signal-light sm:flex"
        >
          View all
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      {loading && <ProductGridSkeleton count={4} />}
      {!loading && error && <ErrorState onRetry={onRetry} />}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} style={{ animationDelay: `${i * 40}ms` }} />
          ))}
        </div>
      )}
    </section>
  );
}
