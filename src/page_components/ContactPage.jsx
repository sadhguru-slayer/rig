'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import CommonHero from '@/components/CommonHero'
import ContactUs from '@/components/ContactUs'
import CtaSection from '@/components/CtaSection'

const FAQ = () => {
  const items = [
    { q: 'How long does installation take?', a: 'Most residential installs finish within a day; larger/commercial jobs vary by scope.' },
    { q: 'Is it child-safe?', a: 'Yes. We use high-tensile SS cables with recommended child-safe spacing and secure anchoring.' },
    { q: 'Does it rust?', a: 'We use 304/316 grade stainless steel for strong corrosion resistance, suitable for coastal cities.' },
    { q: 'What about maintenance?', a: 'Low maintenance. Periodic inspection and occasional tension checks are recommended.' },
    { q: 'Can it fit my balcony windows?', a: 'Yes. We custom-measure for balconies, windows, and unique façades.' },
  ]
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">FAQ</h2>
          <p className="mt-3 text-gray-600">Quick answers to common questions about invisible grills.</p>
        </div>
        <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {items.map((item, idx) => (
            <div key={idx} className="p-5">
              <button
                className="w-full flex items-center justify-between text-left"
                aria-expanded={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="ml-4 text-gray-500">{openIdx === idx ? '—' : '+'}</span>
              </button>
              {openIdx === idx && (
                <p className="mt-3 text-sm text-gray-600">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactInfo = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-teal-700">Contact Information</h2>
          <div className="rounded-xl border border-gray-200 p-6">
            <div className="space-y-3 text-sm text-gray-700">
              <p><span className="font-medium">Phone:</span> <a className="text-teal-700 hover:text-teal-800" href="tel:+919000000000">+91 90000 00000</a></p>
              <p><span className="font-medium">Email:</span> <a className="text-teal-700 hover:text-teal-800" href="mailto:sales@invisiblegrills.example">sales@invisiblegrills.example</a></p>
              <p><span className="font-medium">Office:</span> 123, Business District, Bengaluru</p>
              <p><a className="text-teal-700 hover:text-teal-800" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Business+District+Bengaluru">Open in Google Maps →</a></p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-teal-700">Hours & Service Areas</h2>
          <div className="rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Hours:</span> Mon–Sat, 9:30 AM – 6:30 PM</p>
              <p><span className="font-medium">Service Areas:</span> Bengaluru · Hyderabad · Mumbai · Pune · Chennai</p>
              <div className="flex items-center gap-3 pt-2">
                <Link href="https://wa.me/9000000000" className="text-teal-700 hover:text-teal-800 text-sm">WhatsApp</Link>
                <Link href="https://www.instagram.com/invisiblegrills/" className="text-teal-700 hover:text-teal-800 text-sm">Instagram</Link>
                <Link href="https://www.linkedin.com/company/invisiblegrills/" className="text-teal-700 hover:text-teal-800 text-sm">LinkedIn</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const MapSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <iframe
            title="Office Location"
            className="w-full aspect-[16/9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.000000!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjciTiA3N8KwMzUnNDEuNiJF!5e0!3m2!1sen!2sin!4v1680000000000"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Map location placeholder — replace with exact coordinates.</p>
      </div>
    </section>
  )
}

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <CommonHero
          eyebrow="Get in Touch"
          title="Let’s Secure Your Space with Invisible Grills"
          subtitle="Have a question or need a quote? Our team is here to help."
          primaryCta={{ label: 'Call Now', href: 'tel:+919000000000' }}
          secondaryCta={{ label: 'WhatsApp Us', href: 'https://wa.me/919000000000' }}
          mediaNote="Team or showroom image placeholder"
        />

        {/* Contact Information */}
        <ContactInfo />

        {/* Contact Form (reuse) */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">Send an Inquiry</h2>
              <p className="mt-3 text-gray-600">Share project details and our team will get back to you.</p>
            </div>
            <div className="mt-8">
              <ContactUs />
            </div>
          </div>
        </section>

        {/* Map */}
        <MapSection />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <CtaSection />
      </main>
    </div>
  )
}

export default ContactPage


