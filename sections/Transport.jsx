// sections/Transport.jsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TypingText } from '../components';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const Transport = () => (
  <section className={`${styles.paddings} relative z-10`} id="transport">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column (for lg screens) */}
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className="hidden lg:flex justify-center"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/van.png"
            alt="Transport Van"
            width={568}
            height={568}
            objectFit="contain"
            className="rounded-[36px] glassmorphism-hover outer-shadow transition-shadow duration-300"
          />
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col items-center lg:items-start">
          <TypingText title="| Transport" textStyles="text-center lg:text-left" />
          <motion.h2
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="mt-4 font-bold text-3xl lg:text-5xl text-white text-center lg:text-left"
          >
            Nu poți să-l aduci? Îl luăm noi!
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 'tween', 0.4, 1)}
            className="mt-4 text-white text-opacity-75 text-lg text-center lg:text-left"
          >
            iPhone Doctor îți asigură transportul dispozitivului atât către
            service cât şi înapoi către tine. Serviciu disponibil in Sectorul 3
            si zone învecinate.
          </motion.p>
        </div>

        {/* Transport Image for md and below */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.5, 1)}
          className="flex lg:hidden w-full justify-center px-6 mt-8"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/van.png"
            alt="Transport Van"
            width={568} // Use the same width for consistency
            height={568} // Adjust height as needed
            objectFit="contain"
            className="rounded-[36px] glassmorphism-hover transition-shadow duration-300 w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default Transport;
