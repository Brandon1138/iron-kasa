// sections/Contact.tsx

'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypingText } from '../components';
import styles from '../styles';
import {
  fadeIn,
  staggerContainer,
  fadeIn as fadeInVariant,
} from '../utils/motion'; // Adjust imports as necessary

// Define the type for shop location
interface Location {
  lat: number;
  lng: number;
}

interface ContactProps {
  id?: string;
}

const Contact: React.FC<ContactProps> = ({ id = 'contact' }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isMapInitialized = useRef(false); // Initialization flag
  const [hasLoadedMap, setHasLoadedMap] = useState(false);

  // Initialize the map
  const initMap = useCallback((): void => {
    // Prevent multiple initializations
    if (isMapInitialized.current) {
      return;
    }
    isMapInitialized.current = true;

    // Ensure google.maps is available
    if (!window.google || !window.google.maps) {
      console.error('Google Maps is not loaded.');
      return;
    }

    const shopLocation: Location = {
      lat: 44.41362120240169,
      lng: 26.132020598094197,
    };

    // Create the map
    const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
      center: shopLocation,
      zoom: 15,
      mapId: 'a7d50c754bc2729c', // Replace with your actual Map ID
      // Remove 'styles' to avoid conflict with 'mapId'
      // styles: [ ... ]
    });

    // Create an AdvancedMarkerElement if available
    let marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker;

    if (
      window.google.maps.marker &&
      typeof window.google.maps.marker.AdvancedMarkerElement === 'function'
    ) {
      marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: shopLocation,
        title: 'iPhone Doctor',
        // Optional: Add custom content or other options here
      });
    } else {
      console.error('AdvancedMarkerElement is not available.');
      // Fallback to standard Marker
      marker = new window.google.maps.Marker({
        map: map,
        position: shopLocation,
        title: 'iPhone Doctor',
      });
    }
  }, []);

  // Function to generate Google Maps directions link
  const getDirectionsLink = (): string => {
    const { lat, lng }: Location = {
      lat: 44.41361458005216,
      lng: 26.132022068483483,
    };
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setHasLoadedMap(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedMap || isMapInitialized.current) {
      return;
    }

    // Ensure API key is defined
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not defined.');
      return;
    }

    let isMounted = true;

    const loadMap = async () => {
      try {
        const { Loader } = await import('@googlemaps/js-api-loader');

        const loader = new Loader({
          apiKey: apiKey as string,
          version: 'weekly',
          libraries: ['marker'], // Only load the 'marker' library
        });

        await loader.importLibrary('marker');

        if (isMounted) {
          initMap();
        }
      } catch (e) {
        console.error('Error loading Google Maps API', e);
      }
    };

    loadMap();

    return () => {
      isMounted = false;
    };
  }, [hasLoadedMap, initMap]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`pt-24 -pb-24 lg:px-8 md:px-16 px-6 relative z-10`}
    >
      <motion.div
        variants={staggerContainer(0.1, 0.2)} // Call the function with appropriate arguments
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto flex flex-col items-center"
      >
        <TypingText title="| Contact" textStyles="text-center" />
        <motion.h2
          variants={fadeIn('up', 'tween', 0.2, 1)} // Call the function with appropriate arguments
          className="mt-4 font-bold text-3xl lg:text-5xl text-white text-center"
        >
          Suntem aici să te{' '}
          <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            ajutăm
          </span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={fadeIn('up', 'tween', 0.4, 1)} // Call the function with appropriate arguments
          className="mt-6 w-full max-w-[1230px] px-4 text-white text-opacity-75 text-lg text-center mx-auto"
        >
          Fie că ai probleme cu software-ul, hardware-ul sau pur și simplu vrei
          să-ți îmbunătățești performanțele dispozitivului, echipa iPhone Doctor
          te va trata cu seriozitate și profesionalism. Scrie-ne, sună-ne sau
          fă-ne o vizită la clinică și vom găsi soluția potrivită pentru tine.
          Așteptăm cu drag să te ajutăm!
        </motion.p>

        {/* Map Section */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)} // Call the function with appropriate arguments
          className="mt-8 w-full"
        >
          {/* Map container with max width and padding */}
          <div className="mx-auto w-full max-w-[1230px] px-4">
            <div
              ref={mapRef}
              className="w-full h-[400px] rounded-[36px] overflow-hidden shadow-lg"
            ></div>
          </div>
        </motion.div>

        {/* Contact and Program Information */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1)} // Call the function with appropriate arguments
          className="mt-8 w-full max-w-[1230px] px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            {/* Left Column - Program Information */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-4">Program</h3>
              {/* Subcolumns for Days and Hours */}
              <div className="w-full flex flex-row justify-center md:justify-start space-x-8">
                {/* Days Column */}
                <ul className="space-y-2 text-center md:text-left">
                  <li className="leading-loose">Luni - Joi</li>
                  <li className="leading-loose">Vineri</li>
                  <li className="leading-loose">Sâmbătă</li>
                  <li className="leading-loose">Duminică</li>
                </ul>
                {/* Hours Column */}
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
                  {/* Address with Clickable Icon */}
                  <a
                    href={getDirectionsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                    aria-label="Get Directions to iPhone Doctor"
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
    </section>
  );
};

export default Contact;
