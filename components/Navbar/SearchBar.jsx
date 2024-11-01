// SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { iPhoneServiceDetails } from '../../constants';

const SearchBar = ({ onResultClick, isSearchOpen, setIsSearchOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Toggle the search bar
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
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
    onResultClick(iphone);
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

  // Close the search bar when clicking outside, scrolling, or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen
        && searchContainerRef.current
        && !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleScroll = () => {
      if (isSearchOpen) setIsSearchOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
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
  }, [isSearchOpen]);

  return (
    <div className="relative flex items-center" ref={searchContainerRef}>
      {/* Search Icon */}
      <motion.button
        onClick={handleSearchToggle}
        className="w-[24px] h-[24px] object-contain cursor-pointer z-50 focus:outline-none"
        aria-label="Search"
        animate={{ opacity: isSearchOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image src="/search.svg" alt="search" width={24} height={24} />
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
            />
            {/* Search Results */}
            {searchQuery.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-primary-black bg-opacity-90 backdrop-blur-md rounded-3xl mt-2 max-h-60 overflow-y-auto hide-scrollbar z-50">
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
                          {iphone.title
                            .split(new RegExp(`(${searchQuery})`, 'gi'))
                            .map((part, i) => (part.toLowerCase()
                              === searchQuery.toLowerCase() ? (
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
                  <li
                    className="px-4 py-2 text-white flex items-center space-x-2"
                    aria-hidden="true"
                  >
                    <Image
                      src="/no-results.png"
                      alt="Nu sunt rezultate"
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
};

export default SearchBar;
