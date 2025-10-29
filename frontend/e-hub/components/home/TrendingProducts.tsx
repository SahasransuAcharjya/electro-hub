'use client';

import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  category?: {
    name: string;
  };
}

interface TrendingProductsProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export default function TrendingProducts({ products, onAddToCart }: TrendingProductsProps) {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Trending Products</h2>
          <p style={styles.subtitle}>Most popular items this week</p>
        </div>
        <Link href="/products" style={styles.viewAllLink}>
          View All →
        </Link>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.productCard}>
            <div style={styles.trendingBadge}>🔥 Trending</div>
            
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
              {product.category && (
                <p style={styles.category}>{product.category.name}</p>
              )}
              
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
    margin: '0 auto',
    backgroundColor: '#F8F8F8'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#9E9E9E'
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
    overflow: 'hidden',
    position: 'relative' as const
  },
  trendingBadge: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '4px',
    zIndex: 10
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
