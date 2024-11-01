// Menu.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Menu = ({
  isMenuOpen,
  toggleMenu,
  setIsMenuOpen,
  menuRef,
  buttonRef,
}) => (
  <>
    {/* Toggle Menu Button */}
    <button
      type="button"
      aria-label="Toggle menu"
      aria-haspopup="true"
      aria-expanded={isMenuOpen}
      className="w-[24px] h-[24px] object-contain cursor-pointer focus:outline-none z-60"
      onClick={toggleMenu}
      ref={buttonRef}
    >
      <Image src="/menu.svg" alt="menu" width={24} height={24} />
    </button>

    {/* Menu Modal */}
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu Content */}
          <motion.div
            className="fixed top-6 right-6 z-50 p-6 rounded-3xl w-64 bg-primary-black bg-opacity-90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="menu-heading" className="sr-only">
              Navigation Menu
            </h2>
            <ul className="flex flex-col space-y-4">
              {/* Menu Items */}
              <li>
                <a
                  href="#home"
                  className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:font-bold-animate"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acasă
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:font-bold-animate"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Despre noi
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:font-bold-animate"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicii
                </a>
              </li>
              <li>
                <a
                  href="#transport"
                  className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:font-bold-animate"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Transport
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:font-bold-animate"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimoniale
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:font-bold-animate"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
              {/* Add more menu items as needed */}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);

export default Menu;
