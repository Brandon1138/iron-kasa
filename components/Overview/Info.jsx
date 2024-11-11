'use client';

import { motion } from 'framer-motion';

const Info = () => {
  const staggerChildrenVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getDirectionsLink = () => {
    const { lat, lng } = { lat: 44.41361458005216, lng: 26.132022068483483 };
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
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
                <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 ease-in-out hover:font-bold-animate">
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
                <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 ease-in-out hover:font-bold-animate">
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
                <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 ease-in-out hover:font-bold-animate">
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
                <span className="text-right font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 ease-in-out hover:font-bold-animate">
                  office@iPhoneDoctor.ro
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
