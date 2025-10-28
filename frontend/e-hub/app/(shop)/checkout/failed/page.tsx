'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FailedPage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.failedCard}>
          <div style={styles.iconCircle}>✕</div>
          
          <h1 style={styles.title}>Payment Failed</h1>
          <p style={styles.message}>
            Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
          </p>

          <div style={styles.reasons}>
            <h3 style={styles.reasonsTitle}>Common reasons for payment failure:</h3>
            <ul style={styles.reasonsList}>
              <li style={styles.reasonItem}>Insufficient balance</li>
              <li style={styles.reasonItem}>Network connectivity issues</li>
              <li style={styles.reasonItem}>Incorrect card details</li>
              <li style={styles.reasonItem}>Payment timeout</li>
            </ul>
          </div>

          <div style={styles.actions}>
            <button 
              onClick={() => router.push('/checkout/payment')}
              style={styles.primaryButton}
            >
              Try Again
            </button>
            <Link href="/cart" style={styles.secondaryButton}>
              Back to Cart
            </Link>
            <Link href="/support" style={styles.supportLink}>
              Contact Support
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
  failedCard: {
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
    color: '#333333',
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
  reasons: {
    backgroundColor: '#F8F8F8',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '32px',
    textAlign: 'left' as const
  },
  reasonsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '12px'
  },
  reasonsList: {
    listStyle: 'disc',
    paddingLeft: '24px',
    margin: 0
  },
  reasonItem: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '8px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  primaryButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  secondaryButton: {
    display: 'block',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  supportLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'underline',
    marginTop: '8px'
  }
};
