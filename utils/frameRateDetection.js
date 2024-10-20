// utils/frameRateDetection.js

export const FRAME_RATE_STORAGE_KEY = 'canAnimate';
export const FRAME_RATE_TIMESTAMP_KEY = 'canAnimateTimestamp';
export const FRAME_RATE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const detectFrameRate = () => {
  if (typeof window === 'undefined') {
    // If window is undefined (e.g., during SSR), resolve to false to prevent animations
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let frame = 0;
    const start = performance.now();

    const checkFrame = () => {
      frame++;
      const now = performance.now();
      if (now - start >= 1000) {
        const frameRate = frame;
        const canAnimate = frameRate >= 30; // Threshold can be adjusted
        try {
          localStorage.setItem(
            FRAME_RATE_STORAGE_KEY,
            JSON.stringify(canAnimate)
          );
          localStorage.setItem(FRAME_RATE_TIMESTAMP_KEY, now.toString());
        } catch (error) {
          console.error('Failed to set localStorage:', error);
        }
        resolve(canAnimate);
      } else {
        requestAnimationFrame(checkFrame);
      }
    };

    requestAnimationFrame(checkFrame);
  });
};

export const getStoredFrameRate = () => {
  if (typeof window === 'undefined') return null;

  try {
    const storedValue = localStorage.getItem(FRAME_RATE_STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(FRAME_RATE_TIMESTAMP_KEY);
    if (storedValue && storedTimestamp) {
      const age = Date.now() - parseInt(storedTimestamp, 10);
      if (age < FRAME_RATE_EXPIRY) {
        return JSON.parse(storedValue);
      }
    }
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
  }
  return null;
};
