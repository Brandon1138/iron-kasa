// page.js

'use client';

import { useState } from 'react';
import { Footer, Navbar } from '../components';
import { About, Services, Hero, Contact, Transport, Testimonials } from '../sections';
import ServiceModal from '../components/ServiceModal';

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
      <Navbar />
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
      <ServiceModal service={selectedService} onClose={handleCloseModal} />
    </div>
  );
};

export default Page;
