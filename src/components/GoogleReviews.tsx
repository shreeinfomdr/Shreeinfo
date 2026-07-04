'use client';
import Script from 'next/script';
import { useState } from 'react';

export default function GoogleReviews() {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  // INSTRUCTIONS: Go to https://elfsight.com/google-reviews-widget/, create a widget, 
  // and paste your actual widget ID below (e.g. 'a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  const WIDGET_ID = 'YOUR_WIDGET_ID_HERE';
  const isConfigured = WIDGET_ID !== 'YOUR_WIDGET_ID_HERE';

  return (
    <section id="reviews" style={{ padding: '100px 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Customer Reviews</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '60px' }}>Read what our clients in Mundra have to say about us</p>
        
        <div style={{ position: 'relative', minHeight: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', overflow: 'hidden' }}>
          
          {/* Setup Required State */}
          {!isConfigured && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px', background: 'rgba(59, 130, 246, 0.05)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/></svg>
              <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '8px' }}>Google Reviews Setup Required</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.6, fontSize: '0.95rem' }}>
                To display your real Google Reviews, open <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>src/components/GoogleReviews.tsx</code> and replace <strong>'YOUR_WIDGET_ID_HERE'</strong> with your free Elfsight Widget ID.
              </p>
            </div>
          )}

          {/* Loading / Error States (Only show if configured) */}
          {isConfigured && loadState === 'loading' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 2s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Loading latest reviews...
              </div>
            </div>
          )}
          
          {isConfigured && loadState === 'error' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Failed to load reviews. Please check your ad blocker or refresh.
              </div>
            </div>
          )}

          {isConfigured && (
            <div 
              className={`elfsight-app-${WIDGET_ID}`} 
              data-elfsight-app-lazy 
              style={{ opacity: loadState === 'loaded' ? 1 : 0, transition: 'opacity 0.5s ease' }}
            ></div>
          )}
        </div>

        {/* Inject Global CSS for Spinner */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}} />

        {/* Load Widget Script ONLY if configured to prevent console errors */}
        {isConfigured && (
          <Script 
            src="https://static.elfsight.com/platform/platform.js"
            strategy="lazyOnload"
            onLoad={() => {
              setTimeout(() => setLoadState('loaded'), 1500);
            }}
            onError={() => {
              setLoadState('error');
            }}
          />
        )}
      </div>
    </section>
  );
}
