// layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'iPhone Doctor',
  description:
    'iPhoneDoctor ofer�� reparaE>ii rapide ETi profesionale pentru iPhone, iPad, MacBook ETi iMac Arn BucureETti. Servicii hardware ETi software cu garanE>ie, realizate de specialiETti Apple. Contacteaz��-ne acum pentru o diagnosticare gratuit��!',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

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
      {children}
      {/* Portal Root for Modals */}
      <div id="modal-root"></div>
    </body>
  </html>
);

export default RootLayout;
