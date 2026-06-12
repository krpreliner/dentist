import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';
import './MapSection.css';

const MapSection = ({ compact = false }) => {
  // Using a stable Google Maps embed format that does not require a complex pb string
  const mapEmbedUrl = "https://maps.google.com/maps?q=Western+Business+Park,+Vesu,+Surat,+Gujarat&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const mapLinkUrl = "https://goo.gl/maps/QWvQpGvqSC6pQWvQ9"; // General fallback
  // Link directly to directions with the exact address as the destination
  const actualMapLink = "https://www.google.com/maps/dir/?api=1&destination=Shop+No.+518,+5th+Floor,+Western+Business+Park,+Vesu,+Surat,+Gujarat+-+395007";

  return (
    <section className={`section map-section ${compact ? 'map-section-compact' : ''}`}>
      <div className="container">
        {!compact && (
          <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="heading-2 text-primary">Visit Radiance Dentistry – <span className="text-accent">Dental Clinic in Vesu, Surat</span></h2>
            <p className="text-lead text-text-light" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Conveniently located in Western Business Park, Vesu. We offer premium dental treatments in a state-of-the-art facility designed for your comfort.
            </p>
          </div>
        )}

        {compact && (
          <div className="text-center" style={{ marginBottom: '2rem' }}>
             <h2 className="heading-3 text-primary">Visit Radiance Dentistry – Dental Clinic in Vesu, Surat</h2>
          </div>
        )}

        <div className="map-card glass-card">
          <div className="map-content">
            <h3 className="heading-3 text-primary">Radiance Dentistry</h3>
            <p className="text-body text-text-light" style={{ marginBottom: '2rem' }}>
              Your trusted destination for advanced cosmetic and implant dentistry in Vesu, Surat.
            </p>

            <ul className="map-info-list">
              <li>
                <div className="info-icon text-accent"><FaMapMarkerAlt /></div>
                <div className="info-text">
                  <strong>Address</strong>
                  <p>Shop No. 518, 5th Floor, Western Business Park,<br />Vesu, Surat, Gujarat – 395007</p>
                </div>
              </li>
              <li>
                <div className="info-icon text-accent"><FaPhoneAlt /></div>
                <div className="info-text">
                  <strong>Phone</strong>
                  <a href="tel:+918696781255" className="link-hover">+91 8696781255</a>
                </div>
              </li>
              <li>
                <div className="info-icon text-accent"><FaEnvelope /></div>
                <div className="info-text">
                  <strong>Email</strong>
                  <a href="mailto:drruchijain30@gmail.com" className="link-hover">drruchijain30@gmail.com</a>
                </div>
              </li>
              <li>
                <div className="info-icon text-accent"><FaClock /></div>
                <div className="info-text">
                  <strong>Clinic Hours</strong>
                  <p>Monday – Saturday: 10:00 AM – 7:00 PM<br/>Sunday: Closed</p>
                </div>
              </li>
            </ul>

            <a href={actualMapLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaDirections /> Get Directions
            </a>

            {!compact && (
              <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                <h3 className="heading-3 text-primary" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Connect with Dr. Ruchi</h3>
                <p className="text-body text-text-light" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Scan to visit our Instagram page!</p>
                <img src="https://i.ibb.co/fYGvqSC6/file-000000000e3c7206bfdd3b0026274915.png" alt="Instagram QR Code" style={{ width: '100px', borderRadius: '8px', border: '2px solid var(--color-primary)' }} />
              </div>
            )}
          </div>

          <div className="map-iframe-container">
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Radiance Dentistry Location"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
