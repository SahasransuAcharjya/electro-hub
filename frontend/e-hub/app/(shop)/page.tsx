'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockProducts, mockCategories } from '@/lib/mockProducts';

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
  isFeatured: boolean;
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function HomePage() {
  const router = useRouter();
  const [featuredProducts] = useState<Product[]>(mockProducts.filter(p => p.isFeatured));
  const [categories] = useState<Category[]>(mockCategories);

  const handleAddToCart = async (productId: string) => {
    // Simulate add to cart for mock setup
    alert('Simulated adding product to cart: ' + productId);
  };

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to Electro-Hub</h1>
          <p style={styles.heroSubtitle}>
            Discover the latest electronics and gadgets at unbeatable prices
          </p>
          <Link href="/products" style={styles.heroButton}>
            Shop Now
          </Link>
        </div>
      </section>

      {categories.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>Shop by Category</h2>
            <div style={styles.categoriesGrid}>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products/category/${category._id}`}
                  style={styles.categoryCard}
                >
                  <div style={styles.categoryImageContainer}>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        style={styles.categoryImage}
                      />
                    ) : (
                      <div style={styles.categoryPlaceholder}>
                        {category.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Featured Products</h2>
            <Link href="/products" style={styles.viewAllLink}>
              View All →
            </Link>
          </div>

          <div style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <div key={product._id} style={styles.productCard}>
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
                  <p style={styles.category}>{product.category?.name || 'Electronics'}</p>

                  <Link href={`/products/${product._id}`} style={styles.nameLink}>
                    <h3 style={styles.productName}>{product.name}</h3>
                  </Link>

                  <div style={styles.ratingRow}>
                    <span style={styles.rating}>⭐ {product.rating || 0}</span>
                  </div>

                  <p style={styles.price}>₹{product.price.toLocaleString()}</p>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    style={styles.addButton}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <div style={styles.sectionContent}>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🚚</div>
              <h3 style={styles.featureTitle}>Free Shipping</h3>
              <p style={styles.featureText}>On orders above ₹500</p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🔒</div>
              <h3 style={styles.featureTitle}>Secure Payment</h3>
              <p style={styles.featureText}>100% secure transactions</p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>↩️</div>
              <h3 style={styles.featureTitle}>Easy Returns</h3>
              <p style={styles.featureText}>7-day return policy</p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💬</div>
              <h3 style={styles.featureTitle}>24/7 Support</h3>
              <p style={styles.featureText}>Always here to help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


const styles = {
  container: {
    backgroundColor: '#F8F8F8'
  },
  hero: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '80px 20px',
    textAlign: 'center' as const
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#F5F5F5',
    marginBottom: 32,
    lineHeight: 1.6
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '16px 40px',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 4,
    textDecoration: 'none'
  },
  section: {
    padding: '60px 20px'
  },
  sectionContent: {
    maxWidth: 1400,
    margin: '0 auto'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  viewAllLink: {
    fontSize: 16,
    color: '#333333',
    textDecoration: 'none',
    fontWeight: 500
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 24
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 8,
    textAlign: 'center' as const,
    textDecoration: 'none',
    transition: 'transform 0.2s'
  },
  categoryImageContainer: {
    width: 100,
    height: 100,
    margin: '0 auto 16px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#F8F8F8'
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  categoryPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#F5F5F5'
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A'
  },
  loadingText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center' as const
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 24
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden'
  },
  imageLink: {
    display: 'block',
    textDecoration: 'none'
  },
  imageContainer: {
    width: '100%',
    height: 220,
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
    fontSize: 14,
    color: '#9E9E9E',
    backgroundColor: '#F5F5F5'
  },
  productInfo: {
    padding: 16
  },
  category: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 8,
    textTransform: 'uppercase' as const
  },
  nameLink: {
    textDecoration: 'none'
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8
  },
  ratingRow: {
    marginBottom: 12
  },
  rating: {
    fontSize: 14,
    color: '#333333'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12
  },
  addButton: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 12,
    fontSize: 14,
    fontWeight: '600',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    padding: '60px 20px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 32
  },
  featureCard: {
    textAlign: 'center' as const
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8
  },
  featureText: {
    fontSize: 14,
    color: '#9E9E9E'
  }
};
