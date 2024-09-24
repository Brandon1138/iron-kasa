'use client';

import { TypingText, TitleText } from "../components";
import { motion } from "framer-motion";
import styles from '../styles';
import { staggerContainer } from "../utils/motion";

const Services = () => (
  <section className={`{styles.paddings} px-[7.5vw]`}
  id="services">
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{once: false, amount: 0.25}}
      className={`${styles.innerWidth} mx-auto flex flex-col px-6`}
    >
      <TypingText title="| Servicii" textStyles="text-center" />
      <TitleText title={<>Alege dispozitivul pe care vrei sa îl repari</>} textStyles="text-center" />
    </motion.div>
    About services
  </section>
);

export default Services;
