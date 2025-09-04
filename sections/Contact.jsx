'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { TypingText } from '../components/Effects';
import { fadeIn, staggerContainer } from '../utils/motion';
import Info from '../components/Overview/Info'; // Import the Info component

const Contact = () => {
  const mapRef = useRef(null);
  const enableMap =
    process.env.NODE_ENV === 'production' &&
    Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (enableMap) {
      window.initMap = initMap;
    }
  }, [enableMap]);

  const initMap = () => {
    const shopLocation = { lat: 44.41362120240169, lng: 26.132020598094197 };

    const map = new window.google.maps.Map(mapRef.current, {
      center: shopLocation,
      zoom: 15,
      mapId: 'a7d50c754bc2729c',
    });

    new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: shopLocation,
    });
  };

  const contentContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="contact"
      className={`pt-24 -pb-24 lg:px-8 md:px-16 px-6 relative z-10`}
    >
      {enableMap && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=beta&map_ids=a7d50c754bc2729c&libraries=marker&callback=initMap&loading=async`}
          strategy="afterInteractive"
        />
      )}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto flex flex-col items-center"
      >
        <TypingText title="| Contact" textStyles="text-center" />
        <motion.h2
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="mt-4 font-bold text-3xl lg:text-5xl text-white text-center"
        >
          Suntem aici să te{' '}
          <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            ajutăm
          </span>
        </motion.h2>

        {/* New stagger container for the three main content sections */}
        <motion.div
          variants={contentContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex flex-col items-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mt-6 w-full max-w-[1230px] px-4 text-white text-opacity-75 text-lg text-center mx-auto"
          >
            Fie că ai probleme cu software-ul, hardware-ul sau pur și simplu
            vrei să-ți îmbunătățești performanțele dispozitivului, echipa iPhone
            Doctor te va trata cu seriozitate și profesionalism. Scrie-ne,
            sună-ne sau fă-ne o vizită la clinică și vom găsi soluția potrivită
            pentru tine. Așteptăm cu drag să te ajutăm!
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mt-8 w-full"
          >
            <div className="mx-auto w-full max-w-[1230px] px-4">
              {enableMap ? (
                <div
                  ref={mapRef}
                  className="w-full h-[400px] rounded-[36px] overflow-hidden shadow-lg"
                />
              ) : (
                <div className="w-full h-[400px] rounded-[36px] overflow-hidden bg-neutral-800/50 text-secondary-white flex items-center justify-center">
                  <span className="text-sm opacity-80">Map disabled in development</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Include the Info component here */}
          <Info />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
