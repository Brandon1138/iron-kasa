// sections/Location.jsx

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { TypingText } from '../components';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const Location = () => {
  const mapRef = useRef(null);

  const initMap = () => {
    const shopLocation = { lat: 44.41361458005216, lng: 26.132022068483483 }; // Your shop's latitude and longitude

    const map = new window.google.maps.Map(mapRef.current, {
      center: shopLocation, // Center the map on the shop location
      zoom: 15,
      styles: [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#232937"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e3282e"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#232937"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ],
    });

    new window.google.maps.Marker({
      position: shopLocation, // Place the marker at the shop location
      map: map,
    });
  };

  return (
    <section className={`${styles.paddings} relative z-10`} id="location">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="lazyOnload"
        onLoad={initMap}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto flex flex-col items-center"
      >
        <TypingText title="| Locație" textStyles="text-center" />
        <motion.h2
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-4 font-bold text-3xl lg:text-5xl text-white text-center"
        >
          Ne găsești aici
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="mt-4 text-white text-opacity-75 text-lg text-center px-4"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className="mt-8 w-full"
        >
          {/* Map container with max width and padding */}
          <div className="mx-auto w-full max-w-[1250px] px-4">
            <div
              ref={mapRef}
              className="w-full h-[400px] rounded-[36px] overflow-hidden shadow-lg"
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Location;
