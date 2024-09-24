'use client';

import { TypingText, TitleText } from "../components";
import { motion } from "framer-motion";
import styles from '../styles';
import { staggerContainer } from "../utils/motion";
import { fadeIn } from "../utils/motion";

const Services = () => (
  <section className={`${styles.paddings} px-[7.5vw] py-12`} id="services">
    <div className={`${styles.innerWidth} mx-auto flex flex-col px-6`}>
      
      {/* Wrap TypingText with motion.div to apply staggerContainer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto flex flex-col px-6" // Adjust classes as needed
      >
        <TypingText title="| Servicii" textStyles="text-center" />
      </motion.div>
      
      {/* Apply fadeIn variant to TitleText */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="text-center mt-4" // Added margin-top for spacing
      >
        <TitleText title="Alege dispozitivul pe care vrei să îl repari" />
      </motion.div>
      
    </div>
  </section>
);


export default Services;
