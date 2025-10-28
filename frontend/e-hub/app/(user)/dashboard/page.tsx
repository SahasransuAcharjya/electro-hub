'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Order {
  _id: string;
  orderItems: any[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchUserData();
    fetchRecentOrders();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
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
        setRecentOrders(data.orders?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>My Dashboard</h1>

        <div style={styles.grid}>
          <div style={styles.welcomeCard}>
            <h2 style={styles.welcomeTitle}>Welcome back, {user?.name}!</h2>
            <p style={styles.welcomeText}>Manage your account and orders</p>
          </div>

          <div style={styles.quickLinksCard}>
            <h3 style={styles.cardTitle}>Quick Links</h3>
            <div style={styles.linksList}>
              <Link href="/profile" style={styles.quickLink}>👤 Profile Settings</Link>
              <Link href="/orders" style={styles.quickLink}>📦 My Orders</Link>
              <Link href="/addresses" style={styles.quickLink}>📍 Manage Addresses</Link>
              <Link href="/wishlist" style={styles.quickLink}>❤️ Wishlist</Link>
            </div>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📦</div>
            <div style={styles.statInfo}>
              <p style={styles.statValue}>{recentOrders.length}</p>
              <p style={styles.statLabel}>Total Orders</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏳</div>
            <div style={styles.statInfo}>
              <p style={styles.statValue}>
                {recentOrders.filter(o => o.orderStatus === 'Processing').length}
              </p>
              <p style={styles.statLabel}>Processing</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>✓</div>
            <div style={styles.statInfo}>
              <p style={styles.statValue}>
                {recentOrders.filter(o => o.orderStatus === 'Delivered').length}
              </p>
              <p style={styles.statLabel}>Delivered</p>
            </div>
          </div>
        </div>

        <div style={styles.ordersSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Orders</h2>
            <Link href="/orders" style={styles.viewAllLink}>View All</Link>
          </div>

          {recentOrders.length === 0 ? (
            <div style={styles.noOrders}>
              <p style={styles.noOrdersText}>No orders yet</p>
              <Link href="/products" style={styles.shopButton}>Start Shopping</Link>
            </div>
          ) : (
            <div style={styles.ordersList}>
              {recentOrders.map((order) => (
                <Link key={order._id} href={`/orders/${order._id}`} style={styles.orderCard}>
                  <div style={styles.orderHeader}>
                    <div>
                      <p style={styles.orderId}>Order #{order._id.slice(-8)}</p>
                      <p style={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span style={styles.orderStatus}>{order.orderStatus}</span>
                  </div>

                  <div style={styles.orderDetails}>
                    <p style={styles.orderItems}>
                      {order.orderItems.length} item(s)
                    </p>
                    <p style={styles.orderTotal}>₹{order.totalPrice.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  welcomeCard: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  welcomeText: {
    fontSize: '14px',
    color: '#F5F5F5'
  },
  quickLinksCard: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '20px'
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  quickLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    padding: '12px',
    backgroundColor: '#F8F8F8',
    borderRadius: '4px',
    fontWeight: '500'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  statIcon: {
    fontSize: '36px'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 1
  },
  statLabel: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginTop: '4px'
  },
  ordersSection: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  viewAllLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500'
  },
  noOrders: {
    textAlign: 'center' as const,
    padding: '40px 20px'
  },
  noOrdersText: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '20px'
  },
  shopButton: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  orderCard: {
    padding: '20px',
    backgroundColor: '#F8F8F8',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'block'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  orderId: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '4px'
  },
  orderDate: {
    fontSize: '12px',
    color: '#9E9E9E'
  },
  orderStatus: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333333',
    padding: '6px 12px',
    backgroundColor: '#FFFFFF',
    borderRadius: '4px'
  },
  orderDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderItems: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  orderTotal: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  }
};
