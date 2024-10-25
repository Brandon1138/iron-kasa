// app/layout.js

import React from 'react';
import '../styles/globals.css';
import ClientProviders from './ClientProviders'; // New client component

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
    </head>
    <body>
      <ClientProviders>
        {children}
        {/* Portal Root for Modals */}
        <div id="modal-root"></div>
      </ClientProviders>
    </body>
  </html>
);

export default RootLayout;
