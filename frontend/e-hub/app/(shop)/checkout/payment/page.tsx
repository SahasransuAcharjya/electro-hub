'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('COD');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'COD', name: 'Cash on Delivery', description: 'Pay when you receive' },
    { id: 'Card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, Rupay' },
    { id: 'UPI', name: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
    { id: 'NetBanking', name: 'Net Banking', description: 'All major banks' }
  ];

  const handlePlaceOrder = async () => {
    setProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          shippingAddress,
          paymentMethod: selectedMethod
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('shippingOption');
        router.push('/checkout/success');
      } else {
        router.push('/checkout/failed');
      }
    } catch (error) {
      console.error('Order error:', error);
      router.push('/checkout/failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Payment Method</h1>

        <div style={styles.methodsGrid}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              style={{
                ...styles.methodCard,
                border: selectedMethod === method.id ? '2px solid #000000' : '2px solid #F5F5F5'
              }}
            >
              <div style={styles.radioContainer}>
                <input
                  type="radio"
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  style={styles.radio}
                />
              </div>

              <div style={styles.methodInfo}>
                <h3 style={styles.methodName}>{method.name}</h3>
                <p style={styles.methodDescription}>{method.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => router.back()}
            style={styles.backButton}
          >
            ← Back
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={processing}
            style={{
              ...styles.placeOrderButton,
              opacity: processing ? 0.6 : 1,
              cursor: processing ? 'not-allowed' : 'pointer'
            }}
          >
            {processing ? 'Processing...' : 'Place Order'}
          </button>
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
    maxWidth: '700px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '32px'
  },
  methodsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    marginBottom: '32px'
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer'
  },
  radioContainer: {
    flexShrink: 0
  },
  radio: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  methodInfo: {
    flex: 1
  },
  methodName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '4px'
  },
  methodDescription: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333333',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  placeOrderButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px'
  }
};
