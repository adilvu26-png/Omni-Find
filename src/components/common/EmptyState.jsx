export default function EmptyState({ icon: Icon, title, description, action, tips }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-ink/5 bg-white/60 px-6 py-16 text-center dark:border-paper/10 dark:bg-ink-soft/50">
      {Icon && (
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sand dark:bg-ink-soft">
          <Icon size={28} className="text-ink-muted dark:text-paper/60" aria-hidden="true" />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-ink dark:text-paper">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-muted dark:text-paper/60">{description}</p>
      )}
      {tips && tips.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-ink-muted dark:text-paper/60">
          {tips.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
