// components/Hero.jsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from '../styles';
import { fadeIn, staggerContainer, textVariant } from '../utils/motion';
import WordFlip from '../components/WordFlip'; // Ensure correct relative path

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Animate scale and borderRadius based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 44]);

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

  return (
    <section
      className={`${styles.yPaddings} py-16 lg:py-24 md:py-20 sm:py-16 relative overflow-hidden`}
    >
      {/* Texture Background with 4px Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 blur-md"
        style={{ backgroundImage: 'url(/texture.jpg)' }}
      />

      {/* Black Overlay with 50% Opacity */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: 'url(/noise.png)',
          opacity: 0.05,
          backgroundRepeat: 'fill',
        }}
      />

      {/* Content Wrapper */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col relative z-40 pt-12 sm:pt-16 md:pt-24 lg:pt-32"
      >
        <div className="flex justify-center items-center flex-col relative z-40 md:gap-y-2 lg:gap-y-3">
          <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
            Specialiști în
          </motion.h1>
          <motion.h1
            variants={textVariant(1.2)}
            className={`${styles.heroHeading} flex items-center gap-x-4 ml-[270px] md:ml-[185px] lg:ml-[116px]`} 
          >
            <span className="whitespace-nowrap">reparații</span>
            <WordFlip />
          </motion.h1>
        </div>
        <motion.div
          style={{
            scale,
            borderRadius: borderRadius,
          }}
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="relative w-full pt-16 md:-mt-[10px] -mt-[12px] overflow-hidden"
        >
          <div className="w-full aspect-video overflow-hidden">
            <video
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              poster="/fallback-image.png"
            >
              {/* Mobile Video Source */}
              <source
                src="/hero_video_480p.mp4"
                type="video/mp4"
                media="(max-width: 640px)"
              />
              {/* Tablet Video Source */}
              <source
                src="/hero_video_720p.mp4"
                type="video/mp4"
                media="(max-width: 1024px)"
              />
              {/* Desktop Video Source */}
              <source src="/hero_video_1080p.mp4" type="video/mp4" />
              {/* Fallback Text */}
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
