'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  rating: number;
  stock: number;
  brand: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, sortBy, minPrice, maxPrice]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/products?sort=${sortBy}`;
      
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      if (minPrice) {
        url += `&price[gte]=${minPrice}`;
      }
      if (maxPrice) {
        url += `&price[lte]=${maxPrice}`;
      }

      const response = await fetch(url);
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

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>All Products</h1>

        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>Filters</h3>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={styles.select}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.select}
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="createdAt">Oldest First</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Price Range</label>
                <div style={styles.priceInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={styles.priceInput}
                  />
                  <span style={styles.priceSeparator}>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={styles.priceInput}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSortBy('-createdAt');
                  setMinPrice('');
                  setMaxPrice('');
                }}
                style={styles.clearButton}
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <main style={styles.main}>
            {loading ? (
              <p style={styles.loadingText}>Loading products...</p>
            ) : products.length === 0 ? (
              <div style={styles.noProducts}>
                <p style={styles.noProductsText}>No products found</p>
              </div>
            ) : (
              <>
                <p style={styles.resultsCount}>{products.length} product(s) found</p>
                
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
                        <p style={styles.category}>{product.category?.name || 'Electronics'}</p>
                        
                        <Link href={`/products/${product._id}`} style={styles.nameLink}>
                          <h3 style={styles.productName}>{product.name}</h3>
                        </Link>

                        {product.brand && (
                          <p style={styles.brand}>{product.brand}</p>
                        )}

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
              </>
            )}
          </main>
        </div>
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
    maxWidth: '1400px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '32px'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '32px'
  },
  sidebar: {
    position: 'sticky' as const,
    top: '20px',
    height: 'fit-content'
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px'
  },
  filterTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '20px'
  },
  filterGroup: {
    marginBottom: '20px'
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333333',
    marginBottom: '8px',
    display: 'block'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none',
    cursor: 'pointer'
  },
  priceInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  priceInput: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none'
  },
  priceSeparator: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  clearButton: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  main: {
    minHeight: '400px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '60px'
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
  resultsCount: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '24px'
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
    marginBottom: '4px'
  },
  brand: {
    fontSize: '13px',
    color: '#9E9E9E',
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
