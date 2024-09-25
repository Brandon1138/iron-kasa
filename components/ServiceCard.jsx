// components/ServiceCard.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const ServiceCard = ({ imgUrl, title, onClick }) => {
  return (
    <motion.div
      className="
        relative cursor-pointer group
        w-[170px] h-[170px]        /* Small screens: sm */
        md:w-[203px] md:h-[203px]  /* Medium screens: md */
        lg:w-[270px] lg:h-[270px]  /* Large screens: lg */
        rounded-[20px]              /* Default border-radius */
        sm:rounded-[24px]           /* Small screens: sm */
        md:rounded-[26px]           /* Medium screens: md */
        lg:rounded-[44px]           /* Large screens: lg */
        overflow-hidden
        bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
        group-hover:bg-[rgba(30,30,30,0.75)]
        transition-colors duration-500
        flex flex-col justify-center items-center
        p-4
      "
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onClick(); }}
      aria-label={`Open details for ${title}`}
    >
      {/* Card Content */}
      <div className="relative w-3/5 h-3/5 mb-4">
        <Image
          src={imgUrl}
          alt={title}
          layout="fill"
          objectFit="contain"
          priority={false}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>
      <h3 className="text-center text-lg font-regular text-white group-hover:text-white">
        {title}
      </h3>
    </motion.div>
  );
};

export default ServiceCard;
