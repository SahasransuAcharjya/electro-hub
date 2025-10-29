'use client';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label style={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{
          ...styles.checkbox,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      />
      {label && (
        <span style={{
          ...styles.label,
          color: disabled ? '#9E9E9E' : '#333333'
        }}>
          {label}
        </span>
      )}
    </label>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px'
  },
  label: {
    fontSize: '14px',
    userSelect: 'none' as const
  }
};
