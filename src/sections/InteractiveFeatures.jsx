import React, { useState } from 'react';
import { FaUpload, FaCalculator, FaClipboardCheck, FaMagic } from 'react-icons/fa';
import './InteractiveFeatures.css';

const InteractiveFeatures = () => {
  const [activeTab, setActiveTab] = useState('simulator');

  return (
    <section className="section interactive-features">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Premium Experience</div>
          <h2 className="heading-2">Explore Your <span className="text-primary">Possibilities</span></h2>
        </div>

        <div className="interactive-wrapper glass-card">
          <div className="interactive-tabs">
            <button 
              className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
              onClick={() => setActiveTab('simulator')}
            >
              <FaMagic /> AI Smile Simulator
            </button>
            <button 
              className={`tab-btn ${activeTab === 'cost' ? 'active' : ''}`}
              onClick={() => setActiveTab('cost')}
            >
              <FaCalculator /> Cost Estimator
            </button>
            <button 
              className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
              onClick={() => setActiveTab('assessment')}
            >
              <FaClipboardCheck /> Health Assessment
            </button>
          </div>

          <div className="interactive-content">
            {activeTab === 'simulator' && (
              <div className="feature-panel animate-fade-in-up">
                <div className="simulator-demo">
                  <div className="upload-box glass">
                    <FaUpload className="upload-icon text-primary" />
                    <h4 className="heading-3">Upload Your Photo</h4>
                    <p className="text-body">See how cosmetic treatments can transform your smile using our advanced AI.</p>
                    <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Choose Image</button>
                  </div>
                  <div className="simulator-info">
                    <h3 className="heading-3 text-primary">Visualize Perfection</h3>
                    <p className="text-body" style={{ marginBottom: '1rem' }}>Our AI-powered simulator analyzes your facial structure to recommend the ideal tooth shape, shade, and alignment for your unique features.</p>
                    <ul className="perks-list">
                      <li>✨ Instant Before & After Preview</li>
                      <li>✨ Personalized Recommendations</li>
                      <li>✨ 100% Free Virtual Demo</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cost' && (
              <div className="feature-panel animate-fade-in-up">
                <div className="cost-estimator">
                  <div className="estimator-form">
                    <h3 className="heading-3">Select Treatments</h3>
                    <div className="checkbox-group">
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Teeth Whitening
                      </label>
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Veneers (per tooth)
                      </label>
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Dental Implant
                      </label>
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Invisible Aligners
                      </label>
                    </div>
                  </div>
                  <div className="estimator-result glass-dark text-white">
                    <h4 className="text-accent" style={{ marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Cost</h4>
                    <div className="estimated-price text-white">₹0 <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.7 }}>onwards</span></div>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                      *This is a rough estimate. Exact cost depends on clinical evaluation.
                    </p>
                    <button className="btn btn-accent btn-sm" style={{ width: '100%' }}>Book Free Consultation</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assessment' && (
              <div className="feature-panel animate-fade-in-up">
                <div className="assessment-quiz text-center">
                  <div className="quiz-icon text-accent"><FaClipboardCheck /></div>
                  <h3 className="heading-3">Dental Health Quiz</h3>
                  <p className="text-body" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Take our 2-minute interactive quiz to get a personalized dental health score and treatment recommendations.
                  </p>
                  <button className="btn btn-primary">Start Assessment</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;
