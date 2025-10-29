'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
}

export default function Badge({ children, variant = 'default', size = 'medium' }: BadgeProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#F5F5F5',
          color: '#000000'
        };
      case 'warning':
        return {
          backgroundColor: '#F8F8F8',
          color: '#333333'
        };
      case 'error':
        return {
          backgroundColor: '#F5F5F5',
          color: '#9E9E9E'
        };
      default:
        return {
          backgroundColor: '#000000',
          color: '#FFFFFF'
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: '10px',
          padding: '4px 8px'
        };
      case 'large':
        return {
          fontSize: '14px',
          padding: '8px 16px'
        };
      default:
        return {
          fontSize: '12px',
          padding: '6px 12px'
        };
    }
  };

  return (
    <span style={{
      ...styles.badge,
      ...getVariantStyle(),
      ...getSizeStyle()
    }}>
      {children}
    </span>
  );
}

const styles = {
  badge: {
    display: 'inline-block',
    fontWeight: '600' as const,
    borderRadius: '4px',
    textAlign: 'center' as const,
    whiteSpace: 'nowrap' as const
  }
};
