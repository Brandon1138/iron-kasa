'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';

interface TypingTextProps {
  title: string;
  textStyles?: string;
}

interface TitleTextProps {
  title: ReactNode;
  textStyles?: string;
}

export const TypingText = ({ title, textStyles = '' }: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-secondary-white text-opacity-50 ${textStyles}`.trim()}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles = '' }: TitleTextProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] sm:text-[32px] text-[32px]  text-white ${textStyles}`.trim()}
  >
    {title}
  </motion.h2>
);
