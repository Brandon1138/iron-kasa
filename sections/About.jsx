'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components/Effects';
import Features from '../components/Overview/Features';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { features } from '../constants';

const About = () => (
  <section id="about" className={`${styles.paddings} relative z-10`}>
    {/* Existing Background Div */}
    <div className="absolute inset-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#121212_2px)] bg-[size:20px_20px]"></div>
    <div className="absolute inset-0 z-[-1] h-full w-full bg-gradient-to-b from-stone-500 to-neutral-950 opacity-30 " />

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full flex flex-col px-6 lg:max-w-[85vw] mx-auto pb-2"
    >
      {/* Section Title */}
      <TypingText title="| Despre noi" textStyles="text-left" />

      {/* Section Header */}
      <motion.h2
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-bold lg:text-[64px] md:text-[48px] sm:text-[32px] text-[32px] text-left text-white"
      >
        Rezolvăm{' '}
        <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
          orice
        </span>{' '}
        problemă
      </motion.h2>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeIn('up', 'tween', 0.2 * index, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <Features
              imgUrl={feature.imgUrl}
              title={feature.title}
              subtitle={feature.subtitle}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default About;
