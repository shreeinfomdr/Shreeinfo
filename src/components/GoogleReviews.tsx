'use client';
import Script from 'next/script';
import { useState } from 'react';

export default function GoogleReviews() {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <section id="reviews" style={{ padding: '100px 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Customer Reviews</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '60px' }}>Read what our clients in Mundra have to say about us</p>
        
        <div style={{ position: 'relative', minHeight: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', overflow: 'hidden' }}>
          
          {/* Loading / Error States */}
          {loadState === 'loading' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 2s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Loading latest reviews...
              </div>
            </div>
          )}
          
          {loadState === 'error' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Failed to load reviews. Please check your ad blocker or refresh.
              </div>
            </div>
          )}

          {/* 
            Elfsight Google Reviews Widget 
            INSTRUCTIONS: Replace 'f99a0d89-9828-40e8-b7a4-bb50130dbb1e' with your actual widget ID from Elfsight.
          */}
          <div 
            className="elfsight-app-f99a0d89-9828-40e8-b7a4-bb50130dbb1e" 
            data-elfsight-app-lazy 
            style={{ opacity: loadState === 'loaded' ? 1 : 0, transition: 'opacity 0.5s ease' }}
          ></div>
        </div>

        {/* Inject Global CSS for Spinner */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}} />

        {/* Load Widget Script safely using Next.js Script */}
        <Script 
          src="https://static.elfsight.com/platform/platform.js"
          strategy="lazyOnload"
          onLoad={() => {
            // Give the widget a moment to parse the DOM before showing
            setTimeout(() => setLoadState('loaded'), 1500);
          }}
          onError={() => {
            setLoadState('error');
          }}
        />
      </div>
    </section>
  );
}
