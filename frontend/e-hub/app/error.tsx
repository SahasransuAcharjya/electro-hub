'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠️</div>
          
          <h1 style={styles.title}>Oops! Something went wrong</h1>
          
          <p style={styles.message}>
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div style={styles.errorDetails}>
              <p style={styles.errorMessage}>{error.message}</p>
            </div>
          )}

          <div style={styles.actions}>
            <button
              onClick={() => reset()}
              style={styles.retryButton}
            >
              Try Again
            </button>
            
            <Link href="/" style={styles.homeButton}>
              Go to Homepage
            </Link>
          </div>

          <div style={styles.helpSection}>
            <p style={styles.helpText}>Need help?</p>
            <Link href="/support" style={styles.supportLink}>
              Contact Support
            </Link>
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
  errorCard: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  errorIcon: {
    fontSize: '80px',
    marginBottom: '24px'
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
    marginBottom: '24px'
  },
  errorDetails: {
    backgroundColor: '#F5F5F5',
    padding: '16px',
    borderRadius: '4px',
    marginBottom: '24px',
    textAlign: 'left' as const
  },
  errorMessage: {
    fontSize: '14px',
    color: '#9E9E9E',
    fontFamily: 'monospace',
    wordBreak: 'break-word' as const
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginBottom: '32px'
  },
  retryButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  homeButton: {
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
    paddingTop: '24px',
    borderTop: '1px solid #F5F5F5'
  },
  helpText: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '8px'
  },
  supportLink: {
    fontSize: '14px',
    color: '#333333',
    textDecoration: 'underline',
    fontWeight: '500'
  }
};
