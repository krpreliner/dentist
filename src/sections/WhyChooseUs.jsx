import React from 'react';
import { FaTooth, FaUserMd, FaClock, FaTags, FaAmbulance } from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaTooth />,
      title: 'Advanced Technology',
      description: '3D Dental Scanning and state-of-the-art equipment for precise diagnosis.',
    },
    {
      icon: <FaUserMd />,
      title: 'Expert Dentist',
      description: 'Certified specialists with 10+ years of clinical excellence.',
    },
    {
      icon: <FaClock />,
      title: 'Same Day Consultation',
      description: 'No long waiting times. Get expert advice when you need it most.',
    },
    {
      icon: <FaTags />,
      title: 'Affordable Packages',
      description: 'Premium dental care made accessible with flexible payment options.',
    },
    {
      icon: <FaAmbulance />,
      title: 'Emergency Care',
      description: '24/7 priority support for severe dental pain and trauma.',
    },
    {
      icon: <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>✨</span>,
      title: 'Pain-Free Treatment',
      description: 'Modern anesthesia techniques ensuring a comfortable experience.',
    }
  ];

  return (
    <section className="section why-choose-us" id="about">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Why Radiance</div>
          <h2 className="heading-2">Setting the Standard in <span className="text-primary">Dental Excellence</span></h2>
          <p className="text-lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
            We combine world-class medical expertise with premium hospitality to deliver an unmatched dental care experience.
          </p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card glass-card">
              <div className="reason-icon-wrapper">
                <div className="reason-icon text-accent">{reason.icon}</div>
              </div>
              <h3 className="heading-3" style={{ fontSize: '1.25rem' }}>{reason.title}</h3>
              <p className="text-body">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
