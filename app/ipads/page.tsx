"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles';
import ServiceCard from '../../components/Cards/ServiceCard';
import { getProductsByCategory } from '../../lib/products';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../../utils/motion';
import { mainDisclaimer } from '../../constants';

export default function IpadsPage() {
  const router = useRouter();
  const products = useMemo(() => getProductsByCategory('ipad'), []);

  return (
    <section className={`${styles.paddings} px-6 py-12 relative`}>
      <div className="absolute inset-0 z-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#121212_2px)] bg-[size:20px_20px]" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col items-center relative z-10`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          <h1 className="font-bold text-3xl text-white">Reparații iPad</h1>
          <motion.p
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="mt-6 text-white text-opacity-50 text-[20px]"
          >
            {mainDisclaimer[1]}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 py-8 px-4 gap-[12px] sm:gap-[12px] md:gap-[16px] lg:gap-[22px] xl:gap-[26px] 2xl:gap-[30px] w-full"
        >
          {products.map((product, index) => (
            <motion.div key={product.slug} variants={fadeIn('up', 'tween', index * 0.1, 1)} className="flex justify-center">
              <ServiceCard
                service={product}
                onClick={() => router.push(`/ipads/${product.slug}`)}
                isAnimationComplete
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

