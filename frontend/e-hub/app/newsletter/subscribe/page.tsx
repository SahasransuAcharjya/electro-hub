'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>✓</div>
            <h1 style={styles.successTitle}>Successfully Subscribed!</h1>
            <p style={styles.successText}>
              Thank you for subscribing to our newsletter. You'll receive the latest updates, 
              exclusive deals, and product launches directly in your inbox.
            </p>

            <div style={styles.benefitsList}>
              <h3 style={styles.benefitsTitle}>What You'll Get:</h3>
              <ul style={styles.benefits}>
                <li style={styles.benefitItem}>🎉 Exclusive deals and discounts</li>
                <li style={styles.benefitItem}>📦 Early access to new products</li>
                <li style={styles.benefitItem}>💡 Tech tips and guides</li>
                <li style={styles.benefitItem}>🎁 Special birthday offers</li>
              </ul>
            </div>

            <Link href="/" style={styles.homeButton}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.subscribeCard}>
          <h1 style={styles.title}>Subscribe to Our Newsletter</h1>
          <p style={styles.subtitle}>
            Stay updated with the latest tech news, exclusive deals, and product launches
          </p>

          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubscribe} style={styles.form}>
            <div style={styles.inputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={styles.input}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📧</div>
              <h3 style={styles.featureTitle}>Weekly Updates</h3>
              <p style={styles.featureText}>
                Get curated tech news and product recommendations every week
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏷️</div>
              <h3 style={styles.featureTitle}>Exclusive Deals</h3>
              <p style={styles.featureText}>
                Subscriber-only discounts and early access to sales
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🎯</div>
              <h3 style={styles.featureTitle}>Personalized Content</h3>
              <p style={styles.featureText}>
                Recommendations based on your interests and preferences
              </p>
            </div>
          </div>

          <div style={styles.privacyNote}>
            <p style={styles.privacyText}>
              By subscribing, you agree to our{' '}
              <Link href="/privacy-policy" style={styles.privacyLink}>
                Privacy Policy
              </Link>
              . You can unsubscribe at any time.
            </p>
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
    maxWidth: '800px',
    width: '100%'
  },
  subscribeCard: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '8px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px',
    textAlign: 'center' as const
  },
  subtitle: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '32px',
    textAlign: 'center' as const,
    lineHeight: '1.6'
  },
  errorBox: {
    backgroundColor: '#F5F5F5',
    color: '#1A1A1A',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '24px',
    border: '1px solid #9E9E9E',
    fontSize: '14px',
    textAlign: 'center' as const
  },
  form: {
    marginBottom: '48px'
  },
  inputGroup: {
    display: 'flex',
    gap: '12px'
  },
  input: {
    flex: 1,
    padding: '16px 20px',
    fontSize: '16px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#F8F8F8',
    color: '#333333',
    outline: 'none'
  },
  button: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  featureCard: {
    textAlign: 'center' as const,
    padding: '24px',
    backgroundColor: '#F8F8F8',
    borderRadius: '8px'
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '12px'
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  featureText: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6'
  },
  privacyNote: {
    paddingTop: '24px',
    borderTop: '1px solid #F5F5F5'
  },
  privacyText: {
    fontSize: '12px',
    color: '#9E9E9E',
    textAlign: 'center' as const,
    lineHeight: '1.6'
  },
  privacyLink: {
    color: '#333333',
    textDecoration: 'underline'
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    color: '#000000',
    margin: '0 auto 24px'
  },
  successTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  successText: {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.8',
    marginBottom: '32px'
  },
  benefitsList: {
    backgroundColor: '#F8F8F8',
    padding: '32px',
    borderRadius: '8px',
    marginBottom: '32px',
    textAlign: 'left' as const
  },
  benefitsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  benefits: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  benefitItem: {
    fontSize: '14px',
    color: '#333333',
    padding: '8px 0',
    lineHeight: '1.6'
  },
  homeButton: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  }
};
