'use client';

import { motion } from 'framer-motion';
import { socials } from '../constants';

import styles from '../styles';
import { footerVariants } from '../utils/motion';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />

    <div className={`${styles.innerWidth} mx-auto lg:px-12 px-4 flex flex-col gap-8`}>
      {/* Adjusted Flex Container for Heading and Button */}
      <div className="flex flex-col items-center md:flex-row md:justify-between flex-wrap gap-5">
        <h4 className="font-bold lg:text-[64px] md:text-[44px] sm:text-[32px] text-[32px] text-center text-white">
          Ai nevoie de ajutor?
        </h4>
        <button
          type="button"
          className="flex items-center h-fit py-4 px-6 bg-[#25618b] rounded-[32px] gap-[12px]"
        >
          <img src="/chat.svg" alt="chat" className="w-[24px] h-[24px] object-contain" />
          <span className="font-normal text-[16px] text-white">Trimite un mesaj</span>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        {/* Updated Flex Container for Footer Items */}
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between flex-wrap 
                        gap-6 md:gap-4 text-center md:text-left">
          <h4 className="font-bold text-[24px] text-white">iPhoneDoctor</h4>
          <p className="font-normal text-[14px] text-white opacity-50">All rights reserved 2024 - 2025 iPhone Doctor</p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
