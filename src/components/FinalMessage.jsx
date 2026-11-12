import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { finalMessageData } from '../data/birthdayData';

/**
 * Section 9: Final Emotional Birthday Message.
 */
export default function FinalMessage() {
  return (
    <section id="final" className="final-section" aria-label="Final birthday message">
      <motion.div
        className="final-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-eyebrow">
          <Heart size={14} fill="currentColor" aria-hidden="true" />
          <span>{finalMessageData.eyebrow}</span>
        </div>

        <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
          {finalMessageData.heading}
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(1.02rem, 1.8vw, 1.18rem)',
            maxWidth: '580px',
            margin: '0 auto 1.75rem',
            lineHeight: 1.8,
          }}
        >
          {finalMessageData.message}
        </p>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            fontStyle: 'italic',
            color: 'var(--gold)',
          }}
        >
          {finalMessageData.signature}
        </p>

        <div style={{ marginTop: '2.5rem' }}>
          <a
            href="#hero"
            className="btn-romantic"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>Relive Our Story From the Beginning ✨</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
