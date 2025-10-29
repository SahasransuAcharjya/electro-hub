'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.column}>
            <h3 style={styles.title}>Electro-Hub</h3>
            <p style={styles.text}>
              Your trusted destination for premium electronics and gadgets.
            </p>
          </div>

          <div style={styles.column}>
            <h4 style={styles.heading}>Shop</h4>
            <Link href="/products" style={styles.link}>All Products</Link>
            <Link href="/cart" style={styles.link}>Cart</Link>
            <Link href="/wishlist" style={styles.link}>Wishlist</Link>
          </div>

          <div style={styles.column}>
            <h4 style={styles.heading}>Support</h4>
            <Link href="/contact" style={styles.link}>Contact Us</Link>
            <Link href="/faq" style={styles.link}>FAQ</Link>
            <Link href="/support" style={styles.link}>Customer Support</Link>
            <Link href="/stores" style={styles.link}>Store Locator</Link>
          </div>

          <div style={styles.column}>
            <h4 style={styles.heading}>Legal</h4>
            <Link href="/privacy-policy" style={styles.link}>Privacy Policy</Link>
            <Link href="/terms-conditions" style={styles.link}>Terms & Conditions</Link>
            <Link href="/shipping-policy" style={styles.link}>Shipping Policy</Link>
            <Link href="/return-refund" style={styles.link}>Return & Refund</Link>
          </div>

          <div style={styles.column}>
            <h4 style={styles.heading}>Company</h4>
            <Link href="/about" style={styles.link}>About Us</Link>
            <Link href="/blog" style={styles.link}>Blog</Link>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © 2025 Electro-Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    marginTop: 'auto'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '60px 20px 20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: '8px'
  },
  text: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6'
  },
  heading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '8px'
  },
  link: {
    fontSize: '14px',
    color: '#9E9E9E',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  bottom: {
    paddingTop: '20px',
    borderTop: '1px solid #333333',
    textAlign: 'center' as const
  },
  copyright: {
    fontSize: '14px',
    color: '#9E9E9E'
  }
};
