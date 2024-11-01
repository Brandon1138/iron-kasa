'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { TypingText } from '../components/Effects';
import { fadeIn, staggerContainer } from '../utils/motion';

const Contact = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    window.initMap = initMap;
  }, []);

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

  const staggerChildrenVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

  const getDirectionsLink = () => {
    const { lat, lng } = { lat: 44.41361458005216, lng: 26.132022068483483 };
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <section
      id="contact"
      className={`pt-24 -pb-24 lg:px-8 md:px-16 px-6 relative z-10`}
    >
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=beta&map_ids=a7d50c754bc2729c&libraries=marker&callback=initMap&loading=async`}
        strategy="afterInteractive"
      />
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
            variants={staggerChildrenVariants}
            className="mt-6 w-full max-w-[1230px] px-4 text-white text-opacity-75 text-lg text-center mx-auto"
          >
            Fie că ai probleme cu software-ul, hardware-ul sau pur și simplu
            vrei să-ți îmbunătățești performanțele dispozitivului, echipa iPhone
            Doctor te va trata cu seriozitate și profesionalism. Scrie-ne,
            sună-ne sau fă-ne o vizită la clinică și vom găsi soluția potrivită
            pentru tine. Așteptăm cu drag să te ajutăm!
          </motion.p>

          <motion.div
            variants={staggerChildrenVariants}
            className="mt-8 w-full"
          >
            <div className="mx-auto w-full max-w-[1230px] px-4">
              <div
                ref={mapRef}
                className="w-full h-[400px] rounded-[36px] overflow-hidden shadow-lg"
              ></div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerChildrenVariants}
            className="mt-8 w-full max-w-[1230px] px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              {/* Left Column - Program Information */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold mb-4">Program</h3>
                <div className="w-full flex flex-row justify-center md:justify-start space-x-8">
                  <ul className="space-y-2 text-center md:text-left">
                    <li className="leading-loose">Luni - Joi</li>
                    <li className="leading-loose">Vineri</li>
                    <li className="leading-loose">Sâmbătă</li>
                    <li className="leading-loose">Duminică</li>
                  </ul>
                  <ul className="space-y-2 text-center md:text-left">
                    <li className="leading-loose">10:00 - 20:00</li>
                    <li className="leading-loose">10:00 - 17:00</li>
                    <li className="leading-loose">Închis</li>
                    <li className="leading-loose">12:00 - 17:00</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Contact Information */}
              <div className="flex flex-col items-center md:items-end">
                <h3 className="text-xl font-bold mb-4">Date de Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-center md:justify-end">
                    <a
                      href={getDirectionsLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <img
                        src="/map.svg"
                        alt="Get Directions"
                        className="mr-2 cursor-pointer w-4 h-4 border-0"
                      />
                      <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate transition-all duration-300 ease-in-out">
                        Str. Știrului nr. 8A, Sector 3
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center justify-center md:justify-end">
                    <a href="tel:0764838860" className="flex items-center">
                      <img
                        src="/phone.svg"
                        alt="Phone"
                        className="mr-2 cursor-pointer w-4 h-4 border-0"
                      />
                      <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate transition-all duration-300 ease-in-out">
                        0764 838 860
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center justify-center md:justify-end">
                    <a href="tel:0784888444" className="flex items-center">
                      <img
                        src="/phone.svg"
                        alt="Phone"
                        className="mr-2 cursor-pointer w-4 h-4 border-0"
                      />
                      <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate transition-all duration-300 ease-in-out">
                        0784 888 444
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center justify-center md:justify-end">
                    <a
                      href="mailto:office@iPhoneDoctor.ro"
                      className="flex items-center"
                    >
                      <img
                        src="/mail.svg"
                        alt="Email"
                        className="mr-2 cursor-pointer w-4 h-4 border-0"
                      />
                      <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate transition-all duration-300 ease-in-out">
                        office@iPhoneDoctor.ro
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
