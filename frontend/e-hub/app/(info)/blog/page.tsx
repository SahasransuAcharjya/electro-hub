'use client';

import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  
  const posts = [
    {
      title: 'Top 10 Smartphones of 2025',
      slug: 'top-10-smartphones-2025',
      excerpt: 'Discover the best smartphones launched this year with cutting-edge features.',
      date: 'October 20, 2025',
      readTime: '5 min read'
    },
    {
      title: 'How to Choose the Right Laptop',
      slug: 'choose-right-laptop',
      excerpt: 'A comprehensive guide to selecting the perfect laptop for your needs.',
      date: 'October 15, 2025',
      readTime: '8 min read'
    },
    {
      title: 'Gaming Accessories Must-Haves',
      slug: 'gaming-accessories',
      excerpt: 'Essential gaming accessories to enhance your gaming experience.',
      date: 'October 10, 2025',
      readTime: '6 min read'
    },
    {
      title: 'Smart Home Devices Guide',
      slug: 'smart-home-devices',
      excerpt: 'Transform your home with these amazing smart home devices.',
      date: 'October 5, 2025',
      readTime: '7 min read'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Blog</h1>
        <p style={styles.subtitle}>Latest tech news and guides</p>

        <div style={styles.grid}>
          {posts.map((post, index) => (
            <div key={index} style={styles.postCard}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postExcerpt}>{post.excerpt}</p>
              <div style={styles.postMeta}>
                <span style={styles.metaText}>{post.date}</span>
                <span style={styles.metaDivider}>•</span>
                <span style={styles.metaText}>{post.readTime}</span>
              </div>
              <button 
                onClick={() => router.push(`/blog/${post.slug}`)}
                style={styles.readMore}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8F8F8',
    padding: '40px 20px'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px',
    textAlign: 'center' as const
  },
  subtitle: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '48px',
    textAlign: 'center' as const
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  postTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  postExcerpt: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px'
  },
  metaText: {
    fontSize: '12px',
    color: '#9E9E9E'
  },
  metaDivider: {
    fontSize: '12px',
    color: '#9E9E9E'
  },
  readMore: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
