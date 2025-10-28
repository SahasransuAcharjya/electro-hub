export default function TermsConditionsPage() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Terms & Conditions</h1>
          <p style={styles.updateDate}>Last Updated: October 27, 2025</p>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Agreement to Terms</h2>
            <p style={styles.text}>
              By accessing and using Electro-Hub, you accept and agree to be bound by these Terms and 
              Conditions. If you do not agree to these terms, please do not use our website.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Use of Website</h2>
            <p style={styles.text}>You agree to use this website only for lawful purposes and in a manner that does not:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Infringe the rights of others</li>
              <li style={styles.listItem}>Restrict or inhibit use by others</li>
              <li style={styles.listItem}>Violate any applicable laws or regulations</li>
              <li style={styles.listItem}>Transmit harmful or malicious code</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Product Information</h2>
            <p style={styles.text}>
              We strive to provide accurate product descriptions and pricing. However, we do not warrant 
              that product descriptions, pricing, or other content is accurate, complete, or error-free. 
              We reserve the right to correct any errors and change information without prior notice.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Orders and Payments</h2>
            <p style={styles.text}>
              All orders are subject to acceptance and availability. We reserve the right to refuse or 
              cancel any order for any reason. Payment must be received before order processing. Prices 
              are subject to change without notice.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Intellectual Property</h2>
            <p style={styles.text}>
              All content on this website, including text, graphics, logos, and images, is the property 
              of Electro-Hub and protected by copyright laws. You may not reproduce, distribute, or 
              create derivative works without our written permission.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>User Accounts</h2>
            <p style={styles.text}>
              You are responsible for maintaining the confidentiality of your account credentials. You 
              agree to notify us immediately of any unauthorized use of your account. We are not liable 
              for any loss arising from unauthorized account access.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Limitation of Liability</h2>
            <p style={styles.text}>
              Electro-Hub shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from the use or inability to use our website or products, even if we have 
              been advised of the possibility of such damages.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Governing Law</h2>
            <p style={styles.text}>
              These terms are governed by and construed in accordance with the laws of India. Any disputes 
              shall be subject to the exclusive jurisdiction of courts in Mumbai, India.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Changes to Terms</h2>
            <p style={styles.text}>
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting. Your continued use of the website constitutes acceptance of modified terms.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Contact Information</h2>
            <p style={styles.text}>
              For questions about these terms, contact us at:<br />
              Email: legal@electro-hub.com<br />
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
  