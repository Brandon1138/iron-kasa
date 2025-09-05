// page.js

"use client";

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
const Page = () => {

  return (
    <div className="relative bg-primary-black overflow-hidden">
      <Navbar />
      <Hero />
      <div className="relative bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#121212_2px)] bg-[size:20px_20px]">
        <About id="about" />
        <Services id="services" />
      </div>
      <div className="relative">
        <Transport id="transport" />
        <Testimonials id="testimonials" />
        <Contact id="contact" />
      </div>
      <Footer />

      {/* Modals removed in favor of routed pages */}
    </div>
  );
};

export default Page;
