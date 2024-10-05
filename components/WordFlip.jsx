// components/WordFlip.jsx

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Apple', 'iPhone', 'iPad', 'MacBook', 'iMac', 'Apple'];
const flipDuration = 666; // Duration for each flip in milliseconds
const flipDelay = 666; // Delay between flips

const WordFlip = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Start flipping after the initial render
    const initialFlipTimer = setTimeout(() => {
      setIsFlipping(true);
    }, flipDuration + flipDelay);

    return () => clearTimeout(initialFlipTimer);
  }, [flipDuration, flipDelay, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isFlipping && currentWordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, flipDuration + flipDelay);

      return () => clearTimeout(timer);
    } else if (isFlipping && currentWordIndex === words.length - 1) {
      // Stop flipping when the last word is reached
      setIsFlipping(false);
    }
  }, [
    currentWordIndex,
    isFlipping,
    words.length,
    flipDuration,
    flipDelay,
    prefersReducedMotion,
  ]);

  if (prefersReducedMotion) {
    return <span className="text-white">{words[currentWordIndex]}</span>;
  }

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{ width: '400px', height: '1em' }} // Set width to 400px
    >
      <AnimatePresence>
        {(isFlipping || currentWordIndex === 0) && (
          <motion.span
            key={currentWordIndex}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 text-white"
            style={{
              transformOrigin: 'center',
              backfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start', // Align text to the left
              paddingLeft: '0px', // Ensure there's no extra padding
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        )}
      </AnimatePresence>
      {/* Static word with gradient after flipping */}
      {!isFlipping && currentWordIndex === words.length - 1 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-start"
        >
          {words[currentWordIndex]}
        </motion.span>
      )}
    </span>
  );
};

export default WordFlip;
