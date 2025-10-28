'use client';

import { useRouter } from 'next/navigation';

export default function ShippingPage() {
  const router = useRouter();

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '5-7 business days',
      cost: 50,
      description: 'Regular delivery with tracking'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '2-3 business days',
      cost: 150,
      description: 'Faster delivery with priority handling'
    },
    {
      id: 'free',
      name: 'Free Shipping',
      time: '7-10 business days',
      cost: 0,
      description: 'Free standard shipping (orders above ₹500)'
    }
  ];

  const handleSelectShipping = (option: any) => {
    localStorage.setItem('shippingOption', JSON.stringify(option));
    router.push('/checkout/payment');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Select Shipping Method</h1>

        <div style={styles.optionsGrid}>
          {shippingOptions.map((option) => (
            <div key={option.id} style={styles.optionCard}>
              <div style={styles.optionHeader}>
                <h3 style={styles.optionName}>{option.name}</h3>
                <p style={styles.optionCost}>
                  {option.cost === 0 ? 'FREE' : `₹${option.cost}`}
                </p>
              </div>

              <p style={styles.optionTime}>{option.time}</p>
              <p style={styles.optionDescription}>{option.description}</p>

              <button
                onClick={() => handleSelectShipping(option)}
                style={styles.selectButton}
              >
                Select
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.back()}
          style={styles.backButton}
        >
          ← Back to Shipping Info
        </button>
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
    maxWidth: '900px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '32px'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    border: '2px solid #F5F5F5'
  },
  optionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  optionName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A'
  },
  optionCost: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  optionTime: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '8px'
  },
  optionDescription: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  selectButton: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333333',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500'
  }
};
