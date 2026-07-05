'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const slides = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const fullLines = [
    "> Initializing system diagnostics...",
    "> Analyzing hardware integrity... [OK]",
    "> Compiling network protocols... [DONE]",
    "> System Optimized. Ready."
  ];

  useEffect(() => {
    if (currentLine >= fullLines.length) return;

    const timeout = setTimeout(() => {
      setLines(prev => {
        const newLines = [...prev];
        if (!newLines[currentLine]) newLines[currentLine] = '';
        newLines[currentLine] = fullLines[currentLine].substring(0, currentChar + 1);
        return newLines;
      });

      if (currentChar < fullLines[currentLine].length) {
        setCurrentChar(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }, 800); // pause before next line
      }
    }, Math.random() * 30 + 30); // typing speed

    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalHeader}>
        <div className={styles.termBtn} style={{ background: '#ff5f56' }} />
        <div className={styles.termBtn} style={{ background: '#ffbd2e' }} />
        <div className={styles.termBtn} style={{ background: '#27c93f' }} />
        <div className={styles.termTitle}>shree-infotech-cli</div>
      </div>
      <div className={styles.terminalBody}>
        {lines.map((line, i) => (
          <div key={i} className={styles.termLine}>{line}</div>
        ))}
        {currentLine < fullLines.length && (
          <span className={styles.cursor}>_</span>
        )}
      </div>
    </div>
  );
}

export default function Hero({ content }: { content?: any }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroTitle = content?.heroTitle || 'Premium IT Solutions Built for the Future';
  const heroSubtitle = content?.heroSubtitle || 'Expert laptop repairs, custom PC builds, and enterprise networking solutions in Mundra, Gujarat.';

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.slideContainer}>
        {slides.map((src, i) => (
          <div key={i} className={`${styles.slide} ${i === activeSlide ? styles.slideActive : ''}`}>
            <img src={src} alt={`Shree Infotech Banner ${i + 1}`} className={styles.slideImage} />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.floatingOrb + ' ' + styles.orb1} />
      <div className={styles.floatingOrb + ' ' + styles.orb2} />
      <div className={styles.floatingOrb + ' ' + styles.orb3} />

      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.badge}>{content?.heroBadge || '🚀 Since 2005'}</div>
          <h1 className={styles.heading}>
            {heroTitle.split(' ').map((word: string, i: number) => 
              word.toLowerCase() === 'it' || word.toLowerCase() === 'solutions' || word.toLowerCase() === 'future' ? 
              <span key={i} className={styles.headingGradient}>{word} </span> : 
              word + ' '
            )}
          </h1>
          <p className={styles.subheading}>
            {heroSubtitle}
          </p>
          <div className={styles.cta}>
            <button className={styles.ctaPrimary} onClick={() => scrollTo('#inquiry')}>
              {content?.heroCTA1 || 'Get in Touch →'}
            </button>
            <button className={styles.ctaSecondary} onClick={() => scrollTo('#products')}>
              {content?.heroCTA2 || 'Our Products'}
            </button>
          </div>
        </div>
        
        <div className={styles.contentRight}>
          <TerminalAnimation />
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
