'use client';

import { useParams, useRouter } from 'next/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const blogPosts: { [key: string]: any } = {
    'top-10-smartphones-2025': {
      title: 'Top 10 Smartphones of 2025',
      date: 'October 20, 2025',
      author: 'Tech Team',
      readTime: '5 min read',
      content: `
        <p>The smartphone market in 2025 has seen incredible innovations. Here are the top 10 smartphones that have captured the market this year.</p>
        
        <h2>1. Latest Flagship Device</h2>
        <p>Leading the pack with cutting-edge technology and premium features.</p>
        
        <h2>2. Budget Champion</h2>
        <p>Best value for money with impressive specifications.</p>
        
        <h2>3. Camera Powerhouse</h2>
        <p>Perfect for photography enthusiasts with advanced camera systems.</p>
        
        <h2>Key Features to Consider</h2>
        <ul>
          <li>Processor performance</li>
          <li>Display quality</li>
          <li>Battery life</li>
          <li>Camera capabilities</li>
          <li>5G connectivity</li>
        </ul>
        
        <p>Choose the smartphone that best fits your needs and budget.</p>
      `
    },
    'choose-right-laptop': {
      title: 'How to Choose the Right Laptop',
      date: 'October 15, 2025',
      author: 'Tech Team',
      readTime: '8 min read',
      content: `
        <p>Choosing the right laptop can be overwhelming with so many options. This guide will help you make the right decision.</p>
        
        <h2>Determine Your Purpose</h2>
        <p>Are you a student, professional, gamer, or content creator? Your use case will determine the specifications you need.</p>
        
        <h2>Key Specifications</h2>
        <ul>
          <li>Processor: Intel i5/i7 or AMD Ryzen 5/7</li>
          <li>RAM: Minimum 8GB, 16GB recommended</li>
          <li>Storage: SSD preferred over HDD</li>
          <li>Display: Full HD or higher</li>
          <li>Battery Life: 6+ hours</li>
        </ul>
        
        <h2>Budget Considerations</h2>
        <p>Set a realistic budget and prioritize features that matter most to you.</p>
      `
    },
    'gaming-accessories': {
      title: 'Gaming Accessories Must-Haves',
      date: 'October 10, 2025',
      author: 'Gaming Team',
      readTime: '6 min read',
      content: `
        <p>Enhance your gaming experience with these essential accessories.</p>
        
        <h2>Gaming Mouse</h2>
        <p>High DPI, programmable buttons, and ergonomic design for better control.</p>
        
        <h2>Mechanical Keyboard</h2>
        <p>Responsive keys with customizable RGB lighting.</p>
        
        <h2>Gaming Headset</h2>
        <p>Immersive sound quality with noise cancellation.</p>
        
        <h2>Other Essentials</h2>
        <ul>
          <li>Gaming chair for comfort</li>
          <li>Monitor with high refresh rate</li>
          <li>Mouse pad for precision</li>
          <li>Controller for console gaming</li>
        </ul>
      `
    },
    'smart-home-devices': {
      title: 'Smart Home Devices Guide',
      date: 'October 5, 2025',
      author: 'Smart Home Team',
      readTime: '7 min read',
      content: `
        <p>Transform your home into a smart home with these amazing devices.</p>
        
        <h2>Smart Speakers</h2>
        <p>Voice-controlled assistants that control your entire smart home ecosystem.</p>
        
        <h2>Smart Lighting</h2>
        <p>Control brightness and color from your smartphone or voice commands.</p>
        
        <h2>Smart Security</h2>
        <p>Cameras, doorbells, and locks for enhanced home security.</p>
        
        <h2>Getting Started</h2>
        <ul>
          <li>Choose your ecosystem (Alexa, Google, Apple)</li>
          <li>Start with essential devices</li>
          <li>Expand gradually</li>
          <li>Ensure WiFi coverage</li>
        </ul>
      `
    }
  };

  const post = blogPosts[slug];

  if (!post) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.notFoundTitle}>Blog Post Not Found</h1>
          <button onClick={() => router.push('/blog')} style={styles.backButton}>
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button onClick={() => router.push('/blog')} style={styles.backLink}>
          ← Back to Blog
        </button>

        <article style={styles.article}>
          <header style={styles.header}>
            <h1 style={styles.title}>{post.title}</h1>
            
            <div style={styles.meta}>
              <span style={styles.metaText}>{post.date}</span>
              <span style={styles.metaDivider}>•</span>
              <span style={styles.metaText}>{post.author}</span>
              <span style={styles.metaDivider}>•</span>
              <span style={styles.metaText}>{post.readTime}</span>
            </div>
          </header>

          <div 
            style={styles.contentBody}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div style={styles.footer}>
          <button onClick={() => router.push('/blog')} style={styles.backButton}>
            View All Posts
          </button>
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
    maxWidth: '800px',
    margin: '0 auto'
  },
  backLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333333',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '32px',
    padding: '0',
    fontWeight: '500'
  },
  article: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '8px',
    marginBottom: '32px'
  },
  header: {
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #F5F5F5'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px',
    lineHeight: '1.3'
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  metaText: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  metaDivider: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  contentBody: {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.8'
  },
  footer: {
    textAlign: 'center' as const
  },
  backButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  notFoundTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center' as const,
    marginBottom: '32px',
    marginTop: '80px'
  }
};
