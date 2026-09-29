import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from '../common/Logo.jsx';

const EXPLORE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/favourites', label: 'Favourites' },
];

const CATEGORY_LINKS = [
  { to: '/category/smartphones', label: 'Electronics' },
  { to: '/category/mens-shirts', label: 'Fashion' },
  { to: '/category/skincare', label: 'Beauty' },
  { to: '/category/furniture', label: 'Home' },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-white dark:border-paper/10 dark:bg-ink-soft">
      <div className="container-app grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-muted dark:text-paper/60">
            Find anything. Anywhere. Omni Find helps you discover, compare and save products
            from across the web in one clean, focused place.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Omni Find on Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition hover:border-signal hover:text-signal-dark dark:border-paper/15 dark:text-paper/60"
            >
              <Twitter size={15} aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-label="Omni Find on GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition hover:border-signal hover:text-signal-dark dark:border-paper/15 dark:text-paper/60"
            >
              <Github size={15} aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-label="Omni Find on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition hover:border-signal hover:text-signal-dark dark:border-paper/15 dark:text-paper/60"
            >
              <Linkedin size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-ink dark:text-paper">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-ink-muted transition hover:text-signal-dark dark:text-paper/60 dark:hover:text-signal-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-ink dark:text-paper">Categories</h3>
          <ul className="mt-4 space-y-2.5">
            {CATEGORY_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-ink-muted transition hover:text-signal-dark dark:text-paper/60 dark:hover:text-signal-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-ink dark:text-paper">About this project</h3>
          <p className="mt-4 text-sm text-ink-muted dark:text-paper/60">
            Product data is provided by the free DummyJSON API for demonstration purposes.
            Omni Find's service layer is built so a production data source can be swapped in
            without changing the UI.
          </p>
        </div>
      </div>

      <div className="border-t border-ink/5 py-6 dark:border-paper/10">
        <p className="container-app text-center text-xs text-ink-muted dark:text-paper/50">
          © {new Date().getFullYear()} Omni Find. Built as a portfolio project. Product data via{' '}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-signal-dark"
          >
            DummyJSON
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
