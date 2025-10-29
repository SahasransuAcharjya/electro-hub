'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Review {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(false);
    setReviews([]);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>My Reviews</h1>
        <p style={styles.subtitle}>Reviews you've written for products</p>

        {reviews.length === 0 ? (
          <div style={styles.noReviews}>
            <div style={styles.noReviewsIcon}>⭐</div>
            <h2 style={styles.noReviewsTitle}>No Reviews Yet</h2>
            <p style={styles.noReviewsText}>
              Purchase products and share your experience with the community
            </p>
            <Link href="/products" style={styles.browseButton}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review._id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <Link href={`/products/${review.product._id}`} style={styles.productLink}>
                    <div style={styles.productInfo}>
                      <div style={styles.productImageContainer}>
                        {review.product.images && review.product.images[0] ? (
                          <img 
                            src={review.product.images[0]} 
                            alt={review.product.name}
                            style={styles.productImage}
                          />
                        ) : (
                          <div style={styles.imagePlaceholder}>No Image</div>
                        )}
                      </div>
                      <div>
                        <h3 style={styles.productName}>{review.product.name}</h3>
                        <p style={styles.reviewDate}>
                          Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div style={styles.ratingContainer}>
                    {[...Array(5)].map((_, index) => (
                      <span key={index} style={styles.star}>
                        {index < review.rating ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.reviewBody}>
                  <p style={styles.reviewComment}>{review.comment}</p>
                </div>

                <div style={styles.reviewActions}>
                  <button style={styles.editButton}>Edit</button>
                  <button style={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
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
    maxWidth: '900px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginBottom: '32px'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  noReviews: {
    backgroundColor: '#FFFFFF',
    padding: '80px 20px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  noReviewsIcon: {
    fontSize: '80px',
    marginBottom: '24px'
  },
  noReviewsTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  noReviewsText: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  browseButton: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    textDecoration: 'none'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #F5F5F5'
  },
  productLink: {
    textDecoration: 'none',
    flex: 1
  },
  productInfo: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  productImageContainer: {
    width: '60px',
    height: '60px',
    flexShrink: 0
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: '4px'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: '#9E9E9E',
    borderRadius: '4px'
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '4px'
  },
  reviewDate: {
    fontSize: '12px',
    color: '#9E9E9E'
  },
  ratingContainer: {
    display: 'flex',
    gap: '4px'
  },
  star: {
    fontSize: '20px'
  },
  reviewBody: {
    marginBottom: '20px'
  },
  reviewComment: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.8'
  },
  reviewActions: {
    display: 'flex',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid #F5F5F5'
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '10px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#9E9E9E',
    padding: '10px',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
