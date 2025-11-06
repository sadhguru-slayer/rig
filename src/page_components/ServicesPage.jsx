import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CommonHero from '@/components/CommonHero'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import CtaSection from '@/components/CtaSection'
import GsapReveal from '@/components/GsapReveal'
import Link from 'next/link'
import Specializations from '@/components/Specializations'
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 ">
        {/* Hero */}
        <GsapReveal delay={0.05}>
        <CommonHero
          eyebrow="Services"
          title="Invisible Grills for Homes & Businesses"
          subtitle="Precision-engineered installations for balconies, windows, and façades. Durable, elegant, and safe."
          primaryCta={{ label: 'Get a Quote', href: '/contact' }}
          secondaryCta={{ label: 'View Projects', href: '/projects' }}
          mediaNote="Installation or hero image placeholder"
          mediaSrc='/images/servicepage/hero.png'
        />
        </GsapReveal>
        
{/* Service Overview */}
<GsapReveal triggerOnView>
  <section className="py-16 lg:py-24 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h2 className="text-4xl sm:text-5xl font-semibold text-teal-700 tracking-tight mb-3">
          Service Overview
        </h2>
        <p className="text-lg text-gray-600">
          Tailored solutions for residential and commercial spaces, ensuring safety, durability, and elegance.
        </p>
      </div>

      {/* Service Cards */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Residential Card */}
        <div className="rounded-xl bg-teal-50/20 hover:bg-sky-50/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform  border border-gray-200 flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
              R
            </div>
            <h3 className="text-2xl font-medium text-gray-900">Residential</h3>
          </div>
          <p className="text-sm text-gray-600 flex-grow">
            Balconies and windows with child-safe spacing and discreet finish. Our designs ensure beauty with practicality.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block text-sm text-teal-700 hover:text-teal-800 transition-colors duration-200"
          >
            Request details →
          </a>
        </div>

        {/* Commercial Card */}
        <div className="rounded-xl bg-teal-50/20 hover:bg-sky-50/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform  border border-gray-200 flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
              C
            </div>
            <h3 className="text-2xl font-medium text-gray-900">Commercial</h3>
          </div>
          <p className="text-sm text-gray-600 flex-grow">
            High-rise, hospitality, and retail façades with robust anchoring for long-lasting stability and aesthetic appeal.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block text-sm text-teal-700 hover:text-teal-800 transition-colors duration-200"
          >
            Request details →
          </a>
        </div>

        {/* Maintenance Card */}
        <div className="rounded-xl bg-teal-50/20 hover:bg-sky-50/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform  border border-gray-200 flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
              M
            </div>
            <h3 className="text-2xl font-medium text-gray-900">Maintenance</h3>
          </div>
          <p className="text-sm text-gray-600 flex-grow">
            Periodic inspections, tension checks, and hardware replacements to ensure safety and performance over time.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block text-sm text-teal-700 hover:text-teal-800 transition-colors duration-200"
          >
            Request details →
          </a>
        </div>
      </div>
    </div>
  </section>
</GsapReveal>

<GsapReveal triggerOnView>
<Specializations/>
</GsapReveal>

{/* How it works*/}
<GsapReveal triggerOnView>
  <section className="py-16 lg:py-24 bg-gradient-to-r from-teal-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-teal-700">How It Works</h2>
        <p className="mt-3 text-lg text-gray-600">A clear, guided process from consultation to completion.</p>
      </div>

      <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 counter-reset">
        {/* Step 1 */}
        <li className="group rounded-xl border border-transparent p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out  transform hover:border-teal-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">1</span>
            </div>
            <h3 className="font-medium text-gray-900 text-xl group-hover:text-teal-700 transition-colors duration-200">Consultation</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">Share your space details and requirements to kickstart the process.</p>
        </li>
        
        {/* Step 2 */}
        <li className="group rounded-xl border border-transparent p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out  transform hover:border-teal-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">2</span>
            </div>
            <h3 className="font-medium text-gray-900 text-xl group-hover:text-teal-700 transition-colors duration-200">Site Visit</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">We assess dimensions, anchors, and safety constraints to ensure the perfect fit.</p>
        </li>
        
        {/* Step 3 */}
        <li className="group rounded-xl border border-transparent p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out  transform hover:border-teal-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">3</span>
            </div>
            <h3 className="font-medium text-gray-900 text-xl group-hover:text-teal-700 transition-colors duration-200">Installation</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">Precise fitting with professional finishing and cleanup to leave your space spotless.</p>
        </li>
        
        {/* Step 4 */}
        <li className="group rounded-xl border border-transparent p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out  transform hover:border-teal-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold">4</span>
            </div>
            <h3 className="font-medium text-gray-900 text-xl group-hover:text-teal-700 transition-colors duration-200">Handover & Care</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">Final checks, warranty briefing, and maintenance tips for long-lasting satisfaction.</p>
        </li>
      </ol>
    </div>
  </section>
</GsapReveal>


        {/* CTA (reuse) */}
        <GsapReveal triggerOnView>
        <CtaSection />
        </GsapReveal>
      </main>
    </div>
  )
}

export default ServicesPage
