'use client';

import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function HeroSection({ 
  title = 'Welcome to Electro-Hub',
  subtitle = 'Discover the latest electronics and gadgets at unbeatable prices',
  buttonText = 'Shop Now',
  buttonLink = '/products'
}: HeroSectionProps) {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>{title}</h1>
        <p style={styles.heroSubtitle}>{subtitle}</p>
        <Link href={buttonLink} style={styles.heroButton}>
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '80px 20px',
    textAlign: 'center' as const
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#F5F5F5',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '16px 40px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'transform 0.2s'
  }
};
