// page.js
import { Footer, Navbar } from '../components';
import { About, Services, Hero, Contact, Transport, Testimonials } from '../sections';

const Page = () => (
  <div className="relative bg-primary-black overflow-hidden">
    {/* Invisible Anchor */}
    <div id="home" className="absolute top-0 left-0 w-full h-0" />

    <Navbar />
    <Hero />
    <div className="relative">
      <About id="about" />
      <div className="gradient-02 z-0 opacity-50" />
      <Services id="services" />
    </div>
    <div className="relative">
      <Transport id="transport" />
      <div className="gradient-04 z-0" />
      <Testimonials id="testimonials" />
      <Contact id="contact" />
    </div>
    <Footer />
  </div>
);

export default Page;
