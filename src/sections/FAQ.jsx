"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      question: "Is the treatment painful?",
      answer: "Not at all. We use state-of-the-art painless anesthesia techniques and advanced technology to ensure you are completely comfortable throughout your procedure."
    },
    {
      question: "How much does teeth whitening cost?",
      answer: "The cost varies depending on the specific treatment plan, but we offer affordable packages starting from ₹5,000. We also provide a free initial consultation to give you an exact estimate."
    },
    {
      question: "Do you offer dental implants?",
      answer: "Yes, Dr. Ruchi Jain is an implant specialist. We use premium, lifetime-guaranteed titanium implants that look and function exactly like natural teeth."
    },
    {
      question: "Do you provide emergency dental services?",
      answer: "Yes, we have a 24/7 priority emergency line for severe toothaches, trauma, or accidents. Call our clinic number immediately for urgent care."
    },
    {
      question: "Is my insurance accepted here?",
      answer: "We partner with most major health insurance providers. Our front desk will help you process your claims easily so you can focus on your recovery."
    }
  ];

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
