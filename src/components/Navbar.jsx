"use client";
import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import './Navbar.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import contactData from '../../data/contact.json';

const Navbar = () => {
  const pathname = usePathname();
  const contact = contactData;

  return (
    <nav className="navbar glass-dark">
      <div className="container flex-between">
        <div className="logo">
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={contact?.logoUrl || "https://i.ibb.co/Xf6zKZkx/IMG-20260612-WA0004.jpg"} alt={`${contact?.clinicName || 'Radiance Dentistry'} Logo`} style={{ height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
            <span className="logo-text heading-3 text-white">{contact?.clinicName || 'Radiance Dentistry'}</span>
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/about">Our Team</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <a href={`tel:${contact?.phone?.replace(/\s+/g, '')}`} className="nav-phone flex-center">
            <FaPhoneAlt /> <span className="text-white nav-phone-text">{contact?.phone || '+91 8696781255'}</span>
          </a>
          <Link href="/contact" className="btn btn-accent btn-sm">Book Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
