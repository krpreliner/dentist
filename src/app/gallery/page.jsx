import BeforeAfterGallery from '../../sections/BeforeAfterGallery';
import BookingSection from '../../sections/BookingSection';
import galleryData from '../../data/gallery.json';

export const metadata = {
  title: 'Smile Gallery | Radiance Dentistry',
  description: 'View our incredible before & after smile transformations at Radiance Dentistry.',
};

export default function GalleryPage() {
  const gallery = galleryData || [];

  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Smile Gallery</h1>
      </div>
      <BeforeAfterGallery items={gallery} />
      <BookingSection />
    </main>
  );
}
