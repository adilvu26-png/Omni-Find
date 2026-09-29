export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl2 border border-ink/5 bg-white dark:border-paper/10 dark:bg-ink-soft">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-2.5 p-4">
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-4 w-2/5 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="skeleton aspect-square w-full rounded-xl2" />
      <div className="space-y-4">
        <div className="skeleton h-4 w-24 rounded-full" />
        <div className="skeleton h-8 w-4/5 rounded-full" />
        <div className="skeleton h-6 w-32 rounded-full" />
        <div className="skeleton h-10 w-40 rounded-full" />
        <div className="space-y-2 pt-4">
          <div className="skeleton h-3 w-full rounded-full" />
          <div className="skeleton h-3 w-11/12 rounded-full" />
          <div className="skeleton h-3 w-3/4 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return <div className="skeleton aspect-[4/3] w-full rounded-xl2" />;
}

export function CategoryGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
