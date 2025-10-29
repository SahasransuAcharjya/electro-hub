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
  };
  quantity: number;
  price: number;
}

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleViewCart = () => {
    onClose();
    router.push('/cart');
  };

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={styles.overlay} onClick={onClose}></div>
      
      <div style={styles.miniCart}>
        <div style={styles.header}>
          <h3 style={styles.title}>Shopping Cart ({cartItems.length})</h3>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>

        <div style={styles.content}>
          {loading ? (
            <p style={styles.loadingText}>Loading...</p>
          ) : cartItems.length === 0 ? (
            <div style={styles.empty}>
              <p style={styles.emptyText}>Your cart is empty</p>
              <button onClick={onClose} style={styles.continueButton}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div style={styles.itemsList}>
                {cartItems.map((item) => (
                  <div key={item._id} style={styles.item}>
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

                    <div style={styles.itemInfo}>
                      <h4 style={styles.itemName}>{item.product.name}</h4>
                      <p style={styles.itemQuantity}>Qty: {item.quantity}</p>
                      <p style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.footer}>
                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Subtotal</span>
                  <span style={styles.totalValue}>₹{calculateTotal().toLocaleString()}</span>
                </div>

                <button onClick={handleViewCart} style={styles.viewCartButton}>
                  View Cart
                </button>

                <button onClick={handleCheckout} style={styles.checkoutButton}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  },
  miniCart: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    width: '400px',
    maxWidth: '100%',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #F5F5F5'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#333333',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  loadingText: {
    fontSize: '14px',
    color: '#9E9E9E',
    textAlign: 'center' as const,
    padding: '40px 20px'
  },
  empty: {
    padding: '60px 20px',
    textAlign: 'center' as const
  },
  emptyText: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '24px'
  },
  continueButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  itemsList: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '20px'
  },
  item: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #F5F5F5'
  },
  itemImage: {
    width: '60px',
    height: '60px',
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
    fontSize: '10px',
    color: '#9E9E9E',
    borderRadius: '4px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '4px'
  },
  itemQuantity: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginBottom: '4px'
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #F5F5F5'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333'
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  viewCartButton: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '8px'
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
