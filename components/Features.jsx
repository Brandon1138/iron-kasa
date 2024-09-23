// Features.jsx

import React from 'react';

const Features = ({ imgUrl, title, subtitle }) => (
  <div className="flex flex-col items-start text-left">
    {/* Icon Container */}
    <div
      className="w-[70px] h-[70px] rounded-[24px] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
    >
      <img src={imgUrl} alt={title} className="w-[36px] h-[36px] object-contain" />
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
