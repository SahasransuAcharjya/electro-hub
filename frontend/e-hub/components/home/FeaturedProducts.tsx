'use client';

import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
  rating: number;
}

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export default function FeaturedProducts({ products, onAddToCart }: FeaturedProductsProps) {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Featured Products</h2>
        <Link href="/products" style={styles.viewAllLink}>
          View All →
        </Link>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.productCard}>
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

            <div style={styles.productInfo}>
              <p style={styles.category}>{product.category?.name || 'Electronics'}</p>
              
              <Link href={`/products/${product._id}`} style={styles.nameLink}>
                <h3 style={styles.productName}>{product.name}</h3>
              </Link>

              <div style={styles.ratingRow}>
                <span style={styles.rating}>⭐ {product.rating || 0}</span>
              </div>

              <p style={styles.price}>₹{product.price.toLocaleString()}</p>

              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(product._id)}
                  style={styles.addButton}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '60px 20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  viewAllLink: {
    fontSize: '16px',
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px'
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden'
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
  productInfo: {
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
  productName: {
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
