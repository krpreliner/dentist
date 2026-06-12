import MeetDentist from '../../sections/MeetDentist';
import BeforeAfterGallery from '../../sections/BeforeAfterGallery';
import BookingSection from '../../sections/BookingSection';

export const metadata = {
  title: 'About Dr. Ruchi Jain | Radiance Dentistry Surat',
  description: 'Learn about our premium clinic in Vesu, Surat, our story, and meet Dr. Ruchi Jain, our lead cosmetic and implant specialist.',
};

export default function AboutPage() {
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '4rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Our Story</h1>
      </div>
      <MeetDentist />
      <BeforeAfterGallery />
      <BookingSection />
    </main>
  );
}
