import { Star } from 'lucide-react';

/**
 * Displays a star rating with an optional review count.
 * Renders nothing meaningful if rating is missing (per spec: missing
 * data should never break the UI).
 */
export default function Rating({ value, count, size = 14, className = '' }) {
  if (value === null || value === undefined) {
    return <span className={`text-xs text-ink-muted dark:text-paper/50 ${className}`}>No ratings yet</span>;
  }

  const rounded = Math.round(value);

  return (
    <div className={`flex items-center gap-1 ${className}`} role="img" aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rounded ? 'fill-gold text-gold' : 'fill-transparent text-ink-muted/40 dark:text-paper/25'}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-ink-muted dark:text-paper/70">
        {value.toFixed(1)}
        {typeof count === 'number' && count > 0 && (
          <span className="text-ink-muted/70 dark:text-paper/50"> ({count})</span>
        )}
      </span>
    </div>
  );
}
