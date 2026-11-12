import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { birthdayConfig } from '../data/birthdayData';

/**
 * Feature One: Immersive Full-Screen Surprise Welcome Screen.
 * Triggers music playback and smooth cinematic transition only upon user click.
 */
export default function WelcomeScreen({ onOpen }) {
  const { herName, welcome } = birthdayConfig;

  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Birthday surprise welcome"
    >
      <FloatingHearts heartCount={14} starCount={34} />

      <div className="welcome-card">
        <div className="section-eyebrow">
          <Sparkles size={14} aria-hidden="true" />
          <span>{welcome.badge}</span>
        </div>

        <h1 className="welcome-name">{herName}</h1>

        <p className="welcome-message">{welcome.subtitle}</p>

        <button
          type="button"
          className="btn-romantic"
          onClick={onOpen}
          style={{ cursor: 'pointer' }}
        >
          <span>{welcome.ctaText}</span>
        </button>
      </div>
    </motion.div>
  );
}
