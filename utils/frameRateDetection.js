// utils/frameRateDetection.js

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
          localStorage.setItem('canAnimate', canAnimate);
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
