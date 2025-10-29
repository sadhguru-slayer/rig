import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CommonHero from '@/components/CommonHero'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import CtaSection from '@/components/CtaSection'
import Link from 'next/link'
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 ">
        {/* Hero */}
        <CommonHero
          eyebrow="Services"
          title="Invisible Grills for Homes & Businesses"
          subtitle="Precision-engineered installations for balconies, windows, and façades. Durable, elegant, and safe."
          primaryCta={{ label: 'Get a Quote', href: '/contact' }}
          secondaryCta={{ label: 'View Projects', href: '/projects' }}
          mediaNote="Installation or hero image placeholder"
        />

        {/* Service Overview */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Service Overview</h2>
              <p className="mt-3 text-gray-600">Tailored solutions for residential and commercial spaces.</p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="h-10 w-10 rounded bg-teal-50 border border-teal-200" />
                <h3 className="mt-4 font-medium text-gray-900">Residential</h3>
                <p className="mt-2 text-sm text-gray-600">Balconies and windows with child-safe spacing and discreet finish.</p>
                <Link href="/contact" className="mt-4 inline-block text-sm text-teal-700 hover:text-teal-800">Request details →</Link>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="h-10 w-10 rounded bg-teal-50 border border-teal-200" />
                <h3 className="mt-4 font-medium text-gray-900">Commercial</h3>
                <p className="mt-2 text-sm text-gray-600">High-rise, hospitality, and retail façades with robust anchoring.</p>
                <Link href="/contact" className="mt-4 inline-block text-sm text-teal-700 hover:text-teal-800">Request details →</Link>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="h-10 w-10 rounded bg-teal-50 border border-teal-200" />
                <h3 className="mt-4 font-medium text-gray-900">Maintenance</h3>
                <p className="mt-2 text-sm text-gray-600">Periodic inspections, tension checks, and hardware replacements.</p>
                <Link href="/contact" className="mt-4 inline-block text-sm text-teal-700 hover:text-teal-800">Request details →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Benefits (reuse WhyChooseUs) */}
        <WhyChooseUs />

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">How It Works</h2>
              <p className="mt-3 text-gray-600">A clear, guided process from consultation to completion.</p>
            </div>

            <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 counter-reset">
              <li className="rounded-xl border border-gray-200 p-6 bg-gray-50">
                <h3 className="font-medium text-gray-900">1. Consultation</h3>
                <p className="mt-2 text-sm text-gray-600">Share your space details and requirements.</p>
              </li>
              <li className="rounded-xl border border-gray-200 p-6 bg-gray-50">
                <h3 className="font-medium text-gray-900">2. Site Visit</h3>
                <p className="mt-2 text-sm text-gray-600">We assess dimensions, anchors, and safety constraints.</p>
              </li>
              <li className="rounded-xl border border-gray-200 p-6 bg-gray-50">
                <h3 className="font-medium text-gray-900">3. Installation</h3>
                <p className="mt-2 text-sm text-gray-600">Precise fitting with professional finishing and cleanup.</p>
              </li>
              <li className="rounded-xl border border-gray-200 p-6 bg-gray-50">
                <h3 className="font-medium text-gray-900">4. Handover & Care</h3>
                <p className="mt-2 text-sm text-gray-600">Final checks, warranty briefing, and maintenance tips.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Testimonials (reuse) */}
        <Testimonials />

        {/* CTA (reuse) */}
        <CtaSection />
      </main>
    </div>
  )
}

export default ServicesPage
