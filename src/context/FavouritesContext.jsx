import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const FavouritesContext = createContext(null);
const STORAGE_KEY = 'omnifind:favourites';

function readStoredFavourites() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(readStoredFavourites);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // localStorage might be unavailable (private mode, quota exceeded) — fail silently.
    }
  }, [favourites]);

  const isFavourite = useCallback(
    (id) => favourites.some((item) => String(item.id) === String(id)),
    [favourites]
  );

  const addFavourite = useCallback((product) => {
    setFavourites((prev) => {
      if (prev.some((item) => String(item.id) === String(product.id))) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFavourite = useCallback((id) => {
    setFavourites((prev) => prev.filter((item) => String(item.id) !== String(id)));
  }, []);

  const toggleFavourite = useCallback(
    (product) => {
      if (isFavourite(product.id)) {
        removeFavourite(product.id);
      } else {
        addFavourite(product);
      }
    },
    [isFavourite, addFavourite, removeFavourite]
  );

  const value = useMemo(
    () => ({ favourites, isFavourite, addFavourite, removeFavourite, toggleFavourite }),
    [favourites, isFavourite, addFavourite, removeFavourite, toggleFavourite]
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavouritesContext() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavouritesContext must be used within a FavouritesProvider');
  return ctx;
}
