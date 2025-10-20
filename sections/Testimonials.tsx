'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { testimonials, type Testimonial } from '../constants';
import TestimonialCard from '../components/TestimonialCard';

interface TestimonialsProps {
  id?: string;
}

export default function Testimonials({ id = 'testimonials' }: TestimonialsProps): JSX.Element {
  const column1: Testimonial[] = [];
  const column2: Testimonial[] = [];
  const column3: Testimonial[] = [];

  testimonials.forEach((testimonial, index) => {
    if (index % 3 === 0) {
      column1.push(testimonial);
    } else if (index % 3 === 1) {
      column2.push(testimonial);
    } else {
      column3.push(testimonial);
    }
  });

  const combinedColumn1 = [...column1, ...column1];
  const combinedColumn2 = [...column2, ...column2];
  const combinedColumn3 = [...column3, ...column3];

  return (
    <section
      className={`${styles.paddings} relative z-10 overflow-hidden bg-cover bg-center`}
      id={id}
      style={{
        height: '100vh',
      }}
    >
      <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(103,46,150,0.3),rgba(255,255,255,0))]" />

      <motion.div
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto relative z-10`}
      >
        <div className="flex flex-col items-center">
          <TypingText title="| Testimoniale" textStyles="text-center" />

          <motion.h2
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="mt-4 font-bold text-3xl lg:text-5xl text-white text-center"
          >
            Ce spun{' '}
            <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              clienții
            </span>{' '}
            noștri
          </motion.h2>

          <div className={`relative pt-4 mt-16 px-10 h-[calc(100vh-200px)] overflow-hidden fadeMask`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ['0%', '-50%'] }}
                transition={{
                  duration: 120,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {combinedColumn1.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col1-${index}-${testimonial.name}`}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ['0%', '-50%'] }}
                transition={{
                  duration: 140,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {combinedColumn2.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col2-${index}-${testimonial.name}`}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ['0%', '-50%'] }}
                transition={{
                  duration: 160,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {combinedColumn3.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col3-${index}-${testimonial.name}`}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
