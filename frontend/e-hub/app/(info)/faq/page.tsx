'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our products, add items to cart, proceed to checkout, enter shipping details, and complete payment.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD).'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-7 business days. Express delivery is available for select locations.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes, we offer free shipping on orders above ₹500.'
    },
    {
      question: 'What is your return policy?',
      answer: 'You can return products within 7 days of delivery if unused and in original packaging.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Login to your account, go to Orders section, and click on the order to view tracking details.'
    },
    {
      question: 'Are products covered under warranty?',
      answer: 'Yes, all products come with manufacturer warranty. Warranty period varies by product.'
    },
    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel orders before shipping from your account dashboard. Contact support for shipped orders.'
    },
    {
      question: 'Do you sell refurbished products?',
      answer: 'No, we only sell 100% genuine and brand new products.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'Email us at support@electro-hub.com or call +91 1800-123-4567.'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <p style={styles.subtitle}>Find answers to common questions</p>

        <div style={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} style={styles.faqItem}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={styles.question}
              >
                <span>{faq.question}</span>
                <span style={styles.icon}>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div style={styles.answer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
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
    maxWidth: '800px',
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
  faqList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  question: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333',
    textAlign: 'left' as const
  },
  icon: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333'
  },
  answer: {
    padding: '0 20px 20px 20px',
    fontSize: '14px',
    color: '#9E9E9E',
    lineHeight: '1.8'
  }
};
