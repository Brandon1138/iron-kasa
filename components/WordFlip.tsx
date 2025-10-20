'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const words = ['Apple', 'iPhone', 'iPad', 'MacBook', 'iMac', 'Apple'] as const;
const flipDuration = 777;
const flipDelay = 777;

const WordFlip = (): JSX.Element => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const flipDurationRef = useRef<number>(flipDuration);
  const flipDelayRef = useRef<number>(flipDelay);

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
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleChange = () => {
      setIsSmallScreen(mediaQuery.matches);
      if (mediaQuery.matches) {
        setCurrentWordIndex(words.length - 1);
        setIsFlipping(false);
      } else {
        setCurrentWordIndex(0);
        setIsFlipping(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isSmallScreen) {
      return;
    }

    const initialFlipTimer = window.setTimeout(() => {
      setIsFlipping(true);
    }, flipDurationRef.current + flipDelayRef.current);

    return () => window.clearTimeout(initialFlipTimer);
  }, [prefersReducedMotion, isSmallScreen]);

  useEffect(() => {
    if (prefersReducedMotion || isSmallScreen) {
      return;
    }

    if (isFlipping && currentWordIndex < words.length - 1) {
      const timer = window.setTimeout(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, flipDurationRef.current + flipDelayRef.current);

      return () => window.clearTimeout(timer);
    }

    if (isFlipping && currentWordIndex === words.length - 1) {
      setIsFlipping(false);
    }
  }, [currentWordIndex, isFlipping, prefersReducedMotion, isSmallScreen]);

  const displayWord = isSmallScreen
    ? words[words.length - 1]
    : words[currentWordIndex];

  if (prefersReducedMotion) {
    return <span className="text-white">{displayWord}</span>;
  }

  return (
    <span
      className="inline-block relative overflow-hidden mt-1"
      style={{
        width: '450px',
        height: '1.2em',
        transform: 'translateY(-0.1em)',
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
      {(!isFlipping && currentWordIndex === words.length - 1) ||
      isSmallScreen ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`
            absolute inset-0
            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
            from-purple-500 via-rose-500 to-amber-500
            bg-clip-text text-transparent
            flex items-center justify-start
          `}
        >
          {displayWord}
        </motion.span>
      ) : null}
    </span>
  );
};

export default WordFlip;
