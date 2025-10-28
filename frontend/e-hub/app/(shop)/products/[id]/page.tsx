'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  rating: number;
  numReviews: number;
  stock: number;
  brand: string;
  specifications: { [key: string]: string };
}

interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/product/${productId}`);
      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity })
      });

      if (response.ok) {
        alert('Product added to cart!');
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={styles.loadingText}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.notFoundTitle}>Product Not Found</h1>
          <Link href="/products" style={styles.backLink}>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Link href="/products" style={styles.breadcrumb}>
          ← Back to Products
        </Link>

        <div style={styles.productLayout}>
          <div style={styles.imageSection}>
            <div style={styles.mainImageContainer}>
              {product.images && product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  style={styles.mainImage}
                />
              ) : (
                <div style={styles.imagePlaceholder}>No Image</div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div style={styles.thumbnailsContainer}>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      ...styles.thumbnail,
                      border: selectedImage === index ? '2px solid #000000' : '2px solid #F5F5F5'
                    }}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} style={styles.thumbnailImage} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.detailsSection}>
            <p style={styles.category}>{product.category?.name || 'Electronics'}</p>
            <h1 style={styles.productName}>{product.name}</h1>

            {product.brand && (
              <p style={styles.brand}>Brand: {product.brand}</p>
            )}

            <div style={styles.ratingRow}>
              <span style={styles.rating}>⭐ {product.rating || 0}</span>
              <span style={styles.reviews}>({product.numReviews || 0} reviews)</span>
            </div>

            <p style={styles.price}>₹{product.price.toLocaleString()}</p>

            <p style={styles.description}>{product.description}</p>

            <div style={styles.stock}>
              {product.stock > 0 ? (
                <span style={styles.inStock}>In Stock ({product.stock} available)</span>
              ) : (
                <span style={styles.outOfStock}>Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div style={styles.quantitySection}>
                <label style={styles.quantityLabel}>Quantity:</label>
                <div style={styles.quantityControl}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={styles.quantityButton}
                  >
                    −
                  </button>
                  <span style={styles.quantityValue}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div style={styles.actions}>
              {product.stock > 0 && (
                <button onClick={handleAddToCart} style={styles.addToCartButton}>
                  Add to Cart
                </button>
              )}
            </div>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div style={styles.specificationsSection}>
                <h3 style={styles.sectionTitle}>Specifications</h3>
                <table style={styles.specsTable}>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} style={styles.specRow}>
                        <td style={styles.specKey}>{key}</td>
                        <td style={styles.specValue}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <div style={styles.reviewsSection}>
            <h2 style={styles.reviewsTitle}>Customer Reviews</h2>
            <div style={styles.reviewsList}>
              {reviews.map((review) => (
                <div key={review._id} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <span style={styles.reviewAuthor}>{review.user.name}</span>
                    <span style={styles.reviewRating}>⭐ {review.rating}/5</span>
                  </div>
                  <p style={styles.reviewComment}>{review.comment}</p>
                  <p style={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
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
    maxWidth: '1200px',
    margin: '0 auto'
  },
  loadingText: {
    fontSize: '18px',
    color: '#333333',
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  notFoundTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center' as const,
    marginTop: '100px',
    marginBottom: '24px'
  },
  backLink: {
    display: 'block',
    textAlign: 'center' as const,
    color: '#333333',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },
  breadcrumb: {
    display: 'inline-block',
    color: '#333333',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '24px'
  },
  productLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '8px',
    marginBottom: '32px'
  },
  imageSection: {
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
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  category: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginBottom: '12px',
    textTransform: 'uppercase' as const
  },
  productName: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  brand: {
    fontSize: '16px',
    color: '#333333',
    marginBottom: '16px'
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  rating: {
    fontSize: '16px',
    color: '#333333',
    fontWeight: '600'
  },
  reviews: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  price: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '20px'
  },
  description: {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.8',
    marginBottom: '24px'
  },
  stock: {
    marginBottom: '24px'
  },
  inStock: {
    fontSize: '14px',
    color: '#333333',
    fontWeight: '600'
  },
  outOfStock: {
    fontSize: '14px',
    color: '#9E9E9E',
    fontWeight: '600'
  },
  quantitySection: {
    marginBottom: '24px'
  },
  quantityLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '12px',
    display: 'block'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    backgroundColor: '#F5F5F5',
    border: 'none',
    borderRadius: '4px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    cursor: 'pointer'
  },
  quantityValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333333',
    minWidth: '40px',
    textAlign: 'center' as const
  },
  actions: {
    marginBottom: '32px'
  },
  addToCartButton: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  specificationsSection: {
    borderTop: '1px solid #F5F5F5',
    paddingTop: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '16px'
  },
  specsTable: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  specRow: {
    borderBottom: '1px solid #F5F5F5'
  },
  specKey: {
    padding: '12px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    width: '40%'
  },
  specValue: {
    padding: '12px 0',
    fontSize: '14px',
    color: '#9E9E9E'
  },
  reviewsSection: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '8px'
  },
  reviewsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '24px'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  reviewCard: {
    padding: '20px',
    backgroundColor: '#F8F8F8',
    borderRadius: '8px'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  reviewAuthor: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333'
  },
  reviewRating: {
    fontSize: '14px',
    color: '#333333'
  },
  reviewComment: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '8px'
  },
  reviewDate: {
    fontSize: '12px',
    color: '#9E9E9E'
  }
};
