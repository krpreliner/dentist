import BeforeAfterGallery from '../../sections/BeforeAfterGallery';
import BookingSection from '../../sections/BookingSection';
import { fetchJsonDataFromGit } from '../../lib/fetchData';

export const metadata = {
  title: 'Smile Gallery | Radiance Dentistry',
  description: 'View our incredible before & after smile transformations at Radiance Dentistry.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GalleryPage() {
  const galleryData = await fetchJsonDataFromGit('gallery');
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
