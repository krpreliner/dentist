import Hero from '../sections/Hero';
import TrustBar from '../sections/TrustBar';
import WhyChooseUs from '../sections/WhyChooseUs';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import MapSection from '../sections/MapSection';
import BookingSection from '../sections/BookingSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <MapSection compact={true} />
      <BookingSection />
    </main>
  );
}
