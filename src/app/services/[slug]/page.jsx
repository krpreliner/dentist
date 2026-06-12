import BookingSection from '../../../sections/BookingSection';
import FAQ from '../../../sections/FAQ';
import Testimonials from '../../../sections/Testimonials';

export async function generateMetadata({ params }) {
  // Extract slug from params (params is a Promise in Next 15+ but synchronous in 14. We await to be safe)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    title: `${title} | Radiance Dentistry`,
    description: `Learn more about our premium ${title} treatments at Radiance Dentistry. Expert care, advanced technology, and flawless results.`,
  };
}

export default async function ServiceDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '4rem', backgroundColor: 'var(--color-primary-light)' }}>
        <div className="badge text-white" style={{ backgroundColor: 'var(--color-accent)' }}>Specialized Treatment</div>
        <h1 className="heading-1 text-white">{title}</h1>
        <p className="text-lead text-white" style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
          Experience world-class care and advanced technology for your {title.toLowerCase()} procedure.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="heading-2">About the Treatment</h2>
            <p className="text-body" style={{ marginBottom: '2rem' }}>
              Our {title.toLowerCase()} procedure is designed to provide you with the most comfortable, efficient, and long-lasting results. 
              We utilize state-of-the-art dental technology combined with Dr. Ruchi Jain's expert precision to restore your perfect smile.
            </p>
            <h3 className="heading-3">Key Benefits</h3>
            <ul style={{ listStylePosition: 'inside', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
              <li>✨ Painless procedure with advanced local anesthesia</li>
              <li>✨ Long-lasting, natural-looking results</li>
              <li>✨ Customized treatment plan tailored to your needs</li>
              <li>✨ Fast recovery time</li>
            </ul>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <BookingSection />
    </main>
  );
}
