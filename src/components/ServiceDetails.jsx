'use client';
// components/ServiceDetails.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import GsapReveal from '@/components/GsapReveal';
import Testimonials from '@/components/Testimonials';
import CtaSection from '@/components/CtaSection';

const ServiceDetails = ({ service }) => {
  if (!service) return null;

  const {
    title,
    shortTitle,
    shortDescription,
    description,
    imageUrl,
    priceRange,
    moreInfoUrl,
    features,
    specifications,
    applications,
    gallery,
    faqs,
    testimonials,
    callToAction,
  } = service;

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <article className="bg-white relative">

      {/* HERO SECTION */}
      <GsapReveal delay={0.5}>
        <section className="relative bg-gradient-to-br from-teal-50 to-sky-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              
              <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold text-teal-700 leading-tight">
                {title}
              </h1>
              {shortTitle && (
                <p className="mt-2 text-gray-600 text-lg font-medium">{shortTitle}</p>
              )}
              <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-xl">{shortDescription}</p>

              <div className="mt-10 flex gap-4 flex-wrap">
                <a
                  href={callToAction?.link || '/contact'}
                  className="rounded-xl bg-gradient-to-br from-teal-600 to-sky-500 px-8 py-4 text-white font-semibold shadow-lg  transform transition duration-300"
                >
                  {callToAction?.buttonLabel || 'Request Quote'}
                </a>
                {moreInfoUrl && (
                  <a
                    href={moreInfoUrl}
                    className="rounded-xl border-2 border-teal-400 px-8 py-4 text-teal-700 font-medium hover:bg-teal-50 transition"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl transform  transition duration-500">
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL="/low_res.png"
                className="rounded-3xl"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Floating Shapes */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-100 rounded-full opacity-40 animate-pulse-slow"></div>
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-sky-200 rounded-full opacity-40 animate-pulse-slow"></div>
        </section>
      </GsapReveal>

      {/* DESCRIPTION */}
<GsapReveal triggerOnView>
  <section className="py-24 bg-gradient-to-b from-sky-50 to-white">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-700 mb-6 relative inline-block">
        Service Overview
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-teal-400 rounded-full"></span>
      </h2>

      <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mt-6">
        {description}
      </p>

      {/* Optional visual accent: floating abstract shape */}
      <div className="mt-10 relative">
        <div className="absolute -top-10 left-1/4 w-20 h-20 bg-teal-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  </section>
</GsapReveal>


{/* FEATURES */}
{features?.length > 0 && (
  <GsapReveal triggerOnView>
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-12">
          Highlights & Key Features
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 bg-gradient-to-b from-white to-teal-50 flex flex-col items-center text-center"
            >
              {feature.icon && (
                <div className="w-16 h-16 mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="font-semibold text-teal-700 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-700 text-sm">{feature.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </GsapReveal>
)}


      {/* SPECIFICATIONS */}
{specifications && (
  <GsapReveal triggerOnView>
    <section className="py-24 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-700 text-center mb-16">
          Technical Specifications
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(specifications).map(([key, value], idx) => (
            <div  key={key} className="relative border-l-4 border-teal-400 hover:shadow-2xl transform rounded-3xl shadow-lg  transition-all duration-300 bg-none">
            <div className="absolute z-1 -top-5 left-5 w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full shadow-md">
                <span className="text-teal-700 font-bold">{idx + 1}</span>
              </div>
            <div
             
              className="overflow-hidden relative bg-white/70 backdrop-blur-md rounded-3xl p-8"
            >
              {/* Optional Icon or Number */}

              <h4 className="text-teal-700 font-semibold mb-2 capitalize tracking-wide">
                {key.replace(/([A-Z])/g, ' $1')}
              </h4>
              <p className="text-gray-700 text-lg">{value}</p>

              {/* Subtle background accent */}
             </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </GsapReveal>
)}


      {/* GALLERY */}
      {gallery?.length > 0 && (
        <GsapReveal triggerOnView>
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-semibold text-teal-700 text-center mb-12">
                Gallery & Installation Shots
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] hover:shadow-2xl rounded-3xl overflow-hidden shadow-lg  transform transition duration-500"
                  >
                    <Image
                      src={img}
                      alt={`${title} image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-3xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>
      )}


      {/* APPLICATIONS */}
      {applications?.length > 0 && (
  <GsapReveal triggerOnView>
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-700 mb-16">
          Suitable For
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className="group relative px-8 py-10 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform  transition-all duration-300 text-gray-800 font-semibold flex flex-col items-center justify-center"
            >
              {/* Optional Icon */}
              <div className="mb-4 w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors duration-300">
                {/* You can replace this with an actual icon */}
                <span className="text-teal-700 font-bold text-lg">{idx + 1}</span>
              </div>

              <p className="text-lg sm:text-xl text-center">{app}</p>

              {/* Optional hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100 opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </GsapReveal>
)}


      {/* FAQ ACCORDION */}
      {faqs?.length > 0 && (
        <GsapReveal triggerOnView>
          <section className="py-20 bg-teal-50">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-semibold text-teal-700 text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-md p-6 cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 text-lg">{faq.question}</h3>
                      <span className={`transform transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </div>
                    {openFaq === idx && (
                      <p className="text-gray-700 mt-4">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>
      )}

      {/* TESTIMONIALS */}
      {testimonials?.length > 0 && (
        <GsapReveal triggerOnView>
          <Testimonials testimonials={testimonials} />
        </GsapReveal>
      )}

      {/* CTA SECTION */}
      <GsapReveal triggerOnView>
        <CtaSection
          cta={{
            text: callToAction?.text || 'Get in touch today for reliable, durable installation!',
            buttonLabel: callToAction?.buttonLabel || 'Contact Us',
            link: callToAction?.link || '/contact',
          }}
        />
      </GsapReveal>
    </article>
  );
};

export default ServiceDetails;
