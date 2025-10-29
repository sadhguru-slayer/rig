import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import WhyChooseUs from '@/components/WhyChooseUs'
import KeyProjects from '@/components/KeyProjects'
import Testimonials from '@/components/Testimonials'
import ContactUs from '@/components/ContactUs'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <AboutUs />
        <WhyChooseUs />
        <KeyProjects />
        <Testimonials />
        <CtaSection />
        <ContactUs />
      </main>
    </div>
  )
}

export default LandingPage