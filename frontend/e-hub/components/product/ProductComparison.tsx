'use client';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  brand?: string;
  rating: number;
  stock: number;
  specifications?: { [key: string]: string };
}

interface ProductComparisonProps {
  products: Product[];
  onRemove: (productId: string) => void;
}

export default function ProductComparison({ products, onRemove }: ProductComparisonProps) {
  const getAllSpecKeys = () => {
    const keys = new Set<string>();
    products.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(key => keys.add(key));
      }
    });
    return Array.from(keys);
  };

  const specKeys = getAllSpecKeys();

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Feature</th>
            {products.map((product) => (
              <th key={product._id} style={styles.productHeaderCell}>
                <button
                  onClick={() => onRemove(product._id)}
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

          {/* FIX 1: Check if ANY product has a brand using products.some() */}
          {products.some(p => p.brand) && (
            <tr style={styles.row}>
              <td style={styles.labelCell}>Brand</td>
              {products.map((product) => (
                <td key={product._id} style={styles.dataCell}>
                  {product.brand || 'N/A'}
                </td>
              ))}
            </tr>
          )}

          <tr style={styles.row}>
            <td style={styles.labelCell}>Rating</td>
            {/* FIX 2: Ensure the map function is correctly opened here */}
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
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    overflowX: 'auto' as const,
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
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
    borderBottom: '2px solid #F5F5F5'
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
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
};