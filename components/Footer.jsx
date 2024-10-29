'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component
import { socials } from '../constants';

import styles from '../styles';
import { footerVariants } from '../utils/motion';

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
        <div
          className="flex flex-col items-center justify-center md:flex-row md:justify-between flex-wrap
                        gap-6 md:gap-4 text-center md:text-left"
        >
          {/* Brand Logo with Glow Effect */}
          <div className="relative flex-shrink-0" aria-hidden="true">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#a855f7] via-[#f43f5e] to-[#d97706] rounded-full filter blur-lg opacity-50"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            {/* Logo */}
            <Image src="/logo.svg" alt="Brand Logo" width={150} height={50} />
          </div>

          {/* Optionally, you can remove the below <h4> since it's replaced by the logo */}
          {/* <h4 className="font-bold text-[24px] text-white">iPhoneDoctor</h4> */}

          <p className="font-normal text-[14px] text-white opacity-50">
            All rights reserved 2024 iPhoneDoctor
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                href={social.link}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={social.url}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </a>
            ))}
          </div>

          {/* Optional: Remove or keep based on your design */}
          <div className="footer-gradient" />
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
