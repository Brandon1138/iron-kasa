'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { iPhoneServiceDetails } from '../constants';
import ServiceModal from './ServiceModal';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Toggle the search bar
  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    setSearchQuery('');
    setSearchResults([]);
    if (!isSearchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    const results = iPhoneServiceDetails.filter((iphone) => iphone.title.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(results);
  };

  // Handle clicking on a search result
  const handleResultClick = (iphone) => {
    setSelectedService(iphone);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle keyboard interaction on search results
  const handleResultKeyDown = (e, iphone) => {
    if (e.key === 'Enter') {
      handleResultClick(iphone);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setSelectedService(null);
  };

  // Close the menu and search bar when clicking outside, scrolling, or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Menu if clicking outside
      if (
        isMenuOpen
        && menuRef.current
        && !menuRef.current.contains(event.target)
        && buttonRef.current
        && !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      // Close Search Bar if clicking outside
      if (
        isSearchOpen
        && searchContainerRef.current
        && !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
      if (isSearchOpen) setIsSearchOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
        if (selectedService) setSelectedService(null);
      }
    };

    if (isMenuOpen || isSearchOpen || selectedService) {
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
  }, [isMenuOpen, isSearchOpen, selectedService]);

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="show"
        className={`${styles.xPaddings} py-8 fixed top-0 left-0 right-0 z-50 bg-primary-black bg-opacity-50 backdrop-blur-md`}
        aria-label="Main Navigation"
      >
        <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 items-center`}>
          {/* Search Container */}
          <div className="relative flex items-center" ref={searchContainerRef}>
            {/* Always render the search icon */}
            <motion.button
              onClick={handleSearchToggle}
              className="w-[24px] h-[24px] object-contain cursor-pointer z-50 focus:outline-none"
              aria-label="Search"
              animate={{ opacity: isSearchOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image src="/search.svg" alt="search" width={24} height={24} />
            </motion.button>

            {/* Render the search bar when open */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  key="search-bar"
                  initial={{ width: '0px', opacity: 0 }}
                  animate={{ width: '300px', opacity: 1 }}
                  exit={{ width: '0px', opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary-black bg-opacity-90 backdrop-blur-md rounded-full flex items-center px-4 z-60"
                >
                  <motion.input
                    type="text"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Caută dispozitiv..."
                    initial={{ width: '0px' }}
                    animate={{ width: '100%' }}
                    exit={{ width: '0px' }}
                    transition={{ duration: 0.3 }}
                    className="w-full px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none"
                    aria-label="Search iPhones"
                  />
                  {/* Search Results or No Results Message */}
                  {searchQuery.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 bg-primary-black bg-opacity-90 backdrop-blur-md rounded-2xl mt-2 max-h-60 overflow-y-auto hide-scrollbar z-50">
                      {searchResults.length > 0 ? (
                        searchResults.map((iphone, index) => (
                          <li key={index} className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleResultClick(iphone)}
                              onKeyDown={(e) => handleResultKeyDown(e, iphone)}
                              className="w-full text-left hover:bg-neutral-700 cursor-pointer flex items-center space-x-4 focus:outline-none focus:bg-purple-900 rounded-2xl"
                            >
                              <Image
                                src={iphone.imgUrl}
                                alt={iphone.title}
                                width={40}
                                height={40}
                                className="flex-shrink-0 rounded"
                              />
                              <span className="text-white">
                                {iphone.title.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => (part.toLowerCase() === searchQuery.toLowerCase() ? (
                                  <span
                                    key={i}
                                    className="bg-gradient-to-r font-bold-animate bg-clip-text text-transparent"
                                  >
                                    {part}
                                  </span>
                                ) : (
                                  part
                                )))}
                              </span>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-white flex items-center space-x-2" aria-hidden="true">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 001.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414L10.414 12l1.293-1.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Nu sunt rezultate.</span>
                        </li>
                      )}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Brand Title */}
          <h2
            className={`font-bold text-[24px] leading-[30px] text-white transition-opacity duration-300 ${
              isSearchOpen ? 'opacity-0 lg:opacity-100' : 'opacity-100'
            }`}
            aria-hidden={isSearchOpen ? 'true' : 'false'}
          >
            iPhoneDoctor
          </h2>

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
                  className="fixed top-6 right-6 z-50 p-6 rounded-2xl w-64 bg-primary-black bg-opacity-90 backdrop-blur-md"
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
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Acasă
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Despre noi
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Servicii
                      </a>
                    </li>
                    <li>
                      <a
                        href="#transport"
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Transport
                      </a>
                    </li>
                    <li>
                      <a
                        href="#testimonials"
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Testimoniale
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate"
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
        </div>
      </motion.nav>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && <ServiceModal service={selectedService} onClose={handleModalClose} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
