import MapSection from '../../sections/MapSection';
import BookingSection from '../../sections/BookingSection';
import FAQ from '../../sections/FAQ';
import faqsData from '../../data/faqs.json';

export const metadata = {
  title: 'Contact Us | Radiance Dentistry',
  description: 'Get in touch with Radiance Dentistry to book an appointment or ask any questions.',
};

export default function ContactPage() {
  const faqs = faqsData || [];
  
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Contact Us</h1>
      </div>
      
      <MapSection compact={false} />

      <BookingSection />
      <FAQ initialFaqs={faqs} />
    </main>
  );
}
