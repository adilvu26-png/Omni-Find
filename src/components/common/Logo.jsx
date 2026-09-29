function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-ink dark:fill-signal" />
      <circle cx="28" cy="28" r="14" stroke="#3FCBBC" strokeWidth="4" />
      <path d="M23 33L17 25L33 20L28 33Z" fill="#FF6B4D" />
      <line x1="38" y1="38" x2="48" y2="48" stroke="#3FCBBC" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ withWordmark = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {withWordmark && (
        <span className="font-display text-xl font-semibold tracking-tight text-ink dark:text-paper">
          Omni <span className="text-signal">Find</span>
        </span>
      )}
    </span>
  );
}
