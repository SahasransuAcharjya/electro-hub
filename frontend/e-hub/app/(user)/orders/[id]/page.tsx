'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  _id: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  isPaid: boolean;
  paidAt: string;
  deliveredAt: string;
  createdAt: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.notFoundTitle}>Order Not Found</h1>
          <Link href="/orders" style={styles.backLink}>
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Link href="/orders" style={styles.breadcrumb}>
          ← Back to Orders
        </Link>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Order Details</h1>
            <p style={styles.orderId}>Order #{order._id}</p>
          </div>
          <span style={styles.statusBadge}>{order.orderStatus}</span>
        </div>

        <div style={styles.grid}>
          <div style={styles.mainSection}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Order Items</h2>
              
              <div style={styles.itemsList}>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={styles.item}>
                    <div style={styles.itemImageContainer}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={styles.itemImage} />
                      ) : (
                        <div style={styles.imagePlaceholder}>No Image</div>
                      )}
                    </div>

                    <div style={styles.itemDetails}>
                      <h3 style={styles.itemName}>{item.name}</h3>
                      <p style={styles.itemQuantity}>Quantity: {item.quantity}</p>
                    </div>

                    <p style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Shipping Address</h2>
              
              <div style={styles.addressCard}>
                <p style={styles.addressText}>{order.shippingAddress.address}</p>
                <p style={styles.addressText}>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p style={styles.addressText}>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p style={styles.addressText}>Phone: {order.shippingAddress.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div style={styles.sidebar}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Items Price</span>
                <span style={styles.summaryValue}>₹{order.itemsPrice.toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Tax</span>
                <span style={styles.summaryValue}>₹{order.taxPrice.toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Shipping</span>
                <span style={styles.summaryValue}>
                  {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.summaryRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Payment Method</h3>
              <p style={styles.infoText}>{order.paymentMethod}</p>
              <p style={styles.paymentStatus}>
                {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
              </p>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Order Status</h3>
              <p style={styles.statusText}>{order.orderStatus}</p>
              {order.deliveredAt && (
                <p style={styles.deliveredText}>
                  Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                </p>
              )}
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
  breadcrumb: {
    display: 'inline-block',
    color: '#333333',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '24px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  notFoundTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center' as const,
    marginTop: '100px',
    marginBottom: '24px'
  },
  backLink: {
    display: 'block',
    textAlign: 'center' as const,
    color: '#333333',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  orderId: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  statusBadge: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
    padding: '8px 16px',
    backgroundColor: '#000000',
    borderRadius: '4px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '32px'
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  section: {
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
  itemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  item: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid #F5F5F5'
  },
  itemImageContainer: {
    width: '80px',
    height: '80px',
    flexShrink: 0
  },
  itemImage: {
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
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '6px'
  },
  itemQuantity: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  itemPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  addressCard: {
    backgroundColor: '#F8F8F8',
    padding: '20px',
    borderRadius: '8px'
  },
  addressText: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '6px'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  summaryCard: {
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px'
  },
  infoTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  infoText: {
    fontSize: '14px',
    color: '#333333',
    marginBottom: '8px'
  },
  paymentStatus: {
    fontSize: '12px',
    color: '#9E9E9E'
  },
  statusText: {
    fontSize: '14px',
    color: '#333333',
    fontWeight: '600',
    marginBottom: '8px'
  },
  deliveredText: {
    fontSize: '12px',
    color: '#9E9E9E'
  }
};
