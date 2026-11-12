import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Compass, HeartHandshake, Sparkles, Stars, Sun } from 'lucide-react';
import { futureDreamsData } from '../data/birthdayData';

const DREAM_ICONS = [Compass, HeartHandshake, Stars, Sun];

/**
 * Feature Six: Our Future Together with Starry Night Background.
 */
export default function FutureDreams() {
  const nightStars = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        id: `night-star-${i}`,
        left: `${(i * 17.3 + 2) % 98}%`,
        top: `${(i * 23.1 + 4) % 94}%`,
        size: 1.5 + (i % 3) * 1.2,
        duration: `${2.5 + (i % 5) * 0.9}s`,
        delay: `${(i * 0.45) % 4}s`,
      })),
    []
  );

  return (
    <section id="future" className="future-section">
      <div className="starfield-layer" aria-hidden="true">
        {nightStars.map((star) => (
          <span
            key={star.id}
            className="ambient-star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--duration': star.duration,
              '--delay': star.delay,
            }}
          />
        ))}
      </div>

      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            <span>Written in the Stars</span>
          </div>
          <h2 className="section-title">{futureDreamsData.heading}</h2>
          <p className="section-subtitle">{futureDreamsData.subheading}</p>
        </motion.div>

        <div className="dreams-grid">
          {futureDreamsData.dreams.map((dream, idx) => {
            const Icon = DREAM_ICONS[idx % DREAM_ICONS.length];
            return (
              <motion.article
                key={dream.id}
                className="dream-card"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(232, 93, 143, 0.16)',
                    border: '1px solid rgba(247, 181, 208, 0.25)',
                    color: 'var(--gold)',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                <span className="polaroid-date">{dream.category}</span>
                <h3 className="polaroid-title" style={{ marginBottom: '0.6rem' }}>
                  {dream.title}
                </h3>
                <p className="polaroid-caption">{dream.description}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="dream-quote-banner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
        >
          <p className="dream-quote-text">{futureDreamsData.featuredQuote}</p>
        </motion.div>
      </div>
    </section>
  );
}

