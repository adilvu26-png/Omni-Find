import { useFavouritesContext } from '../context/FavouritesContext.jsx';

/**
 * Thin convenience wrapper around FavouritesContext so components
 * don't need to know where favourites state actually lives.
 */
export function useFavourites() {
  return useFavouritesContext();
}
