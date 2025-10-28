'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.successCard}>
          <div style={styles.iconCircle}>✓</div>
          
          <h1 style={styles.title}>Order Placed Successfully!</h1>
          <p style={styles.message}>
            Thank you for your order. We've received your order and will send you a confirmation email shortly.
          </p>

          <div style={styles.orderInfo}>
            <p style={styles.infoText}>
              You can track your order status from your dashboard.
            </p>
          </div>

          <div style={styles.actions}>
            <Link href="/dashboard" style={styles.primaryButton}>
              View Orders
            </Link>
            <Link href="/products" style={styles.secondaryButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8F8F8',
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    maxWidth: '600px',
    width: '100%'
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    color: '#000000',
    margin: '0 auto 24px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  message: {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '32px'
  },
  orderInfo: {
    backgroundColor: '#F8F8F8',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '32px'
  },
  infoText: {
    fontSize: '14px',
    color: '#333333'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  primaryButton: {
    display: 'block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center' as const
  },
  secondaryButton: {
    display: 'block',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center' as const
  }
};
