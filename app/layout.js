// layout.js
import '../styles/globals.css';

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </head>
    <body>
      {children}
      {/* Portal Root for Modals */}
      <div id="modal-root"></div>
    </body>
  </html>
);

export default RootLayout;
