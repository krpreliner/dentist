"use client";
import React, { useState, useRef, useEffect } from 'react';
import './BeforeAfterGallery.css';

import beforeImg from '../assets/images/smile_before_1781188425076.png';
import afterImg from '../assets/images/smile_after_1781188405700.png';

const GalleryItem = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    const clampedPosition = Math.min(Math.max(position, 0), 100);
    setSliderPosition(clampedPosition);
  };

  const handleMouseMove = (e) => {
    // Only move if mouse is down (optional, but standard for sliders)
    // Actually, hover to move is what we had, let's keep hover to move for desktop, touch for mobile
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="comparison-wrapper">
      {item.title && <h3 className="comparison-title">{item.title}</h3>}
      <div 
        className="comparison-card"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <div className="comparison-image after-image">
          <img src={item.afterImage} alt="After treatment" draggable="false" />
          <div className="image-badge badge-after">After</div>
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="comparison-image before-image"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={item.beforeImage} alt="Before treatment" draggable="false" />
          <div className="image-badge badge-before">Before</div>
        </div>

        {/* Slider Handle */}
        <div 
          className="slider-line"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="slider-knob">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(6,0)"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterGallery = ({ items = [] }) => {
  const displayItems = items && items.length > 0 
    ? items 
    : [{ title: 'Cosmetic Makeover', beforeImage: beforeImg.src || beforeImg, afterImage: afterImg.src || afterImg }];

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-bg-blur blur-1"></div>
      <div className="gallery-bg-blur blur-2"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="gallery-header text-center">
          <span className="gallery-pill">Gallery</span>
          <h2 className="gallery-heading">Real Smiles. <span className="text-gradient">Real Transformations.</span></h2>
          <p className="gallery-subtext">
            Slide to see the dramatic improvements achieved by our advanced cosmetic and restorative treatments.
          </p>
        </div>

        <div className="gallery-items-container">
          {displayItems.map((item, index) => (
            <GalleryItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
