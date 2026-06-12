import React from 'react';
import { FaTeeth, FaSmile, FaMagic, FaSyringe, FaTooth, FaChild, FaAlignLeft, FaCheckDouble, FaStethoscope } from 'react-icons/fa';
import './Services.css';

import Link from 'next/link';

const Services = () => {
  const servicesList = [
    { slug: 'root-canal-treatment', icon: <FaSyringe />, title: 'Root Canal Treatment', desc: 'Painless microscopic root canal therapy in a single visit.' },
    { slug: 'dental-implants', icon: <FaTooth />, title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacement.' },
    { slug: 'teeth-whitening', icon: <FaTeeth />, title: 'Teeth Whitening', desc: 'Advanced laser whitening for an instantly brighter smile.' },
    { slug: 'smile-makeover', icon: <FaMagic />, title: 'Smile Makeover', desc: 'Complete redesign of your smile for flawless confidence.' },
    { slug: 'braces-aligners', icon: <FaAlignLeft />, title: 'Braces & Aligners', desc: 'Invisible aligners and traditional braces for perfect alignment.' },
    { slug: 'pediatric-dentistry', icon: <FaChild />, title: 'Pediatric Dentistry', desc: 'Gentle, friendly care to ensure your childs healthy smile.' },
    { slug: 'tooth-extraction', icon: <FaTeeth />, title: 'Tooth Extraction', desc: 'Safe and painless removal of problematic teeth.' },
    { slug: 'dental-crowns-bridges', icon: <FaTooth />, title: 'Dental Crowns & Bridges', desc: 'Durable restorations to protect and replace damaged teeth.' },
    { slug: 'gum-treatment', icon: <FaStethoscope />, title: 'Gum Treatment', desc: 'Advanced laser gum therapy for optimal oral health.' },
    { slug: 'scaling-polishing', icon: <FaSmile />, title: 'Scaling & Polishing', desc: 'Deep cleaning for fresh breath and healthy gums.' },
    { slug: 'cosmetic-dentistry', icon: <FaMagic />, title: 'Cosmetic Dentistry', desc: 'Transform your smile with premium aesthetic solutions.' },
    { slug: 'emergency-dental-care', icon: <FaStethoscope />, title: 'Emergency Dental Care', desc: 'Priority 24/7 care for severe toothaches and accidents.' },
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Our Services</div>
          <h2 className="heading-2 text-primary">World-Class <span className="text-accent">Dental Treatments</span></h2>
          <p className="text-lead text-text-light" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Comprehensive dental care tailored to your unique needs, delivered with precision and a gentle touch.
          </p>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className={`service-card ${index % 2 === 0 ? 'service-card-white' : 'service-card-teal'}`}>
              <div className="service-icon text-accent">{service.icon}</div>
              <h3 className="heading-3 text-primary" style={{ fontSize: '1.2rem' }}>{service.title}</h3>
              <p className="text-body text-text-light" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{service.desc}</p>
              <Link href={`/services/${service.slug}`} className="service-link text-accent">Learn More &rarr;</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
