export default function ShippingPolicyPage() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Shipping Policy</h1>
          <p style={styles.updateDate}>Last Updated: October 27, 2025</p>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Shipping Methods</h2>
            <p style={styles.text}>We offer the following shipping options:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}><strong>Standard Delivery:</strong> 5-7 business days</li>
              <li style={styles.listItem}><strong>Express Delivery:</strong> 2-3 business days</li>
              <li style={styles.listItem}><strong>Same Day Delivery:</strong> Available in select metro cities</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Shipping Charges</h2>
            <p style={styles.text}>
              <strong>Free Shipping:</strong> Orders above ₹500 qualify for free standard shipping.<br />
              <strong>Standard Shipping:</strong> ₹50 for orders below ₹500<br />
              <strong>Express Shipping:</strong> ₹150 (regardless of order value)<br />
              <strong>Same Day Delivery:</strong> ₹200 (where available)
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Processing Time</h2>
            <p style={styles.text}>
              Orders are processed within 1-2 business days (excluding weekends and holidays). You will 
              receive a confirmation email with tracking information once your order is shipped.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Delivery Areas</h2>
            <p style={styles.text}>
              We currently deliver to all locations across India. International shipping is not available 
              at this time.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Order Tracking</h2>
            <p style={styles.text}>
              Once your order is dispatched, you can track it using the tracking number provided in your 
              shipping confirmation email. Log in to your account to view real-time tracking updates.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Delivery Attempts</h2>
            <p style={styles.text}>
              Our delivery partner will make up to 3 delivery attempts. If delivery fails after 3 attempts, 
              the order will be returned to us, and you will be notified via email.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Address Changes</h2>
            <p style={styles.text}>
              Address changes can only be made before the order is shipped. Once shipped, the delivery 
              address cannot be modified. Please ensure your address is correct before placing an order.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Damaged or Lost Packages</h2>
            <p style={styles.text}>
              If your package arrives damaged or is lost during transit, please contact us within 48 hours 
              of delivery. We will investigate and arrange for a replacement or refund as appropriate.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Contact Us</h2>
            <p style={styles.text}>
              For shipping queries, contact us at:<br />
              Email: shipping@electro-hub.com<br />
              Phone: +91 1800-123-4567
            </p>
          </section>
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
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      padding: '40px',
      borderRadius: '8px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: '8px'
    },
    updateDate: {
      fontSize: '14px',
      color: '#9E9E9E',
      marginBottom: '32px'
    },
    section: {
      marginBottom: '32px'
    },
    subtitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333333',
      marginBottom: '16px'
    },
    text: {
      fontSize: '16px',
      color: '#333333',
      lineHeight: '1.8',
      marginBottom: '16px'
    },
    list: {
      listStyle: 'disc',
      paddingLeft: '24px'
    },
    listItem: {
      fontSize: '16px',
      color: '#333333',
      lineHeight: '1.8',
      marginBottom: '8px'
    }
  };
  