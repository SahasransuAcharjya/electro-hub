'use client';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
}

export default function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  fullWidth = false
}: InputProps) {
  return (
    <div style={{
      ...styles.container,
      width: fullWidth ? '100%' : 'auto'
    }}>
      {label && (
        <label style={styles.label}>
          {label}
          {required && <span style={styles.required}> *</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{
          ...styles.input,
          borderColor: error ? '#9E9E9E' : '#F5F5F5',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1
        }}
      />
      
      {error && (
        <span style={styles.error}>{error}</span>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#333333'
  },
  required: {
    color: '#9E9E9E'
  },
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none'
  },
  error: {
    fontSize: '12px',
    color: '#9E9E9E'
  }
};
