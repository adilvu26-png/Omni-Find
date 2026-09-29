import { Link } from 'react-router-dom';
import { ExternalLink, Eye } from 'lucide-react';
import Rating from '../common/Rating.jsx';
import FavouriteButton from './FavouriteButton.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { formatCategoryLabel } from '../../utils/helpers.js';
import { FALLBACK_IMAGE } from '../../utils/helpers.js';

export default function ProductCard({ product, style }) {
  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);

  return (
    <article
      style={style}
      className="group animate-riseIn overflow-hidden rounded-xl2 border border-ink/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover dark:border-paper/10 dark:bg-ink-soft"
    >
      <Link to={`/product/${product.id}`} className="block" aria-label={`View details for ${product.title}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-sand dark:bg-ink">
          <img
            src={product.thumbnail || FALLBACK_IMAGE}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-beacon px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
          <FavouriteButton product={product} className="absolute right-3 top-3" />
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-signal-dark dark:text-signal-light">
          {formatCategoryLabel(product.category)}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] font-display text-base font-semibold leading-snug text-ink transition-colors hover:text-signal-dark dark:text-paper">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2">
          <Rating value={product.rating} count={product.ratingCount} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          {price ? (
            <span className="font-display text-lg font-semibold text-ink dark:text-paper">{price}</span>
          ) : (
            <span className="text-sm text-ink-muted dark:text-paper/50">Price unavailable</span>
          )}
          {originalPrice && (
            <span className="text-sm text-ink-muted line-through dark:text-paper/40">{originalPrice}</span>
          )}
        </div>

        <p className="mt-1 text-xs text-ink-muted dark:text-paper/50">Sold by {product.brand}</p>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-paper transition hover:bg-ink-soft active:scale-[0.98] dark:bg-signal dark:text-ink dark:hover:bg-signal-light"
          >
            <Eye size={14} aria-hidden="true" />
            View details
          </Link>
          {product.externalUrl && (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${product.title} on its original store (opens in a new tab)`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition hover:border-signal hover:text-signal-dark dark:border-paper/15 dark:text-paper/60"
            >
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
