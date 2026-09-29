import CategoryCard from './CategoryCard.jsx';

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {categories.map((cat, i) => (
        <CategoryCard key={cat.slug} slug={cat.slug} label={cat.label} style={{ animationDelay: `${i * 40}ms` }} />
      ))}
    </div>
  );
}
