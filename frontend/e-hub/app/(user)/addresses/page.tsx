'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    addressType: 'Home',
    isDefault: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(false);
    setAddresses([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Address saved! (Feature in development)');
    setShowForm(false);
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      addressType: 'Home',
      isDefault: false
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Addresses</h1>
          <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
            {showForm ? 'Cancel' : '+ Add New Address'}
          </button>
        </div>

        {showForm && (
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Add New Address</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
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
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
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
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address Type</label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <label style={styles.checkboxLabel}>Set as default address</label>
              </div>

              <button type="submit" style={styles.submitButton}>
                Save Address
              </button>
            </form>
          </div>
        )}

        {addresses.length === 0 && !showForm ? (
          <div style={styles.noAddresses}>
            <p style={styles.noAddressesText}>No addresses saved yet</p>
            <button onClick={() => setShowForm(true)} style={styles.addFirstButton}>
              Add Your First Address
            </button>
          </div>
        ) : (
          <div style={styles.addressesList}>
            {addresses.map((address) => (
              <div key={address._id} style={styles.addressCard}>
                <div style={styles.addressHeader}>
                  <span style={styles.addressType}>{address.addressType}</span>
                  {address.isDefault && (
                    <span style={styles.defaultBadge}>Default</span>
                  )}
                </div>

                <h3 style={styles.addressName}>{address.fullName}</h3>
                <p style={styles.addressText}>{address.address}</p>
                <p style={styles.addressText}>
                  {address.city}, {address.state} - {address.postalCode}
                </p>
                <p style={styles.addressText}>{address.country}</p>
                <p style={styles.addressText}>Phone: {address.phone}</p>

                <div style={styles.addressActions}>
                  <button style={styles.editButton}>Edit</button>
                  <button style={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F8F8F8',
    padding: '40px 20px'
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  addButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px',
    marginBottom: '32px'
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
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
  select: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none',
    cursor: 'pointer'
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#333333'
  },
  submitButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  noAddresses: {
    backgroundColor: '#FFFFFF',
    padding: '80px 20px',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  noAddressesText: {
    fontSize: '18px',
    color: '#9E9E9E',
    marginBottom: '24px'
  },
  addFirstButton: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  addressesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px'
  },
  addressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  addressType: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#9E9E9E',
    textTransform: 'uppercase' as const
  },
  defaultBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#FFFFFF',
    padding: '4px 8px',
    backgroundColor: '#000000',
    borderRadius: '4px'
  },
  addressName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '12px'
  },
  addressText: {
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '6px'
  },
  addressActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #F5F5F5'
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '10px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#9E9E9E',
    padding: '10px',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
