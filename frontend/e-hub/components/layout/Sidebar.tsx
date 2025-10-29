'use client';

import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div style={styles.overlay} onClick={onClose}></div>
      
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <h3 style={styles.title}>Categories</h3>
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>

        <nav style={styles.nav}>
          <Link href="/products" style={styles.navLink} onClick={onClose}>
            All Products
          </Link>
          
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Account</h4>
            <Link href="/dashboard" style={styles.navLink} onClick={onClose}>
              Dashboard
            </Link>
            <Link href="/profile" style={styles.navLink} onClick={onClose}>
              Profile
            </Link>
            <Link href="/orders" style={styles.navLink} onClick={onClose}>
              Orders
            </Link>
            <Link href="/addresses" style={styles.navLink} onClick={onClose}>
              Addresses
            </Link>
            <Link href="/wishlist" style={styles.navLink} onClick={onClose}>
              Wishlist
            </Link>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Information</h4>
            <Link href="/about" style={styles.navLink} onClick={onClose}>
              About Us
            </Link>
            <Link href="/contact" style={styles.navLink} onClick={onClose}>
              Contact
            </Link>
            <Link href="/faq" style={styles.navLink} onClick={onClose}>
              FAQ
            </Link>
            <Link href="/support" style={styles.navLink} onClick={onClose}>
              Support
            </Link>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Legal</h4>
            <Link href="/privacy-policy" style={styles.navLink} onClick={onClose}>
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" style={styles.navLink} onClick={onClose}>
              Terms & Conditions
            </Link>
            <Link href="/shipping-policy" style={styles.navLink} onClick={onClose}>
              Shipping Policy
            </Link>
            <Link href="/return-refund" style={styles.navLink} onClick={onClose}>
              Return & Refund
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998
  },
  sidebar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '300px',
    maxWidth: '80%',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    zIndex: 999,
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto' as const
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #F5F5F5',
    backgroundColor: '#F8F8F8'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#333333',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  nav: {
    padding: '20px'
  },
  navLink: {
    display: 'block',
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    padding: '10px 0',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  section: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #F5F5F5'
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#9E9E9E',
    textTransform: 'uppercase' as const,
    marginBottom: '12px',
    letterSpacing: '0.5px'
  }
};
