// Footer.jsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { socials } from '../../constants'; // Adjust the path if necessary

import styles from '../../styles';
import { footerVariants } from '../../utils/motion';
import BrandLogo from '../common/BrandLogo'; // Import BrandLogo from common folder
import Socials from './Socials'; // Import Socials component

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative bg-primary-black bg-opacity-50 backdrop-blur-md`}
    aria-label="Footer"
  >
    <div
      className={`${styles.innerWidth} mx-auto lg:px-12 px-4 flex flex-col gap-8`}
    >
      {/* Adjusted Flex Container for Heading and Button */}
      <div className="flex flex-col items-center md:flex-row md:justify-between flex-wrap gap-5">
        <h4 className="font-bold lg:text-[58px] md:text-[38px] sm:text-[32px] text-[32px] text-center text-white ">
          Te așteptăm la{' '}
          <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            clinică
          </span>
        </h4>
        <motion.button
          type="button"
          className="flex items-center h-fit py-4 px-6 bg-[#d97706] rounded-[32px] gap-[12px] hover:bg-[#a95c04] glassmorphism-hover transition-colors duration-300"
          whileHover={{ scale: 1.02 }} // Optional: Maintain hover effect
          whileTap={{ scale: 0.98 }} // Optional: Add tap effect for better UX
        >
          <Image
            src="/chat.svg"
            alt="chat"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-normal text-[16px] text-white">
            Trimite un mesaj
          </span>
        </motion.button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        {/* Updated Flex Container for Footer Items */}
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between flex-wrap gap-6 md:gap-4 text-center md:text-left">
          {/* Brand Logo Component */}
          <BrandLogo />

          <p className="font-normal text-[14px] text-white opacity-50">
            All rights reserved 2024 iPhoneDoctor
          </p>

          {/* Socials Component */}
          <Socials socials={socials} />

          {/* Optional: Footer Gradient or Additional Styling */}
          <div className="footer-gradient" />
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
