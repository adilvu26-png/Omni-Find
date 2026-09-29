import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartOff, Compass } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useFavourites } from '../hooks/useFavourites.js';

export default function Favourites() {
  const { favourites } = useFavourites();

  useEffect(() => {
    document.title = 'Favourites — Omni Find';
  }, []);

  return (
    <div className="container-app py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-signal-dark dark:text-signal-light">
          Saved for later
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink dark:text-paper sm:text-3xl">
          Your favourites
        </h1>
        <p className="mt-1 text-sm text-ink-muted dark:text-paper/60">
          {favourites.length} saved product{favourites.length === 1 ? '' : 's'}
        </p>
      </div>

      {favourites.length === 0 ? (
        <EmptyState
          icon={HeartOff}
          title="No favourites yet"
          description="Start exploring products and save the ones you love."
          action={
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:shadow-cardHover dark:bg-signal dark:text-ink"
            >
              <Compass size={16} aria-hidden="true" />
              Discover products
            </Link>
          }
        />
      ) : (
        <ProductGrid products={favourites} />
      )}
    </div>
  );
}
