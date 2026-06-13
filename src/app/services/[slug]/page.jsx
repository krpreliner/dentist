/* eslint-disable @next/next/no-img-element */
import FAQ from '../../../sections/FAQ';
import Testimonials from '../../../sections/Testimonials';
import BookingSection from '../../../sections/BookingSection';
import { FaCheckCircle } from 'react-icons/fa';

import faqsData from '../../../../data/faqs.json';
import testimonialsData from '../../../../data/testimonials.json';
import servicesData from '../../../../data/services.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
// Cache buster 1

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

export default async function ServicePage({ params }) {
  const { slug } = await params;
  
  const faqs = faqsData || [];
  const testimonials = testimonialsData || [];
  const services = servicesData || [];
  
  // Try to find the service by matching the explicit slug or falling back to title
  const foundService = services.find(s => 
    (s.slug && s.slug === slug) || 
    (s.title && s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
  );

  const service = foundService ? {
    title: foundService.title,
    desc: foundService.desc || foundService.description || '', // Check both desc and description
    image: foundService.image || '',
    benefits: ['Expert Care', 'Modern Technology', 'Comfortable Environment'] // Default benefits since CMS doesn't track them yet
  } : {
    title: 'Dental Treatment',
    desc: 'Advanced dental care tailored to your needs.',
    image: '',
    benefits: ['Expert Care', 'Modern Technology', 'Comfortable Environment']
  };

  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '4rem', backgroundColor: 'var(--color-primary-light)' }}>
        <div className="badge text-white" style={{ backgroundColor: 'var(--color-accent)' }}>Service Detail</div>
        <h1 className="heading-1 text-white">{service.title}</h1>
        <p className="text-lead text-white" style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
          {service.desc}
        </p>
      </div>

      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {service.image && (
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <img src={service.image} alt={service.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          )}
          <h2 className="heading-2 text-primary" style={{ marginBottom: '2rem' }}>Why Choose This Treatment?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '3rem' }}>
            {service.benefits.map((benefit, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: '8px' }}>
                <FaCheckCircle className="text-accent" style={{ fontSize: '1.5rem' }} />
                <span className="text-body" style={{ fontWeight: 500 }}>{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lead text-text-light" style={{ marginBottom: '2rem' }}>
              At Radiance Dentistry, Dr. Ruchi Jain uses the latest advancements to ensure this procedure is highly effective, fast, and completely painless.
            </p>
          </div>
        </div>
      </section>

      <Testimonials initialReviews={testimonials} />
      <FAQ initialFaqs={faqs} />
      <BookingSection />
    </main>
  );
}
