export default function AboutPage() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>About Electro-Hub</h1>
          
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Who We Are</h2>
            <p style={styles.text}>
              Electro-Hub is your trusted destination for premium electronics and gadgets. 
              Founded with a vision to make technology accessible to everyone, we've been 
              serving customers with quality products and exceptional service.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Our Mission</h2>
            <p style={styles.text}>
              To provide the latest electronics at competitive prices while ensuring 
              customer satisfaction through reliable service and genuine products.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Why Choose Us</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>100% Genuine Products</li>
              <li style={styles.listItem}>Competitive Pricing</li>
              <li style={styles.listItem}>Fast & Secure Delivery</li>
              <li style={styles.listItem}>Easy Returns & Refunds</li>
              <li style={styles.listItem}>24/7 Customer Support</li>
              <li style={styles.listItem}>Warranty on All Products</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Our Values</h2>
            <p style={styles.text}>
              <strong>Quality:</strong> We never compromise on product quality.<br/>
              <strong>Trust:</strong> Building long-term relationships with customers.<br/>
              <strong>Innovation:</strong> Staying ahead with the latest technology.<br/>
              <strong>Service:</strong> Putting customers first in everything we do.
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
      marginBottom: '40px',
      textAlign: 'center' as const
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
      listStyle: 'none',
      padding: 0
    },
    listItem: {
      fontSize: '16px',
      color: '#333333',
      padding: '12px 0',
      borderBottom: '1px solid #F5F5F5',
      position: 'relative' as const,
      paddingLeft: '24px'
    }
  };
  