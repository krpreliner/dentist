import React from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import TrustBar from './sections/TrustBar'
import WhyChooseUs from './sections/WhyChooseUs'
import Services from './sections/Services'
import BeforeAfterGallery from './sections/BeforeAfterGallery'
import MeetDentist from './sections/MeetDentist'
import Testimonials from './sections/Testimonials'
import InteractiveFeatures from './sections/InteractiveFeatures'
import BookingSection from './sections/BookingSection'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import FloatingActions from './components/FloatingActions'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <Services />
      <BeforeAfterGallery />
      <MeetDentist />
      <Testimonials />
      <InteractiveFeatures />
      <BookingSection />
      <FAQ />
      <Footer />
      <FloatingActions />
    </>
  )
}

export default App
