import React from 'react';
import Image from 'next/image';

const Features = ({ imgUrl, title, subtitle }) => (
  <div className="flex flex-col items-start text-left">
    {/* Icon Container */}
    <div
      className="w-[70px] h-[70px] rounded-[24px] glassmorphism outer-shadow flex items-center justify-center"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
    >
      <Image
        src={imgUrl}
        alt={title}
        width={36}
        height={36}
        className="object-contain"
        priority
      />
    </div>

    {/* Title */}
    <h3 className="mt-[28px] font-bold text-[24px] leading-[30.24px] text-white">
      {title}
    </h3>

    {/* Subtitle */}
    <p className="mt-[28px] font-normal text-[18px] leading-[32.4px] text-secondary-white">
      {subtitle}
    </p>
  </div>
);

export default Features;
