import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Heart, Quote } from 'lucide-react';
import {
  timelineMeta,
  timelineData,
  timelineQuotes,
} from '../data/birthdayData';

/**
 * Renders a luminous centered quotation card anchored along the timeline spine.
 */
function TimelineQuoteCard({ text }) {
  if (!text) return null;
  return (
    <motion.div
      className="timeline-quote-row"
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="timeline-heart-marker" aria-hidden="true">
        <Heart size={14} fill="currentColor" />
      </div>
      <blockquote className="timeline-quote-card">
        <Quote size={16} className="timeline-quote-icon" aria-hidden="true" />
        <p>“{text}”</p>
      </blockquote>
    </motion.div>
  );
}

/**
 * Six-Year Love Story Relationship Timeline.
 * Features alternating chapter cards, glowing heart markers, interwoven romantic
 * quotations, subtle floating particles, and a full-width closing reflection.
 */
export default function MemoryTimeline() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: `tl-star-${i}`,
        left: `${(i * 19.7 + 4) % 95}%`,
        top: `${(i * 14.3 + 5) % 92}%`,
        size: 2 + (i % 3),
        duration: `${3 + (i % 4) * 0.9}s`,
        delay: `${(i * 0.55) % 4}s`,
      })),
    []
  );

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-particles" aria-hidden="true">
        {particles.map((star) => (
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
            <CalendarHeart size={14} aria-hidden="true" />
            <span>{timelineMeta.eyebrow}</span>
          </div>
          <h2 className="section-title">{timelineMeta.heading}</h2>
          <p className="section-subtitle">{timelineMeta.subtitle}</p>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-spine timeline-spine-glow" aria-hidden="true" />

          {timelineQuotes[0] && <TimelineQuoteCard text={timelineQuotes[0]} />}

          {timelineData.map((chapter, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const interQuote = timelineQuotes[index + 1];

            return (
              <React.Fragment key={chapter.id}>
                <motion.div
                  className={`timeline-item ${side}`}
                  initial={{ opacity: 0, x: side === 'left' ? -26 : 26, y: 18 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="timeline-dot timeline-dot-heart" aria-hidden="true">
                    <Heart size={10} fill="currentColor" />
                  </span>

                  <article className="timeline-card timeline-chapter-card">
                    <span className="polaroid-date">{chapter.chapterLabel}</span>
                    <h3 className="polaroid-title timeline-chapter-title">
                      {chapter.title}
                    </h3>
                    <p className="timeline-chapter-quote">“{chapter.quote}”</p>
                    <p className="polaroid-caption">{chapter.description}</p>
                  </article>
                </motion.div>

                {interQuote && <TimelineQuoteCard text={interQuote} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
