import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce.js';
import { fetchSearchSuggestions } from '../../services/productApi.js';

/**
 * Reusable search input. In "navigate" mode (default, used in the header
 * and hero) it pushes to /search?q=... on submit. In "controlled" mode
 * (used on the Search results page) it calls onSearch as the user types,
 * debounced, so the results page can update the URL/query without a
 * full navigation on every keystroke.
 */
export default function SearchBar({
  mode = 'navigate',
  initialValue = '',
  onSearch,
  size = 'md',
  autoFocus = false,
  placeholder = 'Search for headphones, sneakers, skincare…',
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const containerRef = useRef(null);

  const debouncedValue = useDebounce(value, 350);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounced live search for the controlled (results page) mode.
  useEffect(() => {
    if (mode !== 'controlled') return;
    onSearch?.(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, mode]);

  // Debounced, locally-cached suggestion fetch.
  useEffect(() => {
    let active = true;
    if (debouncedValue.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    setSuggestionsLoading(true);
    fetchSearchSuggestions(debouncedValue)
      .then((results) => {
        if (active) setSuggestions(results);
      })
      .catch(() => {
        if (active) setSuggestions([]);
      })
      .finally(() => {
        if (active) setSuggestionsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [debouncedValue]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runSearch = (query) => {
    setSuggestionsOpen(false);
    if (mode === 'navigate') {
      navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
    } else {
      onSearch?.(query);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(value);
  };

  const handleClear = () => {
    setValue('');
    setSuggestions([]);
    if (mode === 'controlled') onSearch?.('');
  };

  const handleSuggestionClick = (label) => {
    setValue(label);
    runSearch(label);
  };

  const paddingClass = size === 'lg' ? 'py-4 pl-14 pr-32 text-base' : 'py-2.5 pl-11 pr-20 text-sm';
  const iconInset = size === 'lg' ? 'left-5' : 'left-3.5';
  const iconSize = size === 'lg' ? 20 : 16;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} role="search" aria-label="Search products">
        <div className="relative">
          <Search
            size={iconSize}
            className={`pointer-events-none absolute ${iconInset} top-1/2 -translate-y-1/2 text-ink-muted dark:text-paper/50`}
            aria-hidden="true"
          />
          <label htmlFor="omnifind-search-input" className="sr-only">
            Search products
          </label>
          <input
            id="omnifind-search-input"
            type="text"
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setSuggestionsOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className={`w-full rounded-full border border-ink/10 bg-white text-ink shadow-sm outline-none transition focus:border-signal focus:shadow-glow dark:border-paper/15 dark:bg-ink-soft dark:text-paper ${paddingClass}`}
          />

          <div className={`absolute ${size === 'lg' ? 'right-2 top-1/2 -translate-y-1/2' : 'right-1.5 top-1/2 -translate-y-1/2'} flex items-center gap-1.5`}>
            {suggestionsLoading && (
              <Loader2 size={16} className="animate-spin text-ink-muted dark:text-paper/50" aria-hidden="true" />
            )}
            {value && !suggestionsLoading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition hover:bg-sand dark:text-paper/50 dark:hover:bg-ink"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
            <button
              type="submit"
              className={`inline-flex items-center justify-center rounded-full bg-signal font-semibold text-ink transition hover:bg-signal-light active:scale-95 ${
                size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-4 py-1.5 text-xs'
              }`}
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {suggestionsOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="animate-riseIn absolute z-30 mt-2 w-full overflow-hidden rounded-xl2 border border-ink/10 bg-white py-1.5 shadow-cardHover dark:border-paper/15 dark:bg-ink-soft"
        >
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => handleSuggestionClick(s.label)}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink transition hover:bg-sand dark:text-paper dark:hover:bg-ink"
              >
                <Search size={14} className="shrink-0 text-ink-muted dark:text-paper/50" aria-hidden="true" />
                <span className="truncate">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
