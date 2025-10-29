'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link href="/" style={styles.navLink}>Home</Link>
        <Link href="/products" style={styles.navLink}>Products</Link>
        <Link href="/about" style={styles.navLink}>About</Link>
        <Link href="/contact" style={styles.navLink}>Contact</Link>
        <Link href="/faq" style={styles.navLink}>FAQ</Link>
        <Link href="/support" style={styles.navLink}>Support</Link>
        <Link href="/blog" style={styles.navLink}>Blog</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #F5F5F5'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    gap: '32px'
  },
  navLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '16px 0',
    transition: 'color 0.2s',
    position: 'relative' as const
  }
};
