import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load the products. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-beacon/20 bg-beacon/5 px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-beacon/10">
        <AlertTriangle size={28} className="text-beacon-dark" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink dark:text-paper">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-muted dark:text-paper/60">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:shadow-cardHover active:translate-y-0 dark:bg-signal dark:text-ink"
        >
          <RotateCw size={16} aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}
