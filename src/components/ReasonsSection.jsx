import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { reasonsData, reasonsMeta } from '../data/birthdayData';

/**
 * Feature Five: 20 Reasons Why You're Special.
 * Reveals one reason card at a time with progress tracking and completion message.
 */
export default function ReasonsSection() {
  const [revealedCount, setRevealedCount] = useState(1);
  const total = reasonsData.length;
  const allRevealed = revealedCount >= total;

  const handleRevealNext = () => {
    if (allRevealed) return;
    setRevealedCount((prev) => Math.min(prev + 1, total));
  };

  return (
    <section id="reasons" className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-eyebrow">
          <Heart size={14} aria-hidden="true" />
          <span>20 Little Truths</span>
        </div>
        <h2 className="section-title">{reasonsMeta.heading}</h2>
        <p className="section-subtitle">{reasonsMeta.subheading}</p>
      </motion.div>

      {!allRevealed && (
        <div className="reasons-controls" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="button" className="btn-romantic" onClick={handleRevealNext}>
            <Sparkles size={16} aria-hidden="true" />
            <span>{reasonsMeta.revealButtonText}</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setRevealedCount(total)}
          >
            <span>Reveal All 20 Reasons 💕</span>
          </button>
        </div>
      )}

      <div className="reasons-grid">
        <AnimatePresence initial={false}>
          {reasonsData.slice(0, revealedCount).map((reason, idx) => {
            const isLatest = idx === revealedCount - 1;
            return (
              <motion.article
                key={`reason-${idx + 1}`}
                className={`reason-card ${isLatest ? 'reason-card-latest' : ''}`}
                initial={{ opacity: 0, y: 22, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="reason-number">Reason #{String(idx + 1).padStart(2, '0')}</span>
                <p className="reason-text">{reason}</p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65 }}
            style={{ textAlign: 'center' }}
          >
            <div className="reasons-complete-banner">
              {reasonsMeta.completionMessage}
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setRevealedCount(1)}
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>Start Over from Reason #01</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

