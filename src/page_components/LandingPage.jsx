import React from 'react'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import WhyChooseUs from '@/components/WhyChooseUs'
import KeyProjects from '@/components/KeyProjects'
import Testimonials from '@/components/Testimonials'
import ContactUs from '@/components/ContactUs'
import CtaSection from '@/components/CtaSection'
import GsapReveal from '@/components/GsapReveal';
import Specializations from '@/components/Specializations'
import Achievements from '@/components/Achievements'
import HowItWorks from '@/components/HowItWorks'
import OurPartners from '@/components/OurPartners'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <GsapReveal delay={0.05}><Hero /></GsapReveal>
        <GsapReveal triggerOnView><AboutUs /></GsapReveal>
        <GsapReveal triggerOnView><Achievements /></GsapReveal>
        <GsapReveal triggerOnView><OurPartners /></GsapReveal>
        <GsapReveal triggerOnView><WhyChooseUs /></GsapReveal>
        <GsapReveal triggerOnView><Specializations /></GsapReveal>
        <GsapReveal triggerOnView><HowItWorks /></GsapReveal>
        <GsapReveal triggerOnView><KeyProjects /></GsapReveal>
        <GsapReveal triggerOnView><Testimonials /></GsapReveal>
        <GsapReveal triggerOnView><CtaSection /></GsapReveal>
        <GsapReveal triggerOnView><ContactUs /></GsapReveal>
      </main>
    </div>
  )
}

export default LandingPage