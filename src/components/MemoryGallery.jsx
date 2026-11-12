import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { memoriesData, memoriesMeta } from '../data/birthdayData';

/**
 * Feature Two: Polaroid-style photo gallery with accessible full-screen lightbox.
 */
export default function MemoryGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + memoriesData.length) % memoriesData.length
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % memoriesData.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  const activeMemory = selectedIndex !== null ? memoriesData[selectedIndex] : null;

  return (
    <section id="memories" className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-eyebrow">
          <Camera size={14} aria-hidden="true" />
          <span>Captured Moments</span>
        </div>
        <h2 className="section-title">{memoriesMeta.heading}</h2>
        <p className="section-subtitle">{memoriesMeta.subtitle}</p>
      </motion.div>

      <div className="polaroid-grid">
        {memoriesData.map((memory, index) => (
          <motion.button
            key={memory.id}
            type="button"
            className={`polaroid-card ${memory.featured ? 'polaroid-card-featured' : ''}`}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Open memory: ${memory.title}`}
            initial={{ opacity: 0, y: 32, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: memory.rotation ?? 0 }}
            whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
          >
            <div className="polaroid-photo-wrap">
              <img
                src={memory.image}
                alt={memory.title}
                className="polaroid-photo"
                style={{ objectPosition: memory.focalPoint || 'center 15%' }}
                loading="lazy"
                decoding="async"
              />
            </div>

            <span className="polaroid-date">
              {memory.featured && <Sparkles size={11} style={{ display: 'inline', marginRight: '5px', verticalAlign: '-1px' }} aria-hidden="true" />}
              {memory.date ? `${memory.label} • ${memory.date}` : memory.label}
            </span>
            <h3 className="polaroid-title">{memory.title}</h3>
            <p className="polaroid-caption">{memory.caption}</p>
          </motion.button>
        ))}
      </div>

      <motion.p
        className="gallery-closing-note"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75 }}
      >
        {memoriesMeta.closingNote}
      </motion.p>

      <AnimatePresence>
        {activeMemory && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={activeMemory.title}
          >
            <motion.div
              className="lightbox-dialog"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close photo lightbox"
              >
                <X size={18} />
              </button>

              <div className="lightbox-img-box">
                <img src={activeMemory.image} alt={activeMemory.title} decoding="async" />
              </div>

              <div>
                <span className="polaroid-date">
                  {activeMemory.date
                    ? `${activeMemory.label} • ${activeMemory.date}`
                    : activeMemory.label}
                </span>
                <h3 className="polaroid-title" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
                  {activeMemory.title}
                </h3>
                <p className="polaroid-caption" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                  {activeMemory.caption}
                </p>

                <div className="lightbox-nav">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={showPrev}
                    aria-label="Previous memory"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={showNext}
                    aria-label="Next memory"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <p
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedIndex + 1} of {memoriesData.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
