import React from 'react';
import { FaWhatsapp, FaCalendarCheck } from 'react-icons/fa';
import './Hero.css';

// We import the images directly
import doctorImg from '../assets/images/hero_doctor_image_1781188394373.png';
import clinicBg from '../assets/images/clinic_background_1781188359996.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" style={{ backgroundImage: `url(${clinicBg})` }}></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <div className="badge glass-dark delay-100">✨ Premium Dental Care</div>
          <h1 className="heading-1 text-white delay-200">
            Creating Beautiful Smiles That <span className="text-accent" style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.6)' }}>Last a Lifetime</span>
          </h1>
          <p className="text-lead text-white delay-300" style={{ opacity: 0.9 }}>
            Experience world-class dentistry with Dr. Ruchi Jain. Advanced technology meets compassionate care for a pain-free, perfect smile.
          </p>
          
          <div className="hero-stats delay-300">
            <div className="stat-item">
              <span className="stat-value text-accent">5000+</span>
              <span className="stat-label text-white">Happy Patients</span>
            </div>
            <div className="stat-item">
              <span className="stat-value text-accent">10+</span>
              <span className="stat-label text-white">Years Experience</span>
            </div>
          </div>

          <div className="hero-buttons delay-300">
            <a href="#contact" className="btn btn-accent">
              <FaCalendarCheck /> Book Appointment
            </a>
            <a href="https://wa.me/918696781255" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp /> WhatsApp Consultation
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper animate-fade-in-up delay-300">
          <div className="hero-image-container">
            <div className="golden-ring"></div>
            <img src={doctorImg} alt="Dr. Ruchi Jain" className="doctor-image" />
            
            {/* Floating Elements */}
            <div className="floating-card card-1 glass-card animate-float">
              <div className="card-icon">💎</div>
              <div className="card-text">
                <strong>Advanced</strong>
                <span>Technology</span>
              </div>
            </div>
            
            <div className="floating-card card-2 glass-card animate-float delay-200">
              <div className="card-icon">🌟</div>
              <div className="card-text">
                <strong>Pain-Free</strong>
                <span>Treatments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
