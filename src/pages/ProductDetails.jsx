import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Rating from '../components/common/Rating.jsx';
import FavouriteButton from '../components/product/FavouriteButton.jsx';
import { ProductDetailsSkeleton } from '../components/common/LoadingSkeleton.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import { fetchProductById } from '../services/productApi.js';
import { formatPrice } from '../utils/formatPrice.js';
import { formatCategoryLabel, FALLBACK_IMAGE } from '../utils/helpers.js';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(0);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    document.title = product ? `${product.title} — Omni Find` : 'Product — Omni Find';
  }, [product]);

  if (loading) {
    return (
      <div className="container-app py-10">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-app py-10">
        <ErrorState
          title="We couldn't load this product"
          description="It may have been removed, or there was a network issue."
          onRetry={load}
        />
      </div>
    );
  }

  if (!product) return null;

  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);
  const images = product.images.length ? product.images : [FALLBACK_IMAGE];

  return (
    <div className="container-app animate-riseIn py-10">
      <button
        type="button"
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
        className="mb-8 flex items-center gap-1.5 text-sm font-medium text-ink-muted transition hover:text-ink dark:text-paper/60 dark:hover:text-paper"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-xl2 border border-ink/5 bg-sand dark:border-paper/10 dark:bg-ink">
            <img
              src={images[activeImage] || FALLBACK_IMAGE}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  aria-current={i === activeImage}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === activeImage ? 'border-signal' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <Link
            to={`/category/${product.category}`}
            className="text-xs font-semibold uppercase tracking-wide text-signal-dark dark:text-signal-light"
          >
            {formatCategoryLabel(product.category)}
          </Link>

          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink dark:text-paper sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-3">
            <Rating value={product.rating} count={product.ratingCount} size={16} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            {price ? (
              <span className="font-display text-3xl font-semibold text-ink dark:text-paper">{price}</span>
            ) : (
              <span className="text-ink-muted dark:text-paper/50">Price unavailable</span>
            )}
            {originalPrice && (
              <span className="text-lg text-ink-muted line-through dark:text-paper/40">{originalPrice}</span>
            )}
            {product.discountPercentage > 0 && (
              <span className="rounded-full bg-beacon/10 px-2.5 py-1 text-xs font-semibold text-beacon-dark">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-ink-muted dark:text-paper/50">Sold by {product.brand}</p>

          {product.description && (
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink-muted dark:text-paper/70">
              {product.description}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <FavouriteButton product={product} size="lg" />
            {product.externalUrl ? (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:shadow-cardHover active:translate-y-0 dark:bg-signal dark:text-ink"
              >
                Visit store
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-medium text-ink-muted dark:bg-ink-soft dark:text-paper/50">
                No external store link available for this listing
              </span>
            )}
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-ink/5 pt-6 text-sm dark:border-paper/10 sm:grid-cols-2">
            {product.shippingInformation && (
              <div className="flex items-start gap-2.5">
                <Truck size={16} className="mt-0.5 shrink-0 text-signal-dark dark:text-signal-light" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-ink dark:text-paper">Shipping</dt>
                  <dd className="text-ink-muted dark:text-paper/60">{product.shippingInformation}</dd>
                </div>
              </div>
            )}
            {product.returnPolicy && (
              <div className="flex items-start gap-2.5">
                <RotateCcw size={16} className="mt-0.5 shrink-0 text-signal-dark dark:text-signal-light" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-ink dark:text-paper">Returns</dt>
                  <dd className="text-ink-muted dark:text-paper/60">{product.returnPolicy}</dd>
                </div>
              </div>
            )}
            {product.warrantyInformation && (
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-signal-dark dark:text-signal-light" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-ink dark:text-paper">Warranty</dt>
                  <dd className="text-ink-muted dark:text-paper/60">{product.warrantyInformation}</dd>
                </div>
              </div>
            )}
            {typeof product.stock === 'number' && (
              <div>
                <dt className="font-medium text-ink dark:text-paper">Availability</dt>
                <dd className="text-ink-muted dark:text-paper/60">
                  {product.availabilityStatus || (product.stock > 0 ? `${product.stock} in stock` : 'Out of stock')}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
