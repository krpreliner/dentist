import BookingSection from '../../sections/BookingSection';
import FAQ from '../../sections/FAQ';

export const metadata = {
  title: 'Contact Us | Radiance Dentistry',
  description: 'Book your premium consultation today. Contact Radiance Dentistry or visit our clinic.',
};

export default function ContactPage() {
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Contact Us</h1>
      </div>
      <BookingSection />
      <FAQ />
    </main>
  );
}
