'use client';

import { useState } from 'react';

interface CheckoutFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function CheckoutForm({ onSubmit, loading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
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
      <h2 style={styles.title}>Shipping Information</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Enter your phone number"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="House no, Street name"
        />
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="City"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Postal Code *</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Postal Code"
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Country *</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          style={styles.input}
          readOnly
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.submitButton,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Continue to Shipping'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
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
  submitButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    marginTop: '8px'
  }
};