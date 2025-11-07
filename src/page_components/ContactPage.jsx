"use client";
import React, { useState } from "react";
import Link from "next/link";
import CommonHero from "@/components/CommonHero";
import ContactUs from "@/components/ContactUs";
import CtaSection from "@/components/CtaSection";
import GsapReveal from "@/components/GsapReveal";
import { FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'; // Importing social icons from react-icons
import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  ChatIcon,
} from "@heroicons/react/outline";

const FAQ = () => {
  const items = [
    {
      q: "How long does installation take?",
      a: "Most residential installs finish within a day; larger/commercial jobs vary by scope.",
    },
    {
      q: "Is it child-safe?",
      a: "Yes. We use high-tensile SS cables with recommended child-safe spacing and secure anchoring.",
    },
    {
      q: "Does it rust?",
      a: "We use 304/316 grade stainless steel for strong corrosion resistance, suitable for coastal cities.",
    },
    {
      q: "What about maintenance?",
      a: "Low maintenance. Periodic inspection and occasional tension checks are recommended.",
    },
    {
      q: "Can it fit my balcony windows?",
      a: "Yes. We custom-measure for balconies, windows, and unique façades.",
    },
  ];
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">
            FAQ
          </h2>
          <p className="mt-3 text-gray-600">
            Quick answers to common questions about invisible grills.
          </p>
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
                <span className="ml-4 text-gray-500">
                  {openIdx === idx ? "—" : "+"}
                </span>
              </button>
              {openIdx === idx && (
                <p className="mt-3 text-sm text-gray-600">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactInfo = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Contact Information */}
        <div className="space-y-8 w-full min-w-fit">
          <h3 className="text-3xl font-semibold tracking-tight text-teal-700">
            Contact Information
          </h3>
          <div className="min-h-fit max-h-[13rem]  rounded-2xl border border-gray-200 bg-white shadow-lg p-8">
            <div className="space-y-6 text-sm text-gray-700">
              {/* Phone */}
              <p className="flex items-center gap-2 flex-wrap">
                <PhoneIcon className="h-5 w-5 text-teal-700" />
                <span className="font-medium">Phone:</span>
                <a
                  className="text-teal-700 hover:text-teal-800"
                  href="tel:+919676491117"
                  aria-label="Call us at +91 96764 91117"
                >
                  +91 96764 91117
                </a>
              </p>
              {/* Email */}
              <p className="flex items-center gap-2 flex-wrap">
                <MailIcon className="h-5 w-5 text-teal-700" />
                <span className="font-medium">Email:</span>
                <a
                  className="text-teal-700 hover:text-teal-800"
                  href="mailto:sales@invisiblegrills.example"
                  aria-label="Send an email to sales@invisiblegrills.example"
                >
                  sales@invisiblegrills.example
                </a>
              </p>
              {/* Office */}
              <p className="flex items-center gap-2 flex-wrap">
                <LocationMarkerIcon className="h-5 w-5 text-teal-700" />
                <span className="font-medium">Office:</span> 123, Paradise, Hyderabad, Telangana
              </p>
              {/* Google Maps */}
              <p>
                <a
                  className="text-teal-700 hover:text-teal-800"
                  target="_blank"
                  rel="noreferrer"
                  href="https://maps.google.com/?q=Business+District+Bengaluru"
                  aria-label="View location in Google Maps"
                >
                  Open in Google Maps →
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Hours & Service Areas */}
        <div className="space-y-8 w-full min-w-fit">
          <h3 className="text-3xl font-semibold tracking-tight text-teal-700">
            Hours & Service Areas
          </h3>
          <div className="rounded-2xl min-h-fit max-h-[13rem] border border-gray-200 bg-white shadow-lg p-8">
            <div className="space-y-6 text-sm text-gray-700">
              {/* Working Hours */}
              <p>
                <span className="font-medium">Hours:</span> Mon–Sat, 9:30 AM –
                6:30 PM
              </p>
              {/* Service Areas */}
              <p>
                <span className="font-medium text-wrap">Service Areas:</span>{" "}
                Bengaluru · Hyderabad · Mumbai · Pune · Chennai
              </p>
              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a
                  href="https://wa.me/+919676491117"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Chat with us on WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" /> WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/invisiblegrills/"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram
                    className="h-5 w-5"
                  />
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/invisiblegrills/"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-full hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Connect with us on LinkedIn"
                >
                  <FaLinkedinIn
                    className="h-5 w-5"
                  />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <iframe
            title="Office Location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.668482268989!2d78.50210827488347!3d17.386295489369317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9191e43a4707%3A0xf885a760d32c6e0d!2sHomeoCare%20Multispeciality%20Hospital%20-%20Paradise!5e0!3m2!1sen!2sin!4v1700000000000"
            className="w-full aspect-[4/3]"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Map location: 17.3863° N, 78.5021° E (HomeoCare Multispeciality Hospital, Paradise, Hyderabad)</p>
      </div>
    </section>
  );
};

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
            primaryCta={{ label: "Call Now", href: "tel:+919676491117" }}
            secondaryCta={{
              label: "WhatsApp Us",
              href: "https://wa.me/919676491117",
            }}
            mediaNote="Team or showroom image placeholder"
            mediaSrc="/images/contact/hero.png"
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
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-teal-700">
                  Send an Inquiry
                </h2>
                <p className="mt-3 text-gray-600">
                  Share project details and our team will get back to you.
                </p>
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
      </main>
    </div>
  );
};

export default ContactPage;
