"use client";
import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import './FloatingActions.css';

import { usePathname } from 'next/navigation';

const FloatingActions = () => {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="floating-actions">
      <a href="tel:+918696781255" className="floating-btn phone-btn">
        <FaPhoneAlt />
        <span className="tooltip">Call Us</span>
      </a>
      <a href="https://wa.me/918696781255" target="_blank" rel="noreferrer" className="floating-btn whatsapp-btn">
        <FaWhatsapp />
        <span className="tooltip">WhatsApp</span>
      </a>
    </div>
  );
};

export default FloatingActions;
