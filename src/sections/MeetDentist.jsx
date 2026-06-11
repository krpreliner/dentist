import React from 'react';
import './MeetDentist.css';
import doctorImg from '../assets/images/hero_doctor_image_1781188394373.png';

const MeetDentist = () => {
  return (
    <section className="section meet-dentist" id="team">
      <div className="container">
        <div className="meet-dentist-grid">
          
          <div className="dentist-image-wrapper">
            <div className="dentist-image-container glass-card">
              <img src={doctorImg} alt="Dr. Ruchi Jain" className="dentist-img" />
              <div className="experience-badge glass-dark">
                <span className="exp-years text-accent">10+</span>
                <span className="exp-text text-white">Years<br/>Experience</span>
              </div>
            </div>
            <div className="decorative-shape shape-1"></div>
            <div className="decorative-shape shape-2"></div>
          </div>

          <div className="dentist-content">
            <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Meet Your Doctor</div>
            <h2 className="heading-2">Dr. Ruchi Jain</h2>
            <h3 className="heading-3 text-gold" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>BDS • Cosmetic & Implant Specialist</h3>
            
            <p className="text-body" style={{ marginBottom: '1.5rem' }}>
              With over a decade of clinical excellence, Dr. Ruchi Jain is a leading expert in cosmetic dentistry and full-mouth rehabilitation. Her approach blends advanced dental technology with an artistic eye to create beautiful, natural-looking smiles that last a lifetime.
            </p>
            
            <p className="text-body" style={{ marginBottom: '2rem' }}>
              "My mission is to redefine the dental experience, replacing anxiety with comfort, and delivering world-class results that empower my patients with true confidence."
            </p>

            <div className="achievements-grid">
              <div className="achievement-badge"><span className="check text-accent">✓</span> 10+ Years Experience</div>
              <div className="achievement-badge"><span className="check text-accent">✓</span> Cosmetic & Implants</div>
              <div className="achievement-badge"><span className="check text-accent">✓</span> 5000+ Treatments</div>
              <div className="achievement-badge"><span className="check text-accent">✓</span> IDA Member</div>
            </div>

            <div className="signature-container">
              <div className="signature">Ruchi Jain</div>
              <p className="text-body text-sm" style={{ opacity: 0.7 }}>Founder & Lead Dentist</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MeetDentist;
