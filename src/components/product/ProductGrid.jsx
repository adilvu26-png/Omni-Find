import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }} />
      ))}
    </div>
  );
}
