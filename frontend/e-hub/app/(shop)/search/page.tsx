'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setSearchQuery(query);
    if (query) {
      searchProducts(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const searchProducts = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?search=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.searchHeader}>
          <h1 style={styles.title}>Search Products</h1>
          
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for electronics..."
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <p style={styles.loadingText}>Searching...</p>
        ) : (
          <>
            {query && (
              <p style={styles.resultsInfo}>
                {products.length} result(s) found for "{query}"
              </p>
            )}

            {products.length === 0 && query ? (
              <div style={styles.noResults}>
                <h2 style={styles.noResultsTitle}>No products found</h2>
                <p style={styles.noResultsText}>
                  Try different keywords or browse our categories
                </p>
                <Link href="/products" style={styles.browseButton}>
                  Browse All Products
                </Link>
              </div>
            ) : (
              <div style={styles.productsGrid}>
                {products.map((product) => (
                  <Link 
                    key={product._id} 
                    href={`/products/${product._id}`}
                    style={styles.productCard}
                  >
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

                    <div style={styles.productInfo}>
                      <p style={styles.category}>{product.category?.name || 'Electronics'}</p>
                      <h3 style={styles.productName}>{product.name}</h3>
                      <p style={styles.description}>
                        {product.description.substring(0, 100)}...
                      </p>

                      <div style={styles.productFooter}>
                        <div style={styles.ratingContainer}>
                          <span style={styles.rating}>⭐ {product.rating || 0}</span>
                        </div>
                        <p style={styles.price}>₹{product.price.toLocaleString()}</p>
                      </div>

                      {product.stock === 0 && (
                        <p style={styles.outOfStock}>Out of Stock</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
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
  searchHeader: {
    marginBottom: '40px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '24px'
  },
  searchForm: {
    display: 'flex',
    gap: '12px',
    maxWidth: '600px'
  },
  searchInput: {
    flex: 1,
    padding: '14px 20px',
    fontSize: '16px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none'
  },
  searchButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '60px'
  },
  resultsInfo: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '24px'
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  noResultsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  noResultsText: {
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'block',
    transition: 'transform 0.2s'
  },
  imageContainer: {
    width: '100%',
    height: '250px',
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
    padding: '20px'
  },
  category: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginBottom: '8px',
    textTransform: 'uppercase' as const
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  description: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  rating: {
    fontSize: '14px',
    color: '#333333'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  outOfStock: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginTop: '12px',
    fontStyle: 'italic'
  }
};
