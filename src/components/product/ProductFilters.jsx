import { useEffect, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { clamp } from '../../utils/helpers.js';

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: Highest First' },
];

const ABSOLUTE_MAX = 5000;

export default function ProductFilters({ minPrice, maxPrice, sort, onChange, onReset }) {
  const [localMin, setLocalMin] = useState(minPrice ?? '');
  const [localMax, setLocalMax] = useState(maxPrice ?? '');

  useEffect(() => setLocalMin(minPrice ?? ''), [minPrice]);
  useEffect(() => setLocalMax(maxPrice ?? ''), [maxPrice]);

  const commit = (next) => onChange(next);

  const handleMinSlider = (e) => {
    const value = clamp(Number(e.target.value), 0, Number(localMax) || ABSOLUTE_MAX);
    setLocalMin(value);
    commit({ minPrice: value, maxPrice });
  };

  const handleMaxSlider = (e) => {
    const value = clamp(Number(e.target.value), Number(localMin) || 0, ABSOLUTE_MAX);
    setLocalMax(value);
    commit({ minPrice, maxPrice: value });
  };

  const hasActiveFilters = minPrice !== '' && minPrice !== undefined && minPrice !== null
    ? true
    : maxPrice !== '' && maxPrice !== undefined && maxPrice !== null;

  return (
    <div className="rounded-xl2 border border-ink/5 bg-white p-5 shadow-card dark:border-paper/10 dark:bg-ink-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-ink dark:text-paper">
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-ink-muted transition hover:text-beacon dark:text-paper/60"
          >
            <X size={13} aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      <div className="mt-5">
        <label className="text-xs font-medium text-ink-muted dark:text-paper/60" htmlFor="sort-select">
          Sort by
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => commit({ sort: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-signal dark:border-paper/15 dark:bg-ink dark:text-paper"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mt-6">
        <legend className="text-xs font-medium text-ink-muted dark:text-paper/60">Price range</legend>

        <div className="mt-2 flex items-center gap-2">
          <label className="sr-only" htmlFor="min-price-input">
            Minimum price
          </label>
          <input
            id="min-price-input"
            type="number"
            min="0"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onBlur={() => commit({ minPrice: localMin === '' ? '' : Number(localMin) })}
            className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-signal dark:border-paper/15 dark:bg-ink dark:text-paper"
          />
          <span className="text-ink-muted dark:text-paper/40">–</span>
          <label className="sr-only" htmlFor="max-price-input">
            Maximum price
          </label>
          <input
            id="max-price-input"
            type="number"
            min="0"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onBlur={() => commit({ maxPrice: localMax === '' ? '' : Number(localMax) })}
            className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-signal dark:border-paper/15 dark:bg-ink dark:text-paper"
          />
        </div>

        <div className="relative mt-5 h-1">
          <div className="absolute inset-0 rounded-full bg-sand dark:bg-ink" />
          <div
            className="absolute h-1 rounded-full bg-signal"
            style={{
              left: `${(clamp(Number(localMin) || 0, 0, ABSOLUTE_MAX) / ABSOLUTE_MAX) * 100}%`,
              right: `${100 - (clamp(Number(localMax) || ABSOLUTE_MAX, 0, ABSOLUTE_MAX) / ABSOLUTE_MAX) * 100}%`,
            }}
          />
          <input
            type="range"
            min="0"
            max={ABSOLUTE_MAX}
            value={clamp(Number(localMin) || 0, 0, ABSOLUTE_MAX)}
            onChange={handleMinSlider}
            aria-label="Minimum price slider"
            className="range-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
          />
          <input
            type="range"
            min="0"
            max={ABSOLUTE_MAX}
            value={clamp(Number(localMax) || ABSOLUTE_MAX, 0, ABSOLUTE_MAX)}
            onChange={handleMaxSlider}
            aria-label="Maximum price slider"
            className="range-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
          />
        </div>
      </fieldset>
    </div>
  );
}
