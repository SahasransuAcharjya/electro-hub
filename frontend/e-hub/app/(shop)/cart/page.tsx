'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
  price: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity: newQuantity })
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(data.cart.items || []);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId: string) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${productId}`, {
        method: 'DELETE',
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
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
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

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.emptyCart}>
            <h1 style={styles.emptyTitle}>Your Cart is Empty</h1>
            <p style={styles.emptyText}>Add some products to get started!</p>
            <Link href="/products" style={styles.shopButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <p style={styles.subtitle}>{cartItems.length} item(s) in your cart</p>

        <div style={styles.grid}>
          <div style={styles.itemsSection}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.cartItem}>
                <div style={styles.itemImage}>
                  {item.product.images && item.product.images[0] ? (
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      style={styles.image}
                    />
                  ) : (
                    <div style={styles.imagePlaceholder}>No Image</div>
                  )}
                </div>

                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.product.name}</h3>
                  <p style={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
                  
                  <div style={styles.quantityControl}>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      disabled={updating || item.quantity <= 1}
                      style={{
                        ...styles.quantityButton,
                        opacity: updating || item.quantity <= 1 ? 0.5 : 1
                      }}
                    >
                      −
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      disabled={updating || item.quantity >= item.product.stock}
                      style={{
                        ...styles.quantityButton,
                        opacity: updating || item.quantity >= item.product.stock ? 0.5 : 1
                      }}
                    >
                      +
                    </button>
                  </div>

                  {item.quantity >= item.product.stock && (
                    <p style={styles.stockWarning}>Max stock reached</p>
                  )}
                </div>

                <div style={styles.itemActions}>
                  <p style={styles.itemTotal}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    disabled={updating}
                    style={{
                      ...styles.removeButton,
                      opacity: updating ? 0.5 : 1
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summarySection}>
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

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

              {calculateSubtotal() < 500 && (
                <p style={styles.freeShippingNote}>
                  Add ₹{(500 - calculateSubtotal()).toFixed(2)} more for free shipping!
                </p>
              )}

              <div style={styles.divider}></div>

              <div style={styles.summaryRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>₹{calculateTotal().toFixed(2)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                style={styles.checkoutButton}
              >
                Proceed to Checkout
              </button>

              <Link href="/products" style={styles.continueLink}>
                Continue Shopping
              </Link>
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
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '32px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  emptyCart: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  emptyText: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '32px'
  },
  shopButton: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '32px'
  },
  itemsSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  itemImage: {
    width: '100px',
    height: '100px',
    flexShrink: 0
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: '4px'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#9E9E9E',
    borderRadius: '4px'
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '8px'
  },
  itemPrice: {
    fontSize: '16px',
    color: '#333333',
    marginBottom: '16px'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    backgroundColor: '#F5F5F5',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333333',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333',
    minWidth: '30px',
    textAlign: 'center' as const
  },
  stockWarning: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginTop: '8px'
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '12px'
  },
  itemTotal: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9E9E9E',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline'
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
    marginTop: '24px'
  },
  continueLink: {
    display: 'block',
    textAlign: 'center' as const,
    marginTop: '16px',
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none'
  }
};
