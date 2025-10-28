'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  stock: number;
}

interface Category {
  _id: string;
  name: string;
  description: string;
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`);
      const data = await response.json();

      if (response.ok) {
        setCategory(data.category);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/category/${categoryId}`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Link href="/products" style={styles.breadcrumb}>
          ← Back to All Products
        </Link>

        {category && (
          <div style={styles.categoryHeader}>
            <h1 style={styles.categoryTitle}>{category.name}</h1>
            {category.description && (
              <p style={styles.categoryDescription}>{category.description}</p>
            )}
          </div>
        )}

        <p style={styles.resultsCount}>{products.length} product(s) found</p>

        {products.length === 0 ? (
          <div style={styles.noProducts}>
            <p style={styles.noProductsText}>No products in this category</p>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {products.map((product) => (
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
                  <Link href={`/products/${product._id}`} style={styles.nameLink}>
                    <h3 style={styles.productName}>{product.name}</h3>
                  </Link>

                  <div style={styles.ratingRow}>
                    <span style={styles.rating}>⭐ {product.rating || 0}</span>
                  </div>

                  <p style={styles.price}>₹{product.price.toLocaleString()}</p>

                  {product.stock === 0 ? (
                    <p style={styles.outOfStock}>Out of Stock</p>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product._id)}
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
  breadcrumb: {
    display: 'inline-block',
    color: '#333333',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '24px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  categoryHeader: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px',
    marginBottom: '32px'
  },
  categoryTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  categoryDescription: {
    fontSize: '16px',
    color: '#9E9E9E',
    lineHeight: '1.6'
  },
  resultsCount: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '24px'
  },
  noProducts: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  noProductsText: {
    fontSize: '18px',
    color: '#9E9E9E'
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
