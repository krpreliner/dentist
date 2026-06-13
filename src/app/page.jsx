import Hero from '../sections/Hero';
import TrustBar from '../sections/TrustBar';
import WhyChooseUs from '../sections/WhyChooseUs';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import MapSection from '../sections/MapSection';
import BookingSection from '../sections/BookingSection';
import FAQ from '../sections/FAQ';
import { fetchJsonDataFromGit } from '../lib/fetchData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const testimonialsData = await fetchJsonDataFromGit('testimonials');
  const testimonials = testimonialsData || [];

  return (
    <main>
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <Services />
      <Testimonials initialReviews={testimonials} />
      <MapSection compact={true} />
      <BookingSection />
    </main>
  );
}
