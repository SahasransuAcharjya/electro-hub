'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export default function Modal({ isOpen, onClose, title, children, size = 'medium' }: ModalProps) {
  if (!isOpen) return null;

  const getMaxWidth = () => {
    switch (size) {
      case 'small':
        return '400px';
      case 'large':
        return '900px';
      default:
        return '600px';
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose}></div>
      
      <div style={{
        ...styles.modal,
        maxWidth: getMaxWidth()
      }}>
        <div style={styles.header}>
          {title && <h3 style={styles.title}>{title}</h3>}
          <button onClick={onClose} style={styles.closeButton}>✕</button>
        </div>

        <div style={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
    zIndex: 9999,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #F5F5F5'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#333333',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  content: {
    padding: '24px'
  }
};
