import React from 'react'
import Image from "next/image";
import CollapsibleFeatures from './CollapsibleFeatures';

const AboutUs = () => {
  return (
    <section id="benefits" className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
          <div>
            <h2 className="text-3xl text-teal-700 sm:text-4xl font-semibold tracking-tight">About RIGrills</h2>
            <span className="mt-2 text-base leading-relaxed text-gray-700">
              At <span className="font-semibold text-teal-700">Reddy Invisible Grills</span>, we make homes
              <span className="font-semibold text-teal-700"> safer</span> and
              <span className="font-semibold text-teal-700"> smarter</span> with durable invisible grills, bird nets, and aluminum sliding windows. With years of experience, we deliver
              <span className="font-semibold text-teal-700"> trusted installations</span> that protect families and enhance modern living.
            </span>


            <CollapsibleFeatures />
          </div>


          <div className="relative w-full group p-[1rem] ">
            {/* Main base image */}
            <Image
              src="/images/aboutpage/s1.png"
              alt="Invisible Grill Main"
              width={500}
              height={300}
              fetchPriority="high"
              className="w-full aspect-[4/3] rounded-2xl border border-gray-200 shadow-2xl shadow-teal-100/40 object-cover transition-transform duration-500 "
            />

            {/* Overlay image — smaller and neat */}
            <div className="absolute -top-2 -left-2 md:-top-12 md:-left-12 w-2/6 sm:w-1/4 lg:w-1/3 rounded-xl overflow-hidden border-4 border-white transition-transform duration-500">
              <Image
                src="/images/aboutpage/s2.png"
                alt="Close-up Invisible Grill Detail"
                width={500}
                height={400}
                className="aspect-[4/5] w-full h-full object-cover"
              />
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

export default AboutUs
