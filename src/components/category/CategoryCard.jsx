import { Link } from 'react-router-dom';
import { getCategoryVisual } from '../../utils/categoryIcons.js';
import { formatCategoryLabel } from '../../utils/helpers.js';

export default function CategoryCard({ slug, label, style }) {
  const { icon: Icon } = getCategoryVisual(slug);

  return (
    <Link
      to={`/category/${encodeURIComponent(slug)}`}
      style={style}
      className="group animate-riseIn relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl2 border border-ink/5 bg-gradient-to-br from-white to-sand p-4 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover dark:border-paper/10 dark:from-ink-soft dark:to-ink"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-signal/10 text-signal-dark transition-transform duration-300 group-hover:scale-110 dark:text-signal-light">
        <Icon size={22} aria-hidden="true" />
      </div>
      <span className="font-display text-sm font-semibold text-ink dark:text-paper">
        {formatCategoryLabel(label)}
      </span>
    </Link>
  );
}
