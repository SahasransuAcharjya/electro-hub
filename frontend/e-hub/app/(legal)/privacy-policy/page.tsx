export default function PrivacyPolicyPage() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.updateDate}>Last Updated: October 27, 2025</p>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Introduction</h2>
            <p style={styles.text}>
              At Electro-Hub, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you 
              visit our website or make a purchase.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Information We Collect</h2>
            <p style={styles.text}>We collect the following types of information:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Personal identification information (Name, email address, phone number)</li>
              <li style={styles.listItem}>Billing and shipping addresses</li>
              <li style={styles.listItem}>Payment information (processed securely through payment gateways)</li>
              <li style={styles.listItem}>Order history and preferences</li>
              <li style={styles.listItem}>Device and browser information</li>
              <li style={styles.listItem}>IP address and location data</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>How We Use Your Information</h2>
            <p style={styles.text}>Your information is used to:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Process and fulfill your orders</li>
              <li style={styles.listItem}>Communicate order updates and shipping information</li>
              <li style={styles.listItem}>Provide customer support</li>
              <li style={styles.listItem}>Send promotional offers (with your consent)</li>
              <li style={styles.listItem}>Improve our website and services</li>
              <li style={styles.listItem}>Prevent fraud and enhance security</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Data Security</h2>
            <p style={styles.text}>
              We implement industry-standard security measures to protect your personal information. 
              All payment transactions are encrypted using SSL technology. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Cookies</h2>
            <p style={styles.text}>
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize 
              content. You can control cookie preferences through your browser settings.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Third-Party Services</h2>
            <p style={styles.text}>
              We may share your information with trusted third-party service providers who assist in 
              operating our website, processing payments, and delivering products. These parties are 
              obligated to keep your information confidential.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Your Rights</h2>
            <p style={styles.text}>You have the right to:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Access your personal data</li>
              <li style={styles.listItem}>Request correction of inaccurate data</li>
              <li style={styles.listItem}>Request deletion of your data</li>
              <li style={styles.listItem}>Opt-out of marketing communications</li>
              <li style={styles.listItem}>Withdraw consent at any time</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Contact Us</h2>
            <p style={styles.text}>
              If you have questions about this privacy policy, please contact us at:<br />
              Email: privacy@electro-hub.com<br />
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
  