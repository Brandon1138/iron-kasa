'use client';

import React, { useState, useEffect, useRef, useContext, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { iPhoneServiceDetails } from '../constants';
import { AnimationContext } from '../context/AnimationContext';

const SearchBar = memo(({ isSearchOpen, toggleSearch, setSelectedService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);
  const containerRef = useRef(null);

  const { canAnimate } = useContext(AnimationContext);

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
    toggleSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle keyboard interaction on search results
  const handleResultKeyDown = (e, iphone) => {
    if (e.key === 'Enter') {
      handleResultClick(iphone);
    }
  };

  // Focus on the input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    }
  }, [isSearchOpen]);

  // Handle keyboard navigation within search results
  const handleKeyDown = (e) => {
    if (!resultsRef.current) return;

    const focusableItems = resultsRef.current.querySelectorAll('button');
    if (focusableItems.length === 0) return;

    const currentIndex = Array.from(focusableItems).indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % focusableItems.length;
      focusableItems[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length;
      focusableItems[prevIndex].focus();
    } else if (e.key === 'Escape') {
      toggleSearch(false);
    }
  };

  // Close search bar on clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen
        && containerRef.current
        && !containerRef.current.contains(event.target)
      ) {
        toggleSearch(false);
      }
    };

    const handleScroll = () => {
      if (isSearchOpen) toggleSearch(false);
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSearchOpen, toggleSearch]);

  return (
    <div className="relative flex items-center" ref={containerRef}>
      {/* Search Icon */}
      <motion.button
        onClick={() => toggleSearch(!isSearchOpen)}
        className="w-[24px] h-[24px] object-contain cursor-pointer z-50 focus:outline-none rounded"
        aria-label={isSearchOpen ? 'Close search' : 'Open search'}
        animate={{ opacity: isSearchOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image src="/search.svg" alt="Search Icon" width={24} height={24} />
      </motion.button>

      {/* Search Bar */}
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
              onKeyDown={handleKeyDown}
            />
            {/* Search Results */}
            {searchQuery.length > 0 && (
              <ul
                className="absolute top-full left-0 right-0 bg-primary-black bg-opacity-90 backdrop-blur-md rounded-3xl mt-2 max-h-60 overflow-y-auto hide-scrollbar z-50"
                role="listbox"
                aria-label="Search Results"
                ref={resultsRef}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((iphone, index) => (
                    <li key={index} className="px-4 py-2">
                      <button
                        type="button"
                        onClick={() => handleResultClick(iphone)}
                        onKeyDown={(e) => handleResultKeyDown(e, iphone)}
                        className="w-full text-left hover:bg-neutral-700 cursor-pointer flex items-center space-x-4 focus:outline-none focus:bg-purple-900 rounded-2xl"
                        role="option"
                        aria-selected="false"
                      >
                        <Image
                          src={iphone.imgUrl}
                          alt={iphone.title}
                          width={40}
                          height={40}
                          className="flex-shrink-0 rounded"
                        />
                        <span className="text-white">
                          {iphone.title
                            .split(new RegExp(`(${searchQuery})`, 'gi'))
                            .map((part, i) => (part.toLowerCase() === searchQuery.toLowerCase() ? (
                              <span
                                key={i}
                                className={
                                    canAnimate
                                      ? 'bg-gradient-to-r from-purple-400 to-pink-600 font-bold-animate bg-clip-text text-transparent'
                                      : 'font-bold'
                                  }
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
                  <li
                    className="px-4 py-2 text-white flex items-center space-x-2"
                    aria-hidden="true"
                  >
                    <Image
                      src="/no-results.png"
                      alt="No results found"
                      width={20}
                      height={20}
                      className="flex-shrink-0"
                    />
                    <span>Nu sunt rezultate.</span>
                  </li>
                )}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default SearchBar;
