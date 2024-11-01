// BrandLogo.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const BrandLogo = ({ isHidden }) => (
  <div
    className={`relative flex-shrink-0 transition-opacity duration-300 ${
      isHidden ? 'opacity-0 lg:opacity-100' : 'opacity-100'
    }`}
    aria-hidden={isHidden ? 'true' : 'false'}
  >
    {/* Glow Effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-[#a855f7] via-[#f43f5e] to-[#d97706] rounded-full filter blur-lg opacity-40"
      aria-hidden="true"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    />
    {/* Logo */}
    <Image src="/logo.svg" alt="iPhoneDoctor Logo" width={150} height={50} />
  </div>
);

export default BrandLogo;
