'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function Dropdown({ options, value, onChange, placeholder = 'Select...', disabled = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={styles.container}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          ...styles.trigger,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span style={styles.arrow}>▼</span>
      </button>

      {isOpen && !disabled && (
        <div style={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                ...styles.option,
                backgroundColor: option.value === value ? '#F5F5F5' : '#FFFFFF'
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'relative' as const,
    width: '100%'
  },
  trigger: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left' as const,
    outline: 'none'
  },
  arrow: {
    fontSize: '10px',
    color: '#9E9E9E'
  },
  menu: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '200px',
    overflowY: 'auto' as const,
    zIndex: 1000
  },
  option: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333333',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};
