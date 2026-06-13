import MeetDentist from '../../sections/MeetDentist';
import BeforeAfterGallery from '../../sections/BeforeAfterGallery';
import BookingSection from '../../sections/BookingSection';
import galleryData from '../../data/gallery.json';

export const metadata = {
  title: 'About Dr. Ruchi Jain | Radiance Dentistry',
  description: 'Meet Dr. Ruchi Jain, a leading microscopic endodontist in Surat, dedicated to painless, world-class dental care.',
};

export default function AboutPage() {
  const gallery = galleryData || [];

  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '4rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Our Story</h1>
      </div>
      <MeetDentist />
      <BeforeAfterGallery items={gallery} />
      <BookingSection />
    </main>
  );
}
