'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Apple', 'iPhone', 'iPad', 'MacBook', 'iMac', 'Apple'];
const flipDuration = 777; // Duration for each flip in milliseconds
const flipDelay = 777; // Delay between flips

const WordFlip = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const flipDurationRef = useRef(flipDuration);
  const flipDelayRef = useRef(flipDelay);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect small screens (e.g., max-width: 640px for Tailwind's 'sm')
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleChange = () => {
      setIsSmallScreen(mediaQuery.matches);
      if (mediaQuery.matches) {
        // If switching to small screen, set to last word and stop flipping
        setCurrentWordIndex(words.length - 1);
        setIsFlipping(false);
      } else {
        // If switching to larger screen, restart flipping
        setCurrentWordIndex(0);
        setIsFlipping(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isSmallScreen) return;

    // Start flipping after the initial render
    const initialFlipTimer = setTimeout(() => {
      setIsFlipping(true);
    }, flipDurationRef.current + flipDelayRef.current);

    return () => clearTimeout(initialFlipTimer);
  }, [prefersReducedMotion, isSmallScreen]);

  useEffect(() => {
    if (prefersReducedMotion || isSmallScreen) return;

    if (isFlipping && currentWordIndex < words.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, flipDurationRef.current + flipDelayRef.current);

      return () => clearTimeout(timer);
    }
    if (isFlipping && currentWordIndex === words.length - 1) {
      // Stop flipping when the last word is reached
      setIsFlipping(false);
    }
  }, [currentWordIndex, isFlipping, prefersReducedMotion, isSmallScreen]);

  // Determine which word to display based on screen size and flipping state
  const displayWord = isSmallScreen
    ? words[words.length - 1]
    : words[currentWordIndex];

  // If prefers reduced motion, also display the current word or last word based on screen size
  if (prefersReducedMotion) {
    return <span className="text-white">{displayWord}</span>;
  }

  return (
    <span
      className="inline-block relative overflow-hidden mt-1"
      style={{
        width: '450px',
        height: '1.2em', // Increased from 1em to accommodate descenders
        transform: 'translateY(-0.1em)', // Shift up slightly to maintain alignment with surrounding text
      }}
    >
      <AnimatePresence>
        {(isFlipping || (currentWordIndex === 0 && !isSmallScreen)) && (
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 text-white"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '0px',
            }}
          >
            {displayWord}
          </motion.span>
        )}
      </AnimatePresence>
      {/* Static word with gradient after flipping or on small screens */}
      {(!isFlipping && currentWordIndex === words.length - 1) ||
      isSmallScreen ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent flex items-center justify-start"
        >
          {displayWord}
        </motion.span>
      ) : null}
    </span>
  );
};

export default WordFlip;
