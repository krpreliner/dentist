import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import './Footer.css';

import Link from 'next/link';
import contactData from '../../data/contact.json';

const Footer = () => {
  const contact = contactData;

  return (
    <footer className="footer bg-primary">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: '1.5rem' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={contact?.logoUrl || "https://i.ibb.co/Xf6zKZkx/IMG-20260612-WA0004.jpg"} alt={`${contact?.clinicName || 'Radiance Dentistry'} Logo`} style={{ height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                <span className="logo-text heading-3 text-white">{contact?.clinicName || 'Radiance Dentistry'}</span>
              </Link>
            </div>
            <p className="text-body" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
              Creating beautiful, confident smiles with advanced technology and compassionate care. Your journey to perfect dental health starts here.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href={contact?.instagramUrl || "https://www.instagram.com/drruchijain30"} target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
            </div>
            <div className="insta-qr" style={{ marginTop: '1.5rem' }}>
              <p className="text-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Scan to follow us on Instagram</p>
              <img src="https://i.ibb.co/fYGvqSC6/file-000000000e3c7206bfdd3b0026274915.png" alt="Instagram QR Code" style={{ width: '120px', borderRadius: '8px', border: '2px solid var(--color-accent)' }} />
            </div>
          </div>

          <div className="footer-col">
            <h4 className="heading-3 text-white" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/gallery">Smile Gallery</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="heading-3 text-white" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="text-accent" />
                <span>{contact?.address || 'Shop No. 518, 5th Floor, Western Business Park, Vesu, Surat, Gujarat - 395007'}</span>
              </li>
              <li>
                <FaPhoneAlt className="text-accent" />
                <a href={`tel:${contact?.phone?.replace(/\s+/g, '')}`} style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 'bold' }}>{contact?.phone || '+91 8696781255'}</a>
              </li>
              <li>
                <FaEnvelope className="text-accent" />
                <a href={`mailto:${contact?.email || 'drruchijain30@gmail.com'}`} style={{ color: 'var(--color-accent)', textDecoration: 'underline', fontWeight: 'bold' }}>{contact?.email || 'drruchijain30@gmail.com'}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="heading-3 text-white" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Working Hours</h4>
            <ul className="contact-info">
              <li>
                <FaClock className="text-accent" />
                <span>{contact?.workingHours || 'Mon - Sat: 10:00 AM - 7:00 PM'}</span>
              </li>
              <li>
                <FaClock className="text-accent" />
                <span>Sunday: Closed (Emergencies Only)</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {contact?.clinicName || 'Radiance Dentistry'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
