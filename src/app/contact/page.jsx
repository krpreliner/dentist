import BookingSection from '../../sections/BookingSection';
import FAQ from '../../sections/FAQ';

export const metadata = {
  title: 'Book Appointment | Radiance Dentistry Vesu Surat',
  description: 'Book your premium consultation today. Contact Radiance Dentistry or visit our clinic in Vesu, Surat.',
};

export default function ContactPage() {
  return (
    <main>
      <div className="section-header text-center" style={{ paddingTop: '10rem', paddingBottom: '2rem', backgroundColor: 'var(--color-primary-light)' }}>
        <h1 className="heading-1 text-white">Contact Us</h1>
      </div>
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
            <div className="contact-info-card glass-card">
              <h3 className="heading-3 text-primary">Clinic Address</h3>
              <p className="text-body" style={{ marginBottom: '1.5rem' }}>
                Shop No. 518, 5th Floor, Western Business Park,<br />
                Vesu, Surat, Gujarat - 395007
              </p>
              
              <h3 className="heading-3 text-primary">Contact Details</h3>
              <p className="text-body" style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> <a href="tel:+918696781255" style={{ color: 'inherit' }}>+91 8696781255</a></p>
              <p className="text-body" style={{ marginBottom: '1.5rem' }}><strong>Email:</strong> <a href="mailto:drruchijain30@gmail.com" style={{ color: 'inherit' }}>drruchijain30@gmail.com</a></p>

              <h3 className="heading-3 text-primary">Working Hours</h3>
              <p className="text-body" style={{ marginBottom: '0.5rem' }}><strong>Mon - Sat:</strong> 10:00 AM - 7:00 PM</p>
              <p className="text-body"><strong>Sunday:</strong> Closed (Emergencies Only)</p>
            </div>
            
            <div className="map-container" style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3721.261946853272!2d72.76865231540026!3d21.141973985937172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d80509a5659%3A0xc3f1a2df5f479bb!2sWestern%20Business%20Park!5e0!3m2!1sen!2sin!4v1689254823123!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      <BookingSection />
      <FAQ />
    </main>
  );
}
