'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({ imgUrl, title, onSelect }) => {
  return (
    <motion.div
      className="
        relative cursor-pointer group
        w-[90px] h-[85px] rounded-[12px]
        sm:w-[105px] sm:h-[105px] sm:rounded-[18px]
        md:w-[110px] md:h-[110px] md:rounded-[18px]
        lg:w-[170px] lg:h-[170px] lg:rounded-[28px]
        xl:w-[220px] xl:h-[220px] xl:rounded-[36px]
        2xl:w-[270px] 2xl:h-[270px] 2xl:rounded-[44px]
        overflow-visible
      "
      onClick={onSelect}
      onMouseEnter={onSelect}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background glow with rotation and blur on hover */}
      <div
        className="
          absolute inset-0 transform
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          blur-md sm:blur-md md:blur-lg lg:blur-xl xl:blur-2xl
          animate-spin-slow
          pointer-events-none
          z-0
          rounded-[12px]
          sm:rounded-[18px]
          md:rounded-[18px]
          lg:rounded-[28px]
          xl:rounded-[36px]
          2xl:rounded-[44px]
          scale-100 sm:scale-110 md:scale-125 lg:scale-150 xl:scale-175 2xl:scale-200
        "
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
          rounded-[12px]
          sm:rounded-[18px]
          md:rounded-[18px]
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
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
