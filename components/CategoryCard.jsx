// components/CategoryCard.jsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({
  imgUrl,
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background glow with rotation and blur on hover */}
      <div
        className="
          absolute inset-0 transform scale-125 opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          blur-3xl
          animate-spin-slow
          pointer-events-none
          z-0
        "
        style={{
          background:
            'conic-gradient(from 0deg, #DD7DFF 0%, #E1CD86 25%, #8BCB92 50%, #71C2EF 75%, #DD7DFF 100%)',
        }}
      ></div>

      {/* The card */}
      <div
        className="
          relative flex justify-center items-center overflow-hidden
          lg:w-[270px] lg:h-[270px] lg:rounded-[44px]
          md:w-[150px] md:h-[150px] md:rounded-[24px]
          sm:w-[84px] sm:h-[84px] sm:rounded-[14px]
          transition-colors duration-500
          bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
          group-hover:from-[#1e1e1eBF] group-hover:to-[#1e1e1eBF]
          z-10
        "
      >
        {/* SVG Image Container */}
        <div
          className="
            relative w-4/5 h-4/5
          "
        >
          <Image
            src={imgUrl}
            alt={title}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
