'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  brand: string;
  rating: number;
  specifications: { [key: string]: string };
  stock: number;
}

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productIds = searchParams.get('products')?.split(',') || [];
    if (productIds.length > 0) {
      fetchProducts(productIds);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchProducts = async (ids: string[]) => {
    try {
      const fetchedProducts = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
          const data = await response.json();
          return data.product;
        })
      );
      setProducts(fetchedProducts.filter(p => p));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p._id !== productId);
    setProducts(updatedProducts);
    
    if (updatedProducts.length === 0) {
      router.push('/products');
    }
  };

  const getAllSpecKeys = () => {
    const keys = new Set<string>();
    products.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(key => keys.add(key));
      }
    });
    return Array.from(keys);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.emptyState}>
            <h1 style={styles.emptyTitle}>No Products to Compare</h1>
            <p style={styles.emptyText}>Add products to compare their features side by side.</p>
            <Link href="/products" style={styles.browseButton}>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const specKeys = getAllSpecKeys();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Compare Products</h1>
        <p style={styles.subtitle}>Comparing {products.length} product(s)</p>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.headerCell}>Feature</th>
                {products.map((product) => (
                  <th key={product._id} style={styles.productHeaderCell}>
                    <button
                      onClick={() => removeProduct(product._id)}
                      style={styles.removeButton}
                    >
                      ✕
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr style={styles.row}>
                <td style={styles.labelCell}>Product</td>
                {products.map((product) => (
                  <td key={product._id} style={styles.dataCell}>
                    <div style={styles.productInfo}>
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          style={styles.productImage}
                        />
                      ) : (
                        <div style={styles.imagePlaceholder}>No Image</div>
                      )}
                      <h3 style={styles.productName}>{product.name}</h3>
                    </div>
                  </td>
                ))}
              </tr>

              <tr style={styles.row}>
                <td style={styles.labelCell}>Price</td>
                {products.map((product) => (
                  <td key={product._id} style={styles.dataCell}>
                    <span style={styles.price}>₹{product.price.toLocaleString()}</span>
                  </td>
                ))}
              </tr>

              <tr style={styles.row}>
                <td style={styles.labelCell}>Brand</td>
                {products.map((product) => (
                  <td key={product._id} style={styles.dataCell}>
                    {product.brand || 'N/A'}
                  </td>
                ))}
              </tr>

              <tr style={styles.row}>
                <td style={styles.labelCell}>Rating</td>
                {products.map((product) => (
                  <td key={product._id} style={styles.dataCell}>
                    ⭐ {product.rating || 0}/5
                  </td>
                ))}
              </tr>

              <tr style={styles.row}>
                <td style={styles.labelCell}>Availability</td>
                {products.map((product) => (
                  <td key={product._id} style={styles.dataCell}>
                    {product.stock > 0 ? (
                      <span style={styles.inStock}>In Stock</span>
                    ) : (
                      <span style={styles.outStock}>Out of Stock</span>
                    )}
                  </td>
                ))}
              </tr>

              {specKeys.map((key) => (
                <tr key={key} style={styles.row}>
                  <td style={styles.labelCell}>{key}</td>
                  {products.map((product) => (
                    <td key={product._id} style={styles.dataCell}>
                      {product.specifications?.[key] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}

              <tr style={styles.row}>
                <td style={styles.labelCell}>Action</td>
                {products.map((product) => (
                  <td key={product._id} style={styles.dataCell}>
                    <Link 
                      href={`/products/${product._id}`}
                      style={styles.viewButton}
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.actions}>
          <Link href="/products" style={styles.backButton}>
            ← Back to Products
          </Link>
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
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '32px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
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
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflowX: 'auto' as const,
    marginBottom: '32px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  headerCell: {
    padding: '20px',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    backgroundColor: '#F8F8F8',
    borderBottom: '2px solid #F5F5F5'
  },
  productHeaderCell: {
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: '#F8F8F8',
    borderBottom: '2px solid #F5F5F5',
    position: 'relative' as const
  },
  removeButton: {
    backgroundColor: '#F5F5F5',
    border: 'none',
    color: '#333333',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  },
  row: {
    borderBottom: '1px solid #F5F5F5'
  },
  labelCell: {
    padding: '20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    backgroundColor: '#F8F8F8',
    minWidth: '150px'
  },
  dataCell: {
    padding: '20px',
    fontSize: '14px',
    color: '#333333',
    textAlign: 'center' as const,
    verticalAlign: 'middle' as const
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px'
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover' as const,
    borderRadius: '4px'
  },
  imagePlaceholder: {
    width: '100px',
    height: '100px',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#9E9E9E',
    borderRadius: '4px'
  },
  productName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center' as const
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  inStock: {
    color: '#333333',
    fontWeight: '500'
  },
  outStock: {
    color: '#9E9E9E',
    fontWeight: '500'
  },
  viewButton: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  actions: {
    textAlign: 'center' as const
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none'
  }
};
