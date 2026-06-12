import Hero from '../sections/Hero';
import TrustBar from '../sections/TrustBar';
import WhyChooseUs from '../sections/WhyChooseUs';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import MapSection from '../sections/MapSection';
import BookingSection from '../sections/BookingSection';
import { getJsonData } from '../lib/data';

export default function Home() {
  const testimonialsData = getJsonData('testimonials') || [];

  return (
    <main>
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <Services />
      <Testimonials initialReviews={testimonialsData} />
      <MapSection compact={true} />
      <BookingSection />
    </main>
  );
}
