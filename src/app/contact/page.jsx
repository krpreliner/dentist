import MapSection from '../../sections/MapSection';
import BookingSection from '../../sections/BookingSection';
import FAQ from '../../sections/FAQ';
import { getJsonData } from '../../lib/data';

export const metadata = {
  title: 'Contact Radiance Dentistry | Book an Appointment in Surat',
  description: 'Contact Dr. Ruchi Jain at Radiance Dentistry, Vesu, Surat. Book an appointment for root canals, implants, and smile makeovers.',
};

export default function ContactPage() {
  const faqs = getJsonData('faqs') || [];
  
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
