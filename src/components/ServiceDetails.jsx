'use client';
// components/ServiceDetails.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import GsapReveal from '@/components/GsapReveal';
import Testimonials from '@/components/Testimonials';
import CtaSection from '@/components/CtaSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Divider from '@/components/Divider';

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

            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl transform  transition duration-500">
              <Image
                src={imageUrl || '/logo_c.png'}
                alt={title}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL="/low_res.png"
                className="rounded-3xl"
                fetchPriority="high"
                unoptimized
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
                    className="relative aspect-[4/3] hover:shadow-xl rounded-3xl overflow-hidden shadow-lg  transform transition duration-500"
                  >
                    <Image
                      src={img}
                      alt={`${title} image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-3xl"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </GsapReveal>
      )}



      {/* SUB-SERVICES */}
{service.subServices?.length > 0 && (
  <GsapReveal triggerOnView>
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl font-bold text-teal-700 text-center mb-12">
          {service.title} — Options & Variants
        </h2>

        <Tabs defaultValue={service.subServices[0].slug} className="w-full">

          {/* TAB HEADERS */}
<TabsList className="w-fit mx-auto flex flex-col md:flex-row overflow-x-hidden border-b bg-gray-50 rounded-4xl p-2 min-h-fit">
  {service.subServices.map((sub) => (
    <React.Fragment key={sub.slug}>
      <TabsTrigger
        value={sub.slug}
        className="px-6 py-3 whitespace-nowrap data-[state=active]:bg-teal-600 
                   data-[state=active]:text-white font-semibold rounded-3xl transition"
      >
        {sub.title}
      </TabsTrigger>

      {/* Divider only on mobile */}
      <Divider className="md:hidden" md={true} />
    </React.Fragment>
  ))}
</TabsList>


          {/* TAB CONTENT */}
          {service.subServices.map((sub, index) => (
            <TabsContent key={index} value={sub.slug} className="pt-10 bg-teal-50 p-4 rounded-xl">

              {/* TOP SECTION */}
              <div className="grid lg:grid-cols-2 gap-10">

                {/* IMAGE */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={sub.imageUrl || "/logo_c.png"}
                    alt={sub.title}
                    fill
                    className="object-cover rounded-3xl"
                    unoptimized
                  />
                </div>

                {/* BASIC INFO */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-teal-700 mb-4">{sub.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{sub.description}</p>

                  {/* CTA */}
                  <div className="mt-8">
                    <a
                      href="/contact"
                      className="px-8 py-3 rounded-xl bg-teal-600 text-white font-semibold
                                 hover:bg-teal-700 transition"
                    >
                      Enquire now
                    </a>
                  </div>
                </div>

              </div>

              {/* SUBSERVICE FEATURES */}
{sub.features?.length > 0 && (
  <div className="mt-12">
    <h4 className="text-2xl font-bold text-teal-600 mb-8">Key Features</h4>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sub.features.map((feature, idx) => (
        <div
          key={idx}
          className="relative flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <span className="mt-2 w-2.5 h-2.5 bg-teal-500 rounded-full flex-shrink-0"></span>

          <div>
            <h5 className="text-gray-900 font-semibold mb-1 text-sm sm:text-base">
              {feature.title}
            </h5>
            <p className="text-gray-700 text-sm leading-relaxed">{feature.detail}</p>
          </div>

          <span className="absolute top-3 right-3 text-teal-200 font-bold text-xs select-none">
            {idx + 1}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

{/* SUBSERVICE SPECIFICATIONS & APPLICATIONS */}
{(sub.specifications?.length > 0 || sub.applications?.length > 0) && (
  <div className="mt-12 grid lg:grid-cols-2 gap-12">

    {/* SPECIFICATIONS */}
    {sub.specifications?.length > 0 && (
      <div>
        <h4 className="text-2xl font-bold text-teal-600 mb-6">
          Technical Specifications
        </h4>
        <dl className="space-y-4">
          {sub.specifications.map((spec, idx) => (
            <div
              key={spec.id ?? idx}
              className="flex justify-between items-start gap-4 border-b border-gray-200 pb-2"
            >
              <dt className="text-gray-600 font-medium capitalize text-sm">
                {spec.key.replace(/([A-Z])/g, " $1")}
              </dt>
              <dd className="text-gray-900 font-semibold text-sm text-right">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    )}

    {/* APPLICATIONS */}
    {sub.applications?.length > 0 && (
      <div>
        <h4 className="text-2xl font-bold text-teal-600 mb-6">Applications</h4>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {sub.applications.map((app, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-800 text-sm font-medium">
              <span className="w-2.5 h-2.5 bg-teal-500 rounded-full flex-shrink-0 mt-1"></span>
              {app}
            </li>
          ))}
        </ul>
      </div>
    )}

  </div>
)}


              {/* FAQ */}
              {sub.faqs?.length > 0 && (
                <div className="mt-16">
                  <h4 className="text-2xl font-bold text-teal-700 mb-6">FAQs</h4>

                  <div className="space-y-4">
                    {sub.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white shadow p-5 rounded-xl">
                        <h5 className="font-semibold text-gray-800">{faq.question}</h5>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WARRANTY COMPONENTS */}
              {sub.warrantyComponents?.length > 0 && (
                <div className="mt-16">
                  <h4 className="text-2xl font-bold text-teal-700 mb-6">Warranty Information</h4>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sub.warrantyComponents.map((wc, idx) => (
                      <div key={idx} className="p-6 bg-white border rounded-2xl shadow hover:shadow-xl">
                        <h5 className="text-teal-700 font-semibold">{wc.label}</h5>
                        <p className="text-gray-600 mt-2">{wc.conditions}</p>
                        <p className="mt-3 font-medium text-gray-800">
                          Duration: {wc.durationMonths} months
                        </p>
                        {wc.info && (
                          <p className="text-sm text-gray-500 mt-2">{wc.info}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </TabsContent>
          ))}

        </Tabs>

      </div>
    </section>
  </GsapReveal>
)}


{/* FEATURES */}
{features?.length > 0 && (
  <GsapReveal triggerOnView>
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-teal-700 mb-12 text-center sm:text-left">
          Highlights & Key Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Subtle accent dot */}
              <span className="mt-2 w-3 h-3 bg-teal-600 rounded-full flex-shrink-0"></span>

              <div>
                <h3 className="text-gray-900 font-semibold mb-1 text-lg">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {feature.detail}
                </p>
              </div>

              {/* Optional subtle numbering in top-right */}
              <span className="absolute top-4 right-4 text-teal-200 font-bold text-sm select-none">
                {index + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  </GsapReveal>
)}



{(specifications || applications?.length > 0) && (
  <GsapReveal triggerOnView>
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* SPECIFICATIONS */}
          {specifications && (
            <div>
              <h2 className="text-3xl font-bold text-teal-700 mb-8">
                Technical Specifications
              </h2>

              <dl className="space-y-5">
                {specifications.map((spec, idx) => (
                  <div
                    key={spec.id ?? idx}
                    className="flex items-start justify-between gap-6 border-b border-gray-200 pb-4"
                  >
                    <dt className="text-gray-600 font-medium capitalize">
                      {spec.key.replace(/([A-Z])/g, " $1")}
                    </dt>
                    <dd className="text-gray-900 font-semibold text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* APPLICATIONS */}
          {applications?.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-teal-700 mb-8">
                Suitable For
              </h2>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {applications.map((app, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-800 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </section>
  </GsapReveal>
)}




{/* FAQ ACCORDION */}
{faqs?.length > 0 && (
  <GsapReveal triggerOnView>
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 ${
                openFaq === idx ? "shadow-lg" : "shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 bg-white focus:outline-none"
              >
                <h3 className="text-gray-900 font-medium text-left text-lg">
                  {faq.question}
                </h3>
                <span
                  className={`transform transition-transform duration-300 text-teal-600`}
                >
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>

              <div
                className={`transition-all duration-300 bg-white px-5 ${
                  openFaq === idx ? "max-h-96 py-4" : "max-h-0 py-0"
                } overflow-hidden`}
              >
                <p className="text-gray-700 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              {/* Optional accent line */}
              {openFaq === idx && (
                <div className="absolute left-0 top-0 w-1 h-full bg-teal-500 rounded-tr-xl rounded-br-xl"></div>
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
