'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <Link href="/" style={styles.logoLink}>
            <Image 
              src="/images/logo.png" 
              alt="Electro-Hub" 
              width={180} 
              height={60}
              style={styles.logo}
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

          <div style={styles.actions}>
            {user ? (
              <>
                <Link href="/cart" style={styles.iconLink}>
                  🛒 Cart
                </Link>
                <Link href="/dashboard" style={styles.iconLink}>
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
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #F5F5F5',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    padding: '12px 0'
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
    padding: '10px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#F8F8F8',
    color: '#333333',
    outline: 'none'
  },
  searchButton: {
    padding: '10px 16px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0
  },
  iconLink: {
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
  }
};
