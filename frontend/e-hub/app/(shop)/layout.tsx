'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.topBar}>
            <Link href="/" style={styles.logoLink}>
              <Image 
                src="/images/logo.png" 
                alt="Electro-Hub" 
                width={120} 
                height={40}
                style={styles.logo}
                priority
              />
            </Link>

            <form onSubmit={handleSearch} style={styles.searchForm}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                style={styles.searchInput}
              />
              <button type="submit" style={styles.searchButton}>
                🔍
              </button>
            </form>

            <div style={styles.headerActions}>
              {user ? (
                <>
                  <Link href="/cart" style={styles.iconButton}>
                    🛒 Cart
                  </Link>
                  <Link href="/dashboard" style={styles.iconButton}>
                    👤 {user.name}
                  </Link>
                  <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" style={styles.authLink}>
                    Login
                  </Link>
                  <Link href="/register" style={styles.authLink}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <nav style={styles.nav}>
            <Link href="/" style={styles.navLink}>Home</Link>
            <Link href="/products" style={styles.navLink}>Products</Link>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/contact" style={styles.navLink}>Contact</Link>
            <Link href="/faq" style={styles.navLink}>FAQ</Link>
            <Link href="/support" style={styles.navLink}>Support</Link>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        {children}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerGrid}>
            <div style={styles.footerColumn}>
              <Image 
                src="/images/logo.png" 
                alt="Electro-Hub" 
                width={140} 
                height={45}
                style={styles.footerLogo}
              />
              <p style={styles.footerText}>
                Your trusted destination for premium electronics and gadgets.
              </p>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Shop</h4>
              <Link href="/products" style={styles.footerLink}>All Products</Link>
              <Link href="/cart" style={styles.footerLink}>Cart</Link>
              <Link href="/wishlist" style={styles.footerLink}>Wishlist</Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Support</h4>
              <Link href="/contact" style={styles.footerLink}>Contact Us</Link>
              <Link href="/faq" style={styles.footerLink}>FAQ</Link>
              <Link href="/support" style={styles.footerLink}>Customer Support</Link>
              <Link href="/stores" style={styles.footerLink}>Store Locator</Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Legal</h4>
              <Link href="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
              <Link href="/terms-conditions" style={styles.footerLink}>Terms & Conditions</Link>
              <Link href="/shipping-policy" style={styles.footerLink}>Shipping Policy</Link>
              <Link href="/return-refund" style={styles.footerLink}>Return & Refund</Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Company</h4>
              <Link href="/about" style={styles.footerLink}>About Us</Link>
              <Link href="/blog" style={styles.footerLink}>Blog</Link>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <p style={styles.copyright}>
              © 2025 Electro-Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh'
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #F5F5F5',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '10px 0',
    minHeight: '60px'
  },
  logoLink: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    objectFit: 'contain' as const,
    height: 'auto'
  },
  searchForm: {
    flex: 1,
    maxWidth: '600px',
    display: 'flex',
    gap: '8px'
  },
  searchInput: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#F8F8F8',
    color: '#333333',
    outline: 'none'
  },
  searchButton: {
    padding: '8px 16px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0
  },
  iconButton: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500'
  },
  authLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500'
  },
  logoutButton: {
    fontSize: '14px',
    color: '#333333',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500'
  },
  nav: {
    display: 'flex',
    gap: '32px',
    padding: '12px 0',
    borderTop: '1px solid #F5F5F5'
  },
  navLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  main: {
    flex: 1
  },
  footer: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    marginTop: 'auto'
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '60px 20px 20px'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  footerLogo: {
    objectFit: 'contain' as const,
    marginBottom: '8px',
    height: 'auto'
  },
  footerText: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6'
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '8px'
  },
  footerLink: {
    fontSize: '14px',
    color: '#9E9E9E',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  footerBottom: {
    paddingTop: '20px',
    borderTop: '1px solid #333333',
    textAlign: 'center' as const
  },
  copyright: {
    fontSize: '14px',
    color: '#9E9E9E'
  }
};
