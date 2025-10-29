'use client';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Rating({ value, onChange, readOnly = false, size = 'medium' }: RatingProps) {
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return '16px';
      case 'large':
        return '32px';
      default:
        return '24px';
    }
  };

  return (
    <div style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onChange && onChange(star)}
          disabled={readOnly}
          style={{
            ...styles.star,
            fontSize: getSizeStyle(),
            cursor: readOnly ? 'default' : 'pointer'
          }}
        >
          {star <= value ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '4px'
  },
  star: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    outline: 'none'
  }
};
