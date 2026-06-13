"use client";
import React, { useState, useRef } from 'react';
import './BeforeAfterGallery.css';

import beforeImg from '../assets/images/smile_before_1781188425076.png';
import afterImg from '../assets/images/smile_after_1781188405700.png';

const GalleryItem = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - left) / width) * 100;
    const clampedPosition = Math.min(Math.max(position, 0), 100);
    setSliderPosition(clampedPosition);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((e.touches[0].clientX - left) / width) * 100;
    const clampedPosition = Math.min(Math.max(position, 0), 100);
    setSliderPosition(clampedPosition);
  };

  return (
    <div className="comparison-wrapper" style={{ marginBottom: '3rem' }}>
      {item.title && <h3 className="text-center" style={{ marginBottom: '1rem' }}>{item.title}</h3>}
      <div 
        className="comparison-container glass-card"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <div className="comparison-image after-image">
          <img src={item.afterImage} alt="After treatment" />
          <div className="image-label label-after text-accent glass-dark">After</div>
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="comparison-image before-image"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={item.beforeImage} alt="Before treatment" />
          <div className="image-label label-before text-white glass-dark">Before</div>
        </div>

        {/* Slider Handle */}
        <div 
          className="slider-handle"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="slider-button">
            <span className="slider-arrow left"></span>
            <span className="slider-arrow right"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterGallery = ({ items = [] }) => {
  // Fallback to default images if no items are provided from CMS
  const displayItems = items && items.length > 0 
    ? items 
    : [{ title: 'Cosmetic Makeover', beforeImage: beforeImg.src || beforeImg, afterImage: afterImg.src || afterImg }];

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Gallery</div>
          <h2 className="heading-2">Real Smiles. <span className="text-primary">Real Transformations.</span></h2>
          <p className="text-lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Slide to see the dramatic improvements achieved by our advanced cosmetic and restorative treatments.
          </p>
        </div>

        <div className="gallery-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {displayItems.map((item, index) => (
            <GalleryItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
