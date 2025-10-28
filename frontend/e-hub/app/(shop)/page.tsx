'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=8`);
      const data = await response.json();

      if (response.ok) {
        setFeaturedProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await response.json();

      if (response.ok) {
        setCategories(data.categories?.slice(0, 6) || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity: 1 })
      });

      if (response.ok) {
        alert('Product added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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

          {loading ? (
            <p style={styles.loadingText}>Loading products...</p>
          ) : (
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
          )}
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
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#F5F5F5',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '16px 40px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  section: {
    padding: '60px 20px'
  },
  sectionContent: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  sectionTitle: {
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
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '24px'
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    transition: 'transform 0.2s'
  },
  categoryImageContainer: {
    width: '100px',
    height: '100px',
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
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#F5F5F5'
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const
  },
  productsGrid: {
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
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    padding: '60px 20px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px'
  },
  featureCard: {
    textAlign: 'center' as const
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  featureText: {
    fontSize: '14px',
    color: '#9E9E9E'
  }
};
