import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-signal/10">
        <Compass size={36} className="text-signal-dark" aria-hidden="true" />
      </div>
      <p className="font-display text-6xl font-semibold text-ink dark:text-paper">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink dark:text-paper">
        This page wandered off the map
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-muted dark:text-paper/60">
        We couldn't find what you were looking for. Let's get you back to discovering products.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:shadow-cardHover dark:bg-signal dark:text-ink"
      >
        Back to homepage
      </Link>
    </div>
  );
}
