"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './FAQ.css';

const FAQ = ({ initialFaqs = [] }) => {
  const defaultFaqs = [
    {
      question: "Is the treatment painful?",
      answer: "Not at all. We use state-of-the-art painless anesthesia techniques and advanced technology to ensure you are completely comfortable throughout your procedure."
    }
  ];
  
  const faqs = initialFaqs.length > 0 ? initialFaqs : defaultFaqs;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section faq">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header text-center">
          <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>FAQ</div>
          <h2 className="heading-2">Frequently Asked <span className="text-primary">Questions</span></h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass-card ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h4 className="heading-3" style={{ fontSize: '1.1rem', marginBottom: 0 }}>{faq.question}</h4>
                <div className="faq-icon text-accent">
                  <FaChevronDown />
                </div>
              </div>
              <div className="faq-answer">
                <p className="text-body">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
