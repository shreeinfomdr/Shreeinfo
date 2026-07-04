'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function TestimonialSubmit() {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) {
      alert("Please select a rating.");
      return;
    }
    
    setStatus('loading');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', text: '', rating: 5 });
        alert('Thank you! Your testimonial has been submitted successfully.');
        window.location.href = '/#testimonials';
      } else {
        setStatus('error');
        alert('Failed to submit testimonial. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      alert('An error occurred. Please try again later.');
    }
    
    setTimeout(() => { if(status !== 'loading') setStatus('') }, 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Write a Review</h1>
        <p className={styles.subtitle}>Share your experience with Shree Infotech</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup} style={{textAlign: 'center'}}>
            <label>Rating</label>
            <div className={styles.ratingWrap}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star}
                  className={`${styles.star} ${(hoverRating || form.rating) >= star ? styles.starActive : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setForm({...form, rating: star})}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Your Name</label>
            <input 
              type="text" 
              required 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
              placeholder="e.g. Rahul Patel"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Your Review</label>
            <textarea 
              required 
              value={form.text} 
              onChange={e => setForm({...form, text: e.target.value})} 
              placeholder="Tell us about your experience..."
            />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
        
        <a href="/" className={styles.backLink}>← Back to Home</a>
      </div>
    </div>
  );
}
