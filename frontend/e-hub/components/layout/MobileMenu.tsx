'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MobileMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <>
      <button onClick={toggleMenu} style={styles.menuButton}>
        ☰
      </button>

      {isOpen && (
        <>
          <div style={styles.overlay} onClick={toggleMenu}></div>
          
          <div style={styles.menu}>
            <div style={styles.header}>
              <h3 style={styles.title}>Menu</h3>
              <button onClick={toggleMenu} style={styles.closeButton}>✕</button>
            </div>

            <nav style={styles.nav}>
              <Link href="/" style={styles.navLink} onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/products" style={styles.navLink} onClick={toggleMenu}>
                Products
              </Link>
              <Link href="/about" style={styles.navLink} onClick={toggleMenu}>
                About
              </Link>
              <Link href="/contact" style={styles.navLink} onClick={toggleMenu}>
                Contact
              </Link>
              <Link href="/faq" style={styles.navLink} onClick={toggleMenu}>
                FAQ
              </Link>
              <Link href="/support" style={styles.navLink} onClick={toggleMenu}>
                Support
              </Link>
              <Link href="/blog" style={styles.navLink} onClick={toggleMenu}>
                Blog
              </Link>

              <div style={styles.divider}></div>

              {user ? (
                <>
                  <Link href="/dashboard" style={styles.navLink} onClick={toggleMenu}>
                    Dashboard
                  </Link>
                  <Link href="/cart" style={styles.navLink} onClick={toggleMenu}>
                    Cart
                  </Link>
                  <Link href="/orders" style={styles.navLink} onClick={toggleMenu}>
                    Orders
                  </Link>
                  <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" style={styles.navLink} onClick={toggleMenu}>
                    Login
                  </Link>
                  <Link href="/register" style={styles.navLink} onClick={toggleMenu}>
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  menuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#333333',
    cursor: 'pointer',
    padding: '8px'
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998
  },
  menu: {
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
    borderBottom: '1px solid #F5F5F5'
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
    fontSize: '16px',
    color: '#333333',
    textDecoration: 'none',
    padding: '12px 0',
    borderBottom: '1px solid #F5F5F5',
    fontWeight: '500'
  },
  divider: {
    height: '1px',
    backgroundColor: '#F5F5F5',
    margin: '20px 0'
  },
  logoutButton: {
    width: '100%',
    textAlign: 'left' as const,
    fontSize: '16px',
    color: '#333333',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '12px 0',
    cursor: 'pointer',
    fontWeight: '500'
  }
};
