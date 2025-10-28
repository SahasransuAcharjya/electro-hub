'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  _id: string;
  orderItems: any[];
  totalPrice: number;
  orderStatus: string;
  paymentMethod: string;
  createdAt: string;
  isPaid: boolean;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>My Orders</h1>

        {orders.length === 0 ? (
          <div style={styles.noOrders}>
            <h2 style={styles.noOrdersTitle}>No orders yet</h2>
            <p style={styles.noOrdersText}>Start shopping to see your orders here</p>
            <Link href="/products" style={styles.shopButton}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={styles.ordersList}>
            {orders.map((order) => (
              <Link key={order._id} href={`/orders/${order._id}`} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div style={styles.orderInfo}>
                    <h3 style={styles.orderId}>Order #{order._id.slice(-8)}</h3>
                    <p style={styles.orderDate}>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div style={styles.orderBadges}>
                    <span style={styles.statusBadge}>{order.orderStatus}</span>
                    <span style={order.isPaid ? styles.paidBadge : styles.unpaidBadge}>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                </div>

                <div style={styles.orderBody}>
                  <div style={styles.orderMeta}>
                    <p style={styles.metaItem}>
                      <span style={styles.metaLabel}>Items:</span> {order.orderItems.length}
                    </p>
                    <p style={styles.metaItem}>
                      <span style={styles.metaLabel}>Payment:</span> {order.paymentMethod}
                    </p>
                  </div>

                  <div style={styles.orderFooter}>
                    <p style={styles.totalLabel}>Total Amount</p>
                    <p style={styles.totalAmount}>₹{order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  noOrders: {
    textAlign: 'center' as const,
    padding: '80px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px'
  },
  noOrdersTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  noOrdersText: {
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
  ordersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'block'
  },
  orderHeader: {
    padding: '24px',
    borderBottom: '1px solid #F5F5F5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  orderInfo: {
    flex: 1
  },
  orderId: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '6px'
  },
  orderDate: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  orderBadges: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    alignItems: 'flex-end'
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333333',
    padding: '6px 12px',
    backgroundColor: '#F5F5F5',
    borderRadius: '4px'
  },
  paidBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#FFFFFF',
    padding: '6px 12px',
    backgroundColor: '#000000',
    borderRadius: '4px'
  },
  unpaidBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333333',
    padding: '6px 12px',
    backgroundColor: '#F5F5F5',
    borderRadius: '4px'
  },
  orderBody: {
    padding: '24px'
  },
  orderMeta: {
    display: 'flex',
    gap: '32px',
    marginBottom: '20px'
  },
  metaItem: {
    fontSize: '14px',
    color: '#333333'
  },
  metaLabel: {
    fontWeight: '600',
    color: '#9E9E9E'
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #F5F5F5'
  },
  totalLabel: {
    fontSize: '14px',
    color: '#9E9E9E',
    fontWeight: '600'
  },
  totalAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  }
};
