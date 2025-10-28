'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, []);

  const paymentMethods = [
    {
      id: 1,
      type: 'COD',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: '💵'
    },
    {
      id: 2,
      type: 'Card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Rupay',
      icon: '💳'
    },
    {
      id: 3,
      type: 'UPI',
      name: 'UPI Payment',
      description: 'Google Pay, PhonePe, Paytm',
      icon: '📱'
    },
    {
      id: 4,
      type: 'NetBanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: '🏦'
    }
  ];

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Payment Methods</h1>
        <p style={styles.subtitle}>Available payment options for your orders</p>

        <div style={styles.methodsGrid}>
          {paymentMethods.map((method) => (
            <div key={method.id} style={styles.methodCard}>
              <div style={styles.methodIcon}>{method.icon}</div>
              <h3 style={styles.methodName}>{method.name}</h3>
              <p style={styles.methodDescription}>{method.description}</p>
              <p style={styles.methodType}>Type: {method.type}</p>
            </div>
          ))}
        </div>

        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Payment Information</h3>
          <ul style={styles.infoList}>
            <li style={styles.infoItem}>All transactions are secure and encrypted</li>
            <li style={styles.infoItem}>Choose your preferred payment method during checkout</li>
            <li style={styles.infoItem}>COD available on orders below ₹50,000</li>
            <li style={styles.infoItem}>Instant refunds for cancelled orders</li>
          </ul>
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
    maxWidth: '1000px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '32px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  methodsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  methodIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  methodName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  methodDescription: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6',
    marginBottom: '12px'
  },
  methodType: {
    fontSize: '12px',
    color: '#333333',
    fontWeight: '500'
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  infoTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  infoList: {
    listStyle: 'disc',
    paddingLeft: '24px'
  },
  infoItem: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '2',
    marginBottom: '8px'
  }
};
