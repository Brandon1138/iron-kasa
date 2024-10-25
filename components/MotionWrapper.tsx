// context/MotionWrapper.tsx

'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { detectFrameRate } from '../utils/frameRateDetection';

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const motionPropsList: Array<keyof MotionWrapperProps> = [
  'whileInView',
  'variants',
  'initial',
  'animate',
  'transition',
  'viewport',
  // Add other motion props if needed
];

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variants,
  initial,
  animate,
  whileInView,
  transition,
  viewport,
  style,
  className,
  ...props
}) => {
  const [canAnimate, setCanAnimate] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

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
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(
        ([key]) => !motionPropsList.includes(key as keyof MotionWrapperProps)
      )
    );
    return (
      <div {...filteredProps} style={style} className={className}>
        {children}
      </div>
    );
  }

  if (canAnimate) {
    return (
      <motion.div
        variants={variants}
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        transition={transition}
        viewport={viewport}
        style={style}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // If animations are not enabled, render static content without motion props
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => !motionPropsList.includes(key as keyof MotionWrapperProps)
    )
  );

  return (
    <div {...filteredProps} style={style} className={className}>
      {children}
    </div>
  );
};

export default MotionWrapper;
