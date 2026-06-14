import Services from '../../sections/Services';
import BookingSection from '../../sections/BookingSection';

export const metadata = {
  title: 'Dental Treatments & Services | Radiance Dentistry',
  description: 'Explore our world-class dental treatments in Surat, including Dental Implants, Root Canal, Teeth Whitening, and more.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ServicesPage() {
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">World-Class Services</h1>
      </div>
      <Services />
      <BookingSection />
    </main>
  );
}
