// page.js

'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import {
  About,
  Services,
  Hero,
  Contact,
  Transport,
  Testimonials,
} from '../sections';
import ServiceModal from '../components/Modal/ServiceModal'; // Adjusted import path

const Page = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="relative bg-primary-black overflow-hidden">
      <Navbar onServiceSelect={handleServiceSelect} />
      <Hero />
      <div className="relative">
        <About id="about" />
        <Services id="services" onServiceSelect={handleServiceSelect} />
      </div>
      <div className="relative">
        <Transport id="transport" />
        <Testimonials id="testimonials" />
        <Contact id="contact" />
      </div>
      <Footer />

      {/* Render ServiceModal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Page;
