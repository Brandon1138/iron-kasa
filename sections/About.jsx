// components/About.jsx

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AboutStatic from '../components/AboutStatic';

// Dynamically import AboutDynamic with no SSR
const AboutDynamic = dynamic(() => import('../components/AboutDynamic'), { ssr: false });

const About = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set to true after the component mounts on the client
    setIsClient(true);
  }, []);

  return isClient ? <AboutDynamic /> : <AboutStatic />;
};

export default About;
