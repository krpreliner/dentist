import MapSection from '../../sections/MapSection';
import BookingSection from '../../sections/BookingSection';
import FAQ from '../../sections/FAQ';
import { fetchJsonDataFromGit } from '../../lib/fetchData';

export const metadata = {
  title: 'Contact Us | Radiance Dentistry',
  description: 'Get in touch with Radiance Dentistry to book an appointment or ask any questions.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const faqsData = await fetchJsonDataFromGit('faqs');
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
