import React, { useEffect, useState, useRef } from 'react';
import './TrustBar.css';

const TrustBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 5000, suffix: '+', label: 'Happy Patients' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '%', label: 'Patient Satisfaction' },
    { value: 15, suffix: '+', label: 'Dental Treatments' },
    { value: 98, suffix: '%', label: 'Success Rate' },
  ];

  return (
    <section className="trust-bar bg-primary" ref={sectionRef}>
      <div className="container">
        <div className="trust-stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`trust-stat-item ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="trust-stat-value text-accent">
                {isVisible ? <Counter end={stat.value} duration={2000} /> : '0'}
                {stat.suffix}
              </div>
              <div className="trust-stat-label text-white">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple counter animation component
const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};

export default TrustBar;
