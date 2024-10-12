// components/MotionWrapper.jsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { detectFrameRate } from '../utils/frameRateDetection';

const MotionWrapper = ({ children, variants, initial, animate, ...props }) => {
  const [canAnimate, setCanAnimate] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCanAnimate(false);
      setHasChecked(true);
      return;
    }

    const stored = localStorage.getItem('canAnimate');
    if (stored !== null) {
      setCanAnimate(stored === 'true');
      setHasChecked(true);
    } else {
      detectFrameRate().then((result) => {
        setCanAnimate(result);
        setHasChecked(true);
      });
    }
  }, []);

  if (!hasChecked) {
    // Render static content while checking
    return <div {...props}>{children}</div>;
  }

  if (canAnimate) {
    return (
      <motion.div
        variants={variants}
        initial={initial}
        animate={animate}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // If animations are not enabled, render static content
  return <div {...props}>{children}</div>;
};

export default MotionWrapper;
