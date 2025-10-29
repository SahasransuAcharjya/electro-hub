'use client';

import Link from 'next/link';

interface PromoBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function PromoBanner({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  backgroundColor = '#000000',
  textColor = '#FFFFFF'
}: PromoBannerProps) {
  return (
    <section style={{
      ...styles.banner,
      backgroundColor: backgroundColor,
      color: textColor
    }}>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
        <Link 
          href={buttonLink} 
          style={{
            ...styles.button,
            color: backgroundColor,
            backgroundColor: textColor
          }}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

const styles = {
  banner: {
    padding: '60px 20px',
    textAlign: 'center' as const
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  description: {
    fontSize: '18px',
    marginBottom: '32px',
    lineHeight: '1.6',
    opacity: 0.9
  },
  button: {
    display: 'inline-block',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'transform 0.2s'
  }
};
