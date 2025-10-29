'use client';

import { useRouter } from 'next/navigation';

interface CartTotalProps {
  totalPrice: number;
  itemCount: number;
}

export default function CartTotal({ totalPrice, itemCount }: CartTotalProps) {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div style={styles.container}>
      <div style={styles.totalSection}>
        <div style={styles.totalRow}>
          <span style={styles.label}>Total ({itemCount} items)</span>
          <span style={styles.amount}>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button onClick={handleCheckout} style={styles.checkoutButton}>
        Proceed to Checkout
      </button>

      <p style={styles.secureNote}>🔒 Secure Checkout</p>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px'
  },
  totalSection: {
    marginBottom: '20px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333'
  },
  amount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '12px'
  },
  secureNote: {
    fontSize: '12px',
    color: '#9E9E9E',
    textAlign: 'center' as const
  }
};
