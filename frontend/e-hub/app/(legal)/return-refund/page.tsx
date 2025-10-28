export default function ReturnRefundPage() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Return & Refund Policy</h1>
          <p style={styles.updateDate}>Last Updated: October 27, 2025</p>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Return Eligibility</h2>
            <p style={styles.text}>You can return products within 7 days of delivery if:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Product is unused and in original condition</li>
              <li style={styles.listItem}>Original packaging is intact</li>
              <li style={styles.listItem}>All accessories and manuals are included</li>
              <li style={styles.listItem}>Product tags and labels are not removed</li>
              <li style={styles.listItem}>Invoice is available</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Non-Returnable Items</h2>
            <p style={styles.text}>The following items cannot be returned:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Products with tampered serial numbers</li>
              <li style={styles.listItem}>Used or damaged products</li>
              <li style={styles.listItem}>Products without original packaging</li>
              <li style={styles.listItem}>Clearance or sale items marked as final sale</li>
              <li style={styles.listItem}>Software or digital products once opened</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Return Process</h2>
            <p style={styles.text}>To initiate a return:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Log in to your account</li>
              <li style={styles.listItem}>Go to Orders section</li>
              <li style={styles.listItem}>Select the order and click "Return"</li>
              <li style={styles.listItem}>Choose return reason and submit request</li>
              <li style={styles.listItem}>Our team will review and approve within 24-48 hours</li>
              <li style={styles.listItem}>Once approved, schedule pickup or ship the item back</li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Refund Process</h2>
            <p style={styles.text}>
              Once we receive and inspect the returned product, we will process your refund within 5-7 
              business days. Refunds will be credited to the original payment method used during purchase.
            </p>
            <p style={styles.text}>
              <strong>Refund Timeline:</strong><br />
              Credit/Debit Card: 5-7 business days<br />
              UPI/Net Banking: 3-5 business days<br />
              Cash on Delivery: Bank transfer within 7-10 business days
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Replacement Policy</h2>
            <p style={styles.text}>
              If you receive a defective or damaged product, we will provide a replacement free of charge. 
              Contact us within 48 hours of delivery to arrange a replacement.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Return Shipping</h2>
            <p style={styles.text}>
              <strong>Free Return Pickup:</strong> Available for defective or incorrect products<br />
              <strong>Customer-Initiated Returns:</strong> Customer bears return shipping costs unless 
              the product is defective
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Cancellation Policy</h2>
            <p style={styles.text}>
              Orders can be cancelled before shipping at no charge. Once shipped, you will need to follow 
              the return process. To cancel, go to Orders in your account and click "Cancel Order."
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Warranty Claims</h2>
            <p style={styles.text}>
              For products under manufacturer warranty, please contact us with your invoice and warranty 
              card. We will coordinate with the manufacturer for warranty claims.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.subtitle}>Contact Us</h2>
            <p style={styles.text}>
              For return and refund queries:<br />
              Email: returns@electro-hub.com<br />
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
  