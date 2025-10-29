'use client';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand?: string;
  category?: {
    name: string;
  };
  rating: number;
  numReviews: number;
  stock: number;
  specifications?: { [key: string]: string };
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <p style={styles.category}>{product.category?.name || 'Electronics'}</p>
        <h1 style={styles.name}>{product.name}</h1>

        {product.brand && (
          <p style={styles.brand}>Brand: {product.brand}</p>
        )}

        <div style={styles.ratingRow}>
          <span style={styles.rating}>⭐ {product.rating || 0}</span>
          <span style={styles.reviews}>({product.numReviews || 0} reviews)</span>
        </div>

        <p style={styles.price}>₹{product.price.toLocaleString()}</p>

        <p style={styles.description}>{product.description}</p>

        <div style={styles.stock}>
          {product.stock > 0 ? (
            <span style={styles.inStock}>In Stock ({product.stock} available)</span>
          ) : (
            <span style={styles.outOfStock}>Out of Stock</span>
          )}
        </div>
      </div>

      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div style={styles.specificationsSection}>
          <h3 style={styles.sectionTitle}>Specifications</h3>
          <table style={styles.specsTable}>
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key} style={styles.specRow}>
                  <td style={styles.specKey}>{key}</td>
                  <td style={styles.specValue}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '32px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  category: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginBottom: '12px',
    textTransform: 'uppercase' as const
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  brand: {
    fontSize: '16px',
    color: '#333333',
    marginBottom: '16px'
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  rating: {
    fontSize: '16px',
    color: '#333333',
    fontWeight: '600'
  },
  reviews: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  price: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '20px'
  },
  description: {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.8',
    marginBottom: '24px'
  },
  stock: {
    marginBottom: '24px'
  },
  inStock: {
    fontSize: '14px',
    color: '#333333',
    fontWeight: '600'
  },
  outOfStock: {
    fontSize: '14px',
    color: '#9E9E9E',
    fontWeight: '600'
  },
  specificationsSection: {
    borderTop: '1px solid #F5F5F5',
    paddingTop: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  specsTable: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  specRow: {
    borderBottom: '1px solid #F5F5F5'
  },
  specKey: {
    padding: '12px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    width: '40%'
  },
  specValue: {
    padding: '12px 0',
    fontSize: '14px',
    color: '#9E9E9E'
  }
};
