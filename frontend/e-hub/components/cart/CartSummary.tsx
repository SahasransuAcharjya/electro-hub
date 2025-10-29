'use client';

interface CartSummaryProps {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export default function CartSummary({ itemsPrice, taxPrice, shippingPrice, totalPrice }: CartSummaryProps) {
  return (
    <div style={styles.summary}>
      <div style={styles.summaryRow}>
        <span style={styles.summaryLabel}>Subtotal</span>
        <span style={styles.summaryValue}>₹{itemsPrice.toLocaleString()}</span>
      </div>

      <div style={styles.summaryRow}>
        <span style={styles.summaryLabel}>Tax (18%)</span>
        <span style={styles.summaryValue}>₹{taxPrice.toFixed(2)}</span>
      </div>

      <div style={styles.summaryRow}>
        <span style={styles.summaryLabel}>Shipping</span>
        <span style={styles.summaryValue}>
          {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
        </span>
      </div>

      {itemsPrice > 0 && itemsPrice < 500 && (
        <p style={styles.freeShippingNote}>
          Add ₹{(500 - itemsPrice).toFixed(2)} more for free shipping!
        </p>
      )}

      <div style={styles.divider}></div>

      <div style={styles.summaryRow}>
        <span style={styles.totalLabel}>Total</span>
        <span style={styles.totalValue}>₹{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

const styles = {
  summary: {
    padding: '24px 0'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  summaryValue: {
    fontSize: '14px',
    color: '#333333',
    fontWeight: '500'
  },
  freeShippingNote: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginBottom: '16px',
    fontStyle: 'italic'
  },
  divider: {
    height: '1px',
    backgroundColor: '#F5F5F5',
    margin: '20px 0'
  },
  totalLabel: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  }
};
