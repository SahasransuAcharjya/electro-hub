'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false
}: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#F5F5F5',
          color: '#333333',
          border: 'none'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#333333',
          border: '1px solid #F5F5F5'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#333333',
          border: 'none'
        };
      default:
        return {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: 'none'
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: '14px',
          padding: '8px 16px'
        };
      case 'large':
        return {
          fontSize: '18px',
          padding: '16px 32px'
        };
      default:
        return {
          fontSize: '16px',
          padding: '12px 24px'
        };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        ...getVariantStyle(),
        ...getSizeStyle(),
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </button>
  );
}

const styles = {
  button: {
    fontWeight: '600' as const,
    borderRadius: '4px',
    transition: 'all 0.2s',
    outline: 'none'
  }
};
