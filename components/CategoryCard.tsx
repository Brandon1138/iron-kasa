// components/CategoryCard.tsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useContext, useEffect, useState, KeyboardEvent } from 'react';
import { AnimationContext } from '../context/AnimationContext';

// Define the props interface for CategoryCard
interface CategoryCardProps {
  id: string;
  imgUrl: string;
  title: string;
  onSelect: () => void;
  isSelected: boolean;
  hoveredCategoryId: string | null;
  setHoveredCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  imgUrl,
  title,
  onSelect,
  isSelected,
  hoveredCategoryId,
  setHoveredCategoryId,
}) => {
  const { canAnimate } = useContext(AnimationContext); // Destructure canAnimate from context
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // For compatibility with older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const isHovered = hoveredCategoryId === id;
  const isAnotherCardHovered =
    hoveredCategoryId !== null && hoveredCategoryId !== id;

  // Determine if the glow should be visible
  const isGlowVisible = (isSelected && !isAnotherCardHovered) || isHovered;

  // Determine if animations should be used
  const shouldAnimate = canAnimate && !prefersReducedMotion;

  // Animation variants for the glow
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Handle key press events for accessibility
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSelect();
    }
  };

  return (
    <motion.div
      className={`
        relative cursor-pointer
        w-[70px] h-[70px]
        sm:w-[110px] sm:h-[110px]
        md:w-[140px] md:h-[140px]
        lg:w-[190px] lg:h-[190px]
        xl:w-[235px] xl:h-[235px]
        2xl:w-[270px] 2xl:h-[270px]
        rounded-[16px]
        sm:rounded-[24px]
        md:rounded-[26px]
        lg:rounded-[28px]
        xl:rounded-[36px]
        2xl:rounded-[44px]
        overflow-visible
        outer-shadow
        glassmorphism
        flex-shrink-0
        transition-transform duration-300
        ${isGlowVisible ? 'scale-105' : ''}
      `}
      onClick={onSelect}
      onMouseEnter={() => setHoveredCategoryId(id)}
      onMouseLeave={() => setHoveredCategoryId(null)}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
      aria-label={`Select ${title}`}
      whileHover={{ scale: 1.05 }}
      animate={{ scale: isGlowVisible ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* AnimatePresence wraps the conditional glow elements */}
      <AnimatePresence>
        {isGlowVisible &&
          (shouldAnimate ? (
            // Animated Glow with fade-in and fade-out
            <motion.div
              key="glow"
              className={`
                absolute inset-0 transform
                blur-md sm:blur-lg md:blur-lg lg:blur-xl xl:blur-2xl
                animate-spin-slow
                pointer-events-none
                z-0
                rounded-[16px]
                sm:rounded-[24px]
                md:rounded-[26px]
                lg:rounded-[28px]
                xl:rounded-[36px]
                2xl:rounded-[44px]
                scale-100 sm:scale-110 md:scale-125 lg:scale-150 xl:scale-175 2xl:scale-200
              `}
              style={{
                background:
                  'conic-gradient(from 0deg, #a855f7 0%, #c34cdc 25%, #f43f5e 50%, #ec6e36 75%, #d97706 100%)',
              }}
              variants={glowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }} // Removed delay here
            />
          ) : (
            // Static Box-Shadow Fallback with fade-in and fade-out
            <motion.div
              key="box-shadow"
              className={`
                absolute inset-0
                z-0
                rounded-[16px]
                sm:rounded-[24px]
                md:rounded-[26px]
                lg:rounded-[28px]
                xl:rounded-[36px]
                2xl:rounded-[44px]
                box-shadow-fallback
              `}
              style={{
                boxShadow:
                  '-8px -8px 32px rgba(168, 85, 247, 0.37), ' +
                  '0px 0px 32px rgba(244, 63, 94, 0.37), ' +
                  '8px 8px 32px rgba(217, 119, 6, 0.37)',
              }}
              variants={glowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }} // Ensure duration matches ServiceCard
            />
          ))}
      </AnimatePresence>
      {/* The card */}
      <div
        className={`
          relative flex justify-center items-center
          overflow-hidden
          w-full h-full
          rounded-[16px]
          sm:rounded-[24px]
          md:rounded-[26px]
          lg:rounded-[28px]
          xl:rounded-[36px]
          2xl:rounded-[44px]
          transition-colors duration-500
          bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
          ${isGlowVisible ? 'from-[#1e1e1eBF] to-[#1e1e1eBF]' : ''}
          z-10
        `}
      >
        {/* SVG Image Container */}
        <div className="relative w-4/5 h-4/5">
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            style={{ objectFit: 'contain' }} // Alternatively, use className="object-contain"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
