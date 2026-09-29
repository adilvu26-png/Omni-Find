import {
  Smartphone,
  Shirt,
  Sparkles,
  Home,
  Dumbbell,
  BookOpen,
  Watch,
  ShoppingBasket,
  Car,
  Gem,
  Sofa,
  Laptop,
  Package,
} from 'lucide-react';

/**
 * Maps a DummyJSON category slug to a representative icon + friendly label.
 * DummyJSON's raw categories (e.g. "mens-shirts", "sunglasses",
 * "home-decoration") don't map 1:1 onto a generic "Fashion/Home/Sports"
 * set, so keyword matching picks the closest fit and falls back to a
 * neutral package icon for anything unmatched.
 */
const RULES = [
  { test: /phone|laptop|tablet/, icon: Smartphone, label: 'Electronics' },
  { test: /shirt|dress|top|shoe|shirts/, icon: Shirt, label: 'Fashion' },
  { test: /skincare|fragrance|beauty/, icon: Sparkles, label: 'Beauty' },
  { test: /furniture|decoration|home/, icon: Sofa, label: 'Home' },
  { test: /sport|motorcycle|vehicle/, icon: Dumbbell, label: 'Sports' },
  { test: /grocer|food/, icon: ShoppingBasket, label: 'Grocery' },
  { test: /book/, icon: BookOpen, label: 'Books' },
  { test: /watch|sunglasses|jewel/, icon: Watch, label: 'Accessories' },
  { test: /vehicle|car|moto/, icon: Car, label: 'Automotive' },
  { test: /gem|jewellery|jewelry/, icon: Gem, label: 'Jewellery' },
  { test: /laptop/, icon: Laptop, label: 'Computers' },
];

export function getCategoryVisual(slug = '') {
  const match = RULES.find((rule) => rule.test.test(slug));
  return match ? { icon: match.icon } : { icon: Package };
}
