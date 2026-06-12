"use client";
import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Aarti Sharma",
      treatment: "Smile Makeover",
      text: "Dr. Ruchi is an artist! I was always self-conscious about my smile, but her smile makeover changed my life. The clinic feels like a premium hotel, and the care is exceptional.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul Verma",
      treatment: "Dental Implants",
      text: "I was terrified of the implant procedure, but it was completely pain-free. The advanced technology they use is mind-blowing. Highly recommend Radiance Dentistry.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Desai",
      treatment: "Teeth Whitening",
      text: "Fast, effective, and zero sensitivity. The staff is so welcoming and professional. I walked out with a glowing smile in just one session.",
      rating: 5,
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="section testimonials" id="reviews">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Testimonials</div>
          <h2 className="heading-2">What Our <span className="text-primary">Patients Say</span></h2>
          <p className="text-lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Don't just take our word for it. Discover the life-changing experiences of our valued patients.
          </p>
        </div>

        <div className="testimonials-carousel">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`testimonial-card glass-card ${index === activeIndex ? 'active' : 'inactive'}`}
            >
              <div className="quote-icon text-accent"><FaQuoteLeft /></div>
              <div className="stars text-accent">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="reviewer-info">
                <div className="reviewer-details">
                  <h4 className="reviewer-name">{review.name}</h4>
                  <p className="reviewer-treatment text-body">{review.treatment}</p>
                </div>
                <div className="google-review-badge text-primary">
                  <FaGoogle style={{ marginRight: '5px' }} /> Review
                </div>
              </div>
            </div>
          ))}
          
          <div className="carousel-dots">
            {reviews.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
