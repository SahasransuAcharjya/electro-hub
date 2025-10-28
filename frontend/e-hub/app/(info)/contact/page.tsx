'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>We'd love to hear from you</p>

        <div style={styles.grid}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Get in Touch</h2>
            
            <div style={styles.infoItem}>
              <h3 style={styles.infoLabel}>Email</h3>
              <p style={styles.infoText}>support@electro-hub.com</p>
            </div>

            <div style={styles.infoItem}>
              <h3 style={styles.infoLabel}>Phone</h3>
              <p style={styles.infoText}>+91 1800-123-4567</p>
            </div>

            <div style={styles.infoItem}>
              <h3 style={styles.infoLabel}>Address</h3>
              <p style={styles.infoText}>
                123 Electronics Plaza<br/>
                Mumbai, Maharashtra 400001<br/>
                India
              </p>
            </div>

            <div style={styles.infoItem}>
              <h3 style={styles.infoLabel}>Business Hours</h3>
              <p style={styles.infoText}>
                Monday - Saturday: 9:00 AM - 8:00 PM<br/>
                Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Send us a Message</h2>
            
            {submitted && (
              <div style={styles.successBox}>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Your name"
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
                  placeholder="Your email"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Subject"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={styles.textarea}
                  placeholder="Your message"
                />
              </div>

              <button type="submit" style={styles.button}>
                Send Message
              </button>
            </form>
          </div>
        </div>
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
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '8px',
    textAlign: 'center' as const
  },
  subtitle: {
    fontSize: '16px',
    color: '#9E9E9E',
    marginBottom: '48px',
    textAlign: 'center' as const
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '24px'
  },
  infoItem: {
    marginBottom: '24px'
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '8px'
  },
  infoText: {
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.6'
  },
  successBox: {
    backgroundColor: '#F5F5F5',
    color: '#1A1A1A',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '24px',
    border: '1px solid #333333',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
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
  textarea: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none',
    resize: 'vertical' as const,
    fontFamily: 'inherit'
  },
  button: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
