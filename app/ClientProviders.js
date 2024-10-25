// app/ClientProviders.js

'use client';

import React from 'react';
import { AnimationProvider } from '../context/AnimationContext';

const ClientProviders = ({ children }) => {
  return <AnimationProvider>{children}</AnimationProvider>;
};

export default ClientProviders;
