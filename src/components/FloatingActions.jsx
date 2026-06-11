import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import './FloatingActions.css';

const FloatingActions = () => {
  return (
    <div className="floating-actions">
      <a href="tel:+919876543210" className="floating-btn phone-btn">
        <FaPhoneAlt />
        <span className="tooltip">Call Us</span>
      </a>
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="floating-btn whatsapp-btn">
        <FaWhatsapp />
        <span className="tooltip">WhatsApp</span>
      </a>
    </div>
  );
};

export default FloatingActions;
