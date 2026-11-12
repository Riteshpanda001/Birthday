import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Heart, MailOpen } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { loveLetterData } from '../data/birthdayData';

/**
 * Feature Three: Animated Envelope that opens into a Full-Screen
 * Romantic Love Letter Experience.
 */
export default function LoveLetter() {
  const [isOpening, setIsOpening] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const fullText = loveLetterData.content;
  const isTypingComplete = typedLength >= fullText.length;

  const handleOpenEnvelope = () => {
    if (isOpening || isFullScreenOpen) return;
    setIsOpening(true);
    setTypedLength(0);

    setTimeout(() => {
      setIsFullScreenOpen(true);
      if (prefersReducedMotion) {
        setTypedLength(fullText.length);
      }
    }, prefersReducedMotion ? 50 : 600);
  };

  const handleCloseFullScreen = useCallback(() => {
    setIsFullScreenOpen(false);
    setIsOpening(false);
    setTypedLength(0);
  }, []);

  // Typing reveal effect while full-screen letter is open
  useEffect(() => {
    if (!isFullScreenOpen || prefersReducedMotion) return undefined;
    if (typedLength >= fullText.length) return undefined;

    const timer = setTimeout(() => {
      setTypedLength((prev) => Math.min(prev + 3, fullText.length));
    }, 12);

    return () => clearTimeout(timer);
  }, [isFullScreenOpen, typedLength, fullText.length, prefersReducedMotion]);

  // Lock background scroll and allow Escape key to close
  useEffect(() => {
    if (!isFullScreenOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('letter-modal-open');

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleCloseFullScreen();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove('letter-modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreenOpen, handleCloseFullScreen]);

  return (
    <section id="letter" className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-eyebrow">
          <MailOpen size={14} aria-hidden="true" />
          <span>From My Heart</span>
        </div>
        <h2 className="section-title">{loveLetterData.heading}</h2>
      </motion.div>

      <div className="envelope-stage">
        <motion.div
          className="envelope-shell"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <motion.div
            className="envelope-flap"
            animate={isOpening ? { rotateX: 165, opacity: 0.45 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="envelope-pocket" aria-hidden="true" />

          <button
            type="button"
            className="wax-seal"
            onClick={handleOpenEnvelope}
            aria-label="Break wax seal and open letter"
          >
            <Heart size={28} fill="currentColor" />
          </button>

          <p className="envelope-label">{loveLetterData.envelopeLabel}</p>

          <button
            type="button"
            className="btn-romantic"
            style={{ position: 'relative', zIndex: 4, padding: '0.72rem 1.65rem', fontSize: '0.94rem' }}
            onClick={handleOpenEnvelope}
          >
            <span>{loveLetterData.openButtonText}</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFullScreenOpen && (
          <motion.div
            className="letter-fullscreen-overlay"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={loveLetterData.fullScreenHeading}
          >
            <FloatingHearts heartCount={10} starCount={24} className="letter-fullscreen-particles" />

            <div className="letter-fullscreen-topbar">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCloseFullScreen}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Envelope</span>
              </button>
            </div>

            <div className="letter-fullscreen-grid letter-fullscreen-single">
              <motion.article
                className="letter-left-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="letter-paper letter-paper-fullscreen">
                  <div className="letter-paper-header">
                    <h2 className="letter-paper-title">{loveLetterData.fullScreenHeading}</h2>
                    <span className="letter-paper-kicker">{loveLetterData.fullScreenSubtitle}</span>
                  </div>

                  <p className="letter-greeting">{loveLetterData.greeting}</p>

                  <div className="letter-body letter-body-fullscreen">
                    {fullText.slice(0, typedLength)}
                    {!isTypingComplete && <span className="typing-cursor" aria-hidden="true" />}
                  </div>

                  <div className="letter-paper-footer">
                    <div>
                      <p className="letter-closing-lead">{loveLetterData.closingLead}</p>
                      <p className="letter-signature">{loveLetterData.signature}</p>
                    </div>

                    {!isTypingComplete && (
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{
                          fontSize: '0.8rem',
                          padding: '0.45rem 1rem',
                          borderColor: 'rgba(185, 54, 104, 0.35)',
                          background: 'rgba(185, 54, 104, 0.08)',
                          color: '#8b224a',
                        }}
                        onClick={() => setTypedLength(fullText.length)}
                      >
                        Reveal Full Letter
                      </button>
                    )}
                  </div>

                  <blockquote className="letter-highlight-quote">
                    {loveLetterData.highlightedQuote}
                  </blockquote>
                </div>
              </motion.article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
