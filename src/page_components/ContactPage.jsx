'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import CommonHero from '@/components/CommonHero'
import ContactUs from '@/components/ContactUs'
import CtaSection from '@/components/CtaSection'
import GsapReveal from '@/components/GsapReveal'
import { PhoneIcon, MailIcon, LocationMarkerIcon, ChatIcon } from '@heroicons/react/outline';

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
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <h3 className="text-3xl font-semibold tracking-tight text-teal-700">Contact Information</h3>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-8">
            <div className="space-y-6 text-sm text-gray-700">
              {/* Phone */}
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-teal-700" />
                <span className="font-medium">Phone:</span> 
                <a className="text-teal-700 hover:text-teal-800" href="tel:+919676491117" aria-label="Call us at +91 90000 00000">+91 90000 00000</a>
              </p>
              {/* Email */}
              <p className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-teal-700" />
                <span className="font-medium">Email:</span> 
                <a className="text-teal-700 hover:text-teal-800" href="mailto:sales@invisiblegrills.example" aria-label="Send an email to sales@invisiblegrills.example">sales@invisiblegrills.example</a>
              </p>
              {/* Office */}
              <p className="flex items-center gap-2">
                <LocationMarkerIcon className="h-5 w-5 text-teal-700" />
                <span className="font-medium">Office:</span> 123, Business District, Bengaluru
              </p>
              {/* Google Maps */}
              <p>
                <a className="text-teal-700 hover:text-teal-800" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Business+District+Bengaluru" aria-label="View location in Google Maps">Open in Google Maps →</a>
              </p>
            </div>
          </div>
        </div>

        {/* Hours & Service Areas */}
        <div className="space-y-8">
          <h3 className="text-3xl font-semibold tracking-tight text-teal-700">Hours & Service Areas</h3>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-8">
            <div className="space-y-6 text-sm text-gray-700">
              {/* Working Hours */}
              <p><span className="font-medium">Hours:</span> Mon–Sat, 9:30 AM – 6:30 PM</p>
              {/* Service Areas */}
              <p><span className="font-medium">Service Areas:</span> Bengaluru · Hyderabad · Mumbai · Pune · Chennai</p>
              {/* Social Links */}
              <div className="flex items-center gap-6 pt-4">
                <a href="https://wa.me/9000000000" className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500" aria-label="Chat with us on WhatsApp">
                  <ChatIcon className="h-5 w-5" /> WhatsApp
                </a>
                <a href="https://www.instagram.com/invisiblegrills/" className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500" aria-label="Follow us on Instagram">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png" alt="Instagram" className="h-5 w-5" />
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/invisiblegrills/" className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500" aria-label="Connect with us on LinkedIn">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/LinkedIn_icon.svg" alt="LinkedIn" className="h-5 w-5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
        <GsapReveal delay={0.05}>
        <CommonHero
          eyebrow="Get in Touch"
          title="Let’s Secure Your Space with Invisible Grills"
          subtitle="Have a question or need a quote? Our team is here to help."
          primaryCta={{ label: 'Call Now', href: 'tel:+919676491117' }}
          secondaryCta={{ label: 'WhatsApp Us', href: 'https://wa.me/919676491117' }}
          mediaNote="Team or showroom image placeholder"
          mediaSrc='/images/contact/hero.png'
        />
        </GsapReveal>

        {/* Contact Information */}
        <GsapReveal triggerOnView>
        <ContactInfo />
        </GsapReveal>

        {/* Contact Form (reuse) */}
        <GsapReveal triggerOnView>
        <section className="py-16 lg:py-24 bg-white">
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
        </GsapReveal>
        {/* Map */}
        <GsapReveal triggerOnView>
        <MapSection />
        </GsapReveal>
        {/* FAQ */}
        <GsapReveal triggerOnView>
        <FAQ />
        </GsapReveal>
        {/* Final CTA */}
        <GsapReveal triggerOnView>
        <CtaSection />
        </GsapReveal>
      </main>
    </div>
  )
}

export default ContactPage


