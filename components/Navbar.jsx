// Navbar.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close the menu when clicking outside of it, scrolling, or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="show" 
      className={`${styles.xPaddings} py-8 fixed top-0 left-0 right-0 z-50 bg-primary-black bg-opacity-90 backdrop-blur-md`}
      aria-label="Main Navigation"
    >
      <div className="absolute w-[50%] inset-0 gradient-01 opacity-50" />
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 items-center`}>
        <img
          src="/search.svg"
          alt="search"
          className="w-[24px] h-[24px] object-contain cursor-pointer z-60" // Added z-60
          role="button"
          aria-label="Search"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // Implement search functionality or navigation
            }
          }}
        />
        <h2 className="font-bold text-[24px] leading-[30px] text-white">
          iPhoneDoctor
        </h2>
        <button
          aria-label="Toggle menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          className="w-[24px] h-[24px] object-contain cursor-pointer focus:outline-none z-60" // Added z-60
          onClick={toggleMenu}
          ref={buttonRef}
        >
          <img src="/menu.svg" alt="menu" />
        </button>

        {/* Menu Modal */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop with blur */}
              <motion.div
                className="fixed inset-0 z-40" // Added classes here if you want the backdrop to have the styles
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)} // Changed to close directly
                aria-hidden="true"
              />

              {/* Menu Content */}
              <motion.div
                className="fixed top-16 right-8 z-50 p-6 rounded-lg w-64 bg-primary-black bg-opacity-90 backdrop-blur-md" // Added bg-primary-black bg-opacity-90 backdrop-blur-md
                role="dialog"
                aria-modal="true"
                aria-labelledby="menu-heading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                ref={menuRef}
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating to backdrop
              >
                <h2 id="menu-heading" className="sr-only">
                  Navigation Menu
                </h2>
                <ul className="flex flex-col space-y-4">
                  <li>
                    <a
                      href="#home"
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#transport"
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Transport
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
