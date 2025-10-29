'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyle = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#000000',
          color: '#FFFFFF'
        };
      case 'error':
        return {
          backgroundColor: '#F5F5F5',
          color: '#9E9E9E'
        };
      case 'warning':
        return {
          backgroundColor: '#F8F8F8',
          color: '#333333'
        };
      default:
        return {
          backgroundColor: '#333333',
          color: '#FFFFFF'
        };
    }
  };

  return (
    <div style={{
      ...styles.toast,
      ...getTypeStyle()
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={styles.closeButton}>✕</button>
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed' as const,
    bottom: '24px',
    right: '24px',
    padding: '16px 20px',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    fontWeight: '500' as const,
    zIndex: 10000,
    minWidth: '300px',
    maxWidth: '500px'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    marginLeft: 'auto'
  }
};
