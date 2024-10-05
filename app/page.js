// page.js
import { Footer, Navbar } from '../components';
import { About, Services, Hero, Contact, Transport, Testimonials } from '../sections';

const Page = () => (
  <div className="relative bg-primary-black overflow-hidden">
    <Navbar />
    <Hero />
    <div className="relative">
      <About id="about" />
      <Services id="services" />
    </div>
    <div className="relative">
      <Transport id="transport" />
      <Testimonials id="testimonials" />
      <Contact id="contact" />
    </div>
    <Footer />
  </div>
);

export default Page;
