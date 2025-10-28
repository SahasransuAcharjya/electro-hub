export default function SupportPage() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Customer Support</h1>
          <p style={styles.subtitle}>We're here to help</p>
  
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📧 Email Support</h3>
              <p style={styles.cardText}>support@electro-hub.com</p>
              <p style={styles.cardSubtext}>Response within 24 hours</p>
            </div>
  
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📞 Phone Support</h3>
              <p style={styles.cardText}>+91 1800-123-4567</p>
              <p style={styles.cardSubtext}>Mon-Sat: 9 AM - 8 PM</p>
            </div>
  
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>💬 Live Chat</h3>
              <p style={styles.cardText}>Available on website</p>
              <p style={styles.cardSubtext}>Instant assistance</p>
            </div>
          </div>
  
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Common Support Topics</h2>
            
            <div style={styles.topicList}>
              <div style={styles.topic}>
                <h3 style={styles.topicTitle}>Order Issues</h3>
                <p style={styles.topicText}>
                  Problems with placing orders, payment issues, order modifications
                </p>
              </div>
  
              <div style={styles.topic}>
                <h3 style={styles.topicTitle}>Delivery & Tracking</h3>
                <p style={styles.topicText}>
                  Delivery delays, tracking information, address changes
                </p>
              </div>
  
              <div style={styles.topic}>
                <h3 style={styles.topicTitle}>Returns & Refunds</h3>
                <p style={styles.topicText}>
                  Return requests, refund status, replacement products
                </p>
              </div>
  
              <div style={styles.topic}>
                <h3 style={styles.topicTitle}>Product Information</h3>
                <p style={styles.topicText}>
                  Specifications, warranty details, compatibility questions
                </p>
              </div>
  
              <div style={styles.topic}>
                <h3 style={styles.topicTitle}>Account Management</h3>
                <p style={styles.topicText}>
                  Login issues, password reset, profile updates
                </p>
              </div>
  
              <div style={styles.topic}>
                <h3 style={styles.topicTitle}>Technical Support</h3>
                <p style={styles.topicText}>
                  Product setup, troubleshooting, usage guidance
                </p>
              </div>
            </div>
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
      maxWidth: '1000px',
      margin: '0 auto'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: '8px',
      textAlign: 'center' as const
    },
    subtitle: {
      fontSize: '16px',
      color: '#9E9E9E',
      marginBottom: '48px',
      textAlign: 'center' as const
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    },
    card: {
      backgroundColor: '#FFFFFF',
      padding: '32px',
      borderRadius: '8px',
      textAlign: 'center' as const
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#333333',
      marginBottom: '12px'
    },
    cardText: {
      fontSize: '16px',
      color: '#333333',
      marginBottom: '8px'
    },
    cardSubtext: {
      fontSize: '14px',
      color: '#9E9E9E'
    },
    section: {
      backgroundColor: '#FFFFFF',
      padding: '40px',
      borderRadius: '8px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333333',
      marginBottom: '32px'
    },
    topicList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px'
    },
    topic: {
      padding: '20px',
      backgroundColor: '#F8F8F8',
      borderRadius: '8px'
    },
    topicTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#333333',
      marginBottom: '8px'
    },
    topicText: {
      fontSize: '14px',
      color: '#9E9E9E',
      lineHeight: '1.6'
    }
  };
  