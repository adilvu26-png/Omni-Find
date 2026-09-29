import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavourites } from '../../hooks/useFavourites.js';

/**
 * Icon-only favourite/save toggle. Always carries an accessible label
 * since it has no visible text.
 */
export default function FavouriteButton({ product, size = 'md', className = '' }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const [justToggled, setJustToggled] = useState(false);
  const active = isFavourite(product.id);

  const dims = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';
  const iconSize = size === 'sm' ? 15 : size === 'lg' ? 22 : 17;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(product);
    setJustToggled(true);
    setTimeout(() => setJustToggled(false), 500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.title} from favourites` : `Add ${product.title} to favourites`}
      className={`flex ${dims} shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/90 backdrop-blur transition-all hover:scale-105 hover:border-beacon/40 active:scale-95 dark:border-paper/15 dark:bg-ink-soft/90 ${className}`}
    >
      <Heart
        size={iconSize}
        className={`${active ? 'fill-beacon text-beacon' : 'fill-transparent text-ink-muted dark:text-paper/70'} ${justToggled ? 'animate-heartBeat' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
}
