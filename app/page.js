import { Footer, Navbar } from '../components';
import { About, Services, Hero, Transport, Testimonials } from '../sections';

const Page = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Transport />
    <Testimonials />
    <Footer />
  </div>
);

export default Page;
