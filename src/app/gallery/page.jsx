import BeforeAfterGallery from '../../sections/BeforeAfterGallery';
import BookingSection from '../../sections/BookingSection';

export const metadata = {
  title: 'Smile Gallery | Radiance Dentistry',
  description: 'See the dramatic improvements achieved by our advanced cosmetic and restorative treatments in our Smile Gallery.',
};

export default function GalleryPage() {
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Smile Gallery</h1>
      </div>
      <BeforeAfterGallery />
      <BookingSection />
    </main>
  );
}
