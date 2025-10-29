'use client';

import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category?: {
    name: string;
  };
  rating: number;
  stock: number;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px'
  }
};
