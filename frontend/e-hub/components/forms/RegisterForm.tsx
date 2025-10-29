'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RegisterFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
  error?: string;
}

export default function RegisterForm({ onSubmit, loading = false, error }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && (
        <div style={styles.errorBox}>
          {error}
        </div>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Enter your full name"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Enter your email"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number (Optional)</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your phone number"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          style={styles.input}
          placeholder="Create a password (min 6 characters)"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p style={styles.footerText}>
        Already have an account?{' '}
        <Link href="/login" style={styles.link}>
          Login here
        </Link>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  errorBox: {
    backgroundColor: '#F5F5F5',
    color: '#1A1A1A',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #9E9E9E',
    fontSize: '14px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333333'
  },
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none'
  },
  button: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    marginTop: '8px'
  },
  footerText: {
    marginTop: '4px',
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#9E9E9E'
  },
  link: {
    color: '#000000',
    textDecoration: 'none',
    fontWeight: '600'
  }
};
