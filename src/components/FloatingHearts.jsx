import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

/**
 * Renders subtle floating hearts and twinkling stars in the background.
 * Uses deterministic pseudo-random positions so layout stays stable across renders.
 */
export default function FloatingHearts({ heartCount = 12, starCount = 26, className = 'ambient-backdrop' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: heartCount }, (_, i) => ({
        id: `heart-${i}`,
        left: `${(i * 8.3 + 4) % 94}%`,
        size: 12 + ((i * 5) % 14),
        duration: `${13 + ((i * 3) % 10)}s`,
        delay: `${(i * 1.4) % 11}s`,
        drift: `${(i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 8)}px`,
        opacity: 0.18 + (i % 3) * 0.09,
      })),
    [heartCount]
  );

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: `star-${i}`,
        left: `${(i * 13.7 + 3) % 97}%`,
        top: `${(i * 19.3 + 5) % 95}%`,
        size: 2 + (i % 3),
        duration: `${3 + (i % 4) * 1.1}s`,
        delay: `${(i * 0.7) % 5}s`,
      })),
    [starCount]
  );

  return (
    <div className={className} aria-hidden="true">
      {stars.map((star) => (
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

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="ambient-heart"
          style={{
            left: heart.left,
            '--duration': heart.duration,
            '--delay': heart.delay,
            '--drift': heart.drift,
            '--max-opacity': heart.opacity,
          }}
        >
          <Heart size={heart.size} fill="currentColor" strokeWidth={1.2} />
        </span>
      ))}
    </div>
  );
}

