import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Heart, RotateCcw, Sparkles } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { celebrationData, birthdaySongData } from '../data/birthdayData';
import {
  subscribeLyrics,
  isHappyBirthdayPlaying,
  playHappyBirthday,
  stopHappyBirthday,
} from '../utils/happyBirthday';

const FIREWORK_COLORS = ['#E85D8F', '#F7B5D0', '#C9A66B', '#F8F4F7', '#ff6b9d', '#ffd166'];
const CONFETTI_COLORS = ['#E85D8F', '#F7B5D0', '#C9A66B', '#F8F4F7', '#ff9ebb', '#e0a96d', '#ff4d88'];

/**
 * Full-Screen Birthday Celebration Experience
 * Triggered after blowing out the candles on the cake.
 */
export default function BirthdayCelebration({ isOpen, onClose }) {
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const fireworksIntervalRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const personalMessage = celebrationData.personalMessage;
  const isTypingComplete = typedLength >= personalMessage.length;
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);

  // Sync lyrics with audio playback
  useEffect(() => {
    const unsub = subscribeLyrics((idx) => {
      setActiveLyricIndex(idx);
    });
    return () => unsub();
  }, []);

  // When celebration modal opens, automatically start playing the birthday song
  useEffect(() => {
    if (isOpen) {
      playHappyBirthday();
    } else {
      stopHappyBirthday();
      setActiveLyricIndex(0);
    }
  }, [isOpen]);

  // Fallback: If audio ends or is paused, smoothly cycle lyrics
  useEffect(() => {
    if (!isOpen) return undefined;
    if (isHappyBirthdayPlaying()) return undefined;

    const timer = setInterval(() => {
      setActiveLyricIndex((prev) => (prev + 1) % birthdaySongData.lines.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Typing effect for the personal message
  useEffect(() => {
    if (!isOpen) {
      setTypedLength(0);
      setShowFinalSurprise(false);
      return undefined;
    }

    if (prefersReducedMotion) {
      setTypedLength(personalMessage.length);
      return undefined;
    }

    if (typedLength >= personalMessage.length) return undefined;

    const timer = setTimeout(() => {
      setTypedLength((prev) => Math.min(prev + 3, personalMessage.length));
    }, 18);

    return () => clearTimeout(timer);
  }, [isOpen, typedLength, personalMessage.length, prefersReducedMotion]);

  // Canvas Fireworks System
  const launchBurst = useCallback((ctx, width, height, particles) => {
    const cx = width * (0.15 + Math.random() * 0.7);
    const cy = height * (0.15 + Math.random() * 0.45);
    const count = 38 + Math.floor(Math.random() * 16);

    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = 1.8 + Math.random() * 4.2;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6,
        alpha: 1,
        radius: 2 + Math.random() * 2.5,
        color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
      });
    }
  }, []);

  const startFireworks = useCallback(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = [];

    // Initial 3 bursts
    launchBurst(ctx, canvas.width, canvas.height, particles);
    launchBurst(ctx, canvas.width, canvas.height, particles);
    launchBurst(ctx, canvas.width, canvas.height, particles);

    // Periodic fireworks bursts
    if (fireworksIntervalRef.current) clearInterval(fireworksIntervalRef.current);
    fireworksIntervalRef.current = setInterval(() => {
      launchBurst(ctx, canvas.width, canvas.height, particles);
    }, 1400);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= 0.012;

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [prefersReducedMotion, launchBurst]);

  const stopFireworks = useCallback(() => {
    if (fireworksIntervalRef.current) {
      clearInterval(fireworksIntervalRef.current);
      fireworksIntervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      startFireworks();
    } else {
      stopFireworks();
    }
    return () => stopFireworks();
  }, [isOpen, startFireworks, stopFireworks]);

  const handleClose = useCallback(() => {
    stopHappyBirthday();
    onClose();
  }, [onClose]);

  const handleReplayCelebration = useCallback(() => {
    stopFireworks();
    startFireworks();
    setTypedLength(0);
    setShowFinalSurprise(false);
    playHappyBirthday();
  }, [startFireworks, stopFireworks]);

  // Lock background scroll and handle Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('celebration-modal-open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove('celebration-modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Precomputed confetti particles
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: `confetti-${i}`,
        left: `${(i * 3.1 + 1.5) % 98}%`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: `${(i * 0.22) % 4}s`,
        duration: `${4 + (i % 3) * 1.4}s`,
        size: 8 + (i % 4) * 3,
        rotation: (i * 45) % 360,
      })),
    []
  );

  // Precomputed floating balloons
  const balloons = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: `balloon-${i}`,
        left: `${10 + i * 16}%`,
        color: ['#E85D8F', '#C9A66B', '#F7B5D0', '#a82857', '#F8F4F7', '#ffd166'][i],
        delay: `${i * 1.8}s`,
        duration: `${14 + (i % 3) * 3}s`,
      })),
    []
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="celebration-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Birthday celebration surprise"
        >
        <canvas ref={canvasRef} className="celebration-canvas" aria-hidden="true" />
        <FloatingHearts heartCount={12} starCount={28} className="celebration-particles" />

        {/* Falling Confetti Layer */}
        <div className="celebration-confetti-layer" aria-hidden="true">
          {confettiPieces.map((c) => (
            <span
              key={c.id}
              className="celebration-confetti"
              style={{
                left: c.left,
                backgroundColor: c.color,
                width: `${c.size}px`,
                height: `${c.size * 0.55}px`,
                animationDelay: c.delay,
                animationDuration: c.duration,
                transform: `rotate(${c.rotation}deg)`,
              }}
            />
          ))}
        </div>

        {/* Floating Balloons Layer */}
        <div className="celebration-balloons-layer" aria-hidden="true">
          {balloons.map((b) => (
            <div
              key={b.id}
              className="celebration-balloon"
              style={{
                left: b.left,
                animationDelay: b.delay,
                animationDuration: b.duration,
              }}
            >
              <div
                className="balloon-body"
                style={{
                  background: `radial-gradient(circle at 35% 30%, #fff8, ${b.color})`,
                  boxShadow: `0 8px 24px ${b.color}55`,
                }}
              />
              <span className="balloon-string" />
            </div>
          ))}
        </div>

        {/* Top Control Bar */}
        <div className="celebration-topbar" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '840px', margin: '0 auto 1.25rem' }}>
          <button type="button" className="btn-secondary" onClick={handleClose}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Cake</span>
          </button>
          <button type="button" className="btn-secondary" onClick={handleReplayCelebration}>
            <RotateCcw size={15} aria-hidden="true" />
            <span>Replay Celebration 🎆</span>
          </button>
        </div>

        {/* Main Celebration Content */}
        <div className="celebration-content">
          {/* First Place: Animated Birthday Song Lyrics */}
          <motion.div
            className="celebration-lyrics-card celebration-lyrics-hero"
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            role="region"
            aria-label="Birthday song lyrics"
          >
            <div className="celebration-lyrics-badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>Birthday Song</span>
              <Sparkles size={14} aria-hidden="true" />
            </div>

            <div className="celebration-lyrics-box">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeLyricIndex}
                  className="celebration-active-lyric"
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {birthdaySongData.lines[activeLyricIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="celebration-lyrics-dots" aria-hidden="true">
              {birthdaySongData.lines.map((_, i) => (
                <span
                  key={i}
                  className={`celebration-lyric-dot ${i === activeLyricIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Animated 3D Cake Celebration */}
          <motion.div
            className="celebration-cake-card"
            initial={{ opacity: 0, scale: 0.82, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="celebration-cake-prompt">{celebrationData.wishPrompt}</p>

            <div
              className="cake-wrapper"
              style={{ margin: '1rem auto 1.5rem', paddingTop: '1.75rem', cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="Celebration birthday cake with glowing candles - click to toggle birthday song"
              onClick={() => {
                if (isHappyBirthdayPlaying()) {
                  stopHappyBirthday();
                } else {
                  playHappyBirthday();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (isHappyBirthdayPlaying()) {
                    stopHappyBirthday();
                  } else {
                    playHappyBirthday();
                  }
                }
              }}
            >
              <div className="candles-row">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="candle">
                    <span className="candle-wick" />
                    <span className="candle-flame" style={{ animationDelay: `${idx * 0.14}s` }} />
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
          </motion.div>

          {/* Personal Birthday Message Card */}
          <motion.article
            className="celebration-message-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55 }}
          >
            <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>
              <Heart size={14} fill="currentColor" aria-hidden="true" />
              <span>From The Bottom of My Heart</span>
            </div>

            <p className="celebration-message-text">
              {personalMessage.slice(0, typedLength)}
              {!isTypingComplete && <span className="typing-cursor" aria-hidden="true" />}
            </p>

            {!isTypingComplete && (
              <button
                type="button"
                className="btn-secondary"
                style={{ marginTop: '1rem', fontSize: '0.8rem', padding: '0.45rem 1rem' }}
                onClick={() => setTypedLength(personalMessage.length)}
              >
                Reveal Full Message
              </button>
            )}
          </motion.article>

          {/* One More Birthday Surprise Interactive Button & Reveal */}
          <motion.div
            className="celebration-surprise-stage"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {!showFinalSurprise ? (
                <motion.div
                  key="surprise-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <button
                    type="button"
                    className="btn-romantic celebration-pulse-btn"
                    onClick={() => setShowFinalSurprise(true)}
                  >
                    <Sparkles size={18} aria-hidden="true" />
                    <span>{celebrationData.surpriseButtonText}</span>
                    <Heart size={18} fill="currentColor" aria-hidden="true" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="surprise-revealed"
                  className="celebration-final-card"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="celebration-heart-pulse-box" aria-hidden="true">
                    <Heart size={38} fill="currentColor" />
                  </div>

                  <p className="celebration-final-text">
                    {celebrationData.finalSurpriseMessage}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1.25rem',
                      color: 'var(--gold)',
                      marginTop: '1.25rem',
                    }}
                  >
                    Forever and Always Yours ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

