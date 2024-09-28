import { Footer, Navbar } from '../components';
import { About, Services, Hero, Location, Transport, Testimonials } from '../sections';

const Page = () => (
  <div className="relative bg-primary-black overflow-hidden before:absolute before:inset-0 before:bg-overlay-black before:opacity-75 before:content-['']">
    <Navbar />
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-02 z-0 opacity-50" />
      <Services />
    </div>
    <div className="relative">
      <Transport />
      <div className="gradient-04 z-0" />
      <Testimonials />
    </div>
    <Footer />
  </div>
);

export default Page;
