// app/layout.js

'use client'; // Make this a client component to use React Context and hooks

import React from 'react';
import { AnimationProvider } from '../context/AnimationContext';
import '../styles/globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </head>
    <body>
      <AnimationProvider>
        {children}
        {/* Portal Root for Modals */}
        <div id="modal-root"></div>
      </AnimationProvider>
    </body>
  </html>
);

export default RootLayout;
