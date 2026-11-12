import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayData';

export default function HeroSection() {
  const { herName, specialDate, hero } = birthdayConfig;

  return (
    <section id="hero" className="hero-section" aria-label="Birthday greeting">
      <div className="hero-glow" aria-hidden="true" />

      <div className="section-eyebrow">
        <Sparkles size={14} aria-hidden="true" />
        <span>{specialDate}</span>
      </div>

      <h1 className="hero-title">
        <span>{hero.titlePrefix} </span>
        <span className="hero-highlight">{herName} ❤️</span>
      </h1>

      <p className="hero-description">
        {hero.description}
      </p>

      <div>
        <a href="#memories" className="btn-romantic" style={{ textDecoration: 'none' }}>
          <span>Explore Our Universe</span>
        </a>
      </div>

      <motion.a
        href="#memories"
        className="scroll-cue"
        animate={{ y: [0, 6, 0] }}
        transition={{
          y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span>{hero.scrollHint}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
