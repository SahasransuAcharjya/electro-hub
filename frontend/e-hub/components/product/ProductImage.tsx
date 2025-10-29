'use client';

import { useState } from 'react';

interface ProductImageProps {
  images: string[];
  productName: string;
}

export default function ProductImage({ images, productName }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div style={styles.container}>
      <div style={styles.mainImageContainer}>
        {images && images[selectedImage] ? (
          <img
            src={images[selectedImage]}
            alt={productName}
            style={styles.mainImage}
          />
        ) : (
          <div style={styles.imagePlaceholder}>No Image</div>
        )}
      </div>

      {images && images.length > 1 && (
        <div style={styles.thumbnailsContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                ...styles.thumbnail,
                border: selectedImage === index ? '2px solid #000000' : '2px solid #F5F5F5'
              }}
            >
              <img src={image} alt={`${productName} ${index + 1}`} style={styles.thumbnailImage} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  mainImageContainer: {
    width: '100%',
    height: '500px',
    backgroundColor: '#F8F8F8',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#9E9E9E',
    backgroundColor: '#F5F5F5'
  },
  thumbnailsContainer: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto' as const
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    flexShrink: 0,
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  }
};
