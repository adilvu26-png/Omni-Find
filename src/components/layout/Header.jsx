import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X, Moon, Sun, Compass } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import SearchBar from '../search/SearchBar.jsx';
import { useFavourites } from '../../hooks/useFavourites.js';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { favourites } = useFavourites();
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-signal-dark dark:text-signal-light' : 'text-ink-muted hover:text-ink dark:text-paper/70 dark:hover:text-paper'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/85 backdrop-blur-md dark:border-paper/10 dark:bg-ink/85">
      <div className="container-app flex h-16 items-center gap-4 sm:gap-6">
        <NavLink to="/" className="shrink-0" aria-label="Omni Find home">
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/#categories" className={linkClass}>
            Categories
          </NavLink>
          <NavLink to="/search?sort=rating-desc" className={linkClass}>
            Trending
          </NavLink>
          <NavLink to="/favourites" className={linkClass}>
            Favourites
          </NavLink>
        </nav>

        <div className="hidden flex-1 md:block lg:max-w-md">
          <SearchBar size="sm" placeholder="Search products…" />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-sand dark:text-paper/70 dark:hover:bg-ink-soft"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          <NavLink
            to="/favourites"
            aria-label={`Favourites (${favourites.length} saved)`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-sand dark:text-paper/70 dark:hover:bg-ink-soft"
          >
            <Heart size={18} aria-hidden="true" />
            {favourites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-beacon px-1 text-[10px] font-bold text-white">
                {favourites.length}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-sand dark:text-paper/70 dark:hover:bg-ink-soft lg:hidden"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-riseIn border-t border-ink/5 bg-paper px-4 pb-5 pt-4 dark:border-paper/10 dark:bg-ink lg:hidden">
          <div className="mb-4 md:hidden">
            <SearchBar size="sm" placeholder="Search products…" />
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <NavLink to="/" end onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-sand dark:text-paper dark:hover:bg-ink-soft">
              <Compass size={16} aria-hidden="true" /> Home
            </NavLink>
            <NavLink to="/#categories" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 pl-9 text-sm font-medium text-ink hover:bg-sand dark:text-paper dark:hover:bg-ink-soft">
              Categories
            </NavLink>
            <NavLink to="/search?sort=rating-desc" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 pl-9 text-sm font-medium text-ink hover:bg-sand dark:text-paper dark:hover:bg-ink-soft">
              Trending
            </NavLink>
            <NavLink to="/favourites" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 pl-9 text-sm font-medium text-ink hover:bg-sand dark:text-paper dark:hover:bg-ink-soft">
              Favourites
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
