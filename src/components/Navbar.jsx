import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-dark">
      <div className="container flex-between">
        <div className="logo">
          <span className="logo-icon text-accent">🦷</span>
          <span className="logo-text heading-3 text-white">Radiance</span>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#team">Our Team</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-actions">
          <a href="tel:+1234567890" className="nav-phone flex-center">
            <FaPhoneAlt /> <span className="text-white">+91 98765 43210</span>
          </a>
          <button className="btn btn-accent btn-sm">Book Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
