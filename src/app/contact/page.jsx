import MapSection from '../../sections/MapSection';
import BookingSection from '../../sections/BookingSection';
import FAQ from '../../sections/FAQ';

export const metadata = {
  title: 'Book Appointment | Radiance Dentistry Vesu Surat',
  description: 'Book your premium consultation today. Contact Radiance Dentistry or visit our clinic in Vesu, Surat.',
};

export default function ContactPage() {
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Contact Us</h1>
      </div>
      
      <MapSection compact={false} />

      <BookingSection />
      <FAQ />
    </main>
  );
}
