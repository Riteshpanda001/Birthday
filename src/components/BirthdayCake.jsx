import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cake, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { cakeData, birthdaySongData } from '../data/birthdayData';
import {
  playHappyBirthday,
  stopHappyBirthday,
  subscribeHappyBirthday,
  subscribeLyrics,
} from '../utils/happyBirthday';

const CANDLE_COUNT = 5;

/**
 * Feature Four: Interactive 3D-style Virtual Birthday Cake with Candles,
 * Rising Smoke, and transition to Full-Screen Celebration.
 */
export default function BirthdayCake({ onOpenCelebration }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [isBlowingOut, setIsBlowingOut] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const unsubscribeSong = subscribeHappyBirthday((playing) => {
      setIsSongPlaying(playing);
    });
    const unsubscribeLyrics = subscribeLyrics((idx) => {
      setActiveLyricIndex(idx);
    });
    return () => {
      unsubscribeSong();
      unsubscribeLyrics();
    };
  }, []);

  const handleBlowOut = () => {
    if (!candlesLit || isBlowingOut) return;
    setIsBlowingOut(true);
    setCandlesLit(false);
    setShowSmoke(true);

    // Trigger Happy Birthday melody + vocal song
    playHappyBirthday();

    // Short pause after candles go out and smoke rises before opening celebration
    const delay = prefersReducedMotion ? 400 : 1400;
    setTimeout(() => {
      setIsBlowingOut(false);
      if (onOpenCelebration) {
        onOpenCelebration();
      }
    }, delay);
  };

  const handleToggleSong = () => {
    if (isSongPlaying) {
      stopHappyBirthday();
    } else {
      playHappyBirthday();
    }
  };

  const handleRelight = () => {
    stopHappyBirthday();
    setIsBlowingOut(false);
    setShowSmoke(false);
    setCandlesLit(true);
  };

  return (
    <section id="cake" className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-eyebrow">
          <Cake size={14} aria-hidden="true" />
          <span>Birthday Wish</span>
        </div>
        <h2 className="section-title">{cakeData.heading}</h2>
        <p className="section-subtitle">{cakeData.prompt}</p>
      </motion.div>

      <motion.div
        className="cake-stage"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        <div className="cake-wrapper" role="img" aria-label={candlesLit ? 'Birthday cake with 5 lit candles' : 'Birthday cake with extinguished candles'}>
          <div className="candles-row">
            {Array.from({ length: CANDLE_COUNT }, (_, idx) => (
              <div key={idx} className="candle">
                <span className="candle-wick" />
                {candlesLit && <span className="candle-flame" style={{ animationDelay: `${idx * 0.14}s` }} />}
                {!candlesLit && showSmoke && (
                  <span className="candle-smoke" style={{ animationDelay: `${idx * 0.08}s` }} />
                )}
              </div>
            ))}
          </div>

          <div className="cake-tier cake-tier-top">
            <div className="cake-icing-drip" />
          </div>
          <div className="cake-tier cake-tier-mid">
            <div className="cake-icing-drip" />
          </div>
          <div className="cake-tier cake-tier-base" />
          <div className="cake-plate" />
          <div className="cake-stand-stem" />
          <div className="cake-stand-foot" />
        </div>

        <div style={{ position: 'relative', zIndex: 5 }}>
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.div
                key="blow-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button type="button" className="btn-romantic" onClick={handleBlowOut}>
                  <span>{cakeData.blowButtonText}</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="wish-granted"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.15rem' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.35rem, 2.8vw, 1.9rem)',
                    color: 'var(--pink-soft)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Sparkles size={20} color="#C9A66B" aria-hidden="true" />
                  <span>{cakeData.wishGrantedMessage}</span>
                </p>

                {/* Animated Birthday Song Lyrics */}
                <div className="cake-lyrics-box" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeLyricIndex}
                      className="cake-active-lyric"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {birthdaySongData.lines[activeLyricIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn-romantic"
                    onClick={() => {
                      playHappyBirthday();
                      if (onOpenCelebration) onOpenCelebration();
                    }}
                  >
                    <Sparkles size={16} aria-hidden="true" />
                    <span>Open Birthday Celebration 🎆</span>
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleToggleSong}
                    aria-label={isSongPlaying ? 'Stop Happy Birthday' : 'Play Happy Birthday'}
                  >
                    {isSongPlaying ? <VolumeX size={15} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
                    <span>{isSongPlaying ? 'Stop Happy Birthday' : 'Play Happy Birthday 🎵'}</span>
                  </button>

                  <button type="button" className="btn-secondary" onClick={handleRelight}>
                    <RotateCcw size={15} aria-hidden="true" />
                    <span>{cakeData.replayButtonText}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

