'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(false);
    setWishlist([]);
  }, []);

  const removeFromWishlist = (productId: string) => {
    alert('Removed from wishlist! (Feature in development)');
  };

  const addToCart = (productId: string) => {
    alert('Added to cart! (Feature in development)');
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div style={styles.emptyWishlist}>
            <div style={styles.emptyIcon}>❤️</div>
            <h2 style={styles.emptyTitle}>Your Wishlist is Empty</h2>
            <p style={styles.emptyText}>Save items you love for later</p>
            <Link href="/products" style={styles.browseButton}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {wishlist.map((product) => (
              <div key={product._id} style={styles.productCard}>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  style={styles.removeButton}
                >
                  ✕
                </button>

                <Link href={`/products/${product._id}`} style={styles.imageLink}>
                  <div style={styles.imageContainer}>
                    {product.images && product.images[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        style={styles.productImage}
                      />
                    ) : (
                      <div style={styles.imagePlaceholder}>No Image</div>
                    )}
                  </div>
                </Link>

                <div style={styles.productInfo}>
                  <Link href={`/products/${product._id}`} style={styles.nameLink}>
                    <h3 style={styles.productName}>{product.name}</h3>
                  </Link>

                  <p style={styles.price}>₹{product.price.toLocaleString()}</p>

                  {product.stock === 0 ? (
                    <p style={styles.outOfStock}>Out of Stock</p>
                  ) : (
                    <button
                      onClick={() => addToCart(product._id)}
                      style={styles.addButton}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8F8F8',
    padding: '40px 20px'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '32px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  emptyWishlist: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '24px'
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  emptyText: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '32px'
  },
  browseButton: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  productsGrid: {
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
  removeButton: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    width: '32px',
    height: '32px',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '50%',
    fontSize: '16px',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
  productImage: {
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
  nameLink: {
    textDecoration: 'none'
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '12px'
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
