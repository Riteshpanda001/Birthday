import React, { useState, useRef, useCallback, Component } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { birthdayConfig } from './data/birthdayData';
import FloatingHearts from './components/FloatingHearts';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import MemoryGallery from './components/MemoryGallery';
import MemoryTimeline from './components/MemoryTimeline';
import LoveLetter from './components/LoveLetter';
import BirthdayCake from './components/BirthdayCake';
import BirthdayCelebration from './components/BirthdayCelebration';
import ReasonsSection from './components/ReasonsSection';
import FutureDreams from './components/FutureDreams';
import FinalMessage from './components/FinalMessage';
import './App.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Celebration boundary error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#memories', label: 'Memories' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#letter', label: 'Letter' },
  { href: '#cake', label: 'Cake' },
  { href: '#reasons', label: 'Reasons' },
  { href: '#future', label: 'Future' },
];

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const audioRef = useRef(null);

  const attemptPlayMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // Gracefully ignore if browser blocks or audio file is unavailable
      setIsPlaying(false);
    }
  }, [audioError]);

  const handleOpenSurprise = () => {
    setHasEntered(true);
    attemptPlayMusic();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <audio
          ref={audioRef}
          src={birthdayConfig.music.src}
          loop
          preload="none"
          onError={() => {
            setAudioError(true);
            setIsPlaying(false);
          }}
        />

        <AnimatePresence mode="wait">
          {!hasEntered && (
            <WelcomeScreen key="welcome-screen" onOpen={handleOpenSurprise} />
          )}
        </AnimatePresence>

        {hasEntered && (
          <motion.div
            key="main-universe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingHearts heartCount={10} starCount={24} />

            <nav className="floating-nav" aria-label="Birthday sections">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <main className="main-experience">
              <HeroSection />
              <div className="section-divider" aria-hidden="true" />
              <MemoryGallery />
              <div className="section-divider" aria-hidden="true" />
              <MemoryTimeline />
              <div className="section-divider" aria-hidden="true" />
              <LoveLetter />
              <div className="section-divider" aria-hidden="true" />
              <BirthdayCake onOpenCelebration={() => setIsCelebrationOpen(true)} />
              <div className="section-divider" aria-hidden="true" />
              <ReasonsSection />
              <FutureDreams />
              <FinalMessage />
            </main>

            <ErrorBoundary>
              <BirthdayCelebration
                isOpen={isCelebrationOpen}
                onClose={() => setIsCelebrationOpen(false)}
              />
            </ErrorBoundary>
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
}

