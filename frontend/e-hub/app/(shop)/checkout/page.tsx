'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(data.cart.items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateShipping = () => {
    return calculateSubtotal() >= 500 ? 0 : 50;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify(formData));
    router.push('/checkout/shipping');
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Checkout</h1>

        <div style={styles.grid}>
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Shipping Information</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="House no, Street name"
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="City"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  readOnly
                />
              </div>

              <button type="submit" style={styles.continueButton}>
                Continue to Shipping
              </button>
            </form>
          </div>

          <div style={styles.summarySection}>
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.itemsList}>
                {cartItems.map((item, index) => (
                  <div key={index} style={styles.summaryItem}>
                    <span style={styles.itemName}>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span style={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.divider}></div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>₹{calculateSubtotal().toLocaleString()}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Tax (18%)</span>
                <span style={styles.summaryValue}>₹{calculateTax().toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Shipping</span>
                <span style={styles.summaryValue}>
                  {calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping()}`}
                </span>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.summaryRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
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
    padding: '40px 20px'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '32px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '32px'
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333333'
  },
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none'
  },
  continueButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  summarySection: {
    position: 'sticky' as const,
    top: '20px'
  },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '24px'
  },
  itemsList: {
    marginBottom: '20px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  itemName: {
    fontSize: '14px',
    color: '#333333'
  },
  itemPrice: {
    fontSize: '14px',
    color: '#333333',
    fontWeight: '500'
  },
  divider: {
    height: '1px',
    backgroundColor: '#F5F5F5',
    margin: '20px 0'
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
