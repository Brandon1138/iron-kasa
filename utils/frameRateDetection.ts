// utils/frameRateDetection.ts

// Constants for localStorage keys and expiry duration
export const FRAME_RATE_STORAGE_KEY = 'canAnimate';
export const FRAME_RATE_TIMESTAMP_KEY = 'canAnimateTimestamp';
export const FRAME_RATE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Detects the frame rate of the user's device to determine if animations can be enabled.
 * @returns A promise that resolves to `true` if the frame rate is sufficient for animations, otherwise `false`.
 */
export const detectFrameRate = (): Promise<boolean> => {
  // Check if the code is running in a browser environment
  if (typeof window === 'undefined') {
    // If window is undefined (e.g., during SSR), resolve to false to prevent animations
    return Promise.resolve(false);
  }

  return new Promise<boolean>((resolve) => {
    let frame = 0;
    const start = performance.now();

    /**
     * Callback function to count frames over a 1-second interval.
     */
    const checkFrame = (): void => {
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

/**
 * Retrieves the stored frame rate decision from localStorage if it's still valid.
 * @returns `true` or `false` if a valid stored value exists, otherwise `null`.
 */
export const getStoredFrameRate = (): boolean | null => {
  // Check if the code is running in a browser environment
  if (typeof window === 'undefined') return null;

  try {
    const storedValue = localStorage.getItem(FRAME_RATE_STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(FRAME_RATE_TIMESTAMP_KEY);

    if (storedValue && storedTimestamp) {
      const age = Date.now() - parseInt(storedTimestamp, 10);

      if (age < FRAME_RATE_EXPIRY) {
        return JSON.parse(storedValue) as boolean;
      }
    }
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
  }

  return null;
};
