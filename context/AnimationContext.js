// context/AnimationContext.js

import React, { createContext, useState, useEffect } from 'react';
import { detectFrameRate, getStoredFrameRate } from '../utils/frameRateDetection';

export const AnimationContext = createContext(false);

export const AnimationProvider = ({ children }) => {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const storedCanAnimate = getStoredFrameRate();
    if (storedCanAnimate !== null) {
      setCanAnimate(storedCanAnimate);
    } else {
      detectFrameRate().then((result) => {
        setCanAnimate(result);
      });
    }
  }, []);

  return (
    <AnimationContext.Provider value={canAnimate}>
      {children}
    </AnimationContext.Provider>
  );
};
