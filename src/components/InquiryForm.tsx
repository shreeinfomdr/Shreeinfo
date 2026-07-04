'use client';
import { useState } from 'react';
import styles from './InquiryForm.module.css';

export default function InquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });

  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        alert('Thank you! Your inquiry has been submitted. We will contact you soon.');
        setForm({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        alert('Failed to send inquiry. Please try again or contact us directly.');
      }
    } catch (err) {
      setStatus('error');
      alert('An error occurred. Please try again later.');
    }
    
    setTimeout(() => { if(status !== 'loading') setStatus('') }, 3000);
  };

  return (
    <section className={styles.inquiry} id="inquiry">
      <div className={styles.inquiryInner}>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Have a question? We would love to hear from you</p>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input type="text" name="name" placeholder=" " required value={form.name} onChange={handleChange} />
            <label>Full Name *</label>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <input type="tel" name="phone" placeholder=" " required maxLength={10} value={form.phone} onChange={handleChange} />
              <label>Phone *</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} />
              <label>Email</label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" name="subject" placeholder=" " value={form.subject} onChange={handleChange} />
            <label>Subject</label>
          </div>
          <div className={styles.inputGroup}>
            <textarea name="message" placeholder=" " value={form.message} onChange={handleChange} />
            <label>Description</label>
          </div>
          <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Submit Inquiry →'}
          </button>
          <p className={styles.privacy}>By submitting this form, you agree to the processing of your data to conduct consultations and present offers.</p>
        </form>
      </div>
    </section>
  );
}
