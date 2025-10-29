import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.notFoundCard}>
          <h1 style={styles.errorCode}>404</h1>
          
          <h2 style={styles.title}>Page Not Found</h2>
          
          <p style={styles.message}>
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>

          <div style={styles.actions}>
            <Link href="/" style={styles.homeButton}>
              Back to Home
            </Link>
            
            <Link href="/products" style={styles.productsButton}>
              Browse Products
            </Link>
          </div>

          <div style={styles.helpSection}>
            <p style={styles.helpTitle}>Popular Pages</p>
            <div style={styles.linksList}>
              <Link href="/about" style={styles.helpLink}>About Us</Link>
              <Link href="/contact" style={styles.helpLink}>Contact</Link>
              <Link href="/faq" style={styles.helpLink}>FAQ</Link>
              <Link href="/support" style={styles.helpLink}>Support</Link>
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
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    maxWidth: '600px',
    width: '100%'
  },
  notFoundCard: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: 'bold',
    color: '#F5F5F5',
    lineHeight: '1',
    marginBottom: '16px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  message: {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '32px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginBottom: '40px'
  },
  homeButton: {
    display: 'block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  productsButton: {
    display: 'block',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  helpSection: {
    paddingTop: '32px',
    borderTop: '1px solid #F5F5F5'
  },
  helpTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  linksList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '16px'
  },
  helpLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'underline',
    fontWeight: '500'
  }
};
