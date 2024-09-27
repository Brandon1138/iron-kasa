// components/CategoryCard.jsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({ imgUrl, title, onSelect, isSelected }) => {
  return (
    <motion.div
      className={`
        relative cursor-pointer group
        w-[100px] h-[100px] rounded-[20px]
        sm:w-[125px] sm:h-[125px] sm:rounded-[24px]
        md:w-[160px] md:h-[160px] md:rounded-[26px]
        lg:w-[195px] lg:h-[195px] lg:rounded-[28px]
        xl:w-[235px] xl:h-[235px] xl:rounded-[36px]
        2xl:w-[270px] 2xl:h-[270px] 2xl:rounded-[44px]
        overflow-visible
        transition-transform duration-300
        ${isSelected ? 'scale-105' : ''}
      `}
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onSelect();
      }}
      aria-label={`Select ${title}`}
    >
      {/* Background glow with rotation and blur on hover */}
      <div
        className={`
          absolute inset-0 transform
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          blur-md sm:blur-md md:blur-lg lg:blur-xl xl:blur-2xl
          animate-spin-slow
          pointer-events-none
          z-0
          rounded-[20px]
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
      ></div>

      {/* The card */}
      <div
        className="
          relative flex justify-center items-center
          overflow-hidden
          w-full h-full
          rounded-[20px]
          sm:rounded-[24px]
          md:rounded-[26px]
          lg:rounded-[28px]
          xl:rounded-[36px]
          2xl:rounded-[44px]
          transition-colors duration-500
          bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
          group-hover:from-[#1e1e1eBF] group-hover:to-[#1e1e1eBF]
          z-10
        "
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
