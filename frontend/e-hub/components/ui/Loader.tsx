'use client';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export default function Loader({ size = 'medium', color = '#000000', fullScreen = false }: LoaderProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 60;
      default:
        return 40;
    }
  };

  const loaderSize = getSize();

  const loader = (
    <div style={{
      ...styles.spinner,
      width: loaderSize,
      height: loaderSize,
      borderColor: `${color}33`,
      borderTopColor: color
    }}></div>
  );

  if (fullScreen) {
    return (
      <div style={styles.fullScreenContainer}>
        {loader}
      </div>
    );
  }

  return loader;
}

const styles = {
  spinner: {
    border: '3px solid',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  fullScreenContainer: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 9999
  }
};
