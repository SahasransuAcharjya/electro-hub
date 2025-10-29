'use client';

import { useState } from 'react';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function ReviewForm({ productId, productName, onSubmit, loading = false }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setError('');
    onSubmit({ productId, rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Write a Review for {productName}</h3>

      {error && (
        <div style={styles.errorBox}>{error}</div>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>Your Rating *</label>
        <div style={styles.ratingSelector}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              style={styles.starButton}
            >
              <span style={styles.starIcon}>
                {star <= (hoveredRating || rating) ? '⭐' : '☆'}
              </span>
            </button>
          ))}
          {rating > 0 && (
            <span style={styles.ratingText}>{rating} out of 5</span>
          )}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Your Review *</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          minLength={10}
          rows={6}
          placeholder="Share your experience with this product..."
          style={styles.textarea}
        />
        <p style={styles.helperText}>{comment.length} / 10 minimum characters</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.submitButton,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  errorBox: {
    backgroundColor: '#F5F5F5',
    color: '#1A1A1A',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #9E9E9E',
    fontSize: '14px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  label: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1A1A1A'
  },
  ratingSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  starButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  },
  starIcon: {
    fontSize: '32px'
  },
  ratingText: {
    fontSize: '14px',
    color: '#9E9E9E',
    marginLeft: '12px'
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    lineHeight: '1.6'
  },
  helperText: {
    fontSize: '12px',
    color: '#9E9E9E'
  },
  submitButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    marginTop: '8px'
  }
};
