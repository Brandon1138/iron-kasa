// components/BrandLogo.tsx

'use client';

import React, { useContext, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimationContext } from '../context/AnimationContext';

interface BrandLogoProps {
  isSearchOpen: boolean;
}

const BrandLogo = memo(({ isSearchOpen }: BrandLogoProps) => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      'AnimationContext must be used within an AnimationProvider'
    );
  }
  const { canAnimate } = context;

  return (
    <div
      className={`relative flex-shrink-0 transition-opacity duration-300 ${
        isSearchOpen ? 'opacity-0 lg:opacity-100' : 'opacity-100'
      }`}
      aria-hidden={isSearchOpen ? 'true' : 'false'}
    >
      {/* Glow Effect */}
      {canAnimate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#a855f7] via-[#f43f5e] to-[#d97706] rounded-full filter blur-lg opacity-40"
          aria-hidden="true"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />
      )}
      {/* Logo */}
      {/* Updated to use fill prop and sizes */}
      <div
        className="relative w-[150px] h-[50px]" // Set width and height here
      >
        <Image
          src="/logo.svg"
          alt="iPhoneDoctor Logo"
          fill // Use fill prop
          sizes="150px" // Add sizes prop
          style={{ objectFit: 'contain' }} // Maintain aspect ratio
          priority
        />
      </div>
    </div>
  );
});

BrandLogo.displayName = 'Brand Logo';

export default BrandLogo;
