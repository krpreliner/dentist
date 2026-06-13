/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaTeeth, FaSmile, FaMagic, FaSyringe, FaTooth, FaChild, FaAlignLeft, FaCheckDouble, FaStethoscope } from 'react-icons/fa';
import './Services.css';
import Link from 'next/link';
import servicesList from '../../data/services.json';

const iconMap = {
  FaTeeth: <FaTeeth />,
  FaSmile: <FaSmile />,
  FaMagic: <FaMagic />,
  FaSyringe: <FaSyringe />,
  FaTooth: <FaTooth />,
  FaChild: <FaChild />,
  FaAlignLeft: <FaAlignLeft />,
  FaCheckDouble: <FaCheckDouble />,
  FaStethoscope: <FaStethoscope />
};

const Services = () => {

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
          {servicesList.map((service, index) => {
            const slug = service.slug || service.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'treatment';
            return (
              <div key={service.id || index} className={`service-card ${index % 2 === 0 ? 'service-card-white' : 'service-card-teal'}`}>
                <div className="service-icon text-accent">{iconMap[service.icon] || <FaTeeth />}</div>
                <h3 className="heading-3 text-primary" style={{ fontSize: '1.2rem' }}>{service.title}</h3>
                <p className="text-body text-text-light" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{service.description || service.desc}</p>
                <Link href={`/services/${slug}`} className="service-link text-accent">Learn More &rarr;</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
