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

  // Define the handleSearch function
  const handleSearch = () => {
    // Implement your search functionality here
    console.log('Search button clicked');
    // For example, navigate to a search page or open a search modal
  };

  // Close the menu when clicking outside of it, scrolling, or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current
        && !menuRef.current.contains(event.target)
        && buttonRef.current
        && !buttonRef.current.contains(event.target)
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
        {/* Search Button */}
        <button
          type="button" // Added type attribute
          onClick={handleSearch} // Defined handler
          className="w-[24px] h-[24px] object-contain cursor-pointer z-60 focus:outline-none"
          aria-label="Search"
        >
          <img src="/search.svg" alt="search" />
        </button>

        <h2 className="font-bold text-[24px] leading-[30px] text-white">
          iPhoneDoctor
        </h2>

        {/* Toggle Menu Button */}
        <button
          type="button" // Added type attribute
          aria-label="Toggle menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          className="w-[24px] h-[24px] object-contain cursor-pointer focus:outline-none z-60"
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
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Menu Content */}
              <motion.div
                className="fixed top-16 right-8 z-50 p-6 rounded-lg w-64 bg-primary-black bg-opacity-90 backdrop-blur-md"
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
                      className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:[-webkit-background-clip:text] hover:font-bold-animate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Acasă
                    </a>
                  </li>
                  {/* Repeat for other menu items */}
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
