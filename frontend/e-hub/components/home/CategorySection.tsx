'use client';

import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Shop by Category</h2>
        <p style={styles.subtitle}>Browse our wide range of electronics categories</p>
      </div>

      <div style={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/products/category/${category._id}`}
            style={styles.categoryCard}
          >
            <div style={styles.imageContainer}>
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name}
                  style={styles.image}
                />
              ) : (
                <div style={styles.placeholder}>
                  {category.name.charAt(0)}
                </div>
              )}
            </div>
            <h3 style={styles.categoryName}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '60px 20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#9E9E9E'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '24px'
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  },
  imageContainer: {
    width: '100px',
    height: '100px',
    margin: '0 auto 16px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#F8F8F8'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#F5F5F5'
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A'
  }
};
