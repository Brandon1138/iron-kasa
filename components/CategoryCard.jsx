// components/CategoryCard.jsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({
  id,
  imgUrl,
  title,
  onSelect,
  isSelected,
  hoveredCategoryId,
  setHoveredCategoryId,
}) => {
  const isHovered = hoveredCategoryId === id;
  const isAnotherCardHovered = hoveredCategoryId !== null && hoveredCategoryId !== id;

  return (
    <motion.div
      className={`
        relative cursor-pointer
        w-[70px] h-[70px] rounded-[16px]
        sm:w-[110px] sm:h-[110px] sm:rounded-[24px]
        md:w-[140px] md:h-[140px] md:rounded-[26px]
        lg:w-[190px] lg:h-[190px] lg:rounded-[28px]
        xl:w-[235px] xl:h-[235px] xl:rounded-[36px]
        2xl:w-[270px] 2xl:h-[270px] 2xl:rounded-[44px]
        overflow-visible
        transition-transform duration-300
        ${
          (isSelected && !isAnotherCardHovered) || isHovered
            ? 'scale-105'
            : ''
        }
        outer-shadow
        glassmorphism
        flex-shrink-0  // **Added Class**
      `}
      onClick={onSelect}
      onMouseEnter={() => setHoveredCategoryId(id)}
      onMouseLeave={() => setHoveredCategoryId(null)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onSelect();
      }}
      aria-label={`Select ${title}`}
    >
      {/* Background glow with rotation and blur */}
      <div
        className={`
          absolute inset-0 transform
          ${
            (isSelected && !isAnotherCardHovered) || isHovered
              ? 'opacity-100'
              : 'opacity-0'
          }
          transition-opacity duration-500
          blur-md sm:blur-md md:blur-lg lg:blur-xl xl:blur-2xl
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
            'conic-gradient(from 0deg, #DD7DFF 0%, #E1CD86 25%, #8BCB92 50%, #71C2EF 75%, #DD7DFF 100%)',
        }}
      />

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
          ${
            (isSelected && !isAnotherCardHovered) || isHovered
              ? 'from-[#1e1e1eBF] to-[#1e1e1eBF]'
              : ''
          }
          z-10
        `}
      >
        {/* SVG Image Container */}
        <div className="relative w-4/5 h-4/5">
          <Image
            src={imgUrl}
            alt={title}
            layout="fill"
            objectFit="contain"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
