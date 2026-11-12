import { birthdaySongData } from '../data/birthdayData';

/**
 * Happy Birthday Audio Player
 * Plays the custom birthday audio (/music/happy-birthday.mp3)
 * automatically when she blows out the candles and enters the celebration view.
 */

export const AUDIO_START_OFFSET_SECONDS = 0.0;

let activeAudio = null;
let isPlaying = false;
let isDucked = false;
let savedBgVolume = 1;
let currentLyricIndex = 0;
const listeners = new Set();
const lyricListeners = new Set();

function notifySubscribers(state) {
  isPlaying = state;
  listeners.forEach((fn) => {
    try {
      fn(state);
    } catch {
      // ignore
    }
  });
}

function notifyLyricSubscribers(idx) {
  currentLyricIndex = idx;
  lyricListeners.forEach((fn) => {
    try {
      fn(idx);
    } catch {
      // ignore
    }
  });
}

function duckBackgroundMusic() {
  if (typeof document === 'undefined') return;
  const bgAudio = document.querySelector('audio');
  if (bgAudio && !isDucked) {
    savedBgVolume = typeof bgAudio.volume === 'number' ? bgAudio.volume : 1;
    isDucked = true;
    bgAudio.volume = Math.max(0.12, savedBgVolume * 0.18);
  }
}

function unduckBackgroundMusic() {
  if (typeof document === 'undefined') return;
  const bgAudio = document.querySelector('audio');
  if (bgAudio && isDucked) {
    isDucked = false;
    bgAudio.volume = savedBgVolume;
  }
}

function getAudioElement() {
  if (typeof window === 'undefined') return null;

  if (!activeAudio) {
    const audio = new Audio('/music/happy-birthday.mp3');
    audio.preload = 'auto';

    audio.ontimeupdate = () => {
      const elapsed = Math.max(0, audio.currentTime);
      const totalDuration = Math.max(26, (audio.duration || 30.8));
      const count = birthdaySongData.lines.length;
      const perLine = totalDuration / count;
      const idx = Math.min(count - 1, Math.max(0, Math.floor(elapsed / perLine)));
      notifyLyricSubscribers(idx);
    };

    audio.onplay = () => {
      duckBackgroundMusic();
      notifySubscribers(true);
    };

    audio.onended = () => {
      stopHappyBirthday();
    };

    audio.onerror = () => {
      stopHappyBirthday();
    };

    activeAudio = audio;
  }

  return activeAudio;
}

/**
 * Starts playing the Happy Birthday audio automatically.
 */
export function playHappyBirthday() {
  if (typeof window === 'undefined') return;

  const audio = getAudioElement();
  if (!audio) return;

  try {
    audio.currentTime = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          duckBackgroundMusic();
          notifySubscribers(true);
          notifyLyricSubscribers(0);
        })
        .catch(() => {
          // If browser policy blocked un-gestured play, attach a one-time tap listener to auto-start
          const unlockAudio = () => {
            audio.play().then(() => {
              duckBackgroundMusic();
              notifySubscribers(true);
              notifyLyricSubscribers(0);
            }).catch(() => {});
          };
          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
        });
    }
  } catch {
    // Graceful fallback
  }
}

/**
 * Stops Happy Birthday audio cleanly and restores background music.
 */
export function stopHappyBirthday() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }

  unduckBackgroundMusic();
  notifySubscribers(false);
  notifyLyricSubscribers(0);
}

/**
 * Check if the song is currently playing.
 */
export function isHappyBirthdayPlaying() {
  return isPlaying && activeAudio && !activeAudio.paused;
}

/**
 * Subscribe to play / stop state changes.
 */
export function subscribeHappyBirthday(callback) {
  listeners.add(callback);
  callback(isHappyBirthdayPlaying());
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Subscribe to lyric line index changes (0 to birthdaySongData.lines.length - 1).
 */
export function subscribeLyrics(callback) {
  lyricListeners.add(callback);
  callback(currentLyricIndex);
  return () => {
    lyricListeners.delete(callback);
  };
}
