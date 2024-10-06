'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';
import Features from '../components/Features';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { features } from '../constants';

const About = () => (
  <section id="about" className={`${styles.paddings} relative z-10`}>
    {/* Updated Background Div */}
    <div
      className="absolute inset-0 z-[-2] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(102,51,153,0.3),rgba(255,255,255,0))]"
    ></div>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full flex flex-col px-6 lg:max-w-[85vw] mx-auto"
    >
      {/* Section Title */}
      <TypingText title="| Despre noi" textStyles="text-left" />

      {/* Section Header */}
      <motion.h2
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-bold lg:text-[64px] md:text-[48px] sm:text-[32px] text-[32px] text-left text-white"
      >
        Rezolvăm orice problemă
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
