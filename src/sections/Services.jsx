import React from 'react';
import { FaTeeth, FaSmile, FaMagic, FaSyringe, FaTooth, FaChild, FaAlignLeft, FaCheckDouble, FaStethoscope } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const servicesList = [
    { icon: <FaSmile />, title: 'Cosmetic Dentistry', desc: 'Transform your smile with premium aesthetic solutions.' },
    { icon: <FaMagic />, title: 'Smile Makeover', desc: 'Complete redesign of your smile for flawless confidence.' },
    { icon: <FaTeeth />, title: 'Teeth Whitening', desc: 'Advanced laser whitening for an instantly brighter smile.' },
    { icon: <FaSyringe />, title: 'Root Canal Treatment', desc: 'Painless microscopic root canal therapy in a single visit.' },
    { icon: <FaTooth />, title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacement.' },
    { icon: <FaChild />, title: 'Kids Dentistry', desc: 'Gentle, friendly care to ensure your childs healthy smile.' },
    { icon: <FaAlignLeft />, title: 'Braces & Aligners', desc: 'Invisible aligners and traditional braces for perfect alignment.' },
    { icon: <FaCheckDouble />, title: 'Veneers', desc: 'Ultra-thin porcelain veneers to correct imperfections.' },
    { icon: <FaStethoscope />, title: 'Gum Treatment', desc: 'Advanced laser gum therapy for optimal oral health.' },
    { icon: <FaTeeth />, title: 'Full Mouth Rehab', desc: 'Comprehensive restoration of oral function and aesthetics.' },
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge text-primary" style={{ backgroundColor: 'var(--color-accent-light)' }}>Our Services</div>
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
              <a href="#contact" className="service-link text-accent">Learn More &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
