'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CartItemProps {
  item: {
    _id: string;
    product: {
      _id: string;
      name: string;
      price: number;
      images: string[];
      stock: number;
    };
    quantity: number;
    price: number;
  };
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  updating: boolean;
}

export default function CartItem({ item, onUpdateQuantity, onRemove, updating }: CartItemProps) {
  return (
    <div style={styles.cartItem}>
      <Link href={`/products/${item.product._id}`} style={styles.imageLink}>
        <div style={styles.imageContainer}>
          {item.product.images && item.product.images[0] ? (
            <img 
              src={item.product.images[0]} 
              alt={item.product.name}
              style={styles.image}
            />
          ) : (
            <div style={styles.imagePlaceholder}>No Image</div>
          )}
        </div>
      </Link>

      <div style={styles.itemDetails}>
        <Link href={`/products/${item.product._id}`} style={styles.nameLink}>
          <h3 style={styles.itemName}>{item.product.name}</h3>
        </Link>
        <p style={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
        
        <div style={styles.quantityControl}>
          <button
            onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
            disabled={updating || item.quantity <= 1}
            style={{
              ...styles.quantityButton,
              opacity: updating || item.quantity <= 1 ? 0.5 : 1,
              cursor: updating || item.quantity <= 1 ? 'not-allowed' : 'pointer'
            }}
          >
            −
          </button>
          <span style={styles.quantity}>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
            disabled={updating || item.quantity >= item.product.stock}
            style={{
              ...styles.quantityButton,
              opacity: updating || item.quantity >= item.product.stock ? 0.5 : 1,
              cursor: updating || item.quantity >= item.product.stock ? 'not-allowed' : 'pointer'
            }}
          >
            +
          </button>
        </div>

        {item.quantity >= item.product.stock && (
          <p style={styles.stockWarning}>Max stock reached</p>
        )}
      </div>

      <div style={styles.itemActions}>
        <p style={styles.itemTotal}>
          ₹{(item.price * item.quantity).toLocaleString()}
        </p>
        <button
          onClick={() => onRemove(item.product._id)}
          disabled={updating}
          style={{
            ...styles.removeButton,
            opacity: updating ? 0.5 : 1,
            cursor: updating ? 'not-allowed' : 'pointer'
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

const styles = {
  cartItem: {
    display: 'flex',
    gap: '20px',
    padding: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    alignItems: 'flex-start'
  },
  imageLink: {
    textDecoration: 'none'
  },
  imageContainer: {
    width: '100px',
    height: '100px',
    flexShrink: 0
  },
  image: {
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
    fontSize: '12px',
    color: '#9E9E9E',
    borderRadius: '4px'
  },
  itemDetails: {
    flex: 1
  },
  nameLink: {
    textDecoration: 'none'
  },
  itemName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '8px'
  },
  itemPrice: {
    fontSize: '16px',
    color: '#333333',
    marginBottom: '16px'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    backgroundColor: '#F5F5F5',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333',
    minWidth: '30px',
    textAlign: 'center' as const
  },
  stockWarning: {
    fontSize: '12px',
    color: '#9E9E9E',
    marginTop: '8px'
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '12px'
  },
  itemTotal: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9E9E9E',
    fontSize: '14px',
    textDecoration: 'underline'
  }
};
