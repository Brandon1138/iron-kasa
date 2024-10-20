// components/ServiceCard.jsx

'use client';

import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import Image from 'next/image';
import { AnimationContext } from '../context/AnimationContext'; // Import AnimationContext

const ServiceCard = ({
  service,
  onClick,
  isAnimationComplete,
  isActive, // Indicates if the ServiceModal is open
}) => {
  const { imgUrl, title, sizes } = service;

  // Access canAnimate from AnimationContext
  const { canAnimate } = useContext(AnimationContext);

  // State to manage screen size
  const [screenSize, setScreenSize] = useState('sm');

  // State to manage hover
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Function to handle screen resize
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        // xl and above
        setScreenSize('xl');
      } else if (width >= 1024) {
        // lg
        setScreenSize('lg');
      } else if (width >= 768) {
        // md
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Get image size based on screen size with improved fallback
  const imageSize = sizes[screenSize] || sizes.lg || sizes.md || sizes.sm;

  // Determine if the glow should be visible
  const isGlowVisible = isActive || isHovered;

  return (
    <motion.div
      className="
        relative cursor-pointer group
        w-[150px] aspect-square
        sm:w-[200px]
        md:w-[203px]
        lg:w-[270px]
        xl:w-[320px]
        rounded-[30px]
        sm:rounded-[32px]
        md:rounded-[36px]
        lg:rounded-[44px]
        xl:rounded-[50px]
        overflow-visible
        flex justify-center items-center
        outer-shadow
        glassmorphism
        transition-transform duration-300
        group-hover:scale-105
      "
      onClick={() => {
        if (isAnimationComplete) onClick();
      }}
      whileHover={{ scale: 1.05 }}
      animate={{ scale: isActive ? 1.05 : 1 }} // Conditional scale based on isActive
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick();
      }}
      // Handle hover state
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open details for ${title}`}
    >
      {/* AnimatePresence wraps the conditional glow elements */}
      <AnimatePresence>
        {isGlowVisible && canAnimate && (
          // Animated Glow with fade-in and fade-out
          <motion.div
            key="glow"
            className={`
              absolute inset-0 transform
              blur-md sm:blur-md md:blur-lg lg:blur-xl xl:blur-2xl
              animate-spin-slow
              pointer-events-none
              z-0
              rounded-[30px]
              sm:rounded-[32px]
              md:rounded-[36px]
              lg:rounded-[44px]
              xl:rounded-[50px]
              scale-100 sm:scale-110 md:scale-125 lg:scale-150 xl:scale-175 2xl:scale-200
            `}
            style={{
              background:
                'conic-gradient(from 0deg, #a855f7 0%, #c34cdc 25%, #f43f5e 50%, #ec6e36 75%, #d97706 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Fade out on exit
            transition={{ duration: 0.5 }}
          />
        )}

        {isGlowVisible && !canAnimate && (
          // Static Box-Shadow Fallback with fade-in and fade-out
          <motion.div
            key="box-shadow"
            className={`
              absolute inset-0
              z-0
              rounded-[30px]
              sm:rounded-[32px]
              md:rounded-[36px]
              lg:rounded-[44px]
              xl:rounded-[50px]
              box-shadow-fallback
            `}
            style={{
              boxShadow:
                '-8px -8px 32px rgba(168, 85, 247, 0.37), ' +
                '0px 0px 32px rgba(244, 63, 94, 0.37), ' +
                '8px 8px 32px rgba(217, 119, 6, 0.37)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Fade out on exit
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Card Content with Gradient Background Transition */}
      <div
        className={`
          absolute inset-0 z-10
          flex flex-col justify-center items-center
          rounded-[30px]
          sm:rounded-[32px]
          md:rounded-[36px]
          lg:rounded-[44px]
          xl:rounded-[50px]
          transition-colors duration-500
          bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
          ${isGlowVisible ? 'from-[#1e1e1eBF] to-[#1e1e1eBF]' : 'from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]'}
        `}
      >
        {/* Image */}
        <div
          style={{
            width: imageSize.width,
            height: imageSize.height,
          }}
          className="flex justify-center items-center"
        >
          <Image
            src={imgUrl}
            alt={title}
            width={imageSize.width}
            height={imageSize.height}
            objectFit="contain"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* Title */}
        <h3
          className="mt-2 text-center text-[12px] md:text-md lg:text-lg font-regular text-white group-hover:text-white"
          style={{ transition: 'color 0.5s linear' }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
