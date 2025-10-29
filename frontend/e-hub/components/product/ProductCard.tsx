'use client';

import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div style={styles.card}>
      <Link href={`/products/${product._id}`} style={styles.imageLink}>
        <div style={styles.imageContainer}>
          {product.images && product.images[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
              style={styles.image}
            />
          ) : (
            <div style={styles.imagePlaceholder}>No Image</div>
          )}
        </div>
      </Link>

      <div style={styles.info}>
        {product.category && (
          <p style={styles.category}>{product.category.name}</p>
        )}
        
        <Link href={`/products/${product._id}`} style={styles.nameLink}>
          <h3 style={styles.name}>{product.name}</h3>
        </Link>

        <div style={styles.ratingRow}>
          <span style={styles.rating}>⭐ {product.rating || 0}</span>
        </div>

        <p style={styles.price}>₹{product.price.toLocaleString()}</p>

        {product.stock === 0 ? (
          <p style={styles.outOfStock}>Out of Stock</p>
        ) : (
          onAddToCart && (
            <button
              onClick={() => onAddToCart(product._id)}
              style={styles.addButton}
            >
              Add to Cart
            </button>
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  imageLink: {
    display: 'block',
    textDecoration: 'none'
  },
  imageContainer: {
    width: '100%',
    height: '220px',
    backgroundColor: '#F8F8F8'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: '#9E9E9E',
    backgroundColor: '#F5F5F5'
  },
  info: {
    padding: '16px'
  },
  category: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginBottom: '8px',
    textTransform: 'uppercase' as const
  },
  nameLink: {
    textDecoration: 'none'
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  ratingRow: {
    marginBottom: '12px'
  },
  rating: {
    fontSize: '14px',
    color: '#333333'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  outOfStock: {
    fontSize: '14px',
    color: '#9E9E9E',
    fontStyle: 'italic'
  },
  addButton: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
