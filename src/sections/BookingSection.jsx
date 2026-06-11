import React from 'react';
import './BookingSection.css';

const BookingSection = () => {
  return (
    <section className="section booking" id="contact">
      <div className="container booking-container">
        
        <div className="booking-content">
          <div className="badge text-primary glass">Book Now</div>
          <h2 className="heading-2 text-white" style={{ marginTop: '1rem' }}>
            Take the First Step Towards a <span className="text-accent">Radiant Smile</span>
          </h2>
          <p className="text-lead text-white" style={{ opacity: 0.9, marginBottom: '2rem' }}>
            Schedule your premium consultation today. Experience world-class dental care in a luxurious, relaxing environment.
          </p>
          <ul className="booking-perks">
            <li>✨ Priority Scheduling</li>
            <li>✨ Complimentary Smile Assessment</li>
            <li>✨ VIP Patient Experience</li>
          </ul>
        </div>

        <div className="booking-form-wrapper glass-card">
          <h3 className="heading-3">Request an Appointment</h3>
          <form className="booking-form">
            <div className="form-group">
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone Number" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <select required defaultValue="">
                <option value="" disabled>Select Treatment</option>
                <option value="consultation">General Consultation</option>
                <option value="cosmetic">Cosmetic Dentistry</option>
                <option value="implants">Dental Implants</option>
                <option value="orthodontics">Braces / Aligners</option>
                <option value="other">Other / Emergency</option>
              </select>
            </div>
            <div className="form-group">
              <input type="date" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Additional Message (Optional)" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Confirm Appointment
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default BookingSection;
